import AdminQuestionDetailContent from "../components/AdminQuestionDetailContent";
import { mockAdminQuestionManageDetail } from "../mocks/mockAdminQuestionDetail";

function AdminQuestionManageView() {
  return (
    <AdminQuestionDetailContent
      question={mockAdminQuestionManageDetail}
      actions={[
        { label: "답변 등록", buttonType: "primary" },
        { label: "삭제", buttonType: "danger" },
      ]}
    />
  );
}

export default AdminQuestionManageView;
