import { useMediaQuery } from "react-responsive";
import { useCallback, useMemo, useState } from "react";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import TitleSection from "@/shared/components/TitleSection";
import MobileNotifitcationTableRows from "../components/MobileNotificationTableRows";
import NotificationTableHeader from "../components/NotificationTableHeader";
import NotificationTableRows from "../components/NotificationTableRows";
import type { NotificationRow } from "../types/NotificationRow";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";
import type { ConfirmDoneModalPhase } from "@/shared/types/ModalStep";

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

type ActionType = "MARK_ALL_READ" | "DELETE_ALL" | "DELETE_READ";
type ModalState = { action: ActionType; phase: ConfirmDoneModalPhase } | null;

const MODAL_CONFIG: Record<
  ActionType,
  {
    title: string;
    confirmMessage: string;
    doneMessage: string;
    confirmLabel: string;
    confirmVariant: "primary" | "danger";
  }
> = {
  MARK_ALL_READ: {
    title: "모두 읽음으로 표시",
    confirmMessage:
      "수신한 모든 알림을 읽음으로 표시할까요?\n이 작업은 되돌릴 수 없어요",
    doneMessage: "수신한 모든 알림을 읽음으로 표시했어요",
    confirmLabel: "확인",
    confirmVariant: "primary",
  },
  DELETE_ALL: {
    title: "모든 알림 지우기",
    confirmMessage: "수신한 모든 알림을 지울까요?\n이 작업은 되돌릴 수 없어요",
    doneMessage: "수신한 모든 알림을 지웠어요",
    confirmLabel: "삭제",
    confirmVariant: "danger",
  },
  DELETE_READ: {
    title: "읽은 알림 지우기",
    confirmMessage: "읽은 알림을 모두 지울까요?\n이 작업은 되돌릴 수 없어요",
    doneMessage: "읽은 모든 알림을 지웠어요",
    confirmLabel: "삭제",
    confirmVariant: "danger",
  },
};

function UserNotificationPage() {
  const itemSumNum = 8;
  const [notifications, setNotifications] =
    useState<NotificationRow[]>(mockNotifications);
  const [modalState, setModalState] = useState<ModalState>(null);
  const itemNum = notifications.length;
  const isLoading = false;
  const isMobile = useMediaQuery({ maxWidth: 479 });

  const titleActions = useMemo(
    () => [
      {
        label: "모두 읽음으로 표시",
        buttonType: "primary" as const,
        onClick: () =>
          setModalState({ action: "MARK_ALL_READ", phase: "CONFIRM" }),
      },
      {
        label: "모든 알림 지우기",
        buttonType: "danger" as const,
        onClick: () =>
          setModalState({ action: "DELETE_ALL", phase: "CONFIRM" }),
      },
      {
        label: "읽은 알림 지우기",
        buttonType: "danger" as const,
        onClick: () =>
          setModalState({ action: "DELETE_READ", phase: "CONFIRM" }),
      },
    ],
    [],
  );

  const runAction = (action: ActionType) => {
    switch (action) {
      case "MARK_ALL_READ":
        setNotifications((prev) =>
          prev.map((notification) => ({ ...notification, status: "읽음" })),
        );
        break;
      case "DELETE_ALL":
        setNotifications([]);
        break;
      case "DELETE_READ":
        setNotifications((prev) =>
          prev.filter((notification) => notification.status !== "읽음"),
        );
        break;
      default:
        break;
    }
  };

  const handleClose = useCallback(() => {
    setModalState(null);
  }, []);

  const handleConfirm = () => {
    if (!modalState) return;

    runAction(modalState.action);
    setModalState((prev) => (prev ? { ...prev, phase: "DONE" } : prev));
  };

  const renderStepModal = () => {
    if (!modalState) return null;

    const config = MODAL_CONFIG[modalState.action];
    const isConfirm = modalState.phase === "CONFIRM";

    return (
      <Modal>
        <Modal.Header onClick={handleClose}>{config.title}</Modal.Header>
        <Modal.Description>
          {isConfirm ? config.confirmMessage : config.doneMessage}
        </Modal.Description>
        <Modal.ButtonLayout>
          <Button
            size="modal"
            variant={isConfirm ? config.confirmVariant : "primary"}
            onClick={isConfirm ? handleConfirm : handleClose}
          >
            {isConfirm ? config.confirmLabel : "확인"}
          </Button>
          {isConfirm ? <Modal.Cancelled onClick={handleClose} /> : null}
        </Modal.ButtonLayout>
      </Modal>
    );
  };

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-280">
      {renderStepModal()}

      <TitleSection
        title="알림"
        subText="최근 받은 알림을 확인해보세요"
        actions={titleActions}
      />

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {({ currentItems, startIndex }) => {
          const pagedNotifications = notifications.slice(
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
