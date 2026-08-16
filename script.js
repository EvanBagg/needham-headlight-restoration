document.getElementById('year').textContent = new Date().getFullYear();

const compare = document.getElementById('lensCompare');
const beforePanel = compare.querySelector('.lens-before');
const handle = compare.querySelector('.lens-handle');

function setSplit(percent){
  const clamped = Math.min(96, Math.max(4, percent));
  beforePanel.style.clipPath = `inset(0 0 0 ${clamped}%)`;
  handle.style.left = clamped + '%';
  compare.setAttribute('aria-valuenow', Math.round(clamped));
}

function positionFromEvent(clientX){
  const rect = compare.getBoundingClientRect();
  const percent = ((clientX - rect.left) / rect.width) * 100;
  setSplit(percent);
}

let dragging = false;

compare.addEventListener('pointerdown', (e) => {
  dragging = true;
  compare.setPointerCapture(e.pointerId);
  positionFromEvent(e.clientX);
});
compare.addEventListener('pointermove', (e) => {
  if (dragging) positionFromEvent(e.clientX);
});
compare.addEventListener('pointerup', () => { dragging = false; });
compare.addEventListener('pointercancel', () => { dragging = false; });

compare.addEventListener('keydown', (e) => {
  const current = parseFloat(compare.getAttribute('aria-valuenow')) || 50;
  if (e.key === 'ArrowLeft') setSplit(current - 5);
  if (e.key === 'ArrowRight') setSplit(current + 5);
});

setSplit(50);
