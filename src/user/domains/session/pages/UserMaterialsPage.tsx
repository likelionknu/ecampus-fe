import TableEmptyState from "@/shared/components/table/TableEmptyState";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
import QuestionTableHeader from "../components/QuestionTableHeader";

function UserMaterialsPage() {
  return (
    <div className="flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection title="자료" subText="이 세션에 추가된 자료에요" />
      <section>
        <div className="bg-ec-table-header rounded-tl-ec-10 rounded-tr-ec-10 flex max-w-251 items-center justify-between px-8 py-4">
          <QuestionTableHeader />
        </div>
        <TableEmptyState label="등록된 세션 자료가 없어요." />
      </section>
    </div>
  );
}

export default UserMaterialsPage;
