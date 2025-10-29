const charts = new Map();

const getContext = (canvasId) => {
  const canvas = document.getElementById(canvasId);
  return canvas ? canvas.getContext("2d") : null;
};

export const destroyChart = (chartId) => {
  const existing = charts.get(chartId);
  if (existing) {
    const { canvas } = existing;
    const parent = canvas?.parentElement;
    existing.destroy();
    if (parent) {
      parent.querySelectorAll(".chartjs-size-monitor, .chartjs-render-monitor").forEach((node) => {
        node.remove();
      });
      canvas.removeAttribute("style");
      canvas.width = canvas.width;
      canvas.height = canvas.height;
    }
    charts.delete(chartId);
  }
};

export const renderChart = (chartId, config) => {
  const ctx = getContext(chartId);
  if (!ctx || !window.Chart) return null;

  destroyChart(chartId);
  const chart = new window.Chart(ctx, config);
  charts.set(chartId, chart);
  return chart;
};

export const getChart = (chartId) => charts.get(chartId) ?? null;
