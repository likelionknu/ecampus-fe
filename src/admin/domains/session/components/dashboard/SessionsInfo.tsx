import TextBox from "@/shared/components/TextBox";
import NextIcon from "../../assets/next.svg?react";

interface SessionInfoItem {
  label: string;
  value: string;
  valueClassName?: string;
}

interface SessionInfoProps {
  items: SessionInfoItem[];
}

const StateRow = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-1 flex items-center gap-4">{children}</div>;
};

const Label = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-caption text-ec-sub w-10">{children}</span>;
};

function SessionInfo({ items }: SessionInfoProps) {
  return (
    <div className="w-122">
      <TextBox>
        {items.map((item) => (
          <StateRow key={item.label}>
            <Label>{item.label}</Label>
            <span className={item.valueClassName}>{item.value}</span>
          </StateRow>
        ))}
        <div className="text-ec-blue text-caption mt-4 flex cursor-pointer justify-end gap-1">
          정보 수정하기
          <NextIcon className="fill-ec-blue w-1" />
        </div>
      </TextBox>
    </div>
  );
}

export default SessionInfo;
