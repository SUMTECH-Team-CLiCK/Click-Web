const USERS = {
  "demo@test.dev": {
    id: "user-demo",
    name: "Demo User",
    password: "test",
    roles: ["analyst"],
    lastLogin: "2024-05-12T09:18:00.000Z",
  },
};

const generateId = (prefix) => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2)}${Date.now()}`;
};

const ISSUE_TOKEN = () => ({
  accessToken: generateId("mock-access-token"),
  refreshToken: generateId("mock-refresh-token"),
  expiresIn: 60 * 60,
});

export const mockAuthServer = {
  /**
   * 로그인 요청을 처리하는 모의 서버입니다.
   * 실제 서버에서는 DB 조회, 비밀번호 해시 비교, 토큰 발급 등의 로직이 수행됩니다.
   */
  async login(requestPayload) {
    const log = [];
    const startedAt = new Date().toISOString();
    log.push(`[${startedAt}] 요청 수신: ${JSON.stringify(requestPayload)}`);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const { email, password } = requestPayload ?? {};

    if (!email || !password) {
      const failure = {
        ok: false,
        status: 400,
        body: {
          error: "invalid_request",
          message: "email과 password는 필수입니다.",
        },
        log: [...log, "필수 필드 누락으로 요청 종료"],
      };
      return failure;
    }

    const record = USERS[email];
    log.push(`사용자 조회 결과: ${record ? "존재" : "없음"}`);

    if (!record || record.password !== password) {
      const failure = {
        ok: false,
        status: 401,
        body: {
          error: "invalid_credentials",
          message: "이메일 또는 비밀번호가 올바르지 않습니다.",
        },
        log: [...log, "비밀번호 불일치로 인증 실패"],
      };
      return failure;
    }

    const tokens = ISSUE_TOKEN();
    const succeededAt = new Date().toISOString();
    log.push(`토큰 발급 완료: accessToken=${tokens.accessToken.slice(0, 12)}...`);

    return {
      ok: true,
      status: 200,
      body: {
        user: {
          id: record.id,
          name: record.name,
          email,
          roles: record.roles,
          lastLogin: record.lastLogin,
        },
        ...tokens,
      },
      log: [...log, `[${succeededAt}] 응답 전송`],
    };
  },
};
