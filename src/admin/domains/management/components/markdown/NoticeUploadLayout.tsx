import { useRef } from "react";
import Button from "@/shared/components/Button";
import { useScrollSync } from "@/admin/domains/session/hooks/useScrollSync";
import MarkdownEditor from "@/admin/domains/session/components/markdown/MarkdownEditor";
import MarkdownPreview from "@/admin/domains/session/components/markdown/MarkdownPreview";
import Input from "@/shared/components/Input";

interface Props {
  title: string;
  content: string;
  setTitle: (v: string) => void;
  setContent: (v: string) => void;
}

export default function EditorLayout({
  title,
  content,
  setTitle,
  setContent,
}: Props) {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  useScrollSync(editorRef, previewRef);

  return (
    <div className="px-5 pt-5">
      <div className="mb-8 flex items-center justify-between">
        <div className="w-228.5">
          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Button size="primary">추가</Button>
      </div>

      <div className="flex gap-1">
        <div className="w-125.25">
          <MarkdownEditor
            ref={editorRef}
            content={content}
            onChange={setContent}
          />
        </div>
        <div className="w-125.25">
          <MarkdownPreview ref={previewRef} content={content} />
        </div>
      </div>
    </div>
  );
}
