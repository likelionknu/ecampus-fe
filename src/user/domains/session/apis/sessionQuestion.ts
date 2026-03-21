import { api } from "@/shared/apis";
import type { CreateQuestion } from "../types/CreateQuestion";

export const getSessionQuestions = async ({ sid }: { sid: number }) => {
  const res = await api.get(`/v1/questions/sessions/${sid}`);

  return res;
};

export const postSessionQuestions = async ({
  sid,
  payload,
}: {
  sid: number;
  payload: CreateQuestion;
}) => {
  const res = await api.post(`/v1/questions/sessions/${sid}`, payload);

  return res;
};

export const deleteSessionQuestions = async ({
  qid,
  sid,
}: {
  qid: number;
  sid: number;
}) => {
  const res = await api.delete(`/v1/questions/${qid}/sessions/${sid}`);

  return res;
};
