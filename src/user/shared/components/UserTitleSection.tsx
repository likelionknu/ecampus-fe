import Button from "@/shared/components/Button";
import type { ButtonVariant } from "@/shared/types/Button";
import { useMediaQuery } from "react-responsive";

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
  return (
    <span className="font-pretendard tracking-ec-normal xl:text-body-1 text-ec-sub text-[14px] font-medium">
      {children}
    </span>
  );
};

function UserTitleSection({ title, subText, actions }: UserTitleSectionProps) {
  const isMobile = useMediaQuery({ maxWidth: 479 });
  const hasActions = Boolean(actions?.length);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-0">
        <span className="text-title xl:text-large-title text-ec-black">
          {title}
        </span>
        {isMobile && subText && <SubText>{subText}</SubText>}
        {hasActions && (
          <div className="flex flex-wrap items-center gap-2.5">
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
        )}
      </div>
      {!isMobile && subText && <SubText>{subText}</SubText>}
    </div>
  );
}

export default UserTitleSection;
