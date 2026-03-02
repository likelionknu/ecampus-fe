import UserTitleSection from "../../../shared/components/UserTitleSection";

function SessionQuestionListPage() {
  return (
    <div className="w-full px-8 pt-7">
      <UserTitleSection
        title="질문 및 답변(6)"
        subText="궁금한 내용이 있다면 질문하고, 답변받을 수 있어요"
        buttonText="새 질문 등록"
      />
    </div>
  );
}

export default SessionQuestionListPage;
