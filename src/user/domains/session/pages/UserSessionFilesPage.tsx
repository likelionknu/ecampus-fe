// import TableEmptyState from "@/shared/components/table/TableEmptyState";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
import FilesTableHeader from "../components/FilesTableHeader";
import FilesTableRow from "../components/FilesTableRow";
const mockfiles = [
  {
    id: 2,
    name: "테스트트트 자료 1테스트트트 자료 1테스트트트 자료 1테스트트트 자료 1테스트트트 자료 1테스트트트 자료 1",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 3,
    name: "테스트 자료 2",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 4,
    name: "테스트 자료 3",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 5,
    name: "테스트 4",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 6,
    name: "테스트 5",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 7,
    name: "테스트 6",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 8,
    name: "테스트 7",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
  {
    id: 9,
    name: "테스트 8",
    createdAt: "2026-02-28T16:00:00.111111",
    createdBy: "한종민",
  },
];

function UserSessionFilesPage() {
  return (
    <div className="flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection title="자료" subText="이 세션에 추가된 자료에요" />
      <section>
        <div className="bg-ec-table-header rounded-tl-ec-10 rounded-tr-ec-10 flex max-w-251 items-center justify-between px-8 py-4">
          <FilesTableHeader />
        </div>
        {/* <TableEmptyState label="등록된 세션 자료가 없어요." /> */}
        <FilesTableRow files={mockfiles} />
      </section>
    </div>
  );
}

export default UserSessionFilesPage;
