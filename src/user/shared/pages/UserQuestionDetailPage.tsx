import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextBox from "@/shared/components/TextBox";
import CommentInput from "@/shared/components/comment/CommentInput";
import QuestionCommentItem from "@/shared/components/comment/QuestionCommentItem";
import { formatKoreanDateTime24 } from "@/shared/utils/formatKoreanDateTime";
import QuestionContentSection from "@/user/domains/session/components/question/QuestionContentSection";
import QuestionMetaRow from "@/user/domains/session/components/question/QuestionMetaRow";
import QuestionCommentSkeleton from "@/user/domains/session/components/skeleton/QuestionCommentSkeleton";
import QuestionMetaRowSkeleton from "@/user/domains/session/components/skeleton/QuestionMetaRowSkeleton";
import TitleSection from "@/shared/components/TitleSection";
import { useMediaQuery } from "react-responsive";
import Modal from "@/shared/components/modal/Modal";
import Button from "@/shared/components/Button";
import ErrorModal from "@/shared/components/modal/ErrorModal";
import type { ConfirmDoneModalPhase } from "@/shared/types/ModalStep";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";
import { getSessionQuestion } from "../apis/sessionQuestion";
import CommentSection from "../components/CommnentSection";

type ActionType = "COMMENT" | "QUESTION";
type ModalState = { action: ActionType; phase: ConfirmDoneModalPhase } | null;

const MODAL_CONFIG: Record<
  ActionType,
  {
    title: string;
    confirmMessage: string;
    doneMessage: string;
    confirmLabel: string;
    confirmVariant: "primary" | "danger";
  }
> = {
  QUESTION: {
    title: "질문 삭제",
    confirmMessage:
      "질문을 정말 삭제하시겠어요? 이 질문을 그대로 남겨두어\n 다른 사용자에게 도움이 될 수 있도록 도와주세요",
    doneMessage: "질문을 삭제했어요.",
    confirmLabel: "삭제",
    confirmVariant: "danger",
  },
  COMMENT: {
    title: "새 댓글 등록",
    confirmMessage: "이 질문 게시글에 댓글을 등록할게요.",
    doneMessage: "게시글에 댓글을 등록했어요.",
    confirmLabel: "확인",
    confirmVariant: "primary",
  },
};

const mockQuestionDetail = {
  answer: null,
  answeredAt: null,
  answeredUserId: null,
  answeredUserName: null,
  content: "질문입니다",
  createdAt: "2026-03-03T01:33:50.785902",
  createdUserId: null,
  createdUserName: null,
  id: 1,
  isMyQuestion: false,
  sessionId: 1,
  status: "대기",
  title: "질문있어요",
} as const;

const questionMetaRows = [
  {
    label: "질문 등록일",
    value: formatKoreanDateTime24(mockQuestionDetail.createdAt),
  },
  { label: "등록자", value: mockQuestionDetail.createdUserName ?? "-" },
  {
    label: "답변 등록일",
    value: mockQuestionDetail.answeredAt
      ? formatKoreanDateTime24(mockQuestionDetail.answeredAt)
      : "-",
  },
  { label: "답변자", value: mockQuestionDetail.answeredUserName ?? "-" },
  { label: "상태", value: mockQuestionDetail.status },
] as const;

const skeletonRows = ["질문 등록일", "등록자", "답변 등록일", "답변자", "상태"];

function UserQuestionDetailPage() {
  const { questionId, sessionId } = useParams();
  const [modalState, setModalState] = useState<ModalState>(null);
  const [errors, setErrors] = useState<CommonErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const isLoading = false;
  const isMyQuestion = mockQuestionDetail.isMyQuestion;
  const isMobile = useMediaQuery({ maxWidth: 479 });

  const handleClose = useCallback(() => {
    setModalState(null);
  }, []);

  const handleComfirm = () => {
    if (!modalState) return;

    setModalState((prev) => (prev ? { ...prev, phase: "DONE" } : prev));
  };

  const renderStepModal = () => {
    if (!modalState) return null;

    const config = MODAL_CONFIG[modalState.action];
    const isConfirm = modalState.phase === "CONFIRM";

    return (
      <Modal>
        <Modal.Header onClick={handleClose}>{config.title}</Modal.Header>
        <Modal.Description>
          {isConfirm ? config.confirmMessage : config.doneMessage}
        </Modal.Description>
        <Modal.ButtonLayout>
          <Button
            size="modal"
            variant={isConfirm ? config.confirmVariant : "primary"}
            onClick={isConfirm ? handleComfirm : handleClose}
          >
            {isConfirm ? config.confirmLabel : "확인"}
          </Button>
          {isConfirm && <Modal.Cancled onClick={handleClose} />}
        </Modal.ButtonLayout>
      </Modal>
    );
  };

  useEffect(() => {
    const fetchQeustionDeatil = async () => {
      setIsLoading(true);
      const { qid, sid } = { qid: Number(questionId), sid: Number(sessionId) };

      try {
        const res = await getSessionQuestion({ qid, sid });

        setErrors(null);
        console.log(res);
      } catch (error) {
        setErrors(getCommonErrorState(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchQeustionDeatil();
  }, [questionId, sessionId]);

  return (
    <div
      className={`${mockQuestionDetail.isMyQuestion ? "xl:px-8" : "xl:ml-30"} text-ec-black mx-auto w-full max-w-87.5 px-4 pt-7 pb-120 md:max-w-187.5 xl:max-w-280`}
    >
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}
      {renderStepModal()}

      <div className="flex flex-col gap-5">
        <TitleSection
          title={mockQuestionDetail.title}
          {...(isMyQuestion
            ? {
                actions: [
                  {
                    label: "삭제",
                    buttonType: "danger" as const,
                    onClick: () => {
                      setModalState({ action: "QUESTION", phase: "CONFIRM" });
                    },
                  },
                ],
              }
            : {})}
        />
        <TextBox px={!isMobile} py={!isMobile}>
          <div className="flex flex-col gap-0 xl:gap-2">
            {isLoading
              ? skeletonRows.map((row) => (
                  <QuestionMetaRowSkeleton key={row} label={row} />
                ))
              : questionMetaRows.map((row, index) => (
                  <QuestionMetaRow
                    key={row.label}
                    label={row.label}
                    value={row.value}
                    className={
                      isMobile
                        ? `px-5 py-4 ${index % 2 === 0 ? "bg-ec-box" : "bg-ec-white border-ec-outline border"} ${
                            index === 0 ? "rounded-t-ec-10" : ""
                          } ${
                            index === questionMetaRows.length - 1
                              ? "rounded-b-ec-10"
                              : ""
                          }`
                        : ""
                    }
                  />
                ))}
          </div>
        </TextBox>

        <QuestionContentSection
          label="질문"
          content={mockQuestionDetail.content}
        />
        <QuestionContentSection
          label="답변"
          content={mockQuestionDetail.answer ?? "아직 등록된 답변이 없어요."}
        />

        <div className="flex flex-col gap-2">
          <span className="text-body-2 xl:text-ec-sub text-ec-black">
            2개의 댓글
          </span>
          {isMobile ? (
            <>
              <TextBox px={false} py={false}>
                <QuestionCommentItem />
              </TextBox>
              <TextBox px={false} py={false}>
                <QuestionCommentItem isMy={true} />
              </TextBox>
              <CommentInput
                onClick={() => {
                  setModalState({ action: "COMMENT", phase: "CONFIRM" });
                }}
              />
            </>
          ) : (
            <TextBox>
              <div>
                {isLoading ? (
                  <>
                    <QuestionCommentSkeleton />
                    <QuestionCommentSkeleton />
                    <QuestionCommentSkeleton />
                  </>
                ) : (
                  <CommentSection qid={Number(questionId)} />
                )}
              </div>
              <CommentInput
                onClick={() => {
                  setModalState({ action: "COMMENT", phase: "CONFIRM" });
                }}
              />
            </TextBox>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserQuestionDetailPage;
