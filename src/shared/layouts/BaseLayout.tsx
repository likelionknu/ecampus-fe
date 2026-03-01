import DefaultBar from "../components/DefaultBar/DefaultBar";
import PageNation from "../components/PageNation";
import DashboardArrow from "@shared/assets/DashboardArrow.png";
import UserProfileImg from "@shared/assets/UserProfileImg.png";
import DashboardMain1 from "@shared/assets/DashboardMain1.png";
import DashboardMain2 from "@shared/assets/DashboardMain2.png";
import DashboardMain3 from "@shared/assets/DashboardMain3.png";

function BaseLayout() {
  interface DashboardMainComponentProps {
    imageSrc: string;
    description: string;
    count: string;
  }
  const DashboardMainComponent = ({
    imageSrc,
    description,
    count,
  }: DashboardMainComponentProps) => {
    return (
      <div className="bg-ec-white border-ec-outline flex h-21.5 w-52 cursor-pointer items-center rounded-full border">
        <div className="flex items-center gap-2.5">
          <img
            className="ml-2.5 h-17.25 w-17.25 rounded-full"
            alt={description}
            src={imageSrc}
          />
          <div className="flex h-11.5 flex-col justify-between">
            <div className="text-ec-sub text-sm font-medium">{description}</div>
            <div className="text-ec-blue text-base font-medium">{count}</div>
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
  return (
    <>
      <DefaultBar>
        <div className="flex h-full w-full items-center justify-center">
          {/* <div className="flex h-full w-full flex-col items-center px-29.25"> */}
          <div className="flex h-full w-280 flex-col items-center">
            <div className="text-ec-black w-full justify-start py-7.5 text-3xl font-semibold">
              환영해요!
            </div>
            <div className="flex h-21.5 w-full items-center justify-between">
              <div className="bg-ec-white border-ec-outline flex h-21.5 w-109 cursor-pointer items-center justify-between rounded-full border pr-7.5">
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
                count="2개"
              />
              <DashboardMainComponent
                imageSrc={DashboardMain2}
                description="내가 소속된 세션"
                count="2개"
              />
              <DashboardMainComponent
                imageSrc={DashboardMain3}
                description="내가 받은 벌점"
                count="2점"
              />
            </div>
            <DashboardMainTitle title="최근 공지사항을 확인하세요" />
            <PageNation />
            <DashboardMainTitle title="놓친 알림이 없는지 확인하세요" />
            <PageNation />
          </div>
        </div>
      </DefaultBar>
    </>
  );
}

export default BaseLayout;
