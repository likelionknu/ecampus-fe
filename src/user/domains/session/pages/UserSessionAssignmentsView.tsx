import TextBox from "@/shared/components/TextBox";
import QuestionMetaRow from "@/user/domains/session/components/QuestionMetaRow";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
import QuestionContentSection from "../components/QuestionContentSection";
import { formatDateTime } from "@/shared/utils/date";
import {
  formatAssignmentStatus,
  formatEvaluateStatus,
} from "@/user/utils/assignment";
import Button from "@/shared/components/Button";
const mockQuestionDetail = {
  startAt: "2026-03-01T00:00:00",
  endAt: "2026-03-10T23:59:59",
  submittedAt: "",
  evaluatedAt: "",
  assignmentStatus: "SUBMITTED",
  evaluate: "",
  description: "REST API 설계 과제를 제출하세요.",
  submissionContent: "과제 제출 내용입니다.",
} as const;

const questionMetaRows = [
  { label: "시작일", value: formatDateTime(mockQuestionDetail.startAt) },
  { label: "종료일", value: formatDateTime(mockQuestionDetail.endAt) },
  { label: "제출일", value: formatDateTime(mockQuestionDetail.submittedAt) },
  { label: "평가일", value: formatDateTime(mockQuestionDetail.evaluatedAt) },
  {
    label: "상태",
    value: formatAssignmentStatus(mockQuestionDetail.assignmentStatus),
  },
  {
    label: "평가",
    value: formatEvaluateStatus(mockQuestionDetail.evaluate),
  },
] as const;

function UserSessionAssignmentsView() {
  return (
    <div className="flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection title={mockQuestionDetail.description} />

      <TextBox>
        <div className="flex flex-col gap-2">
          {questionMetaRows.map((row) => (
            <QuestionMetaRow
              key={row.label}
              label={row.label}
              value={row.value}
            />
          ))}
        </div>
      </TextBox>

      <QuestionContentSection
        label="설명"
        content={mockQuestionDetail.description}
      />
      <QuestionContentSection
        label="제출"
        content={mockQuestionDetail.submissionContent}
      />
      <Button
        size="primary"
        className="rounded-ec-10 bg-ec-blue text-ec-white w-20 self-end px-3.5 py-2 text-sm font-medium"
      >
        과제 제출
      </Button>
    </div>
  );
}

export default UserSessionAssignmentsView;
