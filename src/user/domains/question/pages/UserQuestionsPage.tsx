import { useMediaQuery } from "react-responsive";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
  TitleSection,
} from "@/shared/components";
import { TableEmptyState } from "@/shared/components/table";
import { MobileQuestionsTableRows } from "@/user/domains/question/components";
import { QuestionTableHeader, QuestionTableRows } from "../components";
import type { SessionQuestionRow } from "../../session/types";
import {
  PAGE_SIZE,
  QUESTION_STATUS_DEFAULT_OPTION,
  QUESTION_STATUS_OPTION_TO_REQUEST_STATUS,
} from "@/shared/constants";
import { useState } from "react";
import { ErrorModal } from "@/shared/components/modal";
import type { CommonErrorState } from "@/shared/utils";
import { getQuestions } from "../apis";
import QuestionFilterBar from "../components/QuestionFilterBar";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { QuestionRequestStatus } from "@/shared/types";
import { useDebounce } from "@/shared/hooks/useDebounce";

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
  size: PAGE_SIZE,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
};

const questionQueryKey = (
  title: string,
  status: string,
  page: number,
  size: number,
) => ["questions", { title, status, page, size }] as const;

const fetchQuestioons = async (
  title: string,
  status: QuestionRequestStatus,
  page: number,
  size: number,
): Promise<QuestionsPageState> => {
  const res = await getQuestions({
    title,
    status,
    page: page - 1,
    size,
  });
  const responseData = res.data?.data ?? res.data;

  return {
    questions: Array.isArray(responseData?.content) ? responseData.content : [],
    page: responseData?.number ?? 0,
    size: PAGE_SIZE,
    totalElements: responseData?.totalElements ?? 0,
    totalPages: responseData?.totalPages ?? 0,
    hasNext: responseData?.last ?? false,
  };
};

function UserQuestionsPage() {
  const [filter, setFilter] = useState<FilterState>({
    title: "",
    status: QUESTION_STATUS_DEFAULT_OPTION,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState<CommonErrorState | null>(null); // 에러 상태
  const isTablet = useMediaQuery({ maxWidth: 1023 });
  const debouncedTitle = useDebounce(filter.title);
  const requestStatus =
    QUESTION_STATUS_OPTION_TO_REQUEST_STATUS[filter.status] ?? "ALL";

  const { data: questionsPage = INITIAL_QUESTIONS_PAGE_STATE, isLoading } =
    useQuery({
      queryKey: questionQueryKey(
        debouncedTitle,
        requestStatus,
        currentPage,
        PAGE_SIZE,
      ),
      queryFn: () =>
        fetchQuestioons(debouncedTitle, requestStatus, currentPage, PAGE_SIZE),
      placeholderData: keepPreviousData,
    });

  const itemNum = questionsPage.totalElements;
  const itemSumNum = PAGE_SIZE;
  const pagedQuestions = questionsPage.questions;
  const isEmpty = pagedQuestions.length === 0;
  const showLoading = isLoading;

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

      <QuestionFilterBar
        title={filter.title}
        onKeywordChange={(value) => {
          setFilter((prev) => {
            if (prev.title === value) return prev;
            return { ...prev, title: value };
          });
          setCurrentPage(1);
        }}
        onStatusChange={(value) => {
          setFilter((prev) => {
            if (prev.status === value) return prev;
            return { ...prev, status: value };
          });
          setCurrentPage(1);
        }}
      />

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {() => {
          return (
            <>
              {!isTablet && (
                <PageNationMenu>
                  <QuestionTableHeader />
                </PageNationMenu>
              )}
              {isEmpty && !showLoading ? (
                <TableEmptyState label="등록된 질문을 찾을 수 없거나 존재하지 않아요" />
              ) : isTablet ? (
                <MobileQuestionsTableRows questions={pagedQuestions} />
              ) : (
                <QuestionTableRows
                  isLoading={showLoading}
                  questions={pagedQuestions}
                />
              )}
              <PageNationButton onPageChange={setCurrentPage} />
            </>
          );
        }}
      </PageNationFrame>
    </div>
  );
}

export default UserQuestionsPage;
