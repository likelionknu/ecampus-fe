export interface SessionQuestionRow {
  answer: string | null;
  answeredAt: string | null;
  answeredUserId: number | null;
  answeredUserName: string | null;
  content: string;
  createdAt: string;
  createdUserId: number | null;
  createdUserName: string | null;
  id: number;
  isMyQuestion: boolean;
  sessionId: number;
  sessionName: string;
  status: "PENDING" | "COMPLETED";
  title: string;
}
