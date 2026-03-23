import TitleSection from "@/shared/components/TitleSection";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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
import type { AdminDashboardMemberRow, SelectedUserChip } from "../types";
import { getSessionInfo, getSessionMember } from "../api/dashboard";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";
import ErrorModal from "@/shared/components/modal/ErrorModal";

interface SessionMembersPageState {
  content: AdminDashboardMemberRow[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

const INITIAL_SESSION_DASHBOARD_STATE: SessionDashboardData = {
  sessionId: 0,
  name: "",
  createdAt: "",
  createdBy: "",
  userCount: 0,
  fileCount: 0,
  assignmentCount: 0,
  questionCount: 0,
  status: "",
};

const INITIAL_SESSION_MEMBERS_PAGE_STATE: SessionMembersPageState = {
  content: [],
  page: 0,
  size: 8,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
};

const mockSelectedUsers: SelectedUserChip[] = [
  { id: 1, label: "황형진", type: "user" },
  { id: 2, label: "황진형", type: "user" },
  { id: 3, label: "진항형", type: "user" },
  { id: 4, label: "형향진", type: "user" },
  { id: 5, label: "프론트엔드", type: "part" },
];

function AdminDashboardPage() {
  const { sessionId } = useParams();
  const [sessionInfo, setSessionInfo] = useState<SessionDashboardData>(
    INITIAL_SESSION_DASHBOARD_STATE,
  );
  const [membersPage, setMembersPage] = useState<SessionMembersPageState>(
    INITIAL_SESSION_MEMBERS_PAGE_STATE,
  );
  const itemSumNum = membersPage.size;
  const [errors, setErrors] = useState<CommonErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 1023 });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedPart, setSelectedPart] = useState(
    ADMIN_DASHBOARD_PART_DEFAULT,
  );

  const [selectedUsers, setSelectedUsers] =
    useState<SelectedUserChip[]>(mockSelectedUsers);

  const filteredMembers = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return membersPage.content.filter((member) => {
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
  }, [membersPage.content, searchKeyword, selectedPart]);

  const handleRemoveSelectedUser = useCallback((id: number) => {
    setSelectedUsers((prev) => prev.filter((item) => item.id !== id));
  }, []);

  useEffect(() => {
    const fetchInfo = async () => {
      setIsLoading(true);
      try {
        const res = await getSessionInfo({ sid: Number(sessionId) });

        setSessionInfo(res.data.data);
      } catch (error) {
        setErrors(getCommonErrorState(error));
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMember = async () => {
      setIsLoading(true);
      try {
        const res = await getSessionMember({ sid: Number(sessionId) });
        const responseData = res.data?.data ?? res.data;

        setMembersPage(responseData);
      } catch (error) {
        setErrors(getCommonErrorState(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfo();
    fetchMember();
  }, [sessionId]);

  const itemNum = filteredMembers.length;

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}

      <TitleSection title="대시보드" />

      <SessionInfoOverview data={sessionInfo} />

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
          <Button size="large" variant="primary" onClick={() => null}>
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
