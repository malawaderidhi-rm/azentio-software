import {
  JobDescription,
  CandidateProfile,
  ScreeningQuestionItem,
  OverviewMetrics,
  MarketIntelligenceItem,
  SourcingSearchConfig
} from '../types';

export const INITIAL_OVERVIEW_METRICS: OverviewMetrics = {
  activeRoles: 5,
  activeRolesDelta: '+2 this week',
  cvsProcessed: 48,
  cvsProcessedDelta: '+12 this week',
  candidatesRanked: 42,
  candidatesRankedDelta: '+8 this week',
  shortlistedCandidates: 8,
  shortlistedCandidatesDelta: '+3 this week',
  aiInsights: [
    {
      title: 'Most common missing skill',
      highlight: 'TypeScript',
      detail: '(in 6 of 12 candidates)',
      type: 'missing'
    },
    {
      title: '70% of candidates have 2+ years of relevant experience',
      highlight: 'vs. 49% overall',
      detail: 'above benchmark',
      type: 'experience'
    },
    {
      title: 'Top performing skill',
      highlight: 'React',
      detail: '(present in 9 of 10 matches)',
      type: 'top_skill'
    }
  ],
  recentActivity: [
    {
      id: 'act-1',
      title: 'JD uploaded',
      subtitle: 'Frontend Developer - Bengaluru',
      timeAgo: '2h ago',
      icon: 'jd'
    },
    {
      id: 'act-2',
      title: '5 CVs processed',
      subtitle: '4 successful, 1 needs attention',
      timeAgo: '3h ago',
      icon: 'cv'
    },
    {
      id: 'act-3',
      title: 'Candidates ranked',
      subtitle: '42 candidates',
      timeAgo: '5h ago',
      icon: 'ranking'
    },
    {
      id: 'act-4',
      title: 'No activity yet',
      subtitle: 'Upload a JD and CVs to get started.',
      timeAgo: '',
      icon: 'empty'
    }
  ]
};

export const SAMPLE_JD_FRONTEND_RAW = `Job Title: Frontend Developer
Department / Function: Engineering
Location / Work Arrangement: Bengaluru - Hybrid (3 days on-site)
Required Experience: 2-5 years
Employment Type: Full-time

Role Overview:
We are looking for an experienced Frontend Developer to engineer responsive, high-performance web applications using modern JavaScript frameworks.

Key Responsibilities:
• Build and maintain web applications using React, TypeScript, and modern state architectures.
• Collaborate with cross-functional teams including product managers, UI/UX designers, and backend engineers.
• Improve performance and user experience through bundle optimization, code splitting, and web vitals tuning.
• Ensure high code quality through component tests, code reviews, and comprehensive documentation.

Required Skills:
• React (Hooks, Context, component lifecycles)
• JavaScript (ES6+, asynchronous programming)
• TypeScript (type systems, interfaces, generics)
• HTML5 & Semantic Web standards
• CSS3, Responsive Design & CSS Grid/Flexbox

Preferred Skills:
• Next.js (SSR / SSG paradigms)
• GraphQL (Apollo Client or Relay)
• AWS (S3, CloudFront, Amplify)
• Docker (containerized local dev)

Education / Certifications:
• Bachelor's in Computer Science (or related field), or equivalent practical software engineering experience.`;

export const INITIAL_JOB_DESCRIPTION: JobDescription = {
  id: 'jd-fe-blr-01',
  title: 'Frontend Developer',
  department: 'Engineering',
  seniority: 'Mid-Level (2–5 years)',
  minExperienceYears: 2,
  maxExperienceYears: 5,
  location: 'Bengaluru - Hybrid',
  workArrangement: 'Bengaluru - Hybrid',
  employmentType: 'Full-time',
  requiredSkills: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  preferredSkills: ['Next.js', 'GraphQL', 'AWS', 'Docker'],
  responsibilities: [
    'Build and maintain web applications',
    'Collaborate with cross-functional teams',
    'Improve performance and user experience'
  ],
  education: "Bachelor's in Computer Science (or related field)",
  keywords: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'GraphQL', 'Tailwind', 'CSS3', 'HTML5', 'Redux', 'AWS'],
  rawText: SAMPLE_JD_FRONTEND_RAW,
  source: 'sample',
  isConfirmed: true,
  inferredFields: ['Employment Type: Inferred from corporate engineering requisition'],
  missingFields: ['Explicit compensation band not specified in original brief'],
  analysisDate: '2026-10-18',
  isLiveAi: false
};

export const INITIAL_CANDIDATES: CandidateProfile[] = [
  {
    id: 'cand-1',
    rank: 1,
    name: 'Aarav Sharma',
    initials: 'RT',
    role: 'Frontend Developer',
    experienceYears: '2.5 yrs exp',
    filename: 'Aarav_Sharma_CV.pdf',
    fileType: 'pdf',
    fileSize: '142 KB',
    stage: 'Shortlisted',
    lastActivity: '2h ago',
    recommendation: 'Strong match',
    scores: {
      overallScore: 92,
      requiredSkillsScore: 95,
      experienceScore: 88,
      domainRelevanceScore: 90,
      preferredSkillsScore: 70,
      breakdown: [
        { category: 'Required Skills', awardedPoints: 50, maxPoints: 50 },
        { category: 'Experience Alignment', awardedPoints: 22, maxPoints: 25 },
        { category: 'Domain Relevance', awardedPoints: 13, maxPoints: 15 },
        { category: 'Preferred Skills', awardedPoints: 7, maxPoints: 10 }
      ]
    },
    matchedSkills: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Git'],
    missingSkills: ['AWS', 'Docker', 'GraphQL'],
    preferredSkills: ['TypeScript', 'AWS'],
    keyEvidence: '2.5 years of experience building responsive web applications using React and TypeScript. Architected client-side routing, automated testing with Jest, and reduced bundle size by 32%.',
    fullEvidenceQuotes: [
      { section: 'Summary', quote: 'Frontend engineer with 2.5 years hands-on experience in React, TypeScript, and state management.' },
      { section: 'Projects', quote: 'Engineered high-traffic e-commerce portal with React 18, TypeScript, and Tailwind, serving 100K+ monthly active users.' },
      { section: 'Skills', quote: 'React, TypeScript, JavaScript (ES6+), Next.js, Redux Toolkit, HTML5, CSS3, Git, Webpack.' }
    ],
    auditHistory: []
  },
  {
    id: 'cand-2',
    rank: 2,
    name: 'Diya Patel',
    initials: 'DP',
    role: 'Frontend Developer',
    experienceYears: '3.0 yrs exp',
    filename: 'Diya_Patel_CV.pdf',
    fileType: 'pdf',
    fileSize: '158 KB',
    stage: 'Interview',
    lastActivity: '5h ago',
    recommendation: 'Strong match',
    scores: {
      overallScore: 87,
      requiredSkillsScore: 85,
      experienceScore: 82,
      domainRelevanceScore: 88,
      preferredSkillsScore: 90,
      breakdown: [
        { category: 'Required Skills', awardedPoints: 43, maxPoints: 50 },
        { category: 'Experience Alignment', awardedPoints: 21, maxPoints: 25 },
        { category: 'Domain Relevance', awardedPoints: 14, maxPoints: 15 },
        { category: 'Preferred Skills', awardedPoints: 9, maxPoints: 10 }
      ]
    },
    matchedSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'GraphQL', 'Docker'],
    missingSkills: ['TypeScript (basic only)', 'AWS'],
    preferredSkills: ['GraphQL', 'Docker'],
    keyEvidence: '3 years experience building interactive web applications with React, GraphQL, and modern CSS modules. Designed micro-frontends with Docker integration.',
    fullEvidenceQuotes: [
      { section: 'Work History', quote: 'Developed and maintained responsive client portals utilizing React and GraphQL with Apollo Client.' },
      { section: 'Technical Skills', quote: 'React, JavaScript, HTML5, CSS3/Sass, GraphQL, Apollo, Docker, Git.' }
    ],
    auditHistory: []
  },
  {
    id: 'cand-3',
    rank: 3,
    name: 'Rohan Mehta',
    initials: 'RM',
    role: 'Frontend Developer',
    experienceYears: '2.0 yrs exp',
    filename: 'Rohan_Mehta_Resume.docx',
    fileType: 'docx',
    fileSize: '124 KB',
    stage: 'Screening',
    lastActivity: '7h ago',
    recommendation: 'Potential match',
    scores: {
      overallScore: 83,
      requiredSkillsScore: 80,
      experienceScore: 78,
      domainRelevanceScore: 85,
      preferredSkillsScore: 95,
      breakdown: [
        { category: 'Required Skills', awardedPoints: 40, maxPoints: 50 },
        { category: 'Experience Alignment', awardedPoints: 20, maxPoints: 25 },
        { category: 'Domain Relevance', awardedPoints: 13, maxPoints: 15 },
        { category: 'Preferred Skills', awardedPoints: 10, maxPoints: 10 }
      ]
    },
    matchedSkills: ['React', 'JavaScript', 'Next.js', 'Jest', 'HTML', 'CSS'],
    missingSkills: ['TypeScript (limited documentation)', 'AWS'],
    preferredSkills: ['Next.js', 'Jest'],
    keyEvidence: '2 years of experience with React and Next.js. Authored unit test suites using Jest and React Testing Library.',
    fullEvidenceQuotes: [
      { section: 'Projects', quote: 'Built customer onboarding portal in Next.js and React with automated Jest integration tests.' },
      { section: 'Experience', quote: 'Created 20+ responsive views and built a daily data refresh for business stakeholders.' }
    ],
    humanReview: {
      isAmbiguous: true,
      item: 'built a daily data refresh for business stakeholders',
      status: 'pending',
      pointsDelta: 6
    },
    auditHistory: []
  },
  {
    id: 'cand-4',
    rank: 4,
    name: 'Ananya Iyer',
    initials: 'AI',
    role: 'Frontend Developer',
    experienceYears: '1.8 yrs exp',
    filename: 'Ananya_Iyer_Profile.pdf',
    fileType: 'pdf',
    fileSize: '136 KB',
    stage: 'Screening',
    lastActivity: '1d ago',
    recommendation: 'Potential match',
    scores: {
      overallScore: 76,
      requiredSkillsScore: 72,
      experienceScore: 69,
      domainRelevanceScore: 78,
      preferredSkillsScore: 85,
      breakdown: [
        { category: 'Required Skills', awardedPoints: 36, maxPoints: 50 },
        { category: 'Experience Alignment', awardedPoints: 18, maxPoints: 25 },
        { category: 'Domain Relevance', awardedPoints: 12, maxPoints: 15 },
        { category: 'Preferred Skills', awardedPoints: 10, maxPoints: 10 }
      ]
    },
    matchedSkills: ['React', 'JavaScript', 'Tailwind', 'Figma', 'HTML', 'CSS'],
    missingSkills: ['TypeScript', 'GraphQL', 'Next.js', 'Docker'],
    preferredSkills: ['Tailwind', 'Figma'],
    keyEvidence: 'Strong UI/UX implementation chops converting Figma designs directly into pixel-perfect React and Tailwind CSS interfaces.',
    fullEvidenceQuotes: [
      { section: 'Projects', quote: 'Translated 30+ complex Figma wireframes into modular React components with Tailwind CSS.' }
    ],
    auditHistory: []
  },
  {
    id: 'cand-5',
    rank: 5,
    name: 'Kabir Singh',
    initials: 'KS',
    role: 'Frontend Developer',
    experienceYears: '1.2 yrs exp',
    filename: 'Kabir_Singh_Resume.docx',
    fileType: 'docx',
    fileSize: '119 KB',
    stage: 'Applied',
    lastActivity: '1d ago',
    recommendation: 'Needs review',
    scores: {
      overallScore: 72,
      requiredSkillsScore: 68,
      experienceScore: 65,
      domainRelevanceScore: 75,
      preferredSkillsScore: 80,
      breakdown: [
        { category: 'Required Skills', awardedPoints: 34, maxPoints: 50 },
        { category: 'Experience Alignment', awardedPoints: 16, maxPoints: 25 },
        { category: 'Domain Relevance', awardedPoints: 12, maxPoints: 15 },
        { category: 'Preferred Skills', awardedPoints: 10, maxPoints: 10 }
      ]
    },
    matchedSkills: ['JavaScript', 'HTML', 'CSS', 'Git', 'React (Basics)'],
    missingSkills: ['TypeScript', 'Next.js', 'GraphQL', 'AWS', 'Docker'],
    preferredSkills: ['JavaScript', 'Git'],
    keyEvidence: '1.2 years in junior web development with strong core JavaScript, DOM manipulation, and basic React component development.',
    fullEvidenceQuotes: [
      { section: 'Work Experience', quote: 'Maintained internal customer portals using vanilla JavaScript, HTML5/CSS3, and introductory React components.' }
    ],
    auditHistory: []
  }
];

export const INITIAL_SCREENING_QUESTIONS: ScreeningQuestionItem[] = [
  {
    id: 'sq-1',
    number: 1,
    question: 'Can you walk us through a project where you built a responsive web application using React?',
    competency: 'Technical Skills',
    strongAnswerGuidance: 'Deep understanding of React, component architecture, problem-solving, state lifting, and custom hooks.',
    jdRequirement: 'React development experience',
    guidance: 'Look for specific examples, architectural challenges, and measurable results.',
    followUps: ['How did you structure the component tree?', 'What trade-offs did you consider when deciding between Context and Redux?']
  },
  {
    id: 'sq-2',
    number: 2,
    question: 'How do you optimize the performance of a React application?',
    competency: 'Problem Solving',
    strongAnswerGuidance: 'Performance analysis with DevTools profiler, React.memo, useMemo/useCallback, lazy loading, and bundle splitting.',
    jdRequirement: 'Performance optimization skills',
    guidance: 'Look for measurable impact (e.g., initial load time, Lighthouse score, bundle size reductions).',
    followUps: ['Have you used React Profiler to detect excessive re-renders?', 'How do you handle images and web fonts?']
  },
  {
    id: 'sq-3',
    number: 3,
    question: 'Tell us about your experience working with APIs and state management.',
    competency: 'Technical Skills',
    strongAnswerGuidance: 'API integration (REST/GraphQL), error handling, caching with TanStack Query or Redux Toolkit, and optimistic UI updates.',
    jdRequirement: 'API integration, state management',
    guidance: 'Look for practical examples, edge-case error handling, and tools used in production.',
    followUps: ['How do you manage loading and error states consistently across views?']
  },
  {
    id: 'sq-4',
    number: 4,
    question: 'How do you ensure your code is maintainable and scalable?',
    competency: 'Best Practices',
    strongAnswerGuidance: 'Clean code principles, strict TypeScript types, modular folder structures, documentation, and automated linting/formatting.',
    jdRequirement: 'Maintainable code and scalability',
    guidance: 'Look for specific practices, test coverage, and modular code examples.',
    followUps: ['What is your approach to unit testing frontend components?']
  },
  {
    id: 'sq-5',
    number: 5,
    question: 'Describe a time you worked in a cross-functional team. What was your role?',
    competency: 'Collaboration',
    strongAnswerGuidance: 'Communication with UI/UX designers and backend developers, ownership of sprint deliverables, and handling feedback.',
    jdRequirement: 'Team collaboration',
    guidance: 'Look for examples of constructive conflict resolution, empathy, and proactive alignment.',
    followUps: ['How do you negotiate technical compromises with product managers under tight deadlines?']
  },
  {
    id: 'sq-6',
    number: 6,
    question: 'How do you leverage TypeScript to prevent runtime errors in production applications?',
    competency: 'Technical Skills',
    strongAnswerGuidance: 'Leveraging strict type checking, discriminated unions, generic components, and typed API response schemas.',
    jdRequirement: 'TypeScript proficiency',
    guidance: 'Check if they avoid using "any" and understand advanced utility types (Partial, Pick, Omit).',
    followUps: ['How do you type third-party libraries or complex asynchronous payloads?']
  },
  {
    id: 'sq-7',
    number: 7,
    question: 'What is your strategy for writing testable React components, and what tools do you prefer?',
    competency: 'Quality Assurance',
    strongAnswerGuidance: 'Writing tests from user perspectives using Jest and React Testing Library; mocking API responses with MSW.',
    jdRequirement: 'Testing & automated QA',
    guidance: 'Ensure candidate focuses on testing behavior rather than implementation details.',
    followUps: ['What is an appropriate test coverage threshold for frontend applications?']
  },
  {
    id: 'sq-8',
    number: 8,
    question: 'How do you approach accessibility (a11y) and responsive design across diverse viewports?',
    competency: 'Web Standards',
    strongAnswerGuidance: 'Semantic HTML5 elements, ARIA attributes, keyboard navigation, color contrast ratios, and mobile-first CSS media queries.',
    jdRequirement: 'HTML5, CSS & Responsive Design',
    guidance: 'Look for familiarity with WCAG guidelines and screen reader considerations.',
    followUps: ['How do you ensure custom modal dialogs are fully keyboard-navigable?']
  },
  {
    id: 'sq-9',
    number: 9,
    question: 'Tell us about a challenging bug you encountered in the browser and how you debugged it.',
    competency: 'Debugging & Problem Solving',
    strongAnswerGuidance: 'Systematic root-cause diagnosis using Chrome DevTools, Network waterfall, memory heap snapshots, and reproducible test cases.',
    jdRequirement: 'Troubleshooting and debugging',
    guidance: 'Candidate should describe the hypothesis, diagnostic steps, and permanent prevention.',
    followUps: ['How did you prevent similar bugs from slipping into the build pipeline?']
  },
  {
    id: 'sq-10',
    number: 10,
    question: 'The frontend ecosystem evolves rapidly. How do you evaluate new frameworks or libraries before introducing them?',
    competency: 'Continuous Learning',
    strongAnswerGuidance: 'Pragmatic evaluation criteria: community support, bundle footprint, maintenance activity, documentation, and solving genuine user problems.',
    jdRequirement: 'Continuous learning & modern stack awareness',
    guidance: 'Look for thoughtful trade-off assessment rather than trend-chasing.',
    followUps: ['Have you ever advised against adopting a trending tool in favor of standard web APIs?']
  }
];

export const INITIAL_MARKET_INTELLIGENCE: MarketIntelligenceItem[] = [
  {
    id: 'mkt-1',
    company: 'Razorpay',
    role: 'Frontend Engineer I',
    experienceRange: '2–4 years',
    compensationRange: '₹14,00,000 – ₹20,00,000',
    currency: 'INR / year',
    location: 'Bengaluru, Karnataka',
    workArrangement: 'Hybrid (3 days on-site)',
    sourceName: 'Razorpay Careers Portal',
    sourceUrl: 'https://razorpay.com/jobs',
    dateChecked: 'October 2026',
    status: 'Verified public posting',
    skillsHighlight: ['React 18', 'TypeScript', 'Web Vitals', 'Design Systems']
  },
  {
    id: 'mkt-2',
    company: 'Swiggy',
    role: 'Software Development Engineer I (Web)',
    experienceRange: '2–5 years',
    compensationRange: '₹15,00,000 – ₹22,00,000',
    currency: 'INR / year',
    location: 'Bengaluru, Karnataka',
    workArrangement: 'Hybrid',
    sourceName: 'Swiggy Careers Board',
    sourceUrl: 'https://swiggy.com/careers',
    dateChecked: 'October 2026',
    status: 'Verified public posting',
    skillsHighlight: ['React', 'Next.js', 'SSR Performance', 'TypeScript', 'Jest']
  },
  {
    id: 'mkt-3',
    company: 'PhonePe',
    role: 'Frontend Developer',
    experienceRange: '2–5 years',
    compensationRange: '₹16,00,000 – ₹24,00,000',
    currency: 'INR / year',
    location: 'Bengaluru, Karnataka',
    workArrangement: 'Hybrid (Bellandur office)',
    sourceName: 'PhonePe Job Portal',
    sourceUrl: 'https://phonepe.com/careers',
    dateChecked: 'October 2026',
    status: 'Verified public posting',
    skillsHighlight: ['React', 'Redux', 'Microfrontends', 'High Concurrency UI']
  },
  {
    id: 'mkt-4',
    company: 'Mid-to-Growth Tech Startups Composite',
    role: 'Frontend Engineer (React / TypeScript)',
    experienceRange: '2–4 years',
    compensationRange: '₹10,00,000 – ₹16,00,000',
    currency: 'INR / year',
    location: 'Bengaluru (Indiranagar / Koramangala)',
    workArrangement: 'In-office / Hybrid',
    sourceName: 'Bengaluru Startup Compensation Index',
    dateChecked: 'Q3 2026',
    status: 'Illustrative estimate — not verified live',
    estimateRationale: 'Aggregated compensation across seed and series A/B technology startups in Bengaluru. Often includes ESOP equity grants.',
    skillsHighlight: ['React', 'Tailwind', 'Next.js', 'TypeScript', 'Fast Delivery']
  }
];

export const INITIAL_SOURCING_SEARCH: SourcingSearchConfig[] = [
  {
    platform: 'Naukri',
    booleanQuery: '("Frontend Developer" OR "React Developer" OR "UI Developer" OR "Frontend Engineer") AND ("React" OR "ReactJS" OR "React.js") AND ("TypeScript" OR "Typescript") AND ("JavaScript" OR "ES6") AND ("Bengaluru" OR "Bangalore")',
    plainLanguageQuery: 'Frontend developer with 2 to 5 years experience, strong React, TypeScript, JavaScript and CSS in Bengaluru.',
    filters: {
      experience: '2 to 5 Years',
      location: 'Bengaluru / Bangalore',
      industry: 'IT-Software / Software Services'
    },
    tips: [
      'Naukri requires quotes ("") around multi-word phrases for exact index matching.',
      'Combine "React" and "ReactJS" to match varied recruiter resume conventions.',
      'Filter candidates with "Active in Last 15 Days" for maximum contact conversion.'
    ]
  },
  {
    platform: 'LinkedIn',
    booleanQuery: '("Frontend Developer" OR "Frontend Engineer" OR "React Developer") AND (React AND TypeScript) AND (HTML AND CSS) AND NOT ("Senior" OR "Lead" OR "Principal" OR "Architect" OR "Manager")',
    plainLanguageQuery: 'Frontend developer React TypeScript JavaScript Bengaluru hybrid 2 to 5 years experience',
    filters: {
      experience: 'Associate (2-5 years)',
      location: 'Bengaluru, Karnataka, India',
      industry: 'Software Development, Technology, Information & Internet'
    },
    tips: [
      'Use NOT ("Senior" OR "Lead" OR "Architect") to prevent over-qualified applicant noise.',
      'Enable LinkedIn "Open to Work" filter to target candidates actively seeking interviews.',
      'Add Next.js or GraphQL as secondary filters for candidates with preferred bonus skills.'
    ]
  }
];
