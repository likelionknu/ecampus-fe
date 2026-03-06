import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function GroupTableHeader() {
  return (
    <div className="flex gap-10">
      <TableHeaderLabel className="mr-5 text-center">기수</TableHeaderLabel>
      <TableHeaderLabel className="mr-4 text-center">이름</TableHeaderLabel>
      <TableHeaderLabel className="mr-2 text-center">파트</TableHeaderLabel>
      <TableHeaderLabel className="text-left">이메일주소</TableHeaderLabel>
    </div>
  );
}

export default GroupTableHeader;
