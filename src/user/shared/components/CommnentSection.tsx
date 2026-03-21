import QuestionCommentItem from "@/shared/components/comment/QuestionCommentItem";

function CommentSection({ qid }: { qid: number }) {
  console.log(qid);

  return (
    <>
      <div className="border-ec-outline-dark flex items-center justify-center border-b py-5">
        <span className="text-ec-sub font-pretendard tracking-ec-normal bg-ec-box text-[14px]/[23px] font-medium">
          첫 댓글을 남겨보세요!
        </span>
      </div>
      <QuestionCommentItem />
      <QuestionCommentItem />
      <QuestionCommentItem isMy={true} />
    </>
  );
}

export default CommentSection;
