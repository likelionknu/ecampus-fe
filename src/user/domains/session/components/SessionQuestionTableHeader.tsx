import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function SessionQuestionTableHeader() {
  return (
    <div>
      <TableHeaderLabel className="ml-9">ID</TableHeaderLabel>
      <TableHeaderLabel className="ml-5">질문 명</TableHeaderLabel>
      <TableHeaderLabel className="ml-135">등록일</TableHeaderLabel>
      <TableHeaderLabel className="ml-32.5">질문자</TableHeaderLabel>
      <TableHeaderLabel className="ml-13.5">상태</TableHeaderLabel>
    </div>
  );
}

export default SessionQuestionTableHeader;
