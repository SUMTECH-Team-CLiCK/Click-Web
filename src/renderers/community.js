import { renderChart } from "../utils/chart-manager.js";

const renderTrendingTopicsChart = (topics) => {
  renderChart("community-topics-chart", {
    type: "doughnut",
    data: {
      labels: topics.map(({ topic }) => topic),
      datasets: [
        {
          data: topics.map(({ share }) => share),
          backgroundColor: [
            "rgba(88, 80, 236, 0.85)",
            "rgba(239, 93, 168, 0.85)",
            "rgba(22, 177, 169, 0.85)",
            "rgba(249, 115, 22, 0.85)",
            "rgba(99, 102, 241, 0.85)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 14,
            boxHeight: 14,
            padding: 16,
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.parsed}%`,
          },
        },
      },
    },
  });
};

export const renderCommunitySection = (community) => {
  renderTrendingTopicsChart(community.trendingTopics);

  const demographicContainer = document.getElementById("demographic-keywords");
  if (demographicContainer) {
    demographicContainer.innerHTML = "";
    community.demographicKeywords.forEach(({ segment, keywords }) => {
      const card = document.createElement("div");
      card.className = "demographic-card";
      card.innerHTML = `
        <span class="demographic-card__title">${segment}</span>
        <span>${keywords.map((keyword) => `#${keyword}`).join("  ")}</span>
      `;
      demographicContainer.appendChild(card);
    });
  }
};
