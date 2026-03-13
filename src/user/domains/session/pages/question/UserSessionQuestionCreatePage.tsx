// import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";
import TitleSection from "@/shared/components/TitleSection";
import BoxLayout from "@/user/shared/components/BoxLayout";
import SessionQuestionWarning from "../../components/question/SessionQuestionWarning";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

interface createQuestion {
  title: string;
  content: string;
}

interface FieldProps<T extends HTMLInputElement | HTMLTextAreaElement> {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<T>) => void;
}

const BoxWarrper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-between">{children}</div>;
};

const InputField = ({
  placeholder,
  value,
  onChange,
}: FieldProps<HTMLInputElement>) => {
  return (
    <input
      type="text"
      maxLength={80}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-ec-table-header rounded-ec-10 w-full resize-none px-7 py-4 text-[14px] placeholder:text-[14px] xl:text-[16px] xl:placeholder:text-[16px]"
    />
  );
};

const TextAreaField = ({
  placeholder,
  value,
  onChange,
}: FieldProps<HTMLTextAreaElement>) => {
  return (
    <textarea
      placeholder={placeholder}
      maxLength={900}
      value={value}
      onChange={onChange}
      className="bg-ec-table-header rounded-ec-10 min-h-71 w-full resize-none px-7 py-4 text-[14px] placeholder:text-[14px] xl:text-[16px] xl:placeholder:text-[16px]"
    />
  );
};

function UserSessionQuestionCreatePage() {
  const [createQuestion, setCreateQuestion] = useState<createQuestion>({
    title: "",
    content: "",
  });
  const isMobile = useMediaQuery({ maxWidth: 479 });
  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 pt-7 pb-120 md:mx-0 md:max-w-187.5 md:px-8 xl:max-w-251">
      {/* <Modal>
        <Modal.Header>??吏덈Ц ?깅줉</Modal.Header>
        <Modal.Description>
          ?덈줈??吏덈Ц 寃뚯떆湲???낅줈?쒗븷源뚯슂?
        </Modal.Description>
        <Modal.ButtonLayout>
          <Button size="modal" variant="primary">
            ?뺤씤
          </Button>
          <Modal.Cancle />
        </Modal.ButtonLayout>
      </Modal> */}

      <TitleSection title="??吏덈Ц ?깅줉" />
      <SessionQuestionWarning />

      <BoxLayout>
        <BoxWarrper>
          <span className="text-body-1 text-ec-black">?쒕ぉ</span>
          <span className="text-caption text-ec-sub">
            {!isMobile && `${80 - createQuestion.title.length}???⑥쓬`}
          </span>
        </BoxWarrper>
        <InputField
          placeholder="?쒕ぉ???낅젰?댁＜?몄슂."
          value={createQuestion.title}
          onChange={(e) => {
            setCreateQuestion({ ...createQuestion, title: e.target.value });
          }}
        />
      </BoxLayout>
      <BoxLayout>
        <BoxWarrper>
          <span className="text-body-1 text-ec-black">吏덈Ц</span>
          <span className="text-caption text-ec-sub">
            {!isMobile && `${900 - createQuestion.content.length}???⑥쓬`}
          </span>
        </BoxWarrper>
        <TextAreaField
          placeholder="吏덈Ц ?댁슜???낅젰?댁＜?몄슂."
          value={createQuestion.content}
          onChange={(e) => {
            setCreateQuestion({ ...createQuestion, content: e.target.value });
          }}
        />
      </BoxLayout>

      <div className="text-right">
        <Button size="large">?깅줉</Button>
      </div>
    </div>
  );
}

export default UserSessionQuestionCreatePage;

