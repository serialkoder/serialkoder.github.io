/* assets/matchcards.js */
(function () {
  const deck = document.getElementById('match-deck');
  if (!deck) return;

  let selectedLeft = null;
  const matches    = {};                          // { leftText: rightText }
  const checkBtn   = document.getElementById('check-match');
  const resetBtn   = document.getElementById('reset-match');

  /* click to build pairs */
  deck.addEventListener('click', e => {
    const el = e.target;
    if (!el.classList.contains('card')) return;

    if (el.classList.contains('left')) {          // pick a source term
      if (selectedLeft) selectedLeft.classList.remove('active');
      selectedLeft = el;
      el.classList.add('active');
    }

    if (el.classList.contains('right') && selectedLeft) { // confirm pair
      matches[selectedLeft.dataset.left] = el.dataset.right;
      selectedLeft.classList.add('paired');
      el.classList.add('paired');
      selectedLeft.classList.remove('active');
      selectedLeft = null;
      checkBtn.disabled = false;
    }
  });

  /* evaluate */
  checkBtn.addEventListener('click', () => {
    document.querySelectorAll('.card.left').forEach(leftEl => {
      const expected = leftEl.dataset.left;
      const matched  = matches[expected];
      if (!matched) return;

      const rightEl = document.querySelector(`.card.right[data-right="${matched}"]`);
      const correct = deck.querySelector(
        `.card.right[data-right="${expected === matched ? matched : ''}"]`
      );

      if (rightEl && rightEl.dataset.right === matched && expected) {
        leftEl.classList.add('correct');
        rightEl.classList.add('correct');
      } else {
        leftEl.classList.add('wrong');
        rightEl?.classList.add('wrong');
      }
    });
    checkBtn.disabled = true;
  });

  /* reset */
  resetBtn.addEventListener('click', () => location.reload());
})();
