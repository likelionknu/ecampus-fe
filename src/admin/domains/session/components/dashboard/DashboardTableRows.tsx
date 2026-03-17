import SkeletonCell from "@/shared/components/skeleton/SkeletonCell";
import EraseIcon from "../../assets/erase.svg?react";
import type { AdminDashboardMemberRow } from "../../types";

interface DashboardTableRowsProps {
  isLoading: boolean;
  members: AdminDashboardMemberRow[];
}

function DashboardTableRows({ isLoading, members }: DashboardTableRowsProps) {
  return (
    <div className="rounded-ec-10 flex w-full flex-col overflow-hidden">
      {isLoading && (
        <div className="flex animate-pulse items-center px-8 py-5">
          <SkeletonCell className="h-4 w-10" />
          <SkeletonCell className="ml-8 h-4 w-16" />
          <SkeletonCell className="ml-6 h-4 w-16" />
          <SkeletonCell className="ml-6 h-4 w-48" />
          <SkeletonCell className="ml-6 h-4 w-56" />
          <SkeletonCell className="ml-6 h-4 w-16" />
          <SkeletonCell className="ml-6 h-4 w-18" />
        </div>
      )}

      {members.map((member, index) => (
        <div
          key={`${member.id}-${member.email}`}
          className={`text-body-2 flex items-center px-8 py-5 ${
            index % 2 === 1 ? "bg-ec-box" : "bg-ec-white"
          }`}
        >
          <span className="w-20 shrink-0">{member.generation}기</span>
          <span className="w-22 shrink-0">{member.name}</span>
          <span className="w-24 shrink-0">{member.part}</span>
          <span className="w-66 shrink-0 truncate">{member.email}</span>
          <span className="w-73 shrink-0">{member.addedAt}</span>
          <span className="w-26 shrink-0">{member.inviter}</span>
          <button
            className="text-ec-red inline-flex cursor-pointer items-center gap-1.5"
            type="button"
          >
            <EraseIcon
              className="h-3.5 w-3.5 fill-current"
              aria-hidden="true"
            />
            <span>제거하기</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default DashboardTableRows;
