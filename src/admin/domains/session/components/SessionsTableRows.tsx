import SkeletonCell from "@/shared/components/skeleton/SkeletonCell";

export interface AdminSessionRow {
  id: number;
  name: string;
  creator: string;
  participantCount: number;
  fileCount: number;
  assignmentCount: number;
  status: "활성화" | "비활성화";
}

interface SessionsTableRowsProps {
  isLoading: boolean;
  sessions: AdminSessionRow[];
}

function SessionsTableRows({ isLoading, sessions }: SessionsTableRowsProps) {
  return (
    <div className="rounded-ec-10 flex w-full flex-col overflow-hidden">
      {isLoading && (
        <div className="flex animate-pulse items-center px-8 py-5">
          <SkeletonCell className="h-4 w-6" />
          <SkeletonCell className="ml-8 h-4 flex-1" />
          <SkeletonCell className="ml-6 h-4 w-16" />
          <SkeletonCell className="ml-6 h-4 w-12" />
          <SkeletonCell className="ml-6 h-4 w-12" />
          <SkeletonCell className="ml-6 h-4 w-12" />
          <SkeletonCell className="ml-6 h-4 w-14" />
        </div>
      )}

      {sessions.map((session, index) => (
        <div
          key={`${session.id}-${index}`}
          className={`text-body-2 flex items-center px-8 py-5 ${
            index % 2 === 1 ? "bg-ec-box" : "bg-ec-white"
          }`}
        >
          <span className="w-12">{session.id}</span>
          <span className="flex-1 truncate">{session.name}</span>
          <span className="w-20">{session.creator}</span>
          <span className="w-16">{session.participantCount}명</span>
          <span className="w-16">{session.fileCount}건</span>
          <span className="w-16">{session.assignmentCount}개</span>
          <span
            className={`w-20 ${
              session.status === "활성화" ? "text-ec-blue" : "text-ec-sub"
            }`}
          >
            {session.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SessionsTableRows;
