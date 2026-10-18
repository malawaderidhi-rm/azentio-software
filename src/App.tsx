import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { ToastProvider, useToast } from './components/Toast';
import { Step1Login } from './components/Step1Login';
import { OverviewDashboard } from './components/OverviewDashboard';
import { Step2UploadJD } from './components/Step2UploadJD';
import { Step3UploadCVs } from './components/Step3UploadCVs';
import { Step4StackRanking } from './components/Step4StackRanking';
import { Step5ScreeningQuestions } from './components/Step5ScreeningQuestions';
import { Step6MarketInsights } from './components/Step6MarketInsights';
import { Step7SearchStrings } from './components/Step7SearchStrings';
import { SettingsModal } from './components/SettingsModal';
import {
  RecruiterSession,
  JobDescription,
  CandidateProfile
} from './types';
import {
  INITIAL_JOB_DESCRIPTION,
  INITIAL_CANDIDATES,
  INITIAL_OVERVIEW_METRICS
} from './data/mockData';

function MainApp() {
  const { showToast } = useToast();

  // Recruiter Session State
  const [session, setSession] = useState<RecruiterSession>({
    email: 'recruiter@azentio.demo',
    name: 'Recruiter TA',
    role: 'Talent Acquisition',
    department: 'Engineering Hiring',
    organization: 'Azentio Software',
    isAuthenticated: false, // Start at login screen to match top-left of image
    avatarInitials: 'RT'
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedRole, setSelectedRole] = useState<string>('Frontend Developer - Bengaluru');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Core Data
  const [jobDescription, setJobDescription] = useState<JobDescription>(INITIAL_JOB_DESCRIPTION);
  const [candidates, setCandidates] = useState<CandidateProfile[]>(INITIAL_CANDIDATES);
  const [isLiveAi, setIsLiveAi] = useState<boolean>(false);

  // Check server status
  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        if (data?.liveAiAvailable) {
          setIsLiveAi(true);
        }
      })
      .catch(() => {
        setIsLiveAi(false);
      });
  }, []);

  // Login handler
  const handleLoginSuccess = (newSession: RecruiterSession) => {
    setSession(newSession);
    setActiveTab('overview');
    showToast('Welcome to TalentIQ', 'Hiring workspace initialized for Recruiter TA.', 'success');
  };

  // Sign out
  const handleSignOut = () => {
    setSession((prev) => ({ ...prev, isAuthenticated: false }));
    setActiveTab('overview');
    showToast('Signed out', 'Session ended.', 'info');
  };

  // Reset demo
  const handleResetDemo = () => {
    setJobDescription(JSON.parse(JSON.stringify(INITIAL_JOB_DESCRIPTION)));
    setCandidates(JSON.parse(JSON.stringify(INITIAL_CANDIDATES)));
    setActiveTab('overview');
    showToast('Workspace Reset', 'Reset to initial TalentIQ demo state.', 'info');
  };

  // Switch role
  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
    showToast('Role Switched', `Active hiring pipeline: ${role}`, 'info');
  };

  // Quick action: Start a new screening
  const handleStartNewScreening = () => {
    setActiveTab('job_description');
    showToast('New Screening', 'Define or upload job description requirements.', 'info');
  };

  // Context breadcrumb label
  const getContextLabel = () => {
    switch (activeTab) {
      case 'overview':
        return 'Overview';
      case 'job_description':
        return 'Job Description';
      case 'candidate_pipeline':
        return 'Candidate Pipeline';
      case 'candidate_ranking':
        return 'Candidate Ranking';
      case 'screening_questions':
        return 'Screening Questions';
      case 'market_intelligence':
        return 'Market Intelligence';
      case 'sourcing_search':
        return 'Sourcing Search';
      case 'settings':
        return 'Settings';
      default:
        return 'Overview';
    }
  };

  // If unauthenticated, show the Split-Screen Login Page (Exact match to image 1)
  if (!session.isAuthenticated) {
    return <Step1Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex flex-col font-sans text-[#252B36] antialiased selection:bg-[#DCE8FF] selection:text-[#3156A6]">
      {/* Top Header matching user screenshot */}
      <Header
        session={session}
        currentStepName={getContextLabel()}
        onNavigateBack={activeTab !== 'overview' ? () => setActiveTab('overview') : undefined}
        selectedRole={selectedRole}
        onSelectRole={handleSelectRole}
        onStartNewScreening={handleStartNewScreening}
        onSignOut={handleSignOut}
        onResetDemo={handleResetDemo}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Layout: Sidebar + Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            if (tab === 'settings') {
              setShowSettings(true);
            } else {
              setActiveTab(tab);
            }
          }}
          session={session}
          onOpenSettings={() => setShowSettings(true)}
        />

        {/* Content Canvas in warm ivory #F8F5EF */}
        <main className="flex-1 overflow-y-auto bg-[#F8F5EF]">
          {activeTab === 'overview' && (
            <OverviewDashboard
              metrics={INITIAL_OVERVIEW_METRICS}
              candidates={candidates}
              onNavigateToRanking={() => setActiveTab('candidate_ranking')}
              onNavigateToJD={() => setActiveTab('job_description')}
              onNavigateToCVs={() => setActiveTab('candidate_pipeline')}
            />
          )}

          {activeTab === 'job_description' && (
            <Step2UploadJD
              currentJD={jobDescription}
              onConfirmJD={(confirmed) => {
                setJobDescription(confirmed);
                setActiveTab('candidate_pipeline');
              }}
              isLiveAi={isLiveAi}
            />
          )}

          {activeTab === 'candidate_pipeline' && (
            <Step3UploadCVs
              candidates={candidates}
              onUpdateCandidates={setCandidates}
              onProceedToRanking={() => setActiveTab('candidate_ranking')}
            />
          )}

          {activeTab === 'candidate_ranking' && (
            <Step4StackRanking
              candidates={candidates}
              confirmedJD={jobDescription}
              onUpdateCandidates={setCandidates}
              onNavigateToJD={() => setActiveTab('job_description')}
              onProceedToQuestions={() => setActiveTab('screening_questions')}
            />
          )}

          {activeTab === 'screening_questions' && (
            <Step5ScreeningQuestions
              confirmedJD={jobDescription}
              onProceedToMarket={() => setActiveTab('market_intelligence')}
              isLiveAi={isLiveAi}
            />
          )}

          {activeTab === 'market_intelligence' && (
            <Step6MarketInsights
              confirmedJD={jobDescription}
              onProceedToSearchStrings={() => setActiveTab('sourcing_search')}
            />
          )}

          {activeTab === 'sourcing_search' && (
            <Step7SearchStrings
              confirmedJD={jobDescription}
              onReturnToOverview={() => setActiveTab('overview')}
              onResetDemo={handleResetDemo}
            />
          )}
        </main>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          session={session}
          onClose={() => setShowSettings(false)}
          onResetDemo={handleResetDemo}
          onSignOut={handleSignOut}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
