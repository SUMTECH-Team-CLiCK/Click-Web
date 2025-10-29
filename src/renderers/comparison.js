const formatDelta = (before, after, unit) => {
  if (typeof before !== "number" || typeof after !== "number") {
    return "-";
  }

  const delta = after - before;
  const formatted = Number.isInteger(delta) ? delta : delta.toFixed(1);
  const sign = delta > 0 ? "+" : "";
  return `${sign}${formatted}${unit}`;
};

export const renderComparisonSection = (items) => {
  const container = document.getElementById("before-after-table");
  if (!container) return;

  container.innerHTML = "";
  items.forEach(({ metric, before, after, unit }) => {
    const row = document.createElement("div");
    row.className = "comparison-row";
    row.innerHTML = `
      <span class="comparison-row__metric">${metric}</span>
      <span>${before}${unit}</span>
      <span>${after}${unit}</span>
      <span class="comparison-row__delta">${formatDelta(before, after, unit)}</span>
    `;
    container.appendChild(row);
  });
};
