// radix-sort.js  – visual LSD radix sort (base-10)
(function () {
  const SIZE       = 20;    // elements in the array
  const MAX_VALUE  = 999;   // three-digit max
  const DELAY_SCAN = 140;   // ms each scatter step
  const DELAY_PASS = 500;   // pause between digit passes

  const arrayDiv   = document.getElementById('radix-array');
  const buckets    = Array.from(document.querySelectorAll('.bucket-row'));
  const shuffleBtn = document.getElementById('radix-shuffle');
  const runBtn     = document.getElementById('radix-run');

  let data = [];

  // ---------- helpers ----------
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function randomize () {
    data = Array.from({ length: SIZE }, () =>
      Math.floor(Math.random() * (MAX_VALUE + 1))
    );
    renderArray();
    clearBuckets();
  }

  function renderArray (highlight = -1) {
    arrayDiv.innerHTML = '';
    data.forEach((val, i) => {
      const cell = document.createElement('div');
      cell.className = 'cell' + (i === highlight ? ' highlight' : '');
      cell.textContent = val;
      arrayDiv.appendChild(cell);
    });
  }

  function clearBuckets () {
    buckets.forEach(row => row.querySelectorAll('.cell').forEach(c => c.remove()));
  }

  // ---------- radix-sort animation ----------
  async function radixSort () {
    runBtn.disabled = true;

    const maxDigits = Math.max(...data).toString().length;

    for (let exp = 1; exp <= 10 ** (maxDigits - 1); exp *= 10) {
      clearBuckets();

      // --- scatter phase ---
      for (let i = 0; i < data.length; i++) {
        renderArray(i);                      // highlight in main array
        const digit = Math.floor(data[i] / exp) % 10;

        // drop into bucket
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = data[i];
        buckets[digit].appendChild(cell);

        await sleep(DELAY_SCAN);
      }

      // --- gather phase ---
      const next = [];
      for (let d = 0; d < 10; d++) {
        const cells = buckets[d].querySelectorAll('.cell');
        cells.forEach(c => next.push(+c.textContent));
      }
      data = next;
      renderArray();                          // show new order
      await sleep(DELAY_PASS);
    }

    clearBuckets();
    runBtn.disabled = false;
  }

  // ---------- wire-up ----------
  shuffleBtn.onclick = randomize;
  runBtn.onclick     = () => !runBtn.disabled && radixSort();

  // initial seed
  randomize();
})();
