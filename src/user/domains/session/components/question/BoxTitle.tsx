interface BowWrapperProps {
  title: string;
  maxLength: number;
  currentLength: number;
  isMobile: boolean;
}

const BoxTitle = ({
  title,
  maxLength,
  currentLength,
  isMobile,
}: BowWrapperProps) => {
  return (
    <div className="flex justify-between">
      <span className="text-body-1 text-ec-black">{title}</span>
      <span className="text-caption text-ec-sub">
        {!isMobile && `${maxLength - currentLength}자 남음`}
      </span>
    </div>
  );
};

export default BoxTitle;
