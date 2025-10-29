import { flattenEntries } from "../utils/data-utils.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ensureAuthorized = (payload, log) => {
  const hasToken = Boolean(payload?.token);
  if (!hasToken) {
    log.push("⚠️  인증 토큰이 없어 요청 거부");
  }
  return hasToken;
};

const getDatasetSummary = (dataset) => {
  if (!dataset) return {};
  return {
    totalPrompts: dataset.personalUsage?.totalPrompts ?? 0,
    improvedPrompts: dataset.personalUsage?.improvedPrompts ?? 0,
    categories: dataset.personalUsage?.categories?.length ?? 0,
    topics: dataset.topicInsights?.length ?? 0,
    leaderKeywords: dataset.leaderboard?.keywords?.length ?? 0,
  };
};

const buildFilename = (format) => {
  const stamp = new Date().toISOString().slice(0, 10);
  return `prompt-insight-export-${stamp}.${format}`;
};

const buildCsvContent = (dataset) => {
  const entries = flattenEntries(dataset).map(({ key, value }) => [
    `"${key}"`,
    `"${String(value).replace(/"/g, '""')}"`,
  ]);
  entries.unshift(['"metric"', '"value"']);
  return entries.map((row) => row.join(",")).join("\n");
};

const successResponse = ({ payload, format, content, log }) => ({
  ok: true,
  status: 200,
  filename: buildFilename(format),
  contentType: format === "json" ? "application/json" : "text/csv",
  content,
  log,
  body: {
    message: "export_ready",
    summary: getDatasetSummary(payload.dataset),
    requester: payload.requester ?? null,
  },
});

const unauthorizedResponse = (log) => ({
  ok: false,
  status: 401,
  body: {
    error: "unauthorized",
    message: "인증 정보가 없어 내보내기를 진행할 수 없습니다.",
  },
  log,
});

export const mockExportServer = {
  async generateJsonExport(payload) {
    const log = [];
    log.push(`[${new Date().toISOString()}] JSON export 요청 수신`);
    log.push(`요청자: ${payload?.requester?.email ?? "anonymous"}`);
    log.push(`필터: ${JSON.stringify(payload?.filters ?? {})}`);

    await delay(600);

    if (!ensureAuthorized(payload, log)) {
      return unauthorizedResponse(log);
    }

    log.push("인증 토큰 확인 완료");

    const content = JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        dataset: payload.dataset,
      },
      null,
      2
    );

    log.push("데이터 직렬화 완료");
    return successResponse({ payload, format: "json", content, log });
  },

  async generateCsvExport(payload) {
    const log = [];
    log.push(`[${new Date().toISOString()}] CSV export 요청 수신`);
    log.push(`요청자: ${payload?.requester?.email ?? "anonymous"}`);
    log.push(`필터: ${JSON.stringify(payload?.filters ?? {})}`);

    await delay(600);

    if (!ensureAuthorized(payload, log)) {
      return unauthorizedResponse(log);
    }

    log.push("인증 토큰 확인 완료");
    const content = buildCsvContent(payload.dataset);
    log.push(`총 ${content.split("\n").length - 1}개의 키를 CSV로 변환`);
    return successResponse({ payload, format: "csv", content, log });
  },
};
