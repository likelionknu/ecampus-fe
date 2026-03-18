import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function DashboardHeader() {
  return (
    <>
      <TableHeaderLabel className="ml-9">기수</TableHeaderLabel>
      <TableHeaderLabel className="ml-15.5">이름</TableHeaderLabel>
      <TableHeaderLabel className="ml-15">파트</TableHeaderLabel>
      <TableHeaderLabel className="ml-19">이메일 주소</TableHeaderLabel>
      <TableHeaderLabel className="ml-53">이 세션에 추가 됨</TableHeaderLabel>
      <TableHeaderLabel className="ml-49">초대자(등록자)</TableHeaderLabel>
      <TableHeaderLabel className="ml-19">추방</TableHeaderLabel>
    </>
  );
}

export default DashboardHeader;
