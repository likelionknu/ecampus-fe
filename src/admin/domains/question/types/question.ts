export interface AdminQuestionComment {
  id: number;
  author: string;
  createdLabel: string;
  content: string;
  isMine?: boolean;
}

export interface AdminQuestionDetail {
  title: string;
  createdAt: string;
  createdBy: string;
  answeredAt: string | null;
  answeredBy: string;
  status: string;
  question: string;
  answer: string;
  comments: readonly AdminQuestionComment[];
}
