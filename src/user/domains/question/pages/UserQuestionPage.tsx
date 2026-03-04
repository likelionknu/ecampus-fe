import SerachBar from "@/shared/components/SerachBar";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
import QuestionTableHeader from "../components/QuestionTableHeader";
import QuestionTableRows from "../components/QuestionTableRows";
import type { SessionQuestionRow } from "../../session/types/SessionQuestionRow";

const mockQuestions: { content: SessionQuestionRow[]; totalElements: number } =
  {
    content: [
      {
        answer: null,
        answeredAt: null,
        answeredUserId: null,
        answeredUserName: null,
        content: "ㅎㅇㅇㅇ",
        createdAt: "2026-03-03T01:47:30.475043",
        createdUserId: null,
        createdUserName: null,
        id: 2,
        isMyQuestion: true,
        sessionId: 1,
        status: "대기",
        title: "ㅎㅇ",
      },
      {
        answer: "네, 확인했습니다.",
        answeredAt: "2026-03-03T03:20:10.000000",
        answeredUserId: 23,
        answeredUserName: "관리자",
        content: "오늘 과제 제출 마감이 언제인가요?",
        createdAt: "2026-03-03T02:05:40.000000",
        createdUserId: 11,
        createdUserName: "김찬주",
        id: 5,
        isMyQuestion: false,
        sessionId: 2,
        status: "완료",
        title: "과제 마감 시간 문의",
      },
      {
        answer: null,
        answeredAt: null,
        answeredUserId: null,
        answeredUserName: null,
        content: "다음 주 세션 자료는 어디서 볼 수 있나요?",
        createdAt: "2026-03-03T04:10:30.000000",
        createdUserId: 12,
        createdUserName: "이서연",
        id: 6,
        isMyQuestion: false,
        sessionId: 1,
        status: "대기",
        title: "세션 자료 위치 질문",
      },
    ],
    totalElements: 100,
  };

function UserQuestionPage() {
  const isLoading = false;

  return (
    <div className="text-ec-black flex w-full max-w-251 flex-col gap-5 pt-7 pl-30">
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
        <QuestionTableRows
          isLoading={isLoading}
          questions={mockQuestions.content}
        />
      </section>
    </div>
  );
}

export default UserQuestionPage;
