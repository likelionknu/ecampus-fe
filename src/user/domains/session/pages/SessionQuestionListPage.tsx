import TableHeaderLabel from "@/shared/components/TableHeaderLabel";
import UserTitleSection from "../../../shared/components/UserTitleSection";
import TextBox from "@/shared/components/TextBox";

function SessionQuestionListPage() {
  return (
    <div className="w-full max-w-251 px-8 pt-7">
      <UserTitleSection
        title="질문 및 답변(6)"
        subText="궁금한 내용이 있다면 질문하고, 답변받을 수 있어요"
        buttonText="새 질문 등록"
      />
      <section className="mt-5">
        <div className="bg-ec-table-header flex max-w-251 items-center justify-between rounded-tl-ec-10 rounded-tr-ec-10 px-8 py-3">
          <div className="flex gap-7">
            <TableHeaderLabel>ID</TableHeaderLabel>
            <TableHeaderLabel>질문 명</TableHeaderLabel>
          </div>
          <div className="flex gap-14.5">
            <TableHeaderLabel className="mr-19">등록일</TableHeaderLabel>
            <TableHeaderLabel>질문자</TableHeaderLabel>
            <TableHeaderLabel>상태</TableHeaderLabel>
          </div>
        </div>
      </section>
      <TextBox>ㅇㅁㄴㅇㄴㅁㄹㄴㅁㄹ</TextBox>
    </div>
  );
}

export default SessionQuestionListPage;
