import { useRef, useState } from "react";
import { useScrollSync } from "../../hooks";
import { Button, Input } from "@/shared/components";
import MarkdownEditor from "./MarkdownEditor";
import MarkdownPreview from "./MarkdownPreview";
import { Modal, ErrorModal } from "@/shared/components/modal";
import { useNavigate, useParams } from "react-router-dom";
import { modifySessionFile } from "../../api";
import { getCommonErrorState, type CommonErrorState } from "@/shared/utils";

interface Props {
  title: string;
  content: string;
  setTitle: (v: string) => void;
  setContent: (v: string) => void;
}

export default function FilesModifyLayout({
  title,
  content,
  setTitle,
  setContent,
}: Props) {
  // 스크롤 동기화
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [modalType, setModalType] = useState<
    "modifyConfirm" | "modifySuccess" | null
  >(null);

  useScrollSync(editorRef, previewRef);
  const [errors, setErrors] = useState<CommonErrorState | null>(null);
  const { sid, fid } = useParams<{ sid: string; fid: string }>();
  const navigate = useNavigate();

  const handleModify = async () => {
    if (!sid || !fid) return;
    if (!title.trim()) return;

    try {
      await modifySessionFile(Number(sid), Number(fid), {
        name: title,
        content,
      });

      setModalType("modifySuccess");
    } catch (error) {
      setErrors(getCommonErrorState(error));
      throw error;
    }
  };
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
        <Button size="large" onClick={() => setModalType("modifyConfirm")}>
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
      {modalType === "modifyConfirm" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            세션 자료 수정
          </Modal.Header>
          <Modal.Description>
            이 세션 자료를 수정할까요? <br />
            작성일이 수정일 기준으로 변경됩니다
          </Modal.Description>
          <Modal.ButtonLayout>
            <Button size="primary" variant="primary" onClick={handleModify}>
              확인
            </Button>
            <Modal.Cancelled onClick={() => setModalType(null)} />
          </Modal.ButtonLayout>
        </Modal>
      )}
      {modalType === "modifySuccess" && (
        <Modal>
          <Modal.Header onClick={() => setModalType(null)}>
            세션 자료 수정
          </Modal.Header>
          <Modal.Description>세션 자료를 수정했어요</Modal.Description>
          <Modal.ButtonLayout>
            <Button
              size="primary"
              onClick={() => {
                setModalType(null);
                navigate(`/admin/sessions/${sid}/files/${fid}`);
              }}
            >
              확인
            </Button>
          </Modal.ButtonLayout>
        </Modal>
      )}
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}
    </div>
  );
}
