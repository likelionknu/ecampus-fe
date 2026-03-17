import TitleSection from "@/shared/components/TitleSection";
import SessionInfoOverview from "../components/dashboard/SessionInfoOverview";
import type { SessionDashboardData } from "../components/dashboard/SessionInfoOverview";
import SerachBar from "@/shared/components/SerachBar";
import Button from "@/shared/components/Button";
import SelectBox from "@/shared/components/SelectBox";
import {
  ADMIN_DASHBOARD_PART_DEFAULT,
  SESSION_PART_OPTIONS,
} from "@/shared/constants/selectOptions";
import SelectedUser from "../components/dashboard/SelectedUser";

const mockSessionDashboardData: SessionDashboardData = {
  sessionId: 8,
  name: "[14기] 아기사자 - 백엔드 파트",
  createdAt: "2026-03-10T14:30:00",
  createdBy: "김진영",
  userCount: 86,
  fileCount: 12,
  assignmentCount: 12,
  questionCount: 5,
  status: "활성화",
};

function AdminDashboardPage() {
  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
      <TitleSection title="대시보드" />

      <SessionInfoOverview data={mockSessionDashboardData} />

      <section>
        <div className="text-title text-ec-black">이 세션에 등록된 사용자</div>
        <div className="mt-2 flex gap-5">
          <div className="w-110">
            <SerachBar placeholder="추가하려는 사용자 이름 입력" />
          </div>
          <SelectBox
            options={SESSION_PART_OPTIONS}
            defaultValue={ADMIN_DASHBOARD_PART_DEFAULT}
          />
          <Button size="large" variant="primary">
            사용자 등록
          </Button>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <span className="text-caption text-ec-sub">
            추가될 사용자(클릭하여 삭제)
          </span>
          <SelectedUser />
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
