import AdminQuestionDetailContent from "../components/AdminQuestionDetailContent";
import { mockAdminQuestionDetail } from "../mocks/mockAdminQuestionDetail";

function AdminQuestionView() {
  return <AdminQuestionDetailContent question={mockAdminQuestionDetail} />;
}

export default AdminQuestionView;
