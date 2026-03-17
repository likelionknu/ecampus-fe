export type AdminAssignmentStatus = "SUBMITTED" | "NOT_SUBMITTED";
export type AdminAssignmentEvaluate = "PASS" | "FAIL" | null;

export interface AdminAssignmentParticipant {
  id: number;
  generation: number;
  part: string;
  name: string;
  assignedAt: string;
  submittedAt: string | null;
  evaluatedAt: string | null;
  assignmentStatus: AdminAssignmentStatus;
  evaluate: AdminAssignmentEvaluate;
}

export interface AdminAssignmentDetail {
  title: string;
  startAt: string;
  endAt: string;
  createdBy: string;
  participantCount: number;
  submittedCount: number;
  notSubmittedCount: number;
  description: string;
  participants: readonly AdminAssignmentParticipant[];
}
