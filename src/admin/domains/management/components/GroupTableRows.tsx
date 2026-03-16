import SkeletonCell from "@/shared/components/skeleton/SkeletonCell";
import type { GroupActionType } from "./modal/GroupActionStepModal";
import GroupIcon from "./GroupIcon";
import type { AdminGroupRow } from "../types";

interface GroupTableRowsProps {
  isLoading: boolean;
  members: AdminGroupRow[];
  onOpenModal: (action: GroupActionType) => void;
}

function GroupTableRows({
  isLoading,
  members,
  onOpenModal,
}: GroupTableRowsProps) {
  return (
    <div className="rounded-ec-10 flex w-full flex-col overflow-hidden">
      {isLoading && (
        <div className="flex animate-pulse items-center px-5 py-5">
          <SkeletonCell className="ml-2 h-4 w-8" />
          <SkeletonCell className="ml-2 h-4 w-17" />
          <SkeletonCell className="ml-2 h-4 w-11" />
          <SkeletonCell className="ml-5 h-4 w-46" />
          <SkeletonCell className="ml-4 h-4 w-50" />
          <SkeletonCell className="ml-3 h-4 w-8" />
          <SkeletonCell className="ml-4 h-4 flex-1" />
        </div>
      )}

      {members.map((member, index) => (
        <div
          key={`${member.id}-${member.email}`}
          className={`text-body-2 flex items-center px-8 py-5 ${
            index % 2 === 1 ? "bg-ec-box" : "bg-ec-white"
          }`}
        >
          <span className="w-10 shrink-0">{member.generation}기</span>
          <span className="w-18 shrink-0">{member.part}</span>
          <span className="w-18 shrink-0">{member.name}</span>
          <span className="w-50 shrink-0 truncate">{member.email}</span>
          <span className="w-52 shrink-0">{member.joinedAt}</span>
          <span className="w-14 shrink-0">{member.penaltyPoint}점</span>
          <div className="flex flex-1 justify-between">
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
