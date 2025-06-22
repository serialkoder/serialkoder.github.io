// assets/exercises.js
console.log('✨ exercises.js live', Date.now());

(function () {
  function toggleAnswer(btn) {
    const box = btn.closest('article').querySelector('.answer');
    if (!box) { console.warn('No .answer found'); return; }

    const hidden = box.hasAttribute('hidden');
    hidden ? box.removeAttribute('hidden')
           : box.setAttribute('hidden', '');
    btn.textContent = hidden ? 'Hide answer' : 'Show answer';
  }

  /* 1️⃣  Optional: still export so old onclick works */
  window.toggleAnswer = toggleAnswer;

  /* 2️⃣  One global listener — works even with nested <span> clicks */
  document.addEventListener('click', e => {
    const btn = e.target.closest('button.show-answer');
    if (btn) toggleAnswer(btn);
  });
})();
