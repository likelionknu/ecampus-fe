import { SelectBox, SerachBar } from "@/shared/components";
import {
  QUESTION_STATUS_DEFAULT_OPTION,
  QUESTION_STATUS_OPTIONS,
} from "@/shared/constants";

interface QuestionFilterBarProps {
  title: string;
  onKeywordChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

function QuestionFilterBar({
  title,
  onKeywordChange,
  onStatusChange,
}: QuestionFilterBarProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="xl:w-108">
        <SerachBar
          value={title}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="질문 제목으로 검색"
        />
      </div>
      <SelectBox
        options={QUESTION_STATUS_OPTIONS}
        defaultValue={QUESTION_STATUS_DEFAULT_OPTION}
        onChange={onStatusChange}
      />
    </div>
  );
}

export default QuestionFilterBar;
