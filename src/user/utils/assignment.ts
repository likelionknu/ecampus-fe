export const formatAssignmentStatus = (status: string | null | undefined) => {
  switch (status) {
    case "SUBMITTED":
      return "제출 완료";
    case "NOT_SUBMITTED":
      return "미제출";
    default:
      return "-";
  }
};

export const formatEvaluateStatus = (status: string | null | undefined) => {
  switch (status) {
    case "PASS":
      return "통과";
    case "FAIL":
      return "탈락";
    default:
      return "-";
  }
};
