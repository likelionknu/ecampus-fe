// import TableEmptyState from "@/shared/components/table/TableEmptyState";
import TitleSection from "@/shared/components/TitleSection";
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
    name: "?뚯뒪?명듃???먮즺 1?뚯뒪?명듃???먮즺 1?뚯뒪?명듃???먮즺 1?뚯뒪?명듃???먮즺 1?뚯뒪?명듃???먮즺 1?뚯뒪?명듃???먮즺 1",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "?쒖쥌誘?,
  },
  {
    id: 3,
    name: "?뚯뒪???먮즺 2",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "?쒖쥌誘?,
  },
  {
    id: 4,
    name: "?뚯뒪???먮즺 3",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "?쒖쥌誘?,
  },
  {
    id: 5,
    name: "?뚯뒪??4",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "?쒖쥌誘?,
  },
  {
    id: 6,
    name: "?뚯뒪??5",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "?쒖쥌誘?,
  },
  {
    id: 7,
    name: "?뚯뒪??6",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "?쒖쥌誘?,
  },
  {
    id: 8,
    name: "?뚯뒪??7",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "?쒖쥌誘?,
  },
  {
    id: 9,
    name: "?뚯뒪??8",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "?쒖쥌誘?,
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
      <TitleSection title="?먮즺" subText="???몄뀡??異붽????먮즺?먯슂" />
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
                <TableEmptyState label="?깅줉???몄뀡 ?먮즺媛 ?놁뼱??" />
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
                      <InfoMobile label="?묒꽦?? value={file.createdBy} />
                      <InfoMobile
                        label="?깅줉??
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

