// bubble-sort.js
(function () {
  const N        = 40;                      // number of bars
  const canvas   = document.getElementById('sortCanvas');
  const ctx      = canvas.getContext('2d');
  const shuffle  = document.getElementById('shuffle');
  const run      = document.getElementById('run');

  let data = [];
  let intervalId = null;

  // ---------- core helpers ----------
  function randomize() {
    data = Array.from({ length: N }, (_, i) => i + 1)
                .sort(() => Math.random() - 0.5);
    draw();
  }

  function draw(highlightA = -1, highlightB = -1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barW = canvas.width / N;
    data.forEach((val, i) => {
      const h = (val / N) * canvas.height;
      ctx.fillStyle = (i === highlightA || i === highlightB) ? '#e63946' : '#457b9d';
      ctx.fillRect(i * barW, canvas.height - h, barW - 2, h);
    });
  }

  // ---------- bubble-sort animation ----------
  async function bubbleSort() {
    Anim.lockControls(true);
    run.disabled = true;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N - i - 1; j++) {
        draw(j, j + 1);
        await sleep(30);                   // 30 ms pause per comparison
        if (data[j] > data[j + 1]) {
          [data[j], data[j + 1]] = [data[j + 1], data[j]];
          draw(j, j + 1);
          await sleep(30);
        }
      }
    }
    draw();
    run.disabled = false;
    Anim.lockControls(false);
  }

  const sleep = Anim.sleep;

  // ---------- wire-up ----------
  shuffle.onclick = randomize;
  run.onclick     = () => !run.disabled && bubbleSort();

  // initial state
  randomize();
})();
