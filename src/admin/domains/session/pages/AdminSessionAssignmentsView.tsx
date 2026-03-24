import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "@/shared/components/Button";
import TitleSection from "@/shared/components/TitleSection";
import ErrorModal from "@/shared/components/modal/ErrorModal";
import Modal from "@/shared/components/modal/Modal";
import {
  getCommonErrorState,
  type CommonErrorState,
} from "@/shared/utils/questionError";
import AssignmentDeleteModal from "../components/assignments/AssignmentDeleteModal";
import AssignmentEditModal from "../components/assignments/AssignmentEditModal";
import AssignmentDescriptionSection from "../components/assignments/AssignmentDescriptionSection";
import AssignmentMetaCard from "../components/assignments/AssignmentMetaCard";
import AssignmentStatusTable from "../components/assignments/AssignmentStatusTable";
import {
  getAdminAssignmentDetail,
  getAdminAssignmentSubmits,
} from "../api/assignment";
import type {
  AdminAssignmentDetail,
  AdminAssignmentParticipantsPage,
} from "../types/assignment";

function parsePositiveInteger(value: string | null) {
  if (!value) {
    return null;
  }

  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : null;
}

function parseNonNegativeInteger(value: string | null) {
  if (!value) {
    return null;
  }

  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue >= 0 ? parsedValue : null;
}

const INITIAL_ASSIGNMENT_PARTICIPANTS_PAGE: AdminAssignmentParticipantsPage = {
  content: [],
  empty: true,
  first: true,
  last: true,
  number: 0,
  size: 8,
  totalElements: 0,
  totalPages: 0,
};

function AdminSessionAssignmentsView() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const assignmentId = parsePositiveInteger(searchParams.get("aid"));
  const sessionId = parsePositiveInteger(searchParams.get("sid"));
  const currentPage = parseNonNegativeInteger(searchParams.get("page")) ?? 0;
  const [assignment, setAssignment] = useState<AdminAssignmentDetail | null>(
    null,
  );
  const [participantsPage, setParticipantsPage] =
    useState<AdminAssignmentParticipantsPage>(
      INITIAL_ASSIGNMENT_PARTICIPANTS_PAGE,
    );
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isParticipantsLoading, setIsParticipantsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] =
    useState(false);
  const [errors, setErrors] = useState<CommonErrorState | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAssignmentDetail = async () => {
      if (!assignmentId) {
        setAssignment(null);
        setIsDetailLoading(false);
        return;
      }

      setIsDetailLoading(true);
      setErrors(null);

      try {
        const assignmentDetail = await getAdminAssignmentDetail({
          aid: assignmentId,
        });

        if (!isMounted) {
          return;
        }

        setAssignment(assignmentDetail);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setAssignment(null);
        setErrors(getCommonErrorState(error));
      } finally {
        if (isMounted) {
          setIsDetailLoading(false);
        }
      }
    };

    fetchAssignmentDetail();

    return () => {
      isMounted = false;
    };
  }, [assignmentId]);

  useEffect(() => {
    let isMounted = true;

    const fetchAssignmentSubmits = async () => {
      if (!assignmentId) {
        setParticipantsPage(INITIAL_ASSIGNMENT_PARTICIPANTS_PAGE);
        setIsParticipantsLoading(false);
        return;
      }

      setIsParticipantsLoading(true);

      try {
        const assignmentSubmits = await getAdminAssignmentSubmits({
          aid: assignmentId,
          page: currentPage,
        });

        if (!isMounted) {
          return;
        }

        setParticipantsPage(
          assignmentSubmits ?? INITIAL_ASSIGNMENT_PARTICIPANTS_PAGE,
        );
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setParticipantsPage(INITIAL_ASSIGNMENT_PARTICIPANTS_PAGE);
        setErrors(getCommonErrorState(error));
      } finally {
        if (isMounted) {
          setIsParticipantsLoading(false);
        }
      }
    };

    fetchAssignmentSubmits();

    return () => {
      isMounted = false;
    };
  }, [assignmentId, currentPage]);

  const handlePageChange = (page: number) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.set("page", String(page));
    setSearchParams(nextSearchParams);
  };

  const handleDeleteSuccessConfirm = () => {
    setIsDeleteSuccessModalOpen(false);
    navigate(
      sessionId
        ? `/admin/sessions/task/management?sid=${sessionId}`
        : "/admin/sessions/task/management",
      {
        replace: true,
      },
    );
  };

  const renderContent = () => {
    if (!assignmentId) {
      return (
        <div className="rounded-ec-10 bg-ec-white text-ec-sub px-10 py-10 text-sm">
          조회할 과제 정보가 없어 `aid`를 확인해주세요.
        </div>
      );
    }

    if (isDetailLoading) {
      return (
        <div className="rounded-ec-10 bg-ec-white text-ec-sub px-10 py-10 text-sm">
          과제 정보를 불러오는 중이에요.
        </div>
      );
    }

    if (!assignment) {
      return (
        <div className="rounded-ec-10 bg-ec-white text-ec-sub px-10 py-10 text-sm">
          과제 정보를 찾을 수 없어요.
        </div>
      );
    }

    return (
      <>
        <AssignmentMetaCard assignment={assignment} />
        <AssignmentDescriptionSection description={assignment.description} />
        <AssignmentStatusTable
          participants={participantsPage.content}
          totalElements={participantsPage.totalElements}
          totalPages={participantsPage.totalPages}
          currentPage={currentPage}
          pageSize={participantsPage.size}
          isLoading={isParticipantsLoading}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
      {isEditModalOpen && assignment && (
        <AssignmentEditModal
          assignment={assignment}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={(updatedAssignment) => {
            setAssignment(updatedAssignment);
            setIsEditModalOpen(false);
          }}
        />
      )}
      {isDeleteModalOpen && assignment && (
        <AssignmentDeleteModal
          assignment={assignment}
          onClose={() => setIsDeleteModalOpen(false)}
          onSuccess={() => {
            setIsDeleteModalOpen(false);
            setIsDeleteSuccessModalOpen(true);
          }}
        />
      )}
      {isDeleteSuccessModalOpen && (
        <Modal>
          <Modal.Header onClick={handleDeleteSuccessConfirm}>
            과제 삭제
          </Modal.Header>
          <Modal.Description>과제를 삭제했어요</Modal.Description>
          <Modal.ButtonLayout>
            <Button size="primary" onClick={handleDeleteSuccessConfirm}>
              확인
            </Button>
          </Modal.ButtonLayout>
        </Modal>
      )}
      {errors && (
        <ErrorModal
          status={errors.status}
          message={errors.message}
          onClick={() => setErrors(null)}
        />
      )}
      <div className="flex w-full max-w-251.5 flex-col gap-5">
        <div className="flex flex-col gap-3">
          <TitleSection title={assignment?.title ?? "과제 상세"} />
          <div className="flex flex-wrap gap-2.5">
            <Button
              size="primary"
              disabled={!assignment}
              onClick={() => setIsEditModalOpen(true)}
            >
              수정
            </Button>
            <Button
              size="primary"
              variant="danger"
              disabled={!assignment}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              삭제
            </Button>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default AdminSessionAssignmentsView;
