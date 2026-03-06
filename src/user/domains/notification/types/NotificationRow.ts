export interface NotificationRow {
  id: number;
  content: string;
  status: "읽음" | "안 읽음";
  receivedAt: string;
}

