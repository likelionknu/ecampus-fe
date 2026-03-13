import { useMediaQuery } from "react-responsive";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
import MobileNotifitcationTableRows from "../components/MobileNotificationTableRows";
import NotificationTableHeader from "../components/NotificationTableHeader";
import NotificationTableRows from "../components/NotificationTableRows";
import type { NotificationRow } from "../types/NotificationRow";

const notificationContent =
  "[14기] 아기사자 - 백엔드 파트 세션에 새로운 자료가 업로드되었어요";

const mockNotifications: NotificationRow[] = [
  {
    id: 1,
    content: notificationContent,
    status: "안 읽음",
    receivedAt: "3일 전",
  },
  { id: 2, content: notificationContent, status: "읽음", receivedAt: "3일 전" },
  {
    id: 3,
    content: notificationContent,
    status: "안 읽음",
    receivedAt: "3일 전",
  },
  { id: 4, content: notificationContent, status: "읽음", receivedAt: "3일 전" },
  {
    id: 5,
    content: notificationContent,
    status: "안 읽음",
    receivedAt: "3일 전",
  },
  { id: 6, content: notificationContent, status: "읽음", receivedAt: "3일 전" },
  {
    id: 7,
    content: notificationContent,
    status: "안 읽음",
    receivedAt: "3일 전",
  },
  { id: 8, content: notificationContent, status: "읽음", receivedAt: "3일 전" },
];

function UserNotificationPage() {
  const itemSumNum = 8;
  const itemNum = mockNotifications.length;
  const isLoading = false;
  const isMobile = useMediaQuery({ maxWidth: 479 });

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-280 xl:mx-0 xl:ml-30">
      <UserTitleSection
        title="알림"
        subText="최근 받은 알림을 확인해보세요"
        actions={[
          {
            label: "모두 읽음으로 표시",
            buttonType: "primary",
            onClick: () => {},
          },
          {
            label: "모든 알림 지우기",
            buttonType: "danger",
            onClick: () => {},
          },
          {
            label: "읽은 알림 지우기",
            buttonType: "danger",
            onClick: () => {},
          },
        ]}
      />

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {({ currentItems, startIndex }) => {
          const pagedNotifications = mockNotifications.slice(
            startIndex,
            startIndex + currentItems.length,
          );

          return (
            <>
              {!isMobile && (
                <PageNationMenu>
                  <NotificationTableHeader />
                </PageNationMenu>
              )}

              {pagedNotifications.length === 0 && !isLoading ? (
                <TableEmptyState label="받은 알림이 없어요" />
              ) : isMobile ? (
                <MobileNotifitcationTableRows
                  notifications={pagedNotifications}
                />
              ) : (
                <NotificationTableRows
                  isLoading={isLoading}
                  notifications={pagedNotifications}
                />
              )}
              <PageNationButton />
            </>
          );
        }}
      </PageNationFrame>
    </div>
  );
}

export default UserNotificationPage;
