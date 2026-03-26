import { useEffect, type ReactNode } from "react";
import { Modal } from "@/shared/components/modal";
import { formatAssignmentStatus, formatEvaluateStatus } from "@/user/utils";
import type { AdminAssignmentParticipant } from "../../types";

const PART_LABEL_BY_CODE: Record<string, string> = {
  OPERATOR: "운영진",
  PLANNING: "기획",
  BACKEND: "백엔드",
  FRONTEND: "프론트엔드",
  DESIGN: "디자인",
};

function formatPart(part: string) {
  return PART_LABEL_BY_CODE[part] ?? part;
}

function formatCompactDateTime(value: string) {
  const normalized = value.trim();
  const matched = normalized.match(
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/,
  );

  if (matched) {
    return `${matched[1]}.${matched[2]}.${matched[3]} ${matched[4]}:${matched[5]}`;
  }

  const fallbackDate = new Date(normalized);

  if (Number.isNaN(fallbackDate.getTime())) {
    return value;
  }

  const year = fallbackDate.getFullYear();
  const month = String(fallbackDate.getMonth() + 1).padStart(2, "0");
  const day = String(fallbackDate.getDate()).padStart(2, "0");
  const hour = String(fallbackDate.getHours()).padStart(2, "0");
  const minute = String(fallbackDate.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hour}:${minute}`;
}

function DetailStatusValue({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return <span className={`font-medium ${className}`}>{children}</span>;
}

function ActionButton({
  className,
  children,
  onClick,
  disabled = false,
}: {
  className: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-ec-10 font-pretendard text-ec-gnb-white inline-flex items-center justify-center gap-2.5 overflow-hidden px-3.5 py-2 text-sm font-medium whitespace-nowrap ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${className}`}
    >
      {children}
    </button>
  );
}

interface AssignmentSubmitDetailModalProps {
  participant: AdminAssignmentParticipant;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onCancelAssignment: () => void;
  isActionPending?: boolean;
}

function AssignmentSubmitDetailModal({
  participant,
  onClose,
  onApprove,
  onReject,
  onCancelAssignment,
  isActionPending = false,
}: AssignmentSubmitDetailModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const submissionContent = participant.submissionContent?.trim() ?? "";
  const isSubmissionLink = /^https?:\/\//i.test(submissionContent);
  const isSubmittedParticipant = participant.assignmentStatus === "SUBMITTED";
  const detailRows = [
    {
      label: "기수",
      value: `${participant.course}기`,
      topClassName: "top-0",
      valueClassName: "text-ec-sub",
    },
    {
      label: "파트",
      value: formatPart(participant.part),
      topClassName: "top-[27px]",
      valueClassName: "text-ec-sub",
    },
    {
      label: "이름",
      value: participant.name,
      topClassName: "top-[54px]",
      valueClassName: "text-ec-sub",
    },
    {
      label: "할당일",
      value: formatCompactDateTime(participant.assignedAt),
      topClassName: "top-[81px]",
      valueClassName: "text-ec-sub",
    },
    {
      label: "제출일",
      value: participant.submittedAt
        ? formatCompactDateTime(participant.submittedAt)
        : "-",
      topClassName: "top-[108px]",
      valueClassName: "text-ec-sub",
    },
    {
      label: "평가일",
      value: participant.evaluatedAt
        ? formatCompactDateTime(participant.evaluatedAt)
        : "-",
      topClassName: "top-[135px]",
      valueClassName: "text-ec-sub",
    },
    {
      label: "상태",
      value: formatAssignmentStatus(participant.assignmentStatus),
      topClassName: "top-[162px]",
      valueClassName:
        participant.assignmentStatus === "SUBMITTED"
          ? "text-ec-blue"
          : "text-ec-red",
    },
    {
      label: "평가",
      value: formatEvaluateStatus(participant.evaluate),
      topClassName: "top-[189px]",
      valueClassName:
        participant.evaluate === "PASS"
          ? "text-ec-blue"
          : participant.evaluate === "FAIL"
            ? "text-ec-red"
            : "text-ec-sub",
    },
  ] as const;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="모달 닫기"
        className="fixed inset-0 bg-black/20 backdrop-blur-[3px]"
        onClick={onClose}
      />
      <div className="bg-ec-white border-ec-outline rounded-ec-10 relative z-110 flex h-117.25 w-168.5 max-w-[calc(100vw-32px)] flex-col overflow-y-auto border px-7.5 py-8">
        <Modal.Header onClick={onClose}>
          <div className="text-ec-black font-pretendard w-144.5 max-w-full justify-start text-base font-semibold">
            과제 상세보기
          </div>
        </Modal.Header>

        <div className="mt-3.75 flex flex-wrap gap-2.5">
          {isSubmittedParticipant && (
            <ActionButton
              className="bg-ec-blue"
              onClick={onApprove}
              disabled={isActionPending}
            >
              성공으로 검토
            </ActionButton>
          )}
          {isSubmittedParticipant && (
            <ActionButton
              className="bg-ec-red"
              onClick={onReject}
              disabled={isActionPending}
            >
              실패로 검토
            </ActionButton>
          )}
          <ActionButton
            className="bg-ec-red"
            onClick={onCancelAssignment}
            disabled={isActionPending}
          >
            사용자 과제 부여 취소
          </ActionButton>
        </div>

        <div className="bg-ec-box rounded-ec-10 mt-7 h-60.75 w-full px-12 py-3">
          <div className="relative h-52 w-full">
            {detailRows.map((row) => (
              <div
                key={`label-${row.label}`}
                className={`font-pretendard absolute left-0 ${row.topClassName} text-ec-black justify-start text-xs font-medium`}
              >
                {row.label}
              </div>
            ))}
            {detailRows.map((row) => (
              <DetailStatusValue
                key={`value-${row.label}`}
                className={`font-pretendard absolute left-15 ${row.topClassName} max-w-[calc(100%-60px)] justify-start text-xs ${row.valueClassName}`}
              >
                {row.value}
              </DetailStatusValue>
            ))}
          </div>
        </div>

        <div className="mt-2.5">
          <h2 className="text-ec-black text-[16px] font-semibold">제출 내용</h2>
          <div className="bg-ec-box rounded-ec-10 mt-2.75 flex h-11.5 w-full items-center px-7">
            <div className="text-ec-black font-pretendard w-138.5 max-w-full justify-start text-xs leading-5 font-medium break-all">
              {submissionContent ? (
                isSubmissionLink ? (
                  <a
                    href={submissionContent}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {submissionContent}
                  </a>
                ) : (
                  <span className="whitespace-pre-wrap">
                    {submissionContent}
                  </span>
                )
              ) : (
                <span className="text-ec-sub">
                  제출 내용 정보가 아직 없어요.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentSubmitDetailModal;
