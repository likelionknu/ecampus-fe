import { formatKoreanDateTime12 } from "@/shared/utils/formatKoreanDateTime";
import type { SessionQuestionRow } from "@/user/domains/session/types/SessionQuestionRow";
import TableIcon from "../assets/tableIcon.png";

interface MobileQuestionsRowsProps {
  questions: SessionQuestionRow[];
}

interface MobileQuestionItemProps {
  label: string;
  value: string;
  valueClassName?: string;
}

const sessionNameById: Record<number, string> = {
  14: "[14기] 아기사자 - 백엔드 파트",
};

function MobileQuestionItem({
  label,
  value,
  valueClassName = "text-ec-sub",
}: MobileQuestionItemProps) {
  return (
    <div className="flex gap-2">
      <span className="text-caption text-ec-table-topic">{label}</span>
      <span className={`text-caption ${valueClassName}`}>{value}</span>
    </div>
  );
}

function MobileQuestionsRows({ questions }: MobileQuestionsRowsProps) {
  return (
    <div className="flex flex-col gap-3">
      {questions.map((question, index) => (
        <div
          key={`${question.id}-${question.createdUserName ?? "anonymous"}-${index}`}
          className="bg-ec-box rounded-ec-10 px-5 py-5.5"
        >
          <div className="border-ec-outline-dark flex flex-col gap-2 border-b pb-5">
            <div className="flex items-center gap-1">
              <img alt="" src={TableIcon} className="h-3 w-3" />
              <span className="text-caption text-ec-table-topic">
                {sessionNameById[question.sessionId] ??
                  `세션 ${question.sessionId}`}
              </span>
            </div>
            <span className="text-body-2 text-ec-black">{question.title}</span>
          </div>

          <div className="mt-2 flex flex-wrap gap-4">
            <MobileQuestionItem
              label="질문자"
              value={question.createdUserName ?? "-"}
            />
            <MobileQuestionItem
              label="등록일"
              value={formatKoreanDateTime12(question.createdAt)}
            />
            <MobileQuestionItem
              label="답변자"
              value={question.answeredUserName ?? "-"}
            />
            <MobileQuestionItem
              label="상태"
              value={question.status}
              valueClassName={
                question.status === "완료" ? "text-ec-blue" : "text-ec-sub"
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MobileQuestionsRows;
