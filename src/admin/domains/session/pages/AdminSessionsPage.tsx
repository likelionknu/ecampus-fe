import { useMediaQuery } from "react-responsive";
import TitleSection from "@/shared/components/TitleSection";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";

interface AdminSessionRow {
  id: number;
  name: string;
  creator: string;
  participantCount: number;
  fileCount: number;
  assignmentCount: number;
  status: "활성화" | "비활성화";
}

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
  const isLoading = false;
  const isTablet = useMediaQuery({ maxWidth: 1023 });

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
      <TitleSection
        title={`세션 관리(${mockSessions.totalElements})`}
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
                  <div className="text-caption text-ec-table-topic flex w-full items-center px-8">
                    <span className="w-12">ID</span>
                    <span className="flex-1">세션 명</span>
                    <span className="w-20">생성자</span>
                    <span className="w-16">참여</span>
                    <span className="w-16">자료</span>
                    <span className="w-16">과제</span>
                    <span className="w-20">상태</span>
                  </div>
                </PageNationMenu>
              )}

              {pagedSessions.length === 0 && !isLoading ? (
                <TableEmptyState label="등록된 세션이 없어요." />
              ) : (
                <div className="rounded-ec-10 flex w-full flex-col overflow-hidden">
                  {pagedSessions.map((session, index) => (
                    <div
                      key={`${session.id}-${index}`}
                      className={`flex items-center px-8 py-5 ${
                        index % 2 === 1 ? "bg-ec-box" : "bg-ec-white"
                      }`}
                    >
                      <span className="text-body-2 w-12">{session.id}</span>
                      <span className="text-body-2 flex-1 truncate">
                        {session.name}
                      </span>
                      <span className="text-body-2 w-20">
                        {session.creator}
                      </span>
                      <span className="text-body-2 w-16">
                        {session.participantCount}명
                      </span>
                      <span className="text-body-2 w-16">
                        {session.fileCount}건
                      </span>
                      <span className="text-body-2 w-16">
                        {session.assignmentCount}개
                      </span>
                      <span
                        className={`text-body-2 w-20 ${
                          session.status === "활성화"
                            ? "text-ec-blue"
                            : "text-ec-sub"
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>
                  ))}
                </div>
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
