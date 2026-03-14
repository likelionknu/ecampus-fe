export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
}

export type AdminSessionStatus = "활성화" | "비활성화";

export interface AdminSessionRow {
  id: number;
  name: string;
  creator: string;
  participantCount: number;
  fileCount: number;
  assignmentCount: number;
  status: AdminSessionStatus;
}

export interface AdminGroupRow {
  id: number;
  generation: number;
  part: string;
  name: string;
  email: string;
  joinedAt: string;
  penaltyPoint: number;
  useable: boolean;
}

export type GroupIconType = "memo" | "change" | "demerit" | "stop" | "restore";
