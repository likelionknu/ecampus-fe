import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function GroupHeader() {
  return (
    <>
      <TableHeaderLabel>기수</TableHeaderLabel>
      <TableHeaderLabel>파트</TableHeaderLabel>
      <TableHeaderLabel>이름</TableHeaderLabel>
      <TableHeaderLabel>이메일 주소</TableHeaderLabel>
      <TableHeaderLabel>가입일</TableHeaderLabel>
      <TableHeaderLabel>벌점</TableHeaderLabel>
      <TableHeaderLabel>작업</TableHeaderLabel>
    </>
  );
}

export default GroupHeader;
