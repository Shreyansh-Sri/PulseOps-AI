"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react";

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
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Realistic validation
    if (formData.password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0f172a] flex flex-col justify-between font-sans selection:bg-[#d9f99d] selection:text-[#14532d]">
      {/* Top Navigation */}
      <header className="w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#166534] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              P
            </div>
            <span className="font-semibold text-slate-900 tracking-tight text-lg">
              PulseOps
            </span>
          </Link>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span>Have an account?</span>
            <Link
              href="/"
              className="text-[#15803d] font-medium hover:text-[#166534] hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-6xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start flex-1">
        {/* Left Column: Context & What they actually get */}
        <div className="lg:col-span-5 flex flex-col gap-8 lg:pt-4">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
              Investigate broken pipelines &amp; pod crashes in seconds.
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Connect your GitLab, GitHub Actions, or Kubernetes clusters. Get clear root cause diagnoses and remediation steps instead of wading through endless stack traces.
            </p>
          </div>

          {/* Practical Capabilities List */}
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Included with free trial
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>
                  <strong>Automated CI failure triage:</strong> Extracts failed jobs, missing environment variables, and Docker cache misses.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>
                  <strong>Kubernetes crash analysis:</strong> Contextual decoding for OOMKilled, CrashLoopBackOff, and ImagePullBackOff.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>
                  <strong>Cloud overbilling guard:</strong> Flags stalled dev instances, hanging runners, and unattached volumes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>
                  <strong>Slack &amp; Webhook alerts:</strong> Instant severity routing so on-call engineers aren&apos;t spammed by low-priority warnings.
                </span>
              </li>
            </ul>
          </div>

          {/* Testimonial Quote */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <p className="italic text-slate-700 mb-2">
              &ldquo;We plugged PulseOps into our GitLab runner webhooks on a Monday. By Wednesday, it caught an orphaned dev database cluster before our monthly GCP bill quadrupled.&rdquo;
            </p>
            <div className="font-medium text-slate-900">
              Siddharth Menon &middot; Lead Infrastructure Engineer, Razorflow
            </div>
          </div>
        </div>

        {/* Right Column: Grounded, Clean Signup Card */}
        <div className="lg:col-span-7 w-full max-w-xl mx-auto lg:max-w-none">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center border border-emerald-200">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Account created successfully
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  We sent a confirmation link to{" "}
                  <strong className="text-slate-900">{formData.workEmail}</strong>. Please check your inbox or spam folder to verify your account.
                </p>
                <div className="pt-4">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#15803d] text-white text-sm font-medium hover:bg-[#166534] transition-colors"
                  >
                    Continue to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Create your PulseOps account
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Free 14-day trial &middot; No credit card required
                  </p>
                </div>

                {/* Single Sign-On Providers */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium transition-colors shadow-2xs cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GitHub</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium transition-colors shadow-2xs cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Google</span>
                  </button>
                </div>

                <div className="relative flex items-center justify-center mb-6">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-xs text-slate-500 absolute">
                    or register with work email
                  </span>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Rivera"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] transition-all"
                      />
                    </div>
                  </div>

                  {/* Company & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Systems"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] transition-all"
                      >
                        <option value="DevOps / SRE">DevOps / SRE</option>
                        <option value="Platform Engineer">Platform Engineer</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Engineering Manager">Engineering Manager</option>
                        <option value="CTO / Tech Lead">CTO / Tech Lead</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Team Size */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Engineering Team Size
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["1-10", "11-50", "51-200", "200+"].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFormData({ ...formData, teamSize: size })}
                          className={`py-1.5 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                            formData.teamSize === size
                              ? "border-[#15803d] bg-emerald-50 text-[#166534] font-semibold"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Password
                      </label>
                      <span className="text-[11px] text-slate-500">Min. 8 characters</span>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] transition-all pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeToTerms}
                        onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-[#15803d] focus:ring-[#15803d] w-4 h-4 accent-[#15803d]"
                      />
                      <span className="text-xs text-slate-600 leading-normal">
                        I agree to the{" "}
                        <Link href="#" className="text-slate-900 underline hover:text-[#15803d]">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-slate-900 underline hover:text-[#15803d]">
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
                    className="w-full py-2.5 px-4 rounded-lg bg-[#15803d] hover:bg-[#166534] text-white text-sm font-semibold shadow-xs hover:shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Create free account"
                    )}
                  </button>
                </form>

                {/* Subtext info */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>By registering, you get 14 days of full feature access.</span>
                  <span className="hidden sm:inline">Self-hosted or Cloud</span>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/80 bg-white py-5 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>&copy; {new Date().getFullYear()} PulseOps AI, Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-900 transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Security Overview</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">System Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
