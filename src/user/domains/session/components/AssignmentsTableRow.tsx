import { formatDateTime } from "@/shared/utils/date";

const ASSIGNMENTS_TABLE_COLUMNS = "52px minmax(0,1fr) 208px 72px 56px";

interface AssignmentRow {
  id: number;
  name: string;
  endAt: string;
  assignmentStatus: "NOT_SUBMITTED" | "SUBMITTED";
  evaluate: string | null;
}

interface AssignmentsTableRowProps {
  assignments: readonly AssignmentRow[];
}

const ASSIGNMENT_STATUS_MAP: Record<string, string> = {
  NOT_SUBMITTED: "미제출",
  SUBMITTED: "제출",
};
const ASSIGNMENT_EVALUATE_MAP: Record<string, string> = {
  PASS: "성공",
  FAIL: "-",
};

function AssignmentsTableRow({ assignments }: AssignmentsTableRowProps) {
  return (
    <div className="flex flex-col">
      {assignments.map((assignment, index) => (
        <div
          key={assignment.id}
          className={`flex items-center px-8 py-4 ${
            index % 2 === 1 ? "bg-ec-box" : ""
          }`}
        >
          <div
            className="grid w-full items-center gap-5"
            style={{ gridTemplateColumns: ASSIGNMENTS_TABLE_COLUMNS }}
          >
            <span className="text-body-2 text-center">{assignment.id}</span>
            <span className="text-body-2 overflow-hidden text-ellipsis whitespace-nowrap">
              {assignment.name}
            </span>
            <span className="text-body-2 text-center whitespace-nowrap">
              {formatDateTime(assignment.endAt)}
            </span>
            <span
              className={`text-body-2 text-center ${
                assignment.assignmentStatus === "SUBMITTED"
                  ? "text-ec-blue"
                  : "text-ec-red"
              }`}
            >
              {ASSIGNMENT_STATUS_MAP[assignment.assignmentStatus]}
            </span>
            <span
              className={`text-body-2 text-center ${assignment.evaluate === "PASS" ? "text-ec-blue" : ""}`}
            >
              {assignment.evaluate
                ? ASSIGNMENT_EVALUATE_MAP[assignment.evaluate]
                : "-"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
export default AssignmentsTableRow;
