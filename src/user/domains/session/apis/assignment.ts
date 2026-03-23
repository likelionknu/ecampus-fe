import { api } from "@/shared/apis";

// 과제 조회
export const getAssignments = async ({
  sid,
  page,
  size = 8,
}: {
  sid: number;
  page: number;
  size?: number;
}) => {
  const res = await api.get(`/v1/sessions/${sid}/assignments`, {
    params: {
      page,
      size,
    },
  });

  return res;
};
