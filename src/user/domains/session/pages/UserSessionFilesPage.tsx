// import TableEmptyState from "@/shared/components/table/TableEmptyState";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
import FilesTableHeader from "../components/FilesTableHeader";
import FilesTableRow from "../components/FilesTableRow";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import { useMediaQuery } from "react-responsive";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
const mockfiles = [
  {
    id: 2,
    name: "테스트트트 자료 1테스트트트 자료 1테스트트트 자료 1테스트트트 자료 1테스트트트 자료 1테스트트트 자료 1",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 3,
    name: "테스트 자료 2",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 4,
    name: "테스트 자료 3",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 5,
    name: "테스트 4",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 6,
    name: "테스트 5",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 7,
    name: "테스트 6",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 8,
    name: "테스트 7",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 9,
    name: "테스트 8",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
];

function UserSessionFilesPage() {
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const itemNum = mockfiles.length;
  const itemSumNum = 8;
  const isLoading = true;
  return (
    <div className="flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection title="자료" subText="이 세션에 추가된 자료에요" />
      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {({ currentItems, startIndex }) => {
          const pageFiles = mockfiles.slice(
            startIndex,
            startIndex + currentItems.length,
          );

          return (
            <>
              {!isTablet && (
                <PageNationMenu>
                  <FilesTableHeader />
                </PageNationMenu>
              )}
              {pageFiles.length === 0 && !isLoading ? (
                <TableEmptyState label="등록된 세션 자료가 없어요." />
              ) : (
                // ) : isTablet ? (
                //   <FilesTableRow files={pageFiles} isLoading={isLoading} />
                <FilesTableRow files={pageFiles} isLoading={isLoading} />
              )}
              <PageNationButton />
            </>
          );
        }}
      </PageNationFrame>
    </div>
  );
}

export default UserSessionFilesPage;
