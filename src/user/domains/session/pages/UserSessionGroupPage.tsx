import { useState } from "react";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
import GroupTableHeader from "../components/GroupTableHeader";
import SerachBar from "@/shared/components/SerachBar";
import GroupTableRow from "../components/GroupTableRow";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import { useMediaQuery } from "react-responsive";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import { GroupInfo } from "../components/application/GroupInfo";
import ListBoxMobile from "../components/application/ListBoxMobile";
interface MockQuestion {
  course: number;
  name: string;
  part: string;
  email: string;
}

const mockGroups: MockQuestion[] = [
  {
    course: 1,
    name: "김진영",
    part: "BACKEND",
    email: "kim@test.com",
  },
  {
    course: 2,
    name: "박김철",
    part: "BACKEND",
    email: "park@test.com",
  },
  {
    course: 3,
    name: "김진영",
    part: "BACKEND",
    email: "kim@test.com",
  },
  {
    course: 4,
    name: "박김철",
    part: "BACKEND",
    email: "park@test.com",
  },
];
const PART_MAP: Record<string, string> = {
  BACKEND: "백엔드",
  FRONTEND: "프론트엔드",
  DESIGN: "디자인",
  PLANNING: "기획",
};
function UserSessionGroupPage() {
  const [search, setSearch] = useState("");
  const itemNum = 5;
  const itemSumNum = mockGroups.length;
  const isLoading = true;
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection
        title="사용자 및 그룹"
        subText="이 세션에 추가된 사용자를 확인하세요"
      />

      <div className="w-full lg:w-107.5">
        <SerachBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="사용자 이름으로 검색"
        />
      </div>

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {({ currentItems, startIndex }) => {
          const pageGroups = mockGroups.slice(
            startIndex,
            startIndex + currentItems.length,
          );
          return (
            <>
              {!isTablet && (
                <PageNationMenu>
                  <GroupTableHeader />
                </PageNationMenu>
              )}

              {pageGroups.length === 0 && !isLoading ? (
                <TableEmptyState label="등록된 사용자가 없어요." />
              ) : !isTablet ? (
                <GroupTableRow isLoading={isLoading} users={pageGroups} />
              ) : (
                <div
                  className={`grid w-full gap-4 ${
                    isMobile ? "grid-cols-1" : "grid-cols-2"
                  }`}
                >
                  {pageGroups.map((group) => (
                    <ListBoxMobile
                      key={group.course}
                      title={group.name}
                      subText={group.email}
                    >
                      <GroupInfo label="기수" value="14기" />
                      <GroupInfo
                        label="파트"
                        value={PART_MAP[group.part] || group.part}
                      />
                    </ListBoxMobile>
                  ))}
                </div>
              )}
              <PageNationButton />
            </>
          );
        }}
      </PageNationFrame>
    </div>
  );
}

export default UserSessionGroupPage;
