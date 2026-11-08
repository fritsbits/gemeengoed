// The track record scrolls sideways on its own. This adds the two buttons and the stones
// that tell where you are; without it the row still scrolls, with its scrollbar.
// A file of its own because the CSP allows no inline script.
(() => {
  const row = document.getElementById('cases');
  const controls = document.querySelector('.cases-controls');
  if (!row || !controls) return;

  const plots = [...row.children];
  const stonesBox = controls.querySelector('.cases-stones');
  const [prev, next] = controls.querySelectorAll('.cases-btn');
  const stones = plots.map(() => stonesBox.appendChild(document.createElement('span')));
  const still = window.matchMedia('(prefers-reduced-motion: reduce)');

  // The row's own start padding: where the canvas edge falls, at any width.
  const start = () => plots[0].offsetLeft;

  // The current plot is the one whose left edge stands closest to the canvas edge.
  const current = () => {
    const at = row.scrollLeft + start();
    let best = 0;
    plots.forEach((plot, i) => {
      if (Math.abs(plot.offsetLeft - at) < Math.abs(plots[best].offsetLeft - at)) best = i;
    });
    return best;
  };

  const render = () => {
    const i = current();
    stones.forEach((stone, n) => stone.toggleAttribute('data-current', n === i));
    prev.disabled = row.scrollLeft <= 1;
    next.disabled = row.scrollLeft >= row.scrollWidth - row.clientWidth - 1;
  };

  const go = (step) => {
    const target = plots[Math.min(plots.length - 1, Math.max(0, current() + step))];
    row.scrollTo({ left: target.offsetLeft - start(), behavior: still.matches ? 'auto' : 'smooth' });
  };

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

  let frame = 0;
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; render(); });
  };
  row.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);

  row.classList.add('is-enhanced');
  controls.hidden = false;
  render();
})();
