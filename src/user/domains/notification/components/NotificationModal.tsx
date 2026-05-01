import { Button } from "@/shared/components";
import { Modal } from "@/shared/components/modal";
import type { ActionType } from "../types/ModalAction";

interface NotificationModalProps {
  modalState: { action: ActionType; phase: "CONFIRM" | "DONE" } | null;
  handleClose: () => void;
  handleConfirm: () => void;
  isSubmitting: boolean;
}

const MODAL_CONFIG: Record<
  ActionType,
  {
    title: string;
    confirmMessage: string;
    doneMessage: string;
    confirmLabel: string;
    confirmVariant: "primary" | "danger";
  }
> = {
  MARK_ALL_READ: {
    title: "모두 읽음으로 표시",
    confirmMessage:
      "수신한 모든 알림을 읽음으로 표시할까요?\n이 작업은 되돌릴 수 없어요.",
    doneMessage: "수신한 모든 알림을 읽음으로 표시했어요.",
    confirmLabel: "확인",
    confirmVariant: "primary",
  },
  DELETE_ALL: {
    title: "모든 알림 지우기",
    confirmMessage: "수신한 모든 알림을 지울까요?\n이 작업은 되돌릴 수 없어요.",
    doneMessage: "수신한 모든 알림을 지웠어요.",
    confirmLabel: "삭제",
    confirmVariant: "danger",
  },
  DELETE_READ: {
    title: "읽은 알림 지우기",
    confirmMessage: "읽은 알림을 모두 지울까요?\n이 작업은 되돌릴 수 없어요.",
    doneMessage: "읽은 모든 알림을 지웠어요.",
    confirmLabel: "삭제",
    confirmVariant: "danger",
  },
};

function NotificationModal({
  modalState,
  handleClose,
  handleConfirm,
  isSubmitting,
}: NotificationModalProps) {
  if (!modalState) return null;

  const config = MODAL_CONFIG[modalState.action];
  const isConfirm = modalState.phase === "CONFIRM";

  return (
    <Modal>
      <Modal.Header onClick={handleClose}>{config.title}</Modal.Header>
      <Modal.Description>
        {isConfirm ? config.confirmMessage : config.doneMessage}
      </Modal.Description>
      <Modal.ButtonLayout>
        <Button
          size="modal"
          variant={isConfirm ? config.confirmVariant : "primary"}
          onClick={isConfirm ? handleConfirm : handleClose}
          isLoading={isConfirm && isSubmitting}
          disabled={isConfirm && isSubmitting}
        >
          {isConfirm ? config.confirmLabel : "확인"}
        </Button>
        {isConfirm ? (
          <Modal.Cancelled onClick={isSubmitting ? undefined : handleClose} />
        ) : null}
      </Modal.ButtonLayout>
    </Modal>
  );
}

export default NotificationModal;
