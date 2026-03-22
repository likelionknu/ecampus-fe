import { useEffect, type ReactNode } from "react";
import xWhite from "@user/domains/dashboard/assets/xWhite.png";
import xBlack from "@user/domains/dashboard/assets/xBlack.png";

interface DashboardModalProps {
  onClose?: () => void;
  children?: ReactNode;
  title: string;
}

export const DashboardModal = ({
  onClose,
  children,
  title,
}: DashboardModalProps) => {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <button
        aria-label="모달 닫기"
        className="fixed inset-0 bg-black/20 backdrop-blur-[3px]"
        onClick={onClose}
        type="button"
      />
      <div className="bg-ec-white border-ec-outline rounded-ec-10 z-110 flex h-165.5 w-168.5 flex-col border px-7.5 py-6.5">
        <div className="flex items-center justify-between">
          <div className="text-ec-black f w-xl justify-start text-base font-semibold">
            {title}
          </div>
          <button className="cursor-pointer" onClick={onClose} type="button">
            <img
              alt="닫기 아이콘"
              src={xBlack}
              className="h-4 w-4 dark:hidden"
            />
            <img
              alt="닫기 아이콘"
              src={xWhite}
              className="hidden h-4 w-4 dark:block"
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

interface DashboarProfileModalProps {
  onClose?: () => void;
}

export const DashboardProfileModal = ({
  onClose,
}: DashboarProfileModalProps) => {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);
  const DashboardProfileModalComponent = () => {
    return (
      <div className="flex flex-col gap-1.75">
        <div className="text-ec-sub justify-start text-xs font-medium">
          이름
        </div>
        <div className="bg-ec-box rounded-ec-10 flex h-11 w-153.5 items-center justify-center">
          <div className="text-ec-black w-143 justify-start text-sm font-medium">
            황형진
          </div>
        </div>
      </div>
    );
  };
  return (
    <DashboardModal title="사용자 상세 정보" onClose={onClose}>
      <div className="flex flex-col gap-5">
        <DashboardProfileModalComponent />
      </div>
    </DashboardModal>
  );
};
