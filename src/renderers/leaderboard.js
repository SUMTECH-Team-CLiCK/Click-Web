import { formatPercent } from "../utils/formatters.js";

export const renderLeaderboardSection = (leaderboard) => {
  const typeList = document.getElementById("top-prompt-types");
  const keywordList = document.getElementById("top-keywords");

  if (typeList) {
    typeList.innerHTML = "";
    leaderboard.promptTypes.forEach(({ label, improvement }) => {
      const item = document.createElement("li");
      item.textContent = `${label} · 개선율 ${formatPercent(improvement)}`;
      typeList.appendChild(item);
    });
  }

  if (keywordList) {
    keywordList.innerHTML = "";
    leaderboard.keywords.forEach(({ label, lift }) => {
      const item = document.createElement("li");
      item.textContent = `${label} · 활용도 +${lift}%`;
      keywordList.appendChild(item);
    });
  }
};
