import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function QuestionTableHeader() {
  return (
    <div>
      <TableHeaderLabel className="ml-8">ID</TableHeaderLabel>
      <TableHeaderLabel className="ml-6">세션 명</TableHeaderLabel>
      <TableHeaderLabel className="ml-64">제목</TableHeaderLabel>
      <TableHeaderLabel className="ml-94">등록일</TableHeaderLabel>
      <TableHeaderLabel className="ml-32">생성</TableHeaderLabel>
      <TableHeaderLabel className="ml-15">답변</TableHeaderLabel>
      <TableHeaderLabel className="ml-14">상태</TableHeaderLabel>
    </div>
  );
}

export default QuestionTableHeader;
