import React from 'react';
import {
  Settings,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  LogOut,
  X,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { RecruiterSession } from '../types';

interface SettingsModalProps {
  session: RecruiterSession;
  onClose: () => void;
  onResetDemo: () => void;
  onSignOut: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  session,
  onClose,
  onResetDemo,
  onSignOut
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in font-sans-ui">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E8E0D4] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#E8E0D4] flex items-center justify-between bg-[#FAF7F2]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EDF3FF] text-[#648BEA] border border-[#DCE8FF] flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#252B36] text-sm">Workspace Settings</h3>
              <p className="text-[11px] text-[#667085]">TalentIQ configuration & demo state</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#667085] hover:text-[#252B36] rounded-lg hover:bg-[#F3EEE5] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-[#252B36]">
          {/* Recruiter Profile */}
          <div className="space-y-2">
            <span className="font-bold text-[#252B36] text-xs uppercase tracking-wider block">
              Recruiter Profile
            </span>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E0D4] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#648BEA] text-white font-bold text-xs flex items-center justify-center ring-2 ring-[#DCE8FF]">
                  {session.avatarInitials || 'RT'}
                </div>
                <div>
                  <div className="font-bold text-[#252B36]">{session.name || 'Recruiter TA'}</div>
                  <div className="text-[11px] text-[#667085]">{session.email}</div>
                  <div className="text-[10px] text-[#3156A6] font-semibold">{session.role} • {session.organization}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-[#DCEFE3] text-[#347653] font-bold rounded-full text-[10px] border border-[#C6E2D0]">
                Active Session
              </span>
            </div>
          </div>

          {/* AI Model Architecture */}
          <div className="space-y-2">
            <span className="font-bold text-[#252B36] text-xs uppercase tracking-wider block">
              AI & Evidence Extraction Model
            </span>
            <div className="p-3 bg-[#EDF3FF]/70 rounded-xl border border-[#DCE8FF] space-y-1 text-[#252B36]">
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5 text-[#3156A6]">
                  <Sparkles className="w-3.5 h-3.5 text-[#648BEA]" />
                  <span>Google Gemini 3.8 Flash</span>
                </span>
                <span className="text-[10px] text-[#3156A6] font-semibold bg-white px-2 py-0.5 rounded border border-[#DCE8FF]">
                  Server-side
                </span>
              </div>
              <p className="text-[11px] text-[#667085]">
                Powers structured JD parsing, candidate evidence extraction, and tailored screening questions.
              </p>
            </div>
          </div>

          {/* Scoring Rubric Weights */}
          <div className="space-y-2">
            <span className="font-bold text-[#252B36] text-xs uppercase tracking-wider block">
              Rubric Weights (100 Points Total)
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 bg-[#F4F7FF] border border-[#DCE8FF] rounded-lg">
                <span className="text-[#667085] block">Required Skills</span>
                <span className="font-bold text-[#3156A6]">50 Points Max</span>
              </div>
              <div className="p-2.5 bg-[#F1F8F2] border border-[#DCEFE3] rounded-lg">
                <span className="text-[#667085] block">Experience Alignment</span>
                <span className="font-bold text-[#347653]">25 Points Max</span>
              </div>
              <div className="p-2.5 bg-[#F7F2FF] border border-[#EAE1FF] rounded-lg">
                <span className="text-[#667085] block">Domain Relevance</span>
                <span className="font-bold text-[#7657B6]">15 Points Max</span>
              </div>
              <div className="p-2.5 bg-[#FFF6ED] border border-[#FFE4D6] rounded-lg">
                <span className="text-[#667085] block">Preferred Skills</span>
                <span className="font-bold text-[#C77655]">10 Points Max</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8E0D4] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onResetDemo();
            }}
            className="px-3.5 py-1.5 text-[#C77655] hover:bg-[#FFE4D6]/50 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Workspace</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="px-4 py-2 bg-[#252B36] hover:bg-[#1E232C] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-[#DCE8FF]" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
