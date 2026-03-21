import { api } from "@/shared/apis";

export const getSessions = async () => {
  const res = await api.get("/v1/admin/sessions");

  return res;
};
