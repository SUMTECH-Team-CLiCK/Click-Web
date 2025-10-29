const SCROLL_RATIO = 0.85;

const updateControlsState = (track, prevButton, nextButton) => {
  if (!track || !prevButton || !nextButton) return;
  const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0);
  const threshold = 4;
  prevButton.disabled = track.scrollLeft <= threshold;
  nextButton.disabled = track.scrollLeft >= maxScrollLeft - threshold;
};

const initTopicSlider = () => {
  const sliderRoot = document.querySelector('[data-slider="topic-insights"]');
  const track = document.getElementById("topic-cards");
  const prevButton = sliderRoot?.querySelector("[data-topic-slider-prev]");
  const nextButton = sliderRoot?.querySelector("[data-topic-slider-next]");

  if (!sliderRoot || !track || !prevButton || !nextButton) {
    return;
  }

  const scrollByAmount = () => track.clientWidth * SCROLL_RATIO;

  let rafId = null;
  const queueUpdate = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      updateControlsState(track, prevButton, nextButton);
      rafId = null;
    });
  };

  if (!sliderRoot.dataset.initialized) {
    prevButton.addEventListener("click", () => {
      track.scrollBy({ left: -scrollByAmount(), behavior: "smooth" });
    });

    nextButton.addEventListener("click", () => {
      track.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
    });

    track.addEventListener("scroll", queueUpdate, { passive: true });

    sliderRoot.dataset.initialized = "true";
  }

  queueUpdate();
};

export const renderTopicInsightsSection = (topics) => {
  const container = document.getElementById("topic-cards");
  if (!container) return;

  container.innerHTML = "";
  container.scrollTo({ left: 0 });

  topics.forEach(({ title, highlight, detail, tip }) => {
    const card = document.createElement("article");
    card.className = "stat-card topic-slide";
    card.setAttribute("role", "listitem");
    card.innerHTML = `
      <span class="stat-card__label">${title}</span>
      <strong class="stat-card__value">${highlight}</strong>
      <p class="stat-card__hint">${detail}</p>
      <p class="stat-card__hint"><strong>Tip:</strong> ${tip}</p>
    `;
    container.appendChild(card);
  });

  initTopicSlider();
};
