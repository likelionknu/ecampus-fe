import Button from "@/shared/components/Button";
import type { ButtonVariant } from "@/shared/types/Button";

interface UserTitleSectionProps {
  title: string;
  subText?: string;
  buttonType?: ButtonVariant;
  buttonText?: string;
}

const SubText = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-body-1 text-ec-sub">{children}</span>;
};

function UserTitleSection({
  title,
  subText,
  buttonType = "primary",
  buttonText,
}: UserTitleSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-large-title text-ec-black">
          {title}
        </span>
        {buttonText && (
          <Button variant={buttonType} size="large">
            {buttonText}
          </Button>
        )}
      </div>
      {subText && <SubText>{subText}</SubText>}
    </div>
  );
}

export default UserTitleSection;
