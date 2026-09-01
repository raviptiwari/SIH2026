/* admin.js — logic for the admin dashboard */

const today = todayStr();

function render() {
  const stats = getAdminStats(today);
  document.getElementById('a-total').textContent = stats.totalFarmers;
  document.getElementById('a-completed').textContent = stats.completed;
  document.getElementById('a-waiting').textContent = stats.waiting;
  document.getElementById('a-pending').textContent = stats.pendingPayment;
  document.getElementById('a-avgwait').textContent = stats.avgWaitMins < 60
    ? stats.avgWaitMins + 'm'
    : Math.floor(stats.avgWaitMins / 60) + 'h ' + (stats.avgWaitMins % 60) + 'm';

  const listEl = document.getElementById('centre-perf-list');
  listEl.innerHTML = '';
  const dotClass = { green: 'dot-green', amber: 'dot-amber', red: 'dot-red' };
  const labels = { green: 'Running smoothly', amber: 'Getting busy', red: 'Overcrowded' };
  stats.centrePerf.forEach(cp => {
    const row = document.createElement('div');
    row.className = 'card-flat';
    row.style.marginBottom = '10px';
    row.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
        <div>
          <span class="centre-status-dot ${dotClass[cp.level]}"></span>
          <strong>${cp.centre.name}</strong>
        </div>
        <div class="hint">${labels[cp.level]}</div>
      </div>
      <div style="display:flex; gap:20px; margin-top:10px; font-size:.88rem; color:var(--ink-soft);">
        <span>Total: <strong style="color:var(--ink);">${cp.total}</strong></span>
        <span>Waiting: <strong style="color:var(--ink);">${cp.waiting}</strong></span>
        <span>Completed: <strong style="color:var(--ink);">${cp.completed}</strong></span>
      </div>`;
    listEl.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  render();
  setInterval(render, 5000);
});
