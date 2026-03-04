import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function QuestionTableHeader() {
  return (
    <>
      <div className="flex gap-7">
        <TableHeaderLabel>ID</TableHeaderLabel>
        <TableHeaderLabel>세션 명</TableHeaderLabel>
        <TableHeaderLabel>제목</TableHeaderLabel>
      </div>
      <div className="flex gap-14.5">
        <TableHeaderLabel className="mr-19">등록일</TableHeaderLabel>
        <TableHeaderLabel>생성</TableHeaderLabel>
        <TableHeaderLabel>답변</TableHeaderLabel>
        <TableHeaderLabel>상태</TableHeaderLabel>
      </div>
    </>
  );
}

export default QuestionTableHeader;
