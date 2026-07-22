import { SkeletonCell } from "@/shared/components/skeleton";

interface NotionComponentProps {
  isLoading: boolean;
  noticeId: string;
  noticeTitle: string;
  createdAt: string;
  onClick?: () => void;
}

const NotionComponent = ({
  isLoading,
  noticeId,
  noticeTitle,
  createdAt,
  onClick,
}: NotionComponentProps) => {
  return (
    <div className="flex cursor-pointer items-center" onClick={onClick}>
      {isLoading ? (
        <>
          <SkeletonCell className="ml-5.25 h-4 w-8" rounded="rounded-full" />
          <SkeletonCell className="ml-5 h-4 w-190" rounded="rounded-full" />
          <SkeletonCell
            className="mr-4 ml-12 h-4 w-52"
            rounded="rounded-full"
          />
        </>
      ) : (
        <>
          <div className="text-ec-black ml-5.25 w-8 justify-start text-center text-sm font-medium">
            {noticeId}
          </div>
          <div className="text-ec-black ml-5 line-clamp-1 w-190 justify-start text-sm font-medium">
            {noticeTitle}
          </div>
          <div className="text-ec-black mr-4 ml-12 w-54 justify-start text-center text-sm font-medium">
            {createdAt}
          </div>
        </>
      )}
    </div>
  );
};

export default NotionComponent;
