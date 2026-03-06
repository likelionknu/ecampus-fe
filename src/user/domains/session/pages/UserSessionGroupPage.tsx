import { useState } from "react";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
// import TableEmptyState from "@/shared/components/table/TableEmptyState";
import GroupTableHeader from "../components/GroupTableHeader";
import SerachBar from "@/shared/components/SerachBar";
import GroupTableRow from "../components/GroupTableRow";
interface MockQuestion {
  course: number;
  name: string;
  part: string;
  email: string;
}

const mockGroups: MockQuestion[] = [
  {
    course: 14,
    name: "김진영",
    part: "BACKEND",
    email: "kim@test.com",
  },
  {
    course: 13,
    name: "박김철",
    part: "BACKEND",
    email: "park@test.com",
  },
  {
    course: 14,
    name: "김진영",
    part: "BACKEND",
    email: "kim@test.com",
  },
  {
    course: 13,
    name: "박김철",
    part: "BACKEND",
    email: "park@test.com",
  },
];
function UserSessionGroupPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection
        title="사용자 및 그룹"
        subText="이 세션에 추가된 사용자를 확인하세요"
      />
      <div className="w-107.5">
        <SerachBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="사용자 이름으로 검색"
        />
      </div>
      <section>
        <div className="bg-ec-table-header rounded-tl-ec-10 rounded-tr-ec-10 flex max-w-251 items-center justify-between px-8 py-4">
          <GroupTableHeader />
        </div>
        {/* <TableEmptyState label="등록된 사용자가 없어요." /> */}
        <GroupTableRow users={mockGroups} />
      </section>
    </div>
  );
}

export default UserSessionGroupPage;
