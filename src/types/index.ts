export interface RecruiterSession {
  email: string;
  name: string;
  role: string;
  department: string;
  organization: string;
  isAuthenticated: boolean;
  loggedInAt?: string;
  avatarInitials: string;
}

export interface JobDescription {
  id: string;
  title: string;
  department: string;
  seniority: string;
  minExperienceYears: number;
  maxExperienceYears: number;
  location: string;
  workArrangement: string; // 'Bengaluru - Hybrid' | 'Remote' | 'On-site'
  employmentType: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  education: string;
  keywords: string[];
  rawText: string;
  source: 'sample' | 'pasted' | 'upload';
  isConfirmed: boolean;
  inferredFields: string[];
  missingFields: string[];
  analysisDate?: string;
  isLiveAi?: boolean;
}

export interface CVFileItem {
  id: string;
  filename: string;
  fileType: 'pdf' | 'docx' | 'txt';
  fileSize: string;
  status: 'selected' | 'processing' | 'processed' | 'failed';
  errorMessage?: string;
  candidateName?: string;
  progressPercent?: number;
}

export interface CandidateScores {
  overallScore: number; // e.g. 92
  requiredSkillsScore: number; // e.g. 95 (50/50 in breakdown)
  experienceScore: number; // e.g. 88 (22/25 in breakdown)
  domainRelevanceScore: number; // 13/15
  preferredSkillsScore: number; // 7/10
  breakdown: {
    category: string;
    awardedPoints: number;
    maxPoints: number;
  }[];
}

export interface CandidateProfile {
  id: string;
  rank: number;
  name: string; // e.g. "Aarav Sharma"
  initials: string; // "AS" or "RT"
  role: string; // "Frontend Developer"
  experienceYears: string; // "2.5 yrs exp"
  filename: string; // "Aarav_Sharma_CV.pdf"
  fileType: 'pdf' | 'docx';
  fileSize: string;
  stage: 'Shortlisted' | 'Interview' | 'Screening' | 'Applied';
  lastActivity: string; // "2h ago"
  recommendation: 'Strong match' | 'Potential match' | 'Needs review';
  scores: CandidateScores;
  matchedSkills: string[]; // ["React", "JavaScript", "TypeScript", "Next.js", "Git"]
  missingSkills: string[]; // ["AWS", "Docker", "GraphQL"]
  preferredSkills: string[]; // ["TypeScript", "AWS"]
  keyEvidence: string;
  fullEvidenceQuotes: { section: string; quote: string }[];
  humanReview?: {
    isAmbiguous: boolean;
    item: string;
    status: 'pending' | 'confirmed' | 'rejected';
    reviewerNote?: string;
    pointsDelta: number;
  };
  auditHistory?: {
    timestamp: string;
    action: string;
    prevScore: number;
    newScore: number;
    note: string;
  }[];
}

export interface ScreeningQuestionItem {
  id: string;
  number: number;
  question: string;
  competency: string;
  strongAnswerGuidance: string;
  jdRequirement: string;
  guidance: string;
  followUps?: string[];
}

export interface OverviewMetrics {
  activeRoles: number;
  activeRolesDelta: string;
  cvsProcessed: number;
  cvsProcessedDelta: string;
  candidatesRanked: number;
  candidatesRankedDelta: string;
  shortlistedCandidates: number;
  shortlistedCandidatesDelta: string;
  aiInsights: {
    title: string;
    highlight: string;
    detail: string;
    type: 'missing' | 'experience' | 'top_skill';
  }[];
  recentActivity: {
    id: string;
    title: string;
    subtitle: string;
    timeAgo: string;
    icon: 'jd' | 'cv' | 'ranking' | 'empty';
  }[];
}

export interface MarketIntelligenceItem {
  id: string;
  company: string;
  role: string;
  experienceRange: string;
  compensationRange: string;
  currency: string;
  location: string;
  workArrangement: string;
  sourceName: string;
  sourceUrl?: string;
  dateChecked: string;
  status: 'Verified public posting' | 'Illustrative estimate — not verified live';
  estimateRationale?: string;
  skillsHighlight: string[];
}

export interface SourcingSearchConfig {
  platform: 'Naukri' | 'LinkedIn';
  booleanQuery: string;
  plainLanguageQuery: string;
  filters: {
    experience: string;
    location: string;
    industry: string;
  };
  tips: string[];
}
