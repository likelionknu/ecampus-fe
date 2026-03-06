import TextBox from "@/shared/components/TextBox";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
import QuestionContentSection from "../components/QuestionContentSection";
import { formatDateTime } from "@/shared/utils/date";
import {
  formatAssignmentStatus,
  formatEvaluateStatus,
} from "@/user/utils/assignment";
import Button from "@/shared/components/Button";
import AssignmentMetaRow from "../components/AssignmentsMetaRow";
interface AssignmentDetail {
  startAt: string;
  endAt: string;
  submittedAt: string;
  evaluatedAt: string;
  assignmentStatus: "SUBMITTED" | "NOT_SUBMITTED";
  evaluate: "PASS" | "FAIL" | "";
  description: string;
  submissionContent: string;
}
const mockAssignment: AssignmentDetail = {
  startAt: "2026-03-01T00:00:00",
  endAt: "2026-03-10T23:59:59",
  submittedAt: "2026-03-05T21:10:00",
  evaluatedAt: "",
  assignmentStatus: "SUBMITTED",
  evaluate: "",
  description: "REST API 설계 과제를 제출하세요.",
  submissionContent: "과제 제출 내용입니다.",
} as const;

const questionMetaRows = [
  { label: "시작일", value: formatDateTime(mockAssignment.startAt) },
  { label: "종료일", value: formatDateTime(mockAssignment.endAt) },
  { label: "제출일", value: formatDateTime(mockAssignment.submittedAt) },
  { label: "평가일", value: formatDateTime(mockAssignment.evaluatedAt) },
  {
    label: "상태",
    value: (
      <span
        className={
          mockAssignment.assignmentStatus === "SUBMITTED"
            ? "text-ec-blue"
            : "text-ec-red"
        }
      >
        {formatAssignmentStatus(mockAssignment.assignmentStatus)}
      </span>
    ),
  },

  {
    label: "평가",
    value: (
      <span
        className={
          mockAssignment.evaluate === "PASS"
            ? "text-ec-blue"
            : mockAssignment.evaluate === "FAIL"
              ? "text-ec-red"
              : "text-ec-sub"
        }
      >
        {formatEvaluateStatus(mockAssignment.evaluate)}
      </span>
    ),
  },
] as const;

function UserSessionAssignmentsView() {
  return (
    <div className="flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection title={mockAssignment.description} />

      <TextBox>
        <div className="flex flex-col gap-2">
          {questionMetaRows.map((row) => (
            <AssignmentMetaRow
              key={row.label}
              label={row.label}
              value={row.value}
            />
          ))}
        </div>
      </TextBox>

      <QuestionContentSection
        label="설명"
        content={mockAssignment.description}
      />
      <QuestionContentSection
        label="제출"
        content={mockAssignment.submissionContent}
      />
      <Button
        size="primary"
        className="rounded-ec-10 bg-ec-blue text-ec-white w-20 cursor-pointer self-end px-3.5 py-2 text-sm font-medium"
      >
        과제 제출
      </Button>
    </div>
  );
}

export default UserSessionAssignmentsView;
