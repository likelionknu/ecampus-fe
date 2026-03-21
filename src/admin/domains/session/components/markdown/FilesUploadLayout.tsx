import { useRef, useState } from "react";
import { useScrollSync } from "../../hooks/useScrollSync";
import Button from "@/shared/components/Button";
import MarkdownEditor from "./MarkdownEditor";
import MarkdownPreview from "./MarkdownPreview";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/modal/Modal";

interface Props {
  title: string;
  content: string;
  setTitle: (v: string) => void;
  setContent: (v: string) => void;
}

export default function FilesUploadLayout({
  title,
  content,
  setTitle,
  setContent,
}: Props) {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  useScrollSync(editorRef, previewRef);
  const [modalType, setModalType] = useState<
    "confirm" | "success" | "guide" | null
  >(null);

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
        <Button size="primary" onClick={() => setModalType("confirm")}>
          등록
        </Button>
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

      {modalType === "confirm" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            세션 자료 등록
          </Modal.Header>
          <Modal.Description>
            세션 자료를 등록할까요? 세션 자료가 등록되었다는 알림이 <br />
            세션에 등록된 참여자들에게 발송돼요
          </Modal.Description>
          <Modal.ButtonLayout>
            <Button
              size="primary"
              onClick={() => {
                if (title.length > 80) {
                  setModalType("guide");
                  return;
                }
                setModalType("success");
              }}
            >
              확인
            </Button>
            <Modal.Cancelled onClick={() => setModalType(null)} />
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "success" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            세션 자료 등록
          </Modal.Header>
          <Modal.Description>세션 자료를 등록했어요</Modal.Description>
          <Modal.ButtonLayout>
            <Button size="primary" onClick={() => setModalType(null)}>
              확인
            </Button>
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "guide" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            입력 형식 안내
          </Modal.Header>
          <Modal.Description>
            세션 자료의 제목은 최대 80자까지 입력할 수 있어요
          </Modal.Description>
          <Modal.ButtonLayout>
            <Button size="primary" onClick={() => setModalType(null)}>
              확인
            </Button>
          </Modal.ButtonLayout>
        </Modal>
      )}
    </div>
  );
}
