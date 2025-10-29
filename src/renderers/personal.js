import { renderChart } from "../utils/chart-manager.js";
import { formatNumber, formatPercent } from "../utils/formatters.js";

const renderStats = (personalUsage) => {
  const container = document.getElementById("personal-stats");
  if (!container) return;
  container.innerHTML = "";

  const { totalPrompts, improvedPrompts, averageScore, improvementRate, avgResponseTokens, period } =
    personalUsage;

  const items = [
    {
      label: "총 프롬프트 수",
      value: formatNumber(totalPrompts),
      hint: period,
    },
    {
      label: "개선된 프롬프트",
      value: formatNumber(improvedPrompts),
      hint: `개선률 ${formatPercent(improvementRate)}`,
    },
    {
      label: "평균 품질 점수",
      value: averageScore,
      hint: "100점 만점",
    },
    {
      label: "평균 응답 토큰",
      value: formatNumber(avgResponseTokens),
      hint: "대화당",
    },
  ];

  items.forEach(({ label, value, hint }) => {
    const node = document.createElement("article");
    node.className = "stat-card";
    node.innerHTML = `
      <span class="stat-card__label">${label}</span>
      <strong class="stat-card__value">${value}</strong>
      <span class="stat-card__hint">${hint}</span>
    `;
    container.appendChild(node);
  });
};

const renderCategoryRatioChart = (categories) => {
  const palette = ["#5850ec", "#ef5da8", "#16b1a9", "#f97316", "#6366f1"];
  renderChart("category-ratio-chart", {
    type: "bar",
    data: {
      labels: categories.map(({ label }) => label),
      datasets: [
        {
          label: "카테고리 사용 비율 (%)",
          data: categories.map(({ ratio }) => ratio),
          borderRadius: 12,
          backgroundColor: categories.map((_, index) => palette[index % palette.length]),
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            callback: (value) => `${value}%`,
          },
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const growth = categories[context.dataIndex]?.weeklyGrowth ?? 0;
              return `${context.parsed.x}% · 주간 +${growth}%`;
            },
          },
        },
      },
    },
  });
};

const parsePercentValue = (value) => {
  if (typeof value === "number") return value;
  const parsed = parseFloat(String(value).replace(/[+%]/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
};

const renderImprovementTrendChart = (trend) => {
  const hintsContainer = document.getElementById("improvement-trend-hints");
  if (hintsContainer) {
    hintsContainer.innerHTML = "";
    trend.forEach(({ label, value, hint }) => {
      const item = document.createElement("li");
      item.textContent = `${label}: ${value} (${hint})`;
      hintsContainer.appendChild(item);
    });
  }

  renderChart("improvement-trend-chart", {
    type: "bar",
    data: {
      labels: trend.map(({ label }) => label),
      datasets: [
        {
          label: "개선 지표 변화율 (%)",
          data: trend.map(({ value }) => parsePercentValue(value)),
          backgroundColor: trend.map(({ value }) =>
            String(value).includes("-") ? "rgba(239, 93, 168, 0.6)" : "rgba(88, 80, 236, 0.7)"
          ),
          borderRadius: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (val) => `${val}%`,
          },
          grid: {
            color: "rgba(148, 163, 184, 0.15)",
          },
        },
        x: {
          grid: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.parsed.y}%`,
          },
        },
      },
    },
  });
};

export const renderPersonalSection = (personalUsage) => {
  renderStats(personalUsage);
  renderCategoryRatioChart(personalUsage.categories);
  renderImprovementTrendChart(personalUsage.trend);
};
