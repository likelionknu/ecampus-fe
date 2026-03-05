import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function FilesTableHeader() {
  return (
    <div
      className="grid w-full items-center gap-x-10"
      style={{ gridTemplateColumns: "20px minmax(0,1fr) 180px 120px" }}
    >
      <TableHeaderLabel className="text-center">ID</TableHeaderLabel>
      <TableHeaderLabel>자료 명</TableHeaderLabel>
      <TableHeaderLabel className="text-center">등록일</TableHeaderLabel>
      <TableHeaderLabel className="text-center">등록한 사용자</TableHeaderLabel>
    </div>
  );
}
export default FilesTableHeader;
