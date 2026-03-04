import TableEmptyState from "@/shared/components/table/TableEmptyState";
import UserTitleSection from "../../../shared/components/UserTitleSection";
import SessionQuestionTableHeader from "../components/SessionQuestionTableHeader";
import SessionQuestionTableRows from "../components/SessionQuestionTableRows";
import type { SessionQuestionRow } from "../types/SessionQuestionRow";
import { useNavigate } from "react-router-dom";

const mockQuestions: { content: SessionQuestionRow[]; totalElements: number } =
  {
    content: [
      {
        answer: null,
        answeredAt: null,
        answeredUserId: null,
        answeredUserName: null,
        content: "ㅎㅇㅇggggㅇ",
        createdAt: "2026-03-03T01:51:40.664772",
        createdUserId: null,
        createdUserName: "한종민",
        id: 4,
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
        sessionId: 1,
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
      {
        answer: "업로드 완료되었습니다.",
        answeredAt: "2026-03-03T06:00:00.000000",
        answeredUserId: 25,
        answeredUserName: "운영진",
        content: "녹화본 링크가 열리지 않습니다.",
        createdAt: "2026-03-03T05:22:18.000000",
        createdUserId: 15,
        createdUserName: "박민수",
        id: 7,
        isMyQuestion: false,
        sessionId: 1,
        status: "완료",
        title: "녹화본 링크 오류",
      },
      {
        answer: null,
        answeredAt: null,
        answeredUserId: null,
        answeredUserName: null,
        content: "출석 체크가 반영되지 않았어요.",
        createdAt: "2026-03-03T07:11:01.000000",
        createdUserId: 19,
        createdUserName: "최유진",
        id: 8,
        isMyQuestion: false,
        sessionId: 1,
        status: "대기",
        title: "출석 반영 문의",
      },
    ],
    totalElements: 4,
  };

function UserSessionQuestionsPage() {
  const navigate = useNavigate();
  const isLoading = false;

  return (
    <div className="text-ec-black flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection
        title={`질문 및 답변(${mockQuestions.totalElements})`}
        subText="궁금한 내용이 있다면 질문하고, 답변받을 수 있어요"
        buttonType="primary"
        buttonText="새 질문 등록"
        onClick={() => navigate("new")}
      />

      <section>
        <div className="bg-ec-table-header rounded-tl-ec-10 rounded-tr-ec-10 flex max-w-251 items-center justify-between px-8 py-4">
          <SessionQuestionTableHeader />
        </div>
        <TableEmptyState label="등록된 세션 자료가 없어요." />

        <SessionQuestionTableRows
          isLoading={isLoading}
          questions={mockQuestions.content}
        />
      </section>
    </div>
  );
}

export default UserSessionQuestionsPage;



