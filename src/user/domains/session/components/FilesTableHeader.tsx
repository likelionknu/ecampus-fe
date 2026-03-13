import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function FilesTableHeader() {
  return (
    <div
      className="mx-5 grid w-full items-center gap-x-5"
      style={{ gridTemplateColumns: "50px 450px 200px 120px" }}
    >
      <TableHeaderLabel className="text-center">ID</TableHeaderLabel>
      <TableHeaderLabel>자료 명</TableHeaderLabel>
      <TableHeaderLabel className="text-center">등록일</TableHeaderLabel>
      <TableHeaderLabel className="text-center">등록한 사용자</TableHeaderLabel>
    </div>
  );
}
export default FilesTableHeader;
