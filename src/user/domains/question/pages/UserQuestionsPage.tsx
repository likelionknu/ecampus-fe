import { useMediaQuery } from "react-responsive";
import SerachBar from "@/shared/components/SerachBar";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import TitleSection from "@/shared/components/TitleSection";
import MobileQuestionsTableRows from "@/user/domains/question/components/MobileQuestionsTableRows";
import QuestionTableHeader from "../components/QuestionTableHeader";
import QuestionTableRows from "../components/QuestionTableRows";
import type { SessionQuestionRow } from "../../session/types/SessionQuestionRow";
import SelectBox from "@/shared/components/SelectBox";
import { QUESTION_STATUS_OPTIONS } from "@/shared/constants/selectOptions";

const mockQuestions: { content: SessionQuestionRow[]; totalElements: number } =
  {
    content: [
      {
        answer: null,
        answeredAt: null,
        answeredUserId: null,
        answeredUserName: null,
        content: "이거 어떻게 하는 건가요?",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 8,
        isMyQuestion: false,
        sessionId: 14,
        status: "대기",
        title: "이거 어떻게 하는 건가요?",
      },
      {
        answer: "확인해보겠습니다.",
        answeredAt: "2026-02-14T01:15:00.000000",
        answeredUserId: 2,
        answeredUserName: "황형진",
        content: "이거 어떻게 하는 건가요?",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 7,
        isMyQuestion: false,
        sessionId: 14,
        status: "완료",
        title: "이거 어떻게 하는 건가요?",
      },
      {
        answer: null,
        answeredAt: null,
        answeredUserId: null,
        answeredUserName: null,
        content: "이거 어떻게 하는 건가요?",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 6,
        isMyQuestion: false,
        sessionId: 14,
        status: "대기",
        title: "이거 어떻게 하는 건가요?",
      },
      {
        answer: "확인해보겠습니다.",
        answeredAt: "2026-02-14T01:15:00.000000",
        answeredUserId: 2,
        answeredUserName: "황형진",
        content: "이거 어떻게 하는 건가요?",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 5,
        isMyQuestion: false,
        sessionId: 14,
        status: "완료",
        title: "이거 어떻게 하는 건가요?",
      },
      {
        answer: null,
        answeredAt: null,
        answeredUserId: null,
        answeredUserName: null,
        content: "이거 어떻게 하는 건가요?",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 4,
        isMyQuestion: false,
        sessionId: 14,
        status: "대기",
        title: "이거 어떻게 하는 건가요?",
      },
      {
        answer: "확인해보겠습니다.",
        answeredAt: "2026-02-14T01:15:00.000000",
        answeredUserId: 2,
        answeredUserName: "황형진",
        content: "이거 어떻게 하는 건가요?",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 3,
        isMyQuestion: false,
        sessionId: 14,
        status: "완료",
        title: "이거 어떻게 하는 건가요?",
      },
      {
        answer: null,
        answeredAt: null,
        answeredUserId: null,
        answeredUserName: null,
        content: "이거 어떻게 하는 건가요?",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 2,
        isMyQuestion: false,
        sessionId: 14,
        status: "대기",
        title: "이거 어떻게 하는 건가요?",
      },
      {
        answer: "확인해보겠습니다.",
        answeredAt: "2026-02-14T01:15:00.000000",
        answeredUserId: 2,
        answeredUserName: "황형진",
        content: "이거 어떻게 하는 건가요?",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 1,
        isMyQuestion: false,
        sessionId: 14,
        status: "완료",
        title: "이거 어떻게 하는 건가요?",
      },
    ],
    totalElements: 8,
  };

function UserQuestionsPage() {
  const itemSumNum = 8;
  const itemNum = mockQuestions.totalElements;
  const isLoading = false;
  const isTablet = useMediaQuery({ maxWidth: 1023 });

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:max-w-280">
      <TitleSection
        title={`질문(${mockQuestions.totalElements})`}
        subText="이캠퍼스에서 생성된 모든 질문을 확인할 수 있어요"
      />

      <div className="flex flex-col gap-2 md:flex-row">
        <div className="xl:w-108">
          <SerachBar placeholder="질문 제목으로 검색" />
        </div>
        <SelectBox options={QUESTION_STATUS_OPTIONS} defaultValue="전체" />
      </div>

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {({ currentItems, startIndex }) => {
          const pagedQuestions = mockQuestions.content.slice(
            startIndex,
            startIndex + currentItems.length,
          );

          return (
            <>
              {!isTablet && (
                <PageNationMenu>
                  <QuestionTableHeader />
                </PageNationMenu>
              )}
              {pagedQuestions.length === 0 && !isLoading ? (
                <TableEmptyState label="등록된 질문을 찾을 수 없거나 존재하지 않아요" />
              ) : isTablet ? (
                <MobileQuestionsTableRows questions={pagedQuestions} />
              ) : (
                <QuestionTableRows
                  isLoading={isLoading}
                  questions={pagedQuestions}
                />
              )}
              <PageNationButton />
            </>
          );
        }}
      </PageNationFrame>
    </div>
  );
}

export default UserQuestionsPage;
