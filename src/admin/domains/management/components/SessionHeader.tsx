import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function SessionHeader() {
  return (
    <>
      <TableHeaderLabel className="ml-8">ID</TableHeaderLabel>
      <TableHeaderLabel className="ml-8.5">세션 명</TableHeaderLabel>
      <TableHeaderLabel className="ml-147">생성자</TableHeaderLabel>
      <TableHeaderLabel className="ml-14">참여</TableHeaderLabel>
      <TableHeaderLabel className="ml-13">자료</TableHeaderLabel>
      <TableHeaderLabel className="ml-11">과제</TableHeaderLabel>
      <TableHeaderLabel className="ml-12">상태</TableHeaderLabel>
    </>
  );
}

export default SessionHeader;
