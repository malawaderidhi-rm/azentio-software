import React, { useState } from 'react';
import {
  Copy,
  Check,
  ShieldCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { JobDescription, SourcingSearchConfig } from '../types';
import { INITIAL_SOURCING_SEARCH } from '../data/mockData';
import { useToast } from './Toast';

interface Step7SearchStringsProps {
  confirmedJD: JobDescription;
  configs?: SourcingSearchConfig[];
  onReturnToOverview: () => void;
  onResetDemo: () => void;
}

export const Step7SearchStrings: React.FC<Step7SearchStringsProps> = ({
  confirmedJD,
  configs = INITIAL_SOURCING_SEARCH,
  onReturnToOverview,
  onResetDemo
}) => {
  const { showToast } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`${label} Copied`, 'Query copied to clipboard.', 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCopyAll = () => {
    const fullSummary = configs
      .map(
        (cfg) =>
          `=== ${cfg.platform.toUpperCase()} SEARCH STRINGS ===\n\n[Boolean Query]:\n${cfg.booleanQuery}\n\n[Plain Language Query]:\n${cfg.plainLanguageQuery}\n\nRecommended Filters:\n• Experience: ${cfg.filters.experience}\n• Location: ${cfg.filters.location}\n• Industry: ${cfg.filters.industry}\n`
      )
      .join('\n----------------------------------------\n\n');

    navigator.clipboard.writeText(
      `TalentIQ — Sourcing Queries for ${confirmedJD.title} (${confirmedJD.location})\n\n${fullSummary}`
    );
    setCopiedKey('all');
    showToast('All Sourcing Queries Copied', 'Naukri and LinkedIn query configurations copied.', 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in font-sans-ui">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E0D4]">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-[#252B36]">
            Sourcing Search
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Platform-optimized Boolean and Plain-language search strings for {confirmedJD.title}.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="px-3.5 py-1.5 bg-[#252B36] hover:bg-[#1E232C] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
        >
          {copiedKey === 'all' ? <Check className="w-3.5 h-3.5 text-[#DCE8FF]" /> : <Copy className="w-3.5 h-3.5 text-[#DCE8FF]" />}
          <span>{copiedKey === 'all' ? 'Copied all queries!' : 'Copy all strings'}</span>
        </button>
      </div>

      {/* Compliance Note in Powder Blue */}
      <div className="p-4 bg-[#EDF3FF]/70 border border-[#DCE8FF] rounded-2xl flex items-start gap-3 text-xs text-[#252B36]">
        <ShieldCheck className="w-4 h-4 text-[#648BEA] shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#3156A6] leading-relaxed">
          <strong>Search Compliance:</strong> Generated strings focus strictly on job titles, required technical skills, and tools. TalentIQ does not scrape private databases or bypass platform sign-in. Use these strings directly in your authorized recruiter seats.
        </p>
      </div>

      {/* Sourcing Platform Cards in Pure White */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {configs.map((config) => {
          const isNaukri = config.platform === 'Naukri';

          return (
            <div
              key={config.platform}
              className="bg-white rounded-2xl border border-[#E8E0D4] shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="p-4 border-b border-[#E8E0D4] flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-2xs ${
                        isNaukri ? 'bg-[#0078DB]' : 'bg-[#0A66C2]'
                      }`}
                    >
                      {isNaukri ? 'N' : 'in'}
                    </div>
                    <div>
                      <h2 className="font-bold text-[#252B36] text-sm">
                        {config.platform} Talent Search
                      </h2>
                      <p className="text-[11px] text-[#667085]">
                        {isNaukri ? 'Naukri Resdex syntax tailored for Indian IT talent' : 'LinkedIn Recruiter boolean & keyword targeting'}
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#EDF3FF] rounded-lg text-[#3156A6] border border-[#DCE8FF]">
                    2 Query Formats
                  </span>
                </div>

                <div className="p-5 space-y-4 text-xs">
                  {/* Boolean Query */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#3156A6] uppercase tracking-wider text-[11px]">
                        A. Boolean Query
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(`${config.platform}-bool`, config.booleanQuery, `${config.platform} Boolean`)
                        }
                        className="px-2.5 py-1 text-[#252B36] hover:text-[#3156A6] hover:bg-[#EDF3FF] rounded-lg text-xs font-semibold border border-[#E8E0D4] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedKey === `${config.platform}-bool` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#347653]" />
                            <span className="text-[#347653]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#667085]" />
                            <span>Copy Boolean</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3 bg-[#F8F5EF] border border-[#E8E0D4] rounded-xl font-mono text-[11px] text-[#252B36] leading-relaxed select-all">
                      {config.booleanQuery}
                    </div>
                  </div>

                  {/* Plain Language Query */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#7657B6] uppercase tracking-wider text-[11px]">
                        B. Plain-Language Query
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(`${config.platform}-plain`, config.plainLanguageQuery, `${config.platform} Plain Query`)
                        }
                        className="px-2.5 py-1 text-[#252B36] hover:text-[#7657B6] hover:bg-[#EAE1FF] rounded-lg text-xs font-semibold border border-[#E8E0D4] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedKey === `${config.platform}-plain` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#347653]" />
                            <span className="text-[#347653]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#667085]" />
                            <span>Copy Plain</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3 bg-[#F8F5EF] border border-[#E8E0D4] rounded-xl text-xs text-[#252B36] leading-relaxed select-all">
                      {config.plainLanguageQuery}
                    </div>
                  </div>

                  {/* Recommended Filters */}
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E0D4] space-y-1">
                    <div className="font-bold text-[#667085] text-[10px] uppercase">
                      Recommended Search Filters
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[11px] pt-0.5">
                      <div>
                        <span className="text-[#667085] block text-[10px]">Exp:</span>
                        <span className="font-bold text-[#252B36]">{config.filters.experience}</span>
                      </div>
                      <div>
                        <span className="text-[#667085] block text-[10px]">Location:</span>
                        <span className="font-bold text-[#252B36]">{config.filters.location}</span>
                      </div>
                      <div>
                        <span className="text-[#667085] block text-[10px]">Industry:</span>
                        <span className="font-bold text-[#252B36]">{config.filters.industry}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FAF7F2]/60 border-t border-[#E8E0D4] flex justify-between items-center text-xs">
                <span className="text-[#667085] font-medium">Ready to deploy in {config.platform}</span>
                <button
                  onClick={() =>
                    handleCopy(`${config.platform}-bool`, config.booleanQuery, `${config.platform} Boolean`)
                  }
                  className="text-[#3156A6] hover:text-[#648BEA] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Quick Copy</span>
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner in Deep Ink with Powder Blue */}
      <div className="p-6 bg-[#252B36] rounded-3xl text-white shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/10 text-[#DCE8FF] border border-white/20 rounded-full font-mono">
                Sourcing Suite Complete
              </span>
              <h3 className="text-base sm:text-lg font-bold">TalentIQ Workflow Ready</h3>
            </div>
            <p className="text-xs text-[#DCE8FF]/80 max-w-xl mt-1 leading-relaxed">
              You can now copy search strings directly into your recruiter seats, revisit candidate rankings, or reset the workspace.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onReturnToOverview}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/20 cursor-pointer"
            >
              Return to Overview
            </button>
            <button
              onClick={onResetDemo}
              className="px-4 py-2 bg-[#F8F5EF] hover:bg-white text-[#252B36] text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#667085]" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
