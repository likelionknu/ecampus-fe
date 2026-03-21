import { api } from "@/shared/apis";

interface sessionsQuestionProps {
  qid: number | undefined;
  sid: number | undefined;
}

export const getSessionQuestion = async ({
  qid,
  sid,
}: sessionsQuestionProps) => {
  const res = await api.get(`/v1/questions/${qid}/sessions/${sid}`);

  return res;
};
