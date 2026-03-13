import UserTitleSection from "@/user/shared/components/UserTitleSection";
import AssignmentsTableHeader from "../components/AssignmentsTableHeader";
// import TableEmptyState from "@/shared/components/table/TableEmptyState";
import AssignmentsTableRow from "../components/AssignmentsTableRow";
import { useMediaQuery } from "react-responsive";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import TableEmptyState from "@/shared/components/table/TableEmptyState";

const mockGroups = [
  {
    id: 1,
    name: "기본 CRUD 예제를 안정적인 API로 개선하기기본 CRUD 예제를 안정적인 API로 개선하기기본 CRUD 예제를 안정적인 API로 개선하기",
    endAt: "2026-02-14T00:38:00",
    assignmentStatus: "SUBMITTED",
    evaluate: "PASS",
  },
  {
    id: 2,
    name: "REST API 설계 과제",
    endAt: "2026-02-20T23:59:59",
    assignmentStatus: "NOT_SUBMITTED",
    evaluate: null,
  },
  {
    id: 3,
    name: "기본 CRUD 예제를 안정적인 API로 개선하기",
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
    name: "기본 CRUD 예제를 안정적인 API로 개선하기",
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
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const itemNum = mockGroups.length;
  const itemSumNum = 5;
  return (
    <div className="flex w-full max-w-251 flex-col gap-5 px-8 pt-7">
      <UserTitleSection title="과제" subText="내게 부여된 과제를 확인하세요" />
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
                <TableEmptyState label="등록된 과제가 없어요." />
              ) : (
                <AssignmentsTableRow
                  isLoading={isLoading}
                  assignments={pageAssignments}
                />
              )}
              <PageNationButton />
            </>
          );
        }}

        {/* <section>
        <div className="bg-ec-table-header rounded-tl-ec-10 rounded-tr-ec-10 flex max-w-251 items-center justify-between px-8 py-4">
          <AssignmentsTableHeader />
        </div>
        <TableEmptyState label="등록된 과제가 없어요." />
        <AssignmentsTableRow isLoading={isLoading} assignments={mockGroups} />
      </section> */}
      </PageNationFrame>
    </div>
  );
}
export default UserSessionAssignments;
