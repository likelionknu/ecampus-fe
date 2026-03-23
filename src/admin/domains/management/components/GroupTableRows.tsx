import { useState } from "react";
import SkeletonCell from "@/shared/components/skeleton/SkeletonCell";
import type { GroupActionType } from "./modal/GroupActionStepModal";
import GroupIcon from "./GroupIcon";
import type { AdminGroupRow } from "../types";
import {
  addMemo,
  deleteAllMemos,
  deleteMemo as deleteMemoApi,
  getMemos,
} from "../apis/group";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";
import ErrorModal from "@/shared/components/modal/ErrorModal";
import MemoListModal from "./modal/group/MemoListModal";
import MemoAddModal from "./modal/group/MemoAddModal";
import type { GroupMemo, MemoModalTarget } from "./modal/group/memoModal.types";

interface GroupTableRowsProps {
  isLoading: boolean;
  members: AdminGroupRow[];
  onOpenModal: (action: GroupActionType) => void;
}

interface GroupMemoApiRow {
  id: number;
  content: string;
  createdAt: string;
  grantedUser?: {
    name?: string;
  };
}

const GROUP_TABLE_COLUMNS =
  "grid-cols-[0.55fr_0.85fr_0.9fr_2.2fr_2.2fr_0.7fr_3.6fr]";
const MEMO_MAX_LENGTH = 170;

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
}: GroupTableRowsProps) {
  const [memoModalStep, setMemoModalStep] = useState<"LIST" | "ADD">("LIST");
  const [errors, setErrors] = useState<CommonErrorState | null>(null);
  const [memoModalTarget, setMemoModalTarget] =
    useState<MemoModalTarget | null>(null);
  const [memos, setMemos] = useState<GroupMemo[]>([]);
  const [memoInput, setMemoInput] = useState("");
  const [isMemoLoading, setIsMemoLoading] = useState(false);
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

  // 모달 비활성화
  const handleCloseMemoModal = () => {
    setMemoModalTarget(null);
    setMemoModalStep("LIST");
    setMemoInput("");
    setMemos([]);
  };

  // 특정 메모 삭제
  const handleDeleteMemo = async (mid: number) => {
    if (!memoModalTarget) return;

    setIsSubmitting(true);
    try {
      await deleteMemoApi({ uid: memoModalTarget.uid, mid });
      setMemos((prev) => prev.filter((memo) => memo.id !== mid));
    } catch (error) {
      setErrors(getCommonErrorState(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  // 메모 초기화
  const handleDeleteAllMemos = async () => {
    if (!memoModalTarget) return;

    setIsSubmitting(true);
    try {
      await deleteAllMemos({ uid: memoModalTarget.uid });
      setMemos([]);
    } catch (error) {
      setErrors(getCommonErrorState(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  // 메모 추가 단계 진입
  const handleOpenAddModal = () => {
    setMemoInput("");
    setMemoModalStep("ADD");
  };

  // 메모 추가
  const handleAddMemo = async () => {
    if (!memoModalTarget) return;

    const content = memoInput.trim();

    if (content.length === 0 || content.length > MEMO_MAX_LENGTH) return;

    setIsSubmitting(true);
    try {
      await addMemo({ uid: memoModalTarget.uid, content });
      setMemoInput("");
      setMemoModalStep("LIST");
      await fetchMemos(memoModalTarget.uid);
    } catch (error) {
      setErrors(getCommonErrorState(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  // 메모 모달 활성화
  const handleOpenMemoModal = async (member: AdminGroupRow) => {
    setMemoModalStep("LIST");
    setMemoModalTarget({ uid: member.id, name: member.name });
    setMemoInput("");
    await fetchMemos(member.id);
  };

  return (
    <div className="rounded-ec-10 w-full overflow-hidden">
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}

      {memoModalTarget && memoModalStep === "LIST" && (
        <MemoListModal
          target={memoModalTarget}
          memos={memos}
          isLoading={isMemoLoading}
          isSubmitting={isSubmitting}
          onClose={handleCloseMemoModal}
          onOpenAdd={handleOpenAddModal}
          onDeleteMemo={handleDeleteMemo}
          onDeleteAllMemos={handleDeleteAllMemos}
        />
      )}

      {memoModalTarget && memoModalStep === "ADD" && (
        <MemoAddModal
          value={memoInput}
          maxLength={MEMO_MAX_LENGTH}
          isSubmitting={isSubmitting}
          onClose={handleCloseMemoModal}
          onBack={() => setMemoModalStep("LIST")}
          onChange={setMemoInput}
          onSubmit={handleAddMemo}
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
              onClick={() => onOpenModal("USER_PART_CHANGE")}
            />
            <GroupIcon
              label="기수 변경"
              type="change"
              onClick={() => onOpenModal("USER_GENERATION_CHANGE")}
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
