import { useEffect } from "react";
import xWhite from "@user/domains/dashboard/assets/xWhite.png";

interface DashboardModalProps {
  onClose?: () => void;
}

const DashboardModal = ({ onClose }: DashboardModalProps) => {
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
            멋쟁이사자처럼 강남대학교의 첫 번째 소식이에요
          </div>
          <button className="cursor-pointer" onClick={onClose} type="button">
            <img alt="닫기 아이콘" src={xWhite} className="h-4 w-4" />
          </button>
        </div>
        <div className="text-ec-sub w-full justify-start pt-2.5 pb-4.5 text-xs font-medium">
          2026-02-12
        </div>
        <div className="outline-ec-outline h-0 w-full outline-1 outline-offset-[-0.50px]" />
        <div className="text-ec-black w-full justify-start pt-2.5 text-sm leading-6 font-medium">
          안녕하세요
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
