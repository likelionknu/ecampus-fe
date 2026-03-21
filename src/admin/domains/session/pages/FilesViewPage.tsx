import Button from "@/shared/components/Button";
import { formatKoreanDateTime12 } from "@/shared/utils/formatKoreanDateTime";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "../components/markdown/MarkdownComponents";
import { useState } from "react";
import Modal from "@/shared/components/Modal";

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

type ModalType =
  | "toggleConfirm"
  | "toggleSuccess"
  | "deleteConfirm"
  | "deleteSuccess"
  | null;

function FilesViewPage() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isPublic, setIsPublic] = useState(file.isPublic);
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
        <div className="flex gap-2">
          <span className="text-ec-sub">공개 상태</span>
          <span className={isPublic ? "text-ec-blue" : "text-ec-red"}>
            {isPublic ? "공개" : "비공개"}
          </span>
        </div>
      </div>
      <div className="mb-6 flex gap-2">
        <Button size="primary" variant="primary">
          수정
        </Button>
        <Button
          size="primary"
          variant="primary"
          onClick={() => setModalType("toggleConfirm")}
        >
          {isPublic ? "비공개로 설정" : "공개로 설정"}
        </Button>
        <Button
          size="primary"
          variant="danger"
          onClick={() => setModalType("deleteConfirm")}
        >
          삭제
        </Button>
      </div>
      <ReactMarkdown components={markdownComponents}>
        {file.content}
      </ReactMarkdown>

      {modalType === "toggleConfirm" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            세션 자료 공개 상태 변경
          </Modal.Header>
          <Modal.Description>
            {isPublic
              ? "이 세션 자료의 공개 상태를 공개로 변경할까요? \n공개로 변경하면, 세션 참여자들이 즉시 이 자료를 확인할 수 있어요"
              : "이 세션 자료의 공개 상태를 비공개로 변경할까요? \n비공개로 변경하면, 세션 참여자들은 더 이상 이 자료를 열람할 수 없어요"}
          </Modal.Description>
          <Modal.ButtonLayout>
            <Button
              size="primary"
              onClick={() => {
                setIsPublic((prev) => !prev);
                setModalType("toggleSuccess");
              }}
            >
              확인
            </Button>
            <Modal.Cancelled onClick={() => setModalType(null)} />
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "toggleSuccess" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            세션 자료 공개 상태 변경
          </Modal.Header>
          <Modal.Description>
            {isPublic
              ? "세션 자료를 공개 상태로 변경했어요"
              : "세션 자료를 비공개 상태로 변경했어요"}
          </Modal.Description>
          <Modal.ButtonLayout>
            <Button size="primary" onClick={() => setModalType(null)}>
              확인
            </Button>
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "deleteConfirm" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            세션 자료 삭제
          </Modal.Header>
          <Modal.Description>
            이 세션 자료를 삭제할까요? <br />이 작업은 되돌릴 수 없어요
          </Modal.Description>
          <Modal.ButtonLayout>
            <Button
              size="primary"
              variant="danger"
              onClick={() => {
                setModalType("deleteSuccess");
              }}
            >
              삭제
            </Button>
            <Modal.Cancelled onClick={() => setModalType(null)} />
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "deleteSuccess" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            세션 자료 삭제
          </Modal.Header>
          <Modal.Description>세션 자료를 삭제했어요</Modal.Description>
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

export default FilesViewPage;
