import { dashboardData } from "./data/dashboard-data.js";
import { renderDashboard } from "./renderers/dashboard.js";
import { bindDashboardEvents } from "./services/events.js";

const initDashboard = () => {
  renderDashboard(dashboardData);
  bindDashboardEvents(dashboardData);
};

document.addEventListener("DOMContentLoaded", initDashboard);
