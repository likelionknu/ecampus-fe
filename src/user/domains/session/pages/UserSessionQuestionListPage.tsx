import TableEmptyState from "@/shared/components/table/TableEmptyState";
import UserTitleSection from "../../../shared/components/UserTitleSection";
import QuestionTableHeader from "../components/QuestionTableHeader";
import QuestionTableRows from "../components/QuestionTableRows";

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

function UserSessionQuestionListPage() {
  return (
    <div className="text-ec-black flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection
        title="질문 및 답변(6)"
        subText="궁금한 내용이 있다면 질문하고, 답변받을 수 있어요"
        buttonType="primary"
        buttonText="새 질문 등록"
      />

      <section>
        <div className="bg-ec-table-header rounded-tl-ec-10 rounded-tr-ec-10 flex max-w-251 items-center justify-between px-8 py-4">
          <QuestionTableHeader />
        </div>
        <TableEmptyState label="등록된 세션 자료가 없어요." />
        <QuestionTableRows questions={mockQuestions} />
      </section>
    </div>
  );
}

export default UserSessionQuestionListPage;
