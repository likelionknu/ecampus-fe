import TitleSection from "@/shared/components/TitleSection";
import {
  PageNationButton,
  PageNationFrame,
  PageNationItem,
  PageNationMenu,
} from "@/shared/components/PageNation";
import { useState, useEffect } from "react";
import axios from "axios";
import { formatDaysAgoTwo } from "@/shared/utils/formatDaysAgo";

const TaskManagementPage = () => {
  const authData = JSON.parse(
    localStorage.getItem("ecampus.auth.session") || "null",
  );
  const token = authData?.state?.session?.accessToken;

  interface TaskManagementDataItem {
    assignmentId: number;
    name: string;
    createdBy: string;
    endAt: string;
    targetCount: number;
    submittedCount: number;
    unsubmittedCount: number;
  }

  interface TaskManagementDataType {
    totalElements: number;
    totalPages: number;
    content: TaskManagementDataItem[];
  }

  const [TaskManagementData, setTaskManagementData] =
    useState<TaskManagementDataType | null>(null);

  const [TaskManagementDataPage, setTaskManagementDataPage] = useState(1);

  const TaskManagementDataItemNum = TaskManagementData?.totalElements ?? 0;

  const TaskManagementDataSumNum = 8;

  useEffect(() => {
    const fetchTaskManagementData = async () => {
      try {
        const TaskManagementDataResponse = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/v1/admin/sessions/1/assignments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: TaskManagementDataPage - 1,
              size: TaskManagementDataSumNum,
            },
          },
        );

        const TaskManagementDataResult = TaskManagementDataResponse.data;

        if (TaskManagementDataResult.data) {
          setTaskManagementData(TaskManagementDataResult.data);
          console.log("공지사항 페이지 데이터:", TaskManagementDataResult.data);
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

    fetchTaskManagementData();
  }, [TaskManagementDataSumNum, TaskManagementDataPage]);

  interface TaskComponentProps {
    DataId: number;
    DataName: string;
    DataRegisterDate: string;
    DataRegistrant: string;
    DataVisibility: number;
    DataSubmittedCount: number;
    DataUnSubmittedCount: number;
    onClick?: () => void;
  }
  const TaskComponent = ({
    DataId,
    DataName,
    DataRegisterDate,
    DataRegistrant,
    DataVisibility,
    DataSubmittedCount,
    DataUnSubmittedCount,
    onClick,
  }: TaskComponentProps) => {
    return (
      <div className="flex cursor-pointer items-center" onClick={onClick}>
        <div className="text-ec-black ml-4.25 w-9.25 justify-start text-center text-sm font-medium">
          {DataId}
        </div>
        <div className="text-ec-black ml-4.5 line-clamp-1 w-143.75 justify-start text-sm font-medium">
          {DataName}
        </div>
        <div className="ml-6 flex w-78 items-center justify-between">
          <div className="text-ec-black w-12 justify-start text-center text-sm font-medium">
            {DataRegisterDate}
          </div>
          <div className="text-ec-black w-12 justify-start text-center text-sm font-medium">
            {DataRegistrant}일
          </div>
          <div className="text-ec-black w-12 justify-start text-center text-sm font-medium">
            {DataVisibility}건
          </div>
          <div className="text-ec-black w-12 justify-start text-center text-sm font-medium">
            {DataSubmittedCount}건
          </div>
          <div className="text-ec-black w-12 justify-start text-center text-sm font-medium">
            {DataUnSubmittedCount}건
          </div>
        </div>
      </div>
    );
  };

  const TaskNotionComponent = () => {
    return (
      <div className="bg-ec-white border-ec-blue rounded-ec-10 my-5 flex h-14 w-full items-center justify-center border">
        <div className="text-ec-blue w-full px-7.5 text-sm font-medium">
          과제 미제출 시 벌점 부여 회칙이 있으므로 확인해 주세요!
        </div>
      </div>
    );
  };
  return (
    <div className="flex w-full items-center justify-center pt-26.25 xl:pt-7.5">
      <div className="flex h-full w-251.5 flex-col items-center">
        <div className="flex w-full justify-between">
          <TitleSection title={`과제 관리`} />
          <div className="bg-ec-blue rounded-ec-10 flex h-9.5 w-30 cursor-pointer items-center justify-center">
            <div className="text-ec-gnb-white text-center text-base font-medium">
              새 자료 추가
            </div>
          </div>
        </div>
        <TaskNotionComponent />

        <PageNationFrame
          itemNum={TaskManagementDataItemNum}
          itemSumNum={TaskManagementDataSumNum}
        >
          {({ startIndex }) => (
            <>
              <div className="flex h-112 w-251.5 flex-col">
                <PageNationMenu>
                  <div className="text-ec-table-topic ml-7.5 justify-start text-center text-xs font-medium">
                    ID
                  </div>
                  <div className="text-ec-table-topic ml-8 justify-start text-center text-xs font-medium">
                    과제 명
                  </div>
                  <div className="text-ec-table-topic ml-143 justify-start text-center text-xs font-medium">
                    등록자
                  </div>
                  <div className="text-ec-table-topic ml-10.75 justify-start text-center text-xs font-medium">
                    마감
                  </div>
                  <div className="text-ec-table-topic ml-10.75 justify-start text-center text-xs font-medium">
                    부여
                  </div>
                  <div className="text-ec-table-topic ml-10.75 justify-start text-center text-xs font-medium">
                    제출
                  </div>
                  <div className="text-ec-table-topic ml-10 justify-start text-center text-xs font-medium">
                    미제출
                  </div>
                </PageNationMenu>
                {(TaskManagementData?.content ?? []).map((data, index) => (
                  <PageNationItem
                    key={data.assignmentId}
                    absoluteIndex={startIndex + index}
                  >
                    <TaskComponent
                      DataId={data.assignmentId}
                      DataName={data.name}
                      DataRegisterDate={data.createdBy}
                      DataRegistrant={formatDaysAgoTwo(data.endAt)}
                      DataVisibility={data.targetCount}
                      DataSubmittedCount={data.submittedCount}
                      DataUnSubmittedCount={data.unsubmittedCount}
                    />
                  </PageNationItem>
                ))}
              </div>
              <PageNationButton onPageChange={setTaskManagementDataPage} />
            </>
          )}
        </PageNationFrame>
      </div>
    </div>
  );
};

export default TaskManagementPage;
