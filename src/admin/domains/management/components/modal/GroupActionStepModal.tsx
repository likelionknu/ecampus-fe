import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import type { ModalState } from "../../pages/AdminGroupPage";
import { MODAL_CONFIG } from "./constants/groupActionModal.constants";
export type {
  GroupActionModalState,
  GroupActionType,
} from "./types/groupActionModal.types";

interface GroupActionStepModalProps {
  modalState: ModalState;
  onClose: () => void;
  onNext?: () => void;
}

function GroupActionStepModal({
  modalState,
  onClose,
  onNext,
}: GroupActionStepModalProps) {
  if (!modalState) return null;

  const config = MODAL_CONFIG[modalState.action];
  const isConfirm = modalState.phase === "CONFIRM";

  return (
    <Modal>
      <Modal.Header onClick={onClose}>{config.title}</Modal.Header>
      <Modal.Description>
        {isConfirm ? config.confirmMessage : config.doneMessage}
      </Modal.Description>
      <Modal.ButtonLayout>
        <Button
          size="modal"
          variant={isConfirm ? config.confirmVariant : "primary"}
          onClick={isConfirm ? onNext : onClose}
        >
          {isConfirm ? config.confirmLabel : "확인"}
        </Button>
        {isConfirm && <Modal.Cancelled onClick={onClose} />}
      </Modal.ButtonLayout>
    </Modal>
  );
}

export default GroupActionStepModal;
