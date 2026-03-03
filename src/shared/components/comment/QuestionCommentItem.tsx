const CommentStatus = () => {
  return (
    <div className="bg-ec-blue text-ec-white font-pretendard tracking-ec-normal min-w-10 rounded-[5px] px-1.5 text-[10px] font-medium">
      내 댓글
    </div>
  );
};

function QuestionCommentItem({ isMy }: { isMy?: boolean }) {
  return (
    <div className="border-ec-outline border-b py-2">
      <div className="font-pretendard flex justify-between">
        <div className="flex gap-2">
          {isMy && <CommentStatus />}
          <span className="text-ec-black tracking-ec-normal text-[14px]/[23px] font-medium">
            김찬주
          </span>
          <span className="text-ec-disable tracking-ec-normal text-[14px]/[23px] font-medium">
            3일전
          </span>
        </div>
        {isMy && (
          <span className="text-ec-red tracking-ec-normal text-[14px]/[23px] font-medium">
            삭제
          </span>
        )}
      </div>
      <span className="text-ec-black tracking-ec-normal text-[14px]/[23px] font-medium">
        이거 너무 궁금한데 빨리 답변 달아주세요.
      </span>
    </div>
  );
}

export default QuestionCommentItem;
