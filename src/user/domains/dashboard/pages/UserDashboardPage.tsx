import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardMain1 from "@shared/assets/DashboardMain1.png";
import DashboardMain2 from "@shared/assets/DashboardMain2.png";
import DashboardMain3 from "@shared/assets/DashboardMain3.png";
import {
  PageNationFrame,
  PageNationItem,
  PageNationMenu,
  PageNationButton,
} from "@shared/components";
import {
  PageNationMobileFrame,
  PageNationMobileItem,
  PageNationMobileButton,
} from "@/shared/components";
import {
  DashboardProfileModal,
  DashboardDemeritsModal,
  NotionSpecificModal,
  NotionMoblieComponent,
  NotionComponent,
  MissAlartMoblieComponent,
  MissAlartComponent,
} from "../components";

import { formatDaysAgo, formatKoreanDateTime12 } from "@/shared/utils";
import { getDashboard, getNotices, getNotifications } from "../apis";
import type { DashboardDataType } from "../types/DashboardData";
import {
  DashboardProfileComponent,
  DashboardMainComponent,
} from "@user/domains/dashboard/components";

interface NoticeItem {
  id: number;
  title: string;
  createdAt: string;
}

interface noticesDataType {
  hasNext: boolean;
  page: number;
  size: string;
  totalElements: number;
  totalPages: string;
  notices: NoticeItem[];
}

interface NotificationsItem {
  id: number;
  type: string;
  tilte: string;
  body: string;
  action: string;
  actionHref: string;
  read: boolean;
  readAt: string | null;
  createdAt: string;
}

interface NotificationsData {
  unreadCount: number;
  notifications: NotificationsItem[];
}

const DashboardMainTitle = ({ title }: { title: string }) => {
  return (
    <div className="text-ec-black w-full justify-start pt-7.5 pb-4.5 text-lg font-medium lg:text-2xl lg:font-semibold">
      {title}
    </div>
  );
};

function UserDashBoardPage() {
  // 대시보드 데이터
  const [dashboardData, setDashboardData] = useState<DashboardDataType | null>(
    null,
  );
  // 공지사항
  const [noticesData, setNoticesData] = useState<noticesDataType | null>(null);
  const [noticePage, setNoticePage] = useState(1);
  const NoticePageItemNum = noticesData?.totalElements ?? 0;
  const NoticePageitemSumNum = 4;
  // 알림
  const [notificationsData, setNotificationsData] =
    useState<NotificationsData | null>(null);
  const [NotificationsPage, setNotificationsPage] = useState(1);
  const NotificationsPageItemNum = notificationsData?.unreadCount ?? 0;
  const NotificationsPageitemSumNum = 4;

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // 프로필 모달
  const [isDashboardDemeritsModalOpen, setIsDashboardDemeritsModalOpen] =
    useState(false); // 벌점 모달
  const [isNotionSpecificModalOpen, setIsNotionSpecificModalOpen] =
    useState(false); // 공지 상세 모달
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null); // 공지사항 선택 id

  const isTablet = useMediaQuery({ maxWidth: 1023 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --------------------------------------토큰 로컬스토리지 부분 시작--------------------------------------

  const authData = JSON.parse(
    localStorage.getItem("ecampus.auth.session") || "null",
  );
  const token = authData?.state?.session?.accessToken;

  // --------------------------------------토큰 로컬스토리지 부분 끝--------------------------------------

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboard();
        console.log(response);

        const result = response.data;

        if (result.data) {
          setDashboardData(result.data);
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
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const noticesResponse = await getNotices({
          page: noticePage - 1,
          size: NoticePageitemSumNum,
        });

        const noticesResult = noticesResponse.data;

        if (noticesResult.data) {
          setNoticesData(noticesResult.data);
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

    fetchNotices();
  }, [NoticePageitemSumNum, noticePage, token]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const NotificationsResponse = await getNotifications({
          page: NotificationsPage - 1,
          size: NotificationsPageitemSumNum,
        });

        const NotificationsResult = NotificationsResponse.data;

        if (NotificationsResult.data) {
          setNotificationsData(NotificationsResult.data);
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

    fetchNotifications();
  }, [NotificationsPageitemSumNum, NotificationsPage, token]);

  return (
    <>
      <div className="mb-7 flex h-full w-full items-center justify-center min-[1024px]:scale-85 min-[1280px]:scale-100">
        <div className="mt-16.5 flex h-full max-w-87.5 flex-col items-center md:max-w-187.5 md:px-0 lg:mt-0 lg:max-w-280">
          <div className="text-ec-black w-full justify-start py-7.5 text-2xl font-semibold lg:text-3xl">
            환영해요!
          </div>

          <div className="flex h-93.5 w-full flex-wrap justify-between md:h-47 lg:h-21.5 lg:items-center">
            <DashboardProfileComponent
              isLoading={loading}
              onClick={() => setIsProfileModalOpen(true)}
              dashboardData={dashboardData}
            />
            <DashboardMainComponent
              isLoading={loading}
              imageSrc={DashboardMain1}
              description="미제출 과제"
              count={dashboardData?.unsubmittedAssignmentCount ?? 0}
              bgColorClass="bg-[#FFF5D9]"
              darkBgColorClass="dark:bg-[#332D1E]"
              onClick={() => navigate("/user/sessions/assignments")}
            />
            <DashboardMainComponent
              isLoading={loading}
              imageSrc={DashboardMain2}
              description="내가 소속된 세션"
              count={dashboardData?.sessionCount ?? 0}
              bgColorClass="bg-[#E7EDFF]"
              darkBgColorClass="dark:bg-[#1E2A4A]"
              onClick={() => navigate("/user/sessions")}
            />
            <DashboardMainComponent
              isLoading={loading}
              imageSrc={DashboardMain3}
              description="내가 받은 벌점"
              count={dashboardData?.demeritCount ?? 0}
              bgColorClass="bg-[#FFE0EB]"
              darkBgColorClass="dark:bg-[#3A242B]"
              onClick={() => setIsDashboardDemeritsModalOpen(true)}
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
            <PageNationFrame
              itemNum={NoticePageItemNum}
              itemSumNum={NoticePageitemSumNum}
            >
              {({ startIndex }) => (
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
                    {(noticesData?.notices ?? []).map((notice, index) => (
                      <PageNationItem
                        key={notice.id}
                        absoluteIndex={startIndex + index}
                      >
                        <NotionComponent
                          isLoading={loading}
                          noticeId={String(notice.id)}
                          noticeTitle={notice.title}
                          createdAt={formatKoreanDateTime12(notice.createdAt)}
                          onClick={() => {
                            setSelectedNoticeId(notice.id);
                            setIsNotionSpecificModalOpen(true);
                          }}
                        />
                      </PageNationItem>
                    ))}
                  </div>
                  <PageNationButton onPageChange={setNoticePage} />
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
            <PageNationFrame
              itemNum={NotificationsPageItemNum}
              itemSumNum={NotificationsPageitemSumNum}
            >
              {({ startIndex }) => (
                <>
                  <div className="flex h-61 w-full flex-col overflow-y-scroll">
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
                    {(notificationsData?.notifications ?? []).map(
                      (Notifications, index) => (
                        <PageNationItem
                          key={Notifications.id}
                          absoluteIndex={startIndex + index}
                        >
                          <MissAlartComponent
                            isLoading={loading}
                            alartContent={String(Notifications.body)}
                            alartStatus={Notifications.read}
                            alartDate={formatDaysAgo(Notifications.createdAt)}
                            onClick={() => navigate("/user/notification")}
                          />
                        </PageNationItem>
                      ),
                    )}
                  </div>
                  <PageNationButton onPageChange={setNotificationsPage} />
                </>
              )}
            </PageNationFrame>
          )}
        </div>
      </div>
      {isProfileModalOpen && (
        <DashboardProfileModal
          dashboardData={dashboardData}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
      {isDashboardDemeritsModalOpen && (
        <DashboardDemeritsModal
          onClose={() => setIsDashboardDemeritsModalOpen(false)}
        />
      )}
      {isNotionSpecificModalOpen && selectedNoticeId !== null && (
        <NotionSpecificModal
          noticeId={selectedNoticeId}
          onClose={() => setIsNotionSpecificModalOpen(false)}
        />
      )}
    </>
  );
}

export default UserDashBoardPage;
