import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

const ASSIGNMENTS_TABLE_COLUMNS = "52px minmax(0,1fr) 208px 72px 56px";

function AssignmentsTableHeader() {
  return (
    <div
      className="grid w-full items-center gap-5"
      style={{ gridTemplateColumns: ASSIGNMENTS_TABLE_COLUMNS }}
    >
      <TableHeaderLabel className="text-center">ID</TableHeaderLabel>
      <TableHeaderLabel>과제 명</TableHeaderLabel>
      <TableHeaderLabel className="text-center">마감</TableHeaderLabel>
      <TableHeaderLabel className="text-center">상태</TableHeaderLabel>
      <TableHeaderLabel className="text-center">평가</TableHeaderLabel>
    </div>
  );
}

export default AssignmentsTableHeader;
