import Button from "@/shared/components/Button";
import type { ButtonVariant } from "@/shared/types/Button";

interface UserTitleAction {
  label: string;
  buttonType?: ButtonVariant;
  onClick?: () => void;
}

interface UserTitleSectionProps {
  title: string;
  subText?: string;
  actions?: UserTitleAction[];
}

const SubText = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-body-1 text-ec-sub">{children}</span>;
};

function UserTitleSection({
  title,
  subText,
  actions,
}: UserTitleSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-large-title text-ec-black">{title}</span>
        <div className="flex items-center gap-2.5">
          {actions?.map((action, index) => (
            <Button
              key={`${action.label}-${index}`}
              variant={action.buttonType ?? "primary"}
              size="large"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
      {subText && <SubText>{subText}</SubText>}
    </div>
  );
}

export default UserTitleSection;
