import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextBox from "@/shared/components/TextBox";
import CommentInput from "@/shared/components/comment/CommentInput";
import { formatKoreanDateTime24 } from "@/shared/utils/formatKoreanDateTime";
import QuestionContentSection from "@/user/domains/session/components/question/QuestionContentSection";
import QuestionMetaRow from "@/user/domains/session/components/question/QuestionMetaRow";
import QuestionMetaRowSkeleton from "@/user/domains/session/components/skeleton/QuestionMetaRowSkeleton";
import TitleSection from "@/shared/components/TitleSection";
import { useMediaQuery } from "react-responsive";
import Modal from "@/shared/components/modal/Modal";
import Button from "@/shared/components/Button";
import ErrorModal from "@/shared/components/modal/ErrorModal";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";
import { getSessionQuestion } from "../apis/sessionQuestion";
import CommentSection from "../components/CommnentSection";
import MobileCommentSection from "../components/MobileCommentSection";

type ModalState = "CONFIRM" | "DONE" | null;

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
  const { questionId, sessionId } = useParams(); // 질문/세션 id
  const [modalState, setModalState] = useState<ModalState>(null); // 모달 상태
  const [errors, setErrors] = useState<CommonErrorState | null>(null); // 에러 상태
  const [refreshKey, setRefreshKey] = useState(0); // 등록/삭제 후 질문 재조회
  const [commentCount, setCommentCount] = useState(0); // 댓글 개수
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const isMyQuestion = mockQuestionDetail.isMyQuestion; // 내 질문 여부
  const isMobile = useMediaQuery({ maxWidth: 479 }); // 모바일 반응형 분기 처리

  // 모달 비활성화
  const handleClose = useCallback(() => {
    setModalState(null);
  }, []);

  // 삭제 api 추가 예정
  const handleQuestionConfirm = () => {
    if (!modalState) return;
    setModalState("DONE");
  };

  // 삭제 확인 모달
  const renderStepModal = () => {
    if (!modalState) return null;

    const isConfirm = modalState === "CONFIRM";

    return (
      <Modal>
        <Modal.Header onClick={handleClose}>질문 삭제</Modal.Header>
        <Modal.Description>
          {isConfirm
            ? "질문을 정말 삭제하시겠어요? 이 질문을 그대로 남겨두어\n 다른 사용자에게 도움이 될 수 있도록 도와주세요"
            : "질문을 삭제했어요."}
        </Modal.Description>
        <Modal.ButtonLayout>
          <Button
            size="modal"
            variant={isConfirm ? "danger" : "primary"}
            onClick={isConfirm ? handleQuestionConfirm : handleClose}
          >
            {isConfirm ? "삭제" : "확인"}
          </Button>
          {isConfirm && <Modal.Cancled onClick={handleClose} />}
        </Modal.ButtonLayout>
      </Modal>
    );
  };

  // 질문 상세 정보 조회
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
      {/* 에러 모달 */}
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}
      {/* 삭제 확인 모달 */}
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
                      setModalState("CONFIRM");
                    },
                  },
                ],
              }
            : {})}
        />
        {/* 질문 기본 정보 */}
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
        {/* 댓글 섹션 */}
        <div className="flex flex-col gap-2">
          <span className="text-body-2 xl:text-ec-sub text-ec-black">
            {`${commentCount}개의 댓글`}
          </span>
          {isMobile ? (
            <>
              <MobileCommentSection
                qid={Number(questionId)}
                refreshKey={refreshKey}
                onCountChange={setCommentCount}
                setRefresh={setRefreshKey}
              />
              <CommentInput
                qid={Number(questionId)}
                setRefresh={setRefreshKey}
              />
            </>
          ) : (
            <TextBox>
              <div>
                <CommentSection
                  qid={Number(questionId)}
                  isLoading={isLoading}
                  refreshKey={refreshKey}
                  onCountChange={setCommentCount}
                  setRefresh={setRefreshKey}
                />
              </div>
              <CommentInput
                qid={Number(questionId)}
                setRefresh={setRefreshKey}
              />
            </TextBox>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserQuestionDetailPage;
