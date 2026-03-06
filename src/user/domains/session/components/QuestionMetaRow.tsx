interface QuestionMetaRowProps {
  label: string;
  value: string;
}

function QuestionMetaRow({ label, value }: QuestionMetaRowProps) {
  return (
    <div className="flex gap-9">
      <span className="text-body-2 text-ec-black w-16">{label}</span>
      <span
        className={`text-body-2 ${value === "완료" ? "text-ec-blue" : "text-ec-sub"}`}
      >
        {value}
      </span>
    </div>
  );
}

export default QuestionMetaRow;
