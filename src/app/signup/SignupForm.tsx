"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Server,
  Zap,
  TrendingDown,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  Mail,
  User,
  Building,
  Check,
} from "lucide-react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const passwordLengthMet = formData.password.length >= 8;
  const passwordHasNumber = /\d/.test(formData.password);
  const passwordHasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f4] text-[#1a2e12] flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-radial from-[#65a30d]/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-radial from-[#84cc16]/12 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-[20%] w-[350px] h-[350px] rounded-full bg-radial from-[#059669]/10 to-transparent blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#65a30d] to-[#a3e635] flex items-center justify-center shadow-md shadow-[#65a30d]/25 transition-transform duration-300 group-hover:scale-105">
            <span className="text-white font-extrabold text-lg leading-none">⚡</span>
          </div>
          <div className="font-['Space_Grotesk'] text-xl font-bold tracking-tight">
            <span className="text-[#1a2e12]">Pulse</span>
            <span className="text-[#6b8560]">Ops</span>
            <span className="text-[#4d7c0f] ml-1.5 font-extrabold">AI</span>
          </div>
        </Link>

        <div className="text-sm font-medium text-[#6b8560] flex items-center gap-2">
          <span>Already have an account?</span>
          <Link
            href="/"
            className="text-[#4d7c0f] font-semibold hover:text-[#65a30d] transition-colors hover:underline"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 flex-1">
        {/* Left Column: Brand, Value Proposition & Testimonial */}
        <div className="lg:col-span-6 flex flex-col gap-8 lg:pr-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#65a30d]/10 border border-[#65a30d]/25 text-[#4d7c0f] text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#65a30d] animate-pulse" />
              DevOps Intelligence 2.0
            </div>
            <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1a2e12] leading-[1.15]">
              Stop reading raw logs.{" "}
              <span className="bg-gradient-to-r from-[#4d7c0f] via-[#65a30d] to-[#84cc16] bg-clip-text text-transparent">
                Let AI fix your pipelines.
              </span>
            </h1>
            <p className="text-[#3d5a2e] text-base sm:text-lg leading-relaxed max-w-xl">
              Connect your GitLab, GitHub, or Kubernetes in 2 minutes. PulseOps diagnoses root causes, correlates outages, and prevents runaway cloud bills before they hit production.
            </p>
          </div>

          {/* Feature Highlights Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              {
                icon: ShieldAlert,
                title: "Instant Root Cause",
                desc: "Real-time LLM trace breakdown",
                color: "text-[#ef4444]",
                bg: "bg-[#ef4444]/10",
              },
              {
                icon: Server,
                title: "Kubernetes Health",
                desc: "Diagnose OOMKilled & CrashLoops",
                color: "text-[#f97316]",
                bg: "bg-[#f97316]/10",
              },
              {
                icon: TrendingDown,
                title: "Cost Waste Guard",
                desc: "Auto-detect idle overbilled VMs",
                color: "text-[#4d7c0f]",
                bg: "bg-[#4d7c0f]/10",
              },
              {
                icon: Zap,
                title: "Slack & PagerDuty",
                desc: "Targeted alert payloads with fixes",
                color: "text-[#65a30d]",
                bg: "bg-[#65a30d]/10",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#65a30d]/15 shadow-sm hover:shadow-md hover:border-[#65a30d]/30 transition-all flex items-start gap-3"
              >
                <div className={`p-2 rounded-lg ${f.bg} ${f.color} flex-shrink-0`}>
                  <f.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1a2e12]">{f.title}</h4>
                  <p className="text-xs text-[#6b8560] leading-snug">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Testimonial pill */}
          <div className="p-4 rounded-2xl bg-white/60 border border-[#65a30d]/15 backdrop-blur-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#4d7c0f] to-[#a3e635] flex items-center justify-center text-white font-bold text-sm shadow-inner flex-shrink-0">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-[#1a2e12] italic">
                &ldquo;PulseOps identified our Docker connection timeout in 4 seconds instead of our team digging logs for 40 minutes.&rdquo;
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-[#6b8560]">
                <span className="font-semibold text-[#3d5a2e]">Arun K.</span>
                <span>•</span>
                <span>Principal Platform Engineer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Original Tailwind Signup Card */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto lg:max-w-none">
          <div className="bg-white/85 backdrop-blur-xl border border-[#65a30d]/20 rounded-3xl p-7 sm:p-9 shadow-xl shadow-[#65a30d]/5 relative">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-[#65a30d]/15 text-[#4d7c0f] rounded-full mx-auto flex items-center justify-center border border-[#65a30d]/30">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#1a2e12]">
                  Welcome aboard, {formData.name.split(" ")[0] || "Operator"}!
                </h3>
                <p className="text-sm text-[#6b8560] max-w-sm mx-auto">
                  We sent a confirmation link to <span className="font-semibold text-[#1a2e12]">{formData.email}</span>. Click it to connect your first GitLab or Kubernetes cluster.
                </p>
                <div className="pt-4">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4d7c0f] to-[#65a30d] text-white font-semibold text-sm shadow-lg shadow-[#65a30d]/25 hover:opacity-95 transition-all"
                  >
                    Go to PulseOps Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 space-y-1.5">
                  <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#1a2e12] tracking-tight">
                    Start your 14-day free trial
                  </h2>
                  <p className="text-sm text-[#6b8560]">
                    No credit card required. Up and running in under 2 minutes.
                  </p>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#65a30d]/20 bg-white hover:bg-[#f6f8f4] text-[#1a2e12] text-xs font-semibold transition-all hover:border-[#65a30d]/40 shadow-xs cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GitHub</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#65a30d]/20 bg-white hover:bg-[#f6f8f4] text-[#1a2e12] text-xs font-semibold transition-all hover:border-[#65a30d]/40 shadow-xs"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Google</span>
                  </button>
                </div>

                <div className="relative flex items-center justify-center mb-6">
                  <div className="border-t border-[#65a30d]/15 w-full" />
                  <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-[#6b8560] font-semibold absolute">
                    or continue with work email
                  </span>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1a2e12]">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b8560]">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Rivera"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#65a30d]/20 bg-white/80 text-[#1a2e12] placeholder-[#6b8560]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30 focus:border-[#65a30d] transition-all"
                      />
                    </div>
                  </div>

                  {/* Work Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1a2e12]">Work Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b8560]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#65a30d]/20 bg-white/80 text-[#1a2e12] placeholder-[#6b8560]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30 focus:border-[#65a30d] transition-all"
                      />
                    </div>
                  </div>

                  {/* Company / Team */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1a2e12]">Company Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b8560]">
                        <Building className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Cloud Labs"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#65a30d]/20 bg-white/80 text-[#1a2e12] placeholder-[#6b8560]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30 focus:border-[#65a30d] transition-all"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1a2e12]">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b8560]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#65a30d]/20 bg-white/80 text-[#1a2e12] placeholder-[#6b8560]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a30d]/30 focus:border-[#65a30d] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6b8560] hover:text-[#1a2e12] transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password requirements indicators */}
                    <div className="pt-1.5 flex flex-wrap gap-2 text-[11px] text-[#6b8560]">
                      <span className={`inline-flex items-center gap-1 ${passwordLengthMet ? "text-[#4d7c0f] font-semibold" : ""}`}>
                        <Check className={`w-3 h-3 ${passwordLengthMet ? "opacity-100" : "opacity-30"}`} />
                        8+ chars
                      </span>
                      <span className={`inline-flex items-center gap-1 ${passwordHasNumber ? "text-[#4d7c0f] font-semibold" : ""}`}>
                        <Check className={`w-3 h-3 ${passwordHasNumber ? "opacity-100" : "opacity-30"}`} />
                        1 number
                      </span>
                      <span className={`inline-flex items-center gap-1 ${passwordHasSpecial ? "text-[#4d7c0f] font-semibold" : ""}`}>
                        <Check className={`w-3 h-3 ${passwordHasSpecial ? "opacity-100" : "opacity-30"}`} />
                        1 symbol
                      </span>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeToTerms}
                        onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                        className="mt-0.5 rounded border-[#65a30d]/30 text-[#4d7c0f] focus:ring-[#65a30d] w-4 h-4 accent-[#4d7c0f]"
                      />
                      <span className="text-xs text-[#6b8560] leading-snug">
                        I agree to the{" "}
                        <Link href="#" className="text-[#4d7c0f] underline hover:text-[#65a30d]">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-[#4d7c0f] underline hover:text-[#65a30d]">
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !formData.agreeToTerms}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#4d7c0f] via-[#65a30d] to-[#84cc16] text-white font-semibold text-sm shadow-md shadow-[#65a30d]/25 hover:shadow-lg hover:shadow-[#65a30d]/35 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Create PulseOps Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer security badges */}
                <div className="mt-6 pt-5 border-t border-[#65a30d]/15 flex items-center justify-center gap-6 text-[11px] text-[#6b8560]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4d7c0f]" /> SOC-2 Compliant
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4d7c0f]" /> 256-bit Encryption
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4d7c0f]" /> Cancel Anytime
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-[#6b8560] border-t border-[#65a30d]/10 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>© {new Date().getFullYear()} PulseOps AI Inc. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-[#1a2e12] transition-colors">Security</Link>
          <Link href="#" className="hover:text-[#1a2e12] transition-colors">Status</Link>
          <Link href="#" className="hover:text-[#1a2e12] transition-colors">Documentation</Link>
        </div>
      </footer>
    </div>
  );
}
