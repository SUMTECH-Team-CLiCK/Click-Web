import { mockAuthServer } from "../server/mock-auth-server.js";

const MOCK_ENDPOINT = "https://api.promptinsight.dev.auth/login";

/**
 * 샘플 로그인 함수.
 * 실제 연동 시 아래 fetch 부분을 서버 인증 API 호출로 교체하세요.
 */
export const loginUser = async ({ email, password }) => {
  const requestPayload = { email, password };

  // TODO: replace with real fetch call, e.g.:
  // const response = await fetch(MOCK_ENDPOINT, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(requestPayload),
  //   credentials: "include", // 세션 기반 인증 시 필요
  // });
  // const json = await response.json();
  // if (!response.ok) {
  //   const error = new Error("LOGIN_FAILED");
  //   error.response = { status: response.status, body: json };
  //   throw error;
  // }
  // return { endpoint: MOCK_ENDPOINT, status: response.status, body: json, log: [] };

  const serverResult = await mockAuthServer.login(requestPayload);

  if (!serverResult.ok) {
    const error = new Error("LOGIN_FAILED");
    error.response = serverResult;
    throw error;
  }

  return {
    endpoint: MOCK_ENDPOINT,
    ...serverResult,
  };
};
