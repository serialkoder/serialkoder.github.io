// assets/flashcards.js
(function () {
  const DECK_KEY = 'flashdeck:' + window.location.pathname;
  const seen = JSON.parse(localStorage.getItem(DECK_KEY) || '{}');

  /* ── initialise: colour cards already reviewed ── */
  Object.keys(seen).forEach(idx => {
    const card = document.querySelector(`details[data-idx="${idx}"]`);
    if (card) card.classList.add('done');   // keep green even if closed
  });

  /* ── mark a card as done the first time it’s opened ── */
  document.addEventListener(
    'toggle',
    e => {
      const card = e.target;
      if (card.tagName !== 'DETAILS') return;
      const idx = card.dataset.idx;

      /* only add; never remove */
      if (card.open && !seen[idx]) {
        seen[idx] = true;
        card.classList.add('done');
        localStorage.setItem(DECK_KEY, JSON.stringify(seen));
      }
    },
    true
  );

  /* ── reset button clears everything ── */
  const resetBtn = document.getElementById('reset-deck');
  if (resetBtn)
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem(DECK_KEY);
      document
        .querySelectorAll('details.card')
        .forEach(d => d.classList.remove('done'));
    });
})();
