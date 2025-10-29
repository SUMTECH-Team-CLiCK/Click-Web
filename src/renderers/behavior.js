import { renderChart } from "../utils/chart-manager.js";

const renderActiveHoursChart = (activeHours) => {
  renderChart("active-hours-chart", {
    type: "line",
    data: {
      labels: activeHours.map(({ label }) => label),
      datasets: [
        {
          label: "시간대별 사용 횟수",
          data: activeHours.map(({ value }) => value),
          borderColor: "rgba(88, 80, 236, 0.8)",
          backgroundColor: "rgba(88, 80, 236, 0.2)",
          tension: 0.35,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: "rgba(88, 80, 236, 0.9)",
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
            stepSize: 10,
            callback: (value) => `${value}회`,
          },
          grid: {
            color: "rgba(148, 163, 184, 0.16)",
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
            label: (context) => `${context.parsed.y}회`,
          },
        },
      },
    },
  });
};

export const renderUserBehaviorSection = (behavior) => {
  const patternsContainer = document.getElementById("user-patterns");
  const faqContainer = document.getElementById("faq-topics");

  if (patternsContainer) {
    patternsContainer.innerHTML = "";
    behavior.patterns.forEach(({ user, pattern, focus }) => {
      const item = document.createElement("div");
      item.className = "list-item";
      item.innerHTML = `
        <span class="list-item__title">${user}</span>
        <span>${pattern}</span>
        <span class="badge">${focus}</span>
      `;
      patternsContainer.appendChild(item);
    });
  }

  if (faqContainer) {
    faqContainer.innerHTML = "";
    behavior.faqTopics.forEach(({ topic, count }) => {
      const item = document.createElement("li");
      item.className = "tag";
      item.textContent = `${topic} · ${count}회`;
      faqContainer.appendChild(item);
    });
  }

  renderActiveHoursChart(behavior.activeHours);
};
