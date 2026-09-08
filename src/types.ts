export type PriorityLevel = 'Top' | 'Medium' | 'Low';
export type CaseStatus = 'Pending' | 'Completed';

export type FinalAction =
  | 'NO ACTION'
  | 'REMOVE CONTENT'
  | 'AGE-GATE 18+'
  | 'RESTRICT RECOMMENDATION'
  | 'ADD VIEWER WARNING'
  | 'ESCALATE REVIEW';

export interface CaseRecord {
  id: string;
  num: string;
  creator: string;
  policy: string;
  priority: PriorityLevel;
  queueAge: string;
  thumbnailUrl: string;
  videoUrl: string;
  status: CaseStatus;

  // Screen 2 detailed metadata
  policyId: string;
  caption: string;
  duration: string;
  language: string;
  market: string;
  queueSource: string;
  recommendedAction: string;
  confidence: string;
  detectedSignals: string[];
  policyGuidance: string;

  // Moderation decision recording
  recordedAction?: FinalAction;
  recordedDecisionBasis?: string;
  recordedModeratorNote?: string;
}

export interface NewsSlide {
  id: number;
  title: string;
  imageUrl: string;
}

export interface PolicyStandard {
  id: string;
  name: string;
  status: 'Active';
  frameworkVersion: string;
  revisionInfo: string;
  purpose: string;
  reviewConsiderations: string[];
  contextualConsiderations: string[];
  enforcementGuidance: string;
}

export type PriorityFilter = 'ALL' | PriorityLevel;
export type StatusFilter = 'ALL' | CaseStatus;
export type PolicyFilter = 'ALL' | string;
export type ActiveOverlay = 'about' | 'policy' | 'communityGuidelines' | null;
