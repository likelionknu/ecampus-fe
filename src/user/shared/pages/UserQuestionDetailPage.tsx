import { useState } from "react";
import { useMatches } from "react-router-dom";
import TextBox from "@/shared/components/TextBox";
import CommentInput from "@/shared/components/comment/CommentInput";
import QuestionCommentItem from "@/shared/components/comment/QuestionCommentItem";
import { formatKoreanDateTime24 } from "@/shared/utils/formatKoreanDateTime";
import QuestionContentSection from "@/user/domains/session/components/question/QuestionContentSection";
import QuestionMetaRow from "@/user/domains/session/components/question/QuestionMetaRow";
import QuestionCommentSkeleton from "@/user/domains/session/components/skeleton/QuestionCommentSkeleton";
import QuestionMetaRowSkeleton from "@/user/domains/session/components/skeleton/QuestionMetaRowSkeleton";
import UserTitleSection from "../components/UserTitleSection";
import { useMediaQuery } from "react-responsive";

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
  const isMobile = useMediaQuery({ maxWidth: 479 });
  const [isLoading, setIsLoading] = useState(false);
  const matches = useMatches();
  const shouldShowDeleteButton =
    [...matches]
      .reverse()
      .map(
        (match) =>
          (match.handle as { showDeleteButton?: boolean } | undefined)
            ?.showDeleteButton,
      )
      .find((value): value is boolean => typeof value === "boolean") ?? false;

  return (
    <div
      className={`${shouldShowDeleteButton ? "xl:px-8" : "xl:ml-30"} text-ec-black mx-auto w-full max-w-87.5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280`}
    >
      <div className="flex flex-col gap-5">
        <UserTitleSection
          title={mockQuestionDetail.title}
          {...(shouldShowDeleteButton
            ? {
                actions: [
                  {
                    label: "삭제",
                    buttonType: "danger" as const,
                    onClick: () => {
                      setIsLoading((prev) => !prev);
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
              <CommentInput />
            </>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default UserQuestionDetailPage;
