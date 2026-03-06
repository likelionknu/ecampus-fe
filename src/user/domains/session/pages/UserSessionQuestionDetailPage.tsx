import { useState } from "react";
// import Modal from "@/shared/components/Modal";
// import Button from "@/shared/components/Button";
import TextBox from "@/shared/components/TextBox";
import QuestionCommentItem from "@/shared/components/comment/QuestionCommentItem";
import CommentInput from "@/shared/components/comment/CommentInput";
import { formatKoreanDateTime24 } from "@/shared/utils/formatKoreanDateTime";
import QuestionMetaRow from "@/user/domains/session/components/QuestionMetaRow";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
import QuestionContentSection from "../components/QuestionContentSection";
import QuestionMetaRowSkeleton from "../components/skeleton/QuestionMetaRowSkeleton";
import QuestionCommentSkeleton from "../components/skeleton/QuestionCommentSkeleton";

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

function UserSessionQuestionDetailPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="text-ec-black flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      {/* <Modal>
        <Modal.Header>질문 삭제</Modal.Header>
        <Modal.Description>
          질문을 정말 삭제하시겠어요? 이 질문을 그대로 남겨두어 다른 사용자에게
          도움이 될 수 있도록 도와주세요
        </Modal.Description>
        <Modal.ButtonLayout>
          <Button size="modal" variant="danger">
            삭제
          </Button>
          <Modal.Cancle />
        </Modal.ButtonLayout>
      </Modal> */}

      <UserTitleSection
        title={mockQuestionDetail.title}
        buttonText="삭제"
        buttonType="danger"
        onClick={() => {
          setIsLoading((prev) => !prev);
        }}
      />
      <TextBox>
        <div className="flex flex-col gap-2">
          {isLoading
            ? skeletonRows.map((row) => (
                <QuestionMetaRowSkeleton key={row} label={row} />
              ))
            : questionMetaRows.map((row) => (
                <QuestionMetaRow
                  key={row.label}
                  label={row.label}
                  value={row.value}
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
        <span className="text-body-2 text-ec-sub">2개의 댓글</span>
        <TextBox>
          <div>
            <div className="border-ec-outline-dark flex items-center justify-center border-b py-5">
              <span className="text-ec-sub font-pretendard tracking-ec-normal bg-ec-box text-[14px]/[23px] font-medium">
                첫 댓글을 남겨보세요!
              </span>
            </div>
            {isLoading ? (
              <>
                <QuestionCommentSkeleton />
                <QuestionCommentSkeleton />
              </>
            ) : (
              <>
                <QuestionCommentItem />
                <QuestionCommentItem isMy={true} />
              </>
            )}
          </div>
          <CommentInput />
        </TextBox>
      </div>
    </div>
  );
}

export default UserSessionQuestionDetailPage;
