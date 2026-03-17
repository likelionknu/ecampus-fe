import { forwardRef } from "react";

interface Props {
  content: string;
  onChange: (v: string) => void;
  onScroll?: () => void;
}

const MarkdownEditor = forwardRef<HTMLTextAreaElement, Props>(function MarkdownEditor(
  { content, onChange, onScroll },
  ref
) {
  return (
    <div className="w-full h-216.75 bg-ec-white border border-ec-outline rounded-ec-10 flex flex-col">
      <div className="h-7 border-b border-ec-outline px-5 flex items-center text-xs text-ec-sub">
        작성
      </div>
      <textarea
        ref={ref}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onScroll={onScroll}
        placeholder="내용을 마크다운 형식으로 입력하세요"
        className="flex-1 p-5 outline-none resize-none text-sm leading-6 overflow-auto"
      />
    </div>
  );
});

export default MarkdownEditor;