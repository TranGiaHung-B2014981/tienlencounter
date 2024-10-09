let ranks = [0, 0, 0, 0];

document.getElementById('settings').addEventListener('click', () => {
  document.querySelector('.setup').style.display = 'block';
});

document.getElementById('out').addEventListener('click', () => {
  document.querySelector('.setup').style.display = 'none';
});

document.getElementById('rank-form').addEventListener('submit', (event) => {
  event.preventDefault();
  ranks = [
    document.getElementById('rank1').value || 0,
    document.getElementById('rank2').value || 0,
    document.getElementById('rank3').value || 0,
    document.getElementById('rank4').value || 0,
  ];

  updateButtons();
  document.querySelector('.setup').style.display = 'none';
});

function updateButtons() {
  const players = document.querySelectorAll('.p-item');
  players.forEach((player) => {
    const index = parseInt(player.dataset.index, 10);
    const buttons = player.querySelectorAll('.btn-section button');
    buttons.forEach((btn, idx) => {
      const rank = ranks[idx];
      btn.innerText = rank > 0 ? `+${rank}` : rank;
      btn.disabled = rank == 0;
    });
  });
}

function updateScore(player, amount) {
  const scoreElement = player.querySelector('.player-score');
  let currentScore = parseInt(scoreElement.innerText, 10) || 0;
  scoreElement.innerText = currentScore + amount;
}

document
  .getElementById('player-container')
  .addEventListener('click', (event) => {
    if (event.target.closest('.btn-section button')) {
      const player = event.target.closest('.p-item');
      const rankIndex = Array.from(
        event.target.closest('.btn-section').children
      ).indexOf(event.target);
      updateScore(player, parseInt(ranks[rankIndex], 10));
    } else if (event.target.closest('.fa-circle-plus')) {
      const player = event.target.closest('.p-item');
      const customScore =
        parseInt(player.querySelector('.custom-score').value, 10) || 0;
      updateScore(player, customScore);
    } else if (event.target.closest('.fa-circle-minus')) {
      const player = event.target.closest('.p-item');
      const customScore =
        parseInt(player.querySelector('.custom-score').value, 10) || 0;
      updateScore(player, -customScore);
    }
  });

document.querySelector('.renew').addEventListener('click', () => {
  document
    .querySelectorAll('.player-score')
    .forEach((score) => (score.innerText = 0));
  ranks = [0, 0, 0, 0];
  updateButtons();
});
