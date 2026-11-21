"use client";

import { useState } from "react";
import { Sparkles, Terminal, CheckCircle2, AlertTriangle, ArrowRight, Loader2, ShieldAlert } from "lucide-react";

interface GeminiDiagnoseModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLog?: string;
  defaultProject?: string;
  defaultStage?: string;
  onApplyDiagnosis?: (rootCause: string, fix: string, severity: string) => void;
}

export default function GeminiDiagnoseModal({
  isOpen,
  onClose,
  defaultLog = "",
  defaultProject = "lexcortex-backend",
  defaultStage = "Docker build",
  onApplyDiagnosis,
}: GeminiDiagnoseModalProps) {
  const [log, setLog] = useState(defaultLog);
  const [project, setProject] = useState(defaultProject);
  const [stage, setStage] = useState(defaultStage);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    configured: boolean;
    root_cause: string;
    fix: string;
    severity: string;
    affected_component?: string;
    preventative_tip?: string;
    analysis_time_ms: number;
    model: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDiagnose = async () => {
    if (!log.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ log, project, stage }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.details || data.error || "Diagnosis failed");
      }

      setResult(data);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || "Failed to contact Gemini API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#f6f8f4] border border-[#65a30d]/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-7 relative font-sans text-[#1a2e12]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#65a30d]/15">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4d7c0f] to-[#a3e635] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-['Space_Grotesk'] text-lg font-bold tracking-tight text-[#1a2e12]">
                Gemini Telemetry Triage
              </h2>
              <p className="text-xs text-[#6b8560]">
                Powered by Google Gemini 2.5 Flash &middot; Instant Root Cause &amp; Remediation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#6b8560] hover:text-[#1a2e12] w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#65a30d]/10 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Inputs */}
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1a2e12] mb-1">
                Project / Service
              </label>
              <input
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="lexcortex-backend"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#65a30d]/25 bg-white text-[#1a2e12] focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a2e12] mb-1">
                Stage / Event
              </label>
              <input
                type="text"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                placeholder="Docker build"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#65a30d]/25 bg-white text-[#1a2e12] focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-[#1a2e12]">
                Terminal Log / Stack Trace
              </label>
              <span className="text-[11px] font-mono text-[#6b8560]">Paste failure snippet</span>
            </div>
            <textarea
              rows={6}
              value={log}
              onChange={(e) => setLog(e.target.value)}
              placeholder="Paste raw error log or stack trace here..."
              className="w-full p-3 font-mono text-xs rounded-xl border border-[#65a30d]/25 bg-[#0c120a] text-[#86efac] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30 leading-relaxed"
            />
          </div>

          <button
            type="button"
            onClick={handleDiagnose}
            disabled={loading || !log.trim()}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4d7c0f] via-[#65a30d] to-[#4d7c0f] hover:from-[#3d5a2e] hover:via-[#4d7c0f] hover:to-[#3d5a2e] text-white text-xs font-semibold tracking-tight shadow-md shadow-[#4d7c0f]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gemini analyzing root cause...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Diagnose with Gemini</span>
              </>
            )}
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Diagnosis Request Failed</div>
              <div className="text-[11px] text-red-600 mt-0.5">{error}</div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-2 pt-4 border-t border-[#65a30d]/15 space-y-3.5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1a2e12] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4d7c0f]" />
                Gemini Diagnosis Ready
              </span>
              <span className="font-mono text-[11px] text-[#6b8560]">
                {result.analysis_time_ms}ms &middot; {result.model}
              </span>
            </div>

            {!result.configured && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Gemini API Key missing:</strong> Add <code>GEMINI_API_KEY</code> to <code>.env.local</code> to activate live Google Gemini models.
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-[#65a30d]/20 shadow-xs">
                <span className="text-[11px] font-bold text-[#4d7c0f] uppercase tracking-wide block mb-1">
                  Root Cause
                </span>
                <p className="text-xs text-[#3d5a2e] leading-relaxed">
                  {result.root_cause}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#10b981]/25 shadow-xs">
                <span className="text-[11px] font-bold text-[#10b981] uppercase tracking-wide block mb-1">
                  Suggested Fix
                </span>
                <p className="text-xs text-[#3d5a2e] leading-relaxed">
                  {result.fix}
                </p>
              </div>
            </div>

            {result.preventative_tip && (
              <div className="p-3 rounded-lg bg-[#65a30d]/10 border border-[#65a30d]/20 text-xs text-[#1a2e12]">
                <strong>SRE Preventative Tip:</strong> {result.preventative_tip}
              </div>
            )}

            {onApplyDiagnosis && (
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onApplyDiagnosis(result.root_cause, result.fix, result.severity);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-lg bg-[#1a2e12] hover:bg-[#2d4123] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Apply Diagnosis to Incident</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
