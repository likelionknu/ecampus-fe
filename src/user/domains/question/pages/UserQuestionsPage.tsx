import SerachBar from "@/shared/components/SerachBar";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
import QuestionTableHeader from "../components/QuestionTableHeader";
import QuestionTableRows from "../components/QuestionTableRows";
import type { SessionQuestionRow } from "../../session/types/SessionQuestionRow";
import TableEmptyState from "@/shared/components/table/TableEmptyState";

const mockQuestions: { content: SessionQuestionRow[]; totalElements: number } =
  {
    content: [
      {
        answer: null,
        answeredAt: null,
        answeredUserId: null,
        answeredUserName: null,
        content: "이거 어떻게하는건데요",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 8,
        isMyQuestion: false,
        sessionId: 14,
        status: "대기",
        title: "이거 어떻게하는건데요",
      },
      {
        answer: "확인해보겠습니다.",
        answeredAt: "2026-02-14T01:15:00.000000",
        answeredUserId: 2,
        answeredUserName: "황형진",
        content: "이거 어떻게하는건데요",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 7,
        isMyQuestion: false,
        sessionId: 14,
        status: "완료",
        title: "이거 어떻게하는건데요",
      },
      {
        answer: null,
        answeredAt: null,
        answeredUserId: null,
        answeredUserName: null,
        content: "이거 어떻게하는건데요",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 8,
        isMyQuestion: false,
        sessionId: 14,
        status: "대기",
        title: "이거 어떻게하는건데요",
      },
      {
        answer: "확인해보겠습니다.",
        answeredAt: "2026-02-14T01:15:00.000000",
        answeredUserId: 2,
        answeredUserName: "황형진",
        content: "이거 어떻게하는건데요",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 7,
        isMyQuestion: false,
        sessionId: 14,
        status: "완료",
        title: "이거 어떻게하는건데요",
      },
      {
        answer: null,
        answeredAt: null,
        answeredUserId: null,
        answeredUserName: null,
        content: "이거 어떻게하는건데요",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 8,
        isMyQuestion: false,
        sessionId: 14,
        status: "대기",
        title: "이거 어떻게하는건데요",
      },
      {
        answer: "확인해보겠습니다.",
        answeredAt: "2026-02-14T01:15:00.000000",
        answeredUserId: 2,
        answeredUserName: "황형진",
        content: "이거 어떻게하는건데요",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 7,
        isMyQuestion: false,
        sessionId: 14,
        status: "완료",
        title: "이거 어떻게하는건데요",
      },
      {
        answer: null,
        answeredAt: null,
        answeredUserId: null,
        answeredUserName: null,
        content: "이거 어떻게하는건데요",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 8,
        isMyQuestion: false,
        sessionId: 14,
        status: "대기",
        title: "이거 어떻게하는건데요",
      },
      {
        answer: "확인해보겠습니다.",
        answeredAt: "2026-02-14T01:15:00.000000",
        answeredUserId: 2,
        answeredUserName: "황형진",
        content: "이거 어떻게하는건데요",
        createdAt: "2026-02-14T00:38:00.000000",
        createdUserId: 1,
        createdUserName: "황진형",
        id: 7,
        isMyQuestion: false,
        sessionId: 14,
        status: "완료",
        title: "이거 어떻게하는건데요",
      },
    ],
    totalElements: 8,
  };

function UserQuestionsPage() {
  const isLoading = true;

  return (
    <div className="text-ec-black flex w-full flex-col gap-5 pt-7 pb-120 pl-30">
      <UserTitleSection
        title={`질문(${mockQuestions.totalElements})`}
        subText="이캠퍼스에서 생성된 모든 질문을 확인할 수 있어요"
      />
      <div className="flex gap-2">
        <div className="w-108">
          <SerachBar placeholder="질문 제목으로 검색" />
        </div>
        <div>정렬</div>
      </div>
      <section className="w-280">
        <div className="bg-ec-table-header rounded-tl-ec-10 rounded-tr-ec-10 flex items-center justify-between px-8 py-4">
          <QuestionTableHeader />
        </div>
        <TableEmptyState label="등록된 질문을 찾을 수 없거나 존재하지 않아요" />

        <QuestionTableRows
          isLoading={isLoading}
          questions={mockQuestions.content}
        />
      </section>
    </div>
  );
}

export default UserQuestionsPage;
