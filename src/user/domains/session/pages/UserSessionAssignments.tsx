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

const mockGroups = [
  {
    id: 1,
    name: "기본 CRUD 과제를 안정적인 API로 개선하기",
    endAt: "2026-02-14T00:38:00",
    assignmentStatus: "SUBMITTED",
    evaluate: "FAIL",
  },
  {
    id: 2,
    name: "REST API 설계 과제",
    endAt: "2026-02-20T23:59:59",
    assignmentStatus: "NOT_SUBMITTED",
    evaluate: "FAIL",
  },
  {
    id: 3,
    name: "기본 CRUD 과제를 안정적인 API로 개선하기",
    endAt: "2026-02-14T00:38:00",
    assignmentStatus: "SUBMITTED",
    evaluate: "PASS",
  },
  {
    id: 4,
    name: "REST API 설계 과제",
    endAt: "2026-02-20T23:59:59",
    assignmentStatus: "NOT_SUBMITTED",
    evaluate: null,
  },
  {
    id: 5,
    name: "기본 CRUD 과제를 안정적인 API로 개선하기",
    endAt: "2026-02-14T00:38:00",
    assignmentStatus: "SUBMITTED",
    evaluate: "PASS",
  },
  {
    id: 6,
    name: "REST API 설계 과제",
    endAt: "2026-02-20T23:59:59",
    assignmentStatus: "NOT_SUBMITTED",
    evaluate: null,
  },
] as const;

function UserSessionAssignments() {
  const isLoading = true;
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const itemNum = mockGroups.length;
  const itemSumNum = 5;

  const ASSIGNMENT_STATUS_MAP: Record<string, string> = {
    NOT_SUBMITTED: "미제출",
    SUBMITTED: "제출",
  };
  const ASSIGNMENT_EVALUATE_MAP: Record<string, string> = {
    PASS: "합격",
    FAIL: "실패",
  };

  return (
    <div className="flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <TitleSection title="과제" subText="내게 부여된 과제를 확인하세요" />
      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {({ currentItems, startIndex }) => {
          const pageAssignments = mockGroups.slice(
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
                <TableEmptyState label="등록된 과제가 없어요" />
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
