import type { AdminQuestionComment } from "../types/question";

interface AdminQuestionCommentItemProps {
  comment: AdminQuestionComment;
}

function AdminQuestionCommentItem({ comment }: AdminQuestionCommentItemProps) {
  return (
    <div className="border-ec-outline border-b px-7 py-2.5">
      <div className="font-pretendard flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-ec-black text-[14px]/[23px] font-medium">
            {comment.author}
          </span>
          <span className="text-ec-disable text-[14px]/[23px] font-medium">
            {comment.createdLabel}
          </span>
          {comment.isMine && (
            <div className="bg-ec-blue flex h-4 min-w-10 items-center justify-center rounded-[5px] px-1.5 text-[10px] font-medium text-ec-white">
              내 댓글
            </div>
          )}
        </div>
        {comment.isMine && (
          <span className="cursor-pointer pt-0.5 text-[14px]/[23px] font-medium text-ec-red">
            삭제
          </span>
        )}
      </div>
      <span className="mt-0.5 block text-ec-black text-[14px]/[23px] font-medium">
        {comment.content}
      </span>
    </div>
  );
}

export default AdminQuestionCommentItem;
