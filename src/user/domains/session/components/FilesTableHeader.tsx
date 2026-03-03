import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function FilesTableHeader() {
  return (
    <>
      <div className="flex gap-7">
        <TableHeaderLabel>ID</TableHeaderLabel>
        <TableHeaderLabel>자료 명</TableHeaderLabel>
      </div>
      <div className="flex gap-14.5">
        <TableHeaderLabel className="mr-19">등록일</TableHeaderLabel>
        <TableHeaderLabel>등록한 사용자</TableHeaderLabel>
      </div>
    </>
  );
}

export default FilesTableHeader;
