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
import {
  addWhiteList,
  getUsers,
  getWHiteList,
  terminateUser,
} from "../apis/group";
import type { AdminGroupRow, PagedResponse } from "../types";
import Modal from "@/shared/components/modal/Modal";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import WhitelistItem from "../components/modal/group/WhitelistItem";
import type { whitelistState } from "../types/whitelist";

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

export interface ListState {
  id: number;
  email: string;
  part: string;
  generation: number;
  registerName: string;
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

const WHITELIST_PART_OPTIONS = ["파트 선택", ...SESSION_PART_OPTIONS.slice(1)];
const WHITELIST_GENERATION_OPTIONS = [
  "기수 선택",
  "11기",
  "12기",
  "13기",
  "14기",
];

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
  const [selectedActionUid, setSelectedActionUid] = useState<number | null>(
    null,
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [addList, setAddList] = useState<whitelistState>({
    email: "",
    part: "",
    generation: "",
  });
  const [lists, setLists] = useState<ListState[]>([]);
  const isTablet = useMediaQuery({ maxWidth: 1023 });
  const itemNum = membersPage.totalElements;
  const itemSumNum = GROUP_PAGE_SIZE;

  // 모달 비활성화
  const handleClose = useCallback(() => {
    setModalState(null);
    setSelectedActionUid(null);
  }, []);

  // 모달 활성화
  const handleOpenModal = useCallback(
    (action: GroupActionType, uid?: number) => {
      setModalState({ action, phase: "CONFIRM" });
      setSelectedActionUid(uid ?? null);
    },
    [],
  );

  const handleConfirm = async () => {
    if (!modalState) return;

    if (
      (modalState.action === "USER_SUSPEND" ||
        modalState.action === "USER_REACTIVE") &&
      selectedActionUid !== null
    ) {
      try {
        await terminateUser({ uid: selectedActionUid });
        handleRefresh();
      } catch (error) {
        setErrors(getCommonErrorState(error));
        return;
      }
    }

    if (modalState.action === "WHITELIST_ADD") {
      const isAdded = await handleAddList();

      if (!isAdded) return;
      handleRefresh();
    }

    setModalState((prev) => (prev ? { ...prev, phase: "DONE" } : prev));
  };

  // 새로고침
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

  const handleWhitelistPartChange = (partLabel: string) => {
    const selectedIndex = WHITELIST_PART_OPTIONS.indexOf(partLabel);
    const selectedPartCode =
      selectedIndex <= 0 ? "" : (PART_REQUEST_CODES[selectedIndex] ?? "");

    setAddList((prev) => ({
      ...prev,
      part: selectedPartCode,
    }));
  };

  const handleWhitelistGenerationChange = (generationLabel: string) => {
    const generation = generationLabel.match(/\d+/)?.[0] ?? "";

    setAddList((prev) => ({
      ...prev,
      generation,
    }));
  };

  // 화이트리스트 조회
  const fetchWhitelist = useCallback(async () => {
    try {
      const res = await getWHiteList();
      const responseData = res.data?.data ?? res.data;

      setTotalElements(responseData.length);
      setLists(responseData);
    } catch (error) {
      setErrors(getCommonErrorState(error));
    }
  }, []);

  const handleOpenWhitelist = () => {
    setListModalOpen(true);
  };

  const handleAddList = async (): Promise<boolean> => {
    if (!addList.email.trim() || !addList.part || !addList.generation) {
      return false;
    }

    try {
      await addWhiteList(addList);
      setAddList({
        email: "",
        part: "",
        generation: "",
      });
      return true;
    } catch (error) {
      setErrors(getCommonErrorState(error));
      return false;
    }
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

  useEffect(() => {
    if (!listModalOpen) return;

    fetchWhitelist();
  }, [listModalOpen, refreshKey, fetchWhitelist]);

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
      {listModalOpen && (
        <Modal>
          <Modal.Header onClick={() => setListModalOpen(false)}>
            화이트리스트({totalElements})
          </Modal.Header>
          <div className="mt-5">
            <div className="flex h-10 gap-2">
              <div className="w-131.5">
                <Input
                  placeholder="이메일 주소를 입력하세요"
                  value={addList.email}
                  onChange={(e) =>
                    setAddList((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <Button
                size="large"
                variant="primary"
                onClick={() => handleOpenModal("WHITELIST_ADD")}
              >
                추가
              </Button>
            </div>
            <div className="mt-2 flex gap-2">
              <div className="flex-1">
                <SelectBox
                  options={WHITELIST_PART_OPTIONS}
                  defaultValue="파트 선택"
                  onChange={handleWhitelistPartChange}
                  className="w-full"
                />
              </div>
              <div className="w-1/3">
                <SelectBox
                  options={WHITELIST_GENERATION_OPTIONS}
                  defaultValue="기수 선택"
                  onChange={handleWhitelistGenerationChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="mt-7">
            <span className="text-body-2 text-ec-black">추가 된 사용자</span>
            <div className="grid grid-cols-2 gap-4">
              {lists.map((list) => (
                <WhitelistItem
                  item={list}
                  key={list.id}
                  onDeleted={handleRefresh}
                />
              ))}
            </div>
          </div>
        </Modal>
      )}

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
            onClick: () => handleOpenWhitelist(),
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
