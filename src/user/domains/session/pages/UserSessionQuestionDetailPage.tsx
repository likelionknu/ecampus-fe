import TextBox from "@/shared/components/TextBox";
import QuestionMetaRow from "@/user/domains/session/components/QuestionMetaRow";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
import QuestionContentSection from "../components/QuestionContentSection";

const mockQuestionDetail = {
  title: "질문합니다",
  question: "집에 가고 싶어요",
  answer: "이미 집이잖아요!",
  status: "완료",
  createdAt: "2026-03-02 10:02:10",
  createdUserId: 10,
  answeredAt: "2026-03-02 15:50:00",
  answeredUserId: 23,
} as const;

const questionMetaRows = [
  { label: "질문 등록일", value: mockQuestionDetail.createdAt },
  { label: "등록자", value: String(mockQuestionDetail.createdUserId) },
  { label: "답변 등록일", value: mockQuestionDetail.answeredAt },
  { label: "답변자", value: String(mockQuestionDetail.answeredUserId) },
  { label: "상태", value: mockQuestionDetail.status },
] as const;

function UserSessionQuestionDetailPage() {
  return (
    <div className="text-ec-black flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection
        title={mockQuestionDetail.title}
        buttonText="삭제"
        buttonType="danger"
      />

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
        label="질문"
        content={mockQuestionDetail.question}
      />
      <QuestionContentSection
        label="답변"
        content={mockQuestionDetail.answer}
      />
    </div>
  );
}

export default UserSessionQuestionDetailPage;
