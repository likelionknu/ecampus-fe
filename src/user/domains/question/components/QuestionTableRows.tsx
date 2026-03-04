import SkeletonCell from "@/shared/components/skeleton/SkeletonCell";
import { formatKoreanDateTime12 } from "@/shared/utils/formatKoreanDateTime";
import type { SessionQuestionRow } from "../../session/types/SessionQuestionRow";

interface QuestionTableRowsProps {
  isLoading: boolean;
  questions: SessionQuestionRow[];
}

function QuestionTableRows({ isLoading, questions }: QuestionTableRowsProps) {
  return (
    <div className="text-ec-black flex flex-col">
      {isLoading && (
        <div className="flex animate-pulse items-center gap-4 rounded-2xl px-7.5 py-4">
          <SkeletonCell className="h-4 w-6" />
          <SkeletonCell className="h-4 w-20" />
          <SkeletonCell className="h-4 w-32" />
          <SkeletonCell className="h-4 w-22" />
          <SkeletonCell className="h-4 w-14" />
          <SkeletonCell className="h-4 w-14" />
          <SkeletonCell className="h-4 w-10" />
        </div>
      )}

      {questions.map((question, index) => (
        <div
          key={`${question.id}-${question.createdUserName ?? "anonymous"}-${index}`}
          className={`flex max-w-251 items-center justify-between px-7.5 py-4 ${
            index % 2 === 1 ? "bg-ec-box" : ""
          }`}
        >
          <div className="flex min-w-0 items-center gap-5">
            <span className="text-body-2 text-ec-black w-6 text-center">
              {question.id}
            </span>
            <span className="text-body-2 text-ec-black w-20 truncate">
              {`세션 ${question.sessionId}`}
            </span>
            <span className="text-body-2 text-ec-black max-w-64 truncate">
              {question.title}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-body-2 text-ec-black w-22">
              {formatKoreanDateTime12(question.createdAt)}
            </span>
            <span className="text-body-2 text-ec-black w-14 truncate">
              {question.createdUserName ?? "-"}
            </span>
            <span className="text-body-2 text-ec-black w-14 truncate">
              {question.answeredUserName ?? "-"}
            </span>
            <span
              className={`text-body-2 ${
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
