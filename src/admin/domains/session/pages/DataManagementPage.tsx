import TitleSection from "@/shared/components/TitleSection";
import {
  PageNationButton,
  PageNationFrame,
  PageNationItem,
  PageNationMenu,
} from "@/shared/components/PageNation";

const DataManagementPage = () => {
  const itemSumNum = 8;
  const itemNum = 18;
  interface DataComponentProps {
    DataId: string;
    DataName: string;
    DataRegisterDate: string;
    DataRegistrant: string;
    DataVisibility: string;

    onClick?: () => void;
  }
  const DataComponent = ({
    DataId,
    DataName,
    DataRegisterDate,
    DataRegistrant,
    DataVisibility,
    onClick,
  }: DataComponentProps) => {
    return (
      <div className="flex cursor-pointer items-center" onClick={onClick}>
        <div className="text-ec-black ml-5 w-12.25 justify-start text-center text-sm font-medium">
          {DataId}
        </div>
        <div className="text-ec-black ml-2.5 line-clamp-1 w-134.75 justify-start text-sm font-medium">
          {DataName}
        </div>
        <div className="text-ec-black ml-3.5 w-50.5 justify-start text-center text-sm font-medium">
          {DataRegisterDate}
        </div>
        <div className="text-ec-black ml-6 w-12 justify-start text-center text-sm font-medium">
          {DataRegistrant}
        </div>
        <div className="text-ec-black ml-6 w-11 justify-start text-center text-sm font-medium">
          {DataVisibility}
        </div>
      </div>
    );
  };
  return (
    <div className="flex w-full items-center justify-center pt-26.25 xl:pt-7.5">
      <div className="flex h-full w-251.5 flex-col items-center">
        <div className="flex w-full justify-between">
          <TitleSection title={`자료 관리`} />
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
                      자료 명
                    </div>
                    <div className="text-ec-table-topic ml-151 justify-start text-center text-xs font-medium">
                      등록일
                    </div>
                    <div className="text-ec-table-topic ml-29.5 justify-start text-center text-xs font-medium">
                      등록자
                    </div>
                    <div className="text-ec-table-topic ml-8.25 justify-start text-center text-xs font-medium">
                      공개 여부
                    </div>
                  </PageNationMenu>
                  {currentItems.map((item, index) => (
                    <PageNationItem
                      key={startIndex + index}
                      absoluteIndex={startIndex + index}
                    >
                      <DataComponent
                        DataId={String(startIndex + index + 1)}
                        DataName={`공지사항 ${item}`}
                        DataRegisterDate="2026년 2월 13일 오전 12시 38분"
                        DataRegistrant="김찬주"
                        DataVisibility="비공개"
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

export default DataManagementPage;
