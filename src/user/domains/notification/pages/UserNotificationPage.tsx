import { useCallback, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
  TitleSection,
} from "@/shared/components";
import { TableEmptyState } from "@/shared/components/table";
import {
  MobileNotificationTableRows as MobileNotifitcationTableRows,
  NotificationTableHeader,
  NotificationTableRows,
  NotificationModal,
} from "../components";
import type { NotificationRow } from "../types/NotificationRow";
import { ErrorModal } from "@/shared/components/modal";
import type { ConfirmDoneModalPhase } from "@/shared/types";
import {
  deleteAllNotification,
  deleteReadNotification,
  getNotification,
  readAllNotification,
  readNotification,
} from "../apis/notification";
import { getCommonErrorState, type CommonErrorState } from "@/shared/utils";
import type { ActionType } from "../types/ModalAction";
import { PAGE_SIZE } from "@/shared/constants";

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
  size: PAGE_SIZE,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
};

const TITLE_ACTIONS = [
  {
    label: "모두 읽음으로 표시",
    buttonType: "primary" as const,
    action: "MARK_ALL_READ" as const,
  },
  {
    label: "모든 알림 지우기",
    buttonType: "danger" as const,
    action: "DELETE_ALL" as const,
  },
  {
    label: "읽은 알림 지우기",
    buttonType: "danger" as const,
    action: "DELETE_READ" as const,
  },
];

// 쿼리 키 생성, 페이지와 사이즈를 통하여 식별 가능
const notificationQueryKey = (page: number, size: number) =>
  ["notifications", page, size] as const;

// 알림 조회
const fetchNotifications = async (
  targetPage: number,
  size: number,
): Promise<NotificationPageState> => {
  const res = await getNotification({
    page: targetPage - 1,
    size,
  });

  const responseData = res.data?.data;

  return {
    notifications: Array.isArray(responseData?.notifications)
      ? responseData.notifications
      : [],
    page: responseData?.page ?? 0,
    size: PAGE_SIZE,
    totalElements: responseData?.totalElements ?? 0,
    totalPages: responseData?.totalPages ?? 0,
    hasNext: responseData?.hasNext ?? false,
  };
};

function UserNotificationPage() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [errors, setErrors] = useState<CommonErrorState | null>(null); // 에러 상태
  const isMobile = useMediaQuery({ maxWidth: 479 });

  const titleActions = useMemo(
    () =>
      TITLE_ACTIONS.map(({ action, ...rest }) => ({
        ...rest,
        onClick: () => setModalState({ action, phase: "CONFIRM" }),
      })),

    [setModalState],
  );

  const {
    // 보통 data로 받는 것을 notificationPage로 변경
    data: notificationPage = INITIAL_NOTIFICATION_PAGE_STATE,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: notificationQueryKey(currentPage, PAGE_SIZE), // 쿼리 키 생성
    queryFn: () => fetchNotifications(currentPage, PAGE_SIZE), // 실제 데이터 패칭
    placeholderData: keepPreviousData, // 이전 데이터 유지
  });

  // 모달 비활성화
  const handleClose = useCallback(() => {
    setModalState(null);
  }, []);

  const actionMutation = useMutation({
    mutationFn: async (action: ActionType) => {
      switch (action) {
        case "MARK_ALL_READ":
          await readAllNotification();
          break;
        case "DELETE_ALL":
          await deleteAllNotification();
          break;
        case "DELETE_READ":
          await deleteReadNotification();
          break;
        default:
          break;
      }
    },
  });

  // 모달 확인
  const handleConfirm = async () => {
    if (!modalState || actionMutation.isPending) return;

    try {
      await actionMutation.mutateAsync(modalState.action); // 모달 액션 실행
      // 쿼리 무효화 및 최신화 준비
      await queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      // 새 데이터 패칭
      let next = await queryClient.fetchQuery({
        queryKey: notificationQueryKey(currentPage, PAGE_SIZE),
        queryFn: () => fetchNotifications(currentPage, PAGE_SIZE),
      });

      if (currentPage > 1 && next.totalPages < currentPage) {
        const correctedPage = Math.max(next.totalPages, 1);
        setCurrentPage(correctedPage);

        next = await queryClient.fetchQuery({
          queryKey: notificationQueryKey(correctedPage, PAGE_SIZE),
          queryFn: () => fetchNotifications(correctedPage, PAGE_SIZE),
        });
      }

      setModalState((prev) => (prev ? { ...prev, phase: "DONE" } : prev));
    } catch (error) {
      setErrors(getCommonErrorState(error));
    }
  };

  // 알림 개별 읽음
  const readMutation = useMutation({
    mutationFn: async (notificationId: number) => {
      await readNotification({ nid: notificationId });
    },
  });

  const handleRead = async (notification: NotificationRow) => {
    if (notification.read || readMutation.isPending) return;

    try {
      await readMutation.mutateAsync(notification.id);

      queryClient.setQueryData<NotificationPageState>(
        notificationQueryKey(currentPage, PAGE_SIZE),
        (prev) => {
          if (!prev) return;

          return {
            ...prev,
            notifications: prev.notifications.map((item) =>
              item.id === notification.id ? { ...item, read: true } : item,
            ),
          };
        },
      );
    } catch (error) {
      setErrors(getCommonErrorState(error));
    }
  };

  const itemNum = notificationPage.totalElements;
  const itemSumNum = PAGE_SIZE;
  const pagedNotifications = notificationPage.notifications;
  const isEmpty = pagedNotifications.length === 0;
  const showLoading = isLoading || isFetching;

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-280">
      {/* 에러 모달 */}
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => {
            setErrors(null);
          }}
        />
      )}

      {/* 모달 */}
      <NotificationModal
        modalState={modalState}
        isSubmitting={actionMutation.isPending}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />

      <TitleSection
        title="알림"
        subText="최근 받은 알림을 확인해보세요"
        actions={titleActions}
      />

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {() => {
          return (
            <>
              {!isMobile && (
                <PageNationMenu>
                  <NotificationTableHeader />
                </PageNationMenu>
              )}

              {isEmpty && !showLoading ? (
                <TableEmptyState label="받은 알림이 없어요" />
              ) : isMobile ? (
                <MobileNotifitcationTableRows
                  notifications={pagedNotifications}
                />
              ) : (
                <NotificationTableRows
                  isLoading={showLoading}
                  onRowClick={handleRead}
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
