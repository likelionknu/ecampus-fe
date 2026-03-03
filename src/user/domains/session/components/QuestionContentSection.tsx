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
    <div>
      <span>{label}</span>
      <TextBox>{content}</TextBox>
    </div>
  );
}

export default QuestionContentSection;
