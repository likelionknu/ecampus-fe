import { api } from "@/shared/apis";
import type { CreateQuestion } from "../types/CreateQuestion";

// 세션 질문 조회
export const getSessionQuestions = async ({ sid }: { sid: number }) => {
  const res = await api.get(`/v1/questions/sessions/${sid}`);

  return res;
};

// 세션 질문 등록
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
