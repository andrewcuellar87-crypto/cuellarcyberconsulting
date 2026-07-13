(() => {
  'use strict';

  function initCaseStudyFilters() {
    const buttons = Array.from(document.querySelectorAll('.filter[data-filter]'));
    const cards = Array.from(document.querySelectorAll('.case-card[data-tags]'));

    if (!buttons.length || !cards.length) return;

    function applyFilter(filterValue) {
      buttons.forEach((button) => {
        const isActive = button.dataset.filter === filterValue;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });

      cards.forEach((card) => {
        const tags = (card.dataset.tags || '').split(/\s+/).filter(Boolean);
        const isVisible = filterValue === 'all' || tags.includes(filterValue);
        card.hidden = !isVisible;
        card.style.display = isVisible ? '' : 'none';
      });
    }

    buttons.forEach((button) => {
      // Defensive: keep valid button behavior even if markup is copied elsewhere.
      if (!button.hasAttribute('type')) button.setAttribute('type', 'button');
      button.setAttribute('aria-pressed', String(button.classList.contains('active')));

      button.addEventListener('click', (event) => {
        // Standard click fires for mouse, keyboard activation, and iOS Safari taps.
        // Do not bind to hover/mouse/pointer-only events.
        const filterValue = event.currentTarget.dataset.filter || 'all';
        applyFilter(filterValue);
      });
    });

    const initiallyActive = buttons.find((button) => button.classList.contains('active')) || buttons[0];
    applyFilter(initiallyActive.dataset.filter || 'all');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCaseStudyFilters, { once: true });
  } else {
    initCaseStudyFilters();
  }
})();
