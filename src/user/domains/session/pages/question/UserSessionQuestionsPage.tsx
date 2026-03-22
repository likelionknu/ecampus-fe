import { useNavigate } from "react-router-dom";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import TitleSection from "@/shared/components/TitleSection";
import SessionQuestionTableHeader from "../../components/question/SessionQuestionTableHeader";
import SessionQuestionTableRows from "../../components/question/SessionQuestionTableRows";
import type { SessionQuestionRow } from "../../types/SessionQuestionRow";
import { useMediaQuery } from "react-responsive";
import SessionMobileQuestionTableRows from "../../components/question/SessionMobileQuestionTableRows";
import { useEffect, useState } from "react";
import { getSessionQuestions } from "../../apis/sessionQuestion";
import ErrorModal from "@/shared/components/modal/ErrorModal";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";

interface QuestionsPageState {
  questions: SessionQuestionRow[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

const INITIAL_QUESTIONS_PAGE_STATE: QuestionsPageState = {
  questions: [],
  page: 0,
  size: 8,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
};

function UserSessionQuestionsPage() {
  const navigate = useNavigate();
  const [questionsPage, setQuestionsPage] = useState<QuestionsPageState>(
    INITIAL_QUESTIONS_PAGE_STATE,
  );
  const [errors, setErrors] = useState<CommonErrorState | null>(null);
  const itemSumNum = 8;
  const itemNum = questionsPage.totalElements;
  const [isLoading, setIsLoading] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 1023 });

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);

      try {
        const res = await getSessionQuestions({ sid: Number(1) });
        const responseData = res.data?.data ?? res.data;

        setQuestionsPage({
          questions: Array.isArray(responseData?.content)
            ? responseData.content
            : [],
          page: responseData?.number ?? 0,
          size: responseData?.size ?? INITIAL_QUESTIONS_PAGE_STATE.size,
          totalElements: responseData?.totalElements ?? 0,
          totalPages: responseData?.totalPages ?? 0,
          hasNext: !(responseData?.last ?? true),
        });
      } catch (error) {
        setErrors(getCommonErrorState(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 md:max-w-187.5 xl:max-w-251 xl:px-0">
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}

      <TitleSection
        title={`질문 및 답변(${questionsPage.totalElements})`}
        subText="궁금한 내용이 있다면 질문하고, 답변받을 수 있어요"
        actions={[
          {
            label: "새 질문 등록",
            buttonType: "primary",
            onClick: () => navigate("new"),
          },
        ]}
      />

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {({ currentItems, startIndex }) => {
          const pagedQuestions = questionsPage.questions.slice(
            startIndex,
            startIndex + currentItems.length,
          );

          return (
            <>
              {!isTablet && (
                <PageNationMenu>
                  <SessionQuestionTableHeader />
                </PageNationMenu>
              )}
              {pagedQuestions.length === 0 && !isLoading ? (
                <TableEmptyState label="등록된 세션 자료가 없어요." />
              ) : isTablet ? (
                <SessionMobileQuestionTableRows questions={pagedQuestions} />
              ) : (
                <SessionQuestionTableRows
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

export default UserSessionQuestionsPage;
