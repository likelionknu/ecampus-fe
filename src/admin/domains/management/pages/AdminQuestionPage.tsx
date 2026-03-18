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

  interface AdminQuestionComponentProps {
    QuestionId: string;
    QuestionSessionName: string;
    QuestionTitle: string;
    QuestionRegistrantDate: string;
    QuestionCreate: string;
    QuestionAnwser: string;
    QuestionState: string;

    onClick?: () => void;
  }
  const AdminQuestionComponent = ({
    QuestionId,
    QuestionSessionName,
    QuestionTitle,
    QuestionRegistrantDate,
    QuestionCreate,
    QuestionAnwser,
    QuestionState,

    onClick,
  }: AdminQuestionComponentProps) => {
    return (
      <div className="flex cursor-pointer items-center" onClick={onClick}>
        <div className="text-ec-black ml-1.5 w-9.25 justify-start text-center text-sm font-medium">
          {QuestionId}
        </div>
        <div className="text-ec-black ml-6 line-clamp-1 w-64 justify-start text-sm font-medium">
          {QuestionSessionName}
        </div>
        <div className="text-ec-black ml-5 w-51.5 justify-start text-sm font-medium">
          {QuestionTitle}
        </div>
        <div className="text-ec-black ml-3.5 w-50 justify-start text-center text-sm font-medium">
          {QuestionRegistrantDate}
        </div>
        <div className="text-ec-black ml-9.75 w-10 justify-start text-center text-sm font-medium">
          {QuestionCreate}
        </div>
        <div className="text-ec-black ml-9.5 w-10 justify-start text-center text-sm font-medium">
          {QuestionAnwser}
        </div>
        <div className="text-ec-black ml-8 w-6.5 justify-start text-center text-sm font-medium">
          {QuestionState}
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
                    <AdminQuestionComponent
                      QuestionId={String(startIndex + index + 1)}
                      QuestionSessionName={`공[14기] 아기사자 - 백엔드 파트 ${item}`}
                      QuestionTitle="이거 어떻게하는건데요"
                      QuestionRegistrantDate="2026년 2월 14일 오전 12시 38분"
                      QuestionCreate="김찬주"
                      QuestionAnwser="미답변"
                      QuestionState="대기"
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
