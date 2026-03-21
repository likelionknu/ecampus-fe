import { api } from "@/shared/apis";
import type { QuestionRequestStatus } from "@/shared/types/QuestionRequestStatus";

interface GetQuestionsParams {
  title: string;
  status: QuestionRequestStatus;
}

export const getQuestions = async ({ title, status }: GetQuestionsParams) => {
  const res = await api.get("/v1/questions", {
    params: { title, status },
  });

  return res;
};
