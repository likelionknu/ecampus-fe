import TitleSection from "@/shared/components/TitleSection";
import {
  PageNationButton,
  PageNationFrame,
  PageNationItem,
  PageNationMenu,
} from "@/shared/components/PageNation";
import SerachBar from "@/shared/components/SerachBar";
import SelectBox from "@/shared/components/SelectBox";
import { QUESTION_STATUS_OPTIONS } from "@/shared/constants/selectOptions";
import { useState } from "react";

const AdminQuestionPage = () => {
  const itemSumNum = 8;
  const itemNum = 18;
  const [search, setSearch] = useState("");

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
        <div className="text-ec-black bg-ec-blue ml-1.5 w-9.25 justify-start text-center text-sm font-medium">
          {DataId}
        </div>
        <div className="text-ec-black bg-ec-blue ml-6 line-clamp-1 w-64 justify-start text-sm font-medium">
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

  return (
    <div className="flex w-full items-center justify-center pt-26.25 xl:pt-7.5">
      <div className="flex h-full w-251.5 flex-col items-center">
        <div className="flex w-full">
          <TitleSection title={`질문 및 답변`} />
        </div>
        <div className="my-5 flex w-full gap-2.5">
          <div className="flex w-107.5 items-center justify-center">
            <SerachBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="사용자 이름으로 검색"
            />
          </div>
          <SelectBox options={QUESTION_STATUS_OPTIONS} defaultValue="전체" />
        </div>
        <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
          {({ currentItems, startIndex }) => (
            <>
              <div className="flex h-112 w-251.5 flex-col">
                <PageNationMenu>
                  <div className="text-ec-table-topic ml-5 justify-start text-center text-xs font-medium">
                    ID
                  </div>
                  <div className="text-ec-table-topic ml-9.25 justify-start text-center text-xs font-medium">
                    세션 명
                  </div>
                  <div className="text-ec-table-topic ml-60.5 justify-start text-center text-xs font-medium">
                    제목
                  </div>
                  <div className="text-ec-table-topic ml-70.5 justify-start text-center text-xs font-medium">
                    등록일
                  </div>
                  <div className="text-ec-table-topic ml-33.25 justify-start text-center text-xs font-medium">
                    생성
                  </div>
                  <div className="text-ec-table-topic ml-14.25 justify-start text-center text-xs font-medium">
                    답변
                  </div>
                  <div className="text-ec-table-topic ml-11 justify-start text-center text-xs font-medium">
                    상태
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

export default AdminQuestionPage;
