// assets/matchcards.js  (line-drawing version)
(function () {
  const deck   = document.getElementById('match-deck');
  const svg    = document.getElementById('match-svg');
  if (!deck || !svg) return;

  let selectedLeft = null;
  const matches    = {};         // { leftText : rightText }
  const lines      = {};         // { leftText : <svg line element> }
  const checkBtn   = document.getElementById('check-match');
  const resetBtn   = document.getElementById('reset-match');

  /* helper: centre-point of a card relative to svg */
  function centre(el) {
    const r = el.getBoundingClientRect();
    const svgR = svg.getBoundingClientRect();
    return { x: r.left + r.width  / 2 - svgR.left,
             y: r.top  + r.height / 2 - svgR.top  };
  }

  /* click handler */
  deck.addEventListener('click', e => {
    const el = e.target;
    if (!el.classList.contains('card')) return;

    /* select left term */
    if (el.classList.contains('left')) {
      if (selectedLeft) selectedLeft.classList.remove('active');
      selectedLeft = el;
      el.classList.add('active');
    }

    /* click right term to pair */
    if (el.classList.contains('right') && selectedLeft) {
      const leftText  = selectedLeft.dataset.left;
      const rightText = el.dataset.right;

      /* if repicking, remove old line */
      if (lines[leftText]) {
        svg.removeChild(lines[leftText]);
        delete lines[leftText];
      }

      /* record & draw */
      matches[leftText] = rightText;
      selectedLeft.classList.add('paired');
      el.classList.add('paired');
      selectedLeft.classList.remove('active');

      const p1 = centre(selectedLeft);
      const p2 = centre(el);
      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1', p1.x);
      line.setAttribute('y1', p1.y);
      line.setAttribute('x2', p2.x);
      line.setAttribute('y2', p2.y);
      line.setAttribute('stroke', '#0077cc');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('marker-end','url(#arrow-head)');
      svg.appendChild(line);
      lines[leftText] = line;

      selectedLeft = null;
      checkBtn.disabled = false;
    }
  });

  /* add arrowhead marker once */
  const marker = document.createElementNS('http://www.w3.org/2000/svg','marker');
  marker.setAttribute('id','arrow-head');
  marker.setAttribute('viewBox','0 0 10 10');
  marker.setAttribute('refX','10');
  marker.setAttribute('refY','5');
  marker.setAttribute('markerWidth','6');
  marker.setAttribute('markerHeight','6');
  marker.setAttribute('orient','auto-start-reverse');
  const path = document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('d','M 0 0 L 10 5 L 0 10 z');
  path.setAttribute('fill','#0077cc');
  marker.appendChild(path);
  svg.appendChild(marker);

  /* check answers */
  checkBtn.addEventListener('click', () => {
/* build answer key { leftTerm: correctRightText } */
    const answerKey = JSON.parse(
      document.getElementById('pairs-json').textContent
    ).reduce((acc, pair) => {
      acc[pair.left] = pair.right;
      return acc;
    }, {});

    const leftCards  = deck.querySelectorAll('.card.left');
    leftCards.forEach(l => {
      const expected = l.dataset.left;
      const matched  = matches[expected];
      const rightEl  = deck.querySelector(`.card.right[data-right="${matched}"]`);

      if (!matched) return; // unmatched

      const isCorrect = matched === answerKey[expected];

      l.classList.add(isCorrect ? 'correct' : 'wrong');
      rightEl.classList.add(isCorrect ? 'correct' : 'wrong');
      lines[expected].setAttribute('stroke', isCorrect ? '#1a7f37' : '#d73a49');
    });
    checkBtn.disabled = true;
  });

  /* reset */
  resetBtn.addEventListener('click', () => location.reload());
})();
