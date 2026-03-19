import TitleSection from "@/shared/components/TitleSection";
import type { ButtonVariant } from "@/shared/types/Button";
import AdminQuestionCommentsSection from "./AdminQuestionCommentsSection";
import AdminQuestionContentSection from "./AdminQuestionContentSection";
import AdminQuestionMetaCard from "./AdminQuestionMetaCard";
import type { AdminQuestionDetail } from "../types/question";

interface AdminQuestionDetailAction {
  label: string;
  buttonType?: ButtonVariant;
  onClick?: () => void;
}

interface AdminQuestionDetailContentProps {
  question: AdminQuestionDetail;
  actions?: AdminQuestionDetailAction[];
}

function AdminQuestionDetailContent({
  question,
  actions,
}: AdminQuestionDetailContentProps) {
  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
      <div className="flex w-full max-w-251.5 flex-col gap-5">
        <TitleSection title={question.title} actions={actions} />
        <AdminQuestionMetaCard question={question} />
        <AdminQuestionContentSection label="질문" content={question.question} />
        <AdminQuestionContentSection label="답변" content={question.answer} />
        <AdminQuestionCommentsSection comments={question.comments} />
      </div>
    </div>
  );
}

export default AdminQuestionDetailContent;
