import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function NotificationTableHeader() {
  return (
    <>
      <TableHeaderLabel>내용</TableHeaderLabel>
      <div className="flex gap-14">
        <TableHeaderLabel>상태</TableHeaderLabel>
        <TableHeaderLabel>수신일</TableHeaderLabel>
      </div>
    </>
  );
}

export default NotificationTableHeader;
