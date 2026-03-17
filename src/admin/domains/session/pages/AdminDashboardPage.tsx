import TitleSection from "@/shared/components/TitleSection";
import SessionInfoOverview from "../components/dashboard/SessionInfoOverview";
import SerachBar from "@/shared/components/SerachBar";
import Button from "@/shared/components/Button";

function AdminDashboardPage() {
  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
      <TitleSection title="대시보드" />

      <SessionInfoOverview />

      <section>
        <div className="text-title text-ec-black">이 세션에 등록된 사용자</div>
        <div className="flex gap-2">
          <div className="w-110">
            <SerachBar placeholder="추가하려는 사용자 이름 입력" />
          </div>
          <Button size="large" variant="primary">
            사용자 등록
          </Button>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
