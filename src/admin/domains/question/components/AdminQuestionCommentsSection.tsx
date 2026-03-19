import Button from "@/shared/components/Button";
import TextBox from "@/shared/components/TextBox";
import AdminQuestionCommentItem from "./AdminQuestionCommentItem";
import type { AdminQuestionComment } from "../types/question";

interface AdminQuestionCommentsSectionProps {
  comments: readonly AdminQuestionComment[];
}

function AdminQuestionCommentsSection({
  comments,
}: AdminQuestionCommentsSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-body-2 text-ec-black">{comments.length}개의 댓글</span>
      <TextBox px={false} py={false}>
        <div>
          {comments.map((comment) => (
            <AdminQuestionCommentItem key={comment.id} comment={comment} />
          ))}
        </div>
        <div className="flex items-center gap-4 px-7 py-4.25">
          <input
            type="text"
            placeholder="댓글을 남겨보세요"
            className="bg-ec-white text-ec-black placeholder:text-ec-sub h-11 flex-1 rounded-ec-10 px-4 text-[14px]/[23px] font-medium outline-none"
          />
          <Button size="large" style={{ width: 74, minWidth: 74, height: 44 }}>
            등록
          </Button>
        </div>
      </TextBox>
    </div>
  );
}

export default AdminQuestionCommentsSection;
