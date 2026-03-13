import MobileItem from "@/user/shared/components/MobileItem";
import type { NotificationRow } from "../types/NotificationRow";

interface MobileNotifitcationTableRowsProps {
  notifications: NotificationRow[];
}

function MobileNotifitcationTableRows({
  notifications,
}: MobileNotifitcationTableRowsProps) {
  return (
    <div className="flex flex-col gap-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-ec-box rounded-ec-10 px-5 py-6"
        >
          <div className="text-body-2 text-ec-black border-ec-outline-dark max-w-77.5 overflow-hidden border-b pb-3 text-ellipsis whitespace-nowrap">
            {notification.content}
          </div>

          <div className="mt-2 flex gap-4">
            <MobileItem
              label="상태"
              value={notification.status}
              valueClassName={
                notification.status === "안 읽음"
                  ? "text-ec-red"
                  : "text-ec-blue"
              }
            />
            <MobileItem label="수신일" value={notification.receivedAt} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MobileNotifitcationTableRows;
