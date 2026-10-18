import React, { useState } from 'react';
import {
  TrendingUp,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCw,
  Building2,
  MapPin,
  Briefcase
} from 'lucide-react';
import { MarketIntelligenceItem, JobDescription } from '../types';
import { INITIAL_MARKET_INTELLIGENCE } from '../data/mockData';
import { useToast } from './Toast';

interface Step6MarketInsightsProps {
  confirmedJD: JobDescription;
  insights?: MarketIntelligenceItem[];
  onProceedToSearchStrings: () => void;
}

export const Step6MarketInsights: React.FC<Step6MarketInsightsProps> = ({
  confirmedJD,
  insights = INITIAL_MARKET_INTELLIGENCE,
  onProceedToSearchStrings
}) => {
  const { showToast } = useToast();
  const [isReviewed, setIsReviewed] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleMarkAsReviewed = () => {
    setIsReviewed(true);
    showToast('Market Intelligence Reviewed', 'Confirmed alignment with Bengaluru compensation benchmarks.', 'success');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Market Data Refreshed', 'Refreshed benchmarks for Frontend Developer in Bengaluru.', 'info');
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in font-sans-ui">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E0D4]">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-[#252B36]">
            Market Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Compensation benchmarks and hiring requirements for {confirmedJD.title} roles in Bengaluru.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-1.5 bg-[#EDF3FF] hover:bg-[#DCE8FF] text-[#3156A6] text-xs font-semibold rounded-xl border border-[#DCE8FF] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 text-[#648BEA] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleMarkAsReviewed}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
              isReviewed
                ? 'bg-[#DCEFE3] border border-[#C6E2D0] text-[#347653]'
                : 'bg-[#252B36] hover:bg-[#1E232C] text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isReviewed ? 'Reviewed' : 'Mark as reviewed'}</span>
          </button>
        </div>
      </div>

      {/* Verified vs Estimate Notice in Powder Blue */}
      <div className="p-4 bg-[#EDF3FF]/70 border border-[#DCE8FF] rounded-2xl flex items-start gap-3 text-xs text-[#252B36]">
        <ShieldCheck className="w-4 h-4 text-[#648BEA] shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#3156A6] leading-relaxed">
          <strong>Market Data Integrity:</strong> Public job postings cite direct corporate career portals. Aggregated figures are clearly labeled as <em className="font-semibold">&ldquo;Illustrative estimate — not verified live&rdquo;</em> with explicit rationale.
        </p>
      </div>

      {/* Benchmarks List in Pure White */}
      <div className="bg-white rounded-2xl border border-[#E8E0D4] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E8E0D4] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#648BEA]" />
            <h2 className="text-xs font-bold text-[#252B36] uppercase tracking-wider">
              Bengaluru Tech Ecosystem Compensation ({insights.length} Companies & Aggregates)
            </h2>
          </div>
          <span className="text-[11px] text-[#667085]">Pay Period: Annual CTC (INR)</span>
        </div>

        <div className="divide-y divide-[#F3EEE5]">
          {insights.map((item) => (
            <div key={item.id} className="p-5 sm:p-6 hover:bg-[#FAF7F2] transition-colors space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[#252B36] text-sm sm:text-base">
                      {item.company}
                    </span>
                    <span className="text-xs text-[#667085] font-medium">• {item.role}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#667085] mt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-[#648BEA]" />
                      <span>Experience: <strong>{item.experienceRange}</strong></span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#648BEA]" />
                      <span>{item.location} ({item.workArrangement})</span>
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-base sm:text-lg font-bold text-[#252B36] font-mono">
                    {item.compensationRange}
                  </div>
                  <div className="text-[10px] text-[#667085] uppercase tracking-wider">
                    {item.currency}
                  </div>
                </div>
              </div>

              {/* Status Badge & Verification Source */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E0D4] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.status === 'Verified public posting' ? (
                    <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#DCEFE3] text-[#347653] border border-[#C6E2D0] rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#347653]" />
                      <span>Verified public posting</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#FFF0C2] text-[#A77A22] border border-[#F6E3A0] rounded-full flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-[#A77A22]" />
                      <span>Illustrative estimate — not verified live</span>
                    </span>
                  )}

                  <span className="text-[#667085] text-[11px]">
                    Source: <strong className="text-[#252B36]">{item.sourceName}</strong> ({item.dateChecked})
                  </span>
                </div>

                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3156A6] hover:text-[#648BEA] transition-colors"
                  >
                    <span>Verify source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {item.estimateRationale && (
                <p className="text-[11px] text-[#667085] bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8E0D4]">
                  <strong>Estimate Rationale:</strong> {item.estimateRationale}
                </p>
              )}

              {/* Skills Highlights in Soft Lilac */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[11px] font-bold text-[#667085] mr-1">Skills Highlight:</span>
                {item.skillsHighlight.map((req, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-[#EAE1FF] text-[#7657B6] rounded-lg text-[10px] font-semibold border border-[#D9CAFA]"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-4 bg-white border border-[#E8E0D4] rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-[#667085]">
          Ready to generate platform-specific sourcing queries?
        </span>
        <button
          onClick={onProceedToSearchStrings}
          className="px-4 py-2 bg-[#252B36] hover:bg-[#1E232C] text-white font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <span>Proceed to Sourcing Search</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#DCE8FF]" />
        </button>
      </div>
    </div>
  );
};
