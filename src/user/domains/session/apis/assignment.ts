import { api } from "@/shared/apis";

// 과제 조회
export const getAssignments = async ({ sid }: { sid: number }) => {
  const res = await api.get(`/v1/sessions/${sid}/assignments`);

  return res;
};
