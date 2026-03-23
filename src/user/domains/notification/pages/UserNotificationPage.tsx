import { useMediaQuery } from "react-responsive";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import Modal from "@/shared/components/modal/Modal";
import Button from "@/shared/components/Button";
import type { ConfirmDoneModalPhase } from "@/shared/types/ModalStep";
import {
  deleteAllNotification,
  deleteReadNotification,
  getNotification,
  readAllNotification,
} from "../apis/notification";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";
import ErrorModal from "@/shared/components/modal/ErrorModal";

type ActionType = "MARK_ALL_READ" | "DELETE_ALL" | "DELETE_READ";
type ModalState = { action: ActionType; phase: ConfirmDoneModalPhase } | null;

interface NotificationPageState {
  notifications: NotificationRow[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

const INITIAL_NOTIFICATION_PAGE_STATE: NotificationPageState = {
  notifications: [],
  page: 0,
  size: 8,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
};

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
  // api 응답(데이터, 페이지네이션)
  const [notificationPage, setNotificationPage] =
    useState<NotificationPageState>(INITIAL_NOTIFICATION_PAGE_STATE);
  const [currentPage, setCurrentPage] = useState(1);

  // 모달 활성화
  const [modalState, setModalState] = useState<ModalState>(null);
  // 로딩
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [errors, setErrors] = useState<CommonErrorState | null>(null); // 에러 상태
  const itemNum = notificationPage.totalElements;
  const itemSumNum = INITIAL_NOTIFICATION_PAGE_STATE.size;
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

  // 모달 비활성화
  const handleClose = useCallback(() => {
    setModalState(null);
  }, []);

  // 모달 확인
  const handleConfirm = () => {
    if (!modalState) return;

    runAction(modalState.action);
    setModalState((prev) => (prev ? { ...prev, phase: "DONE" } : prev));
  };

  // 모두 읽음 처리
  const handleReadAll = async () => {
    try {
      await readAllNotification();
      setModalState((prev) => (prev ? { ...prev, phase: "DONE" } : prev));
    } catch (error) {
      setErrors(getCommonErrorState(error));
    }
  };

  // 모든 알림 삭제
  const handleDeleteAll = async () => {
    try {
      await deleteAllNotification();
      setModalState((prev) => (prev ? { ...prev, phase: "DONE" } : prev));
    } catch (error) {
      setErrors(getCommonErrorState(error));
    }
  };

  // 읽은 알림 삭제
  const handleDeleteRead = async () => {
    try {
      await deleteReadNotification();
      setModalState((prev) => (prev ? { ...prev, phase: "DONE" } : prev));
    } catch (error) {
      setErrors(getCommonErrorState(error));
    }
  };

  const runAction = (action: ActionType) => {
    switch (action) {
      case "MARK_ALL_READ":
        handleReadAll();
        break;
      case "DELETE_ALL":
        handleDeleteAll();
        break;
      case "DELETE_READ":
        handleDeleteRead();
        break;
      default:
        break;
    }
  };

  // 모달
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

  // 알림 조회
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);

      try {
        const res = await getNotification({
          page: currentPage - 1,
        });
        const responseData = res.data?.data;

        setNotificationPage({
          notifications: Array.isArray(responseData?.notifications)
            ? responseData.notifications
            : [],
          page: responseData?.page ?? 0,
          size: responseData?.size ?? itemSumNum,
          totalElements: responseData?.totalElements ?? 0,
          totalPages: responseData?.totalPages ?? 0,
          hasNext: responseData?.hasNext ?? false,
        });
      } catch (error) {
        setErrors(getCommonErrorState(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [currentPage, itemSumNum]);

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-280">
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => {
            setErrors(null);
          }}
        />
      )}

      {renderStepModal()}

      <TitleSection
        title="알림"
        subText="최근 받은 알림을 확인해보세요"
        actions={titleActions}
      />

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {() => {
          const pagedNotifications = notificationPage.notifications;
          const isEmpty = pagedNotifications.length === 0;

          return (
            <>
              {!isMobile && (
                <PageNationMenu>
                  <NotificationTableHeader />
                </PageNationMenu>
              )}

              {isEmpty && !isLoading ? (
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
              <PageNationButton onPageChange={setCurrentPage} />
            </>
          );
        }}
      </PageNationFrame>
    </div>
  );
}

export default UserNotificationPage;
