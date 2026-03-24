import { useState } from "react";
import { deleteWhitelist } from "../../../apis/group";
import StopIcon from "../../../assets/stop.svg?react";
import type { ListState } from "../../../pages/AdminGroupPage";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";
import ErrorModal from "@/shared/components/modal/ErrorModal";
interface WhitelistItemProps {
  item: ListState;
}

function WhitelistItem({ item }: WhitelistItemProps) {
  const [errors, setErrors] = useState<CommonErrorState | null>(null);

  // 화이트 리스트 삭제
  const handleDelete = async () => {
    try {
      await deleteWhitelist({ wid: item.id });
    } catch (error) {
      setErrors(getCommonErrorState(error));
    }
  };

  return (
    <div className="border-ec-outline flex w-full items-center justify-between border-b py-2">
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}

      <div className="flex flex-col gap-1">
        <span className="text-caption to-ec-black">{item.email}</span>
        <span className="text-caption text-ec-sub">
          {item.registerName} (이)가 추가함
        </span>
      </div>
      <div
        className="text-caption text-ec-red flex cursor-pointer gap-1"
        onClick={handleDelete}
      >
        <StopIcon className="fill-ec-red w-3" />
        제거
      </div>
    </div>
  );
}

export default WhitelistItem;
