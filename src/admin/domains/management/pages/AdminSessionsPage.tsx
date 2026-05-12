import { useMediaQuery } from "react-responsive";
import {
  TitleSection,
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components";
import { TableEmptyState } from "@/shared/components/table";
import { SessionsTableRows, SessionHeader } from "../components/session";
import type { AdminSessionRow } from "../types";
import { useCallback, useState } from "react";
import {
  CreateModal,
  ConfirmModal,
  DoneModal,
} from "../components/modal/sessions";
import type { CreateConfirmDoneModalStep } from "@/shared/types";
import { createSession, getSessions } from "../apis";
import { getCommonErrorState, type CommonErrorState } from "@/shared/utils";
import { ErrorModal } from "@/shared/components/modal";
import { PAGE_SIZE } from "@/shared/constants";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface SessionsPageState {
  sessions: AdminSessionRow[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

const INITIAL_SESSIONS_PAGE_STATE: SessionsPageState = {
  sessions: [],
  page: 0,
  size: PAGE_SIZE,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
};

const sessionQueryKey = () => ["sessions"] as const;

const fetchSessions = async () => {
  const res = await getSessions();

  const responseData = res.data?.data;

  return {
    sessions: Array.isArray(responseData?.content) ? responseData.content : [],
    page: responseData?.number ?? 0,
    size: PAGE_SIZE,
    totalElements: responseData?.totalElements ?? 0,
    totalPages: responseData?.totalPages ?? 0,
    hasNext: !(responseData?.last ?? true),
  };
};

function AdminSessionsPage() {
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<CommonErrorState | null>(null); // 에러 상태
  const [name, setName] = useState<string>(""); // 세션 추가 이름 상태
  const [step, setStep] = useState<CreateConfirmDoneModalStep | null>(null); // 모달 단계
  const isTablet = useMediaQuery({ maxWidth: 1023 });

  const { data: sessionsPage = INITIAL_SESSIONS_PAGE_STATE, isLoading } =
    useQuery({
      queryKey: sessionQueryKey(),
      queryFn: () => fetchSessions(),
      placeholderData: keepPreviousData,
    });

  const createSessionMutation = useMutation({
    mutationFn: (sessionName: string) => createSession({ name: sessionName }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: sessionQueryKey() });
      setErrors(null);
      setStep("DONE");
    },
    onError: (error) => {
      setErrors(getCommonErrorState(error));
    },
  });

  // 모달 비활성화
  const handleClose = useCallback(() => {
    setStep(null);
    setName("");
  }, []);

  // 세션 추가
  const handleCreateSession = async () => {
    if (!name.trim()) return;

    createSessionMutation.mutate(name.trim());
  };

  const renderStepModal = () => {
    switch (step) {
      case "CREATE":
        return (
          <CreateModal
            name={name}
            onChange={(e) => setName(e.target.value)}
            onClick={() => setStep("CONFIRM")}
            onClose={handleClose}
          />
        );
      case "CONFIRM":
        return (
          <ConfirmModal onClose={handleClose} onClick={handleCreateSession} />
        );
      case "DONE":
        return <DoneModal onClose={handleClose} />;
      default:
        return null;
    }
  };

  const itemNum = sessionsPage.totalElements;
  const itemSumNum = sessionsPage.size;

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:max-w-251.5 xl:px-0">
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}

      {renderStepModal()}

      <TitleSection
        title="세션 관리"
        actions={[
          {
            label: "새 세션 추가하기",
            buttonType: "primary",
            onClick: () => setStep("CREATE"),
          },
        ]}
      />

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {({ currentItems, startIndex }) => {
          const pagedSessions = sessionsPage.sessions.slice(
            startIndex,
            startIndex + currentItems.length,
          );

          return (
            <>
              {!isTablet && (
                <PageNationMenu>
                  <SessionHeader />
                </PageNationMenu>
              )}

              {pagedSessions.length === 0 && !isLoading ? (
                <TableEmptyState label="등록된 세션이 없어요." />
              ) : (
                <SessionsTableRows
                  isLoading={isLoading}
                  sessions={pagedSessions}
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

export default AdminSessionsPage;
