import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import TitleSection from "@/shared/components/TitleSection";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import { formatKoreanDateTime12 } from "@/shared/utils/formatKoreanDateTime";
import FilesTableHeader from "../components/FilesTableHeader";
import FilesTableRow from "../components/FilesTableRow";
import ListBoxMobile from "../components/application/ListBoxMobile";
import { InfoMobile } from "../components/application/InfoMobile";
import { getSessionFiles } from "../apis/sessionFile";
import type { SessionFile } from "../types/SessionFile";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";
import ErrorModal from "@/shared/components/modal/ErrorModal";

function UserSessionFilesPage() {
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 764 });

  const [files, setFiles] = useState<SessionFile[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const size = 8;
  const sid = 1; // 임시 sid값
  // const sidParam = searchParams.get("sid");
  // const sid = sidParam ? Number(sidParam) : null;

  const openFileDetail = (fileId: number) => {
    navigate(`detail?sid=${sid}&fileId=${fileId}`);
  };

  const [errors, setErrors] = useState<CommonErrorState | null>(null);

  useEffect(() => {
    // if (!sid) return;
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        const res = await getSessionFiles({ sid, page: 0, size });
        const responseData = res.data;

        setFiles(
          Array.isArray(responseData?.content) ? responseData.content : [],
        );
        setTotalElements(responseData?.totalElements ?? 0);
      } catch (error) {
        setErrors(getCommonErrorState(error));
      } finally {
        setIsLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const itemNum = totalElements;
  const itemSumNum = 8;

  return (
    <div className="mx-auto flex w-full max-w-251 flex-col gap-5 px-4 pt-7 md:px-8">
      <TitleSection
        title={`자료(${itemNum})`}
        subText="이 세션에 추가된 자료예요"
      />

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {({ currentItems, startIndex }) => {
          const pageFiles = files.slice(
            startIndex,
            startIndex + currentItems.length,
          );
          console.log("page", pageFiles);

          return (
            <>
              {!isTablet && (
                <PageNationMenu>
                  <FilesTableHeader />
                </PageNationMenu>
              )}

              {pageFiles.length === 0 && !isLoading ? (
                <TableEmptyState label="등록된 세션 자료가 없어요" />
              ) : !isTablet ? (
                <FilesTableRow
                  files={pageFiles}
                  isLoading={isLoading}
                  onRowClick={(file) => openFileDetail(file.id)}
                />
              ) : (
                <div
                  className={`grid gap-4 ${
                    isMobile ? "grid-cols-1" : "grid-cols-2"
                  }`}
                >
                  {pageFiles.map((file) => (
                    <ListBoxMobile
                      key={file.id}
                      title={file.name}
                      onClick={() => openFileDetail(file.id)}
                    >
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
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}
    </div>
  );
}

export default UserSessionFilesPage;
