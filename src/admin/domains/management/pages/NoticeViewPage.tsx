import Button from "@/shared/components/Button";
import { formatKoreanDateTime12 } from "@/shared/utils/formatKoreanDateTime";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "../../session/components/markdown/MarkdownComponents";
import Modal from "@/shared/components/modal/Modal";
import { useState } from "react";

interface FileData {
  fileId: number;
  name: string;
  content: string;
  createdAt: string;
  writer: string;
  isPublic: boolean;
}

const file: FileData = {
  fileId: 1,
  name: "4주차, 매핑 및 구조 설계",
  content: `
> 작성 중인 문서입니다.

## 4주차, 매핑 및 구조 설계

데이터 하나하나가 독립적으로 저장되고, 사용된다면 서비스는 작동하기 어려울거에요. 쇼핑몰 페이지를 예를 들면, 사용자가 상점을 만들고, 상점에 상품을 등록하는 이 모든 흐름은 모두 연결되어 있어요.

## Mapping(매핑) 이란?

데이터베이스 관점에서의 매핑은, “자바 객체와 데이터베이스 테이블 간 연결”하는 것을 의미해요.

![연관 관계 매핑 미사용 #1](/markdown-test.png)

1. 상품을 판매하려는 사용자 A
2. 사용자 A가 등록한 상점
3. 사용자 A가 상점에 등록한 상품 A, B, C
`,
  createdAt: "2026-03-15T17:31:03.680478",
  writer: "우승연",
  isPublic: false,
};

function NoticeViewPage() {
  const [modalType, setModalType] = useState<
    | "noticeDelete"
    | "noticeDeleteSuccess"
    | "noticeLock"
    | "noticeLockSuccess"
    | null
  >(null);
  return (
    <div className="prose bg-ec-white w-full max-w-251.5 px-12 py-12">
      <h1 className="text-ec-black mb-2 text-3xl font-semibold">{file.name}</h1>
      <div className="mb-6 flex gap-8 text-xs">
        <div className="flex gap-2">
          <span className="text-ec-sub">작성</span>
          <span className="text-ec-black">
            {formatKoreanDateTime12(file.createdAt)}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="text-ec-sub">등록자</span>
          <span className="text-ec-black">{file.writer}</span>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        <Button
          size="primary"
          variant="primary"
          onClick={() => setModalType("noticeLock")}
        >
          고정
        </Button>
        <Button size="primary" variant="primary">
          수정
        </Button>
        <Button
          size="primary"
          variant="danger"
          onClick={() => setModalType("noticeDelete")}
        >
          삭제
        </Button>
      </div>

      {/* markdown */}
      <ReactMarkdown components={markdownComponents}>
        {file.content}
      </ReactMarkdown>
      {modalType === "noticeDelete" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            공지 사항 삭제
          </Modal.Header>
          <Modal.Description>
            이 공지사항을 삭제할까요? <br />이 작업은 되돌릴 수 없어요
          </Modal.Description>
          <Modal.ButtonLayout>
            <Button
              size="primary"
              variant="danger"
              onClick={() => {
                setModalType("noticeDeleteSuccess");
              }}
            >
              삭제
            </Button>
            <Modal.Cancelled onClick={() => setModalType(null)} />
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "noticeDeleteSuccess" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            공지 사항 삭제
          </Modal.Header>
          <Modal.Description>공지 사항을 삭제했어요</Modal.Description>
          <Modal.ButtonLayout>
            <Button size="primary" onClick={() => setModalType(null)}>
              확인
            </Button>
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "noticeLock" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            공지사항 고정
          </Modal.Header>
          <Modal.Description>
            이 공지사항을 고정할까요? <br />
            고정된 공지사항은 최상단에 위치해요
          </Modal.Description>
          <Modal.ButtonLayout>
            <Button
              size="primary"
              onClick={() => {
                setModalType("noticeLockSuccess");
              }}
            >
              확인
            </Button>
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "noticeLockSuccess" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            공지사항 고정
          </Modal.Header>
          <Modal.Description>이 공지사항을 고정했어요</Modal.Description>
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

export default NoticeViewPage;
