import TitleSection from "@/shared/components/TitleSection";
import { useCallback, useMemo, useState } from "react";
import SessionInfoOverview from "../components/dashboard/SessionInfoOverview";
import type { SessionDashboardData } from "../components/dashboard/SessionInfoOverview";
import SerachBar from "@/shared/components/SerachBar";
import Button from "@/shared/components/Button";
import SelectBox from "@/shared/components/SelectBox";
import { useMediaQuery } from "react-responsive";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import {
  ADMIN_DASHBOARD_PART_DEFAULT,
  SESSION_PART_OPTIONS,
} from "@/shared/constants/selectOptions";
import SelectedUser from "../components/dashboard/SelectedUser";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardTableRows from "../components/dashboard/DashboardTableRows";
import type {
  AdminDashboardMemberRow,
  PagedResponse,
  SelectedUserChip,
} from "../types";

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

const mockSessionMembers: PagedResponse<AdminDashboardMemberRow> = {
  content: [
    {
      id: 1,
      generation: 14,
      name: "황형진",
      part: "프론트엔드",
      email: "testtest1@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 2,
      generation: 14,
      name: "황형진",
      part: "백엔드",
      email: "testtest2@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 3,
      generation: 14,
      name: "황형진",
      part: "프론트엔드",
      email: "testtest3@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 4,
      generation: 14,
      name: "황형진",
      part: "백엔드",
      email: "testtest4@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 5,
      generation: 14,
      name: "황형진",
      part: "프론트엔드",
      email: "testtest5@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 6,
      generation: 14,
      name: "황형진",
      part: "백엔드",
      email: "testtest6@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 7,
      generation: 14,
      name: "황형진",
      part: "프론트엔드",
      email: "testtest7@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 8,
      generation: 14,
      name: "황형진",
      part: "백엔드",
      email: "testtest8@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 9,
      generation: 14,
      name: "황형진",
      part: "프론트엔드",
      email: "testtest9@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 10,
      generation: 14,
      name: "황형진",
      part: "백엔드",
      email: "testtest10@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 11,
      generation: 14,
      name: "황형진",
      part: "프론트엔드",
      email: "testtest11@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 12,
      generation: 14,
      name: "황형진",
      part: "백엔드",
      email: "testtest12@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 13,
      generation: 14,
      name: "황형진",
      part: "프론트엔드",
      email: "testtest13@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
    {
      id: 14,
      generation: 14,
      name: "황형진",
      part: "백엔드",
      email: "testtest14@testtt.com",
      addedAt: "2026년 2월 13일 오후 8시 20분",
      inviter: "한종민",
    },
  ],
  totalElements: 14,
};

const mockSelectedUsers: SelectedUserChip[] = [
  { id: 1, label: "황형진", type: "user" },
  { id: 2, label: "황진형", type: "user" },
  { id: 3, label: "진항형", type: "user" },
  { id: 4, label: "형향진", type: "user" },
  { id: 5, label: "프론트엔드", type: "part" },
];

function AdminDashboardPage() {
  const itemSumNum = 8;
  const isLoading = false;
  const isTablet = useMediaQuery({ maxWidth: 1023 });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedPart, setSelectedPart] = useState(
    ADMIN_DASHBOARD_PART_DEFAULT,
  );
  const [members, setMembers] = useState<AdminDashboardMemberRow[]>(
    mockSessionMembers.content,
  );
  const [selectedUsers, setSelectedUsers] =
    useState<SelectedUserChip[]>(mockSelectedUsers);

  const filteredMembers = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return members.filter((member) => {
      const matchesPart =
        selectedPart === ADMIN_DASHBOARD_PART_DEFAULT ||
        selectedPart === "전체" ||
        member.part === selectedPart;

      const matchesKeyword =
        !keyword ||
        member.name.toLowerCase().includes(keyword) ||
        member.email.toLowerCase().includes(keyword);

      return matchesPart && matchesKeyword;
    });
  }, [members, searchKeyword, selectedPart]);

  const handleRemoveSelectedUser = useCallback((id: number) => {
    setSelectedUsers((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const itemNum = filteredMembers.length;

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
      <TitleSection title="대시보드" />

      <SessionInfoOverview data={mockSessionDashboardData} />

      <section>
        <div className="text-title text-ec-black">이 세션에 등록된 사용자</div>
        <div className="mt-2 flex gap-5">
          <div className="w-110">
            <SerachBar
              placeholder="추가하려는 사용자 이름 입력"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <SelectBox
            options={SESSION_PART_OPTIONS}
            defaultValue={ADMIN_DASHBOARD_PART_DEFAULT}
            onChange={setSelectedPart}
          />
          <Button
            size="large"
            variant="primary"
            onClick={() =>
              setMembers((prev) => ({
                ...prev,
                id: 9,
                label: "황형진",
                type: "user",
              }))
            }
          >
            사용자 등록
          </Button>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <span className="text-caption text-ec-sub">
            추가될 사용자(클릭하여 삭제)
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {selectedUsers.map((item) => (
              <SelectedUser
                key={item.id}
                item={item}
                onRemove={handleRemoveSelectedUser}
              />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
            {({ currentItems, startIndex }) => {
              const pagedMembers = filteredMembers.slice(
                startIndex,
                startIndex + currentItems.length,
              );

              return (
                <>
                  {!isTablet && (
                    <PageNationMenu>
                      <DashboardHeader />
                    </PageNationMenu>
                  )}

                  {pagedMembers.length === 0 && !isLoading ? (
                    <TableEmptyState label="등록된 사용자가 없어요." />
                  ) : (
                    <DashboardTableRows
                      isLoading={isLoading}
                      members={pagedMembers}
                    />
                  )}

                  <PageNationButton />
                </>
              );
            }}
          </PageNationFrame>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
