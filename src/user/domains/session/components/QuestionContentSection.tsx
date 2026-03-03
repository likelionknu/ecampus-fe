import TextBox from "@/shared/components/TextBox";

interface QustionContentSectionProps {
  label: string;
  content: string;
}

function QuestionContentSection({
  label,
  content,
}: QustionContentSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-body-2 text-ec-sub">{label}</span>
      <TextBox>{content}</TextBox>
    </div>
  );
}

export default QuestionContentSection;
