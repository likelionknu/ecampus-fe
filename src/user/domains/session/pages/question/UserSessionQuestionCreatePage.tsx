import { useCallback, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ErrorModal } from "@/shared/components/modal";
import { Button, TitleSection } from "@/shared/components";
import type { CreateConfirmErrorModalStep } from "@/shared/types";
import { BoxLayout } from "@/user/shared/components";
import {
  BoxTitle,
  SessionQuestionCreateModal,
  SessionQuestionWarning,
} from "../../components/question";
import type { CreateQuestion } from "../../types";
import { postSessionQuestions } from "../../apis";
import { getCommonErrorState, type CommonErrorState } from "@/shared/utils";

interface FieldProps<T extends HTMLInputElement | HTMLTextAreaElement> {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<T>) => void;
}

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
  const { sid } = useParams();
  const navigate = useNavigate();
  const [createQuestion, setCreateQuestion] = useState<CreateQuestion>({
    title: "",
    content: "",
  });
  const [step, setStep] = useState<CreateConfirmErrorModalStep | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<CommonErrorState | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 479 });

  // 모달 비활성화
  const handleClose = useCallback(() => {
    if (isSubmitting) return;

    setStep(null);
  }, [isSubmitting]);

  // 요청 성공 후 이동
  const handleSuccess = useCallback(() => {
    setStep(null);
    navigate(-1);
  }, [navigate]);

  const handleConfirm = async () => {
    if (isSubmitting) return;
    if (!createQuestion.title.trim() || !createQuestion.content.trim()) return;

    try {
      setIsSubmitting(true);
      await postSessionQuestions({
        sid: Number(sid),
        payload: createQuestion,
      });

      setStep("CONFIRM");
    } catch (error) {
      setStep(null);
      setErrors(getCommonErrorState(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 pt-7 pb-120 md:max-w-187.5 md:px-8 lg:px-0 xl:max-w-251">
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}

      <SessionQuestionCreateModal
        step={step}
        isSubmitting={isSubmitting}
        handleClose={handleClose}
        handleSuccess={handleSuccess}
        handleConfirm={handleConfirm}
      />

      <TitleSection title="새 질문 등록" />
      <SessionQuestionWarning />

      <BoxLayout>
        <BoxTitle
          title="제목"
          maxLength={80}
          currentLength={createQuestion.title.length}
          isMobile={isMobile}
        />

        <InputField
          placeholder="제목을 입력해주세요."
          value={createQuestion.title}
          onChange={(e) => {
            setCreateQuestion((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
      </BoxLayout>

      <BoxLayout>
        <BoxTitle
          title="질문"
          maxLength={900}
          currentLength={createQuestion.content.length}
          isMobile={isMobile}
        />
        <TextAreaField
          placeholder="질문 내용을 입력해주세요."
          value={createQuestion.content}
          onChange={(e) => {
            setCreateQuestion((prev) => ({ ...prev, content: e.target.value }));
          }}
        />
      </BoxLayout>

      <div className="text-right">
        <Button
          size="large"
          onClick={() => {
            if (
              !createQuestion.title.trim() ||
              !createQuestion.content.trim()
            ) {
              setErrors({
                status: "미입력 항목",
                message: "모든 항목을 입력해주세요.",
              });

              return;
            }

            setStep("CREATE");
          }}
        >
          등록
        </Button>
      </div>
    </div>
  );
}

export default UserSessionQuestionCreatePage;
