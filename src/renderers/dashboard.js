import { renderPersonalSection } from "./personal.js";
import { renderComparisonSection } from "./comparison.js";
import { renderUserBehaviorSection } from "./behavior.js";
import { renderTopicInsightsSection } from "./topics.js";
import { renderPromptReportSection } from "./report.js";
import { renderLeaderboardSection } from "./leaderboard.js";
import { renderCommunitySection } from "./community.js";

export const renderDashboard = (data) => {
  renderPersonalSection(data.personalUsage);
  renderComparisonSection(data.beforeAfter);
  renderUserBehaviorSection(data.userBehavior);
  renderTopicInsightsSection(data.topicInsights);
  renderPromptReportSection(data.promptReport);
  renderLeaderboardSection(data.leaderboard);
  renderCommunitySection(data.community);
};
