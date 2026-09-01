/* farmer.js — screen logic for the farmer portal */

let draft = {};
let currentBookingId = null;
let queuePoll = null;

function goTo(screenName) {
  ['start', 'lookup', 'register', 'slot', 'confirm', 'queue'].forEach(s => {
    document.getElementById('screen-' + s).classList.toggle('hidden', s !== screenName);
  });
  if (screenName !== 'queue' && queuePoll) { clearInterval(queuePoll); queuePoll = null; }
  window.scrollTo(0, 0);
}

function showToast(msg) {
  const toastEl = document.getElementById('toast');
  toastEl.textContent = msg;
  toastEl.classList.remove('hidden');
  setTimeout(() => toastEl.classList.add('hidden'), 2600);
}

/* ---- init ---- */
document.addEventListener('DOMContentLoaded', () => {
  const centreSelect = document.getElementById('f-centre');
  getCentres().forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id; opt.textContent = c.name;
    centreSelect.appendChild(opt);
  });

  if (window.location.hash === '#lookup' && isLoggedIn('farmer')) {
    goTo('lookup');
  }
});

/* ---- Registration ---- */
function submitRegister() {
  const name = document.getElementById('f-name').value.trim();
  const mobile = document.getElementById('f-mobile').value.trim();
  const farmerId = document.getElementById('f-farmerid').value.trim();
  const village = document.getElementById('f-village').value.trim();
  const crop = document.getElementById('f-crop').value;
  const qty = document.getElementById('f-qty').value;
  const centreId = document.getElementById('f-centre').value;
  const errorEl = document.getElementById('register-error');

  if (!name || !mobile || !farmerId || !village || !crop || !qty || !centreId) {
    errorEl.textContent = t('error-fill-fields');
    return;
  }
  if (!/^\d{10}$/.test(mobile)) {
    errorEl.textContent = t('error-mobile');
    return;
  }
  if (parseInt(qty) < 1) {
    errorEl.textContent = t('error-qty');
    return;
  }
  errorEl.textContent = '';
  draft = { name, mobile, farmerId, village, crop, quantity: qty, centreId };
  openSlotScreen(centreId);
}

/* ---- Slot booking ---- */
function openSlotScreen(centreId) {
  const centre = getCentres().find(c => c.id === centreId);
  document.getElementById('slot-centre-name').textContent = t('choose-slot') + ' — ' + centre.name;

  const dates = [todayStr(), todayStr(1), todayStr(2)];
  const tabsEl = document.getElementById('date-tabs');
  tabsEl.innerHTML = '';
  dates.forEach((d, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn ' + (i === 0 ? 'btn-primary' : 'btn-outline');
    btn.textContent = niceDate(d);
    btn.onclick = () => { renderSlots(centreId, d); [...tabsEl.children].forEach(c => c.className = 'btn btn-outline'); btn.className = 'btn btn-primary'; };
    tabsEl.appendChild(btn);
  });
  renderSlots(centreId, dates[0]);
  goTo('slot');
}

function renderSlots(centreId, date) {
  const slots = getSlotsForCentreDate(centreId, date);
  const listEl = document.getElementById('slot-list');
  listEl.innerHTML = '';
  slots.forEach(s => {
    const remaining = s.capacity - s.booked;
    const full = remaining <= 0;
    const row = document.createElement('div');
    row.className = 'card-flat';
    row.style.display = 'flex';
    row.style.justifyContent = 'space-between';
    row.style.alignItems = 'center';
    row.style.gap = '12px';
    row.innerHTML = `
      <div>
        <div style="font-weight:700;">${s.time}</div>
        <div class="hint">${full ? t('error-qty') === 'Full' ? 'Full' : 'Full' : remaining + ' slots available'}</div>
      </div>
    `;
    const btn = document.createElement('button');
    btn.className = 'btn ' + (full ? 'btn-outline' : 'btn-gold');
    btn.textContent = full ? 'Full' : 'Book';
    btn.disabled = full;
    btn.onclick = () => confirmBooking(s.id);
    row.appendChild(btn);
    listEl.appendChild(row);
  });
}

function confirmBooking(slotId) {
  const res = createBooking({ ...draft, slotId });
  if (res.error) { showToast(res.error); return; }
  const b = res.booking;
  currentBookingId = b.id;
  document.getElementById('confirm-booking-id').textContent = b.id;
  document.getElementById('confirm-detail').textContent =
    `Token #${b.token} · ${centreName(b.centreId)} · ${niceDate(b.date)}, ${b.time}`;
  document.getElementById('confirm-qr').setAttribute('data-code', b.id);
  goTo('confirm');
}

/* ---- Lookup existing booking ---- */
function doLookup() {
  const mobile = document.getElementById('lookup-mobile').value.trim();
  const resultsEl = document.getElementById('lookup-results');
  if (!/^\d{10}$/.test(mobile)) { 
    resultsEl.innerHTML = '<p class="hint" style="color:var(--red);">' + t('error-mobile') + '</p>'; 
    return; 
  }
  const bookings = findBookingsByMobile(mobile);
  if (!bookings.length) {
    resultsEl.innerHTML = '<div class="empty-state">' + t('no-bookings') + '</div>';
    return;
  }
  resultsEl.innerHTML = '';
  bookings.forEach(b => {
    const row = document.createElement('div');
    row.className = 'card-flat';
    row.style.marginBottom = '10px';
    row.style.cursor = 'pointer';
    row.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:700;">${b.id} · Token #${b.token}</div>
          <div class="hint">${centreName(b.centreId)} · ${b.farmer.crop}, ${b.farmer.quantity} qtl</div>
        </div>
        <span class="chip ${statusChipClass(b.status)}">${statusLabel(b.status)}</span>
      </div>`;
    row.onclick = () => showQueueScreen(b.id);
    resultsEl.appendChild(row);
  });
}

/* ---- Live queue / status screen ---- */
function showQueueScreen(bookingId) {
  currentBookingId = bookingId;
  renderQueueScreen();
  goTo('queue');
  if (queuePoll) clearInterval(queuePoll);
  queuePoll = setInterval(renderQueueScreen, 4000);
}

function renderQueueScreen() {
  const b = findBooking(currentBookingId);
  if (!b) return;
  const q = getQueueInfo(b);

  document.getElementById('q-token').textContent = '#' + b.token;
  document.getElementById('q-serving').textContent = '#' + q.serving;
  document.getElementById('q-ahead').textContent = q.ahead;
  document.getElementById('q-eta').textContent = q.ahead === 0 ? 'Now' : (q.etaMins < 60 ? q.etaMins + 'm' : Math.floor(q.etaMins / 60) + 'h ' + (q.etaMins % 60) + 'm');
  document.getElementById('q-bid-footer').textContent = b.id;

  const chip = document.getElementById('q-status-chip');
  if (b.status === 'booked') { chip.className = 'chip chip-amber'; chip.textContent = '🟡 ' + t('status-booked'); }
  else if (b.status === 'checked-in') { chip.className = 'chip chip-teal'; chip.textContent = '🔵 ' + t('status-checkedin') + ' — get ready'; }
  else if (b.status === 'serving') { chip.className = 'chip chip-green'; chip.textContent = '🟢 Your turn now — please come to the counter'; }
  else { chip.className = 'chip chip-green'; chip.textContent = '✅ ' + t('status-completed'); }

  document.getElementById('q-booking-meta').textContent =
    `${b.id} · ${b.farmer.crop}, ${b.farmer.quantity} quintals · ${centreName(b.centreId)}`;

  const steps = [
    { key: 'registered', label: t('step1-title'), desc: t('step1-desc') },
    { key: 'booked', label: t('step2-title'), desc: `${niceDate(b.date)}, ${b.time}` },
    { key: 'checked-in', label: t('step3-title'), desc: 'Arrived at the procurement centre.' },
    { key: 'completed', label: t('step5-title'), desc: 'Crop weighed and accepted.' },
    { key: 'paid', label: t('step6-title'), desc: 'Amount transferred to your account.' },
  ];
  const order = ['registered', 'booked', 'checked-in', 'serving', 'completed', 'paid'];
  const currentIdx = order.indexOf(b.status === 'serving' ? 'checked-in' : b.status);

  const tl = document.getElementById('q-timeline');
  tl.innerHTML = '';
  steps.forEach((s, i) => {
    const stepOrderIdx = order.indexOf(s.key);
    const isDone = stepOrderIdx <= currentIdx || (s.key === 'checked-in' && (b.status === 'serving' || b.status === 'completed' || b.status === 'paid'));
    const isActive = !isDone && stepOrderIdx === currentIdx + 1;
    const li = document.createElement('li');
    li.innerHTML = `<span class="dot ${isDone ? 'done' : (isActive ? 'active' : '')}">${isDone ? '✓' : i + 1}</span>
      <div><div class="title">${s.label}</div><div class="desc">${s.desc}</div></div>`;
    tl.appendChild(li);
  });

  const payBox = document.getElementById('q-payment-box');
  if (b.status === 'paid' && b.paymentAmount) {
    payBox.classList.remove('hidden');
    document.getElementById('q-payment-amount').textContent = '₹' + b.paymentAmount.toLocaleString('en-IN') + ' credited';
  } else {
    payBox.classList.add('hidden');
  }
}

function statusLabel(status) {
  const labels = {
    booked: t('status-booked'),
    'checked-in': t('status-checkedin'),
    serving: 'Serving now',
    completed: t('status-completed'),
    paid: 'Paid'
  };
  return labels[status] || status;
}
function statusChipClass(status) {
  return { booked: 'chip-amber', 'checked-in': 'chip-teal', serving: 'chip-green', completed: 'chip-green', paid: 'chip-green' }[status] || 'chip-grey';
}
