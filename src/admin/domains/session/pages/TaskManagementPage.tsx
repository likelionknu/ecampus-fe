import TitleSection from "@/shared/components/TitleSection";
import {
  PageNationButton,
  PageNationFrame,
  PageNationItem,
  PageNationMenu,
} from "@/shared/components/PageNation";

const TaskManagementPage = () => {
  const itemSumNum = 8;
  const itemNum = 18;
  interface TaskComponentProps {
    DataId: string;
    DataName: string;
    DataRegisterDate: string;
    DataRegistrant: string;
    DataVisibility: string;

    onClick?: () => void;
  }
  const TaskComponent = ({
    DataId,
    DataName,
    DataRegisterDate,
    DataRegistrant,
    DataVisibility,
    onClick,
  }: TaskComponentProps) => {
    return (
      <div className="flex cursor-pointer items-center" onClick={onClick}>
        <div className="text-ec-black ml-4.25 w-9.25 justify-start text-center text-sm font-medium">
          {DataId}
        </div>
        <div className="text-ec-black ml-4.5 line-clamp-1 w-143.75 justify-start text-sm font-medium">
          {DataName}
        </div>
        <div className="ml-6 flex w-78 items-center justify-between">
          <div className="text-ec-black w-12 justify-start text-center text-sm font-medium">
            {DataRegisterDate}
          </div>
          <div className="text-ec-black w-12 justify-start text-center text-sm font-medium">
            {DataRegistrant}
          </div>
          <div className="text-ec-black w-12 justify-start text-center text-sm font-medium">
            {DataVisibility}
          </div>
          <div className="text-ec-black w-12 justify-start text-center text-sm font-medium">
            {DataVisibility}
          </div>
          <div className="text-ec-black w-12 justify-start text-center text-sm font-medium">
            {DataVisibility}
          </div>
        </div>
      </div>
    );
  };

  const TaskNotionComponent = () => {
    return (
      <div className="bg-ec-white border-ec-blue rounded-ec-10 my-5 flex h-14 w-full items-center justify-center border">
        <div className="text-ec-blue w-full px-7.5 text-sm font-medium">
          과제 미제출 시 벌점 부여 회칙이 있으므로 확인해 주세요!
        </div>
      </div>
    );
  };
  return (
    <div className="flex w-full items-center justify-center pt-26.25 xl:pt-7.5">
      <div className="flex h-full w-251.5 flex-col items-center">
        <div className="flex w-full justify-between">
          <TitleSection title={`과제 관리`} />
          <div className="bg-ec-blue rounded-ec-10 flex h-9.5 w-30 cursor-pointer items-center justify-center">
            <div className="text-ec-gnb-white text-center text-base font-medium">
              새 자료 추가
            </div>
          </div>
        </div>
        <TaskNotionComponent />
        <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
          {({ currentItems, startIndex }) => (
            <>
              <div className="flex h-112 w-251.5 flex-col">
                <PageNationMenu>
                  <div className="text-ec-table-topic ml-7.5 justify-start text-center text-xs font-medium">
                    ID
                  </div>
                  <div className="text-ec-table-topic ml-8 justify-start text-center text-xs font-medium">
                    과제 명
                  </div>
                  <div className="text-ec-table-topic ml-143 justify-start text-center text-xs font-medium">
                    등록자
                  </div>
                  <div className="text-ec-table-topic ml-10.75 justify-start text-center text-xs font-medium">
                    마감
                  </div>
                  <div className="text-ec-table-topic ml-10.75 justify-start text-center text-xs font-medium">
                    부여
                  </div>
                  <div className="text-ec-table-topic ml-10.75 justify-start text-center text-xs font-medium">
                    제출
                  </div>
                  <div className="text-ec-table-topic ml-10 justify-start text-center text-xs font-medium">
                    미제출
                  </div>
                </PageNationMenu>
                {currentItems.map((item, index) => (
                  <PageNationItem
                    key={startIndex + index}
                    absoluteIndex={startIndex + index}
                  >
                    <TaskComponent
                      DataId={String(startIndex + index + 1)}
                      DataName={`공지사항 ${item}`}
                      DataRegisterDate="김찬주"
                      DataRegistrant="1234일"
                      DataVisibility="123명"
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
  );
};

export default TaskManagementPage;
