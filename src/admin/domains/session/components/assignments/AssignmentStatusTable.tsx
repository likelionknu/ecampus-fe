import TableEmptyState from "@/shared/components/table/TableEmptyState";
import TableHeaderLabel from "@/shared/components/table/TableHeaderLabel";
import { formatKoreanDateTime24 } from "@/shared/utils/formatKoreanDateTime";
import {
  formatAssignmentStatus,
  formatEvaluateStatus,
} from "@/user/utils/assignment";
import type { AdminAssignmentParticipant } from "../../types/assignment";

const ASSIGNMENT_STATUS_TABLE_COLUMNS =
  "48px 56px 80px 176px 176px 176px 59px 59px";

function AssignmentStatusTableHeader() {
  return (
    <div className="bg-ec-table-header flex h-10 items-center px-8">
      <div
        className="grid w-full items-center gap-4"
        style={{ gridTemplateColumns: ASSIGNMENT_STATUS_TABLE_COLUMNS }}
      >
        <TableHeaderLabel className="text-center">기수</TableHeaderLabel>
        <TableHeaderLabel className="text-center">이름</TableHeaderLabel>
        <TableHeaderLabel className="text-center">파트</TableHeaderLabel>
        <TableHeaderLabel className="text-center">할당일</TableHeaderLabel>
        <TableHeaderLabel className="text-center">제출일</TableHeaderLabel>
        <TableHeaderLabel className="text-center">평가일</TableHeaderLabel>
        <TableHeaderLabel className="text-center">상태</TableHeaderLabel>
        <TableHeaderLabel className="text-center">평가</TableHeaderLabel>
      </div>
    </div>
  );
}

interface AssignmentStatusRowProps {
  participant: AdminAssignmentParticipant;
  index: number;
}

function AssignmentStatusRow({
  participant,
  index,
}: AssignmentStatusRowProps) {
  return (
    <div
      className={`flex h-12 items-center px-8 ${index % 2 === 1 ? "bg-ec-box" : "bg-ec-white"}`}
    >
      <div
        className="grid w-full items-center gap-4"
        style={{ gridTemplateColumns: ASSIGNMENT_STATUS_TABLE_COLUMNS }}
      >
        <span className="text-body-2 text-center whitespace-nowrap">
          {participant.generation}기
        </span>
        <span className="text-body-2 line-clamp-1 text-center whitespace-nowrap">
          {participant.name}
        </span>
        <span className="text-body-2 text-center whitespace-nowrap">
          {participant.part}
        </span>
        <span className="text-body-2 text-center whitespace-nowrap">
          {formatKoreanDateTime24(participant.assignedAt)}
        </span>
        <span className="text-body-2 text-center whitespace-nowrap">
          {participant.submittedAt
            ? formatKoreanDateTime24(participant.submittedAt)
            : "-"}
        </span>
        <span className="text-body-2 text-center whitespace-nowrap">
          {participant.evaluatedAt
            ? formatKoreanDateTime24(participant.evaluatedAt)
            : "-"}
        </span>
        <span
          className={`text-body-2 text-center whitespace-nowrap ${
            participant.assignmentStatus === "SUBMITTED"
              ? "text-ec-blue"
              : "text-ec-red"
          }`}
        >
          {formatAssignmentStatus(participant.assignmentStatus)}
        </span>
        <span
          className={`text-body-2 text-center whitespace-nowrap ${
            participant.evaluate === "PASS"
              ? "text-ec-blue"
              : participant.evaluate === "FAIL"
                ? "text-ec-red"
                : "text-ec-sub"
          }`}
        >
          {formatEvaluateStatus(participant.evaluate)}
        </span>
      </div>
    </div>
  );
}

interface AssignmentStatusTableProps {
  participants: readonly AdminAssignmentParticipant[];
}

function AssignmentStatusTable({ participants }: AssignmentStatusTableProps) {
  return (
    <section className="flex flex-col gap-2">
      <span className="text-body-2 text-ec-black">현황</span>
      {participants.length === 0 ? (
        <TableEmptyState label="과제 현황이 아직 없어요." />
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="h-96 min-w-251.5 overflow-hidden rounded-ec-10">
            <AssignmentStatusTableHeader />
            <div className="h-86 overflow-y-auto">
              {participants.map((participant, index) => (
                <AssignmentStatusRow
                  key={participant.id}
                  participant={participant}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AssignmentStatusTable;
