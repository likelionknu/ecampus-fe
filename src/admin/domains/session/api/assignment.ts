import axios from "axios";
import { api } from "@/shared/apis";

interface SessionApiErrorPayload {
  code: string | null;
  message: string | null;
}

export interface SessionApiResponse<T> {
  data: T | null;
  error: SessionApiErrorPayload;
}

export interface CreateSessionAssignmentRequest {
  sid: number;
  sessionId: number;
  endAt: string;
  name: string;
  content: string;
}

const CREATE_SESSION_ASSIGNMENT_ERROR_MESSAGE_BY_CODE: Record<string, string> = {
  C404: "정보를 찾을 수 없습니다.",
  C403: "정보 조회를 위한 권한이 부족합니다.",
  C401: "인증되지 않은 사용자입니다.",
  C500: "서버 내부 오류가 발생하였습니다.",
};

const CREATE_SESSION_ASSIGNMENT_ERROR_MESSAGE_BY_STATUS: Record<
  number,
  string
> = {
  404: CREATE_SESSION_ASSIGNMENT_ERROR_MESSAGE_BY_CODE.C404,
  403: CREATE_SESSION_ASSIGNMENT_ERROR_MESSAGE_BY_CODE.C403,
  401: CREATE_SESSION_ASSIGNMENT_ERROR_MESSAGE_BY_CODE.C401,
  500: CREATE_SESSION_ASSIGNMENT_ERROR_MESSAGE_BY_CODE.C500,
};

const DEFAULT_CREATE_SESSION_ASSIGNMENT_ERROR_MESSAGE =
  "과제 등록 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.";

export async function createSessionAssignment({
  sid,
  ...payload
}: CreateSessionAssignmentRequest) {
  const response = await api.post<SessionApiResponse<null>>(
    `/v1/admin/sessions/${sid}/assignments`,
    payload,
  );

  return response.data;
}

export function getCreateSessionAssignmentErrorMessage(error: unknown) {
  if (axios.isAxiosError<SessionApiResponse<null>>(error)) {
    const backendError = error.response?.data?.error;

    return (
      backendError?.message?.trim() ||
      (backendError?.code
        ? CREATE_SESSION_ASSIGNMENT_ERROR_MESSAGE_BY_CODE[backendError.code]
        : undefined) ||
      (error.response?.status
        ? CREATE_SESSION_ASSIGNMENT_ERROR_MESSAGE_BY_STATUS[
            error.response.status
          ]
        : undefined) ||
      error.message ||
      DEFAULT_CREATE_SESSION_ASSIGNMENT_ERROR_MESSAGE
    );
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return DEFAULT_CREATE_SESSION_ASSIGNMENT_ERROR_MESSAGE;
}
