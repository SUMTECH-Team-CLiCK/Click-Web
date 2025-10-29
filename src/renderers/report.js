export const renderPromptReportSection = (reports) => {
  const container = document.getElementById("prompt-report-table");
  if (!container) return;

  container.innerHTML = "";
  reports.forEach(({ title, score, original, improved, notes }) => {
    const row = document.createElement("article");
    row.className = "prompt-row";
    row.innerHTML = `
      <div class="prompt-row__header">
        <h3>${title}</h3>
        <span class="prompt-row__score">점수 ${score} / 100</span>
      </div>
      <div class="prompt-row__body">
        <div>
          <small>원본 프롬프트</small>
          <pre class="prompt-box">${original}</pre>
        </div>
        <div>
          <small>개선된 프롬프트</small>
          <pre class="prompt-box">${improved}</pre>
        </div>
      </div>
      <div class="prompt-row__footer">
        ${notes.map((note) => `<span>• ${note}</span>`).join("")}
      </div>
    `;
    container.appendChild(row);
  });
};
