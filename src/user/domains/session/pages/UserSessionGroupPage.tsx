import { useState } from "react";
import TitleSection from "@/shared/components/TitleSection";
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
    name: "源吏꾩쁺",
    part: "BACKEND",
    email: "kim@test.com",
  },
  {
    course: 2,
    name: "諛뺢?泥?,
    part: "BACKEND",
    email: "park@test.com",
  },
  {
    course: 3,
    name: "源吏꾩쁺",
    part: "BACKEND",
    email: "kim@test.com",
  },
  {
    course: 4,
    name: "諛뺢?泥?,
    part: "BACKEND",
    email: "park@test.com",
  },
];
const PART_MAP: Record<string, string> = {
  BACKEND: "諛깆뿏??,
  FRONTEND: "?꾨줎?몄뿏??,
  DESIGN: "?붿옄??,
  PLANNING: "湲고쉷",
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
      <TitleSection
        title="?ъ슜??諛?洹몃９"
        subText="???몄뀡??異붽????ъ슜?먮? ?뺤씤?섏꽭??
      />

      <div className="w-full lg:w-107.5">
        <SerachBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="?ъ슜???대쫫?쇰줈 寃??
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
                <TableEmptyState label="?깅줉???ъ슜?먭? ?놁뼱??" />
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
                      <GroupInfo label="湲곗닔" value="14湲? />
                      <GroupInfo
                        label="?뚰듃"
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

