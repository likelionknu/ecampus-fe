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
import SessionActivateButton from "../components/dashboard/SessionActivateButton";
import SessionDeactivateButton from "../components/dashboard/SessionDeactivateButton";
import type {
  AdminDashboardMemberRow,
  SelectedUserChip,
} from "../types/dashboard";
import {
  editSessionInfo,
  getSessionInfo,
  getSessionMember,
} from "../api/dashboard";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";
import ErrorModal from "@/shared/components/modal/ErrorModal";
import Modal from "@/shared/components/modal/Modal";
import Input from "@/shared/components/Input";

interface SessionMembersPageState {
  content: AdminDashboardMemberRow[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

interface SessionEditState {
  name: string;
  useable: boolean;
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
  // 상단 데이터 상태
  const [sessionInfo, setSessionInfo] = useState<SessionDashboardData>(
    INITIAL_SESSION_DASHBOARD_STATE,
  );
  // 사용자 데이터 상태
  const [membersPage, setMembersPage] = useState<SessionMembersPageState>(
    INITIAL_SESSION_MEMBERS_PAGE_STATE,
  );
  const itemSumNum = membersPage.size;
  const [refreshKey, setRefreshKey] = useState(0);
  const [errors, setErrors] = useState<CommonErrorState | null>(null); // 에러 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [editModal, setEditModal] = useState(false); // 정보 수정 모달 상태
  const isTablet = useMediaQuery({ maxWidth: 1023 });
  const [sessionEdit, setSessionEdit] = useState<SessionEditState>({
    name: "",
    useable: false,
  }); // 세션 정보 데이터 상태
  const [searchKeyword, setSearchKeyword] = useState(""); // 사용자 입력 상태
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

  const handleToggle = () => {
    setSessionEdit((prev) => ({ ...prev, useable: !prev.useable }));
  };

  // 세션 정보 수정
  const handleEdit = async () => {
    try {
      await editSessionInfo({
        sid: Number(sessionId),
        name: sessionEdit.name,
        useable: sessionEdit.useable,
      });
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      setErrors(getCommonErrorState(error));
    } finally {
      setEditModal(false);
    }
  };

  // 세션 정보/사용자 조회
  useEffect(() => {
    const fetchInfo = async () => {
      setIsLoading(true);
      try {
        const res = await getSessionInfo({ sid: Number(sessionId) });
        const name = res.data.data.name;
        const useable = res.data.data.status === "활성화" ? true : false;

        setSessionInfo(res.data.data);
        setSessionEdit((prev) => ({ ...prev, name: name, useable: useable }));
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
  }, [sessionId, refreshKey]);

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

      {/* 세션 정보 수정 모달 */}
      {editModal && (
        <Modal>
          <Modal.Header onClick={() => setEditModal(false)}>
            정보 수정하기
          </Modal.Header>
          <div className="flex w-153 flex-col gap-2">
            <Modal.Description>세션명</Modal.Description>
            <Input
              value={sessionEdit.name}
              onChange={(e) =>
                setSessionEdit((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <Modal.Description>상태 설정</Modal.Description>
          <div className="mt-2 flex w-153 gap-2.5">
            <SessionActivateButton
              selected={sessionEdit.useable}
              onClick={handleToggle}
            />
            <SessionDeactivateButton
              selected={!sessionEdit.useable}
              onClick={handleToggle}
            />
          </div>

          <div className="flex justify-end">
            <Modal.ButtonLayout>
              <Button size="large" variant="primary" onClick={handleEdit}>
                수정
              </Button>
            </Modal.ButtonLayout>
          </div>
        </Modal>
      )}

      <TitleSection title="대시보드" />

      <SessionInfoOverview
        data={sessionInfo}
        onClick={() => setEditModal(true)}
      />

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
