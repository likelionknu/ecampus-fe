import SkeletonCell from "@/shared/components/skeleton/SkeletonCell";
import type { GroupActionType } from "./modal/GroupActionStepModal";
import GroupIcon from "./GroupIcon";
import type { AdminGroupRow } from "../types";

interface GroupTableRowsProps {
  isLoading: boolean;
  members: AdminGroupRow[];
  onOpenModal: (action: GroupActionType) => void;
}

const GROUP_TABLE_COLUMNS =
  "grid-cols-[0.55fr_0.85fr_0.9fr_2.2fr_2.2fr_0.7fr_3.6fr]";

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
  return (
    <div className="rounded-ec-10 w-full overflow-hidden">
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
            className="block min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
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
              onClick={() => onOpenModal("USER_MEMO_ADD")}
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
