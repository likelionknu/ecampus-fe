import { api } from "@/shared/apis";

export const getQuestions = async () => {
  const res = await api.get("/v1/questions");

  return res;
};
