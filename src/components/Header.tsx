import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  Sparkles,
  ArrowLeftRight,
  RotateCcw,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { RecruiterSession } from '../types';

interface HeaderProps {
  session: RecruiterSession;
  currentStepName: string;
  onNavigateBack?: () => void;
  selectedRole: string;
  onSelectRole: (role: string) => void;
  onStartNewScreening: () => void;
  onSignOut: () => void;
  onResetDemo: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  session,
  currentStepName,
  onNavigateBack,
  selectedRole,
  onSelectRole,
  onStartNewScreening,
  onSignOut,
  onResetDemo,
  searchQuery,
  onSearchChange
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const roles = [
    'Frontend Developer - Bengaluru',
    'Junior Data Engineer - Bengaluru',
    'Full Stack Engineer - Remote'
  ];

  return (
    <header className="h-16 border-b border-[#E8E0D4] bg-[#FAF7F2]/95 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between gap-4 font-sans-ui">
      {/* Left: Breadcrumb / Section Context */}
      <div className="flex items-center gap-2 min-w-0">
        {onNavigateBack && currentStepName !== 'Overview' && (
          <button
            onClick={onNavigateBack}
            className="p-1.5 -ml-1 text-[#667085] hover:text-[#252B36] hover:bg-[#F3EEE5] rounded-xl transition-colors flex items-center text-xs font-medium cursor-pointer"
            title="Go back"
          >
            <ChevronLeft className="w-4 h-4 mr-0.5" />
            <span className="text-[#667085] hidden sm:inline font-medium">Back</span>
          </button>
        )}
        <span className="text-xs md:text-sm font-semibold tracking-tight text-[#252B36] truncate">
          {currentStepName}
        </span>
      </div>

      {/* Center: Search input */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search candidates, roles, skills..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white hover:bg-[#FAF7F2] focus:bg-white border border-[#E8E0D4] focus:border-[#648BEA] focus:ring-2 focus:ring-[#DCE8FF] rounded-xl transition-all placeholder:text-[#667085] text-[#252B36] font-medium"
          />
        </div>
      </div>

      {/* Right: Role Selector, Action Button, Demo badge & Avatar */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#252B36] bg-[#F3EEE5] hover:bg-[#EAE3D6] border border-[#E8E0D4] rounded-xl transition-all cursor-pointer"
          >
            <span className="truncate max-w-[170px] sm:max-w-none">{selectedRole}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#667085] shrink-0" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-1.5 w-60 bg-white border border-[#E8E0D4] shadow-xl rounded-2xl py-1 z-50 animate-in fade-in">
              <div className="px-3.5 py-1.5 text-[10px] uppercase font-bold text-[#667085] tracking-wider">
                Active Hiring Roles
              </div>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onSelectRole(r);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    selectedRole === r
                      ? 'bg-[#EDF3FF] text-[#3156A6] font-bold'
                      : 'text-[#667085] hover:bg-[#FAF7F2] hover:text-[#252B36]'
                  }`}
                >
                  <span>{r}</span>
                  {selectedRole === r && <span className="w-1.5 h-1.5 rounded-full bg-[#648BEA]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Start a new screening: Premium Cornflower / Deep Ink button with Powder Blue accent */}
        <button
          onClick={onStartNewScreening}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#252B36] hover:bg-[#1E232C] active:bg-[#151922] text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-[0.99] cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#DCE8FF]" />
          <span>Start a new screening</span>
        </button>

        {/* Demo Workspace Badge in subtle powder blue */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#EDF3FF] border border-[#DCE8FF] text-[#3156A6] rounded-xl text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#648BEA] animate-pulse" />
          <span>Demo Workspace</span>
          <ArrowLeftRight className="w-3 h-3 text-[#648BEA]" />
        </div>

        {/* Recruiter Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded-full bg-[#648BEA] hover:bg-[#527AD9] text-white font-bold text-xs flex items-center justify-center transition-all ring-2 ring-[#DCE8FF] shadow-xs cursor-pointer"
            title="Recruiter Account"
          >
            {session.avatarInitials || 'RT'}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E8E0D4] shadow-xl rounded-2xl py-2 z-50 animate-in fade-in text-xs">
              <div className="px-4 py-2.5 border-b border-[#F3EEE5]">
                <p className="font-bold text-[#252B36]">{session.name || 'Recruiter TA'}</p>
                <p className="text-[11px] text-[#667085]">{session.email}</p>
                <p className="text-[10px] text-[#648BEA] font-semibold mt-0.5">{session.role} • {session.organization}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onResetDemo();
                  }}
                  className="w-full text-left px-4 py-2 text-[#252B36] hover:bg-[#F8F5EF] flex items-center gap-2 font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#667085]" />
                  <span>Reset Demo State</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onSignOut();
                  }}
                  className="w-full text-left px-4 py-2 text-[#C77655] hover:bg-[#FFE4D6]/40 flex items-center gap-2 font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
