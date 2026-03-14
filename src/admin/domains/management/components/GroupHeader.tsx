import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function GroupHeader() {
  return (
    <>
      <TableHeaderLabel className="ml-8.5">기수</TableHeaderLabel>
      <TableHeaderLabel className="ml-8">파트</TableHeaderLabel>
      <TableHeaderLabel className="ml-11">이름</TableHeaderLabel>
      <TableHeaderLabel className="ml-24">이메일 주소</TableHeaderLabel>
      <TableHeaderLabel className="ml-42">가입일</TableHeaderLabel>
      <TableHeaderLabel className="ml-25.5">벌점</TableHeaderLabel>
      <TableHeaderLabel className="ml-50">작업</TableHeaderLabel>
    </>
  );
}

export default GroupHeader;
