/* data.js — Shared data layer for SIH26032 Farmer Procurement Queue & Status Platform
   Uses localStorage as a mock backend so the Farmer / Procurement / Admin views
   all read and write the same "database" in the browser. Replace with real API
   calls to swap in a backend later — the function names below are the contract. */

const DB_KEY = 'sih26032_db_v2';

const CENTRES = [
  { id: 'c1', name: 'Centre A — Rajapur Mandi' },
  { id: 'c2', name: 'Centre B — Sultanpur Mandi' },
  { id: 'c3', name: 'Centre C — Haripur Mandi' },
];

const SLOT_TIMES = ['09:00–10:00', '10:00–11:00', '11:00–12:00', '12:00–13:00', '14:00–15:00', '15:00–16:00'];
const CROPS = ['Wheat', 'Paddy', 'Maize', 'Mustard', 'Gram', 'Soybean'];
const CROP_RATE = { Wheat: 2275, Paddy: 2183, Maize: 2090, Mustard: 5650, Gram: 5440, Soybean: 4600 }; // ₹ per quintal, demo MSP-like figures

function pad(n, len) { return String(n).padStart(len, '0'); }
function todayStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}
function niceDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

function loadDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) { try { return JSON.parse(raw); } catch (e) { /* fall through to reseed */ } }
  const db = seedDB();
  saveDB(db);
  return db;
}
function saveDB(db) { localStorage.setItem(DB_KEY, JSON.stringify(db)); }

function makeSlots() {
  const slots = [];
  CENTRES.forEach(c => {
    [todayStr(), todayStr(1), todayStr(2)].forEach(date => {
      SLOT_TIMES.forEach(time => {
        slots.push({ id: `${c.id}_${date}_${time}`, centreId: c.id, date, time, capacity: 15, booked: 0 });
      });
    });
  });
  return slots;
}

function seedDB() {
  const db = {
    centres: CENTRES,
    slots: makeSlots(),
    bookings: [],
    nextToken: {},   // per centre, next token number to hand out
    serving: {},      // per centre, token currently being served
    bookingSeq: 1200,
  };
  CENTRES.forEach(c => { db.nextToken[c.id] = 1; db.serving[c.id] = 0; });
  seedDemoActivity(db);
  return db;
}

/* Populate some realistic in-progress activity so Procurement/Admin views
   aren't empty on first load — mirrors farmers who "already" checked in today. */
function seedDemoActivity(db) {
  const names = ['Ramesh Yadav', 'Suman Devi', 'Anil Kumar', 'Geeta Sharma', 'Vijay Singh', 'Pooja Kumari', 'Sunil Prajapati', 'Meena Verma'];
  const villages = ['Rajapur', 'Sultanpur', 'Haripur', 'Devgaon', 'Kishanpur'];
  const today = todayStr();
  CENTRES.forEach((c, ci) => {
    const count = 10 + ci * 4;
    for (let i = 0; i < count; i++) {
      const slot = db.slots.find(s => s.centreId === c.id && s.date === today && s.time === SLOT_TIMES[i % SLOT_TIMES.length]);
      if (!slot || slot.booked >= slot.capacity) continue;
      slot.booked++;
      const token = db.nextToken[c.id]++;
      const crop = CROPS[i % CROPS.length];
      const qty = 8 + (i % 6) * 6;
      let status = 'checked-in';
      if (i < count * 0.35) status = 'completed';
      if (i < count * 0.15) status = 'paid';
      const booking = {
        id: `P26032-${db.bookingSeq++}`,
        token,
        farmer: {
          name: names[i % names.length], mobile: `9${800000000 + Math.floor(Math.random() * 99999999)}`,
          farmerId: `FID-${1000 + i}`, village: villages[i % villages.length], crop, quantity: qty,
        },
        centreId: c.id, slotId: slot.id, date: today, time: slot.time,
        status, checkedInAt: Date.now() - (count - i) * 60000,
        paymentAmount: status === 'paid' ? qty * CROP_RATE[crop] : null,
      };
      db.bookings.push(booking);
      if (status !== 'checked-in') db.serving[c.id] = Math.max(db.serving[c.id], token - Math.floor(count * 0.15));
    }
    db.serving[c.id] = Math.max(1, Math.floor(count * 0.3));
  });
}

/* ---------- Public data API ---------- */

function getCentres() { return loadDB().centres; }

function getSlotsForCentreDate(centreId, date) {
  return loadDB().slots.filter(s => s.centreId === centreId && s.date === date);
}

function createBooking({ name, mobile, farmerId, village, crop, quantity, centreId, slotId }) {
  const db = loadDB();
  const slot = db.slots.find(s => s.id === slotId);
  if (!slot || slot.booked >= slot.capacity) return { error: 'Slot is full. Please choose another slot.' };
  slot.booked++;
  const token = db.nextToken[centreId]++;
  const booking = {
    id: `P26032-${db.bookingSeq++}`,
    token,
    farmer: { name, mobile, farmerId, village, crop, quantity: Number(quantity) },
    centreId, slotId, date: slot.date, time: slot.time,
    status: 'booked', checkedInAt: null, paymentAmount: null,
  };
  db.bookings.push(booking);
  saveDB(db);
  return { booking };
}

function findBooking(bookingId) {
  return loadDB().bookings.find(b => b.id.toLowerCase() === String(bookingId).toLowerCase());
}

function findBookingsByMobile(mobile) {
  return loadDB().bookings.filter(b => b.farmer.mobile === mobile).sort((a, b) => b.checkedInAt - a.checkedInAt || 0);
}

function getQueueInfo(booking) {
  const db = loadDB();
  const serving = db.serving[booking.centreId] || 0;
  const ahead = Math.max(0, booking.token - serving - 1);
  const etaMins = ahead * 7; // ~7 min per farmer, matches PS's queue-prediction example
  return { serving, ahead, etaMins };
}

function getCentreQueue(centreId, date) {
  const db = loadDB();
  const all = db.bookings.filter(b => b.centreId === centreId && b.date === date);
  return {
    serving: db.serving[centreId] || 0,
    total: all.length,
    checkedIn: all.filter(b => b.status === 'checked-in').length,
    completed: all.filter(b => b.status === 'completed' || b.status === 'paid').length,
    waiting: all.filter(b => b.status === 'booked').length,
    bookings: all.sort((a, b) => a.token - b.token),
  };
}

function checkInBooking(bookingId) {
  const db = loadDB();
  const b = db.bookings.find(x => x.id === bookingId);
  if (!b) return { error: 'Booking not found' };
  if (b.status !== 'booked') return { error: 'Booking already checked in or beyond that stage' };
  b.status = 'checked-in';
  b.checkedInAt = Date.now();
  saveDB(db);
  return { booking: b };
}

function callNext(centreId) {
  const db = loadDB();
  const candidates = db.bookings
    .filter(b => b.centreId === centreId && b.status === 'checked-in')
    .sort((a, b) => a.token - b.token);
  if (!candidates.length) return { error: 'No one checked in and waiting.' };
  const next = candidates[0];
  next.status = 'serving';
  db.serving[centreId] = next.token;
  saveDB(db);
  return { booking: next };
}

function completeProcurement(bookingId) {
  const db = loadDB();
  const b = db.bookings.find(x => x.id === bookingId);
  if (!b) return { error: 'Booking not found' };
  b.status = 'completed';
  saveDB(db);
  return { booking: b };
}

function markPaid(bookingId) {
  const db = loadDB();
  const b = db.bookings.find(x => x.id === bookingId);
  if (!b) return { error: 'Booking not found' };
  const rate = CROP_RATE[b.farmer.crop] || 2000;
  b.paymentAmount = b.farmer.quantity * rate;
  b.status = 'paid';
  saveDB(db);
  return { booking: b };
}

function getAdminStats(date) {
  const db = loadDB();
  const all = db.bookings.filter(b => b.date === date);
  const completed = all.filter(b => b.status === 'completed' || b.status === 'paid').length;
  const waiting = all.filter(b => b.status === 'booked' || b.status === 'checked-in').length;
  const pendingPayment = all.filter(b => b.status === 'completed').length;
  const centrePerf = db.centres.map(c => {
    const cb = all.filter(b => b.centreId === c.id);
    const cWaiting = cb.filter(b => b.status === 'booked' || b.status === 'checked-in').length;
    let level = 'green';
    if (cWaiting > 12) level = 'red'; else if (cWaiting > 6) level = 'amber';
    return { centre: c, total: cb.length, waiting: cWaiting, completed: cb.filter(b => b.status === 'completed' || b.status === 'paid').length, level };
  });
  return {
    totalFarmers: all.length, completed, waiting, pendingPayment,
    avgWaitMins: all.length ? Math.round(all.reduce((s, b) => s + getQueueInfo(b).etaMins, 0) / all.length) : 0,
    centrePerf,
  };
}

function centreName(id) { const c = CENTRES.find(x => x.id === id); return c ? c.name : id; }
