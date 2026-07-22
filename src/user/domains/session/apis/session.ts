import { api } from "@/shared/apis";

// 세션 목록 조회
export const getSessions = async () => {
  const res = await api.get("/ecampus/api/v1/sessions");

  return res;
};
