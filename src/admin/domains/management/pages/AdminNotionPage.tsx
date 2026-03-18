import TitleSection from "@/shared/components/TitleSection";
import {
  PageNationButton,
  PageNationFrame,
  PageNationItem,
  PageNationMenu,
} from "@/shared/components/PageNation";

const AdminNotionPage = () => {
  const itemSumNum = 8;
  const itemNum = 18;
  interface AdminNotionComponentProps {
    NotionId: string;
    NotionTitle: string;
    NotionFix: string;
    NotionDate: string;
    NotionRegistrant: string;

    onClick?: () => void;
  }
  const AdminNotionComponent = ({
    NotionId,
    NotionTitle,
    NotionFix,
    NotionDate,
    NotionRegistrant,
    onClick,
  }: AdminNotionComponentProps) => {
    return (
      <div className="flex cursor-pointer items-center" onClick={onClick}>
        <div className="text-ec-black ml-5 w-12.25 justify-start text-center text-sm font-medium">
          {NotionId}
        </div>
        <div className="text-ec-black ml-2.5 line-clamp-1 w-132.75 justify-start text-sm font-medium">
          {NotionTitle}
        </div>
        <div className="text-ec-black ml-7.5 w-7 justify-start text-center text-sm font-medium">
          {NotionFix}
        </div>
        <div className="text-ec-black ml-9 w-50 justify-start text-center text-sm font-medium">
          {NotionDate}
        </div>
        <div className="text-ec-black ml-9 w-11 justify-start text-center text-sm font-medium">
          {NotionRegistrant}
        </div>
      </div>
    );
  };
  return (
    <div className="flex w-full items-center justify-center pt-26.25 xl:pt-7.5">
      <div className="flex h-full w-251.5 flex-col items-center">
        <div className="flex w-full justify-between">
          <TitleSection title={`공지사항`} />
          <div className="bg-ec-blue rounded-ec-10 flex h-9.5 w-30 cursor-pointer items-center justify-center">
            <div className="text-ec-gnb-white text-center text-base font-medium">
              새 자료 추가
            </div>
          </div>
        </div>
        <div className="mt-5">
          <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
            {({ currentItems, startIndex }) => (
              <>
                <div className="flex h-112 w-251.5 flex-col">
                  <PageNationMenu>
                    <div className="text-ec-table-topic ml-9.5 justify-start text-center text-xs font-medium">
                      ID
                    </div>
                    <div className="text-ec-table-topic ml-7.25 justify-start text-center text-xs font-medium">
                      제목
                    </div>
                    <div className="text-ec-table-topic ml-136 justify-start text-center text-xs font-medium">
                      고정
                    </div>
                    <div className="text-ec-table-topic ml-31 justify-start text-center text-xs font-medium">
                      생성일
                    </div>
                    <div className="text-ec-table-topic ml-31.75 justify-start text-center text-xs font-medium">
                      생성자
                    </div>
                  </PageNationMenu>
                  {currentItems.map((item, index) => (
                    <PageNationItem
                      key={startIndex + index}
                      absoluteIndex={startIndex + index}
                    >
                      <AdminNotionComponent
                        NotionId={String(startIndex + index + 1)}
                        NotionTitle={`공지사항 ${item}`}
                        NotionFix="고정"
                        NotionDate="2026년 2월 14일 오전 12시 38분"
                        NotionRegistrant="김찬주"
                      />
                    </PageNationItem>
                  ))}
                </div>
                <PageNationButton />
              </>
            )}
          </PageNationFrame>
        </div>
      </div>
    </div>
  );
};

export default AdminNotionPage;
