import TableHeaderLabel from "@/shared/components/TableHeaderLabel";

function QuestionTableHeader() {
  return (
    <>
      <div className="flex gap-7">
        <TableHeaderLabel>ID</TableHeaderLabel>
        <TableHeaderLabel>질문 명</TableHeaderLabel>
      </div>
      <div className="flex gap-14.5">
        <TableHeaderLabel className="mr-19">등록일</TableHeaderLabel>
        <TableHeaderLabel>질문자</TableHeaderLabel>
        <TableHeaderLabel>상태</TableHeaderLabel>
      </div>
    </>
  );
}

export default QuestionTableHeader;
