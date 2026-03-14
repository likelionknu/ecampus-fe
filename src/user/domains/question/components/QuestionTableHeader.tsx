import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function QuestionTableHeader() {
  return (
    <>
      <TableHeaderLabel className="ml-8">ID</TableHeaderLabel>
      <TableHeaderLabel className="ml-6">세션 명</TableHeaderLabel>
      <TableHeaderLabel className="ml-64">제목</TableHeaderLabel>
      <TableHeaderLabel className="ml-87">등록일</TableHeaderLabel>
      <TableHeaderLabel className="ml-31">생성</TableHeaderLabel>
      <TableHeaderLabel className="ml-14.5">답변</TableHeaderLabel>
      <TableHeaderLabel className="ml-15">상태</TableHeaderLabel>
    </>
  );
}

export default QuestionTableHeader;
