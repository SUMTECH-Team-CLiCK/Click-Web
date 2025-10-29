import { loginUser } from "../services/auth.js";
import { setAuthState } from "../services/auth-state.js";

const form = document.getElementById("login-form");
const submitButton = document.getElementById("login-submit");
const errorMessage = document.getElementById("login-error");
const requestViewer = document.getElementById("server-request");
const responseViewer = document.getElementById("server-response");
const logViewer = document.getElementById("server-log");

const formatJSON = (value) => JSON.stringify(value, null, 2);

const setStatusMessage = (message, { success = false } = {}) => {
  if (!errorMessage) return;
  errorMessage.textContent = message ?? "";
  errorMessage.classList.toggle("is-success", success);
};

const renderServerFeedback = ({ endpoint, payload, response }) => {
  if (requestViewer) {
    requestViewer.textContent = formatJSON({
      endpoint,
      method: "POST",
      payload,
    });
  }

  if (responseViewer) {
    responseViewer.textContent = formatJSON({
      status: response.status,
      body: response.body,
    });
  }

  if (logViewer) {
    logViewer.textContent = Array.isArray(response.log)
      ? response.log.join("\n")
      : "-";
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!form || !submitButton) return;

  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = { email, password };

  renderServerFeedback({
    endpoint: "https://api.promptinsight.dev.auth/login",
    payload,
    response: { status: "pending", body: "(대기 중)", log: [] },
  });
  setStatusMessage("");

  submitButton.disabled = true;
  submitButton.textContent = "로그인 중...";

  try {
    const result = await loginUser(payload);

    renderServerFeedback({
      endpoint: result.endpoint,
      payload,
      response: result,
    });

    setStatusMessage("로그인 성공!", { success: true });

    const authState = {
      endpoint: result.endpoint,
      user: result.body.user,
      tokens: {
        accessToken: result.body.accessToken,
        refreshToken: result.body.refreshToken,
        expiresIn: result.body.expiresIn,
      },
      lastSyncedAt: new Date().toISOString(),
    };
    setAuthState(authState);

    setTimeout(() => {
      window.location.href = "./index.html";
    }, 1000);
  } catch (error) {
    const response = error?.response ?? { status: 500, body: { error: "unknown_error" }, log: [] };
    renderServerFeedback({
      endpoint: "https://api.promptinsight.dev.auth/login",
      payload,
      response,
    });

    const message =
      response.body?.message ??
      (error?.message === "LOGIN_FAILED" ? "로그인에 실패했습니다." : "예상치 못한 오류가 발생했습니다.");
    setStatusMessage(message);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "로그인";
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
