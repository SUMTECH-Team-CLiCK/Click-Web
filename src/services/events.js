import { exportDashboardCsv, exportDashboardJson } from "./exporters.js";
import { AUTH_STORAGE_KEY, clearAuthState, getAuthState } from "./auth-state.js";

const formatTokenPreview = (token) => {
  if (!token) return "-";
  return `${token.slice(0, 10)}…${token.slice(-6)}`;
};

const updateAuthUI = () => {
  const loginButton = document.getElementById("login-button");
  const statusContainer = document.getElementById("user-status");
  if (!loginButton || !statusContainer) return;

  const authState = getAuthState();

  if (authState) {
    const displayName = authState.user?.name || authState.user?.email || "사용자";
    loginButton.textContent = `로그아웃 (${displayName})`;
    loginButton.classList.remove("btn--primary");
    loginButton.classList.add("btn--secondary");

    statusContainer.innerHTML = `
      <span>로그인 유지 중</span>
      <strong>${displayName}</strong>
      <span class="user-status__meta">${authState.user?.roles?.join(", ") ?? "standard user"}</span>
      <span class="user-status__token">token: ${formatTokenPreview(authState.tokens?.accessToken)}</span>
    `;
    statusContainer.hidden = false;
  } else {
    loginButton.textContent = "로그인";
    loginButton.classList.add("btn--primary");
    loginButton.classList.remove("btn--secondary");

    statusContainer.hidden = true;
    statusContainer.innerHTML = "";
  }
};

const navigateToLogin = () => {
  window.location.href = "./login.html";
};

const handleAuthButtonClick = () => {
  const authState = getAuthState();
  if (authState) {
    clearAuthState();
    updateAuthUI();
    alert("로그아웃되었습니다.");
    return;
  }

  navigateToLogin();
};

const withButtonState = async (button, pendingLabel, action) => {
  if (!button) return;
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = pendingLabel;
  try {
    await action();
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
};

const handleExportError = (error) => {
  const response = error?.response;
  const message =
    response?.body?.message ??
    (error?.message === "EXPORT_FAILED"
      ? "내보내기 요청이 실패했습니다. 로그인 상태를 확인해주세요."
      : "내보내기 중 오류가 발생했습니다.");
  alert(message);
};

export const bindDashboardEvents = (data) => {
  const refreshButton = document.getElementById("refresh-data");
  const exportJsonButton = document.getElementById("export-json");
  const exportCsvButton = document.getElementById("export-csv");
  const loginButton = document.getElementById("login-button");

  if (refreshButton) {
    refreshButton.addEventListener("click", () => {
      alert("데이터가 업로드 되었습니다.");
    });
  }

  if (exportJsonButton) {
    exportJsonButton.addEventListener("click", () =>
      withButtonState(exportJsonButton, "JSON 생성 중...", async () => {
        try {
          await exportDashboardJson(data);
        } catch (error) {
          handleExportError(error);
        }
      })
    );
  }

  if (exportCsvButton) {
    exportCsvButton.addEventListener("click", () =>
      withButtonState(exportCsvButton, "CSV 생성 중...", async () => {
        try {
          await exportDashboardCsv(data);
        } catch (error) {
          handleExportError(error);
        }
      })
    );
  }

  if (loginButton) {
    loginButton.addEventListener("click", handleAuthButtonClick);
  }

  window.addEventListener("storage", (event) => {
    if (event.key === AUTH_STORAGE_KEY) {
      updateAuthUI();
    }
  });

  updateAuthUI();
};
