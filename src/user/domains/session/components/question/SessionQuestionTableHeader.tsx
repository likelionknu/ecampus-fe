import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function SessionQuestionTableHeader() {
  return (
    <>
      <TableHeaderLabel className="ml-8.5 xl:ml-8.5">ID</TableHeaderLabel>
      <TableHeaderLabel className="ml-6 xl:ml-5">질문 명</TableHeaderLabel>
      <TableHeaderLabel className="ml-81 xl:ml-153">등록일</TableHeaderLabel>
      <TableHeaderLabel className="ml-30.5 xl:ml-26">질문자</TableHeaderLabel>
      <TableHeaderLabel className="ml-14 xl:ml-19">상태</TableHeaderLabel>
    </>
  );
}

export default SessionQuestionTableHeader;
