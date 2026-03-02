import Button from "@/shared/components/Button";

interface UserTitleSectionProps {
  title: string;
  subText?: string;
  buttonText?: string;
}

const SubText = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-body-1 text-ec-sub">{children}</span>;
};

function UserTitleSection({
  title,
  subText,
  buttonText,
}: UserTitleSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-large-title text-ec-black dark:text-ec-white">
          {title}
        </span>
        {buttonText && (
          <Button variant="primary" size="large">
            {buttonText}
          </Button>
        )}
      </div>
      {subText && <SubText>{subText}</SubText>}
    </div>
  );
}

export default UserTitleSection;
