/* procurement.js — logic for the procurement centre operator dashboard */

let activeCentreId = null;
const today = todayStr();

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2400);
}

document.addEventListener('DOMContentLoaded', () => {
  const sel = document.getElementById('centre-select');
  getCentres().forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id; opt.textContent = c.name;
    sel.appendChild(opt);
  });
  activeCentreId = getCentres()[0].id;
  sel.value = activeCentreId;
  sel.addEventListener('change', () => { activeCentreId = sel.value; render(); });

  render();
  setInterval(render, 5000);
});

function render() {
  const q = getCentreQueue(activeCentreId, today);
  document.getElementById('s-total').textContent = q.total;
  document.getElementById('s-checkedin').textContent = q.checkedIn;
  document.getElementById('s-completed').textContent = q.completed;
  document.getElementById('s-waiting').textContent = q.waiting;
  document.getElementById('p-serving').textContent = '#' + q.serving;

  const tbody = document.getElementById('queue-table-body');
  tbody.innerHTML = '';
  if (!q.bookings.length) {
    tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state">No bookings for this centre today yet.</div></td></tr>';
    return;
  }
  q.bookings.forEach(b => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:800;">#${b.token}</td>
      <td>${b.farmer.name}<br><span class="hint">${b.farmer.mobile}</span></td>
      <td>${b.farmer.crop}<br><span class="hint">${b.farmer.quantity} qtl</span></td>
      <td>${b.time}</td>
      <td><span class="chip ${statusChipClass(b.status)}">${statusLabel(b.status)}</span></td>
      <td id="action-${b.id}"></td>
    `;
    tbody.appendChild(tr);
    renderRowAction(b);
  });
}

function renderRowAction(b) {
  const cell = document.getElementById('action-' + b.id);
  if (!cell) return;
  if (b.status === 'serving') {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Complete';
    btn.onclick = () => { completeProcurement(b.id); render(); };
    cell.appendChild(btn);
  } else if (b.status === 'completed') {
    const btn = document.createElement('button');
    btn.className = 'btn btn-gold';
    btn.textContent = 'Mark paid';
    btn.onclick = () => { markPaid(b.id); render(); };
    cell.appendChild(btn);
  } else if (b.status === 'paid') {
    cell.textContent = '✅';
  } else {
    cell.textContent = '—';
  }
}

function handleCallNext() {
  const res = callNext(activeCentreId);
  if (res.error) { showToast(res.error); return; }
  showToast(`Now serving token #${res.booking.token} — ${res.booking.farmer.name}`);
  render();
}

function handleCheckIn() {
  const input = document.getElementById('checkin-input');
  const msg = document.getElementById('checkin-msg');
  const id = input.value.trim();
  if (!id) { msg.textContent = 'Enter a booking ID.'; msg.style.color = 'var(--red)'; return; }
  const b = findBooking(id);
  if (!b) { msg.textContent = 'Booking not found.'; msg.style.color = 'var(--red)'; return; }
  if (b.centreId !== activeCentreId) { msg.textContent = 'This booking is for a different centre.'; msg.style.color = 'var(--red)'; return; }
  const res = checkInBooking(b.id);
  if (res.error) { msg.textContent = res.error; msg.style.color = 'var(--red)'; return; }
  msg.textContent = `Checked in — token #${res.booking.token}, ${res.booking.farmer.name}`;
  msg.style.color = 'var(--green)';
  input.value = '';
  render();
}

function statusLabel(status) {
  return { booked: 'Waiting', 'checked-in': 'Checked in', serving: 'Serving', completed: 'Completed', paid: 'Paid' }[status] || status;
}
function statusChipClass(status) {
  return { booked: 'chip-amber', 'checked-in': 'chip-teal', serving: 'chip-green', completed: 'chip-green', paid: 'chip-grey' }[status] || 'chip-grey';
}
