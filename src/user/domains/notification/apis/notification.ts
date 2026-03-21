import { api } from "@/shared/apis";
// import type { PaginationParams } from "@/shared/types/Pagination";

// export const getNotification = async (params: PaginationParams) => {
//   const res = await api.get("/v1/notification", { params });

//   return res;
// };
// 알림 조회
export const getNotification = async () => {
  const res = await api.get("/v1/notifications", {});

  return res;
};

// 알림 개별 읽음
export const readNotification = async ({ nid }: { nid: number }) => {
  const res = await api.post(`/v1/notifications/${nid}/read`);

  return res;
};

// 알림 전체 삭제
export const deleteAllNotification = async () => {
  const res = await api.delete("/v1/notifications");

  return res;
};

// 읽은 알림 삭제
export const deleteReadNotification = async () => {
  const res = await api.delete("/v1/notifications/read");

  return res;
};
