import axios from "axios";
import { AuthFlowError, createAuthErrorInfo } from "@auth/utils/authErrors";
import { getApiBaseUrl } from "@auth/utils/googleOAuth";
import type {
  ApiResponse,
  GoogleLoginRequest,
  GoogleLoginResponseData,
} from "@auth/types/auth";

export async function loginWithGoogleCode({
  code,
}: GoogleLoginRequest): Promise<GoogleLoginResponseData> {
  const response = await axios.post<ApiResponse<GoogleLoginResponseData>>(
    `${getApiBaseUrl()}/v1/auth/login`,
    { code },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.data.data) {
    throw new AuthFlowError(
      createAuthErrorInfo({
        code: response.data.error.code,
        message: response.data.error.message,
        status: response.status,
      }),
    );
  }

  return response.data.data;
}
