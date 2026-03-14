import SkeletonCell from "@/shared/components/skeleton/SkeletonCell";

export interface AdminGroupRow {
  id: number;
  generation: number;
  part: string;
  name: string;
  email: string;
  joinedAt: string;
  penaltyPoint: number;
  action: "-";
}

interface GroupTableRowsProps {
  isLoading: boolean;
  members: AdminGroupRow[];
}

function GroupTableRows({ isLoading, members }: GroupTableRowsProps) {
  return (
    <div className="rounded-ec-10 flex w-full flex-col overflow-hidden">
      {isLoading && (
        <div className="flex animate-pulse items-center px-8 py-5">
          <SkeletonCell className="h-4 w-14" />
          <SkeletonCell className="ml-4 h-4 w-24" />
          <SkeletonCell className="ml-4 h-4 w-24" />
          <SkeletonCell className="ml-4 h-4 w-50" />
          <SkeletonCell className="ml-4 h-4 w-50" />
          <SkeletonCell className="ml-4 h-4 w-10" />
          <SkeletonCell className="ml-4 h-4 w-6" />
        </div>
      )}

      {members.map((member, index) => (
        <div
          key={`${member.id}-${member.email}`}
          className={`text-body-2 flex items-center px-8 py-5 ${
            index % 2 === 1 ? "bg-ec-box" : "bg-ec-white"
          }`}
        >
          <span className="w-14 shrink-0">{member.generation}기</span>
          <span className="w-26 shrink-0">{member.part}</span>
          <span className="w-26 shrink-0">{member.name}</span>
          <span className="w-70 shrink-0 truncate">{member.email}</span>
          <span className="w-70 shrink-0">{member.joinedAt}</span>
          <span className="w-14 shrink-0">{member.penaltyPoint}점</span>
          <span className="text-ec-sub w-10 shrink-0 text-center">
            {member.action}
          </span>
        </div>
      ))}
    </div>
  );
}

export default GroupTableRows;
