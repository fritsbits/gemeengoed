// The makers look up while their section scrolls in, and at the reader once its heading
// stands at the top of the screen. A file of its own because the CSP allows no inline script.
(() => {
  const heading = document.getElementById('wie');
  const portraits = [...document.querySelectorAll('.plot-photo--gaze')];
  if (!heading || !portraits.length || !('IntersectionObserver' in window)) return;

  const inView = new Set();
  let headingAtTop = false;
  let pageEnd = false;

  const render = () => {
    const settled = headingAtTop || pageEnd;
    for (const portrait of portraits) {
      if (!settled) portrait.dataset.gaze = 'up';
      // A portrait still below the fold keeps looking up until the reader can see it turn.
      else if (inView.has(portrait)) portrait.dataset.gaze = 'camera';
    }
  };

  // The root runs from far above the screen down to a line just under its top edge, so the
  // heading intersects from the moment it reaches that line and for as long as it is above it.
  new IntersectionObserver(([entry]) => {
    headingAtTop = entry.isIntersecting;
    render();
  }, { rootMargin: '100000px 0px -82% 0px' }).observe(heading);

  // On a screen taller than what follows, the heading never gets that high: the end of the
  // page settles it instead.
  const footer = document.querySelector('.colophon');
  if (footer) {
    new IntersectionObserver(([entry]) => {
      pageEnd = entry.isIntersecting;
      render();
    }, { threshold: 1 }).observe(footer);
  }

  const watcher = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) inView.add(entry.target);
      else inView.delete(entry.target);
    }
    render();
  }, { threshold: 0.6 });
  for (const portrait of portraits) watcher.observe(portrait);

  render();
})();
