"use client";

import { useState, useRef, useEffect } from "react";
import { 
  X, 
  Terminal, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  FileText, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Filter,
  CheckCircle2
} from "lucide-react";

interface IncidentItem {
  id: string;
  project: string;
  stage: string;
  severity: "critical" | "high" | "medium" | "low";
  status: string;
  root_cause: string;
  fix: string;
  log: string;
  time?: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

interface LogInspectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  incident: IncidentItem | null;
  onApplyFix?: (fix: string) => void;
}

export default function LogInspectorDrawer({
  isOpen,
  onClose,
  incident,
  onApplyFix,
}: LogInspectorDrawerProps) {
  const [activeTab, setActiveTab] = useState<"logs" | "ai" | "fix">("logs");
  const [searchFilter, setSearchFilter] = useState("");
  const [copiedLog, setCopiedLog] = useState(false);
  const [copiedFix, setCopiedFix] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Reset or initialize when incident opens
  useEffect(() => {
    if (incident) {
      setMessages([
        {
          id: "intro",
          role: "model",
          content: `Hello! I've loaded telemetry and trace logs for **${incident.id}** (${incident.project}).\n\n**Current Diagnosis:**\n${incident.root_cause}\n\nAsk me anything: how to test this fix locally, rollback commands, or why kubelet / Docker failed.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setSearchFilter("");
    }
  }, [incident]);

  useEffect(() => {
    if (activeTab === "ai") {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);

  if (!isOpen || !incident) return null;

  const handleCopyLog = () => {
    navigator.clipboard?.writeText(incident.log);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  const handleCopyFix = () => {
    navigator.clipboard?.writeText(incident.fix);
    setCopiedFix(true);
    setTimeout(() => setCopiedFix(false), 2000);
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || chatInput;
    if (!textToSend.trim() || chatLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/troubleshoot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incident,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          query: textToSend,
        }),
      });

      const data = await res.json();
      const botReply: ChatMessage = {
        id: String(Date.now() + 1),
        role: "model",
        content: data.reply || data.error || "Unable to retrieve response.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages(prev => [...prev, botReply]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: "model",
          content: "Failed to connect to the troubleshooting agent. Please retry.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Filter raw log lines
  const rawLines = incident.log.split("\n");
  const filteredLines = searchFilter
    ? rawLines.filter(line => line.toLowerCase().includes(searchFilter.toLowerCase()))
    : rawLines;

  const quickPrompts = [
    "How do I reproduce this locally?",
    "Show exact Kubernetes / Docker commands to fix",
    "What is the rollback runbook?",
  ];

  const severityBadgeColors = {
    critical: "bg-red-500/10 text-red-600 border-red-500/30",
    high: "bg-orange-500/10 text-orange-600 border-orange-500/30",
    medium: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    low: "bg-lime-500/10 text-lime-600 border-lime-500/30",
  }[incident.severity] || "bg-slate-100 text-slate-700 border-slate-300";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300" 
      />

      {/* Drawer Panel */}
      <aside className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-[#f8faf7] border-l border-[#65a30d]/20 shadow-2xl flex flex-col text-[#1a2e12] animate-in slide-in-from-right duration-300">
          
          {/* Top Header */}
          <div className="p-5 border-b border-[#65a30d]/15 bg-white/90 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#65a30d]/15 text-[#4d7c0f] flex items-center justify-center font-mono font-bold text-xs border border-[#65a30d]/30">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#4d7c0f]">{incident.id}</span>
                  <span className="text-sm font-bold text-[#1a2e12]">{incident.project}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${severityBadgeColors}`}>
                    {incident.severity}
                  </span>
                </div>
                <div className="text-xs text-[#6b8560] mt-0.5">
                  Stage: <span className="font-medium text-[#3d5a2e]">{incident.stage}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg border border-[#65a30d]/20 hover:bg-[#65a30d]/10 text-[#6b8560] hover:text-[#1a2e12] flex items-center justify-center transition-colors cursor-pointer"
                title="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#65a30d]/15 bg-white px-5 gap-2">
            <button
              onClick={() => setActiveTab("logs")}
              className={`py-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "logs"
                  ? "border-[#4d7c0f] text-[#4d7c0f]"
                  : "border-transparent text-[#6b8560] hover:text-[#1a2e12]"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Raw Telemetry &amp; Log</span>
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`py-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "ai"
                  ? "border-[#4d7c0f] text-[#4d7c0f]"
                  : "border-transparent text-[#6b8560] hover:text-[#1a2e12]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI SRE Troubleshooter</span>
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            </button>

            <button
              onClick={() => setActiveTab("fix")}
              className={`py-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "fix"
                  ? "border-[#4d7c0f] text-[#4d7c0f]"
                  : "border-transparent text-[#6b8560] hover:text-[#1a2e12]"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Root Cause &amp; Remediation</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            
            {/* TAB 1: Log Inspector */}
            {activeTab === "logs" && (
              <div className="p-5 flex flex-col h-full space-y-4">
                {/* Search / Filter toolbar */}
                <div className="flex items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6b8560]" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Filter stack trace or error keywords..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#65a30d]/20 bg-white text-[#1a2e12] placeholder:text-[#6b8560]/60 focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30"
                    />
                  </div>

                  <button
                    onClick={handleCopyLog}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#65a30d]/20 bg-white hover:bg-[#65a30d]/10 text-[#3d5a2e] transition-colors cursor-pointer"
                  >
                    {copiedLog ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10b981]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Logs</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Log Terminal Window */}
                <div className="flex-1 min-h-[420px] rounded-xl border border-[#65a30d]/25 bg-[#0c120a] text-[#86efac] p-4 font-mono text-xs overflow-x-auto shadow-inner space-y-1 leading-relaxed">
                  <div className="text-white/40 pb-2 border-b border-white/10 flex items-center justify-between text-[11px]">
                    <span>stdout / stderr terminal buffer</span>
                    <span>{filteredLines.length} lines</span>
                  </div>
                  {filteredLines.length === 0 ? (
                    <div className="py-12 text-center text-white/40 italic">
                      No matching log lines found for &quot;{searchFilter}&quot;
                    </div>
                  ) : (
                    filteredLines.map((line, idx) => {
                      const isError = /error|fail|exception|fatal|oomkill/i.test(line);
                      return (
                        <div 
                          key={idx} 
                          className={`flex items-start gap-3 hover:bg-white/5 px-1 rounded ${
                            isError ? "text-red-400 font-semibold" : "text-[#86efac]"
                          }`}
                        >
                          <span className="text-white/20 select-none w-6 text-right flex-shrink-0 text-[10px]">
                            {idx + 1}
                          </span>
                          <span className="whitespace-pre-wrap">{line}</span>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Switch to AI CTA */}
                <div className="p-3.5 rounded-xl bg-[#65a30d]/10 border border-[#65a30d]/20 flex items-center justify-between">
                  <div className="text-xs text-[#3d5a2e]">
                    Unsure how to fix this? Let our AI copilot explain the root cause.
                  </div>
                  <button
                    onClick={() => setActiveTab("ai")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4d7c0f] hover:bg-[#3d5a2e] text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask SRE Copilot</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: AI SRE Troubleshooter Chat */}
            {activeTab === "ai" && (
              <div className="flex flex-col h-[calc(100vh-140px)]">
                {/* Message stream */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {messages.map(m => (
                    <div
                      key={m.id}
                      className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {m.role === "model" && (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4d7c0f] to-[#a3e635] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                          m.role === "user"
                            ? "bg-[#224415] text-white rounded-br-none shadow-xs"
                            : "bg-white border border-[#65a30d]/20 text-[#1a2e12] rounded-bl-none shadow-xs"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{m.content}</div>
                        <div className={`text-[10px] mt-1.5 ${m.role === "user" ? "text-white/60" : "text-[#6b8560]"}`}>
                          {m.timestamp}
                        </div>
                      </div>

                      {m.role === "user" && (
                        <div className="w-7 h-7 rounded-lg bg-[#224415] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {chatLoading && (
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4d7c0f] to-[#a3e635] text-white flex items-center justify-center shadow-xs">
                        <Bot className="w-4 h-4 animate-spin" />
                      </div>
                      <div className="bg-white border border-[#65a30d]/20 rounded-2xl p-3 text-xs text-[#6b8560] italic">
                        Gemini SRE Copilot is evaluating stack traces...
                      </div>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                {/* Quick query chips */}
                <div className="px-5 py-2 border-t border-[#65a30d]/10 bg-white/70 flex gap-2 overflow-x-auto text-xs">
                  {quickPrompts.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      disabled={chatLoading}
                      className="px-2.5 py-1 rounded-md bg-[#65a30d]/10 hover:bg-[#65a30d]/20 border border-[#65a30d]/20 text-[#365e14] whitespace-nowrap text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input Box */}
                <div className="p-4 border-t border-[#65a30d]/15 bg-white flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask SRE Copilot about this incident..."
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#65a30d]/25 bg-[#f6f8f4]/60 text-[#1a2e12] placeholder:text-[#6b8560]/60 focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30 focus:bg-white"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={chatLoading || !chatInput.trim()}
                    className="p-2.5 rounded-xl bg-[#4d7c0f] hover:bg-[#3d5a2e] text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Root Cause & Suggested Action */}
            {activeTab === "fix" && (
              <div className="p-5 space-y-5">
                <div className="p-4 rounded-xl bg-white border border-[#65a30d]/20 shadow-xs space-y-2">
                  <div className="text-[11px] font-bold text-[#4d7c0f] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Root Cause Analysis</span>
                  </div>
                  <p className="text-xs text-[#2d4123] leading-relaxed">
                    {incident.root_cause}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#10b981]/30 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-bold text-[#059669] uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Suggested Remediation</span>
                    </div>
                    <button
                      onClick={handleCopyFix}
                      className="inline-flex items-center gap-1 text-[11px] text-[#059669] hover:text-[#047857] font-medium cursor-pointer"
                    >
                      {copiedFix ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedFix ? "Copied" : "Copy Fix"}</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0c120a] text-[#86efac] font-mono text-xs leading-relaxed overflow-x-auto">
                    {incident.fix}
                  </div>
                </div>

                {onApplyFix && (
                  <button
                    onClick={() => {
                      onApplyFix(incident.fix);
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#224415] hover:bg-[#17300e] text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Acknowledge and Apply Action</span>
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      </aside>
    </div>
  );
}
