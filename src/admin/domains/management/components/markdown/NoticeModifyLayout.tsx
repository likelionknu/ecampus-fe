import { useEffect, useRef, useState } from "react";
import Button from "@/shared/components/Button";
import { useScrollSync } from "@/admin/domains/session/hooks/useScrollSync";
import MarkdownEditor from "@/admin/domains/session/components/markdown/MarkdownEditor";
import MarkdownPreview from "@/admin/domains/session/components/markdown/MarkdownPreview";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/modal/Modal";

interface Props {
  title: string;
  content: string;
  setTitle: (v: string) => void;
  setContent: (v: string) => void;
}

interface FileData {
  fileId: number;
  name: string;
  content: string;
}

const mockFile: FileData = {
  fileId: 1,
  name: "4주차, 매핑 및 구조 설계",
  content: `
> 작성 중인 문서입니다.

## 4주차, 매핑 및 구조 설계

데이터 하나하나가 독립적으로 저장되고, 사용된다면 서비스는 작동하기 어려울거에요.

## Mapping(매핑) 이란?

데이터베이스 관점에서의 매핑은, “자바 객체와 데이터베이스 테이블 간 연결”하는 것을 의미해요.

![연관 관계 매핑 미사용 #1](/markdown-test.png)

1. 상품을 판매하려는 사용자 A
2. 사용자 A가 등록한 상점
3. 사용자 A가 상점에 등록한 상품 A, B, C
`,
};

export default function ModifyLayout({
  title,
  content,
  setTitle,
  setContent,
}: Props) {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [modalType, setModalType] = useState<
    "noticeModify" | "noticeModifySuccess" | null
  >(null);

  useScrollSync(editorRef, previewRef);
  useEffect(() => {
    setTitle(mockFile.name);
    setContent(mockFile.content);
  }, [setContent, setTitle]);

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
        <Button size="large" onClick={() => setModalType("noticeModify")}>
          수정
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
      {modalType === "noticeModify" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            공지사항 수정
          </Modal.Header>
          <Modal.Description>
            이 공지사항을 수정할까요? <br />
            작성일이 수정일 기준으로 변경됩니다
          </Modal.Description>
          <Modal.ButtonLayout>
            <Button
              size="primary"
              variant="primary"
              onClick={() => {
                setModalType("noticeModifySuccess");
              }}
            >
              확인
            </Button>
            <Modal.Cancelled onClick={() => setModalType(null)} />
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "noticeModifySuccess" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            공지사항 수정
          </Modal.Header>
          <Modal.Description>공지 사항을 수정했어요</Modal.Description>
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
