import { useMediaQuery } from "react-responsive";
import TitleSection from "@/shared/components/TitleSection";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import { formatDateTime } from "@/shared/utils/date";
import AssignmentsTableHeader from "../components/AssignmentsTableHeader";
import AssignmentsTableRow from "../components/AssignmentsTableRow";
import ListBoxMobile from "../components/application/ListBoxMobile";
import { AssignmentInfo } from "../components/application/AssignmentInfo";
import { useEffect, useState } from "react";
import { getAssignments } from "../apis/assignment";

interface AssignmentRow {
  id: number;
  name: string;
  endAt: string;
  assignmentStatus: "NOT_SUBMITTED" | "SUBMITTED";
  evaluate: "PASS" | "FAIL" | null;
}

interface AssignmentsPageState {
  assignments: AssignmentRow[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

const INITIAL_ASSIGNMENTS_PAGE_STATE: AssignmentsPageState = {
  assignments: [],
  page: 0,
  size: 8,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
};

function UserSessionAssignments() {
  const [assignmentsPage, setAssignmentsPage] = useState<AssignmentsPageState>(
    INITIAL_ASSIGNMENTS_PAGE_STATE,
  );
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const itemNum = assignmentsPage.totalElements;
  const itemSumNum = 5;

  const ASSIGNMENT_STATUS_MAP: Record<string, string> = {
    NOT_SUBMITTED: "미제출",
    SUBMITTED: "제출",
  };
  const ASSIGNMENT_EVALUATE_MAP: Record<string, string> = {
    PASS: "합격",
    FAIL: "실패",
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);

      try {
        const res = await getAssignments({ sid: 1 });
        const responseData = res.data?.data ?? res.data;

        setAssignmentsPage({
          assignments: Array.isArray(responseData?.content)
            ? responseData.content
            : [],
          page: responseData?.number ?? 0,
          size: responseData?.size ?? INITIAL_ASSIGNMENTS_PAGE_STATE.size,
          totalElements: responseData?.totalElements ?? 0,
          totalPages: responseData?.totalPages ?? 0,
          hasNext: !(responseData?.last ?? true),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-251 flex-col gap-5 pt-7">
      <TitleSection
        title={`과제(${assignmentsPage.totalElements})`}
        subText="내게 부여된 과제를 확인하세요"
      />
      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {({ currentItems, startIndex }) => {
          const pageAssignments = assignmentsPage.assignments.slice(
            startIndex,
            startIndex + currentItems.length,
          );

          return (
            <>
              {!isTablet && (
                <PageNationMenu>
                  <AssignmentsTableHeader />
                </PageNationMenu>
              )}
              {pageAssignments.length === 0 && !isLoading ? (
                <TableEmptyState label="등록된 과제가 없어요." />
              ) : !isTablet ? (
                <AssignmentsTableRow
                  isLoading={isLoading}
                  assignments={pageAssignments}
                />
              ) : (
                <div
                  className={`grid gap-4 ${
                    isMobile ? "grid-cols-1" : "grid-cols-2"
                  }`}
                >
                  {pageAssignments.map((assignment) => {
                    const statusValue =
                      ASSIGNMENT_STATUS_MAP[assignment.assignmentStatus];
                    const statusClass =
                      assignment.assignmentStatus === "SUBMITTED"
                        ? "text-ec-blue"
                        : "text-ec-red";

                    const evaluateValue = assignment.evaluate
                      ? ASSIGNMENT_EVALUATE_MAP[assignment.evaluate]
                      : "-";
                    const evaluateClass = assignment.evaluate
                      ? assignment.evaluate === "PASS"
                        ? "text-ec-blue"
                        : "text-ec-red"
                      : "";

                    return (
                      <ListBoxMobile
                        key={assignment.id}
                        title={assignment.name}
                        subText={`${formatDateTime(assignment.endAt)} · 제출 종료`}
                      >
                        <AssignmentInfo
                          label="제출 상태"
                          value={statusValue}
                          valueClassName={statusClass}
                        />
                        <AssignmentInfo
                          label="평가 상태"
                          value={evaluateValue}
                          valueClassName={evaluateClass}
                        />
                      </ListBoxMobile>
                    );
                  })}
                </div>
              )}
              <PageNationButton />
            </>
          );
        }}
      </PageNationFrame>
    </div>
  );
}

export default UserSessionAssignments;
