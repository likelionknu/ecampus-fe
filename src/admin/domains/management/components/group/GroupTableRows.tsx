import { useState } from "react";
import SkeletonCell from "@/shared/components/skeleton/SkeletonCell";
import GroupActionStepModal, {
  type GroupActionType,
} from "../modal/GroupActionStepModal";
import GroupIcon from "./GroupIcon";
import type { AdminGroupRow } from "../../types";
import {
  addMemo,
  changePart,
  changeGeneration,
  deleteAllMemos,
  deleteMemo,
  getMemos,
} from "../../apis/group";
import { SESSION_PART_OPTIONS } from "@/shared/constants/selectOptions";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";
import ErrorModal from "@/shared/components/modal/ErrorModal";
import MemoModal from "../modal/group/MemoModal";
import GenerationModal from "../modal/group/GenerationModal";
import PartModal from "../modal/group/PartModal";
import type {
  GroupMemo,
  MemoModalTarget,
} from "../modal/group/memoModal.types";
import useActionStepModal from "./useActionStepModal";

interface GroupTableRowsProps {
  isLoading: boolean;
  members: AdminGroupRow[];
  onOpenModal: (action: GroupActionType) => void;
  onRefresh: () => void;
}

interface GroupMemoApiRow {
  id: number;
  content: string;
  createdAt: string;
  grantedUser?: {
    name?: string;
  };
}

interface SelectOption<TValue extends string> {
  label: string;
  value: TValue;
}

interface SelectedMemberTarget extends MemoModalTarget {
  part: string;
}

const GROUP_TABLE_COLUMNS =
  "grid-cols-[0.55fr_0.85fr_0.9fr_2.2fr_2.2fr_0.7fr_3.6fr]";
const MEMO_MAX_LENGTH = 170;

type GenerationValue = "11" | "12" | "13" | "14";

type PartCode = "OPERATOR" | "PLANNING" | "BACKEND" | "FRONTEND" | "DESIGN";

const GENERATION_OPTIONS: ReadonlyArray<SelectOption<GenerationValue>> = [
  { label: "11기", value: "11" },
  { label: "12기", value: "12" },
  { label: "13기", value: "13" },
  { label: "14기", value: "14" },
];
const GENERATION_OPTION_LABELS = GENERATION_OPTIONS.map(
  (option) => option.label,
);
const GENERATION_VALUE_BY_LABEL = new Map<string, GenerationValue>(
  GENERATION_OPTIONS.map((option) => [option.label, option.value]),
);

const PART_OPTIONS: ReadonlyArray<SelectOption<PartCode>> = [
  {
    label: SESSION_PART_OPTIONS[1] ?? "운영진",
    value: "OPERATOR",
  },
  {
    label: SESSION_PART_OPTIONS[2] ?? "기획",
    value: "PLANNING",
  },
  {
    label: SESSION_PART_OPTIONS[3] ?? "백엔드",
    value: "BACKEND",
  },
  {
    label: SESSION_PART_OPTIONS[4] ?? "프론트엔드",
    value: "FRONTEND",
  },
  {
    label: SESSION_PART_OPTIONS[5] ?? "디자인",
    value: "DESIGN",
  },
];
const PART_OPTION_LABELS = PART_OPTIONS.map((option) => option.label);
const PART_VALUE_BY_LABEL = new Map<string, PartCode>(
  PART_OPTIONS.map((option) => [option.label, option.value]),
);
const PART_LABEL_BY_VALUE = new Map<PartCode, string>(
  PART_OPTIONS.map((option) => [option.value, option.label]),
);

type MemoActionType = Extract<
  GroupActionType,
  "USER_MEMO_ADD" | "USER_MEMO_DELETE" | "USER_MEMO_RESET"
>;

type MemoActionPayload =
  | { type: "USER_MEMO_ADD"; content: string }
  | { type: "USER_MEMO_DELETE"; mid: number }
  | { type: "USER_MEMO_RESET" };

const truncateKoreanName = (name: string) => {
  const chars = [...name];
  const isKoreanOnly = /^[가-힣]+$/.test(name);

  if (!isKoreanOnly || chars.length <= 3) {
    return name;
  }

  return `${chars.slice(0, 3).join("")}...`;
};

function GroupTableRows({
  isLoading,
  members,
  onOpenModal,
  onRefresh,
}: GroupTableRowsProps) {
  const [errors, setErrors] = useState<CommonErrorState | null>(null);
  const [selectedMember, setSelectedMember] =
    useState<SelectedMemberTarget | null>(null);

  const [memoModalStep, setMemoModalStep] = useState<"LIST" | "ADD">("LIST");
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [memos, setMemos] = useState<GroupMemo[]>([]);
  const [memoInput, setMemoInput] = useState("");
  const [isMemoLoading, setIsMemoLoading] = useState(false);
  const memoActionModal = useActionStepModal<MemoActionType>();
  const [memoActionPayload, setMemoActionPayload] =
    useState<MemoActionPayload | null>(null);

  const [isGenerationModalOpen, setIsGenerationModalOpen] = useState(false);
  const [selectedGeneration, setSelectedGeneration] = useState<
    GenerationValue | ""
  >("");
  const generationActionModal = useActionStepModal<"USER_GENERATION_CHANGE">();

  const [isPartModalOpen, setIsPartModalOpen] = useState(false);
  const [selectedPartCode, setSelectedPartCode] = useState<PartCode | null>(
    null,
  );
  const partActionModal = useActionStepModal<"USER_PART_CHANGE">();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMemos = async (uid: number) => {
    setIsMemoLoading(true);

    try {
      const res = await getMemos({ uid });
      const responseData: GroupMemoApiRow[] = Array.isArray(res.data?.data)
        ? res.data.data
        : [];
      const mappedMemos: GroupMemo[] = responseData.map((memo) => ({
        id: memo.id,
        content: memo.content,
        createdAt: memo.createdAt,
        name: memo.grantedUser?.name ?? "",
      }));

      setMemos(mappedMemos);
    } catch (error) {
      setErrors(getCommonErrorState(error));
    } finally {
      setIsMemoLoading(false);
    }
  };

  const handleCloseMemoActionModal = () => {
    memoActionModal.close();
    setMemoActionPayload(null);
  };

  const handleCloseMemoModal = () => {
    handleCloseMemoActionModal();
    setIsMemoModalOpen(false);
    setSelectedMember(null);
    setMemoModalStep("LIST");
    setMemoInput("");
    setMemos([]);
  };

  const openMemoActionModal = (
    action: MemoActionType,
    payload: MemoActionPayload,
  ) => {
    setMemoActionPayload(payload);
    memoActionModal.openConfirm(action);
  };

  const executeMemoAction = async (payload: MemoActionPayload) => {
    if (!selectedMember) return;

    switch (payload.type) {
      case "USER_MEMO_ADD":
        await addMemo({ uid: selectedMember.uid, content: payload.content });
        setMemoInput("");
        setMemoModalStep("LIST");
        await fetchMemos(selectedMember.uid);
        break;
      case "USER_MEMO_DELETE":
        await deleteMemo({ uid: selectedMember.uid, mid: payload.mid });
        setMemos((prev) => prev.filter((memo) => memo.id !== payload.mid));
        break;
      case "USER_MEMO_RESET":
        await deleteAllMemos({ uid: selectedMember.uid });
        setMemos([]);
        break;
      default:
        break;
    }
  };

  const handleConfirmMemoAction = async () => {
    if (
      !selectedMember ||
      !memoActionPayload ||
      memoActionModal.state?.phase !== "CONFIRM" ||
      isSubmitting
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      await executeMemoAction(memoActionPayload);
      memoActionModal.openDone(memoActionPayload.type);
    } catch (error) {
      setErrors(getCommonErrorState(error));
      handleCloseMemoActionModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMemo = (mid: number) => {
    if (!selectedMember || isSubmitting) return;

    openMemoActionModal("USER_MEMO_DELETE", {
      type: "USER_MEMO_DELETE",
      mid,
    });
  };

  const handleDeleteAllMemos = () => {
    if (!selectedMember || isSubmitting) return;

    openMemoActionModal("USER_MEMO_RESET", {
      type: "USER_MEMO_RESET",
    });
  };

  const handleOpenAddModal = () => {
    setMemoInput("");
    setMemoModalStep("ADD");
  };

  const handleAddMemo = () => {
    if (!selectedMember || isSubmitting) return;

    const content = memoInput.trim();

    if (content.length === 0 || content.length > MEMO_MAX_LENGTH) return;

    openMemoActionModal("USER_MEMO_ADD", {
      type: "USER_MEMO_ADD",
      content,
    });
  };

  const handleOpenMemoModal = async (member: AdminGroupRow) => {
    setSelectedMember({
      uid: member.id,
      name: member.name,
      generation: member.generation,
      part: member.part,
    });
    memoActionModal.close();
    setMemoModalStep("LIST");
    setIsMemoModalOpen(true);
    setIsGenerationModalOpen(false);
    setIsPartModalOpen(false);
    setMemoInput("");
    setSelectedGeneration("");
    setSelectedPartCode(null);
    await fetchMemos(member.id);
  };

  const handleOpenGenerationModal = (member: AdminGroupRow) => {
    setSelectedMember({
      uid: member.id,
      name: member.name,
      generation: member.generation,
      part: member.part,
    });
    generationActionModal.close();
    setSelectedGeneration("");
    setIsMemoModalOpen(false);
    setIsPartModalOpen(false);
    setIsGenerationModalOpen(true);
  };

  const handleCloseGenerationModal = () => {
    generationActionModal.close();
    setIsGenerationModalOpen(false);
    setSelectedMember(null);
    setSelectedGeneration("");
  };

  const handleOpenGenerationActionModal = () => {
    if (!selectedMember || selectedGeneration.length === 0 || isSubmitting) {
      return;
    }

    generationActionModal.openConfirm("USER_GENERATION_CHANGE");
  };

  const handleConfirmGenerationAction = async () => {
    if (
      !selectedMember ||
      generationActionModal.state?.phase !== "CONFIRM" ||
      selectedGeneration.length === 0 ||
      isSubmitting
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      await changeGeneration({
        uid: selectedMember.uid,
        generation: selectedGeneration,
      });
      onRefresh();
      generationActionModal.openDone("USER_GENERATION_CHANGE");
      setSelectedMember((prev) =>
        prev ? { ...prev, generation: Number(selectedGeneration) } : prev,
      );
    } catch (error) {
      setErrors(getCommonErrorState(error));
      generationActionModal.close();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseGenerationActionModal = () => {
    if (generationActionModal.state?.phase === "DONE") {
      handleCloseGenerationModal();
      return;
    }

    generationActionModal.close();
  };

  const handleOpenPartModal = (member: AdminGroupRow) => {
    setSelectedMember({
      uid: member.id,
      name: member.name,
      generation: member.generation,
      part: member.part,
    });
    partActionModal.close();
    setSelectedPartCode(null);
    setIsMemoModalOpen(false);
    setIsGenerationModalOpen(false);
    setIsPartModalOpen(true);
  };

  const handleClosePartModal = () => {
    partActionModal.close();
    setIsPartModalOpen(false);
    setSelectedMember(null);
    setSelectedPartCode(null);
  };

  const handleSelectPart = (value: string) => {
    setSelectedPartCode(PART_VALUE_BY_LABEL.get(value) ?? null);
  };

  const handleOpenPartActionModal = () => {
    if (!selectedMember || !selectedPartCode || isSubmitting) {
      return;
    }

    partActionModal.openConfirm("USER_PART_CHANGE");
  };

  const handleConfirmPartAction = async () => {
    if (
      !selectedMember ||
      partActionModal.state?.phase !== "CONFIRM" ||
      !selectedPartCode ||
      isSubmitting
    ) {
      return;
    }

    const nextPartCode = selectedPartCode;
    setIsSubmitting(true);
    try {
      await changePart({
        uid: selectedMember.uid,
        part: nextPartCode,
      });
      onRefresh();
      partActionModal.openDone("USER_PART_CHANGE");
      const nextPartLabel = PART_LABEL_BY_VALUE.get(nextPartCode);
      setSelectedMember((prev) => {
        if (!prev) return prev;

        return nextPartLabel ? { ...prev, part: nextPartLabel } : prev;
      });
    } catch (error) {
      setErrors(getCommonErrorState(error));
      partActionModal.close();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClosePartActionModal = () => {
    if (partActionModal.state?.phase === "DONE") {
      handleClosePartModal();
      return;
    }

    partActionModal.close();
  };

  return (
    <div className="rounded-ec-10 w-full overflow-hidden">
      {isMemoModalOpen && selectedMember && (
        <MemoModal
          target={selectedMember}
          step={memoModalStep}
          memos={memos}
          value={memoInput}
          maxLength={MEMO_MAX_LENGTH}
          isLoading={isMemoLoading}
          isSubmitting={isSubmitting}
          onClose={handleCloseMemoModal}
          onOpenAdd={handleOpenAddModal}
          onDeleteMemo={handleDeleteMemo}
          onDeleteAllMemos={handleDeleteAllMemos}
          onBack={() => setMemoModalStep("LIST")}
          onChange={setMemoInput}
          onSubmit={handleAddMemo}
        />
      )}

      {isGenerationModalOpen && selectedMember && (
        <GenerationModal
          currentGeneration={selectedMember.generation}
          options={GENERATION_OPTION_LABELS}
          selectedGeneration={selectedGeneration}
          isSubmitting={isSubmitting}
          onClose={handleCloseGenerationModal}
          onSelectGeneration={(value) => {
            setSelectedGeneration(GENERATION_VALUE_BY_LABEL.get(value) ?? "");
          }}
          onSubmit={handleOpenGenerationActionModal}
        />
      )}

      {isPartModalOpen && selectedMember && (
        <PartModal
          currentPart={selectedMember.part}
          options={PART_OPTION_LABELS}
          selectedPartCode={selectedPartCode ?? ""}
          isSubmitting={isSubmitting}
          onClose={handleClosePartModal}
          onSelectPart={handleSelectPart}
          onSubmit={handleOpenPartActionModal}
        />
      )}

      {partActionModal.state && (
        <GroupActionStepModal
          modalState={partActionModal.state}
          onClose={handleClosePartActionModal}
          onNext={handleConfirmPartAction}
        />
      )}

      {generationActionModal.state && (
        <GroupActionStepModal
          modalState={generationActionModal.state}
          onClose={handleCloseGenerationActionModal}
          onNext={handleConfirmGenerationAction}
        />
      )}

      {memoActionModal.state && (
        <GroupActionStepModal
          modalState={memoActionModal.state}
          onClose={handleCloseMemoActionModal}
          onNext={handleConfirmMemoAction}
        />
      )}

      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}

      {isLoading && (
        <div
          className={`grid w-full animate-pulse items-center gap-3 px-6 py-5 ${GROUP_TABLE_COLUMNS}`}
        >
          <SkeletonCell className="h-4 w-8" />
          <SkeletonCell className="h-4 w-16" />
          <SkeletonCell className="h-4 w-12" />
          <SkeletonCell className="h-4 w-46" />
          <SkeletonCell className="h-4 w-46" />
          <SkeletonCell className="h-4 w-8 justify-self-center" />
          <SkeletonCell className="h-4 w-full" />
        </div>
      )}

      {members.map((member, index) => (
        <div
          key={`${member.id}-${member.email}`}
          className={`text-body-2 grid w-full items-center gap-3 px-6 py-5 ${GROUP_TABLE_COLUMNS} ${
            index % 2 === 1 ? "bg-ec-box" : "bg-ec-white"
          }`}
        >
          <span className="min-w-0">{member.generation}기</span>
          <span className="min-w-0 truncate" title={member.part}>
            {member.part}
          </span>
          <span className="min-w-0 truncate" title={member.name}>
            {truncateKoreanName(member.name)}
          </span>
          <span
            className="block max-w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
            title={member.email}
          >
            {member.email}
          </span>
          <span className="min-w-0 truncate">{member.joinedAt}</span>
          <span className="min-w-0 text-center">{member.penaltyPoint}점</span>
          <div className="flex w-full min-w-0 flex-nowrap items-center justify-center gap-3">
            <GroupIcon
              label="메모"
              type="memo"
              onClick={() => handleOpenMemoModal(member)}
            />
            <GroupIcon
              label="파트 변경"
              type="change"
              onClick={() => handleOpenPartModal(member)}
            />
            <GroupIcon
              label="기수 변경"
              type="change"
              onClick={() => handleOpenGenerationModal(member)}
            />
            <GroupIcon
              label="벌점"
              type="demerit"
              onClick={() => onOpenModal("USER_DEMERIT_ASSIGN")}
            />
            {member.useable ? (
              <GroupIcon
                label="정지"
                type="stop"
                onClick={() => onOpenModal("USER_SUSPEND")}
              />
            ) : (
              <GroupIcon
                label="복구"
                type="restore"
                onClick={() => onOpenModal("USER_REACTIVE")}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupTableRows;
