import SerachBar from "@/shared/components/SerachBar";
import UserTitleSection from "@/user/shared/components/UserTitleSection";
import SessionQuestionTableHeader from "../../session/components/SessionQuestionTableHeader";

function UserQuestionPage() {
  return (
    <div className="text-ec-black flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection
        title="질문(100)"
        subText="이캠퍼스에서 생성된 모든 질문을 확인할 수 있어요"
      />
      <div className="flex gap-2">
        <div className="w-108">
          <SerachBar placeholder="질문 제목으로 검색" />
        </div>
        <div>정렬</div>
      </div>
      <div className="bg-ec-table-header rounded-tl-ec-10 rounded-tr-ec-10 flex max-w-251 items-center justify-between px-8 py-4">
        <SessionQuestionTableHeader />
      </div>
    </div>
  );
}

export default UserQuestionPage;
