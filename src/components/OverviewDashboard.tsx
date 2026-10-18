import React from 'react';
import {
  Users,
  Briefcase,
  Award,
  Sparkles,
  TrendingUp,
  FileText,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { CandidateProfile, OverviewMetrics } from '../types';

interface OverviewDashboardProps {
  metrics: OverviewMetrics;
  candidates: CandidateProfile[];
  onNavigateToRanking: () => void;
  onNavigateToJD: () => void;
  onNavigateToCVs: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  metrics,
  candidates,
  onNavigateToRanking,
  onNavigateToJD,
  onNavigateToCVs
}) => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-7 animate-in fade-in font-sans-ui">
      {/* 1. Welcome Banner: Elegant Serif Typography */}
      <div className="space-y-1">
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight text-[#252B36] leading-tight">
          Good morning, Recruiter
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] font-normal">
          Your hiring intelligence workspace.
        </p>
      </div>

      {/* 2. Coordinated Signature Pastel KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Roles: Pale Blue / Cornflower */}
        <div className="p-4 bg-[#F4F7FF] border border-[#DCE8FF] rounded-2xl shadow-[0_2px_10px_rgba(100,139,234,0.04)] hover:shadow-sm transition-all flex items-start justify-between group">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#667085]">Active Roles</span>
            <div className="text-2xl sm:text-3xl font-bold text-[#252B36] tracking-tight">
              {metrics.activeRoles}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#347653]">
              <span>↑</span>
              <span>{metrics.activeRolesDelta}</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#EDF3FF] text-[#648BEA] border border-[#DCE8FF] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        {/* CVs Processed: Pale Lilac / Muted Violet */}
        <div className="p-4 bg-[#F7F2FF] border border-[#EAE1FF] rounded-2xl shadow-[0_2px_10px_rgba(118,87,182,0.04)] hover:shadow-sm transition-all flex items-start justify-between group">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#667085]">CVs Processed</span>
            <div className="text-2xl sm:text-3xl font-bold text-[#252B36] tracking-tight">
              {metrics.cvsProcessed}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#347653]">
              <span>↑</span>
              <span>{metrics.cvsProcessedDelta}</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#EAE1FF] text-[#7657B6] border border-[#D9CAFA] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Candidates Ranked: Pale Sage / Forest Green */}
        <div className="p-4 bg-[#F1F8F2] border border-[#DCEFE3] rounded-2xl shadow-[0_2px_10px_rgba(52,118,83,0.04)] hover:shadow-sm transition-all flex items-start justify-between group">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#667085]">Candidates Ranked</span>
            <div className="text-2xl sm:text-3xl font-bold text-[#252B36] tracking-tight">
              {metrics.candidatesRanked}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#347653]">
              <span>↑</span>
              <span>{metrics.candidatesRankedDelta}</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#DCEFE3] text-[#347653] border border-[#C6E2D0] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Shortlisted Candidates: Pale Peach / Terracotta */}
        <div className="p-4 bg-[#FFF6ED] border border-[#FFE4D6] rounded-2xl shadow-[0_2px_10px_rgba(199,118,85,0.04)] hover:shadow-sm transition-all flex items-start justify-between group">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#667085]">Shortlisted Candidates</span>
            <div className="text-2xl sm:text-3xl font-bold text-[#252B36] tracking-tight">
              {metrics.shortlistedCandidates}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#347653]">
              <span>↑</span>
              <span>{metrics.shortlistedCandidatesDelta}</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#FFE4D6] text-[#C77655] border border-[#FED0BC] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Current Hiring Pipeline & AI Hiring Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pipeline Table in Crisp White */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E0D4] shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-[#E8E0D4] flex items-center justify-between bg-white">
              <div className="space-y-0.5">
                <h2 className="text-sm font-bold text-[#252B36] tracking-tight">
                  Current hiring pipeline
                </h2>
                <p className="text-[11px] text-[#667085]">Active candidate evaluations against confirmed JD</p>
              </div>
              <button
                onClick={onNavigateToRanking}
                className="text-xs font-semibold text-[#3156A6] hover:text-[#648BEA] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>View all candidates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E8E0D4] bg-[#FAF7F2]/60 text-[11px] font-semibold text-[#667085] uppercase tracking-wider">
                    <th className="py-3 px-5">Candidate</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4 min-w-[130px]">Match Score</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-5 text-right">Last Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EEE5] font-medium">
                  {candidates.map((cand) => (
                    <tr
                      key={cand.id}
                      onClick={onNavigateToRanking}
                      className="hover:bg-[#FAF7F2] transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-5 font-bold text-[#252B36] group-hover:text-[#3156A6] transition-colors">
                        {cand.name}
                      </td>
                      <td className="py-3.5 px-4 text-[#667085]">
                        {cand.role}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-[#252B36] text-xs w-8">
                            {cand.scores.overallScore}%
                          </span>
                          <div className="w-24 bg-[#EDF3FF] h-2 rounded-full overflow-hidden border border-[#DCE8FF]/50">
                            <div
                              className="bg-[#648BEA] h-full rounded-full transition-all duration-500"
                              style={{ width: `${cand.scores.overallScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            cand.stage === 'Shortlisted'
                              ? 'bg-[#DCEFE3] text-[#347653] border border-[#C6E2D0]'
                              : cand.stage === 'Interview'
                              ? 'bg-[#DCE8FF] text-[#3156A6] border border-[#C4D8FF]'
                              : cand.stage === 'Screening'
                              ? 'bg-[#FFF0C2] text-[#A77A22] border border-[#F6E3A0]'
                              : 'bg-[#F3EEE5] text-[#667085] border border-[#E8E0D4]'
                          }`}
                        >
                          {cand.stage}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right text-[#667085] font-normal">
                        {cand.lastActivity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 border-t border-[#E8E0D4] bg-[#FAF7F2]/60 flex justify-between items-center text-xs">
            <span className="text-[#667085]">Showing top 5 active candidate matches</span>
            <button
              onClick={onNavigateToRanking}
              className="text-xs font-semibold text-[#3156A6] hover:text-[#648BEA] flex items-center gap-1 cursor-pointer"
            >
              <span>Explore full candidate stack ranking →</span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: AI Hiring Insights Panel (Distinctive Light Blue/Lilac Feature Card) */}
        <div className="bg-gradient-to-b from-[#F4F7FF] via-[#EDF3FF]/70 to-[#FAF7F2] rounded-2xl border border-[#DCE8FF] shadow-xs p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#DCE8FF]/80">
              <div className="flex items-center gap-2 text-[#3156A6] font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#648BEA]" />
                <span>AI hiring insights</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#648BEA] bg-white px-2 py-0.5 rounded-full border border-[#DCE8FF]">
                Live Analytics
              </span>
            </div>

            {/* Insight 1: Missing skill - Soft Peach with Terracotta */}
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#FFE4D6] shadow-2xs hover:border-[#FED0BC] transition-all">
              <div className="w-7 h-7 rounded-lg bg-[#FFE4D6] text-[#C77655] border border-[#FED0BC] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                ↓
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-[#252B36]">Most common missing skill</div>
                <div className="text-[#667085] leading-relaxed">
                  <span className="font-bold text-[#C77655]">TypeScript</span> (missing in 6 of 12 candidate submissions)
                </div>
              </div>
            </div>

            {/* Insight 2: Experience alignment - Pale Sage with Green */}
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#DCEFE3] shadow-2xs hover:border-[#C6E2D0] transition-all">
              <div className="w-7 h-7 rounded-lg bg-[#DCEFE3] text-[#347653] border border-[#C6E2D0] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                ↑
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-[#252B36]">Experience requirement alignment</div>
                <div className="text-[#667085] leading-relaxed">
                  <span className="font-bold text-[#347653]">70% of candidates</span> possess 2+ years of relevant frontend experience (vs. 49% market benchmark).
                </div>
              </div>
            </div>

            {/* Insight 3: Top performing skill - Powder Blue with Cobalt */}
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#DCE8FF] shadow-2xs hover:border-[#C4D8FF] transition-all">
              <div className="w-7 h-7 rounded-lg bg-[#DCE8FF] text-[#3156A6] border border-[#C4D8FF] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-[#252B36]">Top performing skill</div>
                <div className="text-[#667085] leading-relaxed">
                  <span className="font-bold text-[#3156A6]">React Ecosystem</span> (present in 9 of 10 evaluated profiles with verified projects).
                </div>
              </div>
            </div>

            {/* Insight 4: Needs-attention observation - Butter Yellow with Muted Gold */}
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#FFF0C2] shadow-2xs hover:border-[#F6E3A0] transition-all">
              <div className="w-7 h-7 rounded-lg bg-[#FFF0C2] text-[#A77A22] border border-[#F6E3A0] flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-[#252B36]">Needs recruiter verification</div>
                <div className="text-[#667085] leading-relaxed">
                  1 candidate has an <span className="font-bold text-[#A77A22]">ambiguous pipeline phrasing</span> awaiting human verification.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCE8FF]">
            <button
              onClick={onNavigateToRanking}
              className="text-xs font-semibold text-[#3156A6] hover:text-[#648BEA] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View detailed skill gap analysis →</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Recent Activity with Coordinated Pastel Accents */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#667085] uppercase tracking-wider">
            Recent activity
          </h2>
          <span className="text-[11px] text-[#667085]">Audit log verified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: JD Uploaded - Powder Blue */}
          <div
            onClick={onNavigateToJD}
            className="p-3.5 bg-white border border-[#E8E0D4] hover:border-[#DCE8FF] hover:bg-[#F4F7FF]/50 rounded-2xl shadow-2xs transition-all cursor-pointer flex items-start gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#EDF3FF] text-[#648BEA] border border-[#DCE8FF] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="text-xs font-bold text-[#252B36] truncate group-hover:text-[#3156A6] transition-colors">
                JD uploaded & parsed
              </div>
              <div className="text-[11px] text-[#667085] truncate">Frontend Developer - Bengaluru</div>
              <div className="text-[10px] text-[#648BEA] font-semibold">2h ago</div>
            </div>
          </div>

          {/* Card 2: 5 CVs Processed - Soft Lilac */}
          <div
            onClick={onNavigateToCVs}
            className="p-3.5 bg-white border border-[#E8E0D4] hover:border-[#EAE1FF] hover:bg-[#F7F2FF]/50 rounded-2xl shadow-2xs transition-all cursor-pointer flex items-start gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#EAE1FF] text-[#7657B6] border border-[#D9CAFA] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="text-xs font-bold text-[#252B36] truncate group-hover:text-[#7657B6] transition-colors">
                5 CVs processed
              </div>
              <div className="text-[11px] text-[#667085] truncate">4 successful, 1 pending review</div>
              <div className="text-[10px] text-[#7657B6] font-semibold">3h ago</div>
            </div>
          </div>

          {/* Card 3: Candidates Ranked - Pale Sage */}
          <div
            onClick={onNavigateToRanking}
            className="p-3.5 bg-white border border-[#E8E0D4] hover:border-[#DCEFE3] hover:bg-[#F1F8F2]/50 rounded-2xl shadow-2xs transition-all cursor-pointer flex items-start gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#DCEFE3] text-[#347653] border border-[#C6E2D0] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="text-xs font-bold text-[#252B36] truncate group-hover:text-[#347653] transition-colors">
                Candidate stack rank
              </div>
              <div className="text-[11px] text-[#667085] truncate">Deterministic rubric scored</div>
              <div className="text-[10px] text-[#347653] font-semibold">5h ago</div>
            </div>
          </div>

          {/* Card 4: Screening Questions Ready - Butter Yellow */}
          <div
            onClick={onNavigateToRanking}
            className="p-3.5 bg-white border border-[#E8E0D4] hover:border-[#FFF0C2] hover:bg-[#FFF6ED]/50 rounded-2xl shadow-2xs transition-all cursor-pointer flex items-start gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FFF0C2] text-[#A77A22] border border-[#F6E3A0] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="text-xs font-bold text-[#252B36] truncate group-hover:text-[#A77A22] transition-colors">
                10 Screening Qs
              </div>
              <div className="text-[11px] text-[#667085] truncate">Tailored strong-answer guides</div>
              <div className="text-[10px] text-[#A77A22] font-semibold">Ready for calls</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
