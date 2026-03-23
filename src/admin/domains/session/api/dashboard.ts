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

// 세션 정보 수정
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

// 사용자 검색
export const serachUser = async ({ keyword }: { keyword: string }) => {
  const res = await api.get("/v1/admin/users/search", {
    params: {
      keyword,
    },
  });

  return res;
};

// 사용자 추가
export const addMembers = async ({
  sid,
  userIds,
  part,
}: {
  sid: number;
  userIds?: number[];
  part?: string;
}) => {
  const payload = {
    ...(userIds && userIds.length > 0 ? { userIds } : {}),
    ...(part ? { part } : {}),
  };

  const res = await api.post(`/v1/admin/sessions/${sid}/users`, {
    ...payload,
  });

  return res;
};

// 사용자 제거
export const deleteMember = async ({
  sid,
  userId,
}: {
  sid: number;
  userId: number;
}) => {
  const res = await api.delete(`/v1/admin/sessions/${sid}/users`, {
    data: { userId },
  });

  return res;
};
