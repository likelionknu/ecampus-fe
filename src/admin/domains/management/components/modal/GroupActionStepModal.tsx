import Button from "@/shared/components/Button";
import Modal from "@/shared/components/modal/Modal";
import { MODAL_CONFIG } from "./constants/groupActionModal.constants";
import type {
  GroupActionModalState,
  GroupActionType,
} from "./types/groupActionModal.types";
export type { GroupActionModalState, GroupActionType };

interface GroupActionStepModalProps {
  modalState: GroupActionModalState;
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
