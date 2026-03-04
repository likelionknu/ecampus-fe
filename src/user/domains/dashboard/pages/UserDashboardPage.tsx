import DashboardArrow from "@shared/assets/DashboardArrow.png";
import UserProfileImg from "@shared/assets/UserProfileImg.png";
import DashboardMain1 from "@shared/assets/DashboardMain1.png";
import DashboardMain2 from "@shared/assets/DashboardMain2.png";
import DashboardMain3 from "@shared/assets/DashboardMain3.png";

import { PageNationFrame } from "@shared/components/PageNation";
import { PageNationItem } from "@shared/components/PageNation";
import { PageNationMenu } from "@shared/components/PageNation";
import { PageNationButton } from "@shared/components/PageNation";

function UserDashBoardPage() {
  const itemSumNum = 4;
  const itemNum = 18;

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
      <div className="bg-ec-white border-ec-outline hover:bg-ec-outline dark:bg-ec-black flex h-21.5 w-52 cursor-pointer items-center rounded-full border dark:border-[#323232] dark:hover:bg-[#323232]">
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
      <div className="text-ec-black w-full justify-start pt-7.5 pb-4.5 text-2xl font-semibold dark:text-[#FAFAF8]">
        {title}
      </div>
    );
  };
  return (
    <div className="flex h-full w-full items-center justify-center pb-50">
      <div className="flex h-full w-280 flex-col items-center">
        <div className="text-ec-black w-full justify-start py-7.5 text-3xl font-semibold dark:text-[#FAFAF8]">
          환영해요!
        </div>
        <div className="flex h-21.5 w-full items-center justify-between">
          <div className="bg-ec-white border-ec-outline hover:bg-ec-outline dark:bg-ec-black flex h-21.5 w-109 cursor-pointer items-center justify-between rounded-full border pr-7.5 dark:border-[#323232] dark:hover:bg-[#323232]">
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
              <PageNationMenu>
                <div className="flex items-center justify-between">
                  <div className="flexl items-center justify-between">
                    <div className="text-ec-table-topic justify-start text-center text-xs font-medium">
                      ID
                    </div>
                    <div className=""></div>
                  </div>
                  <div className=""></div>
                </div>
              </PageNationMenu>
              {currentItems.map((item, index) => (
                <PageNationItem key={startIndex + index}>
                  <div>{item}</div>
                </PageNationItem>
              ))}
              <PageNationButton />
            </>
          )}
        </PageNationFrame>

        <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
          {({ currentItems, startIndex }) => (
            <>
              <PageNationMenu>
                <div className="text-ec-table-topic ml-8 justify-start text-center text-xs font-medium">
                  ID
                </div>
                <div className="text-ec-table-topic ml-7.5 justify-start text-center text-xs font-medium">
                  제목
                </div>
                <div className="text-ec-table-topic ml-216.25 justify-start text-center text-xs font-medium">
                  생성일
                </div>
              </PageNationMenu>
              {currentItems.map((item, index) => (
                <PageNationItem key={startIndex + index}>
                  <div>{item}</div>
                </PageNationItem>
              ))}
              <PageNationButton />
            </>
          )}
        </PageNationFrame>
      </div>
    </div>
  );
}

export default UserDashBoardPage;
