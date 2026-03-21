import ErrorModal from "@/shared/components/modal/ErrorModal";
import QuestionCommentItem from "@/shared/components/comment/QuestionCommentItem";
import QuestionCommentSkeleton from "@/user/domains/session/components/skeleton/QuestionCommentSkeleton";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";
import { useEffect, useState } from "react";
import { getComments } from "../apis/comment";
import type { CommentState } from "../types/CommentState";

function CommentSection({
  qid,
  isLoading,
  refreshKey,
  onCountChange,
}: {
  qid: number;
  isLoading: boolean;
  refreshKey: number;
  onCountChange?: (count: number) => void;
}) {
  const [comments, setComments] = useState<CommentState[]>([]);
  const [errors, setErrors] = useState<CommonErrorState | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getComments({ qid });
        const responseData = res.data?.data ?? res.data;
        const nextComments = Array.isArray(responseData) ? responseData : [];

        setErrors(null);
        setComments(nextComments);
        onCountChange?.(nextComments.length);
      } catch (error) {
        setErrors(getCommonErrorState(error));
      }
    };

    fetchComments();
  }, [qid, refreshKey]);

  return (
    <>
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}

      {isLoading ? (
        <>
          <QuestionCommentSkeleton />
          <QuestionCommentSkeleton />
          <QuestionCommentSkeleton />
        </>
      ) : comments.length === 0 ? (
        <div className="border-ec-outline-dark flex items-center justify-center border-b py-5">
          <span className="text-ec-sub font-pretendard tracking-ec-normal bg-ec-box text-[14px]/[23px] font-medium">
            첫 댓글을 남겨보세요!
          </span>
        </div>
      ) : (
        <>
          {comments.map((comment) => (
            <QuestionCommentItem
              key={comment.commentId}
              comment={comment}
              onDeleted={(cid) =>
                setComments((prev) => {
                  const nextComments = prev.filter(
                    (item) => item.commentId !== cid,
                  );
                  onCountChange?.(nextComments.length);
                  return nextComments;
                })
              }
            />
          ))}
        </>
      )}
    </>
  );
}

export default CommentSection;
