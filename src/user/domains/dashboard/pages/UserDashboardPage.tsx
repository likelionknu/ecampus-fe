import { useState } from "react";
import DashboardArrow from "@shared/assets/DashboardArrow.png";
import UserProfileImg from "@shared/assets/UserProfileImg.png";
import DashboardMain1 from "@shared/assets/DashboardMain1.png";
import DashboardMain2 from "@shared/assets/DashboardMain2.png";
import DashboardMain3 from "@shared/assets/DashboardMain3.png";

import { PageNationFrame } from "@shared/components/PageNation";
import { PageNationItem } from "@shared/components/PageNation";
import { PageNationMenu } from "@shared/components/PageNation";
import { PageNationButton } from "@shared/components/PageNation";
import DashboardModal from "../components/DashboardModal";

function UserDashBoardPage() {
  const itemSumNum = 4;
  const itemNum = 18;
  const [isModalOpen, setIsModalOpen] = useState(false);

  interface DashboardMainComponentProps {
    imageSrc: string;
    description: string;
    count: number;
    bgColorClass?: string;
    darkBgColorClass?: string;
  }
  const DashboardMainComponent = ({
    imageSrc,
    description,
    count,
    bgColorClass = "bg-[#E7EDFF]",
    darkBgColorClass = "dark:bg-black",
  }: DashboardMainComponentProps) => {
    return (
      <div className="bg-ec-white border-ec-outline hover:bg-ec-outline flex h-21.5 w-52 cursor-pointer items-center rounded-full border">
        <div className="flex items-center gap-2.5">
          <div
            className={`ml-2.5 flex h-17.25 w-17.25 items-center justify-center rounded-full ${bgColorClass} ${darkBgColorClass}`}
          >
            <img className="scale-50" alt={description} src={imageSrc} />
          </div>

          <div className="flex h-11.5 flex-col justify-between">
            <div className="text-ec-sub text-sm font-medium">{description}</div>
            <div className="text-ec-blue text-base font-medium">{count}개</div>
          </div>
        </div>
      </div>
    );
  };

  interface DashboardMainTitleProps {
    title: string;
  }
  const DashboardMainTitle = ({ title }: DashboardMainTitleProps) => {
    return (
      <div className="text-ec-black w-full justify-start pt-7.5 pb-4.5 text-2xl font-semibold">
        {title}
      </div>
    );
  };

  interface NotionComponentProps {
    noticeId: string;
    noticeTitle: string;
    createdAt: string;
    onClick?: () => void;
  }
  const NotionComponent = ({
    noticeId,
    noticeTitle,
    createdAt,
    onClick,
  }: NotionComponentProps) => {
    return (
      <div className="flex cursor-pointer items-center" onClick={onClick}>
        <div className="text-ec-black ml-5.25 w-8 justify-start text-center text-sm font-medium">
          {noticeId}
        </div>
        <div className="text-ec-black ml-5 line-clamp-1 w-190 justify-start text-sm font-medium">
          {noticeTitle}
        </div>
        <div className="text-ec-black ml-12 w-56 justify-start text-center text-sm font-medium">
          {createdAt}
        </div>
      </div>
    );
  };

  interface MissAlartComponentProps {
    alartContent: string;
    alartStatus: string;
    alartDate: string;
    onClick?: () => void;
  }
  const MissAlartComponent = ({
    alartContent,
    alartStatus,
    alartDate,
    onClick,
  }: MissAlartComponentProps) => {
    return (
      <div className="flex cursor-pointer items-center" onClick={onClick}>
        <div className="text-ec-black ml-8 w-218 justify-start text-sm font-medium">
          {alartContent}
        </div>
        <div className="text-ec-black ml-10 line-clamp-1 w-14 justify-center text-sm font-medium">
          {alartStatus}
        </div>
        <div className="text-ec-black ml-9.5 w-14 justify-start text-center text-sm font-medium">
          {alartDate}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full items-center justify-center pb-50">
      <div className="flex h-full w-280 flex-col items-center">
        <div className="text-ec-black w-full justify-start py-7.5 text-3xl font-semibold">
          환영해요!
        </div>
        <div className="flex h-21.5 w-full items-center justify-between">
          <div className="bg-ec-white border-ec-outline hover:bg-ec-outline flex h-21.5 w-109 cursor-pointer items-center justify-between rounded-full border pr-7.5">
            <div className="flex items-center gap-5">
              <img
                className="ml-2.5 h-17.25 w-17.25 rounded-full"
                alt="NavUserProfileImg"
                src={UserProfileImg}
              />
              <div className="flex h-11.5 flex-col justify-between">
                <div className="text-ec-blue justify-start text-base font-medium">
                  김멋사
                </div>
                <div className="text-ec-sub justify-start text-sm font-medium">
                  14기 아기사자
                </div>
              </div>
            </div>
            <img
              className="h-6.5 w-6.5"
              alt="DashboardArrow"
              src={DashboardArrow}
            />
          </div>
          <DashboardMainComponent
            imageSrc={DashboardMain1}
            description="미제출 과제"
            count={2}
            bgColorClass="bg-[#FFF5D9]"
            darkBgColorClass="dark:bg-[#332D1E]"
          />
          <DashboardMainComponent
            imageSrc={DashboardMain2}
            description="내가 소속된 세션"
            count={2}
            bgColorClass="bg-[#E7EDFF]"
            darkBgColorClass="dark:bg-[#1E2A4A]"
          />
          <DashboardMainComponent
            imageSrc={DashboardMain3}
            description="내가 받은 벌점"
            count={2}
            bgColorClass="bg-[#FFE0EB]"
            darkBgColorClass="dark:bg-[#3A242B]"
          />
        </div>
        <DashboardMainTitle title="최근 공지사항을 확인하세요" />

        <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
          {({ currentItems, startIndex }) => (
            <>
              <div className="flex h-61 w-full flex-col">
                <PageNationMenu>
                  <div className="text-ec-table-topic ml-8 justify-start text-center text-xs font-medium">
                    ID
                  </div>
                  <div className="text-ec-table-topic ml-7.5 justify-start text-center text-xs font-medium">
                    제목
                  </div>
                  <div className="text-ec-table-topic ml-222 justify-start text-center text-xs font-medium">
                    생성일
                  </div>
                </PageNationMenu>
                {currentItems.map((item, index) => (
                  <PageNationItem
                    key={startIndex + index}
                    absoluteIndex={startIndex + index}
                  >
                    <NotionComponent
                      noticeId={String(startIndex + index + 1)}
                      noticeTitle={`공지사항 ${item}`}
                      createdAt="2026년 2월 13일 오전 12시 38분"
                      onClick={() => setIsModalOpen(true)}
                    />
                  </PageNationItem>
                ))}
              </div>
              <PageNationButton />
            </>
          )}
        </PageNationFrame>
        <DashboardMainTitle title="놓친 알림이 없는지 확인하세요" />

        <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
          {({ currentItems, startIndex }) => (
            <>
              <div className="flex h-61 w-full flex-col">
                <PageNationMenu>
                  <div className="text-ec-table-topic ml-8 justify-start text-center text-xs font-medium">
                    내용
                  </div>
                  <div className="text-ec-table-topic ml-225 justify-start text-center text-xs font-medium">
                    상태
                  </div>
                  <div className="text-ec-table-topic ml-19 justify-start text-center text-xs font-medium">
                    수신일
                  </div>
                </PageNationMenu>
                {currentItems.map((item, index) => (
                  <PageNationItem
                    key={startIndex + index}
                    absoluteIndex={startIndex + index}
                  >
                    <MissAlartComponent
                      alartContent={`알림 내용 ${item}`}
                      alartStatus="안 읽음"
                      alartDate="3일 전"
                      onClick={() => setIsModalOpen(true)}
                    />
                  </PageNationItem>
                ))}
              </div>
              <PageNationButton />
            </>
          )}
        </PageNationFrame>
      </div>
      {isModalOpen && <DashboardModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default UserDashBoardPage;
