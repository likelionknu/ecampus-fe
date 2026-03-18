import Button from "@/shared/components/Button";
import TitleSection from "@/shared/components/TitleSection";
import AssignmentDescriptionSection from "../components/assignments/AssignmentDescriptionSection";
import AssignmentMetaCard from "../components/assignments/AssignmentMetaCard";
import AssignmentStatusTable from "../components/assignments/AssignmentStatusTable";
import { mockAdminSessionAssignmentDetail } from "../mocks/mockAdminSessionAssignmentDetail";

function AdminSessionAssignmentsView() {
  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
      <div className="flex w-full max-w-251.5 flex-col gap-5">
        <div className="flex flex-col gap-3">
          <TitleSection title={mockAdminSessionAssignmentDetail.title} />
          <div className="flex flex-wrap gap-2.5">
            <Button size="primary">수정</Button>
            <Button size="primary" variant="danger">
              삭제
            </Button>
          </div>
        </div>

        <AssignmentMetaCard assignment={mockAdminSessionAssignmentDetail} />
        <AssignmentDescriptionSection
          description={mockAdminSessionAssignmentDetail.description}
        />
        <AssignmentStatusTable
          participants={mockAdminSessionAssignmentDetail.participants}
        />
      </div>
    </div>
  );
}

export default AdminSessionAssignmentsView;
