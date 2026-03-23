import { api } from "@/shared/apis";

// 세션 정보 조회
export const getSessionInfo = async ({ sid }: { sid: number }) => {
  const res = await api.get(`/v1/admin/sessions/${sid}`);

  return res;
};

// 세션 사용자 조회
export const getSessionMember = async ({ sid }: { sid: number }) => {
  const res = await api.get(`/v1/admin/sessions/${sid}/users`);

  return res;
};

export const editSessionInfo = async ({
  sid,
  name,
  useable,
}: {
  sid: number;
  name: string;
  useable: boolean;
}) => {
  const res = await api.put(`/v1/admin/sessions/${sid}`, { name, useable });

  return res;
};
