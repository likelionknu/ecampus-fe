import TableHeaderLabel from "@/shared/components/TableHeaderLabel";
import UserTitleSection from "../../../shared/components/UserTitleSection";

type QuestionStatus = "대기" | "완료";

interface MockQuestion {
  id: number;
  title: string;
  createdAt: string;
  author: string;
  status: QuestionStatus;
}

const mockQuestions: MockQuestion[] = [
  {
    id: 2,
    title: "이거 도대체 무슨말이에요?",
    createdAt: "2026년 2월 14일 오전 12시 38분",
    author: "황형진",
    status: "대기",
  },
  {
    id: 1,
    title: "대체 이걸 어떻게 하라는 말이에요..",
    createdAt: "2026년 2월 14일 오전 12시 38분",
    author: "김찬주",
    status: "완료",
  },
  {
    id: 2,
    title: "이거 도대체 무슨말이에요?",
    createdAt: "2026년 2월 14일 오전 12시 38분",
    author: "황형진",
    status: "대기",
  },
  {
    id: 1,
    title: "대체 이걸 어떻게 하라는 말이에요.",
    createdAt: "2026년 2월 14일 오전 12시 38분",
    author: "김찬주",
    status: "완료",
  },
  {
    id: 2,
    title: "이거 도대체 무슨말이에요?",
    createdAt: "2026년 2월 14일 오전 12시 38분",
    author: "황형진",
    status: "대기",
  },
  {
    id: 1,
    title: "대체 이걸 어떻게 하라는 말이에요..",
    createdAt: "2026년 2월 14일 오전 12시 38분",
    author: "김찬주",
    status: "완료",
  },
  {
    id: 2,
    title: "이거 도대체 무슨말이에요?",
    createdAt: "2026년 2월 14일 오전 12시 38분",
    author: "황형진",
    status: "대기",
  },
  {
    id: 1,
    title: "대체 이걸 어떻게 하라는 말이에요..",
    createdAt: "2026년 2월 14일 오전 12시 38분",
    author: "김찬주",
    status: "완료",
  },
];

function SessionQuestionListPage() {
  return (
    <div className="w-full max-w-251 px-8 pt-7">
      <UserTitleSection
        title="질문 및 답변(6)"
        subText="궁금한 내용이 있다면 질문하고, 답변받을 수 있어요"
        buttonText="새 질문 등록"
      />

      <section className="mt-5">
        <div className="bg-ec-table-header rounded-tl-ec-10 rounded-tr-ec-10 flex max-w-251 items-center justify-between px-8 py-4">
          <div className="flex gap-7">
            <TableHeaderLabel>ID</TableHeaderLabel>
            <TableHeaderLabel>질문 명</TableHeaderLabel>
          </div>
          <div className="flex gap-14.5">
            <TableHeaderLabel className="mr-19">등록일</TableHeaderLabel>
            <TableHeaderLabel>질문자</TableHeaderLabel>
            <TableHeaderLabel>상태</TableHeaderLabel>
          </div>
        </div>

        <div className="flex flex-col">
          {mockQuestions.map((question, index) => (
            <div
              key={`${question.id}-${question.author}-${index}`}
              className={`flex max-w-251 items-center justify-between px-8 py-4 ${
                index % 2 === 1 ? "bg-ec-box" : ""
              }`}
            >
              <div className="flex gap-7">
                <span className="text-body-2">{question.id}</span>
                <span className="text-body-2 max-w-115 overflow-hidden text-ellipsis whitespace-nowrap">
                  {question.title}
                </span>
              </div>
              <div className="flex gap-13">
                <span className="text-body-2">{question.createdAt}</span>
                <span className="text-body-2">{question.author}</span>
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
      </section>
    </div>
  );
}

export default SessionQuestionListPage;
