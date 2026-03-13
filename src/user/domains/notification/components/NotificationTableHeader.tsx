import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";

function NotificationTableHeader() {
  return (
    <>
      <TableHeaderLabel className="ml-8">내용</TableHeaderLabel>
      <TableHeaderLabel className="ml-232">상태</TableHeaderLabel>
      <TableHeaderLabel className="ml-13">수신일</TableHeaderLabel>
    </>
  );
}

export default NotificationTableHeader;
