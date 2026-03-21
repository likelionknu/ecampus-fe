import { useRef, useState } from "react";
import Button from "@/shared/components/Button";
import { useScrollSync } from "@/admin/domains/session/hooks/useScrollSync";
import MarkdownEditor from "@/admin/domains/session/components/markdown/MarkdownEditor";
import MarkdownPreview from "@/admin/domains/session/components/markdown/MarkdownPreview";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";

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
  const [modalType, setModalType] = useState<
    | "noticeConfirm"
    | "noticeSuccess"
    | "inputGuide"
    | "fileGuide"
    | "uploadError"
    | null
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
        <Button size="primary" onClick={() => setModalType("noticeConfirm")}>
          추가
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
      {modalType === "noticeConfirm" && (
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
                  setModalType("inputGuide");
                  return;
                }
                setModalType("noticeSuccess");
              }}
            >
              확인
            </Button>
            <Modal.Cancelled onClick={() => setModalType(null)} />
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "noticeSuccess" && (
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
      {modalType === "inputGuide" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            입력 형식 안내
          </Modal.Header>
          <Modal.Description>
            공지사항의 제목은 최대 80자까지 입력할 수 있어요
          </Modal.Description>
          <Modal.ButtonLayout>
            <Button size="primary" onClick={() => setModalType(null)}>
              확인
            </Button>
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "fileGuide" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            파일 형식 안내
          </Modal.Header>
          <Modal.Description>사진 파일만 업로드할 수 있어요</Modal.Description>
          <Modal.ButtonLayout>
            <Button size="primary" onClick={() => setModalType(null)}>
              확인
            </Button>
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "uploadError" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            파일 업로드
          </Modal.Header>
          <Modal.Description>
            일시적으로 파일을 업로드할 수 없어요
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
