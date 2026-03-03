interface QuestionRow {
  id: number;
  title: string;
  createdAt: string;
  author: string;
  status: "대기" | "완료";
}

interface QuestionTableRowsProps {
  questions: QuestionRow[];
}

function QuestionTableRows({ questions }: QuestionTableRowsProps) {
  return (
    <div className="text-ec-black flex flex-col">
      {questions.map((question, index) => (
        <div
          key={`${question.id}-${question.author}-${index}`}
          className={`flex max-w-251 items-center justify-between px-8 py-4 ${
            index % 2 === 1 ? "bg-ec-box" : ""
          }`}
        >
          <div className="flex gap-7">
            <span className="text-body-2 text-ec-black">{question.id}</span>
            <span className="text-body-2 text-ec-black max-w-115 overflow-hidden text-ellipsis whitespace-nowrap">
              {question.title}
            </span>
          </div>
          <div className="flex gap-13">
            <span className="text-body-2 text-ec-black">{question.createdAt}</span>
            <span className="text-body-2 text-ec-black">{question.author}</span>
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
