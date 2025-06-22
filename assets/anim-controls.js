/* anim-controls.js  – global Anim helper
   Usage inside an algorithm script:
      await Anim.sleep(40);           // delay obeys speed & pause
      Anim.lockControls(true/false);  // disable UI while sorting
*/

(function attachAnimHelper () {
  if (window.Anim) return;           // singleton guard

  // --- state ------------------------------------------------------------
  let paused = false;
  let speed  = 1;                    // 1× default
  const listeners = [];

  // --- DOM elements -----------------------------------------------------
  const toolbar = document.createElement('div');
  toolbar.className = 'anim-toolbar';
  toolbar.innerHTML = `
    <button id="anim-toggle">Pause</button>
    <label style="margin-left:0.75rem">
      Speed <span id="anim-speed-val">1×</span>
      <input id="anim-speed" type="range" min="0.25" max="4" step="0.25" value="1">
    </label>
  `;
  document.body.prepend(toolbar);

  const btn   = document.getElementById('anim-toggle');
  const range = document.getElementById('anim-speed');
  const label = document.getElementById('anim-speed-val');

  // --- helper functions -------------------------------------------------
  function sleep (baseMs) {
    return new Promise(resolve => {
      function tick (remain) {
        if (paused) { requestAnimationFrame(() => tick(remain)); return; }
        if (remain <= 0) { resolve(); return; }
        const slice = Math.min(remain, 16);   // 60 fps slices
        setTimeout(() => tick(remain - slice), slice);
      }
      tick(baseMs / speed);
    });
  }

  function setPaused (p) {
    paused = p;
    btn.textContent = p ? 'Resume' : 'Pause';
  }

  function lockControls (isLocked) {
    btn.disabled   = isLocked;
    range.disabled = isLocked;
  }

  // --- events -----------------------------------------------------------
  btn.onclick = () => setPaused(!paused);
  range.oninput = () => {
    speed = Number(range.value);
    label.textContent = speed + '×';
  };

  // --- expose API -------------------------------------------------------
  window.Anim = { sleep, lockControls };
})();
