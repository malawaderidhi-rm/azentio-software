import { CandidateProfile } from '../types';

export const RUBRIC_WEIGHTS = {
  requiredSkills: 50,
  experienceAlignment: 25,
  domainRelevance: 15,
  preferredSkills: 10,
  total: 100
} as const;

/**
 * Calculates a candidate's total score from their rubric breakdown
 */
export function calculateOverallScore(breakdown: { category: string; awardedPoints: number; maxPoints: number }[]): number {
  const sum = breakdown.reduce((acc, cat) => acc + cat.awardedPoints, 0);
  return Math.min(100, Math.max(0, Math.round(sum)));
}

/**
 * Applies human recruiter review correction on an ambiguous candidate item
 */
export function applyHumanReviewDecision(
  candidate: CandidateProfile,
  decision: 'confirm' | 'reject' | 'reset',
  reviewerNote: string = ''
): CandidateProfile {
  if (!candidate.humanReview) {
    return candidate;
  }

  const prevScore = candidate.scores.overallScore;
  const cloned = JSON.parse(JSON.stringify(candidate)) as CandidateProfile;
  const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  if (decision === 'reset') {
    cloned.humanReview!.status = 'pending';
    cloned.humanReview!.reviewerNote = '';
    cloned.scores.overallScore = 83;
    cloned.scores.requiredSkillsScore = 80;
    cloned.recommendation = 'Potential match';

    cloned.auditHistory = [
      ...(cloned.auditHistory || []),
      {
        timestamp,
        action: 'Review Reset to Baseline',
        prevScore,
        newScore: 83,
        note: reviewerNote || 'Reset by recruiter for demonstration.'
      }
    ];

    return cloned;
  }

  if (decision === 'confirm') {
    cloned.humanReview!.status = 'confirmed';
    cloned.humanReview!.reviewerNote = reviewerNote || 'Verified as automated daily data transformation task.';
    cloned.scores.overallScore = Math.min(100, prevScore + 6);
    cloned.scores.requiredSkillsScore = Math.min(100, cloned.scores.requiredSkillsScore + 8);
    cloned.recommendation = 'Strong match';

    cloned.auditHistory = [
      ...(cloned.auditHistory || []),
      {
        timestamp,
        action: 'Pipeline Experience Confirmed',
        prevScore,
        newScore: cloned.scores.overallScore,
        note: cloned.humanReview!.reviewerNote
      }
    ];

    return cloned;
  }

  if (decision === 'reject') {
    cloned.humanReview!.status = 'rejected';
    cloned.humanReview!.reviewerNote = reviewerNote || 'Confirmed as ad-hoc report refresh without pipeline automation.';
    cloned.scores.overallScore = prevScore;
    cloned.recommendation = 'Potential match';

    cloned.auditHistory = [
      ...(cloned.auditHistory || []),
      {
        timestamp,
        action: 'Pipeline Evidence Disqualified',
        prevScore,
        newScore: prevScore,
        note: cloned.humanReview!.reviewerNote
      }
    ];

    return cloned;
  }

  return cloned;
}
