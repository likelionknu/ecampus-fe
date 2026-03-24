import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SelectBox from "@/shared/components/SelectBox";
import SerachBar from "@/shared/components/SerachBar";
import TitleSection from "@/shared/components/TitleSection";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import {
  ADMIN_GROUP_PART_DEFAULT,
  SESSION_PART_OPTIONS,
} from "@/shared/constants/selectOptions";
import ErrorModal from "@/shared/components/modal/ErrorModal";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";
import { formatKoreanDateTime12 } from "@/shared/utils/formatKoreanDateTime";
import GroupHeader from "../components/group/GroupHeader";
import GroupTableRows from "../components/group/GroupTableRows";
import GroupActionStepModal, {
  type GroupActionModalState,
  type GroupActionType,
} from "../components/modal/GroupActionStepModal";
import { getUsers } from "../apis/group";
import type { AdminGroupRow, PagedResponse } from "../types";

interface GroupUsersApiRow {
  id: number;
  part: string;
  name: string;
  email: string;
  generation: number;
  createdAt: string;
  demerit: number;
  useable?: boolean;
}

interface GroupUsersApiResponse {
  content: GroupUsersApiRow[];
  totalElements: number;
}

export type ModalState = GroupActionModalState;

const GROUP_PAGE_SIZE = 8;
const PART_REQUEST_CODES = [
  "ALL",
  "OPERATOR",
  "PLANNING",
  "BACKEND",
  "FRONTEND",
  "DESIGN",
] as const;

const PART_CODE_TO_LABEL: Record<string, string> = {
  OPERATOR: "운영진",
  PLANNING: "기획",
  BACKEND: "백엔드",
  FRONTEND: "프론트엔드",
  DESIGN: "디자인",
};

const INITIAL_GROUP_MEMBERS: PagedResponse<AdminGroupRow> = {
  content: [],
  totalElements: 0,
};

function AdminGroupPage() {
  // 사용자 상태
  const [membersPage, setMembersPage] = useState<PagedResponse<AdminGroupRow>>(
    INITIAL_GROUP_MEMBERS,
  );
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [name, setName] = useState(""); // 이름 검색 상태
  const [debouncedName, setDebouncedName] = useState(name); // 지연 요청 상태
  const [selectedPartLabel, setSelectedPartLabel] = useState(
    ADMIN_GROUP_PART_DEFAULT,
  );
  // 파트 상태
  const [selectedPart, setSelectedPart] =
    useState<(typeof PART_REQUEST_CODES)[number]>("ALL");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [errors, setErrors] = useState<CommonErrorState | null>(null); // 에러 상태
  const [modalState, setModalState] = useState<ModalState>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const isTablet = useMediaQuery({ maxWidth: 1023 });
  const itemNum = membersPage.totalElements;
  const itemSumNum = GROUP_PAGE_SIZE;

  // 모달 비활성화
  const handleClose = useCallback(() => {
    setModalState(null);
  }, []);

  // 모달 활성화
  const handleOpenModal = useCallback((action: GroupActionType) => {
    setModalState({ action, phase: "CONFIRM" });
  }, []);

  const handleConfirm = () => {
    if (!modalState) return;

    setModalState((prev) => (prev ? { ...prev, phase: "DONE" } : prev));
  };

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  // 파트 변경
  const handlePartChange = (partLabel: string) => {
    setSelectedPartLabel(partLabel);

    const selectedIndex = SESSION_PART_OPTIONS.indexOf(partLabel);
    const requestPart = PART_REQUEST_CODES[selectedIndex] ?? "ALL";

    setSelectedPart(requestPart);
    setCurrentPage(1);
  };

  // 상태 지연 반영
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedName(name);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [name]);

  // 사용자 조회
  useEffect(() => {
    const fetchGroupUsers = async () => {
      setIsLoading(true);

      try {
        const res = await getUsers({
          name: debouncedName,
          part: selectedPart === "ALL" ? "" : selectedPart,
          page: currentPage - 1,
          size: GROUP_PAGE_SIZE,
        });
        const responseData: GroupUsersApiResponse = res.data?.data ?? {
          content: [],
          totalElements: 0,
        };

        const mappedMembers = Array.isArray(responseData.content)
          ? responseData.content.map((member) => ({
              id: member.id,
              generation: member.generation,
              part: PART_CODE_TO_LABEL[member.part] ?? member.part,
              name: member.name,
              email: member.email,
              joinedAt: member.createdAt
                ? formatKoreanDateTime12(member.createdAt)
                : "-",
              penaltyPoint: member.demerit ?? 0,
              useable: member.useable ?? true,
            }))
          : [];

        setMembersPage({
          content: mappedMembers,
          totalElements: responseData.totalElements ?? 0,
        });
      } catch (error) {
        setErrors(getCommonErrorState(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupUsers();
  }, [debouncedName, selectedPart, currentPage, refreshKey]);

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
      {modalState && (
        <GroupActionStepModal
          modalState={modalState}
          onClose={handleClose}
          onNext={handleConfirm}
        />
      )}

      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}

      <TitleSection
        title="사용자 및 그룹"
        actions={[
          {
            label: "화이트리스트",
            buttonType: "primary",
            onClick: () => {
              handleOpenModal("WHITELIST_ADD");
            },
          },
        ]}
      />

      <div className="flex flex-col gap-2 md:flex-row">
        <div className="xl:w-108">
          <SerachBar
            placeholder="사용자 이름으로 검색"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <SelectBox
          options={SESSION_PART_OPTIONS}
          defaultValue={selectedPartLabel}
          onChange={handlePartChange}
        />
      </div>

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {() => {
          const pagedMembers = membersPage.content;

          return (
            <>
              {!isTablet && (
                <PageNationMenu>
                  <GroupHeader />
                </PageNationMenu>
              )}

              {pagedMembers.length === 0 && !isLoading ? (
                <TableEmptyState label="해당하는 사용자를 찾을 수 없거나 존재하지 않아요" />
              ) : (
                <GroupTableRows
                  isLoading={isLoading}
                  members={pagedMembers}
                  onOpenModal={handleOpenModal}
                  onRefresh={handleRefresh}
                />
              )}
              <PageNationButton onPageChange={setCurrentPage} />
            </>
          );
        }}
      </PageNationFrame>
    </div>
  );
}

export default AdminGroupPage;
