import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Users,
  ListOrdered,
  HelpCircle,
  TrendingUp,
  Search,
  Settings,
  ChevronDown
} from 'lucide-react';
import { TalentIQLogo } from './TalentIQLogo';
import { RecruiterSession } from '../types';

export type ActiveTab =
  | 'overview'
  | 'job_description'
  | 'candidate_pipeline'
  | 'candidate_ranking'
  | 'screening_questions'
  | 'market_intelligence'
  | 'sourcing_search'
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  session: RecruiterSession;
  onOpenSettings?: () => void;
}

export const NAV_ITEMS: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'job_description', label: 'Job Description', icon: FileText },
  { id: 'candidate_pipeline', label: 'Candidate Pipeline', icon: Users },
  { id: 'candidate_ranking', label: 'Candidate Ranking', icon: ListOrdered },
  { id: 'screening_questions', label: 'Screening Questions', icon: HelpCircle },
  { id: 'market_intelligence', label: 'Market Intelligence', icon: TrendingUp },
  { id: 'sourcing_search', label: 'Sourcing Search', icon: Search },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  session,
  onOpenSettings
}) => {
  return (
    <aside className="w-60 md:w-64 border-r border-[#E8E0D4] bg-[#F3EEE5] flex flex-col justify-between shrink-0 select-none font-sans-ui">
      {/* Top Brand Logo */}
      <div className="p-5 border-b border-[#E8E0D4] bg-[#F3EEE5]/80">
        <TalentIQLogo size="md" />
      </div>

      {/* Navigation Links */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between group cursor-pointer ${
                isActive
                  ? 'bg-[#DCE8FF] text-[#3156A6] font-bold shadow-xs'
                  : 'text-[#667085] hover:text-[#252B36] hover:bg-[#EAE3D6]/70'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#648BEA]' : 'text-[#8C8479] group-hover:text-[#252B36]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {isActive && (
                <span className="w-1.5 h-3.5 rounded-full bg-[#648BEA] shrink-0" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Recruiter Profile Box */}
      <div className="p-3 border-t border-[#E8E0D4] bg-[#F3EEE5]/90">
        <div
          onClick={onOpenSettings}
          className="p-2.5 rounded-xl hover:bg-[#EAE3D6]/80 transition-colors flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#648BEA] text-white font-bold text-xs flex items-center justify-center shrink-0 ring-2 ring-[#DCE8FF] shadow-xs">
              {session.avatarInitials || 'RT'}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-[#252B36] truncate">
                {session.name || 'Recruiter TA'}
              </div>
              <div className="text-[11px] text-[#667085] truncate font-medium">
                {session.role || 'Talent Acquisition'}
              </div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-[#8C8479] shrink-0" />
        </div>
      </div>
    </aside>
  );
};
