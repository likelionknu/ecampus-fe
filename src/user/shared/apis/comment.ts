import { api } from "@/shared/apis";

export const getComments = async ({ qid }: { qid: number }) => {
  const res = await api.get(`/v1/questions/${qid}/comments`);

  return res;
};
