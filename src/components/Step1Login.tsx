import React, { useState } from 'react';
import {
  Lightbulb,
  FileCheck2,
  ShieldCheck,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Building2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { TalentIQLogo } from './TalentIQLogo';
import { RecruiterSession } from '../types';

interface Step1LoginProps {
  onLoginSuccess: (session: RecruiterSession) => void;
}

export const Step1Login: React.FC<Step1LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('recruiter@azentio.demo');
  const [password, setPassword] = useState('talentflow2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your work email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        email: email.trim(),
        name: 'Recruiter TA',
        role: 'Talent Acquisition',
        department: 'Engineering Hiring',
        organization: 'Azentio Software',
        isAuthenticated: true,
        loggedInAt: new Date().toISOString(),
        avatarInitials: 'RT'
      });
    }, 350);
  };

  const handleEnterDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        email: 'recruiter@talentiq.demo',
        name: 'Recruiter TA',
        role: 'Talent Acquisition',
        department: 'Engineering Hiring',
        organization: 'TalentIQ Workspace',
        isAuthenticated: true,
        loggedInAt: new Date().toISOString(),
        avatarInitials: 'RT'
      });
    }, 250);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* 1. Full-Screen Architectural Workspace Photography - Guaranteed Visible */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2600&q=90"
          alt="Modern Architectural Workspace"
          className="w-full h-full object-cover object-center brightness-[0.98] contrast-[1.02]"
          loading="eager"
        />
        {/* Ambient Warm Vignette & Glass Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/65 via-stone-900/35 to-stone-900/40 backdrop-blur-[1px]" />
      </div>

      {/* 2. Main Glassmorphic Showcase Content Container */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 relative z-10 py-6">
        {/* Left Side: Brand Story, Bold Typography & Glass Cards */}
        <div className="w-full lg:w-1/2 space-y-7 text-white">
          {/* Logo badge with frosted glass pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/90 hover:bg-white backdrop-blur-xl rounded-full border border-white/90 shadow-md transition-all">
            <TalentIQLogo size="md" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-blue-700 bg-blue-50/95 px-2.5 py-0.5 rounded-full border border-blue-200/80 font-mono">
              Talent Intelligence
            </span>
          </div>

          {/* Large Bold Display Typography with high contrast */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-[-0.035em] text-white leading-[1.07] drop-shadow-md">
              Smarter hiring <br />
              starts with <br />
              <span className="text-blue-400 drop-shadow-md">better evidence.</span>
            </h1>
            <p className="text-sm sm:text-base text-stone-200 font-medium leading-relaxed max-w-md drop-shadow-xs">
              AI-powered talent intelligence for faster, fairer and more confident hiring decisions.
            </p>
          </div>

          {/* 3 Frosted Glassmorphic Feature Cards (Exact match to screenshot) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 bg-white/85 hover:bg-white/95 backdrop-blur-xl rounded-2xl border border-white/90 shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 flex flex-col gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs border border-blue-100/70">
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-900 leading-snug">
                AI-Powered <br /> Insights
              </span>
            </div>

            <div className="p-4 bg-white/85 hover:bg-white/95 backdrop-blur-xl rounded-2xl border border-white/90 shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 flex flex-col gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs border border-blue-100/70">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-900 leading-snug">
                Evidence-Based <br /> Ranking
              </span>
            </div>

            <div className="p-4 bg-white/85 hover:bg-white/95 backdrop-blur-xl rounded-2xl border border-white/90 shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 flex flex-col gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs border border-blue-100/70">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-900 leading-snug">
                Better Hiring <br /> Outcomes
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-stone-200 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="bg-stone-900/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
              Enterprise Workspace Ready • Azentio Software TA Intern Sandbox
            </span>
          </div>
        </div>

        {/* Right Side: Ultra-Glassmorphic Sign-In Window */}
        <div className="w-full lg:w-[440px] shrink-0">
          <div className="relative bg-white/80 sm:bg-white/85 backdrop-blur-2xl rounded-3xl border border-white/95 shadow-[0_24px_60px_-10px_rgba(15,23,42,0.18)] ring-1 ring-black/5 p-7 sm:p-9 space-y-6 transition-all">
            {/* Luminous Glass Highlight accent top border */}
            <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            {/* Header / Logo in Card */}
            <div className="text-center space-y-1.5">
              <div className="flex justify-center mb-3">
                <div className="p-2.5 bg-white/90 rounded-2xl shadow-xs border border-white/90 backdrop-blur-md">
                  <TalentIQLogo size="md" showText={true} />
                </div>
              </div>
              <h2 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-stone-900">
                Welcome back
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-medium">
                Sign in to your TalentIQ account
              </p>
            </div>

            {error && (
              <div className="p-3 bg-rose-50/95 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                {error}
              </div>
            )}

            {/* Sign-in Form */}
            <form onSubmit={handleSignIn} className="space-y-4 pt-1">
              {/* Email Address with embedded Mail icon */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 tracking-wide">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200/90 bg-white/90 focus:bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-2xs font-medium"
                  />
                </div>
              </div>

              {/* Password with embedded Lock & Eye toggle */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200/90 bg-white/90 focus:bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-2xs font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none text-stone-600 font-semibold">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-stone-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={handleEnterDemo}
                  className="text-blue-600 hover:text-blue-700 font-bold transition-colors text-xs"
                >
                  Forgot password?
                </button>
              </div>

              {/* Solid Royal Blue Sign in Button (matches screenshot) */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.99] cursor-pointer"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Sign in</span>
                )}
              </button>
            </form>

            {/* Divider with "or" */}
            <div className="relative my-3 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200/80" />
              </div>
              <span className="relative bg-white/95 px-3 text-xs text-stone-400 font-medium rounded-full">
                or
              </span>
            </div>

            {/* Secondary Frosted Outline Button: Enter Demo Workspace */}
            <button
              type="button"
              onClick={handleEnterDemo}
              className="w-full py-2.5 px-4 bg-white/80 hover:bg-white border border-stone-200 hover:border-stone-300 text-stone-800 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs backdrop-blur-sm active:scale-[0.99] cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Enter Demo Workspace</span>
            </button>

            {/* Footer note */}
            <div className="pt-2 text-center">
              <p className="text-[11px] text-stone-400 max-w-xs mx-auto leading-relaxed font-medium">
                This demo workspace uses fictional data for demonstration purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
