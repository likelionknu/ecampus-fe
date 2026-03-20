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
import { useEffect, useState } from "react";
import ErrorModal from "@/shared/components/modal/ErrorModal";
import {
  getQuestionsErrorState,
  type QuestionErrorState,
} from "@/shared/utils/questionError";
import { getQuestions } from "../apis/questions";

interface QuestionsPageState {
  questions: SessionQuestionRow[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

interface FilterState {
  title: string;
  status: string;
}

const INITIAL_QUESTIONS_PAGE_STATE: QuestionsPageState = {
  questions: [],
  page: 0,
  size: 8,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
};

function UserQuestionsPage() {
  const [questionsPage, setQuestionsPage] = useState<QuestionsPageState>(
    INITIAL_QUESTIONS_PAGE_STATE,
  );
  const [filter, setFilter] = useState<FilterState>({
    title: "",
    status: "전체",
  });
  const [errors, setErrors] = useState<QuestionErrorState | null>(null);
  const itemSumNum = questionsPage.size;
  const itemNum = questionsPage.totalElements;
  const [isLoading, setIsLoading] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 1023 });

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);

      try {
        const res = await getQuestions();
        setErrors(null);
        setQuestionsPage({
          questions: Array.isArray(res.data?.content) ? res.data.content : [],
          page: res.data?.number ?? 0,
          size: res.data?.size ?? INITIAL_QUESTIONS_PAGE_STATE.size,
          totalElements: res.data?.totalElements ?? 0,
          totalPages: res.data?.totalPages ?? 0,
          hasNext: !(res.data?.last ?? true),
        });
      } catch (error) {
        setErrors(getQuestionsErrorState(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:max-w-280">
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}
      <TitleSection
        title={`질문(${questionsPage.totalElements})`}
        subText="이캠퍼스에서 생성된 모든 질문을 확인할 수 있어요"
      />

      <div className="flex flex-col gap-2 md:flex-row">
        <div className="xl:w-108">
          <SerachBar
            value={filter.title}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="질문 제목으로 검색"
          />
        </div>
        <SelectBox
          options={QUESTION_STATUS_OPTIONS}
          defaultValue="전체"
          onChange={(value) =>
            setFilter((prev) => ({ ...prev, status: value }))
          }
        />
      </div>

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {({ currentItems, startIndex }) => {
          const pagedQuestions = questionsPage.questions.slice(
            startIndex,
            startIndex + currentItems.length,
          );

          const isEmpty = pagedQuestions.length === 0;

          return (
            <>
              {!isTablet && (
                <PageNationMenu>
                  <QuestionTableHeader />
                </PageNationMenu>
              )}
              {isEmpty && !isLoading ? (
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
