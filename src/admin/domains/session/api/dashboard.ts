import { api } from "@/shared/apis";

export const getSessionInfo = async ({ sid }: { sid: number }) => {
  const res = await api.get(`/v1/admin/sessions/${sid}`);

  return res;
};

export const getSessionMember = async ({ sid }: { sid: number }) => {
  const res = await api.get(`/v1/admin/sessions/${sid}/users`);

  return res;
};
