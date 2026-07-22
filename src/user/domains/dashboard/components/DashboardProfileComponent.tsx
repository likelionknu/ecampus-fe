import { SkeletonCell } from "@/shared/components/skeleton";
import DashboardArrow from "@shared/assets/DashboardArrow.png";
import type { DashboardDataType } from "../types/DashboardData";

interface DashboardProfileComponentProps {
  isLoading: boolean;
  onClick: () => void;
  dashboardData: DashboardDataType | null;
}

const DashboardProfileComponent = ({
  isLoading,
  onClick,
  dashboardData,
}: DashboardProfileComponentProps) => {
  return (
    <div
      className="bg-ec-white border-ec-outline hover:bg-ec-outline flex h-21.5 w-87.5 cursor-pointer items-center justify-between rounded-full border pr-7.5 lg:w-109"
      onClick={onClick}
    >
      <div className="flex items-center gap-5">
        {isLoading ? (
          <>
            <SkeletonCell
              className="ml-2.5 h-17.25 w-17.25"
              rounded="rounded-full"
            />
            <div className="flex h-11.5 flex-col justify-between">
              <SkeletonCell className="h-4 w-13.25" rounded="rounded-full" />
              <SkeletonCell className="h-4 w-30" rounded="rounded-full" />
            </div>
          </>
        ) : (
          <>
            <img
              className="ml-2.5 h-17.25 w-17.25 rounded-full"
              alt="NavUserProfileImg"
              src={dashboardData?.profileUrl}
            />

            <div className="flex h-11.5 flex-col justify-between">
              <div className="text-ec-blue justify-start text-base font-medium">
                {dashboardData?.name}
              </div>
              <div className="text-ec-sub justify-start text-sm font-medium">
                {dashboardData?.course}기{" "}
                {dashboardData?.part === "OPERATOR" ? "운영진" : "아기사자"}
              </div>
            </div>
          </>
        )}
      </div>
      <img className="h-6.5 w-6.5" alt="DashboardArrow" src={DashboardArrow} />
    </div>
  );
};

export default DashboardProfileComponent;
