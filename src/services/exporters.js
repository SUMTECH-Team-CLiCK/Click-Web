import { getAuthState } from "./auth-state.js";
import { mockExportServer } from "../server/mock-export-server.js";

const getExportLogViewer = () => document.getElementById("export-log");

const setExportLog = (payload, response) => {
  const viewer = getExportLogViewer();
  if (!viewer) return;

  viewer.textContent = JSON.stringify(
    {
      requestedAt: payload.requestedAt,
      format: payload.format,
      requester: payload.requester,
      filters: payload.filters,
      server: {
        status: response.status,
        ok: response.ok,
        body: response.body,
        log: response.log,
      },
    },
    null,
    2
  );
};

const downloadBlob = (content, type, filename) => {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  requestAnimationFrame(() => {
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  });
};

const buildRequestPayload = (format, dataset) => {
  const auth = getAuthState();
  return {
    format,
    requestedAt: new Date().toISOString(),
    token: auth?.tokens?.accessToken ?? null,
    requester: auth
      ? {
          id: auth.user?.id ?? null,
          email: auth.user?.email ?? null,
          roles: auth.user?.roles ?? [],
        }
      : null,
    filters: {
      range: "last_30_days",
    },
    dataset,
  };
};

const handleServerResponse = (payload, response) => {
  setExportLog(payload, response);

  if (!response.ok) {
    const error = new Error("EXPORT_FAILED");
    error.response = response;
    throw error;
  }

  downloadBlob(response.content, response.contentType, response.filename);
};

export const exportDashboardJson = async (data) => {
  const payload = buildRequestPayload("json", data);
  const response = await mockExportServer.generateJsonExport(payload);
  handleServerResponse(payload, response);
};

export const exportDashboardCsv = async (data) => {
  const payload = buildRequestPayload("csv", data);
  const response = await mockExportServer.generateCsvExport(payload);
  handleServerResponse(payload, response);
};
