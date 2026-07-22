interface MissAlartMoblieComponentProps {
  title: string;
  date: string;
}

const MissAlartMoblieComponent = ({
  title,
  date,
}: MissAlartMoblieComponentProps) => {
  return (
    <div className="flex flex-col justify-between gap-2.5 p-5">
      <div className="text-ec-black line-clamp-1 w-80 justify-start text-sm font-medium">
        {title}
      </div>

      <div className="flex items-center gap-2.5">
        <div className="text-ec-sub line-clamp-1 justify-start text-xs font-medium">
          작성일
        </div>
        <div className="text-ec-sub line-clamp-1 justify-start text-xs font-medium">
          {date}
        </div>
      </div>
    </div>
  );
};

export default MissAlartMoblieComponent;
