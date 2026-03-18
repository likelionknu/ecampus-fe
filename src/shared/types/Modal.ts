export interface ModalProps {
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext?: () => void;
  onClose?: () => void;
}
