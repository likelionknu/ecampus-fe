import { useMediaQuery } from "react-responsive";
import TitleSection from "@/shared/components/TitleSection";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import SessionsTableRows, {
  type AdminSessionRow,
} from "../components/SessionsTableRows";
import SessionHeader from "../components/SessionHeader";

const mockSessions: { content: AdminSessionRow[]; totalElements: number } = {
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
  ],
  totalElements: 8,
};

function AdminSessionsPage() {
  const itemNum = mockSessions.totalElements;
  const itemSumNum = 8;
  const isLoading = true;
  const isTablet = useMediaQuery({ maxWidth: 1023 });

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
      <TitleSection
        title="세션 관리"
        actions={[
          {
            label: "새 세션 추가하기",
            buttonType: "primary",
            onClick: () => {},
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
