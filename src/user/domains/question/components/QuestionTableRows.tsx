import SkeletonCell from "@/shared/components/skeleton/SkeletonCell";
import { formatKoreanDateTime12 } from "@/shared/utils/formatKoreanDateTime";
import type { SessionQuestionRow } from "../../session/types/SessionQuestionRow";

interface QuestionTableRowsProps {
  isLoading: boolean;
  questions: SessionQuestionRow[];
}

const sessionNameById: Record<number, string> = {
  14: "[14기] 아기사자 - 백엔드 파트",
};

function QuestionTableRows({ isLoading, questions }: QuestionTableRowsProps) {
  return (
    <div className="text-ec-black flex flex-col">
      {isLoading && (
        <div className="flex animate-pulse items-center gap-4 rounded-2xl px-5.5 py-4">
          <SkeletonCell className="ml-1 h-4 w-6" />
          <SkeletonCell className="h-4 w-42" />
          <SkeletonCell className="ml-25 h-4 w-76" />
          <SkeletonCell className="h-4 w-50" />
          <SkeletonCell className="ml-2 h-4 w-14" />
          <SkeletonCell className="ml-2 h-4 w-14" />
          <SkeletonCell className="ml-3 h-4 w-10" />
        </div>
      )}

      {questions.map((question, index) => (
        <div
          key={`${question.id}-${question.createdUserName ?? "anonymous"}-${index}`}
          className={`flex w-full items-center justify-between px-6 py-4 ${
            index % 2 === 1 ? "bg-ec-box" : ""
          }`}
        >
          <div className="flex min-w-0 items-center gap-5">
            <span className="text-body-2 text-ec-black w-6 text-center">
              {question.id}
            </span>
            <span className="text-body-2 text-ec-black 5 truncate">
              {sessionNameById[question.sessionId] ??
                `세션 ${question.sessionId}`}
            </span>
            <span className="text-body-2 text-ec-black .5 ml-27 max-w-74.5 truncate">
              {question.title}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-body-2 text-ec-black mr-6">
              {formatKoreanDateTime12(question.createdAt)}
            </span>
            <span className="text-body-2 text-ec-black mr-6 truncate">
              {question.createdUserName ?? "-"}
            </span>
            <span
              className={`${question.answeredUserName ? "text-ec-black" : "text-ec-sub"} text-body-2 text-ec-black mr-8 truncate`}
            >
              {question.answeredUserName ?? "미답변"}
            </span>
            <span
              className={`text-body-2 mr-0.5 ${
                question.status === "완료" ? "text-ec-blue" : "text-ec-sub"
              }`}
            >
              {question.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionTableRows;
