import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import DashboardArrow from "@shared/assets/DashboardArrow.png";
import UserProfileImg from "@shared/assets/UserProfileImg.png";
import DashboardMain1 from "@shared/assets/DashboardMain1.png";
import DashboardMain2 from "@shared/assets/DashboardMain2.png";
import DashboardMain3 from "@shared/assets/DashboardMain3.png";

import { PageNationFrame } from "@shared/components/PageNation";
import { PageNationItem } from "@shared/components/PageNation";
import { PageNationMenu } from "@shared/components/PageNation";
import { PageNationButton } from "@shared/components/PageNation";
import { PageNationMobileFrame } from "@/shared/components/PageNationMobile";
import { PageNationMobileItem } from "@/shared/components/PageNationMobile";
import { PageNationMobileButton } from "@/shared/components/PageNationMobile";

import DashboardModal from "../components/DashboardModal";

import SkeletonCell from "@/shared/components/skeleton/SkeletonCell";

function UserDashBoardPage() {
  const itemSumNum = 4;
  const itemNum = 18;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 1023 });

  // ----------------------------------프로필 컴포넌트 시작----------------------------------

  interface DashboardProfileComponentProps {
    isLoading?: boolean;
  }

  const DashboardProfileComponent = ({
    isLoading,
  }: DashboardProfileComponentProps) => {
    return (
      <div className="bg-ec-white border-ec-outline hover:bg-ec-outline flex h-21.5 w-87.5 cursor-pointer items-center justify-between rounded-full border pr-7.5 lg:w-109">
        <div className="flex items-center gap-5">
          {isLoading ? (
            <>
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
            </>
          ) : (
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
          )}
        </div>
        <img
          className="h-6.5 w-6.5"
          alt="DashboardArrow"
          src={DashboardArrow}
        />
      </div>
    );
  };

  // ----------------------------------프로필 컴포넌트 끝----------------------------------
  // ----------------------------------세션,과제,벌점 컴포넌트 시작----------------------------------

  interface DashboardMainComponentProps {
    imageSrc: string;
    description: string;
    count: number;
    bgColorClass?: string;
    darkBgColorClass?: string;
    isLoading?: boolean;
  }
  const DashboardMainComponent = ({
    imageSrc,
    description,
    count,
    bgColorClass = "bg-[#E7EDFF]",
    darkBgColorClass = "dark:bg-black",
    isLoading = false,
  }: DashboardMainComponentProps) => {
    return (
      <div className="bg-ec-white border-ec-outline hover:bg-ec-outline flex h-21.5 w-87.5 cursor-pointer items-center rounded-full border lg:w-52">
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
              <div className="text-ec-blue text-base font-medium">
                {count}개
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------세션,과제,벌점 컴포넌트 끝----------------------------------
  // ----------------------------------페이지네이션 제목 컴포넌트 시작----------------------------------

  interface DashboardMainTitleProps {
    title: string;
  }
  const DashboardMainTitle = ({ title }: DashboardMainTitleProps) => {
    return (
      <div className="text-ec-black w-full justify-start pt-7.5 pb-4.5 text-lg font-medium lg:text-2xl lg:font-semibold">
        {title}
      </div>
    );
  };

  // ----------------------------------페이지네이션 제목 컴포넌트 끝----------------------------------
  // ----------------------------------페이지네이션 공지사항 컴포넌트 시작----------------------------------

  interface NotionComponentProps {
    noticeId: string;
    noticeTitle: string;
    createdAt: string;
    onClick?: () => void;
    isLoading: boolean;
  }
  const NotionComponent = ({
    noticeId,
    noticeTitle,
    createdAt,
    onClick,
    isLoading,
  }: NotionComponentProps) => {
    return (
      <div className="flex cursor-pointer items-center" onClick={onClick}>
        {isLoading ? (
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
        ) : (
          <>
            <SkeletonCell className="ml-5.25 h-4 w-8" rounded="rounded-full" />
            <SkeletonCell className="ml-5 h-4 w-190" rounded="rounded-full" />
            <SkeletonCell
              className="mr-4 ml-12 h-4 w-52"
              rounded="rounded-full"
            />
          </>
        )}
      </div>
    );
  };

  // ----------------------------------페이지네이션 공지사항 컴포넌트 끝----------------------------------
  // ----------------------------------페이지네이션 모바일 공지사항 컴포넌트 시작----------------------------------

  interface NotionMoblieComponentProps {
    title: string;
    date: string;
  }

  const NotionMoblieComponent = ({
    title,
    date,
  }: NotionMoblieComponentProps) => {
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

  // ----------------------------------페이지네이션 모바일 공지사항 컴포넌트 끝----------------------------------
  // ----------------------------------페이지네이션 알람 컴포넌트 시작----------------------------------

  interface MissAlartComponentProps {
    alartContent: string;
    alartStatus: string;
    alartDate: string;
    onClick?: () => void;
    isLoading: boolean;
  }
  const MissAlartComponent = ({
    alartContent,
    alartStatus,
    alartDate,
    onClick,
    isLoading,
  }: MissAlartComponentProps) => {
    return (
      <div className="flex cursor-pointer items-center" onClick={onClick}>
        {isLoading ? (
          <>
            <div className="text-ec-black ml-8 w-218 justify-start text-sm font-medium">
              {alartContent}
            </div>
            <div className="text-ec-black ml-10 line-clamp-1 w-14 justify-center text-sm font-medium">
              {alartStatus}
            </div>
            <div className="text-ec-black ml-9.5 w-14 justify-start text-center text-sm font-medium">
              {alartDate}
            </div>
          </>
        ) : (
          <>
            <SkeletonCell className="ml-8 h-4 w-218" rounded="rounded-full" />
            <SkeletonCell className="ml-10 h-4 w-14" rounded="rounded-full" />
            <SkeletonCell className="ml-9.5 h-4 w-14" rounded="rounded-full" />
          </>
        )}
      </div>
    );
  };

  // ----------------------------------페이지네이션 알람 컴포넌트 끝----------------------------------
  // ----------------------------------페이지네이션 모바일 알람 컴포넌트 시작----------------------------------

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

  // ----------------------------------페이지네이션 모바일 알람 컴포넌트 끝----------------------------------

  return (
    <>
      <div className="flex h-full w-full items-center justify-center min-[1024px]:scale-85 min-[1280px]:scale-100">
        <div className="mt-16.5 flex h-full max-w-87.5 flex-col items-center md:max-w-187.5 md:px-0 lg:mt-0 lg:max-w-280">
          <div className="text-ec-black w-full justify-start py-7.5 text-2xl font-semibold lg:text-3xl">
            환영해요!
          </div>

          <div className="flex h-93.5 w-full flex-wrap justify-between md:h-47 lg:h-21.5 lg:items-center">
            <DashboardProfileComponent />
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
          {isTablet ? (
            <>
              <PageNationMobileFrame>
                <PageNationMobileItem>
                  <NotionMoblieComponent
                    title="멋쟁이사자처럼의 첫 번째 공지사항이에요"
                    date="2026년 2월 14일 오전 12시 38분"
                  />
                </PageNationMobileItem>
                <PageNationMobileItem>
                  <NotionMoblieComponent
                    title="멋쟁이사자처럼의 첫 번째 공지사항이에요"
                    date="2026년 2월 14일 오전 12시 38분"
                  />
                </PageNationMobileItem>
                <PageNationMobileItem>
                  <NotionMoblieComponent
                    title="멋쟁이사자처럼의 첫 번째 공지사항이에요"
                    date="2026년 2월 14일 오전 12시 38분"
                  />
                </PageNationMobileItem>
                <PageNationMobileItem>
                  <NotionMoblieComponent
                    title="멋쟁이사자처럼의 첫 번째 공지사항이에요"
                    date="2026년 2월 14일 오전 12시 38분"
                  />
                </PageNationMobileItem>
              </PageNationMobileFrame>
              <PageNationMobileButton />
            </>
          ) : (
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
                          isLoading={false}
                        />
                      </PageNationItem>
                    ))}
                  </div>
                  <PageNationButton />
                </>
              )}
            </PageNationFrame>
          )}

          <DashboardMainTitle title="놓친 알림이 없는지 확인하세요" />

          {isTablet ? (
            <>
              <PageNationMobileFrame>
                <PageNationMobileItem>
                  <MissAlartMoblieComponent
                    title="멋쟁이사자처럼의 첫 번째 공지사항이에요"
                    date="2026년 2월 14일 오전 12시 38분"
                  />
                </PageNationMobileItem>
                <PageNationMobileItem>
                  <MissAlartMoblieComponent
                    title="멋쟁이사자처럼의 첫 번째 공지사항이에요"
                    date="2026년 2월 14일 오전 12시 38분"
                  />
                </PageNationMobileItem>
                <PageNationMobileItem>
                  <MissAlartMoblieComponent
                    title="멋쟁이사자처럼의 첫 번째 공지사항이에요"
                    date="2026년 2월 14일 오전 12시 38분"
                  />
                </PageNationMobileItem>
                <PageNationMobileItem>
                  <MissAlartMoblieComponent
                    title="멋쟁이사자처럼의 첫 번째 공지사항이에요"
                    date="2026년 2월 14일 오전 12시 38분"
                  />
                </PageNationMobileItem>
              </PageNationMobileFrame>
              <PageNationMobileButton />
            </>
          ) : (
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
                          isLoading={false}
                        />
                      </PageNationItem>
                    ))}
                  </div>
                  <PageNationButton />
                </>
              )}
            </PageNationFrame>
          )}
        </div>
      </div>
      {isModalOpen && <DashboardModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default UserDashBoardPage;
