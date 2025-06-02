// assets/flashcards.js
(function () {
  /* Keyed per-deck so progress is isolated */
  const DECK_KEY = 'flashdeck:' + window.location.pathname;

  /* Load saved state { "1": true, "3": true, … } */
  const seen = JSON.parse(localStorage.getItem(DECK_KEY) || '{}');

  /* Mark any previously-read cards on load */
  Object.keys(seen).forEach(idx => {
    const card = document.querySelector(`details[data-idx="${idx}"]`);
    if (card) card.setAttribute('open', '');
    if (card) card.classList.add('done');
  });

  /* Toggle handler: when a card is opened, remember it */
  document.addEventListener('toggle', e => {
    const card = e.target;
    if (card.tagName !== 'DETAILS') return;

    const idx = card.dataset.idx;
    if (card.open) {
      seen[idx] = true;               // mark read
      card.classList.add('done');
    } else {
      delete seen[idx];               // user closed it → forget
      card.classList.remove('done');
    }
    localStorage.setItem(DECK_KEY, JSON.stringify(seen));
  }, true);

  /* Reset button clears state & collapses all cards */
  const resetBtn = document.getElementById('reset-deck');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    localStorage.removeItem(DECK_KEY);
    document.querySelectorAll('details.card').forEach(d => {
      d.open = false;
      d.classList.remove('done');
    });
  });
})();
