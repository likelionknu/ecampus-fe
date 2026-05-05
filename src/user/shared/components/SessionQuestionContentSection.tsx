import { TextBox } from "@/shared/components";
import { BoxLayout } from "@/user/shared/components";

interface SessionQustionContentSectionProps {
  label: string;
  content: string;
}

function SessionQuestionContentSection({
  label,
  content,
}: SessionQustionContentSectionProps) {
  return (
    <BoxLayout>
      <span className="text-body-2 text-ec-sub">{label}</span>
      <TextBox>{content}</TextBox>
    </BoxLayout>
  );
}

export default SessionQuestionContentSection;
