import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RotateCw,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import { ScreeningQuestionItem, JobDescription } from '../types';
import { INITIAL_SCREENING_QUESTIONS } from '../data/mockData';
import { useToast } from './Toast';

interface Step5ScreeningQuestionsProps {
  confirmedJD: JobDescription;
  questions?: ScreeningQuestionItem[];
  onProceedToMarket: () => void;
  isLiveAi: boolean;
}

export const Step5ScreeningQuestions: React.FC<Step5ScreeningQuestionsProps> = ({
  confirmedJD,
  questions = INITIAL_SCREENING_QUESTIONS,
  onProceedToMarket,
  isLiveAi
}) => {
  const { showToast } = useToast();
  const [copiedAll, setCopiedAll] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);

  const handleCopyAll = () => {
    const text = questions
      .map(
        (q) =>
          `Q${q.number}: ${q.question}\nCompetency: ${q.competency}\nStrong Answer: ${q.strongAnswerGuidance}\nJD Requirement: ${q.jdRequirement}\nGuidance: ${q.guidance}\n`
      )
      .join('\n----------------------------------------\n\n');

    navigator.clipboard.writeText(
      `TalentIQ — 10 Tailored Screening Questions for ${confirmedJD.title}\n\n${text}`
    );
    setCopiedAll(true);
    showToast('Copied all questions', '10 screening questions copied to clipboard.', 'success');
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      showToast('Questions Calibrated', 'Tailored to confirmed role requirements.', 'success');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in font-sans-ui">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E0D4]">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-[#252B36]">
            AI-Generated Screening Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            10 tailored questions based on your job description requirements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="px-3.5 py-1.5 bg-[#EDF3FF] hover:bg-[#DCE8FF] text-[#3156A6] text-xs font-semibold rounded-xl border border-[#DCE8FF] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 text-[#648BEA] ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="px-3.5 py-1.5 bg-white hover:bg-[#FAF7F2] text-[#252B36] text-xs font-semibold rounded-xl border border-[#E8E0D4] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-[#347653]" /> : <Copy className="w-3.5 h-3.5 text-[#667085]" />}
            <span>{copiedAll ? 'Copied all!' : 'Copy all'}</span>
          </button>
        </div>
      </div>

      {/* Main Table of 10 Questions in Pure White */}
      <div className="bg-white rounded-2xl border border-[#E8E0D4] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E8E0D4] bg-[#FAF7F2]/60 text-[11px] font-semibold text-[#667085] uppercase tracking-wider">
                <th className="py-3 px-3 w-10 text-center">#</th>
                <th className="py-3 px-4 min-w-[220px]">Question</th>
                <th className="py-3 px-4 min-w-[130px]">Competency</th>
                <th className="py-3 px-4 min-w-[220px]">Strong Answer Guidance</th>
                <th className="py-3 px-4 min-w-[160px]">JD Requirement</th>
                <th className="py-3 px-4 min-w-[180px]">Probing Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EEE5] font-medium">
              {questions.map((q) => {
                const isTech = q.competency.toLowerCase().includes('technical') || q.competency.toLowerCase().includes('sql') || q.competency.toLowerCase().includes('python');
                const isPractical = q.competency.toLowerCase().includes('project') || q.competency.toLowerCase().includes('hands-on') || q.competency.toLowerCase().includes('pipeline');
                const isCollab = q.competency.toLowerCase().includes('collab') || q.competency.toLowerCase().includes('workflow');

                return (
                  <tr key={q.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-3.5 px-3 text-center text-[#667085] font-bold">
                      {q.number}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#252B36] leading-snug">
                      {q.question}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isTech
                            ? 'bg-[#EDF3FF] text-[#3156A6] border border-[#DCE8FF]'
                            : isPractical
                            ? 'bg-[#EAE1FF] text-[#7657B6] border border-[#D9CAFA]'
                            : isCollab
                            ? 'bg-[#DCEFE3] text-[#347653] border border-[#C6E2D0]'
                            : 'bg-[#FFF0C2] text-[#A77A22] border border-[#F6E3A0]'
                        }`}
                      >
                        {q.competency}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#252B36] font-normal leading-relaxed text-[11px]">
                      {q.strongAnswerGuidance}
                    </td>
                    <td className="py-3.5 px-4 text-[#3156A6] font-semibold text-[11px]">
                      {q.jdRequirement}
                    </td>
                    <td className="py-3.5 px-4 text-[#667085] font-normal text-[11px] leading-relaxed">
                      {q.guidance}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Accordion */}
        <div className="border-t border-[#E8E0D4] bg-[#FAF7F2]/60">
          <button
            onClick={() => setShowFollowUps(!showFollowUps)}
            className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-[#252B36] hover:text-[#3156A6] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#648BEA]" />
              <span>Recommended Probing & Follow-Up Strategy</span>
            </div>
            {showFollowUps ? (
              <ChevronUp className="w-4 h-4 text-[#667085]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#667085]" />
            )}
          </button>

          {showFollowUps && (
            <div className="p-4 pt-0 text-xs text-[#667085] space-y-2 leading-relaxed bg-[#FAF7F2]/60 animate-in fade-in">
              <p>
                <strong>Evaluation Technique:</strong> Spend the first 10 minutes on technical fundamentals (SQL joins & transformations), followed by 10 minutes dissecting candidate-owned pipeline projects, and conclude with debugging questions.
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-[#E8E0D4] bg-white flex items-center justify-between text-xs">
          <span className="text-[#667085]">Questions tailored for 30-minute screening interviews.</span>
          <button
            onClick={onProceedToMarket}
            className="px-4 py-2 bg-[#252B36] hover:bg-[#1E232C] text-white font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Proceed to Market Intelligence</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#DCE8FF]" />
          </button>
        </div>
      </div>
    </div>
  );
};
