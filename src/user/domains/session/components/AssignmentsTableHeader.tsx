import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function AssignmentsTableHeader() {
  return (
    <>
      <div className="flex gap-7">
        <TableHeaderLabel>ID</TableHeaderLabel>
        <TableHeaderLabel>과제 명</TableHeaderLabel>
      </div>
      <div className="flex gap-14.5">
        <TableHeaderLabel className="mr-19">마감</TableHeaderLabel>
        <TableHeaderLabel>상태</TableHeaderLabel>
        <TableHeaderLabel>평가</TableHeaderLabel>
      </div>
    </>
  );
}

export default AssignmentsTableHeader;
