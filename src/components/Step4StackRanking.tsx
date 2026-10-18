import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  ChevronDown,
  X,
  Check,
  AlertCircle,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CandidateProfile, JobDescription } from '../types';
import { useToast } from './Toast';

interface Step4StackRankingProps {
  candidates: CandidateProfile[];
  confirmedJD: JobDescription;
  onUpdateCandidates: (candidates: CandidateProfile[]) => void;
  onNavigateToJD: () => void;
  onProceedToQuestions: () => void;
}

export const Step4StackRanking: React.FC<Step4StackRankingProps> = ({
  candidates,
  confirmedJD,
  onUpdateCandidates,
  onNavigateToJD,
  onProceedToQuestions
}) => {
  const { showToast } = useToast();

  const [scoreRange, setScoreRange] = useState<string>('0-100');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('score_high');

  const [drawerCandidate, setDrawerCandidate] = useState<CandidateProfile | null>(candidates[0] || null);
  const [drawerTab, setDrawerTab] = useState<'overview' | 'skills' | 'evidence' | 'explanation'>('overview');

  const [reviewNote, setReviewNote] = useState('');

  const handleReviewCorrection = (decision: 'confirm' | 'reject' | 'reset') => {
    if (!drawerCandidate) return;

    const prevScore = drawerCandidate.scores.overallScore;
    let newScore = prevScore;
    let newReqScore = drawerCandidate.scores.requiredSkillsScore;
    const cloned = JSON.parse(JSON.stringify(drawerCandidate)) as CandidateProfile;

    if (decision === 'confirm') {
      newScore = Math.min(100, prevScore + 6);
      newReqScore = Math.min(100, newReqScore + 8);
      cloned.scores.overallScore = newScore;
      cloned.scores.requiredSkillsScore = newReqScore;
      cloned.recommendation = 'Strong match';
      if (cloned.humanReview) {
        cloned.humanReview.status = 'confirmed';
        cloned.humanReview.reviewerNote = reviewNote || 'Verified as automated daily batch transformation script.';
      }
      cloned.auditHistory = [
        ...(cloned.auditHistory || []),
        {
          timestamp: new Date().toLocaleTimeString(),
          action: 'Pipeline Experience Verified',
          prevScore,
          newScore,
          note: reviewNote || 'Verified daily data refresh meets pipeline requirements (+6 pts).'
        }
      ];
      showToast('Human Review Saved', `${cloned.name} score updated from ${prevScore} to ${newScore}/100 (+6 pts)`, 'success');
    } else if (decision === 'reject') {
      if (cloned.humanReview) {
        cloned.humanReview.status = 'rejected';
        cloned.humanReview.reviewerNote = reviewNote || 'Classified as ad-hoc reporting refresh.';
      }
      showToast('Item Disqualified', `${cloned.name} marked as ad-hoc report refresh (0 pts added).`, 'info');
    } else {
      newScore = 83;
      newReqScore = 80;
      cloned.scores.overallScore = newScore;
      cloned.scores.requiredSkillsScore = newReqScore;
      cloned.recommendation = 'Potential match';
      if (cloned.humanReview) {
        cloned.humanReview.status = 'pending';
        cloned.humanReview.reviewerNote = '';
      }
      showToast('Review Reset', `${cloned.name} restored to baseline unreviewed score.`, 'info');
    }

    const updatedList = candidates.map((c) => (c.id === cloned.id ? cloned : c));
    onUpdateCandidates(updatedList);
    setDrawerCandidate(cloned);
    setReviewNote('');
  };

  const filteredCandidates = useMemo(() => {
    let list = [...candidates];

    if (scoreRange === '80-100') {
      list = list.filter((c) => c.scores.overallScore >= 80);
    } else if (scoreRange === '60-79') {
      list = list.filter((c) => c.scores.overallScore >= 60 && c.scores.overallScore < 80);
    }

    if (selectedSkillFilter !== 'all') {
      list = list.filter((c) => c.matchedSkills.includes(selectedSkillFilter));
    }

    if (experienceFilter === '2plus') {
      list = list.filter((c) => parseFloat(c.experienceYears) >= 2.0);
    }

    if (sortBy === 'score_high') {
      list.sort((a, b) => b.scores.overallScore - a.scores.overallScore);
    } else if (sortBy === 'score_low') {
      list.sort((a, b) => a.scores.overallScore - b.scores.overallScore);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [candidates, scoreRange, selectedSkillFilter, experienceFilter, sortBy]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in font-sans-ui">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-[#252B36]">
          Candidate Ranking
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
          AI-powered ranking based on your job requirements and extracted CV evidence.
        </p>
      </div>

      {/* Role Banner Card */}
      <div className="bg-white rounded-2xl border border-[#E8E0D4] shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EDF3FF] text-[#648BEA] border border-[#DCE8FF] flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#252B36]">
              {confirmedJD.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-[#667085] mt-0.5 flex-wrap font-medium">
              <span>{confirmedJD.workArrangement}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[#648BEA]" />
                <span>5 CVs parsed</span>
              </span>
              <span>•</span>
              <span className="text-[#347653] font-bold">{candidates.length} ranked</span>
            </div>
          </div>
        </div>

        <button
          onClick={onNavigateToJD}
          className="px-3.5 py-1.5 bg-[#FAF7F2] hover:bg-[#F3EEE5] text-[#252B36] text-xs font-semibold rounded-xl border border-[#E8E0D4] transition-colors self-start sm:self-center cursor-pointer"
        >
          View JD Criteria
        </button>
      </div>

      {/* Filter and Sort Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#E8E0D4] flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Score Range */}
          <div className="space-y-1">
            <span className="text-[11px] text-[#667085] font-bold block">Score Range</span>
            <div className="relative">
              <select
                value={scoreRange}
                onChange={(e) => setScoreRange(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-[#E8E0D4] bg-white font-semibold text-[#252B36] focus:outline-none focus:ring-2 focus:ring-[#DCE8FF] focus:border-[#648BEA] appearance-none pr-7 cursor-pointer"
              >
                <option value="0-100">0 - 100</option>
                <option value="80-100">80 - 100</option>
                <option value="60-79">60 - 79</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#667085] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Required Skills */}
          <div className="space-y-1">
            <span className="text-[11px] text-[#667085] font-bold block">Required Skills</span>
            <div className="relative">
              <select
                value={selectedSkillFilter}
                onChange={(e) => setSelectedSkillFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-[#E8E0D4] bg-white font-semibold text-[#252B36] focus:outline-none focus:ring-2 focus:ring-[#DCE8FF] focus:border-[#648BEA] appearance-none pr-7 cursor-pointer"
              >
                <option value="all">All skills</option>
                <option value="React">React</option>
                <option value="TypeScript">TypeScript</option>
                <option value="JavaScript">JavaScript</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#667085] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Experience Alignment */}
          <div className="space-y-1">
            <span className="text-[11px] text-[#667085] font-bold block">Experience Alignment</span>
            <div className="relative">
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-[#E8E0D4] bg-white font-semibold text-[#252B36] focus:outline-none focus:ring-2 focus:ring-[#DCE8FF] focus:border-[#648BEA] appearance-none pr-7 cursor-pointer"
              >
                <option value="all">All</option>
                <option value="2plus">2+ years</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#667085] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <span className="text-[11px] text-[#667085] font-bold block">Sort by</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-[#E8E0D4] bg-white font-semibold text-[#252B36] focus:outline-none focus:ring-2 focus:ring-[#DCE8FF] focus:border-[#648BEA] appearance-none pr-7 cursor-pointer"
              >
                <option value="score_high">Overall Score (High to Low)</option>
                <option value="score_low">Overall Score (Low to High)</option>
                <option value="name">Candidate Name</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#667085] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Ranking Table in Pure White */}
      <div className="bg-white rounded-2xl border border-[#E8E0D4] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E8E0D4] bg-[#FAF7F2]/60 text-[11px] font-semibold text-[#667085] uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4 min-w-[130px]">Overall Match</th>
                <th className="py-3 px-4 min-w-[120px]">Required Skills</th>
                <th className="py-3 px-4 min-w-[120px]">Experience</th>
                <th className="py-3 px-4">Preferred Skills</th>
                <th className="py-3 px-4">Recommendation</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EEE5] font-medium">
              {filteredCandidates.map((cand, index) => {
                const isSelected = drawerCandidate?.id === cand.id;

                return (
                  <tr
                    key={cand.id}
                    onClick={() => setDrawerCandidate(cand)}
                    className={`hover:bg-[#FAF7F2] transition-colors cursor-pointer group ${
                      isSelected ? 'bg-[#EDF3FF]/40' : ''
                    }`}
                  >
                    <td className="py-4 px-4 text-center text-[#667085] font-bold">
                      {index + 1}
                    </td>

                    {/* Candidate Name & Initials Avatar */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#EDF3FF] text-[#3156A6] font-bold text-[11px] flex items-center justify-center shrink-0 border border-[#DCE8FF]">
                          {cand.initials}
                        </div>
                        <div>
                          <div className="font-bold text-[#252B36] group-hover:text-[#3156A6] transition-colors">{cand.name}</div>
                          <div className="text-[10px] text-[#667085]">{cand.experienceYears}</div>
                        </div>
                      </div>
                    </td>

                    {/* Overall Match: Cornflower Blue */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#252B36] w-8">
                          {cand.scores.overallScore}%
                        </span>
                        <div className="w-16 bg-[#EDF3FF] h-1.5 rounded-full overflow-hidden border border-[#DCE8FF]/50">
                          <div
                            className="bg-[#648BEA] h-full rounded-full"
                            style={{ width: `${cand.scores.overallScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Required Skills Match: Muted Violet */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#252B36] w-8">
                          {cand.scores.requiredSkillsScore}%
                        </span>
                        <div className="w-16 bg-[#EAE1FF] h-1.5 rounded-full overflow-hidden border border-[#D9CAFA]/50">
                          <div
                            className="bg-[#7657B6] h-full rounded-full"
                            style={{ width: `${cand.scores.requiredSkillsScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Experience Match: Forest Green */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#252B36] w-8">
                          {cand.scores.experienceScore}%
                        </span>
                        <div className="w-16 bg-[#DCEFE3] h-1.5 rounded-full overflow-hidden border border-[#C6E2D0]/50">
                          <div
                            className="bg-[#347653] h-full rounded-full"
                            style={{ width: `${cand.scores.experienceScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Preferred Skills */}
                    <td className="py-4 px-4 text-[#667085] font-medium">
                      {cand.preferredSkills.join(', ')}
                    </td>

                    {/* Recommendation Pill */}
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          cand.recommendation === 'Strong match'
                            ? 'bg-[#DCEFE3] text-[#347653] border border-[#C6E2D0]'
                            : cand.recommendation === 'Potential match'
                            ? 'bg-[#FFF0C2] text-[#A77A22] border border-[#F6E3A0]'
                            : 'bg-[#FFE4D6] text-[#C77655] border border-[#FED0BC]'
                        }`}
                      >
                        {cand.recommendation}
                      </span>
                    </td>

                    {/* Actions View Button */}
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDrawerCandidate(cand);
                        }}
                        className="px-3 py-1 bg-white hover:bg-[#EDF3FF] text-[#3156A6] text-xs font-semibold rounded-lg border border-[#DCE8FF] transition-colors shadow-2xs cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-[#E8E0D4] bg-[#FAF7F2]/60 flex items-center justify-between text-xs text-[#667085]">
          <span>Showing 1-5 of 5 candidates</span>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded-lg border border-[#E8E0D4] text-[#667085] hover:text-[#252B36] hover:bg-white cursor-pointer transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 h-6 rounded-lg bg-[#252B36] text-white font-bold flex items-center justify-center text-xs">
              1
            </span>
            <button className="p-1 rounded-lg border border-[#E8E0D4] text-[#667085] hover:text-[#252B36] hover:bg-white cursor-pointer transition-colors">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over Side Drawer in warm white and linen */}
      {drawerCandidate && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#FAF7F2] border-l border-[#E8E0D4] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#E8E0D4] bg-white flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EDF3FF] text-[#3156A6] font-bold text-xs flex items-center justify-center shrink-0 border border-[#DCE8FF]">
                {drawerCandidate.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#252B36] text-sm">
                    {drawerCandidate.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      drawerCandidate.recommendation === 'Strong match'
                        ? 'bg-[#DCEFE3] text-[#347653] border border-[#C6E2D0]'
                        : 'bg-[#FFF0C2] text-[#A77A22] border border-[#F6E3A0]'
                    }`}
                  >
                    {drawerCandidate.recommendation}
                  </span>
                </div>
                <p className="text-[11px] text-[#667085] mt-0.5">
                  {drawerCandidate.role} • {drawerCandidate.experienceYears}
                </p>
              </div>
            </div>

            <button
              onClick={() => setDrawerCandidate(null)}
              className="p-1 text-[#667085] hover:text-[#252B36] rounded-lg hover:bg-[#F3EEE5] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-[#252B36]">
            {/* Score Circle Badge */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8E0D4] flex items-center gap-4 shadow-2xs">
              <div className="w-14 h-14 rounded-full bg-[#EDF3FF] border-2 border-[#648BEA] flex flex-col items-center justify-center shrink-0 shadow-2xs">
                <span className="font-bold text-base text-[#3156A6] leading-none">
                  {drawerCandidate.scores.overallScore}
                </span>
                <span className="text-[9px] text-[#648BEA] font-semibold">/ 100</span>
              </div>
              <div>
                <div className="font-bold text-[#252B36] text-xs">Overall Evidence Score</div>
                <p className="text-[11px] text-[#667085] mt-0.5 leading-snug">
                  Evidence-backed score evaluated against required skills, experience, and domain alignment.
                </p>
              </div>
            </div>

            {/* Rubric Category Points Breakdown */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8E0D4] space-y-3 shadow-2xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#667085]">Required Skills</span>
                  <span className="font-bold text-[#3156A6]">
                    {drawerCandidate.scores.breakdown[0]?.awardedPoints || 50} / 50
                  </span>
                </div>
                <div className="w-full bg-[#EDF3FF] h-1.5 rounded-full overflow-hidden border border-[#DCE8FF]/50">
                  <div
                    className="bg-[#648BEA] h-full rounded-full"
                    style={{ width: `${(drawerCandidate.scores.breakdown[0]?.awardedPoints || 50) * 2}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-semibold pt-1">
                  <span className="text-[#667085]">Experience Alignment</span>
                  <span className="font-bold text-[#347653]">
                    {drawerCandidate.scores.breakdown[1]?.awardedPoints || 22} / 25
                  </span>
                </div>
                <div className="w-full bg-[#DCEFE3] h-1.5 rounded-full overflow-hidden border border-[#C6E2D0]/50">
                  <div
                    className="bg-[#347653] h-full rounded-full"
                    style={{ width: `${((drawerCandidate.scores.breakdown[1]?.awardedPoints || 22) / 25) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-semibold pt-1">
                  <span className="text-[#667085]">Domain Relevance</span>
                  <span className="font-bold text-[#7657B6]">
                    {drawerCandidate.scores.breakdown[2]?.awardedPoints || 13} / 15
                  </span>
                </div>
                <div className="w-full bg-[#EAE1FF] h-1.5 rounded-full overflow-hidden border border-[#D9CAFA]/50">
                  <div
                    className="bg-[#7657B6] h-full rounded-full"
                    style={{ width: `${((drawerCandidate.scores.breakdown[2]?.awardedPoints || 13) / 15) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-semibold pt-1">
                  <span className="text-[#667085]">Preferred Skills</span>
                  <span className="font-bold text-[#C77655]">
                    {drawerCandidate.scores.breakdown[3]?.awardedPoints || 7} / 10
                  </span>
                </div>
                <div className="w-full bg-[#FFF6ED] h-1.5 rounded-full overflow-hidden border border-[#FFE4D6]/50">
                  <div
                    className="bg-[#C77655] h-full rounded-full"
                    style={{ width: `${((drawerCandidate.scores.breakdown[3]?.awardedPoints || 7) / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Drawer Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#F3EEE5] rounded-xl border border-[#E8E0D4] text-xs font-semibold">
              {(['overview', 'skills', 'evidence', 'explanation'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDrawerTab(tab)}
                  className={`flex-1 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
                    drawerTab === tab
                      ? 'bg-white text-[#3156A6] font-bold shadow-2xs'
                      : 'text-[#667085] hover:text-[#252B36]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview */}
            {drawerTab === 'overview' && (
              <div className="space-y-4">
                {/* Matched Skills: Sage Green */}
                <div className="space-y-1.5">
                  <span className="font-bold text-[#347653] text-xs">Matched Skills ({drawerCandidate.matchedSkills.length})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {drawerCandidate.matchedSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 bg-[#DCEFE3] text-[#347653] rounded-xl text-[11px] font-bold border border-[#C6E2D0]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills: Soft Peach & Terracotta */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 font-bold text-[#C77655] text-xs">
                    <span>Missing Skills ({drawerCandidate.missingSkills.length})</span>
                    <AlertCircle className="w-3.5 h-3.5 text-[#C77655]" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {drawerCandidate.missingSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 bg-[#FFE4D6] text-[#C77655] rounded-xl text-[11px] font-bold border border-[#FED0BC]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Evidence Box */}
                <div className="space-y-1.5">
                  <span className="font-bold text-[#252B36] text-xs">Key Evidence Snippet</span>
                  <div className="p-3.5 bg-white rounded-2xl border border-[#E8E0D4] space-y-1 shadow-2xs">
                    <p className="italic font-serif-body text-[#252B36] text-xs leading-relaxed">
                      &ldquo;{drawerCandidate.keyEvidence}&rdquo;
                    </p>
                    <span className="text-[10px] text-[#667085] block font-mono">
                      Source: {drawerCandidate.filename}
                    </span>
                  </div>
                </div>

                {/* Ambiguous Item Human Review if present: Butter Yellow */}
                {drawerCandidate.humanReview && (
                  <div className="p-3.5 bg-[#FFF0C2]/50 border border-[#F6E3A0] rounded-2xl space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-[#A77A22] text-xs">
                      <AlertCircle className="w-3.5 h-3.5 text-[#A77A22]" />
                      <span>Human Recruiter Verification</span>
                    </div>
                    <p className="text-[11px] text-[#252B36]">
                      Item: <em className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#F6E3A0] text-[#A77A22] font-semibold">&ldquo;{drawerCandidate.humanReview.item}&rdquo;</em>
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <input
                        type="text"
                        placeholder="Reviewer note..."
                        value={reviewNote}
                        onChange={(e) => setReviewNote(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-[#E8E0D4] rounded-xl bg-white text-[#252B36] focus:outline-none focus:ring-2 focus:ring-[#DCE8FF]"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleReviewCorrection('confirm')}
                          className="px-3 py-1.5 bg-[#347653] hover:bg-[#2C6245] text-white text-[11px] font-bold rounded-xl shadow-2xs cursor-pointer"
                        >
                          Confirm (+6 pts)
                        </button>
                        <button
                          onClick={() => handleReviewCorrection('reject')}
                          className="px-3 py-1.5 bg-[#FFE4D6] hover:bg-[#FED0BC] text-[#C77655] text-[11px] font-bold rounded-xl border border-[#FED0BC] cursor-pointer"
                        >
                          Disqualify
                        </button>
                        {drawerCandidate.humanReview.status !== 'pending' && (
                          <button
                            onClick={() => handleReviewCorrection('reset')}
                            className="text-[10px] text-[#667085] underline ml-auto cursor-pointer"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Skills */}
            {drawerTab === 'skills' && (
              <div className="space-y-3">
                <span className="font-bold text-[#252B36] text-xs">Detailed Skill Audit</span>
                <div className="divide-y divide-[#F3EEE5] text-xs bg-white rounded-2xl border border-[#E8E0D4] p-3 shadow-2xs">
                  {drawerCandidate.matchedSkills.map((skill) => (
                    <div key={skill} className="py-2 flex items-center justify-between">
                      <span className="font-semibold text-[#252B36]">{skill}</span>
                      <span className="text-[#347653] text-[11px] font-bold flex items-center gap-1 bg-[#DCEFE3] px-2 py-0.5 rounded-lg border border-[#C6E2D0]">
                        <Check className="w-3.5 h-3.5" /> Evidenced
                      </span>
                    </div>
                  ))}
                  {drawerCandidate.missingSkills.map((skill) => (
                    <div key={skill} className="py-2 flex items-center justify-between">
                      <span className="text-[#667085]">{skill}</span>
                      <span className="text-[#C77655] text-[11px] font-semibold bg-[#FFE4D6] px-2 py-0.5 rounded-lg border border-[#FED0BC]">
                        Not Evidenced
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Evidence */}
            {drawerTab === 'evidence' && (
              <div className="space-y-3">
                <span className="font-bold text-[#252B36] text-xs">Extracted CV Quotes</span>
                <div className="space-y-2">
                  {drawerCandidate.fullEvidenceQuotes.map((q, i) => (
                    <div key={i} className="p-3.5 bg-white rounded-2xl border border-[#E8E0D4] space-y-1 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase text-[#648BEA] tracking-wider">{q.section}</span>
                      <p className="italic font-editorial text-xs text-[#252B36] leading-relaxed">&ldquo;{q.quote}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Explanation */}
            {drawerTab === 'explanation' && (
              <div className="space-y-3 text-xs leading-relaxed text-[#667085]">
                <span className="font-bold text-[#252B36] text-xs">Scoring Explanation</span>
                <p>
                  Rankings reflect structured evidence matching against confirmed {confirmedJD.title} requirements.
                  Candidate scores are calculated deterministically across the 4 rubric categories without proxy inferences.
                </p>
                <div className="p-3.5 bg-[#EDF3FF] border border-[#DCE8FF] rounded-2xl text-[#3156A6] text-[11px] leading-relaxed">
                  <strong>Human Oversight:</strong> TalentIQ treats ranking scores as decision support rather than automated hiring decisions.
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-[#E8E0D4] bg-white flex justify-between items-center">
            <span className="text-[11px] text-[#667085] font-medium">
              Candidate #{drawerCandidate.rank}
            </span>
            <button
              onClick={() => setDrawerCandidate(null)}
              className="px-4 py-2 bg-[#252B36] hover:bg-[#1E232C] text-white text-xs font-bold rounded-xl cursor-pointer transition-all shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
