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
import ListBoxMobile from "../components/application/ListBoxMobile";
import { InfoMobile } from "../components/application/InfoMobile";
import { formatKoreanDateTime12 } from "@/shared/utils/formatKoreanDateTime";
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
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 764 });
  const itemNum = mockfiles.length;
  const itemSumNum = 8;
  const isLoading = true;
  return (
    <div className="mx-auto flex w-full max-w-251 flex-col gap-5 px-4 pt-7 md:px-8">
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
              ) : !isTablet ? (
                <FilesTableRow files={pageFiles} isLoading={isLoading} />
              ) : (
                <div
                  className={`grid gap-4 ${
                    isMobile ? "grid-cols-1" : "grid-cols-2"
                  }`}
                >
                  {pageFiles.map((file) => (
                    <ListBoxMobile key={file.id} title={file.name}>
                      <InfoMobile label="작성자" value={file.createdBy} />
                      <InfoMobile
                        label="등록일"
                        value={formatKoreanDateTime12(file.createdAt)}
                      />
                    </ListBoxMobile>
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

export default UserSessionFilesPage;
