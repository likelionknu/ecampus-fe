import { useMediaQuery } from "react-responsive";
import TitleSection from "@/shared/components/TitleSection";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import SessionsTableRows from "../components/SessionsTableRows";
import SessionHeader from "../components/SessionHeader";
import type { AdminSessionRow, PagedResponse } from "../types";
import { useCallback, useState } from "react";
import CreateModal from "../components/modal/sessions/CreateModal";
import ConfirmModal from "../components/modal/sessions/ConfirmModal";
import DoneModal from "../components/modal/sessions/DoneModal";

const mockSessions: PagedResponse<AdminSessionRow> = {
  content: [
    {
      id: 8,
      name: "[14기] 아기사자 - 백엔드 파트",
      creator: "황형진",
      participantCount: 86,
      fileCount: 12,
      assignmentCount: 12,
      status: "활성화",
    },
    {
      id: 8,
      name: "[14기] 아기사자 - 백엔드 파트",
      creator: "황형진",
      participantCount: 86,
      fileCount: 12,
      assignmentCount: 12,
      status: "비활성화",
    },
    {
      id: 8,
      name: "[14기] 아기사자 - 백엔드 파트",
      creator: "황형진",
      participantCount: 86,
      fileCount: 12,
      assignmentCount: 12,
      status: "활성화",
    },
    {
      id: 8,
      name: "[14기] 아기사자 - 백엔드 파트",
      creator: "황형진",
      participantCount: 86,
      fileCount: 12,
      assignmentCount: 12,
      status: "비활성화",
    },
    {
      id: 8,
      name: "[14기] 아기사자 - 백엔드 파트",
      creator: "황형진",
      participantCount: 86,
      fileCount: 12,
      assignmentCount: 12,
      status: "활성화",
    },
    {
      id: 8,
      name: "[14기] 아기사자 - 백엔드 파트",
      creator: "황형진",
      participantCount: 86,
      fileCount: 12,
      assignmentCount: 12,
      status: "비활성화",
    },
    {
      id: 8,
      name: "[14기] 아기사자 - 백엔드 파트",
      creator: "황형진",
      participantCount: 86,
      fileCount: 12,
      assignmentCount: 12,
      status: "활성화",
    },
    {
      id: 8,
      name: "[14기] 아기사자 - 백엔드 파트",
      creator: "황형진",
      participantCount: 86,
      fileCount: 12,
      assignmentCount: 12,
      status: "비활성화",
    },
    {
      id: 8,
      name: "[14기] 아기사자 - 백엔드 파트",
      creator: "황형진",
      participantCount: 86,
      fileCount: 12,
      assignmentCount: 12,
      status: "활성화",
    },
    {
      id: 8,
      name: "[14기] 아기사자 - 백엔드 파트",
      creator: "황형진",
      participantCount: 86,
      fileCount: 12,
      assignmentCount: 12,
      status: "비활성화",
    },
    {
      id: 8,
      name: "[14기] 아기사자 - 백엔드 파트",
      creator: "황형진",
      participantCount: 86,
      fileCount: 12,
      assignmentCount: 12,
      status: "활성화",
    },
    {
      id: 8,
      name: "[14기] 아기사자 - 백엔드 파트",
      creator: "황형진",
      participantCount: 86,
      fileCount: 12,
      assignmentCount: 12,
      status: "비활성화",
    },
  ],
  totalElements: 10,
};

type ModalStep = "CREATE" | "CONFIRM" | "DONE";

function AdminSessionsPage() {
  const itemNum = mockSessions.totalElements;
  const itemSumNum = 8;
  const isLoading = true;
  const [name, setName] = useState<string>("");
  const [step, setStep] = useState<ModalStep | null>(null);
  const isTablet = useMediaQuery({ maxWidth: 1023 });

  const handleClose = useCallback(() => {
    setStep(null);

    if (name) setName("");
  }, [name]);

  const renderStepModal = () => {
    switch (step) {
      case "CREATE":
        return (
          <CreateModal
            name={name}
            onChange={(e) => setName(e.target.value)}
            onNext={() => setStep("CONFIRM")}
            onClose={handleClose}
          />
        );
      case "CONFIRM":
        return (
          <ConfirmModal onClose={handleClose} onNext={() => setStep("DONE")} />
        );
      case "DONE":
        return <DoneModal onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
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
          const pagedSessions = mockSessions.content.slice(
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
