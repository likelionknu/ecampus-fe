import SkeletonCell from "@/shared/components/skeleton/SkeletonCell";
import type { NotificationRow } from "../types/NotificationRow";

interface NotificationTableRowsProps {
  isLoading: boolean;
  notifications: NotificationRow[];
}

function NotificationTableRows({
  isLoading,
  notifications,
}: NotificationTableRowsProps) {
  return (
    <div className="text-ec-black flex flex-col">
      {isLoading && (
        <div className="flex animate-pulse items-center justify-between px-6 py-5">
          <SkeletonCell className="h-4 w-220" />
          <div className="flex gap-7">
            <SkeletonCell className="h-4 w-14" />
            <SkeletonCell className="h-4 w-12" />
          </div>
        </div>
      )}

      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`flex w-full items-center justify-between px-8 py-5 ${
            index % 2 === 1 ? "bg-ec-box" : ""
          }`}
        >
          <span className="text-body-2 text-ec-black max-w-140 truncate">
            {notification.content}
          </span>

          <div className="flex items-center gap-7">
            <span
              className={`text-body-2 w-10 text-center ${
                notification.status === "안 읽음"
                  ? "text-ec-red"
                  : "text-ec-blue"
              }`}
            >
              {notification.status}
            </span>
            <span className="text-body-2 text-ec-black w-12 text-right">
              {notification.receivedAt}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationTableRows;
