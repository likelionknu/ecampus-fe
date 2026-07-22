import { api } from "@/shared/apis";
import type { PageParams } from "@/user/shared/types/PagenationsParams";

// 대시보드 조회
export const getDashboard = async () => {
  const res = await api.get("/ecampus/api/v1/users/me/dashboard");

  return res;
};

// 공지 조회
export const getNotices = async ({ page, size }: PageParams) => {
  const res = await api.get("/ecampus/api/v1/notices", {
    params: {
      page,
      size,
    },
  });

  return res;
};

// 알림 조회
export const getNotifications = async ({ page, size }: PageParams) => {
  const res = await api.get("/portal/v1/notifications", {
    params: {
      page,
      size,
    },
  });

  return res;
};

// 벌점 조회
export const getDemerits = async () => {};
