const pointsValue = document.querySelector('#points-value');

const startingPoints = Number(localStorage.getItem('neonClawPoints') || 1280);
localStorage.setItem('neonClawPoints', startingPoints);

document.querySelectorAll('.game-card').forEach((card) => {
  card.addEventListener('click', () => {
    const earned = Number(localStorage.getItem('neonClawPoints') || 1280) + 25;
    localStorage.setItem('neonClawPoints', earned);
  });
});

const savedPoints = Number(localStorage.getItem('neonClawPoints'));
if (pointsValue && savedPoints) pointsValue.textContent = savedPoints.toLocaleString();

const modal = document.querySelector('#prize-modal');
const modalNote = document.querySelector('#modal-note');
const updatePoints = () => { if (pointsValue) pointsValue.textContent = Number(localStorage.getItem('neonClawPoints') || 0).toLocaleString(); };
const showModal = () => { if (modal) modal.hidden = false; };
const hideModal = () => { if (modal) modal.hidden = true; };
document.querySelector('#shop-button')?.addEventListener('click', showModal);
document.querySelector('#modal-close')?.addEventListener('click', hideModal);
modal?.addEventListener('click', (event) => { if (event.target === modal) hideModal(); });
document.querySelector('#modal-buy')?.addEventListener('click', () => {
  const current = Number(localStorage.getItem('neonClawPoints') || 0);
  if (current < 1000) { modalNote.textContent = 'Keep playing — you need 1,000 points to unlock this prize.'; return; }
  localStorage.setItem('neonClawPoints', current - 1000);
  updatePoints();
  const plushies = ['bear', 'bunny', 'frog', 'panda', 'koala', 'fox'];
  const won = plushies[Math.floor(Math.random() * plushies.length)];
  const collection = JSON.parse(localStorage.getItem('neonClawCollection') || '[]');
  collection.push(won);
  localStorage.setItem('neonClawCollection', JSON.stringify(collection));
  modalNote.textContent = 'GACHA DROP: ' + won.toUpperCase() + ' PLUSHY! ✦';
});
setInterval(showModal, 5000);
