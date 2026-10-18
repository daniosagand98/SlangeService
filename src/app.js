/* =========================================================
   CrewControl – Slangeservice AS
   Jedna aplikacja: domy, auta, karty paliwowe, godziny,
   rotacje, bilety, dojazdy (Entur/Skyss), dokumenty,
   wiadomości, panel admina.
   ========================================================= */
'use strict';

const VERSION = '1.0.0';
const BUILD = '2026-10-18';
const COMPANY = 'Slangeservice AS';
const PREVIEW = !!window.CC_PREVIEW;
const STORE_KEY = PREVIEW ? 'cc_preview_db_v1' : 'cc_db_v1';
const FILE_DB = PREVIEW ? 'cc_preview_files' : 'cc_files';
const SESSION_KEY = PREVIEW ? 'cc_preview_session' : 'cc_session';
const ENTUR_CLIENT = 'slangeservice-crewcontrol';

const ROLES = {
  admin: { label: 'Admin', rank: 4 },
  kierownik: { label: 'Kierownik', rank: 3 },
  foreman: { label: 'Foreman', rank: 2 },
  pracownik: { label: 'Pracownik', rank: 1 },
};
const AIRPORTS = {
  BGO: { name: 'Bergen Flesland (BGO)', lat: 60.2934, lon: 5.2181 },
  HAU: { name: 'Haugesund Karmøy (HAU)', lat: 59.3453, lon: 5.2084 },
  SRP: { name: 'Stord Sørstokken (SRP)', lat: 59.7919, lon: 5.3408 },
  SVG: { name: 'Stavanger Sola (SVG)', lat: 58.8767, lon: 5.6378 },
};
const PL_AIRPORTS = ['Gdańsk (GDN)', 'Kraków (KRK)', 'Warszawa (WAW)', 'Katowice (KTW)', 'Wrocław (WRO)', 'Poznań (POZ)', 'Szczecin (SZZ)', 'Rzeszów (RZE)', 'Lublin (LUZ)'];

/* ---------- ikony ---------- */
const ICP = {
  dash: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  house: '<path d="M4 21V9l8-6 8 6v12M9 21v-6h6v6"/>',
  car: '<path d="M3 17v-4l2-6h14l2 6v4zM3 13h18"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  plane: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
  file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/>',
  folder: '<path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M17 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  dl: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  up: '<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  bus: '<rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16M7 21v-4M17 21v-4"/>',
  bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>',
  logout: '<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11"/>',
  fuel: '<path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M14 9h2a2 2 0 0 1 2 2v5a2 2 0 0 0 4 0V8l-3-3M7 8h4"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  swap: '<path d="M7 7h13l-4-4M17 17H4l4 4"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>',
  send: '<path d="M4 12l16-8-6 16-2-6z"/>',
  pin: '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  warn: '<path d="M12 7v6M12 16.5v.5"/>',
  target: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  shrink: '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>',
  minus: '<path d="M5 12h14"/>',
};
const ic = (n, c = '') => `<svg class="i ${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ICP[n] || ''}</svg>`;

/* ---------- utils ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function isoLocal(d = new Date()) { const z = d.getTimezoneOffset() * 60000; return new Date(d - z).toISOString().slice(0, 10); }
const monthNow = () => isoLocal().slice(0, 7);
function addDays(ds, n) { const d = new Date(ds + 'T12:00'); d.setDate(d.getDate() + n); return isoLocal(d); }
const DOW = ['nd', 'pn', 'wt', 'śr', 'cz', 'pt', 'sb'];
const MONTHS = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
function fmtDate(ds) { if (!ds) return '—'; const d = new Date(ds + 'T12:00'); return `${DOW[d.getDay()]} ${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`; }
function fmtMonth(m) { const [y, mm] = m.split('-'); return `${MONTHS[+mm - 1]} ${y}`; }
function fmtTs(ts) { if (!ts) return '—'; const d = new Date(ts); return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; }
function relTime(ts) {
  if (!ts) return 'nigdy';
  const s = (Date.now() - ts) / 1000;
  if (s < 60) return 'teraz';
  if (s < 3600) return Math.floor(s / 60) + ' min temu';
  if (s < 86400) return Math.floor(s / 3600) + ' h temu';
  if (s < 86400 * 30) return Math.floor(s / 86400) + ' dni temu';
  return fmtTs(ts);
}
function isoWeek(ds) { const d = new Date(ds + 'T12:00'); d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7)); const w1 = new Date(d.getFullYear(), 0, 4); return 1 + Math.round(((d - w1) / 864e5 - 3 + ((w1.getDay() + 6) % 7)) / 7); }
function mondayOf(ds) { const d = new Date(ds + 'T12:00'); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return isoLocal(d); }
function durH(from, to, brk = 0) {
  if (!from || !to) return 0;
  const [a, b] = from.split(':').map(Number), [c, e] = to.split(':').map(Number);
  let m = (c * 60 + e) - (a * 60 + b); if (m < 0) m += 1440;
  return Math.max(0, (m - (+brk || 0)) / 60);
}
const round2 = n => Math.round(n * 100) / 100;
const fmtH = h => String(round2(h)).replace('.', ',') + ' h';
const fmtNum = n => String(round2(n)).replace('.', ',');
const entryH = x => durH(x.from, x.to, x.breakMin);
const sumH = list => list.reduce((s, x) => s + entryH(x), 0);
function hashColor(s) { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return `hsl(${h % 360} 70% 58%)`; }
function initials(n) { return String(n || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(x => x[0].toUpperCase()).join(''); }
const avatar = (u, big) => `<span class="av ${big ? 'big' : ''}" style="--c:${hashColor(u?.id || u?.name)}">${esc(initials(u?.name))}</span>`;
async function sha(s) {
  try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('cc::' + s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
  catch (e) { let h = 5381; for (const c of 'cc::' + s) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0; return 'f' + h.toString(16); }
}

/* ---------- baza danych ---------- */
let DB;
function emptyDB() { return { users: [], houses: [], cars: [], refuels: [], fuelCards: [], cardTransfers: [], projects: [], hours: [], groups: [], tickets: [], docs: [], messages: [], logs: [], meta: {} }; }
function load() {
  try { DB = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { DB = null; }
  if (!DB) { DB = emptyDB(); if (PREVIEW) seed(); }
  const e = emptyDB(); for (const k in e) if (!DB[k]) DB[k] = e[k];
  save();
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(DB)); }
  catch (e) { toast('Błąd zapisu – brak miejsca w przeglądarce', 'err'); }
}
function log(action) {
  if (!REAL) return;
  const sim = ME && REAL && ME.id !== REAL.id ? ` [podgląd jako ${ME.name}]` : '';
  DB.logs.unshift({ id: uid(), userId: REAL.id, action: action + sim, at: Date.now() });
  if (DB.logs.length > 4000) DB.logs.length = 4000;
}

/* ---------- pliki (IndexedDB) ---------- */
const FS = {
  db: null,
  open() {
    return new Promise((res, rej) => {
      if (this.db) return res(this.db);
      const r = indexedDB.open(FILE_DB, 1);
      r.onupgradeneeded = () => r.result.createObjectStore('files', { keyPath: 'id' });
      r.onsuccess = () => { this.db = r.result; res(this.db); };
      r.onerror = () => rej(r.error);
    });
  },
  async tx(mode, fn) {
    const db = await this.open();
    return new Promise((res, rej) => {
      const t = db.transaction('files', mode); const st = t.objectStore('files');
      const r = fn(st); t.oncomplete = () => res(r && r.result); t.onerror = () => rej(t.error);
    });
  },
  put(f) { return this.tx('readwrite', s => s.put(f)); },
  get(id) { return this.tx('readonly', s => s.get(id)); },
  del(id) { return this.tx('readwrite', s => s.delete(id)); },
  all() { return this.tx('readonly', s => s.getAll()); },
  clear() { return this.tx('readwrite', s => s.clear()); },
};
function compressImg(file) {
  return new Promise((res, rej) => {
    const img = new Image(); const u = URL.createObjectURL(file);
    img.onload = () => {
      const m = 1800, s = Math.min(1, m / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(u);
      c.toBlob(b => b ? res(b) : rej(new Error('kompresja')), 'image/jpeg', .85);
    };
    img.onerror = () => { URL.revokeObjectURL(u); rej(new Error('obraz')); };
    img.src = u;
  });
}
async function storeFile(file) {
  let blob = file, type = file.type || 'application/octet-stream', name = file.name;
  if (/^image\/(jpeg|png|webp)$/.test(type) && file.size > 400000) {
    try { blob = await compressImg(file); type = 'image/jpeg'; name = name.replace(/\.\w+$/, '') + '.jpg'; } catch (e) { }
  }
  const id = uid(); await FS.put({ id, name, type, blob, size: blob.size, at: Date.now() }); return id;
}
async function downloadFile(id) {
  const f = await FS.get(id); if (!f) return toast('Plik nie istnieje na tym urządzeniu', 'err');
  const a = document.createElement('a'); a.href = URL.createObjectURL(f.blob); a.download = f.name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 8000);
}
async function viewFile(id) {
  const f = await FS.get(id); if (!f) return toast('Plik nie istnieje na tym urządzeniu', 'err');
  const url = URL.createObjectURL(f.blob);
  if (f.type.startsWith('image/')) {
    modal(f.name, `<img src="${url}" class="fullimg" alt=""><div class="row end"><button type="button" class="btn primary" data-act="dl-file" data-id="${id}">${ic('dl')} Pobierz</button></div>`);
  } else { window.open(url, '_blank') || downloadFile(id); }
}
async function hydrateThumbs() {
  for (const el of $$('[data-thumb]')) {
    const f = await FS.get(el.dataset.thumb).catch(() => null);
    if (!f) { el.classList.add('missing'); continue; }
    if (f.type.startsWith('image/')) el.style.backgroundImage = `url(${URL.createObjectURL(f.blob)})`;
    else el.innerHTML = `<span>${esc((f.name.split('.').pop() || 'plik').toUpperCase())}</span>`;
    el.title = f.name;
  }
}

/* ---------- dane demo ---------- */
function seed() {
  const T = isoLocal();
  const houses = [
    { name: 'Haugland 12', address: 'Herøysund, Kvinnherad', beds: 6 },
    { name: 'Sjøbu 4', address: 'Rosendal, Kvinnherad', beds: 4 },
    { name: 'Fjordtun 7', address: 'Husnes, Kvinnherad', beds: 8 },
  ].map(h => ({ id: uid(), ...h }));
  const cars = [
    { name: 'VW Transporter', plate: 'EL 12345', seats: 6, odometer: 84210, fuel: 'diesel', euDate: addDays(T, 120), serviceKm: 90000 },
    { name: 'Toyota Hilux', plate: 'SV 98231', seats: 5, odometer: 132440, fuel: 'diesel', euDate: addDays(T, 20), serviceKm: 135000 },
    { name: 'Ford Transit', plate: 'BT 55120', seats: 3, odometer: 45100, fuel: 'diesel', euDate: addDays(T, 300), serviceKm: 60000 },
  ].map(c => ({ id: uid(), ...c }));
  const start1 = mondayOf(addDays(T, -10)), start2 = mondayOf(addDays(T, -30));
  const groups = [
    { id: uid(), name: 'Rotacja A', weeksIn: 3, weeksOut: 3, start: start1, color: '#ff7a1a' },
    { id: uid(), name: 'Rotacja B', weeksIn: 4, weeksOut: 2, start: start2, color: '#2f8cff' },
  ];
  const projects = [
    { id: uid(), name: 'Kai Herøysund', code: 'P-101', place: 'Herøysund', active: true },
    { id: uid(), name: 'Hydraulika – Rosendal', code: 'P-102', place: 'Rosendal', active: true },
    { id: uid(), name: 'Warsztat / slanger', code: 'P-103', place: 'Herøysund', active: true },
  ];
  const ppl = [
    ['Ty (Admin)', 'admin', 'admin'], ['Marek Kowalski', 'marek', 'kierownik'], ['Piotr Nowak', 'piotr', 'foreman'],
    ['Jan Wiśniewski', 'jan', 'pracownik'], ['Tomasz Wójcik', 'tomasz', 'pracownik'], ['Krzysztof Kamiński', 'krzysztof', 'pracownik'],
    ['Paweł Lewandowski', 'pawel', 'pracownik'], ['Michał Zieliński', 'michal', 'pracownik'], ['Adam Szymański', 'adam', 'pracownik'],
    ['Łukasz Woźniak', 'lukasz', 'pracownik'], ['Kamil Dąbrowski', 'kamil', 'pracownik'],
  ];
  const users = ppl.map(([name, login, role], i) => ({
    id: uid(), name, login, role, pass: '', phone: '+47 9' + (1000000 + i * 13579).toString().slice(0, 7), email: '',
    houseId: i >= 3 ? houses[i % 3].id : (i === 1 ? houses[0].id : ''),
    carId: i >= 3 && i < 9 ? cars[i % 3].id : '',
    groupId: i >= 2 ? groups[i % 2].id : '', active: true, createdAt: Date.now() - 864e5 * 40,
    lastSeen: Date.now() - (i * 3700000),
  }));
  Object.assign(DB, { houses, cars, groups, projects, users });
  const workers = users.filter(u => u.rank !== 4).slice(2);
  for (let d = 1; d <= 12; d++) {
    const ds = addDays(T, -d); const wd = new Date(ds + 'T12:00').getDay(); if (wd === 0) continue;
    workers.forEach((u, k) => {
      if ((k + d) % 4 === 0) return;
      const p1 = projects[k % 3].id, p2 = projects[(k + 1) % 3].id;
      DB.hours.push({ id: uid(), userId: u.id, date: ds, from: '07:00', to: wd === 6 ? '12:00' : '17:00', breakMin: wd === 6 ? 0 : 30, splits: wd === 6 ? [{ projectId: p1, hours: 5 }] : [{ projectId: p1, hours: 6 }, { projectId: p2, hours: 3.5 }], note: '', createdAt: Date.now() });
    });
  }
  const card1 = { id: uid(), name: 'Circle K – karta 1', last4: '4417', holderId: users[1].id };
  const card2 = { id: uid(), name: 'Uno-X – karta 2', last4: '2290', holderId: users[2].id };
  DB.fuelCards.push(card1, card2);
  DB.cardTransfers.push({ id: uid(), cardId: card2.id, fromId: users[2].id, toId: users[3].id, status: 'pending', createdAt: Date.now() - 3600e3 });
  DB.refuels.push(
    { id: uid(), carId: cars[0].id, userId: users[3].id, date: addDays(T, -9), odometer: 83600, liters: 62, amount: 1395, cardId: card1.id },
    { id: uid(), carId: cars[0].id, userId: users[4].id, date: addDays(T, -2), odometer: 84210, liters: 58, amount: 1310, cardId: card1.id },
  );
  DB.tickets.push({ id: uid(), groupId: groups[0].id, direction: 'PL', date: addDays(T, 9), depTime: '14:35', arrTime: '16:20', flightNo: 'DY1052', airportNO: 'BGO', airportPL: 'Gdańsk (GDN)', note: 'Bilety wrzucę też na grupę. Bagaż 20 kg w cenie.', fileIds: [], createdBy: users[0].id, createdAt: Date.now() - 7200e3 });
  DB.messages.push(
    { id: uid(), fromId: users[1].id, toType: 'group', toId: groups[0].id, text: 'Cześć! Rotacja A – w piątek zebranie o 7:00 przy warsztacie.', createdAt: Date.now() - 5400e3, readBy: [] },
    { id: uid(), fromId: users[0].id, toType: 'all', toId: '', text: 'Witajcie w nowej aplikacji 👋 Wpisujcie codziennie godziny i projekty.', createdAt: Date.now() - 86400e3, readBy: [] },
  );
  DB.docs.push({ id: uid(), userId: users[3].id, name: 'Umowa o pracę 2026 (demo – bez pliku)', fileId: '', createdAt: Date.now() - 864e5 * 5 });
  DB.logs.push({ id: uid(), userId: users[0].id, action: 'Utworzono dane demonstracyjne', at: Date.now() });
}

/* ---------- sesja / uprawnienia ---------- */
let REAL = null;   // zalogowany użytkownik
let ME = null;     // osoba, jako którą oglądamy aplikację
let VIEW = 'dash', ARG = null;
let SELECTED = null; // {id, kind} – wybrany pracownik (tap‑to‑assign)
const ST = { month: monthNow(), hoursTab: 'mine', rotaWeeks: 12, logUser: '', docUser: '', ticketFilter: 'upcoming' };

const rank = (u = ME) => ROLES[u?.role]?.rank || 0;
const can = { manage: () => rank() >= 3, foreman: () => rank() >= 2, admin: () => rank() >= 4 };
const userById = id => DB.users.find(u => u.id === id);
const nameOf = id => userById(id)?.name || '—';
const houseById = id => DB.houses.find(h => h.id === id);
const carById = id => DB.cars.find(c => c.id === id);
const groupById = id => DB.groups.find(g => g.id === id);
const projById = id => DB.projects.find(p => p.id === id);
const activeUsers = () => DB.users.filter(u => u.active !== false);

function touch() {
  if (!REAL) return;
  const u = userById(REAL.id); if (!u) return;
  if (!u.lastSeen || Date.now() - u.lastSeen > 30000) { u.lastSeen = Date.now(); save(); }
}
setInterval(() => { if (REAL && document.visibilityState === 'visible') touch(); }, 60000);

/* ---------- rotacje ---------- */
function rotStatus(group, ds) {
  if (!group || !group.start) return null;
  const days = Math.round((new Date(ds + 'T12:00') - new Date(group.start + 'T12:00')) / 864e5);
  const cyc = ((+group.weeksIn || 0) + (+group.weeksOut || 0)) * 7; if (!cyc) return null;
  const p = ((days % cyc) + cyc) % cyc;
  return p < (+group.weeksIn) * 7 ? 'NO' : 'PL';
}
function nextChange(group, from = isoLocal()) {
  const st = rotStatus(group, from); if (!st) return null;
  for (let i = 1; i < 400; i++) { const ds = addDays(from, i); const s = rotStatus(group, ds); if (s !== st) return { date: ds, to: s, days: i }; }
  return null;
}
const statusPill = s => s ? `<span class="pill ${s === 'NO' ? 'no' : 'pl'}">${s === 'NO' ? 'Norwegia' : 'Polska'}</span>` : '<span class="pill">brak rotacji</span>';

/* ---------- toasty / modale ---------- */
function toast(msg, type = 'ok') {
  const t = document.createElement('div'); t.className = 'toast ' + type;
  t.innerHTML = `${ic(type === 'err' ? 'x' : type === 'info' ? 'bell' : 'check')}<span>${esc(msg)}</span>`;
  $('#toasts').appendChild(t); requestAnimationFrame(() => t.classList.add('in'));
  setTimeout(() => { t.classList.remove('in'); setTimeout(() => t.remove(), 400); }, 3200);
}
let MODAL_SUBMIT = null;
function modal(title, body, opts = {}) {
  const { onSubmit, submitLabel = 'Zapisz', wide = false, danger = null } = opts;
  MODAL_SUBMIT = onSubmit || null;
  $('#modal-root').innerHTML = `<div class="ov" data-act="close-modal-bg"><form class="modal ${wide ? 'wide' : ''}" id="mform" autocomplete="off">
    <div class="m-h"><h3>${esc(title)}</h3><button type="button" class="ib" data-act="close-modal" aria-label="Zamknij">${ic('x')}</button></div>
    <div class="m-b">${body}</div>
    ${onSubmit || danger ? `<div class="m-f">${danger ? `<button type="button" class="btn danger" data-act="${danger.act}" data-id="${danger.id || ''}">${ic('trash')} ${esc(danger.label || 'Usuń')}</button>` : ''}<span class="grow"></span><button type="button" class="btn ghost" data-act="close-modal">Anuluj</button>${onSubmit ? `<button class="btn primary" type="submit">${esc(submitLabel)}</button>` : ''}</div>` : ''}
  </form></div>`;
  requestAnimationFrame(() => $('#modal-root .ov')?.classList.add('in'));
  const f = $('#mform');
  f.onsubmit = async e => {
    e.preventDefault(); if (!MODAL_SUBMIT) return;
    const btn = f.querySelector('button[type=submit]'); if (btn) btn.disabled = true;
    try { const r = await MODAL_SUBMIT(new FormData(f), f); if (r !== false) closeModal(); }
    catch (err) { toast(err.message || String(err), 'err'); }
    finally { if (btn) btn.disabled = false; }
  };
  setTimeout(() => f.querySelector('input:not([type=hidden]):not([type=file]),select,textarea')?.focus({ preventScroll: true }), 60);
}
function closeModal() { const o = $('#modal-root .ov'); if (!o) return; o.classList.remove('in'); setTimeout(() => { $('#modal-root').innerHTML = ''; }, 220); MODAL_SUBMIT = null; }
function confirmBox(text, onYes, yesLabel = 'Tak') { modal('Potwierdź', `<p>${esc(text)}</p>`, { onSubmit: onYes, submitLabel: yesLabel }); }
const opt = (v, label, sel) => `<option value="${esc(v)}" ${sel ? 'selected' : ''}>${esc(label)}</option>`;
const userOpts = (sel, filter = () => true, empty = '— wybierz —') => `<option value="">${empty}</option>` + activeUsers().filter(filter).map(u => opt(u.id, u.name, u.id === sel)).join('');

/* ---------- nawigacja ---------- */
const NAV = [
  { id: 'dash', icon: 'dash', label: 'Pulpit', min: 1 },
  { id: 'hours', icon: 'clock', label: 'Godziny pracy', min: 1 },
  { id: 'rota', icon: 'cal', label: 'Grafik i rotacje', min: 1 },
  { id: 'houses', icon: 'house', label: 'Mapa domów', min: 1 },
  { id: 'cars', icon: 'car', label: 'Auta', min: 1 },
  { id: 'cards', icon: 'card', label: 'Karty paliwowe', min: 1 },
  { id: 'tickets', icon: 'plane', label: 'Bilety i dojazd', min: 1 },
  { id: 'docs', icon: 'file', label: 'Dokumenty', min: 1 },
  { id: 'msgs', icon: 'chat', label: 'Wiadomości', min: 1 },
  { id: 'projects', icon: 'folder', label: 'Projekty', min: 2 },
  { id: 'people', icon: 'users', label: 'Pracownicy', min: 3 },
  { id: 'admin', icon: 'shield', label: 'Panel admina', min: 4 },
];
const BNAV = ['dash', 'hours', 'rota', 'tickets'];

function myMessages(u = ME) {
  return DB.messages.filter(m => m.fromId === u.id || m.toType === 'all' || (m.toType === 'user' && m.toId === u.id) || (m.toType === 'group' && m.toId === u.groupId));
}
const unreadCount = (u = ME) => myMessages(u).filter(m => m.fromId !== u.id && !(m.readBy || []).includes(u.id)).length;
const pendingForMe = (u = ME) => DB.cardTransfers.filter(t => t.status === 'pending' && t.toId === u.id);
function navBadge(id) {
  if (id === 'msgs') return unreadCount();
  if (id === 'cards') return pendingForMe().length;
  return 0;
}

/* ---------- powłoka ---------- */
function previewBar() {
  if (!(PREVIEW || REAL?.role === 'admin')) return '';
  const roles = Object.keys(ROLES);
  const cur = ME.role;
  const sameRole = activeUsers().filter(u => u.role === cur);
  return `<div class="pbar">
    <div class="pbar-l">${ic('eye')}<span class="pbar-t">${PREVIEW ? 'PODGLĄD (bez logowania)' : 'Podgląd jako'}</span></div>
    <div class="seg">${roles.map(r => `<button type="button" class="${cur === r ? 'on' : ''}" data-act="view-as-role" data-role="${r}">${ROLES[r].label}</button>`).join('')}</div>
    ${sameRole.length > 1 ? `<select class="pbar-sel" data-chg="view-as-user">${sameRole.map(u => opt(u.id, u.name, u.id === ME.id)).join('')}</select>` : ''}
    ${ME.id !== REAL.id ? `<button type="button" class="btn sm ghost" data-act="view-as-reset">Wróć do siebie</button>` : ''}
  </div>`;
}
function shell(v) {
  const navItems = NAV.filter(n => rank() >= n.min);
  const link = (n, cls = '') => { const b = navBadge(n.id); return `<a href="#${n.id}" class="${cls} ${VIEW === n.id ? 'on' : ''}" data-act="go" data-v="${n.id}">${ic(n.icon)}<span>${n.label}</span>${b ? `<b class="badge">${b}</b>` : ''}</a>`; };
  const unread = unreadCount();
  return `${previewBar()}
  <div class="shell">
    <aside class="side">
      <div class="brand"><div class="logo">S</div><div><div class="brand-t">CrewControl</div><div class="brand-s">${esc(COMPANY)}</div></div></div>
      <nav class="nav">${navItems.map(n => link(n)).join('')}</nav>
      <div class="side-foot">
        <button type="button" class="me" data-act="profile">${avatar(ME)}<div><div class="me-n">${esc(ME.name)}</div><div class="me-r">${ROLES[ME.role].label}</div></div></button>
      </div>
    </aside>
    <main class="main">
      <header class="top">
        <button type="button" class="ib only-m" data-act="menu" aria-label="Menu">${ic('menu')}</button>
        <div class="tt"><h1>${esc(v.title)}</h1>${v.sub ? `<div class="muted small">${v.sub}</div>` : ''}</div>
        <span class="grow"></span>
        ${v.action || ''}
        <button type="button" class="ib bell" data-act="go" data-v="msgs" aria-label="Wiadomości">${ic('bell')}${unread ? `<b class="dot">${unread}</b>` : ''}</button>
        <button type="button" class="ib av-btn" data-act="profile">${avatar(ME)}</button>
      </header>
      <section class="view" key="${VIEW}">${v.html}</section>
      <footer class="foot">CrewControl v${VERSION} · ${BUILD} · ${esc(COMPANY)} · ${PREVIEW ? 'tryb podglądu (dane demo, lokalnie)' : 'dane zapisywane lokalnie w tej przeglądarce'}</footer>
    </main>
    <nav class="bnav">${BNAV.map(id => { const n = NAV.find(x => x.id === id); const b = navBadge(id); return `<a href="#${id}" class="${VIEW === id ? 'on' : ''}" data-act="go" data-v="${id}">${ic(n.icon)}<span>${n.label.split(' ')[0]}</span>${b ? `<b class="badge">${b}</b>` : ''}</a>`; }).join('')}
      <a href="#more" data-act="menu">${ic('menu')}<span>Więcej</span>${(navBadge('msgs') + navBadge('cards')) ? `<b class="badge">${navBadge('msgs') + navBadge('cards')}</b>` : ''}</a></nav>
  </div>`;
}
let LAST_VIEW = null, LAST_ARG = null, LAST_ME = null;
function render() {
  if (!REAL || !ME) return renderAuth();
  const n = NAV.find(x => x.id === VIEW);
  if ((n && rank() < n.min) || !VIEWS[VIEW]) { VIEW = 'dash'; ARG = null; }
  const still = VIEW === LAST_VIEW && ARG === LAST_ARG && ME.id === LAST_ME;
  LAST_VIEW = VIEW; LAST_ARG = ARG; LAST_ME = ME.id;
  const v = VIEWS[VIEW]();
  $('#app').innerHTML = shell(v);
  if (still) $('.view')?.classList.add('still');
  document.body.classList.toggle('noscroll', !!$('.gwrap.gfull'));
  after(still);
}
function after(still) {
  $$('.gcanvas').forEach(initGraph);
  LAST_ASSIGNED = null;
  $$('.count').forEach(el => {
    const to = parseFloat(el.dataset.to) || 0, dec = +el.dataset.dec || 0, suf = el.dataset.suf || '';
    if (still) { el.textContent = to.toFixed(dec).replace('.', ',') + suf; return; }
    const t0 = performance.now(), d = 900;
    const step = t => { const p = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - p, 3); el.textContent = (to * e).toFixed(dec).replace('.', ',') + suf; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
  requestAnimationFrame(() => $$('.bar i, .hbar i').forEach(b => b.classList.add('go')));
  hydrateThumbs();
  $$('.hform').forEach(updHoursTotal);
}
function go(v, arg = null) { VIEW = v; ARG = arg; SELECTED = null; history.replaceState(null, '', '#' + v); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* ---------- logowanie ---------- */
function renderAuth() {
  const first = DB.users.length === 0;
  $('#app').innerHTML = `<div class="auth"><form class="auth-card" id="authForm">
    <div class="logo big">S</div>
    <h1>CrewControl</h1><p class="muted">${esc(COMPANY)}</p>
    ${first ? `<p class="hint">Pierwsze uruchomienie – utwórz konto administratora.</p>
      <label>Imię i nazwisko<input name="name" required></label>` : ''}
    <label>Login<input name="login" required autocomplete="username" autocapitalize="none"></label>
    <label>Hasło<input name="pass" type="password" required autocomplete="${first ? 'new-password' : 'current-password'}"></label>
    <button class="btn primary block" type="submit">${first ? 'Utwórz konto admina' : 'Zaloguj'}</button>
    <div class="foot">CrewControl v${VERSION} · ${BUILD}</div>
  </form></div>`;
  $('#authForm').onsubmit = async e => {
    e.preventDefault(); const fd = new FormData(e.target);
    const login = String(fd.get('login')).trim().toLowerCase(), pass = String(fd.get('pass'));
    if (first) {
      if (pass.length < 4) return toast('Hasło min. 4 znaki', 'err');
      const u = { id: uid(), name: String(fd.get('name')).trim(), login, pass: await sha(pass), role: 'admin', phone: '', email: '', houseId: '', carId: '', groupId: '', active: true, createdAt: Date.now(), lastSeen: Date.now() };
      DB.users.push(u); REAL = ME = u; log('Utworzono konto administratora'); save();
    } else {
      const u = DB.users.find(x => x.login === login && x.active !== false);
      if (!u || u.pass !== await sha(pass)) return toast('Błędny login lub hasło', 'err');
      REAL = ME = u; log('Zalogowano'); save();
    }
    localStorage.setItem(SESSION_KEY, REAL.id);
    render();
  };
}
function logout() { log('Wylogowano'); save(); localStorage.removeItem(SESSION_KEY); REAL = ME = null; VIEW = 'dash'; render(); }

/* =========================================================
   WIDOKI
   ========================================================= */
const VIEWS = {};
const stat = (label, val, opts = {}) => `<div class="stat anim" style="--i:${opts.i || 0}" ${opts.go ? `data-act="go" data-v="${opts.go}"` : ''}>
  <div class="stat-ic ${opts.tone || ''}">${ic(opts.icon || 'dash')}</div>
  <div><div class="stat-v">${typeof val === 'number' ? `<span class="count" data-to="${val}" data-dec="${opts.dec || 0}" data-suf="${opts.suf || ''}">0</span>` : val}</div><div class="stat-l">${label}</div></div></div>`;
const empty = (t, icon = 'folder') => `<div class="empty">${ic(icon)}<p>${t}</p></div>`;

/* ----- PULPIT ----- */
VIEWS.dash = () => {
  const T = isoLocal(), M = monthNow();
  const g = groupById(ME.groupId), st = rotStatus(g, T), nc = nextChange(g, T);
  const myH = sumH(DB.hours.filter(h => h.userId === ME.id && h.date.startsWith(M)));
  const todayH = DB.hours.filter(h => h.userId === ME.id && h.date === T);
  const pend = pendingForMe();
  const house = houseById(ME.houseId), car = carById(ME.carId);
  const myCards = DB.fuelCards.filter(c => c.holderId === ME.id);
  const tickets = DB.tickets.filter(t => t.groupId === ME.groupId && t.date >= T).sort((a, b) => a.date.localeCompare(b.date));
  const msgs = myMessages().filter(m => m.fromId !== ME.id).sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
  const hr = new Date().getHours();
  const hello = hr < 5 ? 'Dobranoc' : hr < 12 ? 'Dzień dobry' : hr < 18 ? 'Cześć' : 'Dobry wieczór';

  let html = `<div class="hero anim">
    <div><div class="muted small">${fmtDate(T)}</div><h2>${hello}, ${esc(ME.name.split(' ')[0])} 👋</h2>
    <div class="hero-sub">${st ? `Jesteś teraz: ${statusPill(st)} ${nc ? `· zmiana za <b>${nc.days}</b> dni (${fmtDate(nc.date)})` : ''}` : 'Nie masz jeszcze przypisanej rotacji.'}</div></div>
    <div class="hero-act">${todayH.length ? `<span class="pill ok">${ic('check')} Dziś wpisano ${fmtH(sumH(todayH))}</span>` : `<button type="button" class="btn primary" data-act="go" data-v="hours">${ic('plus')} Wpisz dzisiejsze godziny</button>`}</div>
  </div>`;

  if (pend.length) html += pend.map(t => { const c = DB.fuelCards.find(x => x.id === t.cardId); return `<div class="alert anim">${ic('card')}<div class="grow"><b>${esc(nameOf(t.fromId))}</b> przekazuje Ci kartę paliwową <b>${esc(c?.name)}</b> (•••• ${esc(c?.last4)}). Potwierdź, że ją dostałeś.</div><div class="row"><button type="button" class="btn ghost sm" data-act="card-reject" data-id="${t.id}">Odrzuć</button><button type="button" class="btn primary sm" data-act="card-accept" data-id="${t.id}">${ic('check')} Mam kartę</button></div></div>`; }).join('');

  if (can.manage()) {
    const ws = activeUsers();
    const inNO = ws.filter(u => rotStatus(groupById(u.groupId), T) === 'NO').length;
    const beds = DB.houses.reduce((s, h) => s + (+h.beds || 0), 0), occ = ws.filter(u => houseById(u.houseId)).length;
    const teamH = sumH(DB.hours.filter(h => h.date.startsWith(M)));
    const pendAll = DB.cardTransfers.filter(t => t.status === 'pending').length;
    html += `<div class="stats">
      ${stat('Pracowników', ws.length, { icon: 'users', go: 'people', i: 1 })}
      ${stat('W Norwegii teraz', inNO, { icon: 'pin', tone: 'blue', go: 'rota', i: 2 })}
      ${stat(`Łóżka zajęte (z ${beds})`, occ, { icon: 'house', tone: 'green', go: 'houses', i: 3 })}
      ${stat(`Godziny zespołu – ${MONTHS[+M.slice(5) - 1]}`, round2(teamH), { icon: 'clock', go: 'hours', i: 4, dec: 0, suf: ' h' })}
      ${stat('Karty czekają na potw.', pendAll, { icon: 'card', tone: pendAll ? 'warn' : '', go: 'cards', i: 5 })}
      ${stat('Projekty aktywne', DB.projects.filter(p => p.active !== false).length, { icon: 'folder', go: 'projects', i: 6 })}
    </div>`;
    // przyjazdy/wyjazdy w najbliższych 14 dniach
    const moves = [];
    DB.groups.forEach(gr => { const n = nextChange(gr, T); if (n && n.days <= 21) moves.push({ g: gr, ...n, cnt: ws.filter(u => u.groupId === gr.id).length }); });
    html += `<div class="grid2">
      <div class="card anim" style="--i:7"><div class="card-h"><h3>Najbliższe zmiany rotacji</h3></div>
        ${moves.length ? moves.sort((a, b) => a.days - b.days).map(m => `<div class="li"><span class="gdot" style="--c:${esc(m.g.color)}"></span><div class="grow"><b>${esc(m.g.name)}</b> <span class="muted small">(${m.cnt} os.)</span><div class="muted small">${m.to === 'NO' ? 'Przyjazd do Norwegii' : 'Wyjazd do Polski'} · ${fmtDate(m.date)}</div></div><span class="pill ${m.days <= 7 ? 'warn' : ''}">za ${m.days} dni</span></div>`).join('') : empty('Brak zmian w ciągu 3 tygodni', 'cal')}
      </div>
      <div class="card anim" style="--i:8"><div class="card-h"><h3>Auta – przypomnienia</h3></div>
        ${carAlerts().length ? carAlerts().map(a => `<div class="li">${ic('car')}<div class="grow"><b>${esc(a.car.name)}</b> <span class="muted small">${esc(a.car.plate)}</span><div class="muted small">${a.text}</div></div><span class="pill warn">!</span></div>`).join('') : empty('Wszystko w porządku', 'check')}
      </div></div>`;
  } else {
    html += `<div class="stats">
      ${stat(`Moje godziny – ${MONTHS[+M.slice(5) - 1]}`, round2(myH), { icon: 'clock', go: 'hours', i: 1, suf: ' h' })}
      ${stat('Mój dom', house ? esc(house.name) : '—', { icon: 'house', tone: 'green', go: 'houses', i: 2 })}
      ${stat('Moje auto', car ? esc(car.name) : '—', { icon: 'car', tone: 'blue', go: 'cars', i: 3 })}
      ${stat('Karta paliwowa', myCards.length ? esc(myCards.map(c => '•••• ' + c.last4).join(', ')) : 'nie mam', { icon: 'card', go: 'cards', i: 4 })}
    </div>`;
  }
  html += `<div class="grid2">
    <div class="card anim" style="--i:9"><div class="card-h"><h3>Moje bilety</h3><button type="button" class="btn sm ghost" data-act="go" data-v="tickets">Wszystkie</button></div>
      ${tickets.length ? tickets.slice(0, 2).map(ticketMini).join('') : empty('Brak nadchodzących biletów', 'plane')}</div>
    <div class="card anim" style="--i:10"><div class="card-h"><h3>Ostatnie wiadomości</h3><button type="button" class="btn sm ghost" data-act="go" data-v="msgs">Otwórz</button></div>
      ${msgs.length ? msgs.map(m => `<div class="li">${avatar(userById(m.fromId))}<div class="grow"><b>${esc(nameOf(m.fromId))}</b> <span class="muted small">${relTime(m.createdAt)}</span><div class="clamp">${esc(m.text)}</div></div></div>`).join('') : empty('Brak wiadomości', 'chat')}</div>
  </div>`;
  return { title: 'Pulpit', html };
};
function carAlerts() {
  const T = isoLocal(), out = [];
  DB.cars.forEach(c => {
    if (c.euDate) { const d = Math.round((new Date(c.euDate + 'T12:00') - new Date(T + 'T12:00')) / 864e5); if (d <= 45) out.push({ car: c, text: d < 0 ? `EU-kontroll przeterminowana (${fmtDate(c.euDate)})` : `EU-kontroll za ${d} dni (${fmtDate(c.euDate)})` }); }
    if (c.serviceKm && c.odometer && c.serviceKm - c.odometer <= 3000) out.push({ car: c, text: `Serwis przy ${c.serviceKm.toLocaleString('pl')} km – zostało ${(c.serviceKm - c.odometer).toLocaleString('pl')} km` });
  });
  return out;
}

/* ----- GODZINY ----- */
function splitRow(s = {}) {
  const projs = DB.projects.filter(p => p.active !== false || p.id === s.projectId);
  return `<div class="split"><select name="sp_proj"><option value="">— projekt —</option>${projs.map(p => opt(p.id, p.name, p.id === s.projectId)).join('')}</select><input type="number" name="sp_h" min="0" step="0.25" inputmode="decimal" placeholder="h" value="${s.hours ?? ''}"><button type="button" class="ib" data-act="rm-split" aria-label="Usuń">${ic('x')}</button></div>`;
}
function hoursFormHTML(e = {}) {
  const splits = e.splits?.length ? e.splits : [{}];
  return `<div class="hform">
    ${can.foreman() ? `<label>Pracownik<select name="userId">${activeUsers().map(u => opt(u.id, u.name, (e.userId || ME.id) === u.id)).join('')}</select></label>` : ''}
    <div class="g3"><label>Data<input type="date" name="date" value="${e.date || isoLocal()}" required></label>
      <label>Od<input type="time" name="from" value="${e.from || '07:00'}" required></label>
      <label>Do<input type="time" name="to" value="${e.to || '15:30'}" required></label></div>
    <div class="g2"><label>Przerwa (min)<input type="number" name="breakMin" min="0" step="5" value="${e.breakMin ?? 30}"></label>
      <div class="totalbox"><span class="muted small">Czas pracy</span><b class="htot">0 h</b><span class="hrest small"></span></div></div>
    <div class="splits-h"><span>Ile godzin nad którym projektem</span><button type="button" class="btn sm ghost" data-act="add-split">${ic('plus')} projekt</button></div>
    <div class="splits">${splits.map(splitRow).join('')}</div>
    <label>Notatka<input name="note" value="${esc(e.note || '')}" placeholder="opcjonalnie – co robiłeś"></label>
  </div>`;
}
function updHoursTotal(box) {
  if (!box) return;
  const v = n => box.querySelector(`[name=${n}]`)?.value;
  const tot = durH(v('from'), v('to'), v('breakMin'));
  const sp = $$('[name=sp_h]', box).reduce((s, i) => s + (parseFloat(String(i.value).replace(',', '.')) || 0), 0);
  box.querySelector('.htot').textContent = fmtH(tot);
  const r = box.querySelector('.hrest'); const rest = round2(tot - sp);
  r.className = 'hrest small ' + (rest < 0 ? 'bad' : rest > 0 ? 'muted' : 'good');
  r.textContent = sp === 0 ? 'bez podziału na projekty' : rest < 0 ? `projekty: ${fmtH(sp)} – za dużo o ${fmtH(-rest)}` : rest > 0 ? `nieprzypisane: ${fmtH(rest)}` : 'wszystko przypisane ✓';
}
function readHours(fd) {
  const date = fd.get('date'), from = fd.get('from'), to = fd.get('to'), breakMin = +fd.get('breakMin') || 0;
  const tot = durH(from, to, breakMin);
  if (!date || tot <= 0) throw new Error('Sprawdź godziny – czas pracy wychodzi 0');
  const ps = fd.getAll('sp_proj'), hs = fd.getAll('sp_h'); const rows = ps.map((p, i) => ({ projectId: p, raw: String(hs[i] ?? '').trim() })).filter(r => r.projectId);
  const filled = rows.filter(r => r.raw !== ''), blank = rows.filter(r => r.raw === '');
  let splits = filled.map(r => ({ projectId: r.projectId, hours: parseFloat(r.raw.replace(',', '.')) || 0 })).filter(s => s.hours > 0);
  const used = splits.reduce((s, x) => s + x.hours, 0);
  if (blank.length === 1 && tot - used > 0) splits.push({ projectId: blank[0].projectId, hours: round2(tot - used) });
  const sum = splits.reduce((s, x) => s + x.hours, 0);
  if (sum > tot + 0.01) throw new Error(`Suma projektów (${fmtH(sum)}) jest większa niż czas pracy (${fmtH(tot)})`);
  return { date, from, to, breakMin, splits, note: String(fd.get('note') || '').trim(), userId: fd.get('userId') || ME.id };
}
function entryRow(x, showUser) {
  const canEdit = x.userId === ME.id || can.foreman();
  return `<div class="entry anim">
    <div class="e-d"><b>${fmtDate(x.date).split(' ')[0]}</b><span>${x.date.slice(8)}.${x.date.slice(5, 7)}</span></div>
    <div class="grow">${showUser ? `<div><b>${esc(nameOf(x.userId))}</b></div>` : ''}
      <div>${esc(x.from)}–${esc(x.to)} <span class="muted small">· przerwa ${x.breakMin || 0} min</span></div>
      <div class="tags">${(x.splits || []).map(s => `<span class="tag">${esc(projById(s.projectId)?.name || '?')} · ${fmtH(s.hours)}</span>`).join('')}${x.note ? `<span class="muted small">„${esc(x.note)}”</span>` : ''}${x.editedBy && x.editedBy !== x.userId ? `<span class="tag warn">poprawione: ${esc(nameOf(x.editedBy))}</span>` : ''}</div></div>
    <div class="e-h">${fmtH(entryH(x))}</div>
    ${canEdit ? `<button type="button" class="ib" data-act="edit-hours" data-id="${x.id}" aria-label="Edytuj">${ic('edit')}</button>` : ''}
  </div>`;
}
function monthPicker() { return `<input type="month" class="mpick" value="${ST.month}" data-chg="month">`; }
VIEWS.hours = () => {
  const tabs = [['mine', 'Moje'], ...(can.foreman() ? [['team', 'Zespół'], ['proj', 'Projekty']] : [])];
  if (!tabs.find(t => t[0] === ST.hoursTab)) ST.hoursTab = 'mine';
  let html = `<div class="tabs">${tabs.map(([k, l]) => `<button type="button" class="${ST.hoursTab === k ? 'on' : ''}" data-act="hours-tab" data-k="${k}">${l}</button>`).join('')}<span class="grow"></span>${monthPicker()}</div>`;
  const M = ST.month;
  if (ST.hoursTab === 'mine') {
    const list = DB.hours.filter(h => h.userId === ME.id && h.date.startsWith(M)).sort((a, b) => b.date.localeCompare(a.date) || b.from.localeCompare(a.from));
    const byP = {}; list.forEach(x => (x.splits || []).forEach(s => byP[s.projectId] = (byP[s.projectId] || 0) + s.hours));
    const tot = sumH(list);
    html += `<div class="grid2 top-a">
      <form class="card anim" data-sub="hours-add"><div class="card-h"><h3>Dodaj godziny</h3></div>${hoursFormHTML({})}<button class="btn primary block" type="submit">${ic('check')} Zapisz dzień</button></form>
      <div class="card anim" style="--i:1"><div class="card-h"><h3>${fmtMonth(M)}</h3></div>
        <div class="bigtot"><span class="count" data-to="${round2(tot)}" data-dec="${tot % 1 ? 1 : 0}" data-suf=" h">0</span><span class="muted small">${list.length} dni pracy</span></div>
        ${projBars(byP, tot)}
      </div></div>
      <div class="card anim" style="--i:2"><div class="card-h"><h3>Wpisy</h3></div>${list.length ? list.map(x => entryRow(x)).join('') : empty('Brak wpisów w tym miesiącu', 'clock')}</div>`;
  } else if (ST.hoursTab === 'team') {
    const list = DB.hours.filter(h => h.date.startsWith(M));
    const rows = activeUsers().map(u => { const l = list.filter(h => h.userId === u.id); const byP = {}; l.forEach(x => (x.splits || []).forEach(s => byP[s.projectId] = (byP[s.projectId] || 0) + s.hours)); return { u, tot: sumH(l), days: new Set(l.map(x => x.date)).size, byP }; }).sort((a, b) => b.tot - a.tot);
    const max = Math.max(1, ...rows.map(r => r.tot));
    html += `<div class="row wrap gap"><button type="button" class="btn primary" data-act="hours-add-for">${ic('plus')} Wpisz godziny za pracownika</button><button type="button" class="btn ghost" data-act="export-hours">${ic('dl')} Eksport CSV (${fmtMonth(M)})</button></div>
    <div class="card anim"><div class="card-h"><h3>Godziny zespołu – ${fmtMonth(M)}</h3><span class="pill">${fmtH(sumH(list))}</span></div>
    ${rows.map((r, i) => `<div class="trow anim" style="--i:${i}" data-act="user-hours" data-id="${r.u.id}">
      ${avatar(r.u)}<div class="grow"><div class="row"><b>${esc(r.u.name)}</b><span class="muted small">${r.days} dni</span><span class="grow"></span><b>${fmtH(r.tot)}</b></div>
      <div class="hbar"><i style="--w:${r.tot / max * 100}%"></i></div>
      <div class="tags">${Object.entries(r.byP).map(([p, h]) => `<span class="tag">${esc(projById(p)?.name || '?')} ${fmtH(h)}</span>`).join('')}</div></div></div>`).join('')}</div>`;
  } else {
    const list = DB.hours.filter(h => h.date.startsWith(M));
    html += `<div class="pgrid">${DB.projects.map((p, i) => {
      const per = {}; list.forEach(x => (x.splits || []).forEach(s => { if (s.projectId === p.id) per[x.userId] = (per[x.userId] || 0) + s.hours; }));
      const tot = Object.values(per).reduce((a, b) => a + b, 0);
      return `<div class="card anim pcard" style="--i:${i}" data-act="project-detail" data-id="${p.id}"><div class="card-h"><div><h3>${esc(p.name)}</h3><div class="muted small">${esc(p.code || '')} ${p.place ? '· ' + esc(p.place) : ''}</div></div><span class="pill ${p.active === false ? '' : 'ok'}">${fmtH(tot)}</span></div>
      ${Object.entries(per).sort((a, b) => b[1] - a[1]).map(([u, h]) => `<div class="li sm">${avatar(userById(u))}<span class="grow">${esc(nameOf(u))}</span><b>${fmtH(h)}</b></div>`).join('') || '<div class="muted small">Brak godzin w tym miesiącu</div>'}</div>`;
    }).join('') || empty('Brak projektów')}</div>`;
  }
  return { title: 'Godziny pracy', sub: 'Od której do której + podział na projekty', html };
};
function projBars(byP, tot) {
  const e = Object.entries(byP).sort((a, b) => b[1] - a[1]);
  if (!e.length) return '<div class="muted small">Brak podziału na projekty</div>';
  return e.map(([p, h]) => `<div class="pb"><div class="row"><span class="grow">${esc(projById(p)?.name || '?')}</span><b>${fmtH(h)}</b></div><div class="hbar"><i style="--w:${tot ? h / tot * 100 : 0}%"></i></div></div>`).join('');
}

/* ----- GRAFIK / ROTACJE ----- */
VIEWS.rota = () => {
  const T = isoLocal(); const g = groupById(ME.groupId); const st = rotStatus(g, T); const nc = nextChange(g, T);
  let html = `<div class="card hero2 anim ${st === 'NO' ? 'no' : st === 'PL' ? 'pl' : ''}">
    <div class="h2-l"><div class="muted small">Twój status dziś</div><div class="h2-big">${st === 'NO' ? 'Jesteś w Norwegii' : st === 'PL' ? 'Jesteś w Polsce' : 'Brak rotacji'}</div>
    <div class="muted">${g ? `${esc(g.name)} · ${g.weeksIn} tyg. NO / ${g.weeksOut} tyg. PL` : 'Kierownik jeszcze nie przypisał Cię do rotacji.'}</div></div>
    ${nc ? `<div class="h2-r"><div class="ring" style="--p:${Math.max(4, 100 - nc.days / ((st === 'NO' ? g.weeksIn : g.weeksOut) * 7) * 100)}"><div><b class="count" data-to="${nc.days}">0</b><span>dni</span></div></div><div class="small muted center">${nc.to === 'PL' ? 'do wyjazdu do Polski' : 'do przyjazdu do Norwegii'}<br>${fmtDate(nc.date)}</div></div>` : ''}
  </div>`;
  if (g) html += `<div class="card anim" style="--i:1"><div class="card-h"><h3>Mój kalendarz (${ST.rotaWeeks} tygodni)</h3></div>${myCalendar(g)}</div>`;
  if (can.manage()) {
    html += `<div class="card anim" style="--i:2"><div class="card-h"><h3>Grupy rotacyjne</h3><button type="button" class="btn sm primary" data-act="group-edit">${ic('plus')} Grupa</button></div>
      <p class="muted small">Przeciągnij pracownika do grupy (lub dotknij osobę, a potem grupę). Rotację ustawiasz w edycji grupy.</p>
      ${board('group', DB.groups.map(gr => { const s = rotStatus(gr, T), n = nextChange(gr, T); return { id: gr.id, title: gr.name, color: gr.color, sub: `${gr.weeksIn}/${gr.weeksOut} tyg. · teraz ${s === 'NO' ? 'NO' : 'PL'}${n ? ` · zmiana ${fmtDate(n.date)}` : ''}`, edit: 'group-edit' }; }), true)}
    </div>`;
  }
  if (can.foreman()) {
    html += `<div class="card anim" style="--i:3"><div class="card-h"><h3>Plan rotacji – kto gdzie</h3><select data-chg="rota-weeks" class="mini">${[8, 12, 16, 26].map(w => opt(w, w + ' tyg.', w === ST.rotaWeeks)).join('')}</select></div>${teamTimeline()}</div>`;
  }
  return { title: 'Grafik i rotacje', sub: 'Kiedy kto jest w Norwegii, a kiedy w Polsce', html };
};
function myCalendar(g) {
  const start = mondayOf(isoLocal()); const T = isoLocal(); let out = '<div class="cal"><div class="cal-h">' + ['pn', 'wt', 'śr', 'cz', 'pt', 'sb', 'nd'].map(d => `<span>${d}</span>`).join('') + '</div>';
  for (let w = 0; w < ST.rotaWeeks; w++) {
    out += `<div class="cal-w"><span class="wk">${isoWeek(addDays(start, w * 7))}</span>`;
    for (let d = 0; d < 7; d++) { const ds = addDays(start, w * 7 + d); const s = rotStatus(g, ds); const prev = rotStatus(g, addDays(ds, -1)); out += `<span class="cd ${s === 'NO' ? 'no' : 'pl'} ${ds === T ? 'today' : ''} ${prev !== s ? 'chg' : ''}" title="${fmtDate(ds)} – ${s}">${+ds.slice(8)}</span>`; }
    out += '</div>';
  }
  return out + `</div><div class="legend"><span><i class="no"></i>Norwegia</span><span><i class="pl"></i>Polska</span><span><i class="chg"></i>dzień zmiany</span></div>`;
}
function teamTimeline() {
  const start = mondayOf(isoLocal()); const weeks = [...Array(ST.rotaWeeks)].map((_, i) => addDays(start, i * 7));
  const ws = activeUsers().sort((a, b) => (groupById(a.groupId)?.name || 'zz').localeCompare(groupById(b.groupId)?.name || 'zz') || a.name.localeCompare(b.name));
  return `<div class="tl-wrap"><table class="tl"><thead><tr><th>Pracownik</th>${weeks.map(w => `<th>t${isoWeek(w)}<br><span>${w.slice(8)}.${w.slice(5, 7)}</span></th>`).join('')}</tr></thead><tbody>
  ${ws.map(u => { const g = groupById(u.groupId); return `<tr><td><div class="tl-n">${avatar(u)}<div><b>${esc(u.name)}</b><div class="muted small">${g ? esc(g.name) : 'brak'}</div></div></div></td>${weeks.map(w => { const s = rotStatus(g, addDays(w, 3)); const s0 = rotStatus(g, w), s6 = rotStatus(g, addDays(w, 6)); return `<td><span class="tc ${s ? s.toLowerCase() : 'none'} ${s0 !== s6 ? 'chg' : ''}">${s || ''}</span></td>`; }).join('')}</tr>`; }).join('')}
  </tbody></table></div>`;
}

/* ----- TABLICA (domy / auta / grupy) ----- */
function board(kind, containers, editable) {
  const field = { house: 'houseId', car: 'carId', group: 'groupId' }[kind];
  const ws = activeUsers();
  const ids = new Set(containers.map(c => c.id));
  const un = ws.filter(u => !ids.has(u[field]));
  const chip = u => personChip(u, kind, { editable });
  const label = { house: 'Bez domu', car: 'Bez auta', group: 'Bez rotacji' }[kind];
  return `<div class="board ${SELECTED?.kind === kind ? 'picking' : ''}">
    ${editable ? `<div class="pool dz" data-drop="" data-kind="${kind}" data-act="drop"><div class="pool-h">${label} <b>${un.length}</b></div><div class="chips">${un.map(chip).join('') || '<div class="muted small">Wszyscy przypisani ✓</div>'}</div></div>` : ''}
    <div class="tiles">${containers.map((c, i) => {
      const mem = ws.filter(u => u[field] === c.id); const pct = c.cap ? Math.min(100, mem.length / c.cap * 100) : 0; const full = c.cap && mem.length >= c.cap;
      return `<div class="tile dz anim ${mem.some(u => u.id === ME.id) ? 'mine' : ''}" style="--i:${i};${c.color ? `--gc:${esc(c.color)}` : ''}" ${editable ? `data-drop="${c.id}" data-kind="${kind}" data-act="drop"` : ''}>
        <div class="tile-h"><div class="grow"><div class="tile-t">${c.color ? `<span class="gdot" style="--c:${esc(c.color)}"></span>` : ''}${esc(c.title)}</div><div class="muted small">${esc(c.sub || '')}</div></div>
          ${c.cap ? `<div class="occ ${full ? 'full' : ''}"><b>${mem.length}</b>/${c.cap}</div>` : `<div class="occ"><b>${mem.length}</b></div>`}
          ${editable && c.edit ? `<button type="button" class="ib sm" data-act="${c.edit}" data-id="${c.id}" aria-label="Edytuj">${ic('edit')}</button>` : ''}</div>
        ${c.cap ? `<div class="bar ${full ? 'full' : ''}"><i style="--w:${pct}%"></i></div>` : ''}
        <div class="chips">${mem.map(chip).join('') || `<div class="muted small">${editable ? 'Przeciągnij tu osobę' : 'Pusto'}</div>`}</div>${c.extra || ''}</div>`;
    }).join('') || empty('Brak pozycji – dodaj pierwszą')}</div></div>`;
}
function assign(kind, userId, targetId) {
  const field = { house: 'houseId', car: 'carId', group: 'groupId' }[kind];
  const u = userById(userId); if (!u) return;
  if (u[field] === targetId) { SELECTED = null; return render(); }
  if (targetId && kind === 'house') { const h = houseById(targetId); const n = activeUsers().filter(x => x.houseId === targetId).length; if (h.beds && n >= h.beds) { SELECTED = null; render(); return toast(`${h.name} jest pełny (${n}/${h.beds})`, 'err'); } }
  if (targetId && kind === 'car') { const c = carById(targetId); const n = activeUsers().filter(x => x.carId === targetId).length; if (c.seats && n >= c.seats) { SELECTED = null; render(); return toast(`${c.name} – brak wolnych miejsc (${n}/${c.seats})`, 'err'); } }
  u[field] = targetId || '';
  LAST_ASSIGNED = u.id;
  const tName = targetId ? (kind === 'house' ? houseById(targetId)?.name : kind === 'car' ? carById(targetId)?.name : groupById(targetId)?.name) : '—';
  log(`${u.name} → ${{ house: 'dom', car: 'auto', group: 'rotacja' }[kind]}: ${tName}`);
  save(); SELECTED = null; render(); toast(`${u.name} → ${tName}`);
}

/* =========================================================
   MAPA – kafelki jak w GitHub Actions / mapa myśli
   ========================================================= */
const GV = {};   // widok mapy per rodzaj: {s, x, y}
const GOPT = { house: { filter: 'free', full: false }, car: { filter: 'free', full: false } };
let LAST_ASSIGNED = null;
let SUPPRESS_CLICK_UNTIL = 0;
const G_CFG = {
  house: { field: 'houseId', items: () => DB.houses, cap: h => +h.beds || 0, sub: h => h.address || 'brak adresu', hubT: COMPANY, hubS: (n, u, c) => `${n} domów · ${u}/${c} miejsc zajętych`, none: 'Bez domu', unit: 'dom', edit: 'house-edit', icon: 'house', pin: 'pin' },
  car: { field: 'carId', items: () => DB.cars, cap: c => +c.seats || 0, sub: c => `${c.plate || '—'} · ${(+c.odometer || 0).toLocaleString('pl')} km`, hubT: 'Flota aut', hubS: (n, u, c) => `${n} aut · ${u}/${c} miejsc zajętych`, none: 'Bez auta', unit: 'auto', edit: 'car-edit', icon: 'car', pin: 'car' },
};
function layoutOf(kind) {
  DB.layout = DB.layout || {};
  const L = DB.layout[kind] = DB.layout[kind] || {};
  L.pos = L.pos || {};
  return L;
}
function personChip(u, kind, opts = {}) {
  const sel = SELECTED?.id === u.id && SELECTED.kind === kind;
  return `<div class="chip ${sel ? 'sel' : ''} ${u.id === ME.id ? 'me' : ''} ${LAST_ASSIGNED === u.id ? 'pop' : ''}" ${opts.editable ? `data-drag="${u.id}" data-kind="${kind}" data-act="pick"` : ''} data-name="${esc(u.name.toLowerCase())}">${avatar(u)}<span class="cn">${esc(u.name)}</span>${opts.where ? `<span class="cw">${esc(opts.where)}</span>` : ''}</div>`;
}
function graphHTML(kind) {
  const C = G_CFG[kind], ed = can.manage(), ws = activeUsers(), items = C.items(), o = GOPT[kind];
  const ids = new Set(items.map(i => i.id));
  const totalCap = items.reduce((s, i) => s + C.cap(i), 0);
  const used = ws.filter(u => ids.has(u[C.field])).length;
  const pool = ws.filter(u => o.filter === 'all' || !ids.has(u[C.field]));
  const node = it => {
    const cap = C.cap(it), mem = ws.filter(u => u[C.field] === it.id);
    const full = cap && mem.length >= cap, stt = !mem.length ? 'idle' : full ? 'full' : 'ok';
    const free = Math.max(0, cap - mem.length);
    return `<div class="gn dz st-${stt} ${mem.some(u => u.id === ME.id) ? 'mine' : ''}" data-node="${it.id}" data-kind="${kind}" ${ed ? `data-drop="${it.id}" data-act="drop"` : ''}>
      <div class="gn-h">
        <span class="gst">${stt === 'ok' ? ic('check') : stt === 'full' ? ic('warn') : ''}</span>
        <span class="gn-t">${esc(it.name)}</span>
        <span class="gn-c"><b>${mem.length}</b>/${cap || '–'}</span>
        ${ed ? `<button type="button" class="ib sm gn-e" data-act="${C.edit}" data-id="${it.id}" aria-label="Edytuj">${ic('edit')}</button>` : ''}
      </div>
      <div class="gn-sub">${ic(C.pin)}<span>${esc(C.sub(it))}</span></div>
      ${cap ? `<div class="bar ${full ? 'full' : ''}"><i style="--w:${Math.min(100, mem.length / cap * 100)}%"></i></div>` : ''}
      <div class="gn-ppl">${mem.map(u => personChip(u, kind, { editable: ed })).join('')}${[...Array(Math.min(free, 8))].map(() => '<span class="slot">wolne miejsce</span>').join('')}${free > 8 ? `<span class="slot">+${free - 8} wolnych</span>` : ''}</div>
    </div>`;
  };
  const mode = layoutOf(kind).mode || '';
  return `<div class="gwrap ${o.full ? 'gfull' : ''} ${ed ? 'ed' : ''}">
    ${ed ? `<aside class="gpanel dz" data-drop="" data-kind="${kind}" data-act="drop">
      <div class="gp-h"><b>Pracownicy</b><span class="pill">${ws.length - used} ${kind === 'house' ? 'bez domu' : 'bez auta'}</span></div>
      <input class="gp-search" type="search" placeholder="Szukaj pracownika…" data-gsearch>
      <div class="gp-tabs"><button type="button" class="${o.filter === 'free' ? 'on' : ''}" data-act="g-filter" data-kind="${kind}" data-f="free">${C.none}</button><button type="button" class="${o.filter === 'all' ? 'on' : ''}" data-act="g-filter" data-kind="${kind}" data-f="all">Wszyscy</button></div>
      <div class="gp-list">${pool.map(u => personChip(u, kind, { editable: true, where: o.filter === 'all' ? (items.find(i => i.id === u[C.field])?.name || C.none) : '' })).join('') || `<div class="muted small gp-empty">Każdy ma przypisany ${C.unit} ✓</div>`}</div>
      <div class="gp-hint muted small">Przeciągnij osobę na kafelek (na telefonie: przytrzymaj i przeciągnij) albo dotknij osobę, a potem kafelek. Upuść tutaj, aby wypisać.</div>
    </aside>` : ''}
    <div class="gcanvas" data-gkind="${kind}">
      <div class="gworld">
        <svg class="gedges" width="1" height="1" aria-hidden="true"></svg>
        <div class="gn hub" data-node="__hub"><div class="gn-h"><span class="logo sm">${kind === 'house' ? 'S' : ic('car')}</span><span class="gn-t">${esc(C.hubT)}</span></div><div class="gn-sub"><span>${C.hubS(items.length, used, totalCap)}</span></div><div class="bar"><i style="--w:${totalCap ? Math.min(100, used / totalCap * 100) : 0}%"></i></div></div>
        ${items.map(node).join('')}
      </div>
      ${!items.length ? `<div class="g-empty">${ic(C.icon)}<p>Brak pozycji.${ed ? ` Dodaj pierwszy ${C.unit} przyciskiem u góry.` : ''}</p></div>` : ''}
      ${ed ? `<div class="gctl-l"><select class="gsel" data-chg="g-layout" data-kind="${kind}" aria-label="Układ">${opt('', 'Układ…', !mode)}${opt('tree', 'Drzewo (GitHub)', false)}${opt('mind', 'Mapa myśli', false)}${opt('list', 'Lista pionowa', false)}</select></div>` : ''}
      <div class="gctl">
        <span class="gzoom">100%</span>
        <button type="button" class="gbtn" data-act="g-fit" data-kind="${kind}" title="Dopasuj do ekranu">${ic('target')}</button>
        <button type="button" class="gbtn" data-act="g-full" data-kind="${kind}" title="${o.full ? 'Zamknij pełny ekran' : 'Pełny ekran'}">${ic(o.full ? 'shrink' : 'expand')}</button>
        <div class="gseg"><button type="button" class="gbtn" data-act="g-zoom" data-kind="${kind}" data-d="-1" aria-label="Pomniejsz">${ic('minus')}</button><button type="button" class="gbtn" data-act="g-zoom" data-kind="${kind}" data-d="1" aria-label="Powiększ">${ic('plus')}</button></div>
      </div>
    </div>
  </div>`;
}
function graphAutoLayout(cv, mode) {
  const kind = cv.dataset.gkind, L = layoutOf(kind), P = L.pos = {};
  const hub = $('.gn.hub', cv), nodes = $$('.gn:not(.hub)', cv);
  const hw = hub.offsetWidth, hh = hub.offsetHeight, nw = nodes[0]?.offsetWidth || 280, gap = 22;
  const colH = arr => arr.reduce((s, n) => s + n.offsetHeight + gap, -gap);
  if (mode === 'mind') {
    const right = nodes.filter((_, i) => i % 2 === 0), left = nodes.filter((_, i) => i % 2 === 1);
    const H = Math.max(colH(right), colH(left), hh);
    const hx = nw + 110;
    P.__hub = { x: hx, y: H / 2 - hh / 2 };
    let y = (H - colH(right)) / 2; right.forEach(n => { P[n.dataset.node] = { x: hx + hw + 110, y }; y += n.offsetHeight + gap; });
    y = (H - colH(left)) / 2; left.forEach(n => { P[n.dataset.node] = { x: 0, y }; y += n.offsetHeight + gap; });
  } else if (mode === 'list') {
    P.__hub = { x: 0, y: 0 };
    let y = hh + 34; nodes.forEach(n => { P[n.dataset.node] = { x: 46, y }; y += n.offsetHeight + gap; });
  } else {
    // jak w GitHub Actions: centrum po lewej, kafelki w jednej kolumnie po prawej
    P.__hub = { x: 0, y: 0 };
    let y = 0; nodes.forEach(n => { P[n.dataset.node] = { x: hw + 130, y }; y += n.offsetHeight + gap; });
  }
  L.mode = mode;
}
function graphPlaceMissing(cv) {
  const L = layoutOf(cv.dataset.gkind), P = L.pos;
  const nodes = $$('.gn:not(.hub)', cv), missing = nodes.filter(n => !P[n.dataset.node]);
  if (!missing.length) return;
  const placed = nodes.filter(n => P[n.dataset.node]);
  if (!P.__hub || !placed.length) return graphAutoLayout(cv, L.mode || (cv.clientWidth < 640 ? 'list' : 'tree'));
  const maxX = Math.max(...placed.map(n => P[n.dataset.node].x));
  let bottom = Math.max(...placed.filter(n => P[n.dataset.node].x === maxX).map(n => P[n.dataset.node].y + n.offsetHeight));
  missing.forEach(n => { P[n.dataset.node] = { x: maxX, y: bottom + 22 }; bottom += n.offsetHeight + 22; });
}
function edgePath(x1, y1, x2, y2, dir) {
  const dx = (x2 - x1) * dir, dy = y2 - y1;
  if (dx < 70) { const c = Math.max(60, Math.abs(dx) / 2 + 40); return `M${x1} ${y1} C${x1 + c * dir} ${y1}, ${x2 - c * dir} ${y2}, ${x2} ${y2}`; }
  if (Math.abs(dy) < 1) return `M${x1} ${y1} H${x2}`;
  const mx = x1 + 36 * dir, r = Math.min(14, Math.abs(dy) / 2), s = Math.sign(dy);
  return `M${x1} ${y1} H${mx - r * dir} Q${mx} ${y1} ${mx} ${y1 + r * s} V${y2 - r * s} Q${mx} ${y2} ${mx + r * dir} ${y2} H${x2}`;
}
function drawEdges(cv) {
  const P = layoutOf(cv.dataset.gkind).pos, hub = $('.gn.hub', cv), svg = $('.gedges', cv);
  const hp = P.__hub; if (!hp || !svg) return;
  const hw = hub.offsetWidth, hh = hub.offsetHeight, PY = 25;
  let paths = '', dots = '';
  const hubPorts = new Set();
  $$('.gn:not(.hub)', cv).forEach(n => {
    const p = P[n.dataset.node]; if (!p) return;
    const w = n.offsetWidth;
    const st = n.classList.contains('st-full') ? 'full' : n.classList.contains('st-ok') ? 'ok' : 'idle';
    let d, x2, y2 = p.y + PY;
    if (p.y > hp.y + hh + 8 && p.x > hp.x + 8 && p.x < hp.x + hw - 20) {
      // węzeł pod centrum – pionowy pień z dołu (układ lista)
      const x1 = hp.x + 24, y1 = hp.y + hh; x2 = p.x; const r = 14;
      d = `M${x1} ${y1} V${y2 - r} Q${x1} ${y2} ${x1 + r} ${y2} H${x2}`;
      hubPorts.add(`${x1},${y1}`);
    } else {
      const right = p.x + w / 2 >= hp.x + hw / 2, dir = right ? 1 : -1;
      const x1 = right ? hp.x + hw : hp.x, y1 = hp.y + PY; x2 = right ? p.x : p.x + w;
      d = edgePath(x1, y1, x2, y2, dir); hubPorts.add(`${x1},${y1}`);
    }
    paths += `<path class="e e-${st}" d="${d}"/>${st !== 'idle' ? `<path class="e-flow e-${st}" d="${d}"/>` : ''}`;
    dots += `<circle class="port p-${st}" cx="${x2}" cy="${y2}" r="5"/>`;
  });
  hubPorts.forEach(k => { const [x, y] = k.split(','); dots += `<circle class="port hubp" cx="${x}" cy="${y}" r="5"/>`; });
  svg.innerHTML = paths + dots;
}
function applyView(cv) {
  const v = GV[cv.dataset.gkind]; if (!v) return;
  $('.gworld', cv).style.transform = `translate(${v.x}px,${v.y}px) scale(${v.s})`;
  cv.style.backgroundPosition = `${v.x}px ${v.y}px`;
  cv.style.backgroundSize = `${22 * v.s}px ${22 * v.s}px`;
  const z = $('.gzoom', cv); if (z) z.textContent = Math.round(v.s * 100) + '%';
}
function graphBounds(cv) {
  const P = layoutOf(cv.dataset.gkind).pos; const b = [Infinity, Infinity, -Infinity, -Infinity];
  $$('.gn', cv).forEach(n => { const p = P[n.dataset.node]; if (!p) return; b[0] = Math.min(b[0], p.x); b[1] = Math.min(b[1], p.y); b[2] = Math.max(b[2], p.x + n.offsetWidth); b[3] = Math.max(b[3], p.y + n.offsetHeight); });
  return b;
}
function fitGraph(cv) {
  const kind = cv.dataset.gkind; const [x0, y0, x1, y1] = graphBounds(cv);
  const cw = cv.clientWidth, ch = cv.clientHeight, pad = cw < 500 ? 14 : 40, bottomBar = 56;
  if (!isFinite(x0)) { GV[kind] = { s: 1, x: pad, y: pad }; return applyView(cv); }
  const ws = (cw - pad * 2) / (x1 - x0), hs = (ch - pad - bottomBar) / (y1 - y0);
  const s = Math.max(0.3, Math.min(1.1, ws, Math.max(hs, 0.72)));
  const tooTall = (y1 - y0) * s > ch - pad - bottomBar;
  GV[kind] = { s, x: Math.max(pad, (cw - (x1 - x0) * s) / 2) - x0 * s, y: (tooTall ? pad + (cv.querySelector('.gctl-l') ? 34 : 0) : Math.max(pad, (ch - bottomBar - (y1 - y0) * s) / 2)) - y0 * s };
  applyView(cv);
}
function zoomAt(cv, cx, cy, f) {
  const v = GV[cv.dataset.gkind]; if (!v) return;
  const wx = (cx - v.x) / v.s, wy = (cy - v.y) / v.s;
  const s = Math.max(0.25, Math.min(2.2, v.s * f));
  v.x = cx - wx * s; v.y = cy - wy * s; v.s = s; applyView(cv);
}
function initGraph(cv) {
  const kind = cv.dataset.gkind, L = layoutOf(kind);
  const nodes = $$('.gn', cv);
  if (!L.pos.__hub) graphAutoLayout(cv, L.mode || (cv.clientWidth < 640 ? 'list' : 'tree'));
  else graphPlaceMissing(cv);
  nodes.forEach(n => { const p = L.pos[n.dataset.node]; if (p) { n.style.left = p.x + 'px'; n.style.top = p.y + 'px'; } });
  drawEdges(cv);
  if (!GV[kind]) fitGraph(cv); else applyView(cv);
  bindGraph(cv);
}
function bindGraph(cv) {
  const kind = cv.dataset.gkind, L = layoutOf(kind), ed = can.manage();
  const pts = new Map(); let st = null; let raf = 0;
  const redraw = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; drawEdges(cv); }); };
  cv.addEventListener('pointerdown', e => {
    if (e.target.closest('.chip[data-drag], button, select, .gctl, .gctl-l')) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2) {
      const [a, b] = [...pts.values()]; const r = cv.getBoundingClientRect(); const v = GV[kind];
      const cx = (a.x + b.x) / 2 - r.left, cy = (a.y + b.y) / 2 - r.top;
      st = { mode: 'pinch', d0: Math.hypot(a.x - b.x, a.y - b.y), wx: (cx - v.x) / v.s, wy: (cy - v.y) / v.s, s0: v.s, moved: true };
      return;
    }
    const node = e.target.closest('.gn'); const handle = e.target.closest('.gn-h');
    if (node && (handle || node.classList.contains('hub')) && ed) st = { mode: 'node', node, id: node.dataset.node, x0: e.clientX, y0: e.clientY, orig: { ...L.pos[node.dataset.node] }, moved: false, pid: e.pointerId };
    else st = { mode: 'pan', x0: e.clientX, y0: e.clientY, orig: { ...GV[kind] }, moved: false, pid: e.pointerId };
  });
  cv.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId) || !st) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const v = GV[kind];
    if (st.mode === 'pinch') {
      if (pts.size < 2) return; const [a, b] = [...pts.values()]; const r = cv.getBoundingClientRect();
      const s = Math.max(0.25, Math.min(2.2, st.s0 * Math.hypot(a.x - b.x, a.y - b.y) / st.d0));
      const cx = (a.x + b.x) / 2 - r.left, cy = (a.y + b.y) / 2 - r.top;
      v.s = s; v.x = cx - st.wx * s; v.y = cy - st.wy * s; applyView(cv); return;
    }
    const dx = e.clientX - st.x0, dy = e.clientY - st.y0;
    if (!st.moved) { if (Math.hypot(dx, dy) < 5) return; st.moved = true; try { cv.setPointerCapture(e.pointerId); } catch (_) { } cv.classList.add(st.mode === 'node' ? 'moving' : 'panning'); if (st.mode === 'node') st.node.classList.add('lift'); }
    if (st.mode === 'node') {
      const p = L.pos[st.id] = { x: Math.round(st.orig.x + dx / v.s), y: Math.round(st.orig.y + dy / v.s) };
      st.node.style.left = p.x + 'px'; st.node.style.top = p.y + 'px'; redraw();
    } else { v.x = st.orig.x + dx; v.y = st.orig.y + dy; applyView(cv); }
  });
  const end = e => {
    pts.delete(e.pointerId);
    if (!st) return;
    if (st.moved) SUPPRESS_CLICK_UNTIL = Date.now() + 350;
    if (st.mode === 'node' && st.moved) { st.node.classList.remove('lift'); L.mode = 'custom'; save(); drawEdges(cv); }
    cv.classList.remove('moving', 'panning');
    if (pts.size === 0) st = null;
    else if (st.mode === 'pinch') { const [p] = [...pts.values()]; st = { mode: 'pan', x0: p.x, y0: p.y, orig: { ...GV[kind] }, moved: true }; }
  };
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  cv.addEventListener('wheel', e => {
    if (e.ctrlKey || e.metaKey) { e.preventDefault(); const r = cv.getBoundingClientRect(); zoomAt(cv, e.clientX - r.left, e.clientY - r.top, Math.exp(-e.deltaY * 0.01)); }
    else if (GOPT[kind].full) { e.preventDefault(); const v = GV[kind]; v.x -= e.deltaX; v.y -= e.deltaY; applyView(cv); }
  }, { passive: false });
}

/* ----- przeciąganie osób (mysz + dotyk) ----- */
let CD = null;
function chipDragStart() {
  const c = CD.chip, r = c.getBoundingClientRect();
  const g = c.cloneNode(true); g.className = 'chip ghost'; g.style.width = r.width + 'px';
  document.body.appendChild(g);
  Object.assign(CD, { ghost: g, ox: CD.x0 - r.left, oy: CD.y0 - r.top, active: true });
  c.classList.add('dragging'); document.body.classList.add('chipdrag'); document.body.dataset.dragKind = CD.kind;
  try { navigator.vibrate && navigator.vibrate(12); } catch (_) { }
  chipDragMove(CD.lx, CD.ly);
}
function chipDragMove(x, y) {
  CD.ghost.style.transform = `translate(${x - CD.ox}px,${y - CD.oy}px) rotate(-2deg) scale(1.06)`;
  const el = document.elementFromPoint(x, y); const z = el && el.closest('.dz');
  const ok = z && z.dataset.kind === CD.kind && z.dataset.drop !== undefined ? z : null;
  if (CD.over !== ok) { CD.over?.classList.remove('over'); ok?.classList.add('over'); CD.over = ok; }
}
function chipDragEnd(drop) {
  const d = CD; CD = null; clearTimeout(d.timer);
  if (!d.active) return;
  d.ghost.remove(); d.chip.classList.remove('dragging'); d.over?.classList.remove('over');
  document.body.classList.remove('chipdrag'); delete document.body.dataset.dragKind;
  SUPPRESS_CLICK_UNTIL = Date.now() + 400;
  if (drop && d.over) assign(d.kind, d.id, d.over.dataset.drop);
}

/* ----- DOMY ----- */
VIEWS.houses = () => {
  const ed = can.manage();
  const ws = activeUsers(); const beds = DB.houses.reduce((s, h) => s + (+h.beds || 0), 0); const occ = ws.filter(u => houseById(u.houseId)).length;
  const html = `<div class="stats s3">${stat('Domy', DB.houses.length, { icon: 'house' })}${stat('Zajęte miejsca', occ, { icon: 'users', tone: 'green', i: 1 })}${stat('Wolne miejsca', Math.max(0, beds - occ), { icon: 'check', tone: 'blue', i: 2 })}</div>
    ${graphHTML('house')}`;
  return { title: 'Mapa domów', sub: ed ? 'Każdy dom to kafelek – przeciągaj ludzi z listy' : 'Kto gdzie mieszka', html, action: ed ? `<button type="button" class="btn primary" data-act="house-edit">${ic('plus')}<span class="hide-s"> Dom</span></button>` : '' };
};

/* ----- AUTA ----- */
function carStats(c) {
  const r = DB.refuels.filter(x => x.carId === c.id).sort((a, b) => (a.odometer || 0) - (b.odometer || 0));
  let cons = null; if (r.length >= 2) { const km = r[r.length - 1].odometer - r[0].odometer; const l = r.slice(1).reduce((s, x) => s + (+x.liters || 0), 0); if (km > 0) cons = l / km * 100; }
  const M = monthNow(); const mr = r.filter(x => x.date.startsWith(M));
  return { refuels: r, cons, monthL: mr.reduce((s, x) => s + (+x.liters || 0), 0), monthNOK: mr.reduce((s, x) => s + (+x.amount || 0), 0), last: [...r].sort((a, b) => b.date.localeCompare(a.date))[0] };
}
VIEWS.cars = () => {
  const ed = can.manage();
  let html = '';
  html += graphHTML('car');
  html += `<h2 class="sec-t">Szczegóły aut</h2><div class="cgrid">${DB.cars.map((c, i) => {
    const s = carStats(c); const users = activeUsers().filter(u => u.carId === c.id);
    return `<div class="card car anim ${ME.carId === c.id ? 'mine' : ''}" style="--i:${i}">
      <div class="card-h"><div><h3>${esc(c.name)}</h3><span class="plate">${esc(c.plate || '—')}</span></div>${ed ? `<button type="button" class="ib" data-act="car-edit" data-id="${c.id}">${ic('edit')}</button>` : ''}</div>
      <div class="kv"><div><span>Przebieg</span><b>${(+c.odometer || 0).toLocaleString('pl')} km</b></div><div><span>Spalanie</span><b>${s.cons ? fmtNum(s.cons) + ' l/100' : '—'}</b></div>
      <div><span>Ten miesiąc</span><b>${fmtNum(s.monthL)} l · ${Math.round(s.monthNOK).toLocaleString('pl')} kr</b></div><div><span>EU-kontroll</span><b>${c.euDate ? fmtDate(c.euDate) : '—'}</b></div></div>
      <div class="tags">${users.map(u => `<span class="tag">${esc(u.name)}</span>`).join('') || '<span class="muted small">Nikt nie przypisany</span>'}</div>
      <div class="row gap"><button type="button" class="btn sm primary" data-act="refuel-add" data-id="${c.id}">${ic('fuel')} Tankowanie</button><button type="button" class="btn sm ghost" data-act="car-history" data-id="${c.id}">Historia (${s.refuels.length})</button><button type="button" class="btn sm ghost" data-act="odo" data-id="${c.id}">Licznik</button></div>
    </div>`;
  }).join('') || empty('Brak aut', 'car')}</div>`;
  return { title: 'Auta', sub: 'Przebiegi, tankowania, przypisania', html, action: ed ? `<button type="button" class="btn primary" data-act="car-edit">${ic('plus')}<span class="hide-s"> Auto</span></button>` : '' };
};

/* ----- KARTY PALIWOWE ----- */
VIEWS.cards = () => {
  const ed = can.manage();
  let html = pendingForMe().map(t => { const c = DB.fuelCards.find(x => x.id === t.cardId); return `<div class="alert anim">${ic('card')}<div class="grow"><b>${esc(nameOf(t.fromId))}</b> przekazuje Ci <b>${esc(c?.name)}</b> (•••• ${esc(c?.last4)}).</div><div class="row"><button type="button" class="btn ghost sm" data-act="card-reject" data-id="${t.id}">Odrzuć</button><button type="button" class="btn primary sm" data-act="card-accept" data-id="${t.id}">${ic('check')} Potwierdzam odbiór</button></div></div>`; }).join('');
  html += `<div class="cgrid">${DB.fuelCards.map((c, i) => {
    const pend = DB.cardTransfers.find(t => t.cardId === c.id && t.status === 'pending');
    const mine = c.holderId === ME.id;
    return `<div class="fcard anim ${mine ? 'mine' : ''}" style="--i:${i}">
      <div class="fc-top"><span class="chipc"></span><span class="fc-name">${esc(c.name)}</span>${ed ? `<button type="button" class="ib sm" data-act="card-edit" data-id="${c.id}">${ic('edit')}</button>` : ''}</div>
      <div class="fc-num">•••• •••• •••• ${esc(c.last4 || '????')}</div>
      <div class="fc-bot"><div><span>Ma kartę</span><b>${c.holderId ? esc(nameOf(c.holderId)) : 'w biurze'}</b></div>
      ${pend ? `<span class="pill warn">czeka na: ${esc(nameOf(pend.toId))}</span>` : ''}</div>
      <div class="row gap">
        ${(mine || ed) && !pend ? `<button type="button" class="btn sm primary" data-act="card-give" data-id="${c.id}">${ic('swap')} Przekaż</button>` : ''}
        ${pend && (pend.fromId === ME.id || ed) ? `<button type="button" class="btn sm ghost" data-act="card-cancel" data-id="${pend.id}">Anuluj przekazanie</button>` : ''}
        <button type="button" class="btn sm ghost" data-act="card-history" data-id="${c.id}">Historia</button></div>
    </div>`;
  }).join('') || empty('Brak kart paliwowych', 'card')}</div>`;
  const hist = [...DB.cardTransfers].sort((a, b) => b.createdAt - a.createdAt).slice(0, 15);
  html += `<div class="card anim"><div class="card-h"><h3>Ostatnie przekazania</h3></div>${hist.map(transferRow).join('') || empty('Brak przekazań', 'swap')}</div>`;
  return { title: 'Karty paliwowe', sub: 'Przekazanie wymaga potwierdzenia przez odbiorcę', html, action: ed ? `<button type="button" class="btn primary" data-act="card-edit">${ic('plus')}<span class="hide-s"> Karta</span></button>` : '' };
};
function transferRow(t) {
  const c = DB.fuelCards.find(x => x.id === t.cardId);
  const st = { pending: ['warn', 'czeka'], accepted: ['ok', 'potwierdzone'], rejected: ['bad', 'odrzucone'], cancelled: ['', 'anulowane'] }[t.status] || ['', t.status];
  return `<div class="li"><div class="grow"><b>${esc(nameOf(t.fromId))}</b> → <b>${esc(nameOf(t.toId))}</b><div class="muted small">${esc(c?.name || '')} · ${fmtTs(t.createdAt)}${t.resolvedAt ? ' · ' + fmtTs(t.resolvedAt) : ''}</div></div><span class="pill ${st[0]}">${st[1]}</span></div>`;
}

/* ----- BILETY ----- */
function ticketMini(t) {
  const g = groupById(t.groupId);
  return `<div class="tmini" data-act="go" data-v="tickets">${ic('plane')}<div class="grow"><b>${t.direction === 'PL' ? `${esc(AIRPORTS[t.airportNO]?.name.split(' (')[0] || t.airportNO)} → ${esc(t.airportPL)}` : `${esc(t.airportPL)} → ${esc(AIRPORTS[t.airportNO]?.name.split(' (')[0] || t.airportNO)}`}</b><div class="muted small">${fmtDate(t.date)} · ${esc(t.depTime)} · ${esc(t.flightNo || '')} · ${esc(g?.name || '')}</div></div></div>`;
}
VIEWS.tickets = () => {
  const ed = can.manage(); const T = isoLocal();
  let list = ed ? DB.tickets : DB.tickets.filter(t => t.groupId === ME.groupId || (t.userIds || []).includes(ME.id));
  list = list.filter(t => ST.ticketFilter === 'upcoming' ? t.date >= T : t.date < T).sort((a, b) => ST.ticketFilter === 'upcoming' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
  let html = `<div class="tabs"><button type="button" class="${ST.ticketFilter === 'upcoming' ? 'on' : ''}" data-act="ticket-filter" data-k="upcoming">Nadchodzące</button><button type="button" class="${ST.ticketFilter === 'past' ? 'on' : ''}" data-act="ticket-filter" data-k="past">Archiwum</button></div>`;
  html += list.map((t, i) => {
    const g = groupById(t.groupId); const ap = AIRPORTS[t.airportNO];
    const people = activeUsers().filter(u => u.groupId === t.groupId || (t.userIds || []).includes(u.id));
    const days = Math.round((new Date(t.date + 'T12:00') - new Date(T + 'T12:00')) / 864e5);
    return `<div class="ticket anim" style="--i:${i}">
      <div class="tk-l">
        <div class="tk-top"><span class="pill ${t.direction === 'PL' ? 'pl' : 'no'}">${t.direction === 'PL' ? 'Wyjazd do Polski' : 'Przyjazd do Norwegii'}</span><span class="gdot" style="--c:${esc(g?.color || '#888')}"></span><span class="muted small">${esc(g?.name || 'wybrane osoby')}</span>${days >= 0 ? `<span class="pill">${days === 0 ? 'dziś' : `za ${days} dni`}</span>` : ''}</div>
        <div class="route"><div><b>${t.direction === 'PL' ? esc(t.airportNO) : esc((t.airportPL.match(/\((\w+)\)/) || [])[1] || t.airportPL)}</b><span>${esc(t.depTime)}</span></div>
          <div class="fl">${ic('plane')}<i></i><span>${esc(t.flightNo || '')}</span></div>
          <div><b>${t.direction === 'PL' ? esc((t.airportPL.match(/\((\w+)\)/) || [])[1] || t.airportPL) : esc(t.airportNO)}</b><span>${esc(t.arrTime || '—')}</span></div></div>
        <div class="muted small">${fmtDate(t.date)} · ${esc(ap?.name || '')}</div>
        ${t.note ? `<div class="note">${esc(t.note)}</div>` : ''}
        ${ed ? `<div class="tags">${people.map(u => `<span class="tag">${esc(u.name)}</span>`).join('')}</div>` : ''}
      </div>
      <div class="tk-r">
        <div class="thumbs">${(t.fileIds || []).map(f => `<button type="button" class="thumb" data-thumb="${f}" data-act="view-file" data-id="${f}"></button>`).join('') || '<span class="muted small">Brak plików</span>'}</div>
        <div class="row gap wrap">${(t.fileIds || []).length ? `<button type="button" class="btn sm primary" data-act="ticket-dl" data-id="${t.id}">${ic('dl')} Pobierz bilety</button>` : ''}
        <button type="button" class="btn sm ghost" data-act="trip-plan" data-id="${t.id}">${ic('bus')} Dojazd Skyss/prom</button>
        ${ed ? `<button type="button" class="ib" data-act="ticket-edit" data-id="${t.id}">${ic('edit')}</button>` : ''}</div>
      </div></div>`;
  }).join('') || empty(ST.ticketFilter === 'upcoming' ? 'Brak nadchodzących biletów' : 'Brak biletów w archiwum', 'plane');
  return { title: 'Bilety i dojazd', sub: 'Bilety dla grup rotacyjnych + połączenia Skyss / prom', html, action: ed ? `<button type="button" class="btn primary" data-act="ticket-edit">${ic('up')}<span class="hide-s"> Wyślij bilety</span></button>` : '' };
};

/* ----- Entur / Skyss ----- */
async function geocode(text) {
  const r = await fetch('https://api.entur.io/geocoder/v1/autocomplete?size=1&lang=no&text=' + encodeURIComponent(text), { headers: { 'ET-Client-Name': ENTUR_CLIENT } });
  if (!r.ok) throw new Error('Geokoder Entur: ' + r.status);
  const j = await r.json(); const f = j.features?.[0]; if (!f) throw new Error('Nie znaleziono adresu: ' + text);
  return { lat: f.geometry.coordinates[1], lon: f.geometry.coordinates[0], label: f.properties.label };
}
async function planTrip(from, to, iso, arriveBy) {
  const q = `{trip(from:{coordinates:{latitude:${from.lat},longitude:${from.lon}}},to:{coordinates:{latitude:${to.lat},longitude:${to.lon}}},dateTime:"${iso}",arriveBy:${arriveBy},numTripPatterns:4,walkSpeed:1.3){tripPatterns{expectedStartTime expectedEndTime duration legs{mode expectedStartTime expectedEndTime line{publicCode name} fromPlace{name} toPlace{name} authority{name}}}}}`;
  const r = await fetch('https://api.entur.io/journey-planner/v3/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json', 'ET-Client-Name': ENTUR_CLIENT }, body: JSON.stringify({ query: q }) });
  if (!r.ok) throw new Error('Planer Entur: ' + r.status);
  const j = await r.json(); if (j.errors) throw new Error(j.errors[0].message);
  return j.data.trip.tripPatterns || [];
}
const hhmm = iso => { const d = new Date(iso); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
const MODE = { foot: ['🚶', 'pieszo'], bus: ['🚌', 'autobus'], coach: ['🚌', 'autobus'], water: ['⛴️', 'prom/łódź'], rail: ['🚆', 'pociąg'], tram: ['🚋', 'tramwaj'], metro: ['🚇', 'metro'], air: ['✈️', 'samolot'], car: ['🚗', 'auto'] };
async function openTripPlan(t) {
  const houses = DB.houses.filter(h => h.address);
  const defHouse = houseById(ME.houseId) || houses[0];
  modal('Dojazd na lotnisko / z lotniska', `
    <div class="g2"><label>Dom<select id="tpHouse">${houses.map(h => opt(h.id, h.name + ' – ' + h.address, h.id === defHouse?.id)).join('')}</select></label>
    <label>${t.direction === 'PL' ? 'Bądź na lotnisku przed wylotem' : 'Wyjście z lotniska po przylocie'}<select id="tpBuf">${(t.direction === 'PL' ? [90, 120, 150, 180] : [20, 30, 45, 60]).map(m => opt(m, m + ' min', m === (t.direction === 'PL' ? 120 : 30))).join('')}</select></label></div>
    <button type="button" class="btn primary block" data-act="trip-run" data-id="${t.id}">${ic('bus')} Szukaj połączeń</button>
    <div id="tpOut" class="tp-out"></div>
    <div class="muted small">Rozkłady: Entur (Skyss, promy, Kystbussen). <a href="https://www.skyss.no/" target="_blank" rel="noopener">skyss.no</a> · <a href="https://entur.no/" target="_blank" rel="noopener">entur.no</a></div>`, { wide: true });
}
async function runTripPlan(t) {
  const out = $('#tpOut'); const h = houseById($('#tpHouse').value); const buf = +$('#tpBuf').value;
  if (!h) return; out.innerHTML = '<div class="loader"><i></i><i></i><i></i></div>';
  try {
    let home = h.lat ? { lat: h.lat, lon: h.lon } : null;
    if (!home) { home = await geocode(h.address); h.lat = home.lat; h.lon = home.lon; save(); }
    const ap = AIRPORTS[t.airportNO];
    let pats, label;
    if (t.direction === 'PL') {
      const d = new Date(`${t.date}T${t.depTime}`); d.setMinutes(d.getMinutes() - buf);
      pats = await planTrip(home, ap, d.toISOString(), true); label = `Przyjazd na ${ap.name} najpóźniej ${hhmm(d)}`;
    } else {
      const d = new Date(`${t.date}T${t.arrTime || t.depTime}`); d.setMinutes(d.getMinutes() + buf);
      pats = await planTrip(ap, home, d.toISOString(), false); label = `Wyjazd z ${ap.name} od ${hhmm(d)}`;
    }
    if (!pats.length) { out.innerHTML = empty('Entur nie znalazł połączeń – sprawdź skyss.no', 'bus'); return; }
    out.innerHTML = `<div class="muted small">${esc(label)}</div>` + pats.map((p, i) => `<div class="trip ${i === 0 ? 'best' : ''}">
      <div class="row"><b>${hhmm(p.expectedStartTime)} → ${hhmm(p.expectedEndTime)}</b><span class="muted small">${Math.round(p.duration / 60)} min</span><span class="grow"></span>${i === 0 ? '<span class="pill ok">najlepsze</span>' : ''}</div>
      <div class="legs">${p.legs.map(l => { const m = MODE[l.mode] || ['•', l.mode]; return `<div class="leg"><span class="lm">${m[0]}</span><div><b>${hhmm(l.expectedStartTime)}</b> ${esc(l.fromPlace?.name || '')} → ${esc(l.toPlace?.name || '')}<div class="muted small">${l.line ? `${esc(m[1])} ${esc(l.line.publicCode || '')} ${esc(l.line.name || '')}` : esc(m[1])}${l.authority ? ' · ' + esc(l.authority.name) : ''}</div></div></div>`; }).join('')}</div></div>`).join('');
  } catch (e) {
    out.innerHTML = `<div class="alert bad">${ic('x')}<div>Nie udało się pobrać rozkładu (${esc(e.message)}). Sprawdź połączenie na <a href="https://www.skyss.no/" target="_blank" rel="noopener">skyss.no</a>.</div></div>`;
  }
}

/* ----- DOKUMENTY ----- */
VIEWS.docs = () => {
  const ed = can.manage();
  const uidSel = ed ? (ST.docUser || '') : ME.id;
  const list = DB.docs.filter(d => ed ? (!uidSel || d.userId === uidSel) : d.userId === ME.id).sort((a, b) => b.createdAt - a.createdAt);
  let html = ed ? `<div class="row wrap gap"><select data-chg="doc-user" class="mini">${userOpts(uidSel, () => true, 'Wszyscy pracownicy')}</select><span class="grow"></span></div>` : '';
  html += `<div class="card anim">${list.map((d, i) => `<div class="li anim" style="--i:${i}"><div class="docic">${ic('file')}</div><div class="grow"><b>${esc(d.name)}</b><div class="muted small">${ed ? esc(nameOf(d.userId)) + ' · ' : ''}${fmtTs(d.createdAt)}</div></div>
    ${d.fileId ? `<button type="button" class="btn sm primary" data-act="dl-file" data-id="${d.fileId}">${ic('dl')}<span class="hide-s"> Pobierz</span></button>` : '<span class="muted small">brak pliku</span>'}
    ${ed ? `<button type="button" class="ib" data-act="doc-del" data-id="${d.id}">${ic('trash')}</button>` : ''}</div>`).join('') || empty(ed ? 'Brak dokumentów' : 'Nie masz jeszcze dokumentów – kierownik je doda', 'file')}</div>`;
  return { title: 'Dokumenty', sub: ed ? 'Umowy i dokumenty pracowników' : 'Twoja umowa i dokumenty do pobrania', html, action: ed ? `<button type="button" class="btn primary" data-act="doc-add">${ic('up')}<span class="hide-s"> Dodaj</span></button>` : '' };
};

/* ----- WIADOMOŚCI ----- */
VIEWS.msgs = () => {
  const list = myMessages().sort((a, b) => b.createdAt - a.createdAt);
  let changed = false; list.forEach(m => { m.readBy = m.readBy || []; if (m.fromId !== ME.id && !m.readBy.includes(ME.id)) { m.readBy.push(ME.id); m._new = true; changed = true; } });
  if (changed) save();
  const to = m => m.toType === 'all' ? 'Wszyscy' : m.toType === 'group' ? (groupById(m.toId)?.name || 'grupa') : nameOf(m.toId);
  const html = `<div class="msgs">${list.map((m, i) => { const mine = m.fromId === ME.id; const r = `<div class="msg anim ${mine ? 'mine' : ''} ${m._new ? 'new' : ''}" style="--i:${Math.min(i, 8)}">${mine ? '' : avatar(userById(m.fromId))}<div class="bubble"><div class="m-meta"><b>${mine ? 'Ty' : esc(nameOf(m.fromId))}</b> → ${esc(to(m))} · ${relTime(m.createdAt)}</div><div class="m-text">${esc(m.text).replace(/\n/g, '<br>')}</div>${!mine ? `<button type="button" class="link small" data-act="msg-reply" data-id="${m.fromId}">Odpowiedz</button>` : `<span class="muted small">przeczytało: ${(m.readBy || []).length}</span>`}</div></div>`; delete m._new; return r; }).join('') || empty('Brak wiadomości', 'chat')}</div>`;
  return { title: 'Wiadomości', sub: can.foreman() ? 'Do osoby, rotacji lub wszystkich' : 'Wiadomości od kierownictwa', html, action: `<button type="button" class="btn primary" data-act="msg-new">${ic('send')}<span class="hide-s"> Napisz</span></button>` };
};

/* ----- PROJEKTY ----- */
VIEWS.projects = () => {
  const html = `<div class="pgrid">${DB.projects.map((p, i) => {
    const all = DB.hours.flatMap(h => (h.splits || []).filter(s => s.projectId === p.id).map(s => ({ ...s, userId: h.userId, date: h.date })));
    const tot = all.reduce((s, x) => s + x.hours, 0); const mo = all.filter(x => x.date.startsWith(monthNow())).reduce((s, x) => s + x.hours, 0);
    const ppl = new Set(all.map(x => x.userId)).size;
    return `<div class="card pcard anim" style="--i:${i}" data-act="project-detail" data-id="${p.id}"><div class="card-h"><div><h3>${esc(p.name)}</h3><div class="muted small">${esc(p.code || '')}${p.place ? ' · ' + esc(p.place) : ''}</div></div><span class="pill ${p.active === false ? '' : 'ok'}">${p.active === false ? 'zamknięty' : 'aktywny'}</span></div>
    <div class="kv"><div><span>Razem</span><b>${fmtH(tot)}</b></div><div><span>Ten miesiąc</span><b>${fmtH(mo)}</b></div><div><span>Osób</span><b>${ppl}</b></div></div></div>`;
  }).join('') || empty('Brak projektów – dodaj pierwszy')}</div>`;
  return { title: 'Projekty', sub: 'Ile czasu kto spędził nad projektem', html, action: `<button type="button" class="btn primary" data-act="project-edit">${ic('plus')}<span class="hide-s"> Projekt</span></button>` };
};
function projectDetail(id) {
  const p = projById(id); if (!p) return;
  const per = {}, perM = {}; const M = ST.month;
  DB.hours.forEach(h => (h.splits || []).forEach(s => { if (s.projectId === id) { per[h.userId] = (per[h.userId] || 0) + s.hours; if (h.date.startsWith(M)) perM[h.userId] = (perM[h.userId] || 0) + s.hours; } }));
  const rows = Object.keys(per).sort((a, b) => per[b] - per[a]);
  modal(p.name, `<div class="muted small">${esc(p.code || '')} ${p.place ? '· ' + esc(p.place) : ''}</div>
    <table class="tbl"><thead><tr><th>Pracownik</th><th>${esc(fmtMonth(M))}</th><th>Razem</th></tr></thead><tbody>
    ${rows.map(u => `<tr><td>${esc(nameOf(u))}</td><td>${fmtH(perM[u] || 0)}</td><td><b>${fmtH(per[u])}</b></td></tr>`).join('') || '<tr><td colspan="3" class="muted">Brak godzin</td></tr>'}
    </tbody></table>
    ${can.foreman() ? `<div class="row end"><button type="button" class="btn ghost" data-act="project-edit" data-id="${id}">${ic('edit')} Edytuj projekt</button></div>` : ''}`, { wide: true });
}

/* ----- PRACOWNICY ----- */
VIEWS.people = () => {
  const T = isoLocal();
  const html = `<div class="ugrid">${DB.users.sort((a, b) => (ROLES[b.role].rank - ROLES[a.role].rank) || a.name.localeCompare(b.name)).map((u, i) => {
    const g = groupById(u.groupId); const s = rotStatus(g, T);
    return `<div class="ucard anim ${u.active === false ? 'off' : ''}" style="--i:${Math.min(i, 12)}" data-act="go-user" data-id="${u.id}">
      <div class="row">${avatar(u, 1)}<div class="grow"><b>${esc(u.name)}</b><div class="muted small">@${esc(u.login)} · ${esc(u.phone || '')}</div></div><span class="role r-${u.role}">${ROLES[u.role].label}</span></div>
      <div class="tags"><span class="tag">${ic('house')} ${esc(houseById(u.houseId)?.name || '—')}</span><span class="tag">${ic('car')} ${esc(carById(u.carId)?.name || '—')}</span><span class="tag">${ic('cal')} ${esc(g?.name || '—')}</span>${s ? statusPill(s) : ''}${u.active === false ? '<span class="pill bad">nieaktywny</span>' : ''}</div>
    </div>`;
  }).join('')}</div>`;
  return { title: 'Pracownicy', sub: `${activeUsers().length} aktywnych kont`, html, action: `<button type="button" class="btn primary" data-act="user-edit">${ic('plus')}<span class="hide-s"> Pracownik</span></button>` };
};
function userForm(u = {}) {
  const roles = Object.keys(ROLES).filter(r => rank() >= 4 || ROLES[r].rank < 3 || r === u.role);
  return `<div class="g2"><label>Imię i nazwisko<input name="name" value="${esc(u.name || '')}" required></label><label>Login<input name="login" value="${esc(u.login || '')}" required autocapitalize="none"></label></div>
  <div class="g2"><label>${u.id ? 'Nowe hasło (puste = bez zmian)' : 'Hasło startowe'}<input name="pass" type="text" ${u.id ? '' : 'required'} placeholder="${u.id ? '••••' : 'min. 4 znaki'}"></label>
  <label>Ranga<select name="role">${roles.map(r => opt(r, ROLES[r].label, (u.role || 'pracownik') === r)).join('')}</select></label></div>
  <div class="g2"><label>Telefon<input name="phone" value="${esc(u.phone || '')}" inputmode="tel"></label><label>E-mail<input name="email" type="email" value="${esc(u.email || '')}"></label></div>
  <div class="g3"><label>Dom<select name="houseId"><option value="">—</option>${DB.houses.map(h => opt(h.id, h.name, h.id === u.houseId)).join('')}</select></label>
  <label>Auto<select name="carId"><option value="">—</option>${DB.cars.map(c => opt(c.id, c.name, c.id === u.carId)).join('')}</select></label>
  <label>Rotacja<select name="groupId"><option value="">—</option>${DB.groups.map(g => opt(g.id, g.name, g.id === u.groupId)).join('')}</select></label></div>
  ${u.id ? `<label class="check"><input type="checkbox" name="active" ${u.active !== false ? 'checked' : ''}> Konto aktywne</label>` : ''}`;
}
async function saveUser(fd, u) {
  const login = String(fd.get('login')).trim().toLowerCase();
  if (DB.users.some(x => x.login === login && x.id !== u?.id)) throw new Error('Taki login już istnieje');
  const pass = String(fd.get('pass') || '');
  if (pass && pass.length < 4) throw new Error('Hasło min. 4 znaki');
  const data = { name: String(fd.get('name')).trim(), login, role: fd.get('role'), phone: fd.get('phone'), email: fd.get('email'), houseId: fd.get('houseId'), carId: fd.get('carId'), groupId: fd.get('groupId') };
  if (u) {
    if (u.id === REAL.id && data.role !== 'admin' && u.role === 'admin' && DB.users.filter(x => x.role === 'admin' && x.active !== false).length < 2) throw new Error('Musi zostać co najmniej jeden admin');
    Object.assign(u, data); u.active = fd.get('active') === 'on'; if (pass) u.pass = await sha(pass);
    log('Edytowano konto: ' + u.name);
  } else {
    const n = { id: uid(), ...data, pass: await sha(pass), active: true, createdAt: Date.now(), lastSeen: 0 };
    DB.users.push(n); log('Dodano pracownika: ' + n.name);
  }
  save(); render(); toast('Zapisano');
}
VIEWS.user = () => {
  const u = userById(ARG); if (!u) { VIEW = 'people'; return VIEWS.people(); }
  if (!can.manage() && u.id !== ME.id) { VIEW = 'dash'; return VIEWS.dash(); }
  const M = ST.month; const hl = DB.hours.filter(h => h.userId === u.id && h.date.startsWith(M)).sort((a, b) => b.date.localeCompare(a.date));
  const byP = {}; hl.forEach(x => (x.splits || []).forEach(s => byP[s.projectId] = (byP[s.projectId] || 0) + s.hours));
  const g = groupById(u.groupId); const online = u.lastSeen && Date.now() - u.lastSeen < 5 * 60000;
  const logs = DB.logs.filter(l => l.userId === u.id).slice(0, 40);
  const docs = DB.docs.filter(d => d.userId === u.id);
  let html = `<div class="card uhero anim">${avatar(u, 1)}<div class="grow"><h2>${esc(u.name)} <span class="role r-${u.role}">${ROLES[u.role].label}</span></h2>
    <div class="muted small"><span class="odot ${online ? 'on' : ''}"></span>${online ? 'online' : 'ostatnio: ' + relTime(u.lastSeen)} · @${esc(u.login)} · ${esc(u.phone || '')} ${esc(u.email || '')}</div>
    <div class="tags"><span class="tag">${ic('house')} ${esc(houseById(u.houseId)?.name || '—')}</span><span class="tag">${ic('car')} ${esc(carById(u.carId)?.name || '—')}</span><span class="tag">${ic('cal')} ${esc(g ? `${g.name} (${g.weeksIn}/${g.weeksOut})` : '—')}</span>${statusPill(rotStatus(g, isoLocal()))}</div></div>
    ${can.manage() ? `<button type="button" class="btn ghost" data-act="user-edit" data-id="${u.id}">${ic('edit')} Edytuj</button>` : ''}</div>
    <div class="grid2"><div class="card anim" style="--i:1"><div class="card-h"><h3>Godziny – ${fmtMonth(M)}</h3>${monthPicker()}</div><div class="bigtot"><span class="count" data-to="${round2(sumH(hl))}" data-suf=" h">0</span><span class="muted small">${hl.length} wpisów</span></div>${projBars(byP, sumH(hl))}</div>
    <div class="card anim" style="--i:2"><div class="card-h"><h3>Dokumenty</h3>${can.manage() ? `<button type="button" class="btn sm ghost" data-act="doc-add" data-id="${u.id}">${ic('up')} Dodaj</button>` : ''}</div>${docs.map(d => `<div class="li"><div class="docic">${ic('file')}</div><span class="grow">${esc(d.name)}</span>${d.fileId ? `<button type="button" class="ib" data-act="dl-file" data-id="${d.fileId}">${ic('dl')}</button>` : ''}</div>`).join('') || empty('Brak dokumentów', 'file')}</div></div>
    <div class="card anim" style="--i:3"><div class="card-h"><h3>Wpisy godzin</h3></div>${hl.map(x => entryRow(x)).join('') || empty('Brak wpisów', 'clock')}</div>`;
  if (can.admin()) html += `<div class="card anim" style="--i:4"><div class="card-h"><h3>Ostatnie logi</h3></div>${logs.map(l => `<div class="log"><span class="muted small">${fmtTs(l.at)}</span><span>${esc(l.action)}</span></div>`).join('') || empty('Brak logów', 'shield')}</div>`;
  return { title: 'Profil pracownika', html, action: `<button type="button" class="btn ghost" data-act="go" data-v="${can.admin() ? 'admin' : 'people'}">← Wróć</button>` };
};

/* ----- ADMIN ----- */
VIEWS.admin = () => {
  const now = Date.now(); const us = [...DB.users].sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0));
  const online = us.filter(u => u.lastSeen && now - u.lastSeen < 5 * 60000).length;
  const today = us.filter(u => u.lastSeen && now - u.lastSeen < 864e5).length;
  const logs = DB.logs.filter(l => !ST.logUser || l.userId === ST.logUser).slice(0, 150);
  let html = `<div class="stats">${stat('Online teraz', online, { icon: 'eye', tone: 'green' })}${stat('Aktywni (24 h)', today, { icon: 'users', tone: 'blue', i: 1 })}${stat('Kont', DB.users.length, { icon: 'shield', i: 2 })}${stat('Wpisów w logu', DB.logs.length, { icon: 'file', i: 3 })}</div>
  <div class="grid2"><div class="card anim" style="--i:4"><div class="card-h"><h3>Kto był online</h3></div>
    ${us.map(u => { const on = u.lastSeen && now - u.lastSeen < 5 * 60000; const hM = sumH(DB.hours.filter(h => h.userId === u.id && h.date.startsWith(monthNow()))); return `<div class="li click" data-act="go-user" data-id="${u.id}">${avatar(u)}<div class="grow"><b>${esc(u.name)}</b> <span class="role r-${u.role}">${ROLES[u.role].label}</span><div class="muted small"><span class="odot ${on ? 'on' : ''}"></span>${on ? 'online' : relTime(u.lastSeen)} · ${fmtH(hM)} w tym mies.</div></div>${ic('eye')}</div>`; }).join('')}</div>
  <div class="card anim" style="--i:5"><div class="card-h"><h3>Kopia zapasowa</h3></div>
    <p class="muted small">Pobierz całą aplikację (dane + pliki: bilety, umowy) jako jeden plik JSON. Możesz ją później przywrócić.</p>
    <div class="col gap"><button type="button" class="btn primary block" data-act="backup">${ic('dl')} Pobierz kopię zapasową</button>
    <label class="btn ghost block filebtn">${ic('up')} Przywróć z kopii<input type="file" accept=".json,application/json" data-chg="restore" hidden></label>
    ${PREVIEW ? `<button type="button" class="btn danger block" data-act="reset-demo">${ic('trash')} Zresetuj dane demo</button>` : ''}</div>
    <div class="muted small" style="margin-top:12px">Ostatnia kopia: ${DB.meta.lastBackup ? fmtTs(DB.meta.lastBackup) : 'nigdy'}</div></div></div>
  <div class="card anim" style="--i:6"><div class="card-h"><h3>Logi systemu</h3><select data-chg="log-user" class="mini">${userOpts(ST.logUser, () => true, 'Wszyscy')}</select></div>
    ${logs.map(l => `<div class="log"><span class="muted small">${fmtTs(l.at)}</span><b>${esc(nameOf(l.userId))}</b><span>${esc(l.action)}</span></div>`).join('') || empty('Brak logów', 'shield')}</div>`;
  return { title: 'Panel admina', sub: 'Aktywność, logi, kopia zapasowa', html };
};

/* =========================================================
   AKCJE
   ========================================================= */
const ACT = {
  'go': el => { closeMenu(); go(el.dataset.v); },
  'go-user': el => go('user', el.dataset.id),
  'close-modal': () => closeModal(),
  'close-modal-bg': (el, e) => { if (e.target === el) closeModal(); },
  'menu': () => openMenu(),
  'close-menu': () => closeMenu(),
  'profile': () => {
    modal('Moje konto', `<div class="row gap">${avatar(ME, 1)}<div><b>${esc(ME.name)}</b><div class="muted small">${ROLES[ME.role].label} · @${esc(ME.login)}</div></div></div>
      ${ME.id === REAL.id && !PREVIEW ? `<label>Nowe hasło<input name="pass" type="password" minlength="4" autocomplete="new-password"></label>` : '<p class="muted small">W trybie podglądu zmiana hasła jest wyłączona.</p>'}
      <div class="row gap"><button type="button" class="btn ghost" data-act="go-user" data-id="${ME.id}">Mój profil</button>${!PREVIEW ? `<button type="button" class="btn danger" data-act="logout">${ic('logout')} Wyloguj</button>` : ''}</div>`,
      ME.id === REAL.id && !PREVIEW ? { onSubmit: async fd => { const p = String(fd.get('pass') || ''); if (!p) return; if (p.length < 4) throw new Error('Min. 4 znaki'); REAL.pass = await sha(p); log('Zmieniono hasło'); save(); toast('Hasło zmienione'); }, submitLabel: 'Zmień hasło' } : {});
  },
  'logout': () => { closeModal(); logout(); },

  /* podgląd ról */
  'view-as-role': el => {
    const r = el.dataset.role;
    if (r === REAL.role && !PREVIEW) { ME = REAL; }
    else { const cand = activeUsers().filter(u => u.role === r); ME = cand.find(u => u.id === REAL.id) || cand[0] || { ...REAL, role: r, _sim: true }; }
    SELECTED = null; render(); toast('Podgląd jako: ' + ROLES[r].label + (ME._sim ? ' (brak konta tej rangi – symulacja)' : ' – ' + ME.name), 'info');
  },
  'view-as-reset': () => { ME = REAL; render(); },

  /* tablice */
  'pick': el => {
    const id = el.dataset.drag, kind = el.dataset.kind;
    SELECTED = SELECTED?.id === id && SELECTED.kind === kind ? null : { id, kind };
    render(); if (SELECTED) toast('Teraz dotknij ' + { house: 'dom', car: 'auto', group: 'rotację' }[kind] + ' (albo „' + { house: 'Bez domu', car: 'Bez auta', group: 'Bez rotacji' }[kind] + '”)', 'info');
  },
  'drop': el => { if (SELECTED && SELECTED.kind === el.dataset.kind) assign(SELECTED.kind, SELECTED.id, el.dataset.drop); },
  'g-filter': el => { GOPT[el.dataset.kind].filter = el.dataset.f; render(); },
  'g-fit': el => { const cv = el.closest('.gcanvas'); fitGraph(cv); },
  'g-zoom': el => { const cv = el.closest('.gcanvas'); zoomAt(cv, cv.clientWidth / 2, cv.clientHeight / 2, el.dataset.d === '1' ? 1.2 : 1 / 1.2); },
  'g-full': el => { const k = el.dataset.kind; GOPT[k].full = !GOPT[k].full; GV[k] = null; render(); },

  /* godziny */
  'hours-tab': el => { ST.hoursTab = el.dataset.k; render(); },
  'add-split': el => { const box = el.closest('.hform'); box.querySelector('.splits').insertAdjacentHTML('beforeend', splitRow()); updHoursTotal(box); },
  'rm-split': el => { const box = el.closest('.hform'); const rows = $$('.split', box); if (rows.length > 1) el.closest('.split').remove(); else { el.closest('.split').querySelector('select').value = ''; el.closest('.split').querySelector('input').value = ''; } updHoursTotal(box); },
  'edit-hours': el => {
    const x = DB.hours.find(h => h.id === el.dataset.id); if (!x) return;
    modal('Edytuj wpis', hoursFormHTML(x), {
      onSubmit: fd => { const d = readHours(fd); Object.assign(x, d, { editedBy: ME.id, editedAt: Date.now() }); log(`Edytowano godziny ${nameOf(x.userId)} ${x.date}`); save(); render(); toast('Zapisano'); },
      danger: { act: 'del-hours', id: x.id, label: 'Usuń wpis' },
    }); updHoursTotal($('#mform .hform'));
  },
  'del-hours': el => { const i = DB.hours.findIndex(h => h.id === el.dataset.id); if (i < 0) return; const x = DB.hours[i]; DB.hours.splice(i, 1); log(`Usunięto godziny ${nameOf(x.userId)} ${x.date}`); save(); closeModal(); render(); toast('Usunięto'); },
  'hours-add-for': () => { modal('Wpisz godziny', hoursFormHTML({}), { onSubmit: fd => addHours(readHours(fd)) }); updHoursTotal($('#mform .hform')); },
  'user-hours': el => { go('user', el.dataset.id); },
  'export-hours': () => {
    const M = ST.month; const rows = [['Data', 'Pracownik', 'Od', 'Do', 'Przerwa min', 'Godziny', 'Projekt', 'Godziny projekt', 'Notatka']];
    DB.hours.filter(h => h.date.startsWith(M)).sort((a, b) => a.date.localeCompare(b.date)).forEach(h => {
      const base = [h.date, nameOf(h.userId), h.from, h.to, h.breakMin || 0, fmtNum(entryH(h))];
      if (h.splits?.length) h.splits.forEach(s => rows.push([...base, projById(s.projectId)?.name || '', fmtNum(s.hours), h.note || ''])); else rows.push([...base, '', '', h.note || '']);
    });
    const csv = '﻿' + rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = `godziny-${M}.csv`; a.click();
  },

  /* rotacje */
  'group-edit': el => {
    const g = groupById(el.dataset.id) || {};
    modal(g.id ? 'Edytuj rotację' : 'Nowa grupa rotacyjna', `<label>Nazwa<input name="name" value="${esc(g.name || '')}" required placeholder="np. Rotacja A"></label>
      <div class="g2"><label>Tygodnie w Norwegii<input type="number" name="weeksIn" min="1" max="12" value="${g.weeksIn || 3}" required></label><label>Tygodnie w Polsce<input type="number" name="weeksOut" min="1" max="12" value="${g.weeksOut || 3}" required></label></div>
      <div class="presets">${[[3, 3], [4, 2], [2, 2], [4, 4], [6, 3]].map(([a, b]) => `<button type="button" class="tag" data-act="preset" data-a="${a}" data-b="${b}">${a}/${b}</button>`).join('')}</div>
      <div class="g2"><label>Pierwszy dzień w Norwegii (start cyklu)<input type="date" name="start" value="${g.start || mondayOf(isoLocal())}" required></label><label>Kolor<input type="color" name="color" value="${g.color || '#ff7a1a'}"></label></div>`, {
      onSubmit: fd => { const d = { name: fd.get('name'), weeksIn: +fd.get('weeksIn'), weeksOut: +fd.get('weeksOut'), start: fd.get('start'), color: fd.get('color') }; if (g.id) Object.assign(g, d); else DB.groups.push({ id: uid(), ...d }); log(`Rotacja zapisana: ${d.name} ${d.weeksIn}/${d.weeksOut}`); save(); render(); toast('Zapisano rotację'); },
      danger: g.id ? { act: 'group-del', id: g.id } : null,
    });
  },
  'preset': el => { $('#mform [name=weeksIn]').value = el.dataset.a; $('#mform [name=weeksOut]').value = el.dataset.b; },
  'group-del': el => { const g = groupById(el.dataset.id); DB.users.forEach(u => { if (u.groupId === g.id) u.groupId = ''; }); DB.groups = DB.groups.filter(x => x.id !== g.id); log('Usunięto rotację ' + g.name); save(); closeModal(); render(); },

  /* domy */
  'house-edit': el => {
    const h = houseById(el.dataset.id) || {};
    modal(h.id ? 'Edytuj dom' : 'Nowy dom', `<label>Nazwa<input name="name" value="${esc(h.name || '')}" required></label><label>Adres (do planowania dojazdu)<input name="address" value="${esc(h.address || '')}" placeholder="np. Herøysund, Kvinnherad"></label><label>Ilość miejsc (łóżek)<input type="number" name="beds" min="1" value="${h.beds || 4}" required></label>`, {
      onSubmit: fd => { const d = { name: fd.get('name'), address: fd.get('address'), beds: +fd.get('beds') }; if (h.id) { if (h.address !== d.address) { delete h.lat; delete h.lon; } Object.assign(h, d); } else DB.houses.push({ id: uid(), ...d }); log('Zapisano dom ' + d.name); save(); render(); toast('Zapisano'); },
      danger: h.id ? { act: 'house-del', id: h.id } : null,
    });
  },
  'house-del': el => { const h = houseById(el.dataset.id); DB.users.forEach(u => { if (u.houseId === h.id) u.houseId = ''; }); DB.houses = DB.houses.filter(x => x.id !== h.id); log('Usunięto dom ' + h.name); save(); closeModal(); render(); },

  /* auta */
  'car-edit': el => {
    const c = carById(el.dataset.id) || {};
    modal(c.id ? 'Edytuj auto' : 'Nowe auto', `<div class="g2"><label>Nazwa / model<input name="name" value="${esc(c.name || '')}" required></label><label>Rejestracja<input name="plate" value="${esc(c.plate || '')}"></label></div>
      <div class="g3"><label>Miejsc<input type="number" name="seats" min="1" value="${c.seats || 5}"></label><label>Przebieg (km)<input type="number" name="odometer" min="0" value="${c.odometer || 0}"></label><label>Paliwo<select name="fuel">${['diesel', 'benzyna', 'elektryk', 'hybryda'].map(f => opt(f, f, f === (c.fuel || 'diesel'))).join('')}</select></label></div>
      <div class="g2"><label>EU-kontroll (data)<input type="date" name="euDate" value="${c.euDate || ''}"></label><label>Następny serwis przy (km)<input type="number" name="serviceKm" min="0" value="${c.serviceKm || ''}"></label></div>`, {
      onSubmit: fd => { const d = { name: fd.get('name'), plate: fd.get('plate'), seats: +fd.get('seats'), odometer: +fd.get('odometer'), fuel: fd.get('fuel'), euDate: fd.get('euDate'), serviceKm: +fd.get('serviceKm') || 0 }; if (c.id) Object.assign(c, d); else DB.cars.push({ id: uid(), ...d }); log('Zapisano auto ' + d.name); save(); render(); toast('Zapisano'); },
      danger: c.id ? { act: 'car-del', id: c.id } : null,
    });
  },
  'car-del': el => { const c = carById(el.dataset.id); DB.users.forEach(u => { if (u.carId === c.id) u.carId = ''; }); DB.cars = DB.cars.filter(x => x.id !== c.id); log('Usunięto auto ' + c.name); save(); closeModal(); render(); },
  'odo': el => {
    const c = carById(el.dataset.id);
    modal('Stan licznika – ' + c.name, `<label>Aktualny przebieg (km)<input type="number" name="odo" min="0" value="${c.odometer || 0}" required></label>`, { onSubmit: fd => { const v = +fd.get('odo'); if (v < (c.odometer || 0) && !can.manage()) throw new Error('Przebieg nie może być mniejszy niż poprzedni'); c.odometer = v; log(`Licznik ${c.name}: ${v} km`); save(); render(); toast('Zapisano'); } });
  },
  'refuel-add': el => {
    const c = carById(el.dataset.id);
    const myCard = DB.fuelCards.find(x => x.holderId === ME.id);
    modal('Tankowanie – ' + c.name, `<div class="g2"><label>Data<input type="date" name="date" value="${isoLocal()}" required></label><label>Licznik (km)<input type="number" name="odometer" min="0" value="${c.odometer || ''}" required></label></div>
      <div class="g2"><label>Litry<input type="number" step="0.01" name="liters" min="0" required inputmode="decimal"></label><label>Kwota (NOK)<input type="number" step="0.01" name="amount" min="0" inputmode="decimal"></label></div>
      <label>Karta paliwowa<select name="cardId"><option value="">— prywatnie / gotówka —</option>${DB.fuelCards.map(k => opt(k.id, `${k.name} (•••• ${k.last4})`, k.id === myCard?.id)).join('')}</select></label>
      <label>Zdjęcie paragonu (opcjonalnie)<input type="file" name="receipt" accept="image/*,application/pdf"></label>`, {
      onSubmit: async fd => {
        const odo = +fd.get('odometer'); if (odo < (c.odometer || 0) - 1 && !confirm('Licznik mniejszy niż ostatni zapis. Zapisać mimo to?')) return false;
        const f = fd.get('receipt'); const fileId = f && f.size ? await storeFile(f) : '';
        DB.refuels.push({ id: uid(), carId: c.id, userId: ME.id, date: fd.get('date'), odometer: odo, liters: +fd.get('liters'), amount: +fd.get('amount') || 0, cardId: fd.get('cardId'), fileId });
        if (odo > (c.odometer || 0)) c.odometer = odo; log(`Tankowanie ${c.name}: ${fd.get('liters')} l`); save(); render(); toast('Tankowanie zapisane');
      },
    });
  },
  'car-history': el => {
    const c = carById(el.dataset.id); const r = [...carStats(c).refuels].sort((a, b) => b.date.localeCompare(a.date));
    modal('Historia – ' + c.name, `<table class="tbl"><thead><tr><th>Data</th><th>Kto</th><th>Licznik</th><th>Litry</th><th>NOK</th><th></th></tr></thead><tbody>
      ${r.map(x => `<tr><td>${x.date.slice(8)}.${x.date.slice(5, 7)}</td><td>${esc(nameOf(x.userId).split(' ')[0])}</td><td>${(x.odometer || 0).toLocaleString('pl')}</td><td>${fmtNum(x.liters)}</td><td>${Math.round(x.amount || 0)}</td><td>${x.fileId ? `<button type="button" class="ib sm" data-act="view-file" data-id="${x.fileId}">${ic('file')}</button>` : ''}${can.manage() ? `<button type="button" class="ib sm" data-act="refuel-del" data-id="${x.id}">${ic('trash')}</button>` : ''}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">Brak tankowań</td></tr>'}
      </tbody></table>`, { wide: true });
  },
  'refuel-del': el => { const x = DB.refuels.find(r => r.id === el.dataset.id); DB.refuels = DB.refuels.filter(r => r.id !== el.dataset.id); log('Usunięto tankowanie'); save(); closeModal(); render(); if (x) ACT['car-history']({ dataset: { id: x.carId } }); },

  /* karty paliwowe */
  'card-edit': el => {
    const c = DB.fuelCards.find(x => x.id === el.dataset.id) || {};
    modal(c.id ? 'Edytuj kartę' : 'Nowa karta paliwowa', `<label>Nazwa<input name="name" value="${esc(c.name || '')}" required placeholder="np. Circle K – karta 1"></label><label>Ostatnie 4 cyfry<input name="last4" maxlength="4" pattern="\\d{4}" inputmode="numeric" value="${esc(c.last4 || '')}" required></label>
      <label>Kto ma kartę teraz<select name="holderId">${userOpts(c.holderId, () => true, '— w biurze —')}</select></label>`, {
      onSubmit: fd => { const d = { name: fd.get('name'), last4: fd.get('last4'), holderId: fd.get('holderId') }; if (c.id) { if (c.holderId !== d.holderId) log(`Karta ${c.name}: ręcznie przypisana do ${nameOf(d.holderId)}`); Object.assign(c, d); } else DB.fuelCards.push({ id: uid(), ...d }); log('Zapisano kartę ' + d.name); save(); render(); toast('Zapisano'); },
      danger: c.id ? { act: 'card-del', id: c.id } : null,
    });
  },
  'card-del': el => { DB.fuelCards = DB.fuelCards.filter(x => x.id !== el.dataset.id); DB.cardTransfers = DB.cardTransfers.filter(t => t.cardId !== el.dataset.id); log('Usunięto kartę'); save(); closeModal(); render(); },
  'card-give': el => {
    const c = DB.fuelCards.find(x => x.id === el.dataset.id);
    modal('Przekaż kartę – ' + c.name, `<p class="muted small">Odbiorca musi potwierdzić w aplikacji, że dostał kartę. Do tego czasu karta jest zapisana na ${esc(nameOf(c.holderId))}.</p><label>Komu dajesz kartę?<select name="toId" required>${userOpts('', u => u.id !== c.holderId)}</select></label>`, {
      submitLabel: 'Przekaż', onSubmit: fd => { const to = fd.get('toId'); if (!to) throw new Error('Wybierz osobę'); DB.cardTransfers.push({ id: uid(), cardId: c.id, fromId: c.holderId || ME.id, toId: to, byId: ME.id, status: 'pending', createdAt: Date.now() }); DB.messages.push({ id: uid(), fromId: ME.id, toType: 'user', toId: to, text: `🔑 Przekazuję Ci kartę paliwową ${c.name} (•••• ${c.last4}). Potwierdź odbiór w zakładce Karty paliwowe.`, createdAt: Date.now(), readBy: [] }); log(`Przekazanie karty ${c.name} → ${nameOf(to)} (czeka)`); save(); render(); toast('Wysłano – czeka na potwierdzenie'); },
    });
  },
  'card-accept': el => { const t = DB.cardTransfers.find(x => x.id === el.dataset.id); if (!t) return; const c = DB.fuelCards.find(x => x.id === t.cardId); t.status = 'accepted'; t.resolvedAt = Date.now(); if (c) c.holderId = t.toId; log(`Potwierdzono odbiór karty ${c?.name}`); save(); render(); toast('Karta jest teraz u Ciebie'); },
  'card-reject': el => { const t = DB.cardTransfers.find(x => x.id === el.dataset.id); if (!t) return; t.status = 'rejected'; t.resolvedAt = Date.now(); log('Odrzucono przekazanie karty'); save(); render(); toast('Odrzucono', 'info'); },
  'card-cancel': el => { const t = DB.cardTransfers.find(x => x.id === el.dataset.id); if (!t) return; t.status = 'cancelled'; t.resolvedAt = Date.now(); log('Anulowano przekazanie karty'); save(); render(); },
  'card-history': el => { const c = DB.fuelCards.find(x => x.id === el.dataset.id); const h = DB.cardTransfers.filter(t => t.cardId === c.id).sort((a, b) => b.createdAt - a.createdAt); modal('Historia – ' + c.name, h.map(transferRow).join('') || empty('Brak przekazań', 'swap')); },

  /* bilety */
  'ticket-filter': el => { ST.ticketFilter = el.dataset.k; render(); },
  'ticket-edit': el => {
    const t = DB.tickets.find(x => x.id === el.dataset.id) || {};
    modal(t.id ? 'Edytuj bilety' : 'Wyślij bilety do grupy', `
      <div class="g2"><label>Grupa rotacyjna<select name="groupId">${DB.groups.map(g => opt(g.id, `${g.name} (${activeUsers().filter(u => u.groupId === g.id).length} os.)`, g.id === t.groupId)).join('')}<option value="" ${t.id && !t.groupId ? 'selected' : ''}>— tylko wybrane osoby —</option></select></label>
      <label>Kierunek<select name="direction">${opt('PL', 'Wyjazd do Polski', t.direction !== 'NO')}${opt('NO', 'Przyjazd do Norwegii', t.direction === 'NO')}</select></label></div>
      <label>Dodatkowe osoby (opcjonalnie)<select name="userIds" multiple size="4">${activeUsers().map(u => opt(u.id, u.name, (t.userIds || []).includes(u.id))).join('')}</select></label>
      <div class="g3"><label>Data lotu<input type="date" name="date" value="${t.date || ''}" required></label><label>Wylot<input type="time" name="depTime" value="${t.depTime || ''}" required></label><label>Przylot<input type="time" name="arrTime" value="${t.arrTime || ''}"></label></div>
      <div class="g3"><label>Nr lotu<input name="flightNo" value="${esc(t.flightNo || '')}" placeholder="DY1052"></label>
      <label>Lotnisko w Norwegii<select name="airportNO">${Object.entries(AIRPORTS).map(([k, a]) => opt(k, a.name, k === (t.airportNO || 'BGO'))).join('')}</select></label>
      <label>Lotnisko w Polsce<input name="airportPL" list="plap" value="${esc(t.airportPL || 'Gdańsk (GDN)')}"><datalist id="plap">${PL_AIRPORTS.map(a => `<option value="${a}">`).join('')}</datalist></label></div>
      <label>Wiadomość do grupy<textarea name="note" rows="2" placeholder="np. bagaż 20 kg, zbiórka 11:00 pod domem">${esc(t.note || '')}</textarea></label>
      <label>Bilety (zdjęcia / PDF – możesz wybrać kilka)<input type="file" name="files" multiple accept="image/*,application/pdf"></label>
      ${t.fileIds?.length ? `<div class="muted small">Już dodane: ${t.fileIds.length} plików (nowe zostaną dopisane)</div>` : ''}
      ${!t.id ? '<label class="check"><input type="checkbox" name="notify" checked> Wyślij wiadomość do grupy</label>' : ''}`, {
      wide: true, submitLabel: t.id ? 'Zapisz' : 'Wyślij bilety',
      onSubmit: async fd => {
        const files = fd.getAll('files').filter(f => f && f.size); const ids = [];
        for (const f of files) ids.push(await storeFile(f));
        const d = { groupId: fd.get('groupId'), direction: fd.get('direction'), userIds: fd.getAll('userIds'), date: fd.get('date'), depTime: fd.get('depTime'), arrTime: fd.get('arrTime'), flightNo: String(fd.get('flightNo') || '').toUpperCase(), airportNO: fd.get('airportNO'), airportPL: fd.get('airportPL'), note: fd.get('note') };
        if (!d.groupId && !d.userIds.length) throw new Error('Wybierz grupę albo osoby');
        if (t.id) { Object.assign(t, d); t.fileIds = [...(t.fileIds || []), ...ids]; log('Edytowano bilety ' + d.flightNo); }
        else {
          const nt = { id: uid(), ...d, fileIds: ids, createdBy: ME.id, createdAt: Date.now() }; DB.tickets.push(nt);
          if (fd.get('notify') === 'on') {
            const txt = `✈️ Bilety: ${d.direction === 'PL' ? 'wyjazd do Polski' : 'przyjazd do Norwegii'} ${fmtDate(d.date)} ${d.depTime} ${d.flightNo}. Pobierz w zakładce „Bilety i dojazd”.${d.note ? '\n' + d.note : ''}`;
            if (d.groupId) DB.messages.push({ id: uid(), fromId: ME.id, toType: 'group', toId: d.groupId, text: txt, createdAt: Date.now(), readBy: [] });
            d.userIds.filter(u => userById(u)?.groupId !== d.groupId).forEach(u => DB.messages.push({ id: uid(), fromId: ME.id, toType: 'user', toId: u, text: txt, createdAt: Date.now(), readBy: [] }));
          }
          log(`Wysłano bilety ${d.flightNo} do ${groupById(d.groupId)?.name || 'wybranych osób'} (${ids.length} plików)`);
        }
        save(); render(); toast('Bilety zapisane');
      },
      danger: t.id ? { act: 'ticket-del', id: t.id } : null,
    });
  },
  'ticket-del': async el => { const t = DB.tickets.find(x => x.id === el.dataset.id); for (const f of t.fileIds || []) await FS.del(f).catch(() => { }); DB.tickets = DB.tickets.filter(x => x.id !== t.id); log('Usunięto bilety ' + (t.flightNo || '')); save(); closeModal(); render(); },
  'ticket-dl': async el => { const t = DB.tickets.find(x => x.id === el.dataset.id); for (const f of t.fileIds || []) { await downloadFile(f); await new Promise(r => setTimeout(r, 350)); } log('Pobrano bilety ' + (t.flightNo || '')); save(); },
  'trip-plan': el => { const t = DB.tickets.find(x => x.id === el.dataset.id); if (!DB.houses.some(h => h.address)) return toast('Dodaj adres domu, żeby planować dojazd', 'err'); openTripPlan(t); },
  'trip-run': el => runTripPlan(DB.tickets.find(x => x.id === el.dataset.id)),
  'view-file': el => viewFile(el.dataset.id),
  'dl-file': el => { downloadFile(el.dataset.id); log('Pobrano plik'); save(); },

  /* dokumenty */
  'doc-add': el => {
    modal('Dodaj dokument', `<label>Pracownik<select name="userId" required>${userOpts(el.dataset.id || ST.docUser || '')}</select></label><label>Nazwa dokumentu<input name="name" required placeholder="np. Umowa o pracę 2026"></label><label>Plik<input type="file" name="file" required accept="application/pdf,image/*,.doc,.docx"></label>`, {
      onSubmit: async fd => { const f = fd.get('file'); if (!fd.get('userId')) throw new Error('Wybierz pracownika'); if (!f || !f.size) throw new Error('Wybierz plik'); const fileId = await storeFile(f); DB.docs.push({ id: uid(), userId: fd.get('userId'), name: fd.get('name'), fileId, createdAt: Date.now(), by: ME.id }); log(`Dodano dokument „${fd.get('name')}” dla ${nameOf(fd.get('userId'))}`); save(); render(); toast('Dokument dodany'); },
    });
  },
  'doc-del': el => { const d = DB.docs.find(x => x.id === el.dataset.id); confirmBox(`Usunąć „${d.name}”?`, async () => { if (d.fileId) await FS.del(d.fileId).catch(() => { }); DB.docs = DB.docs.filter(x => x.id !== d.id); log('Usunięto dokument ' + d.name); save(); render(); }, 'Usuń'); },

  /* wiadomości */
  'msg-new': el => msgModal(),
  'msg-reply': el => msgModal('user', el.dataset.id),

  /* projekty */
  'project-detail': el => projectDetail(el.dataset.id),
  'project-edit': el => {
    const p = projById(el.dataset.id) || {};
    modal(p.id ? 'Edytuj projekt' : 'Nowy projekt', `<label>Nazwa<input name="name" value="${esc(p.name || '')}" required></label><div class="g2"><label>Kod / nr<input name="code" value="${esc(p.code || '')}"></label><label>Miejsce<input name="place" value="${esc(p.place || '')}"></label></div>${p.id ? `<label class="check"><input type="checkbox" name="active" ${p.active !== false ? 'checked' : ''}> Projekt aktywny (widoczny przy wpisywaniu godzin)</label>` : ''}`, {
      onSubmit: fd => { const d = { name: fd.get('name'), code: fd.get('code'), place: fd.get('place') }; if (p.id) Object.assign(p, d, { active: fd.get('active') === 'on' }); else DB.projects.push({ id: uid(), ...d, active: true, createdBy: ME.id }); log('Zapisano projekt ' + d.name); save(); render(); toast('Zapisano'); },
    });
  },

  /* pracownicy */
  'user-edit': el => { const u = userById(el.dataset.id); modal(u ? 'Edytuj pracownika' : 'Nowy pracownik', userForm(u || {}), { wide: true, onSubmit: fd => saveUser(fd, u) }); },

  /* admin */
  'backup': async () => {
    const files = await FS.all().catch(() => []);
    const enc = await Promise.all(files.map(f => new Promise(res => { const r = new FileReader(); r.onload = () => res({ id: f.id, name: f.name, type: f.type, at: f.at, data: r.result }); r.readAsDataURL(f.blob); })));
    DB.meta.lastBackup = Date.now(); log('Pobrano kopię zapasową'); save();
    const blob = new Blob([JSON.stringify({ app: 'CrewControl', version: VERSION, at: new Date().toISOString(), db: DB, files: enc })], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `crewcontrol-backup-${isoLocal()}.json`; a.click();
    toast('Kopia pobrana'); render();
  },
  'reset-demo': () => confirmBox('Usunąć wszystkie dane demo i wczytać od nowa?', async () => { localStorage.removeItem(STORE_KEY); await FS.clear().catch(() => { }); load(); REAL = ME = DB.users[0]; localStorage.setItem(SESSION_KEY, REAL.id); VIEW = 'dash'; render(); }, 'Resetuj'),
};
function addHours(d) {
  const dup = DB.hours.find(h => h.userId === d.userId && h.date === d.date && h.from < d.to && d.from < h.to);
  if (dup) throw new Error(`Ten czas nachodzi na wpis ${dup.from}–${dup.to} z tego dnia`);
  DB.hours.push({ id: uid(), ...d, createdAt: Date.now(), editedBy: d.userId !== ME.id ? ME.id : undefined });
  log(`Godziny ${d.userId !== ME.id ? nameOf(d.userId) + ' ' : ''}${d.date} ${d.from}–${d.to}`); save(); render(); toast(`Zapisano ${fmtH(durH(d.from, d.to, d.breakMin))}`);
}
function msgModal(type = 'user', toId = '') {
  const isF = can.foreman();
  modal('Nowa wiadomość', `${isF ? `<label>Do<select name="toType" data-chg="msg-type">${opt('user', 'Osoba', type === 'user')}${opt('group', 'Rotacja / grupa', type === 'group')}${opt('all', 'Wszyscy', type === 'all')}</select></label>` : '<input type="hidden" name="toType" value="user">'}
    <label class="mt-user">Osoba<select name="toUser">${userOpts(toId, u => u.id !== ME.id && (isF || ROLES[u.role].rank >= 2))}</select></label>
    <label class="mt-group" hidden>Grupa<select name="toGroup">${DB.groups.map(g => opt(g.id, `${g.name} (${activeUsers().filter(u => u.groupId === g.id).length} os.)`)).join('')}</select></label>
    <label>Treść<textarea name="text" rows="4" required></textarea></label>`, {
    submitLabel: 'Wyślij',
    onSubmit: fd => { const tt = fd.get('toType'); const to = tt === 'user' ? fd.get('toUser') : tt === 'group' ? fd.get('toGroup') : ''; if (tt !== 'all' && !to) throw new Error('Wybierz odbiorcę'); DB.messages.push({ id: uid(), fromId: ME.id, toType: tt, toId: to, text: String(fd.get('text')).trim(), createdAt: Date.now(), readBy: [] }); log(`Wiadomość → ${tt === 'all' ? 'wszyscy' : tt === 'group' ? groupById(to)?.name : nameOf(to)}`); save(); render(); toast('Wysłano'); },
  });
}
const CHG = {
  'month': el => { ST.month = el.value || monthNow(); render(); },
  'rota-weeks': el => { ST.rotaWeeks = +el.value; render(); },
  'doc-user': el => { ST.docUser = el.value; render(); },
  'log-user': el => { ST.logUser = el.value; render(); },
  'view-as-user': el => { ME = userById(el.value) || REAL; render(); },
  'g-layout': el => { const m = el.value; if (!m) return; const cv = el.closest('.gcanvas'); graphAutoLayout(cv, m); save(); GV[cv.dataset.gkind] = null; render(); toast('Ułożono: ' + el.options[el.selectedIndex].text, 'info'); },
  'msg-type': el => { const t = el.value; $('#mform .mt-user').hidden = t !== 'user'; $('#mform .mt-group').hidden = t !== 'group'; },
  'restore': async el => {
    const f = el.files[0]; if (!f) return;
    try {
      const j = JSON.parse(await f.text()); if (!j.db || !j.db.users) throw new Error('To nie jest kopia CrewControl');
      if (!confirm(`Przywrócić kopię z ${j.at}? Obecne dane zostaną zastąpione.`)) return;
      await FS.clear().catch(() => { });
      for (const x of j.files || []) { const blob = await (await fetch(x.data)).blob(); await FS.put({ id: x.id, name: x.name, type: x.type, at: x.at, blob, size: blob.size }); }
      DB = j.db; const e = emptyDB(); for (const k in e) if (!DB[k]) DB[k] = e[k];
      REAL = DB.users.find(u => u.id === REAL.id) || DB.users.find(u => u.role === 'admin'); ME = REAL;
      log('Przywrócono kopię zapasową'); save(); render(); toast('Przywrócono kopię');
    } catch (err) { toast(err.message, 'err'); }
  },
};
const SUB = {
  'hours-add': f => addHours(readHours(new FormData(f))),
};

/* ---------- menu mobilne ---------- */
function openMenu() {
  const items = NAV.filter(n => rank() >= n.min);
  const d = document.createElement('div'); d.className = 'sheet-ov'; d.dataset.act = 'close-menu';
  d.innerHTML = `<div class="sheet" onclick="event.stopPropagation()"><div class="grab"></div><div class="sheet-grid">${items.map(n => { const b = navBadge(n.id); return `<a href="#${n.id}" class="${VIEW === n.id ? 'on' : ''}" data-act="go" data-v="${n.id}">${ic(n.icon)}<span>${n.label}</span>${b ? `<b class="badge">${b}</b>` : ''}</a>`; }).join('')}</div>
  <button type="button" class="me wide" data-act="profile">${avatar(ME)}<div><div class="me-n">${esc(ME.name)}</div><div class="me-r">${ROLES[ME.role].label}</div></div></button></div>`;
  d.querySelector('.sheet').addEventListener('click', e => { const el = e.target.closest('[data-act]'); if (el) { e.preventDefault(); const fn = ACT[el.dataset.act]; closeMenu(); fn && fn(el, e); } });
  document.body.appendChild(d); requestAnimationFrame(() => d.classList.add('in'));
}
function closeMenu() { const d = $('.sheet-ov'); if (!d) return; d.classList.remove('in'); setTimeout(() => d.remove(), 250); }

/* ---------- zdarzenia globalne ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  if (el.closest('.sheet')) return; // obsługiwane w menu
  const fn = ACT[el.dataset.act]; if (!fn) return;
  if (el.tagName === 'A' || el.tagName === 'BUTTON') e.preventDefault();
  try { fn(el, e); } catch (err) { console.error(err); toast(err.message || 'Błąd', 'err'); }
});
document.addEventListener('change', e => { const el = e.target.closest('[data-chg]'); if (el && CHG[el.dataset.chg]) CHG[el.dataset.chg](el, e); });
document.addEventListener('input', e => {
  const b = e.target.closest('.hform'); if (b) updHoursTotal(b);
  if (e.target.matches('[data-gsearch]')) { const q = e.target.value.trim().toLowerCase(); $$('.chip', e.target.closest('.gpanel')).forEach(c => { c.style.display = !q || (c.dataset.name || '').includes(q) ? '' : 'none'; }); }
});
document.addEventListener('submit', e => {
  const f = e.target; if (!f.dataset.sub) return; e.preventDefault();
  try { SUB[f.dataset.sub](f); } catch (err) { toast(err.message || String(err), 'err'); }
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if ($('#modal-root .ov')) return closeModal();
  if ($('.sheet-ov')) return closeMenu();
  const k = Object.keys(GOPT).find(x => GOPT[x].full); if (k) { GOPT[k].full = false; GV[k] = null; render(); }
});
/* przeciąganie osób – pointer events (działa myszą i palcem) */
document.addEventListener('click', e => { if (Date.now() < SUPPRESS_CLICK_UNTIL) { e.stopPropagation(); e.preventDefault(); } }, true);
document.addEventListener('pointerdown', e => {
  const chip = e.target.closest('.chip[data-drag]'); if (!chip || (e.pointerType === 'mouse' && e.button !== 0)) return;
  const inCanvas = !!chip.closest('.gcanvas');
  CD = { chip, id: chip.dataset.drag, kind: chip.dataset.kind, x0: e.clientX, y0: e.clientY, lx: e.clientX, ly: e.clientY, longPress: e.pointerType === 'touch' && !inCanvas, active: false };
  if (CD.longPress) CD.timer = setTimeout(() => { if (CD && !CD.active && !CD.cancel) chipDragStart(); }, 260);
});
document.addEventListener('pointermove', e => {
  if (!CD) return; CD.lx = e.clientX; CD.ly = e.clientY;
  if (CD.active) return chipDragMove(e.clientX, e.clientY);
  const d = Math.hypot(e.clientX - CD.x0, e.clientY - CD.y0);
  if (CD.longPress) { if (d > 10) { CD.cancel = true; clearTimeout(CD.timer); } }
  else if (d > 6) chipDragStart();
});
document.addEventListener('pointerup', () => { if (CD) chipDragEnd(true); });
document.addEventListener('pointercancel', () => { if (CD) chipDragEnd(false); });
document.addEventListener('touchmove', e => { if (CD && CD.active) e.preventDefault(); }, { passive: false });
document.addEventListener('contextmenu', e => { if (e.target.closest('.chip[data-drag]')) e.preventDefault(); });
window.addEventListener('resize', () => { $$('.gcanvas').forEach(cv => { if (GOPT[cv.dataset.gkind]?.full) fitGraph(cv); }); });
window.addEventListener('hashchange', () => { const v = location.hash.slice(1); if (v && v !== VIEW && VIEWS[v] && v !== 'user') { VIEW = v; render(); } });

/* ---------- start ---------- */
function boot() {
  load();
  if (PREVIEW) {
    let id = localStorage.getItem(SESSION_KEY);
    REAL = DB.users.find(u => u.id === id && u.role === 'admin') || DB.users.find(u => u.role === 'admin');
    localStorage.setItem(SESSION_KEY, REAL.id);
  } else {
    const id = localStorage.getItem(SESSION_KEY); REAL = DB.users.find(u => u.id === id && u.active !== false) || null;
  }
  ME = REAL;
  const h = location.hash.slice(1); if (h && VIEWS[h] && h !== 'user') VIEW = h;
  render();
}
boot();
