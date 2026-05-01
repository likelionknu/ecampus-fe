import { Button } from "@/shared/components";
import { Modal } from "@/shared/components/modal";
import type { CreateConfirmErrorModalStep } from "@/shared/types";

interface SessionQuestionCreateModalProps {
  step: CreateConfirmErrorModalStep | null;
  handleClose: () => void;
  handleSuccess: () => void;
  handleConfirm: () => void;
}
const MODAL_CONFIG: Record<
  CreateConfirmErrorModalStep,
  {
    description: string;
  }
> = {
  CREATE: {
    description: "새로운 질문 게시글을 업로드할까요?",
  },
  CONFIRM: {
    description: "새로운 질문 게시글을 업로드했어요",
  },
  ERROR: {
    description: "요청을 다시 확인해주세요",
  },
};

function SessionQuestionCreatModal({
  step,
  handleClose,
  handleSuccess,
  handleConfirm,
}: SessionQuestionCreateModalProps) {
  if (!step) return null;

  return (
    <Modal>
      <Modal.Header onClick={step === "CREATE" ? handleClose : handleSuccess}>
        새 질문 등록
      </Modal.Header>
      <Modal.Description>{MODAL_CONFIG[step].description}</Modal.Description>
      <Modal.ButtonLayout>
        <Button
          size="modal"
          variant="primary"
          onClick={step === "CREATE" ? handleConfirm : handleSuccess}
        >
          확인
        </Button>
        {step === "CREATE" && (
          <Modal.Cancelled
            onClick={step === "CREATE" ? handleClose : handleSuccess}
          />
        )}
      </Modal.ButtonLayout>
    </Modal>
  );
}

export default SessionQuestionCreatModal;
