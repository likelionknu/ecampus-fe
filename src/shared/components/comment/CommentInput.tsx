import Button from "../Button";

function CommentInput() {
  return (
    <div className="mt-5 flex gap-4">
      <input
        type="text"
        placeholder="댓글을 남겨보세요"
        className="bg-ec-white text-ec-black placeholder:text-ec-sub rounded-ec-10 font-pretendard tracking-ec-normal flex-1 px-4 py-2 text-[14px]/[23px] font-medium"
      />
      <Button size="large" variant="primary">
        등록
      </Button>
    </div>
  );
}

export default CommentInput;
