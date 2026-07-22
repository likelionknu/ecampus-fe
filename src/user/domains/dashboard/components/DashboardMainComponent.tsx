import { SkeletonCell } from "@/shared/components/skeleton";

interface DashboardMainComponentProps {
  isLoading: boolean;
  imageSrc: string;
  description: string;
  count: number;
  bgColorClass?: string;
  darkBgColorClass?: string;
  onClick?: () => void;
}

const DashboardMainComponent = ({
  isLoading,
  imageSrc,
  description,
  count,
  bgColorClass = "bg-[#E7EDFF]",
  darkBgColorClass = "dark:bg-black",
  onClick,
}: DashboardMainComponentProps) => {
  const handleClick = typeof onClick === "function" ? onClick : undefined;

  return (
    <div
      className="bg-ec-white border-ec-outline hover:bg-ec-outline flex h-21.5 w-87.5 cursor-pointer items-center rounded-full border lg:w-52"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`ml-2.5 flex h-17.25 w-17.25 items-center justify-center rounded-full ${bgColorClass} ${darkBgColorClass}`}
        >
          <img className="scale-50" alt={description} src={imageSrc} />
        </div>

        <div className="flex h-11.5 flex-col justify-between">
          <div className="text-ec-sub text-sm font-medium">{description}</div>
          {isLoading ? (
            <SkeletonCell className="h-4 w-10" rounded="rounded-ec-10" />
          ) : (
            <div className="text-ec-blue text-base font-medium">{count}개</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardMainComponent;
