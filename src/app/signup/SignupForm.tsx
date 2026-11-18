"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Check, ArrowRight, ShieldCheck, Terminal, Cpu, Copy, CheckCircle2 } from "lucide-react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    workEmail: "",
    company: "",
    teamSize: "1-10",
    role: "DevOps / SRE",
    password: "",
    agreeToTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCmd = () => {
    navigator.clipboard?.writeText("curl -fsSL https://get.pulseops.dev | bash");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 850);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f4] text-[#1a2e12] flex flex-col justify-between selection:bg-[#bef264] selection:text-[#1a2e12] relative overflow-hidden font-sans">
      {/* Precision grid pattern aligned with global tokens */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(101, 163, 13, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(101, 163, 13, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />
      {/* Soft atmospheric olive glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[340px] bg-gradient-to-b from-[#65a30d]/10 via-[#a3e635]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="w-full border-b border-[#65a30d]/15 bg-[#f6f8f4]/85 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4d7c0f] to-[#84cc16] text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-[#4d7c0f]/25 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-[#4d7c0f]/35 transition-all duration-300">
              <span className="font-mono text-xs tracking-tighter">PO</span>
            </div>
            <span className="font-['Space_Grotesk'] font-bold text-[#1a2e12] tracking-tight text-lg group-hover:text-[#4d7c0f] transition-colors duration-200">
              Pulse<span className="text-[#65a30d] group-hover:text-[#84cc16] transition-colors duration-200">Ops</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 text-sm text-[#6b8560]">
            <span className="hidden sm:inline">Already registered?</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#65a30d]/20 bg-white/80 hover:bg-white hover:border-[#4d7c0f]/50 hover:text-[#1a2e12] hover:shadow-sm text-[#4d7c0f] font-semibold transition-all duration-200 group"
            >
              <span>Sign in</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Grid Area */}
      <main className="w-full max-w-6xl mx-auto px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start relative z-10 flex-1">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col gap-8 lg:pt-2">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#65a30d]/12 border border-[#65a30d]/25 text-[#4d7c0f] text-xs font-mono font-semibold tracking-tight hover:bg-[#65a30d]/20 hover:border-[#65a30d]/40 transition-all duration-200 cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65a30d] animate-pulse" />
              <span>PULSEOPS_ENTERPRISE_TRIAL</span>
            </div>
            
            <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold tracking-tight text-[#1a2e12] leading-[1.2]">
              Real-time telemetry triage, engineered for production SREs.
            </h1>
            
            <p className="text-[#3d5a2e] text-sm sm:text-base leading-relaxed">
              Eliminate alert fatigue. PulseOps translates multi-gigabyte build logs and Kubernetes events into deterministic, actionable root causes.
            </p>
          </div>

          {/* Telemetry Terminal Card with rich olive and emerald accents */}
          <div className="group/terminal rounded-xl border border-[#1a2e12]/15 hover:border-[#65a30d]/60 bg-[#0c120a] text-[#d1dbcd] font-mono text-xs overflow-hidden shadow-lg shadow-black/8 hover:shadow-2xl hover:shadow-[#65a30d]/15 transition-all duration-300">
            <div className="px-4 py-2.5 border-b border-white/10 bg-white/5 flex items-center justify-between group-hover/terminal:bg-white/10 transition-colors duration-200">
              <div className="flex items-center gap-2 text-white/60">
                <Terminal className="w-3.5 h-3.5 text-[#bef264] group-hover/terminal:rotate-6 transition-transform duration-300" />
                <span className="text-[11px] text-white/80 group-hover/terminal:text-white transition-colors duration-200">incident_decoder.log</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#ef4444]/20 text-[#fca5a5] border border-[#ef4444]/35 group-hover/terminal:bg-[#ef4444]/30 group-hover/terminal:border-[#ef4444]/55 transition-all duration-200 font-semibold">
                OOMKilled · 137
              </span>
            </div>
            
            <div className="p-4 space-y-2 text-[11px] leading-relaxed">
              <div className="text-white/45 group-hover/terminal:text-white/65 transition-colors duration-200"># Container trace diagnosed in 420ms</div>
              <div className="text-[#86efac] flex items-center gap-2">
                <span className="font-semibold text-[#a3e635]">[RESOLVED]</span>
                <span className="text-white/85 group-hover/terminal:text-white transition-colors duration-200">pod/auth-service-7b9d</span>
              </div>
              <div className="text-white/70 group-hover/terminal:text-white/90 transition-colors duration-200">
                Root Cause: Heap memory exceeded 512Mi limit during Redis cache warm-up.
              </div>
              <div className="pt-2 text-[#bef264] flex items-center justify-between border-t border-white/10 mt-2 font-medium">
                <span>&gt; Recommended: bump manifest limits.memory to 768Mi</span>
                <button
                  type="button"
                  onClick={handleCopyCmd}
                  title="Copy Quickstart Command"
                  className="inline-flex items-center gap-1 text-[10px] text-white/60 hover:text-white bg-white/10 hover:bg-[#65a30d]/30 px-2 py-1 rounded transition-colors duration-150 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-[#a3e635]" />
                      <span className="text-[#a3e635] font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Trial Inclusions */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6b8560]">
              Trial Inclusions
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#1a2e12]">
              <div className="p-3.5 rounded-xl border border-[#65a30d]/15 bg-white/80 hover:bg-white hover:border-[#4d7c0f]/40 hover:shadow-md hover:shadow-[#65a30d]/12 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3 cursor-default group/card">
                <div className="w-8 h-8 rounded-lg bg-[#65a30d]/15 group-hover/card:bg-[#65a30d]/25 text-[#4d7c0f] flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#1a2e12]">Unlimited CI runs</div>
                  <div className="text-[11px] text-[#6b8560]">No monthly usage cap</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[#65a30d]/15 bg-white/80 hover:bg-white hover:border-[#4d7c0f]/40 hover:shadow-md hover:shadow-[#65a30d]/12 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3 cursor-default group/card">
                <div className="w-8 h-8 rounded-lg bg-[#65a30d]/15 group-hover/card:bg-[#65a30d]/25 text-[#4d7c0f] flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#1a2e12]">Zero data retention</div>
                  <div className="text-[11px] text-[#6b8560]">Payloads flushed after triage</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7 w-full max-w-xl mx-auto lg:max-w-none">
          <div className="bg-white/95 backdrop-blur-md border border-[#65a30d]/20 hover:border-[#65a30d]/35 rounded-2xl p-7 sm:p-9 shadow-sm shadow-[#1a2e12]/5 hover:shadow-xl hover:shadow-[#65a30d]/10 transition-all duration-300 relative group/box">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#65a30d]/20 text-[#4d7c0f] mx-auto flex items-center justify-center border border-[#65a30d]/40 animate-bounce">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-[#1a2e12]">
                  Workspace provisioned
                </h2>
                <p className="text-sm text-[#3d5a2e] max-w-md mx-auto leading-relaxed">
                  We&apos;ve dispatched an activation packet to <strong className="text-[#1a2e12]">{formData.workEmail}</strong>. Verify your address to connect your first cluster.
                </p>
                <div className="pt-4">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#4d7c0f] hover:bg-[#3d5a2e] hover:shadow-md hover:scale-[1.01] active:scale-[0.99] text-white text-sm font-semibold transition-all duration-200 shadow-sm"
                  >
                    <span>Launch PulseOps Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-[#1a2e12] tracking-tight">
                    Create your operator account
                  </h2>
                  <p className="text-sm text-[#6b8560] mt-1 font-normal">
                    14 days full access &middot; No credit card &middot; Instant setup
                  </p>
                </div>

                {/* Social Auth Providers */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#65a30d]/20 bg-[#f6f8f4]/60 hover:bg-white hover:border-[#1a2e12]/40 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 active:translate-y-0 text-[#1a2e12] text-xs font-semibold tracking-tight transition-all duration-200 shadow-xs cursor-pointer group/gh"
                  >
                    <svg className="w-4 h-4 fill-current text-[#1a2e12] group-hover/gh:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Sign up with GitHub</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#65a30d]/20 bg-[#f6f8f4]/60 hover:bg-white hover:border-[#4285F4]/40 hover:shadow-md hover:shadow-[#4285F4]/10 hover:-translate-y-0.5 active:translate-y-0 text-[#1a2e12] text-xs font-semibold tracking-tight transition-all duration-200 shadow-xs cursor-pointer group/gg"
                  >
                    <svg className="w-4 h-4 group-hover/gg:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Sign up with Google</span>
                  </button>
                </div>

                {/* Subtle Divider */}
                <div className="relative flex items-center justify-center mb-6">
                  <div className="border-t border-[#65a30d]/15 w-full" />
                  <span className="bg-white px-3 text-[11px] font-mono uppercase tracking-wider text-[#6b8560] absolute">
                    or with work email
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 group/field">
                      <label className="block text-xs font-semibold text-[#1a2e12] group-hover/field:text-[#4d7c0f] transition-colors">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#65a30d]/25 bg-[#f6f8f4]/60 text-[#1a2e12] placeholder:text-[#6b8560]/60 hover:border-[#65a30d]/60 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30 focus:border-[#4d7c0f] focus:bg-white transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-1 group/field">
                      <label className="block text-xs font-semibold text-[#1a2e12] group-hover/field:text-[#4d7c0f] transition-colors">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="s.jenkins@vanguard.io"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#65a30d]/25 bg-[#f6f8f4]/60 text-[#1a2e12] placeholder:text-[#6b8560]/60 hover:border-[#65a30d]/60 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30 focus:border-[#4d7c0f] focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 group/field">
                      <label className="block text-xs font-semibold text-[#1a2e12] group-hover/field:text-[#4d7c0f] transition-colors">
                        Company Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Vanguard Cloud Systems"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#65a30d]/25 bg-[#f6f8f4]/60 text-[#1a2e12] placeholder:text-[#6b8560]/60 hover:border-[#65a30d]/60 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30 focus:border-[#4d7c0f] focus:bg-white transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-1 group/field">
                      <label className="block text-xs font-semibold text-[#1a2e12] group-hover/field:text-[#4d7c0f] transition-colors">
                        Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#65a30d]/25 bg-[#f6f8f4]/60 text-[#1a2e12] hover:border-[#65a30d]/60 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30 focus:border-[#4d7c0f] focus:bg-white transition-all duration-200 cursor-pointer font-medium"
                      >
                        <option value="DevOps / SRE">DevOps / SRE</option>
                        <option value="Platform Engineer">Platform Engineer</option>
                        <option value="Infrastructure Lead">Infrastructure Lead</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Engineering Director">Engineering Director</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#1a2e12]">
                      Engineering Team Headcount
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["1-10", "11-50", "51-200", "200+"].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFormData({ ...formData, teamSize: size })}
                          className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold border text-center transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
                            formData.teamSize === size
                              ? "border-[#4d7c0f] bg-[#65a30d]/15 text-[#4d7c0f] shadow-xs shadow-[#65a30d]/15"
                              : "border-[#65a30d]/20 bg-[#f6f8f4]/60 text-[#3d5a2e] hover:border-[#4d7c0f]/50 hover:bg-white hover:text-[#1a2e12] hover:shadow-2xs"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 group/field">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-[#1a2e12] group-hover/field:text-[#4d7c0f] transition-colors">
                        Master Password
                      </label>
                      <span className="text-[11px] font-mono font-medium text-[#6b8560]">8+ chars</span>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#65a30d]/25 bg-[#f6f8f4]/60 text-[#1a2e12] placeholder:text-[#6b8560]/60 hover:border-[#65a30d]/60 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30 focus:border-[#4d7c0f] focus:bg-white transition-all duration-200 pr-10 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6b8560] hover:text-[#1a2e12] hover:scale-110 active:scale-95 transition-all duration-150 cursor-pointer"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer group/terms">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeToTerms}
                        onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                        className="mt-0.5 rounded border-[#65a30d]/40 text-[#4d7c0f] focus:ring-[#65a30d] w-4 h-4 accent-[#4d7c0f] group-hover/terms:border-[#4d7c0f] transition-colors"
                      />
                      <span className="text-xs text-[#3d5a2e] group-hover/terms:text-[#1a2e12] transition-colors leading-relaxed">
                        I accept the{" "}
                        <Link href="#" className="text-[#1a2e12] font-semibold underline decoration-[#65a30d]/40 hover:decoration-[#4d7c0f] hover:text-[#4d7c0f] transition-all">
                          Customer Agreement
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-[#1a2e12] font-semibold underline decoration-[#65a30d]/40 hover:decoration-[#4d7c0f] hover:text-[#4d7c0f] transition-all">
                          Privacy Statement
                        </Link>
                        .
                      </span>
                    </label>
                  </div>

                  {/* Primary CTA with Olive to Emerald vibrant gradient */}
                  <button
                    type="submit"
                    disabled={loading || !formData.agreeToTerms}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#4d7c0f] via-[#65a30d] to-[#4d7c0f] hover:from-[#3d5a2e] hover:via-[#4d7c0f] hover:to-[#3d5a2e] text-white text-sm font-semibold tracking-tight shadow-md shadow-[#4d7c0f]/25 hover:shadow-xl hover:shadow-[#4d7c0f]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group/cta"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Provision Trial Account</span>
                        <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-[#65a30d]/15 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6b8560] gap-2">
                  <div className="flex items-center gap-1.5 hover:text-[#1a2e12] transition-colors cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                    <span>EU &amp; US data residency available</span>
                  </div>
                  <span className="hover:text-[#1a2e12] transition-colors cursor-default font-mono font-medium">SAML SSO ready</span>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Subtle Engineered Footer */}
      <footer className="w-full border-t border-[#65a30d]/15 bg-[#f6f8f4] py-6 text-xs text-[#6b8560]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-mono text-[11px] text-[#6b8560]">
            &copy; {new Date().getFullYear()} PulseOps AI Inc. &middot; Telemetry Reliability Platform
          </div>
          <div className="flex items-center gap-6 font-medium">
            <Link href="#" className="hover:text-[#4d7c0f] hover:underline decoration-[#65a30d]/40 transition-all">Security Whitepaper</Link>
            <Link href="#" className="hover:text-[#4d7c0f] hover:underline decoration-[#65a30d]/40 transition-all">API Docs</Link>
            <Link href="#" className="hover:text-[#4d7c0f] hover:underline decoration-[#65a30d]/40 transition-all">System Health 99.99%</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
