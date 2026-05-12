import { Button } from "@/shared/components";
import { Modal } from "@/shared/components/modal";

interface QuestionDetailModalProps {
  modalState: string | null;
  onClose: () => void;
  onSuccess: () => void;
  onDelete: () => void;
}

function QuestionDetailModal({
  modalState,
  onClose,
  onSuccess,
  onDelete,
}: QuestionDetailModalProps) {
  if (!modalState) return null;

  const isConfirm = modalState === "CONFIRM";

  return (
    <Modal>
      <Modal.Header onClick={isConfirm ? onClose : onSuccess}>
        질문 삭제
      </Modal.Header>
      <Modal.Description>
        {isConfirm
          ? "질문을 정말 삭제하시겠어요? 이 질문을 그대로 남겨두어\n 다른 사용자에게 도움이 될 수 있도록 도와주세요"
          : "질문을 삭제했어요."}
      </Modal.Description>
      <Modal.ButtonLayout>
        <Button
          size="modal"
          variant={isConfirm ? "danger" : "primary"}
          onClick={isConfirm ? onDelete : onSuccess}
        >
          {isConfirm ? "삭제" : "확인"}
        </Button>
        {isConfirm && <Modal.Cancelled onClick={onClose} />}
      </Modal.ButtonLayout>
    </Modal>
  );
}

export default QuestionDetailModal;
