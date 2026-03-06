import UserTitleSection from "@/user/shared/components/UserTitleSection";
import NotificationTableHeader from "../components/NotificationTableHeader";
import NotificationTableRows from "../components/NotificationTableRows";
import type { NotificationRow } from "../types/NotificationRow";
import TableEmptyState from "@/shared/components/table/TableEmptyState";

const notificationContent =
  "[14기] 아기사자 - 백엔드 파트 세션에 새로운 자료 업로드 됨";

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

function NotificationPage() {
  const isLoading = true;

  return (
    <div className="text-ec-black flex w-full flex-col gap-5 px-30 pt-7 pb-120">
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

      <section className="w-280">
        <div className="bg-ec-table-header rounded-tl-ec-10 rounded-tr-ec-10 flex items-center justify-between px-8 py-4">
          <NotificationTableHeader />
        </div>
        <TableEmptyState label="받은 알림이 없어요" />

        <NotificationTableRows
          isLoading={isLoading}
          notifications={mockNotifications}
        />
      </section>
    </div>
  );
}

export default NotificationPage;
