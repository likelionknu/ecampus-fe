import { api } from "@/shared/apis";
// import type { PaginationParams } from "@/shared/types/Pagination";

// export const getNotification = async (params: PaginationParams) => {
//   const res = await api.get("/v1/notification", { params });

//   return res;
// };

export const getNotification = async () => {
  const res = await api.get("/v1/notifications", {});

  return res;
};
