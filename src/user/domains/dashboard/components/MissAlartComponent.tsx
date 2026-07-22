import { SkeletonCell } from "@/shared/components/skeleton";

interface MissAlartComponentProps {
  isLoading: boolean;
  alartContent: string;
  alartStatus: boolean;
  alartDate: string;
  onClick?: () => void;
}

const MissAlartComponent = ({
  isLoading,
  alartContent,
  alartStatus,
  alartDate,
  onClick,
}: MissAlartComponentProps) => {
  const alartStatusText = alartStatus ? "읽음" : "안 읽음";
  const alartStatusClass = alartStatus ? "text-ec-blue" : "text-ec-red";

  return (
    <div className="flex cursor-pointer items-center" onClick={onClick}>
      {isLoading ? (
        <>
          <SkeletonCell className="ml-8 h-4 w-218" rounded="rounded-full" />
          <SkeletonCell className="ml-10 h-4 w-14" rounded="rounded-full" />
          <SkeletonCell className="ml-9.5 h-4 w-14" rounded="rounded-full" />
        </>
      ) : (
        <>
          <div className="text-ec-black ml-8 w-218 justify-start text-sm font-medium">
            {alartContent}
          </div>
          <div
            className={`${alartStatusClass} ml-10 line-clamp-1 w-14 justify-center text-center text-sm font-medium`}
          >
            {alartStatusText}
          </div>
          <div className="text-ec-black ml-9.5 w-14 justify-start text-center text-sm font-medium">
            {alartDate}
          </div>
        </>
      )}
    </div>
  );
};

export default MissAlartComponent;
