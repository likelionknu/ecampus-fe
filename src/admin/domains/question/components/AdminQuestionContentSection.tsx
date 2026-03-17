import TextBox from "@/shared/components/TextBox";
import BoxLayout from "@/user/shared/components/BoxLayout";

interface AdminQuestionContentSectionProps {
  label: string;
  content: string;
}

function AdminQuestionContentSection({
  label,
  content,
}: AdminQuestionContentSectionProps) {
  return (
    <BoxLayout>
      <span className="text-body-2 text-ec-black">{label}</span>
      <TextBox px={false} py={false}>
        <div className="w-full px-7 py-3.5 text-sm leading-6">{content}</div>
      </TextBox>
    </BoxLayout>
  );
}

export default AdminQuestionContentSection;
