import { useEffect, type ReactNode, useState } from "react";
import xWhite from "@user/domains/dashboard/assets/xWhite.png";
import xBlack from "@user/domains/dashboard/assets/xBlack.png";
import axios from "axios";

// --------------------------------------토큰 로컬스토리지 부분 시작--------------------------------------
const authData = JSON.parse(
  localStorage.getItem("ecampus.auth.session") || "null",
);
const token = authData?.state?.session?.accessToken;

// --------------------------------------토큰 로컬스토리지 부분 시작--------------------------------------

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
        <div className="mb-5 flex items-center justify-between">
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

// -------------------------------- 사용자 상세 정보 컴포넌트 시작--------------------------------

interface UserProfileDataType {
  name: string;
  email: string;
  course: number;
  part: string;
}

interface DashboarProfileModalProps {
  onClose?: () => void;
}

interface DashboarProfileModalItemProps {
  label: string;
  value?: ReactNode;
}

const DashboarProfileModalItem = ({
  label,
  value,
}: DashboarProfileModalItemProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.75">
        <div className="text-ec-sub justify-start text-xs font-medium">
          {label}
        </div>
        <div className="bg-ec-box rounded-ec-10 flex h-11 w-153.5 items-center justify-center">
          <div className="text-ec-black w-143 justify-start text-sm font-medium">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export const DashboardProfileModal = ({
  onClose,
}: DashboarProfileModalProps) => {
  const [UserProfileData, setUserProfileData] =
    useState<UserProfileDataType | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/v1/users/me/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const result = response.data;

        if (result.data) {
          setUserProfileData(result.data);
          console.log("모달 프로필 데이터:", result.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "서버 응답 에러:",
            error.response?.status,
            error.response?.data,
          );
        } else {
          console.error("네트워크 통신 오류:", error);
        }
      }
    };

    fetchUserProfile();
  }, []);
  return (
    <DashboardModal title="사용자 상세 정보" onClose={onClose}>
      <div className="flex flex-col gap-5">
        <DashboarProfileModalItem label="이름" value={UserProfileData?.name} />
        <DashboarProfileModalItem
          label="연결된 이메일 주소"
          value={UserProfileData?.email}
        />
        <DashboarProfileModalItem
          label="기수"
          value={
            UserProfileData?.course !== undefined
              ? `${UserProfileData.course}기`
              : ""
          }
        />
        <DashboarProfileModalItem
          label="파트(역할)"
          value={UserProfileData?.part}
        />
      </div>
    </DashboardModal>
  );
};

// -------------------------------- 사용자 상세 정보 컴포넌트 끝--------------------------------
// -------------------------------- 벌점 컴포넌트 시작--------------------------------

interface DashboardDemeritsModalProps {
  onClose?: () => void;
}

const DashboardDemeritsModalComponent = () => {
  return (
    <div className="bg-ec-white rounded-ec-10 border-ec-outline h-20 w-full border">
      <div className="flex flex-col gap-2.5 px-5.75 py-4">
        <div className="text-ec-black line-clamp-1 w-full justify-start text-sm font-medium">
          과제 미제출
        </div>
        <div className="text-ec-sub w-full justify-start text-xs font-medium">
          2026년 2월 26일 오전 2시 42분, 벌점 1점
        </div>
      </div>
    </div>
  );
};

export const DashboardDemeritsModal = ({
  onClose,
}: DashboardDemeritsModalProps) => {
  return (
    <DashboardModal title="내게 부여된 벌점" onClose={onClose}>
      <div className="flex flex-col gap-2.5">
        <DashboardDemeritsModalComponent />
        <DashboardDemeritsModalComponent />
        <DashboardDemeritsModalComponent />
      </div>
    </DashboardModal>
  );
};
// -------------------------------- 벌점 컴포넌트 끝--------------------------------
