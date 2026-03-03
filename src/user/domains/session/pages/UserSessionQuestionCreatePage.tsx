import UserTitleSection from "@/user/shared/components/UserTitleSection";
import SessionQuestionWarning from "../components/SessionQuestionWarning";
import BoxLayout from "@/user/shared/components/BoxLayout";
import Button from "@/shared/components/Button";

const BoxWarrper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-between">{children}</div>;
};

const InputField = ({ placeholder }: { placeholder: string }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="bg-ec-table-header rounded-ec-10 w-full resize-none px-7 py-4"
    />
  );
};

const TextAreaField = ({ placeholder }: { placeholder: string }) => {
  return (
    <textarea
      placeholder={placeholder}
      className="bg-ec-table-header rounded-ec-10 min-h-71 w-full resize-none px-7 py-4"
    />
  );
};

function UserSessionQuestionCreatePage() {
  return (
    <div className="text-ec-black flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection title="새 질문 등록" />
      <SessionQuestionWarning />

      <BoxLayout>
        <BoxWarrper>
          <span className="text-body-1 text-ec-black">제목</span>
          <span className="text-caption text-ec-sub">80자 남음</span>
        </BoxWarrper>
        <InputField placeholder="제목을 입력해주세요." />
      </BoxLayout>
      <BoxLayout>
        <BoxWarrper>
          <span className="text-body-1 text-ec-black">질문</span>
          <span className="text-caption text-ec-sub">80자 남음</span>
        </BoxWarrper>
        <TextAreaField placeholder="질문 내용을 입력해주세요." />
      </BoxLayout>

      <div className="text-right">
        <Button size="large">등록</Button>
      </div>
    </div>
  );
}

export default UserSessionQuestionCreatePage;
