/* =========================================================
   CrewControl – Slangeservice AS
   Jedna aplikacja: domy, auta, karty paliwowe, godziny,
   rotacje, bilety, dojazdy (Entur/Skyss), dokumenty,
   wiadomości, panel admina.
   ========================================================= */
'use strict';

const VERSION = '1.6.0';
const BUILD = '__BUILD_TIME__'; // build.js wstawia tu datę i godzinę aktualizacji
const DWS_URL = 'https://github.com/daniosagand98';
function buildLabel() { const d = new Date(BUILD); if (isNaN(d)) return ''; const p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}, godz. ${p(d.getHours())}:${p(d.getMinutes())}`; }
function footHTML() { const b = buildLabel(); return `<div class="foot-by">Created and designed by <a href="${DWS_URL}" target="_blank" rel="noopener">DWSystem</a></div><div class="foot-ver">CrewControl wersja ${VERSION}${b ? ` · zaktualizowano ${b}` : ''}</div>`; }
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
  ksiegowa: { label: 'Księgowa', rank: 2 },
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
  coin: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2c-.5-.8-1.5-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1.1 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1.1 0-2.1-.5-2.6-1.3M12 6.5V8M12 16v1.5"/>',
  bug: '<rect x="7" y="8" width="10" height="12" rx="5"/><path d="M12 12v8M7 13H3M21 13h-4M7 17l-3 2M17 17l3 2M7 9L4 7M17 9l3-2M9 8a3 3 0 0 1 6 0"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
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
// Przerwa liczona automatycznie: co najmniej 10 h od rozpoczęcia do zakończenia → 1 h, krócej → 0,5 h
const autoBreak = (from, to) => { const gross = durH(from, to, 0); return gross <= 0 ? 0 : gross >= 10 ? 60 : 30; };
const netH = (from, to) => durH(from, to, autoBreak(from, to));
const entryH = x => netH(x.from, x.to);
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
function emptyDB() { return { users: [], houses: [], cars: [], refuels: [], fuelCards: [], cardTransfers: [], projects: [], hours: [], groups: [], tickets: [], docs: [], messages: [], logs: [], resetRequests: [], reports: [], meta: {} }; }
function load() {
  try { DB = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { DB = null; }
  if (!DB) { DB = emptyDB(); if (PREVIEW) seed(); }
  const e = emptyDB(); for (const k in e) if (!DB[k]) DB[k] = e[k];
  if (PREVIEW) demoPayroll();
  save();
}
// demo: księgowa + przykładowe stawki (także dla starszych danych podglądu)
function demoPayroll() {
  if (!DB.users.some(u => u.role === 'ksiegowa')) DB.users.push({ id: uid(), name: 'Anna Nowicka', login: 'anna', role: 'ksiegowa', pass: '', phone: '+47 400 22 333', email: 'anna@slangeservice.no', houseId: '', carId: '', groupId: '', active: true, createdAt: Date.now() - 864e5 * 30, lastSeen: Date.now() - 7200e3 });
  if (!DB.pay) {
    const P = payCfg(); P.base = 250;
    DB.groups.forEach((g, i) => { P.groups[g.id] = 260 + i * 15; });
    if (DB.projects[0]) P.projects[DB.projects[0].id] = 320;
    const f = DB.users.find(u => u.role === 'foreman'); if (f) userPay(f).rate = 330;
  }
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
  ].map((c, i) => ({ id: uid(), ...c, houseId: houses[i].id }));
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
    houseId: i >= 3 ? houses[i % 3].id : '',
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
      DB.hours.push({ id: uid(), userId: u.id, date: ds, from: '07:00', to: wd === 6 ? '12:00' : '17:00', breakMin: wd === 6 ? 30 : 60, splits: wd === 6 ? [{ projectId: p1, hours: 4.5 }] : [{ projectId: p1, hours: 6 }, { projectId: p2, hours: 3 }], note: '', createdAt: Date.now() });
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
  DB.users.push({ id: uid(), name: 'Oskar Nowicki', login: 'oskar', role: 'pracownik', pass: '', phone: '+47 400 11 222', email: '', houseId: '', carId: '', groupId: '', active: true, pending: true, createdAt: Date.now() - 1800e3, lastSeen: 0 });
  DB.resetRequests = [{ id: uid(), userId: users[4].id, at: Date.now() - 900e3, status: 'open' }];
  DB.logs.push({ id: uid(), userId: users[0].id, action: 'Utworzono dane demonstracyjne', at: Date.now() });
}

/* ---------- sesja / uprawnienia ---------- */
let REAL = null;   // zalogowany użytkownik
let ME = null;     // osoba, jako którą oglądamy aplikację
let VIEW = 'dash', ARG = null;
let SELECTED = null; // {id, kind} – wybrany pracownik (tap‑to‑assign)
const ST = { month: monthNow(), hoursTab: 'mine', rotaWeeks: 12, logUser: '', docUser: '', ticketFilter: 'upcoming' };

const rank = (u = ME) => ROLES[u?.role]?.rank || 0;
const can = { manage: () => rank() >= 3, foreman: () => rank() >= 2, admin: () => rank() >= 4, pay: () => ME?.role === 'ksiegowa' || rank() >= 4 };
const userById = id => DB.users.find(u => u.id === id);
const nameOf = id => userById(id)?.name || '—';
const houseById = id => DB.houses.find(h => h.id === id);
const carById = id => DB.cars.find(c => c.id === id);
const groupById = id => DB.groups.find(g => g.id === id);
const carsOfHouse = hid => hid ? DB.cars.filter(c => c.houseId === hid) : [];
const projById = id => DB.projects.find(p => p.id === id);
const activeUsers = () => DB.users.filter(u => u.active !== false && !u.pending);
// ekipa = ludzie, którzy pracują w godzinach (kierownik = właściciel/koordynator na stałej pensji – bez godzin, domów, rotacji)
const crew = () => activeUsers().filter(u => u.role !== 'kierownik' && u.role !== 'ksiegowa');
const isBoss = (u = ME) => u?.role === 'kierownik';

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
  { id: 'rota', icon: 'cal', label: 'Grafik i rotacje', min: 1, hide: ['ksiegowa'] },
  { id: 'rotations', icon: 'swap', label: 'Sterowanie rotacjami', min: 3 },
  { id: 'pay', icon: 'coin', label: 'Wypłaty', min: 1, ok: () => can.pay() },
  { id: 'houses', icon: 'house', label: 'Mapa', min: 2, hide: ['ksiegowa'] },
  { id: 'cars', icon: 'car', label: 'Auta', min: 2, hide: ['ksiegowa'] },
  { id: 'cards', icon: 'card', label: 'Karty paliwowe', min: 1, hide: ['ksiegowa'] },
  { id: 'tickets', icon: 'plane', label: 'Bilety i dojazd', min: 1 },
  { id: 'docs', icon: 'file', label: 'Dokumenty', min: 1 },
  { id: 'msgs', icon: 'chat', label: 'Wiadomości', min: 1 },
  { id: 'reports', icon: 'flag', label: 'Zgłoszenia', min: 3 },
  { id: 'projects', icon: 'folder', label: 'Projekty', min: 2, hide: ['ksiegowa'] },
  { id: 'people', icon: 'users', label: 'Pracownicy', min: 3 },
  { id: 'backup', icon: 'dl', label: 'Kopie zapasowe', min: 3 },
  { id: 'admin', icon: 'shield', label: 'Panel admina', min: 4 },
];
const BNAV = ['dash', 'hours', 'rota', 'tickets'];
const navOk = n => !!n && rank() >= n.min && (!n.ok || n.ok()) && !(n.hide || []).includes(ME?.role);
const bnav = () => ME?.role === 'ksiegowa' ? ['dash', 'hours', 'pay', 'msgs'] : BNAV;

function myMessages(u = ME) {
  return DB.messages.filter(m => m.fromId === u.id || m.toType === 'all' || (m.toType === 'user' && m.toId === u.id) || (m.toType === 'group' && m.toId === u.groupId));
}
const unreadCount = (u = ME) => myMessages(u).filter(m => m.fromId !== u.id && !(m.readBy || []).includes(u.id)).length;
const pendingForMe = (u = ME) => DB.cardTransfers.filter(t => t.status === 'pending' && t.toId === u.id);
function navBadge(id) {
  if (id === 'msgs') return unreadCount();
  if (id === 'cards') return pendingForMe().length;
  if (id === 'reports') return openReportsCount();
  if (id === 'people' && can.manage()) return DB.users.filter(u => u.pending).length + (DB.resetRequests || []).filter(r => r.status === 'open').length;
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
  const navItems = NAV.filter(navOk);
  const link = (n, cls = '') => { const b = navBadge(n.id); return `<a href="#${n.id}" class="${cls} ${VIEW === n.id ? 'on' : ''}" data-act="go" data-v="${n.id}">${ic(n.icon)}<span>${navLabel(n)}</span>${b ? `<b class="badge">${b}</b>` : ''}</a>`; };
  const unread = unreadCount();
  return `${previewBar()}
  <div class="shell">
    <aside class="side">
      <div class="brand">${LOGO ? `<img class="brand-logo" src="${LOGO}" alt="${esc(COMPANY)}">` : '<div class="logo">S</div>'}<div class="brand-t">CrewControl</div></div>
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
      <footer class="foot">${footHTML()}<div class="foot-note">${esc(COMPANY)} · ${PREVIEW ? 'tryb podglądu (dane demo, lokalnie)' : 'dane zapisywane lokalnie w tej przeglądarce'}</div></footer>
    </main>
    <nav class="bnav">${bnav().map(id => { const n = NAV.find(x => x.id === id); const b = navBadge(id); return `<a href="#${id}" class="${VIEW === id ? 'on' : ''}" data-act="go" data-v="${id}">${ic(n.icon)}<span>${navLabel(n).split(' ')[0]}</span>${b ? `<b class="badge">${b}</b>` : ''}</a>`; }).join('')}
      <a href="#more" data-act="menu">${ic('menu')}<span>${NAV_T[langOf()]?.more || 'Więcej'}</span>${(navBadge('msgs') + navBadge('cards') + navBadge('people')) ? `<b class="badge">${navBadge('msgs') + navBadge('cards') + navBadge('people')}</b>` : ''}</a></nav>
  </div>`;
}
let LAST_VIEW = null, LAST_ARG = null, LAST_ME = null;
function render() {
  if (!REAL || !ME) return renderAuth();
  const n = NAV.find(x => x.id === VIEW);
  if ((n && !navOk(n)) || !VIEWS[VIEW]) { VIEW = 'dash'; ARG = null; }
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

/* ---------- logowanie / rejestracja / reset ---------- */
let AUTH_TAB = null;          // 'login' | 'register' | 'reset'
const LOGO = window.CC_LOGO || '';
function genCode() { const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let s = ''; const r = crypto.getRandomValues(new Uint8Array(10)); for (let i = 0; i < 10; i++) { s += a[r[i] % a.length]; if (i === 4) s += '-'; } return s; }
function showRecoveryCode(code, first) {
  modal('Kod odzyskiwania hasła', `<p>${first ? 'Konto administratora gotowe. ' : ''}Zapisz ten kod w bezpiecznym miejscu (np. zrób zrzut ekranu). Pozwoli Ci ustawić nowe hasło, jeśli zapomnisz obecnego.</p>
    <div class="code-box">${esc(code)}</div><p class="muted small">Kod pokazuje się tylko raz. Nowy wygenerujesz w „Moje konto”.</p>`,
    { onSubmit: () => { }, submitLabel: 'Zapisałem kod' });
}
function authLogoHTML() { return LOGO ? `<img class="auth-logo" src="${LOGO}" alt="${esc(COMPANY)}">` : '<div class="logo big">S</div>'; }
function renderAuth() {
  const none = DB.users.length === 0;
  const tab = AUTH_TAB || (none ? 'register' : 'login');
  const seg = `<div class="seg auth-seg"><button type="button" class="${tab === 'login' ? 'on' : ''}" data-act="auth-tab" data-k="login">Zaloguj się</button><button type="button" class="${tab === 'register' ? 'on' : ''}" data-act="auth-tab" data-k="register">Załóż konto</button></div>`;
  let body = '';
  if (tab === 'login') {
    body = `${none ? `<div class="hint">Na tym urządzeniu nie ma jeszcze żadnych kont. Jeśli konto masz już gdzie indziej (np. w Safari), wczytaj kopię zapasową poniżej.</div>` : ''}
      <form class="auth-form" data-sub="auth-login">
        <label>Login<input name="login" required autocomplete="username" autocapitalize="none" autocorrect="off"></label>
        <label>Hasło<input name="pass" type="password" required autocomplete="current-password"></label>
        <button class="btn primary block" type="submit">Zaloguj się</button>
      </form>
      <button type="button" class="link center" data-act="auth-tab" data-k="reset">Nie pamiętam hasła</button>`;
  } else if (tab === 'register') {
    body = `<div class="hint ${none ? '' : 'soft'}">${none ? 'Pierwsze konto na tym urządzeniu zostanie <b>administratorem</b>.' : 'Po założeniu konto czeka na akceptację kierownika lub admina.'}</div>
      <form class="auth-form" data-sub="auth-register">
        <label>Imię i nazwisko<input name="name" required autocomplete="name"></label>
        <div class="g2"><label>Login<input name="login" required autocomplete="username" autocapitalize="none" autocorrect="off"></label><label>Telefon<input name="phone" inputmode="tel" autocomplete="tel" placeholder="opcjonalnie"></label></div>
        <div class="g2"><label>Hasło<input name="pass" type="password" required minlength="4" autocomplete="new-password"></label><label>Powtórz hasło<input name="pass2" type="password" required minlength="4" autocomplete="new-password"></label></div>
        <button class="btn primary block" type="submit">${none ? 'Utwórz konto admina' : 'Załóż konto'}</button>
      </form>`;
  } else {
    body = `<div class="auth-sub"><button type="button" class="link" data-act="auth-tab" data-k="login">← Wróć do logowania</button><h3>Reset hasła</h3></div>
      <form class="auth-form" data-sub="auth-reset-code">
        <div class="muted small">Masz kod odzyskiwania? Ustaw nowe hasło od razu.</div>
        <div class="g2"><label>Login<input name="login" required autocapitalize="none" autocorrect="off"></label><label>Kod odzyskiwania<input name="code" required autocapitalize="characters" placeholder="XXXXX-XXXXX"></label></div>
        <div class="g2"><label>Nowe hasło<input name="pass" type="password" required minlength="4" autocomplete="new-password"></label><label>Powtórz<input name="pass2" type="password" required minlength="4" autocomplete="new-password"></label></div>
        <button class="btn primary block" type="submit">Ustaw nowe hasło</button>
      </form>
      <div class="or"><span>albo</span></div>
      <form class="auth-form" data-sub="auth-reset-request">
        <div class="muted small">Nie masz kodu? Wyślij prośbę – kierownik albo admin ustawi Ci nowe hasło.</div>
        <div class="row gap"><input name="login" required placeholder="Twój login" autocapitalize="none" autocorrect="off"><button class="btn ghost" type="submit">Wyślij prośbę</button></div>
      </form>`;
  }
  $('#app').innerHTML = `<div class="auth"><div class="auth-card">
    ${authLogoHTML()}
    <div class="auth-title">CrewControl</div>
    ${tab !== 'reset' ? seg : ''}
    ${body}
    <div class="auth-alt">
      <label class="btn ghost block filebtn">${ic('up')} Wczytaj kopię zapasową<input type="file" accept=".json,application/json" data-chg="restore" hidden></label>
      <button type="button" class="link center" data-act="install-help">${ic('dl')} Jak dodać do ekranu telefonu?</button>
    </div>
    <div class="foot">${footHTML()}</div>
  </div></div>`;
}
async function authLogin(f) {
  const fd = new FormData(f);
  const login = String(fd.get('login')).trim().toLowerCase(), pass = String(fd.get('pass'));
  const u = DB.users.find(x => x.login === login);
  if (!u || u.pass !== await sha(pass)) throw new Error('Błędny login lub hasło');
  if (u.pending) throw new Error('Konto czeka na akceptację kierownika lub admina');
  if (u.active === false) throw new Error('Konto jest zablokowane – skontaktuj się z kierownikiem');
  REAL = ME = u; log('Zalogowano'); save();
  localStorage.setItem(SESSION_KEY, REAL.id); AUTH_TAB = null; VIEW = 'dash'; ARG = null; render(); window.scrollTo(0, 0);
}
async function authRegister(f) {
  const fd = new FormData(f);
  const name = String(fd.get('name')).trim(), login = String(fd.get('login')).trim().toLowerCase(), pass = String(fd.get('pass'));
  if (!name || !login) throw new Error('Uzupełnij imię i login');
  if (!/^[a-z0-9._-]{2,30}$/.test(login)) throw new Error('Login: same litery bez polskich znaków, cyfry, kropka lub myślnik');
  if (DB.users.some(x => x.login === login)) throw new Error('Taki login jest już zajęty');
  if (pass.length < 4) throw new Error('Hasło musi mieć min. 4 znaki');
  if (pass !== String(fd.get('pass2'))) throw new Error('Hasła nie są takie same');
  const first = DB.users.length === 0;
  const u = { id: uid(), name, login, pass: await sha(pass), role: first ? 'admin' : 'pracownik', phone: String(fd.get('phone') || ''), email: '', houseId: '', carId: '', groupId: '', active: true, pending: !first, createdAt: Date.now(), lastSeen: first ? Date.now() : 0 };
  let code = '';
  if (first) { code = genCode(); u.recovery = await sha(code); }
  DB.users.push(u);
  DB.logs.unshift({ id: uid(), userId: u.id, action: first ? 'Utworzono konto administratora' : 'Założono konto (czeka na akceptację)', at: Date.now() });
  save();
  if (first) { REAL = ME = u; localStorage.setItem(SESSION_KEY, u.id); AUTH_TAB = null; VIEW = 'dash'; ARG = null; render(); window.scrollTo(0, 0); showRecoveryCode(code, true); }
  else { AUTH_TAB = 'login'; render(); toast('Konto założone – poczekaj na akceptację kierownika', 'info'); }
}
async function authResetCode(f) {
  const fd = new FormData(f);
  const u = DB.users.find(x => x.login === String(fd.get('login')).trim().toLowerCase());
  const code = String(fd.get('code')).trim().toUpperCase().replace(/\s/g, '');
  const pass = String(fd.get('pass'));
  if (pass.length < 4) throw new Error('Hasło musi mieć min. 4 znaki');
  if (pass !== String(fd.get('pass2'))) throw new Error('Hasła nie są takie same');
  if (!u || !u.recovery || u.recovery !== await sha(code.includes('-') ? code : code.slice(0, 5) + '-' + code.slice(5))) throw new Error('Nieprawidłowy login lub kod odzyskiwania');
  u.pass = await sha(pass);
  DB.logs.unshift({ id: uid(), userId: u.id, action: 'Reset hasła kodem odzyskiwania', at: Date.now() }); save();
  AUTH_TAB = 'login'; render(); toast('Hasło zmienione – zaloguj się');
}
function authResetRequest(f) {
  const login = String(new FormData(f).get('login')).trim().toLowerCase();
  const u = DB.users.find(x => x.login === login);
  if (u && !DB.resetRequests.some(r => r.userId === u.id && r.status === 'open')) {
    DB.resetRequests.push({ id: uid(), userId: u.id, at: Date.now(), status: 'open' });
    DB.logs.unshift({ id: uid(), userId: u.id, action: 'Prośba o reset hasła', at: Date.now() }); save();
  }
  AUTH_TAB = 'login'; render(); toast('Prośba wysłana – kierownik ustawi Ci nowe hasło', 'info');
}
function logout() { log('Wylogowano'); save(); localStorage.removeItem(SESSION_KEY); REAL = ME = null; VIEW = 'dash'; AUTH_TAB = 'login'; render(); }

/* ---------- instalacja na ekranie telefonu ---------- */
const PLATFORM = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ? 'ios' : /android/i.test(navigator.userAgent) ? 'android' : 'desktop';
const isStandalone = () => window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;
let DEFERRED_INSTALL = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); DEFERRED_INSTALL = e; });
window.addEventListener('appinstalled', () => { DEFERRED_INSTALL = null; toast('Aplikacja dodana do ekranu'); });
const SHARE_IC = '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M8 7l4-4 4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
const DOTS_V = '<b class="kbd">⋮</b>', DOTS_H = '<b class="kbd">•••</b>';
function installHTML(tab) {
  const url = location.protocol.startsWith('http') ? location.origin + location.pathname.replace(/preview\.html$/, '') : 'https://daniosagand98.github.io/SlangeService/';
  const step = (n, html) => `<div class="istep"><span class="inum">${n}</span><div>${html}</div></div>`;
  const ios = `
    ${step(1, `Otwórz stronę w <b>Safari</b>:<div class="url">${esc(url)}</div>`)}
    ${step(2, `Stuknij przycisk <b>Udostępnij</b> <span class="kbd">${SHARE_IC}</span> na dolnym pasku. W nowszym Safari (iOS 26) najpierw stuknij ${DOTS_H} obok adresu strony, potem <b>Udostępnij</b>.`)}
    ${step(3, `Przewiń listę w dół i wybierz <b>„Do ekranu początkowego”</b>.`)}
    ${step(4, `Zostaw włączone <b>„Otwórz jako aplikacja internetowa”</b> (jeśli jest), nazwa „Slangeservice”, i stuknij <b>Dodaj</b>.`)}
    ${step(5, `Na ekranie pojawi się ikona z logo. Otwieraj aplikację zawsze z niej.`)}
    <div class="inote">${ic('bell')}<div><b>Wersja testowa:</b> aplikacja z ikony na iPhonie ma osobne dane niż Safari. Jeśli konto masz już w Safari: w Safari wejdź w <b>Panel admina → Pobierz kopię zapasową</b>, a potem w aplikacji z ikony na ekranie logowania stuknij <b>Wczytaj kopię zapasową</b>. Po podłączeniu serwera ten krok zniknie.</div></div>`;
  const android = `
    ${DEFERRED_INSTALL ? `<button type="button" class="btn primary block" data-act="install-now">${ic('dl')} Zainstaluj teraz</button><div class="or"><span>albo ręcznie</span></div>` : ''}
    ${step(1, `Otwórz stronę w <b>Chrome</b>:<div class="url">${esc(url)}</div>`)}
    ${step(2, `Stuknij ${DOTS_V} (trzy kropki w prawym górnym rogu).`)}
    ${step(3, `Wybierz <b>„Zainstaluj aplikację”</b> albo <b>„Dodaj do ekranu głównego”</b>.`)}
    ${step(4, `Potwierdź <b>Zainstaluj</b>. Ikona z logo trafi na ekran i do listy aplikacji.`)}
    <div class="inote">${ic('bell')}<div><b>Samsung Internet:</b> stuknij ≡ → <b>„Dodaj stronę do”</b> → <b>„Ekran startowy”</b>.</div></div>`;
  return `<div class="seg itabs"><button type="button" class="${tab === 'ios' ? 'on' : ''}" data-act="install-tab" data-k="ios">iPhone</button><button type="button" class="${tab === 'android' ? 'on' : ''}" data-act="install-tab" data-k="android">Android</button></div>
    <div class="iapp">${LOGO ? `<img src="icons/apple-touch-icon.png" alt="" onerror="this.remove()">` : ''}<div><b>Slangeservice</b><div class="muted small">Ikona aplikacji na ekranie telefonu</div></div></div>
    <div class="isteps">${tab === 'ios' ? ios : android}</div>`;
}
function installHelp(tab) { modal('Dodaj aplikację do ekranu', `<div id="installBody">${installHTML(tab || (PLATFORM === 'android' ? 'android' : 'ios'))}</div>`); }

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
  const boss = isBoss();
  const tickets = DB.tickets.filter(t => (boss || t.groupId === ME.groupId || (t.userIds || []).includes(ME.id)) && t.date >= T).sort((a, b) => a.date.localeCompare(b.date));
  const msgs = myMessages().filter(m => m.fromId !== ME.id).sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
  const hr = new Date().getHours();
  const hello = hr < 5 ? 'Dobranoc' : hr < 12 ? 'Dzień dobry' : hr < 18 ? 'Cześć' : 'Dobry wieczór';

  let heroSub, heroAct;
  if (boss) {
    const inNO = crew().filter(u => rotStatus(groupById(u.groupId), T) === 'NO');
    const doneToday = inNO.filter(u => DB.hours.some(h => h.userId === u.id && h.date === T)).length;
    heroSub = `W Norwegii dziś: <b>${inNO.length}</b> os. · godziny wpisane dziś: <b>${doneToday}</b> z ${inNO.length}`;
    heroAct = `<button type="button" class="btn primary" data-act="hours-add-for">${ic('plus')} Dodaj godziny pracownikowi</button>`;
  } else {
    heroSub = st ? `Jesteś teraz: ${statusPill(st)} ${nc ? `· zmiana za <b>${nc.days}</b> dni (${fmtDate(nc.date)})` : ''}` : 'Nie masz jeszcze przypisanej rotacji.';
    heroAct = todayH.length ? `<span class="pill ok">${ic('check')} Dziś wpisano ${fmtH(sumH(todayH))}</span>` : `<button type="button" class="btn primary" data-act="go" data-v="hours">${ic('plus')} Wpisz dzisiejsze godziny</button>`;
  }
  let html = `<div class="hero anim">
    <div><div class="muted small">${fmtDate(T)}</div><h2>${hello}, ${esc(ME.name.split(' ')[0])} 👋</h2>
    <div class="hero-sub">${heroSub}</div></div>
    <div class="hero-act">${heroAct}</div>
  </div>`;
  if (can.manage()) html += `<div class="qa anim" style="--i:1">
    <button type="button" class="qa-b" data-act="hours-add-for">${ic('clock')}<span>Godziny pracownika</span></button>
    <button type="button" class="qa-b" data-act="go" data-v="rotations">${ic('swap')}<span>Rotacje</span></button>
    <button type="button" class="qa-b" data-act="ticket-edit">${ic('plane')}<span>Wyślij bilety</span></button>
    <button type="button" class="qa-b" data-act="user-edit">${ic('users')}<span>Dodaj pracownika</span></button>
    <button type="button" class="qa-b" data-act="msg-new">${ic('send')}<span>Wiadomość</span></button>
  </div>`;

  if (!isStandalone() && PLATFORM !== 'desktop' && !localStorage.getItem('cc_install_hide')) html += `<div class="ibanner anim">${LOGO ? `<img src="${LOGO}" alt="">` : ''}<div class="grow"><b>Dodaj aplikację do ekranu telefonu</b><div class="muted small">Ikona Slangeservice, otwiera się jak zwykła aplikacja.</div></div><button type="button" class="btn sm primary" data-act="install-help">Pokaż jak</button><button type="button" class="ib sm" data-act="install-hide" aria-label="Ukryj">${ic('x')}</button></div>`;
  if (can.pay()) { const pm = crew().map(u => payFor(u, M)), gs = pm.reduce((a, p) => a + p.gross, 0), paidN = Object.keys(payCfg().paid[M] || {}).length, worked = pm.filter(p => p.hours).length; html += `<div class="card anim maplink"><div class="row gap">${ic('coin')}<div class="grow"><b>Wypłaty – ${fmtMonth(M)}</b><div class="muted small">Brutto ${money(gs)} · wypłacone ${paidN}/${worked}</div></div><button type="button" class="btn sm primary" data-act="go" data-v="pay">Rozliczenie</button></div></div>`; }
  if (can.manage()) { const np = DB.users.filter(u => u.pending).length, nr = DB.resetRequests.filter(r => r.status === 'open').length; if (np || nr) html += `<div class="alert anim">${ic('users')}<div class="grow">${np ? `<b>${np}</b> ${np === 1 ? 'nowe konto czeka' : 'nowe konta czekają'} na akceptację. ` : ''}${nr ? `<b>${nr}</b> ${nr === 1 ? 'prośba' : 'prośby'} o reset hasła.` : ''}</div><button type="button" class="btn primary sm" data-act="go" data-v="people">Przejdź</button></div>`; }
  if (pend.length) html += pend.map(t => { const c = DB.fuelCards.find(x => x.id === t.cardId); return `<div class="alert anim">${ic('card')}<div class="grow"><b>${esc(nameOf(t.fromId))}</b> przekazuje Ci kartę paliwową <b>${esc(c?.name)}</b> (•••• ${esc(c?.last4)}). Potwierdź, że ją dostałeś.</div><div class="row"><button type="button" class="btn ghost sm" data-act="card-reject" data-id="${t.id}">Odrzuć</button><button type="button" class="btn primary sm" data-act="card-accept" data-id="${t.id}">${ic('check')} Mam kartę</button></div></div>`; }).join('');

  if (can.manage()) {
    const ws = crew();
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
      <div class="card anim" style="--i:7"><div class="card-h"><h3>Najbliższe zmiany rotacji</h3><button type="button" class="btn sm ghost" data-act="go" data-v="rotations">Zarządzaj</button></div>
        ${moves.length ? moves.sort((a, b) => a.days - b.days).map(m => `<div class="li"><span class="gdot" style="--c:${esc(m.g.color)}"></span><div class="grow"><b>${esc(m.g.name)}</b> <span class="muted small">(${m.cnt} os.)</span><div class="muted small">${m.to === 'NO' ? 'Przyjazd do Norwegii' : 'Wyjazd do Polski'} · ${fmtDate(m.date)}</div></div><span class="pill ${m.days <= 7 ? 'warn' : ''}">za ${m.days} dni</span></div>`).join('') : empty('Brak zmian w ciągu 3 tygodni', 'cal')}
      </div>
      <div class="card anim" style="--i:8"><div class="card-h"><h3>Auta – przypomnienia</h3></div>
        ${carAlerts().length ? carAlerts().map(a => `<div class="li">${ic('car')}<div class="grow"><b>${esc(a.car.name)}</b> <span class="muted small">${esc(a.car.plate)}</span><div class="muted small">${a.text}</div></div><span class="pill warn">!</span></div>`).join('') : empty('Wszystko w porządku', 'check')}
      </div></div>`;
  } else {
    html += `<div class="stats">
      ${stat(`Moje godziny – ${MONTHS[+M.slice(5) - 1]}`, round2(myH), { icon: 'clock', go: 'hours', i: 1, suf: ' h' })}
      ${stat('Mój dom', house ? esc(house.name) : '—', { icon: 'house', tone: 'green', go: can.foreman() ? 'houses' : '', i: 2 })}
      ${stat('Moje auto', car ? esc(car.name) : '—', { icon: 'car', tone: 'blue', go: can.foreman() ? 'cars' : '', i: 3 })}
      ${stat('Karta paliwowa', myCards.length ? esc(myCards.map(c => '•••• ' + c.last4).join(', ')) : 'nie mam', { icon: 'card', go: 'cards', i: 4 })}
    </div>`;
  }
  if (!can.manage() && house) {
    const mates = crew().filter(u => u.houseId === house.id && u.id !== ME.id), hc = carsOfHouse(house.id);
    html += `<div class="card anim myhouse" style="--i:8"><div class="card-h"><div><h3>${ic('house')} Mój dom: ${esc(house.name)}</h3><div class="muted small">${ic('pin')} ${esc(house.address || '')}</div></div><span class="pill">${mates.length + 1}/${house.beds || '–'}</span></div>
      <div><div class="lbl">Auta przy domu</div>${hc.length ? `<div class="hcars">${hc.map(c => { const drivers = crew().filter(u => u.carId === c.id); return `<div class="hcar">${ic('car')}<div class="grow"><b>${esc(c.name)}</b> <span class="plate sm">${esc(c.plate || '—')}</span><div class="muted small">${c.seats || '?'} miejsc · ${(+c.odometer || 0).toLocaleString('pl')} km${drivers.length ? ' · jeżdżą: ' + drivers.map(u => esc(u.name.split(' ')[0])).join(', ') : ''}</div></div>${c.id === ME.carId ? '<span class="pill ok">Twoje</span>' : ''}</div>`; }).join('')}</div>` : '<div class="muted small">Do tego domu nie ma jeszcze przypisanych aut.</div>'}</div>
      ${mates.length ? `<div><div class="lbl">Mieszkasz z</div><div class="tags">${mates.map(u => `<span class="tag">${esc(u.name)}</span>`).join('')}</div></div>` : ''}
    </div>`;
  }
  html += `<div class="grid2">
    <div class="card anim" style="--i:9"><div class="card-h"><h3>${boss ? 'Najbliższe bilety' : 'Moje bilety'}</h3><button type="button" class="btn sm ghost" data-act="go" data-v="tickets">Wszystkie</button></div>
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
    ${can.foreman() ? (() => { const sel = e.userId !== undefined ? e.userId : (isBoss() ? '' : ME.id); const pick = !sel || !crew().some(u => u.id === sel); return `<label>Pracownik<select name="userId" ${pick ? 'required' : ''}>${pick ? '<option value="">— wybierz pracownika —</option>' : ''}${crew().map(u => opt(u.id, u.name, sel === u.id)).join('')}</select></label>`; })() : ''}
    <div class="g3 tight"><label>Data<input type="date" name="date" value="${e.date || isoLocal()}" required></label>
      <label>Od<input type="time" name="from" value="${e.from || '07:00'}" required></label>
      <label>Do<input type="time" name="to" value="${e.to || '18:00'}" required></label></div>
    <div class="totalbox"><span class="muted small">Czas pracy</span><b class="htot">0 h</b><span class="hbrk muted small"></span><span class="hrest small"></span></div>
    <div class="splits-h"><span>Ile godzin nad którym projektem</span><button type="button" class="btn sm ghost" data-act="add-split">${ic('plus')} projekt</button></div>
    <div class="splits">${splits.map(splitRow).join('')}</div>
    <label>Notatka<input name="note" value="${esc(e.note || '')}" placeholder="opcjonalnie – co robiłeś"></label>
  </div>`;
}
function updHoursTotal(box) {
  if (!box) return;
  const v = n => box.querySelector(`[name=${n}]`)?.value;
  const tot = netH(v('from'), v('to')); const brk = autoBreak(v('from'), v('to'));
  const hb = box.querySelector('.hbrk'); if (hb) hb.textContent = brk ? `(−${fmtH(brk / 60)} przerwy)` : '';
  const sp = $$('[name=sp_h]', box).reduce((s, i) => s + (parseFloat(String(i.value).replace(',', '.')) || 0), 0);
  box.querySelector('.htot').textContent = fmtH(tot);
  const r = box.querySelector('.hrest'); const rest = round2(tot - sp);
  r.className = 'hrest small ' + (rest < 0 ? 'bad' : rest > 0 ? 'muted' : 'good');
  r.textContent = sp === 0 ? 'bez podziału na projekty' : rest < 0 ? `projekty: ${fmtH(sp)} – za dużo o ${fmtH(-rest)}` : rest > 0 ? `nieprzypisane: ${fmtH(rest)}` : 'wszystko przypisane ✓';
}
function readHours(fd) {
  const date = fd.get('date'), from = fd.get('from'), to = fd.get('to'), breakMin = autoBreak(from, to);
  const tot = netH(from, to);
  if (!date || tot <= 0) throw new Error('Sprawdź godziny – czas pracy wychodzi 0');
  const ps = fd.getAll('sp_proj'), hs = fd.getAll('sp_h'); const rows = ps.map((p, i) => ({ projectId: p, raw: String(hs[i] ?? '').trim() })).filter(r => r.projectId);
  const filled = rows.filter(r => r.raw !== ''), blank = rows.filter(r => r.raw === '');
  let splits = filled.map(r => ({ projectId: r.projectId, hours: parseFloat(r.raw.replace(',', '.')) || 0 })).filter(s => s.hours > 0);
  const used = splits.reduce((s, x) => s + x.hours, 0);
  if (blank.length === 1 && tot - used > 0) splits.push({ projectId: blank[0].projectId, hours: round2(tot - used) });
  const sum = splits.reduce((s, x) => s + x.hours, 0);
  if (sum > tot + 0.01) throw new Error(`Suma projektów (${fmtH(sum)}) jest większa niż czas pracy (${fmtH(tot)})`);
  const userId = fd.has('userId') ? fd.get('userId') : ME.id;
  if (!userId) throw new Error('Wybierz pracownika');
  return { date, from, to, breakMin, splits, note: String(fd.get('note') || '').trim(), userId };
}
function entryRow(x, showUser) {
  const canEdit = x.userId === ME.id || can.foreman();
  return `<div class="entry anim">
    <div class="e-d"><b>${fmtDate(x.date).split(' ')[0]}</b><span>${x.date.slice(8)}.${x.date.slice(5, 7)}</span></div>
    <div class="grow">${showUser ? `<div><b>${esc(nameOf(x.userId))}</b></div>` : ''}
      <div>${esc(x.from)}–${esc(x.to)} <span class="muted small">· przerwa ${fmtH(autoBreak(x.from, x.to) / 60)}</span></div>
      <div class="tags">${(x.splits || []).map(s => `<span class="tag">${esc(projById(s.projectId)?.name || '?')} · ${fmtH(s.hours)}</span>`).join('')}${x.note ? `<span class="muted small">„${esc(x.note)}”</span>` : ''}${x.editedBy && x.editedBy !== x.userId ? `<span class="tag warn">poprawione: ${esc(nameOf(x.editedBy))}</span>` : ''}</div></div>
    <div class="e-h">${fmtH(entryH(x))}</div>
    ${canEdit ? `<button type="button" class="ib" data-act="edit-hours" data-id="${x.id}" aria-label="Edytuj">${ic('edit')}</button>` : ''}
  </div>`;
}
function monthPicker() { return `<input type="month" class="mpick" value="${ST.month}" data-chg="month">`; }
VIEWS.hours = () => {
  const tabs = [...(isBoss() || ME.role === 'ksiegowa' ? [] : [['mine', 'Moje']]), ...(can.foreman() ? [['team', 'Zespół'], ['proj', 'Projekty']] : [])];
  if (!tabs.find(t => t[0] === ST.hoursTab)) ST.hoursTab = tabs[0][0];
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
      ${myPayCard(M)}
      <div class="card anim" style="--i:3"><div class="card-h"><h3>Wpisy</h3></div>${list.length ? list.map(x => entryRow(x)).join('') : empty('Brak wpisów w tym miesiącu', 'clock')}</div>`;
  } else if (ST.hoursTab === 'team') {
    const list = DB.hours.filter(h => h.date.startsWith(M));
    const rows = crew().map(u => { const l = list.filter(h => h.userId === u.id); const byP = {}; l.forEach(x => (x.splits || []).forEach(s => byP[s.projectId] = (byP[s.projectId] || 0) + s.hours)); return { u, tot: sumH(l), days: new Set(l.map(x => x.date)).size, byP }; }).sort((a, b) => b.tot - a.tot);
    const max = Math.max(1, ...rows.map(r => r.tot));
    if (isBoss()) html += `<form class="card anim" data-sub="hours-add"><div class="card-h"><h3>Dodaj godziny dla pracownika</h3></div>${hoursFormHTML({})}<button class="btn primary block" type="submit">${ic('check')} Zapisz godziny</button></form>`;
    html += `<div class="row wrap gap">${isBoss() ? '' : `<button type="button" class="btn primary" data-act="hours-add-for">${ic('plus')} Dodaj godziny pracownikowi</button>`}<button type="button" class="btn ghost" data-act="export-hours">${ic('dl')} Eksport CSV (${fmtMonth(M)})</button></div>
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
  return { title: isBoss() ? 'Godziny pracowników' : 'Godziny pracy', sub: isBoss() ? 'Kontrola godzin zespołu i projektów' : 'Od której do której + podział na projekty', html };
};
function projBars(byP, tot) {
  const e = Object.entries(byP).sort((a, b) => b[1] - a[1]);
  if (!e.length) return '<div class="muted small">Brak podziału na projekty</div>';
  return e.map(([p, h]) => `<div class="pb"><div class="row"><span class="grow">${esc(projById(p)?.name || '?')}</span><b>${fmtH(h)}</b></div><div class="hbar"><i style="--w:${tot ? h / tot * 100 : 0}%"></i></div></div>`).join('');
}

/* ----- GRAFIK / ROTACJE ----- */
/* ----- STEROWANIE ROTACJAMI (kierownik / admin) ----- */
VIEWS.rotations = () => {
  const T = isoLocal(), ws = crew(), noGroup = ws.filter(u => !groupById(u.groupId));
  const cards = DB.groups.map((gr, i) => {
    const s = rotStatus(gr, T), n = nextChange(gr, T), mem = ws.filter(u => u.groupId === gr.id);
    const len = ((s === 'NO' ? gr.weeksIn : gr.weeksOut) || 1) * 7, pct = n ? Math.max(4, Math.min(100, 100 - n.days / len * 100)) : 0;
    return `<div class="card rotc anim" style="--i:${i};--gc:${esc(gr.color || '#ff7a1a')}">
      <div class="card-h"><div class="rotc-t"><span class="gdot" style="--c:${esc(gr.color)}"></span><h3>${esc(gr.name)}</h3></div>${statusPill(s)}</div>
      <div class="kv"><div><span>Cykl NO/PL</span><b>${gr.weeksIn}/${gr.weeksOut} tyg.</b></div><div><span>Osób</span><b>${mem.length}</b></div><div><span>Następna zmiana</span><b>${n ? fmtDate(n.date) : '—'}</b></div><div><span>Start cyklu</span><b>${fmtDate(gr.start)}</b></div></div>
      ${n ? `<div class="hbar"><i style="--w:${pct}%"></i></div><div class="muted small">${n.to === 'PL' ? 'Wyjazd do Polski' : 'Przyjazd do Norwegii'} za <b>${n.days}</b> ${n.days === 1 ? 'dzień' : 'dni'}</div>` : ''}
      <div class="tags">${mem.map(u => `<span class="tag">${esc(u.name)}</span>`).join('') || '<span class="muted small">Nikt nie przypisany</span>'}</div>
      <div class="row gap wrap">
        <button type="button" class="btn sm primary" data-act="group-edit" data-id="${gr.id}">${ic('edit')} Edytuj</button>
        <div class="gseg sm"><button type="button" class="btn sm ghost" data-act="group-shift" data-id="${gr.id}" data-d="-7" title="Przesuń cały cykl o tydzień wcześniej">− 1 tydz.</button><button type="button" class="btn sm ghost" data-act="group-shift" data-id="${gr.id}" data-d="7" title="Przesuń cały cykl o tydzień później">+ 1 tydz.</button></div>
        <button type="button" class="btn sm ghost" data-act="ticket-edit" data-group="${gr.id}">${ic('plane')} Bilety dla grupy</button>
        <button type="button" class="btn sm ghost" data-act="group-msg" data-id="${gr.id}">${ic('send')} Wiadomość</button>
      </div>
    </div>`;
  }).join('');
  let html = `<div class="stats">${stat('Rotacje', DB.groups.length, { icon: 'cal' })}${stat('W Norwegii teraz', ws.filter(u => rotStatus(groupById(u.groupId), T) === 'NO').length, { icon: 'pin', tone: 'blue', i: 1 })}${stat('W Polsce teraz', ws.filter(u => rotStatus(groupById(u.groupId), T) === 'PL').length, { icon: 'house', tone: 'green', i: 2 })}${stat('Bez rotacji', noGroup.length, { icon: 'warn', tone: noGroup.length ? 'warn' : '', i: 3 })}</div>`;
  html += DB.groups.length ? `<div class="cgrid">${cards}</div>` : `<button type="button" class="empty-add" data-act="group-edit">${ic('plus')}<span>Utwórz pierwszą rotację</span></button>`;
  if (DB.groups.length) html += `<div class="card anim" style="--i:4"><div class="card-h"><h3>Kto w której rotacji</h3></div><p class="muted small">Przeciągnij pracownika do grupy (albo dotknij osobę, a potem grupę).</p>
    ${board('group', DB.groups.map(gr => { const s = rotStatus(gr, T); return { id: gr.id, title: gr.name, color: gr.color, sub: `${gr.weeksIn}/${gr.weeksOut} tyg. · teraz ${s === 'NO' ? 'NO' : 'PL'}`, edit: 'group-edit' }; }), true)}</div>`;
  html += `<div class="card anim" style="--i:5"><div class="card-h"><h3>Plan rotacji – kto gdzie</h3><select data-chg="rota-weeks" class="mini">${[8, 12, 16, 26].map(w => opt(w, w + ' tyg.', w === ST.rotaWeeks)).join('')}</select></div>${teamTimeline()}</div>`;
  return { title: 'Sterowanie rotacjami', sub: 'Tworzenie, edycja, przesuwanie cykli i przypisywanie ludzi – w jednym miejscu', html, action: `<button type="button" class="btn primary" data-act="group-edit">${ic('plus')}<span class="hide-s"> Nowa rotacja</span></button>` };
};
VIEWS.rota = () => {
  const T = isoLocal(); const g = groupById(ME.groupId); const st = rotStatus(g, T); const nc = nextChange(g, T);
  const personal = !can.manage() || !!g;
  let html = '';
  if (can.manage()) {
    html += `<div class="card maplink anim"><div class="row gap">${ic('swap')}<div class="grow"><b>Sterowanie rotacjami</b><div class="muted small">${DB.groups.length} ${DB.groups.length === 1 ? 'rotacja' : 'rotacji'} · tworzenie, przesuwanie cykli, przypisywanie ludzi</div></div><button type="button" class="btn sm primary" data-act="go" data-v="rotations">Otwórz</button></div></div>`;
  }
  if (personal) html += `<div class="card hero2 anim ${st === 'NO' ? 'no' : st === 'PL' ? 'pl' : ''}">
    <div class="h2-l"><div class="muted small">Twój status dziś</div><div class="h2-big">${st === 'NO' ? 'Jesteś w Norwegii' : st === 'PL' ? 'Jesteś w Polsce' : 'Brak rotacji'}</div>
    <div class="muted">${g ? `${esc(g.name)} · ${g.weeksIn} tyg. NO / ${g.weeksOut} tyg. PL` : 'Kierownik jeszcze nie przypisał Cię do rotacji.'}</div></div>
    ${nc ? `<div class="h2-r"><div class="ring" style="--p:${Math.max(4, 100 - nc.days / ((st === 'NO' ? g.weeksIn : g.weeksOut) * 7) * 100)}"><div><b class="count" data-to="${nc.days}">0</b><span>dni</span></div></div><div class="small muted center">${nc.to === 'PL' ? 'do wyjazdu do Polski' : 'do przyjazdu do Norwegii'}<br>${fmtDate(nc.date)}</div></div>` : ''}
  </div>`;
  if (g && personal) html += `<div class="card anim" style="--i:1"><div class="card-h"><h3>Mój kalendarz (${ST.rotaWeeks} tygodni)</h3></div>${myCalendar(g)}</div>`;
  if (can.foreman()) {
    html += `<div class="card anim" style="--i:3"><div class="card-h"><h3>Plan rotacji – kto gdzie</h3><select data-chg="rota-weeks" class="mini">${[8, 12, 16, 26].map(w => opt(w, w + ' tyg.', w === ST.rotaWeeks)).join('')}</select></div>${teamTimeline()}</div>`;
  }
  return { title: 'Grafik i rotacje', sub: 'Kiedy kto jest w Norwegii, a kiedy w Polsce', html, action: can.manage() ? `<button type="button" class="btn primary" data-act="group-edit">${ic('plus')}<span class="hide-s"> Nowa rotacja</span></button>` : '' };
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
  const ws = crew().sort((a, b) => (groupById(a.groupId)?.name || 'zz').localeCompare(groupById(b.groupId)?.name || 'zz') || a.name.localeCompare(b.name));
  return `<div class="tl-wrap"><table class="tl"><thead><tr><th>Pracownik</th>${weeks.map(w => `<th>t${isoWeek(w)}<br><span>${w.slice(8)}.${w.slice(5, 7)}</span></th>`).join('')}</tr></thead><tbody>
  ${ws.map(u => { const g = groupById(u.groupId); return `<tr><td><div class="tl-n">${avatar(u)}<div><b>${esc(u.name)}</b><div class="muted small">${g ? esc(g.name) : 'brak'}</div></div></div></td>${weeks.map(w => { const s = rotStatus(g, addDays(w, 3)); const s0 = rotStatus(g, w), s6 = rotStatus(g, addDays(w, 6)); return `<td><span class="tc ${s ? s.toLowerCase() : 'none'} ${s0 !== s6 ? 'chg' : ''}">${s || ''}</span></td>`; }).join('')}</tr>`; }).join('')}
  </tbody></table></div>`;
}

/* ----- TABLICA (domy / auta / grupy) ----- */
function board(kind, containers, editable) {
  const field = { house: 'houseId', car: 'carId', group: 'groupId' }[kind];
  const ws = crew();
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
  if (targetId && kind === 'house') { const h = houseById(targetId); const n = crew().filter(x => x.houseId === targetId).length; if (h.beds && n >= h.beds) { SELECTED = null; render(); return toast(`${h.name} jest pełny (${n}/${h.beds})`, 'err'); } }
  if (targetId && kind === 'car') { const c = carById(targetId); const n = crew().filter(x => x.carId === targetId).length; if (c.seats && n >= c.seats) { SELECTED = null; render(); return toast(`${c.name} – brak wolnych miejsc (${n}/${c.seats})`, 'err'); } }
  u[field] = targetId || '';
  LAST_ASSIGNED = u.id;
  const tName = targetId ? (kind === 'house' ? houseById(targetId)?.name : kind === 'car' ? carById(targetId)?.name : groupById(targetId)?.name) : '—';
  log(`${u.name} → ${{ house: 'dom', car: 'auto', group: 'rotacja' }[kind]}: ${tName}`);
  save(); SELECTED = null; render(); toast(`${u.name} → ${tName}`);
}

/* =========================================================
   MAPA – kafelki jak w GitHub Actions / mapa myśli
   ========================================================= */
const GV = {};   // widok mapy: {s, x, y}
const GOPT = { map: { filter: 'house', full: false } };
let LAST_ASSIGNED = null;
let SUPPRESS_CLICK_UNTIL = 0;
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
/* Jedna mapa: domy (z autami w środku), auta bez domu i pracownicy */
function mapHTML() {
  const ed = can.manage(), ws = crew(), o = GOPT.map;
  const houses = DB.houses, cars = DB.cars;
  const hIds = new Set(houses.map(h => h.id)), cIds = new Set(cars.map(c => c.id));
  const freeCars = cars.filter(c => !hIds.has(c.houseId));
  const beds = houses.reduce((s, h) => s + (+h.beds || 0), 0), seats = cars.reduce((s, c) => s + (+c.seats || 0), 0);
  const inHouse = ws.filter(u => hIds.has(u.houseId)).length, inCar = ws.filter(u => cIds.has(u.carId)).length;
  const status = (n, cap) => !n ? 'idle' : cap && n >= cap ? 'full' : 'ok';
  const where = u => [houseById(u.houseId)?.name || 'bez domu', carById(u.carId)?.name || 'bez auta'].join(' · ');
  const carBlock = c => {
    const cap = +c.seats || 0, mem = ws.filter(u => u.carId === c.id), stt = status(mem.length, cap), free = Math.max(0, cap - mem.length);
    return `<div class="gcar dz st-${stt} ${mem.some(u => u.id === ME.id) ? 'mine' : ''}" data-kind="car" ${ed ? `data-drop="${c.id}" data-act="drop"` : ''}>
      <div class="gcar-h">${ic('car')}<b>${esc(c.name)}</b><span class="plate sm">${esc(c.plate || '—')}</span><span class="grow"></span><span class="gn-c"><b>${mem.length}</b>/${cap || '–'}</span>${ed ? `<button type="button" class="ib sm gn-e" data-act="car-edit" data-id="${c.id}" aria-label="Edytuj auto">${ic('edit')}</button>` : ''}</div>
      <div class="gcar-ppl">${mem.map(u => personChip(u, 'car', { editable: ed })).join('')}${free ? `<span class="slot sm">${free} ${free === 1 ? 'wolne miejsce' : 'wolne'}</span>` : ''}</div>
    </div>`;
  };
  const houseNode = h => {
    const cap = +h.beds || 0, mem = ws.filter(u => u.houseId === h.id), stt = status(mem.length, cap), free = Math.max(0, cap - mem.length), hc = carsOfHouse(h.id);
    return `<div class="gn dz st-${stt} ${mem.some(u => u.id === ME.id) ? 'mine' : ''}" data-node="${h.id}" data-kind="house" ${ed ? `data-drop="${h.id}" data-act="drop"` : ''}>
      <div class="gn-h">
        <span class="gst">${stt === 'ok' ? ic('check') : stt === 'full' ? ic('warn') : ''}</span>
        <span class="gn-t">${esc(h.name)}</span>
        <span class="gn-c"><b>${mem.length}</b>/${cap || '–'}</span>
        ${ed ? `<button type="button" class="ib sm gn-e" data-act="house-edit" data-id="${h.id}" aria-label="Edytuj dom">${ic('edit')}</button>` : ''}
      </div>
      <div class="gn-sub">${ic('pin')}<span>${esc(h.address || 'brak adresu')}</span></div>
      ${cap ? `<div class="bar ${stt === 'full' ? 'full' : ''}"><i style="--w:${Math.min(100, mem.length / cap * 100)}%"></i></div>` : ''}
      <div class="gn-ppl">${mem.map(u => personChip(u, 'house', { editable: ed })).join('')}${[...Array(Math.min(free, 8))].map(() => '<span class="slot">wolne łóżko</span>').join('')}${free > 8 ? `<span class="slot">+${free - 8} wolnych</span>` : ''}</div>
      ${hc.length || ed ? `<div class="gn-cars">${hc.map(carBlock).join('')}${ed ? `<button type="button" class="carchip add" data-act="house-edit" data-id="${h.id}">${ic('plus')}${hc.length ? 'auto przy domu' : 'przypisz auto do domu'}</button>` : ''}</div>` : ''}
    </div>`;
  };
  const carNode = c => {
    const cap = +c.seats || 0, mem = ws.filter(u => u.carId === c.id), stt = status(mem.length, cap), free = Math.max(0, cap - mem.length);
    return `<div class="gn gn-car dz st-${stt} ${mem.some(u => u.id === ME.id) ? 'mine' : ''}" data-node="${c.id}" data-kind="car" ${ed ? `data-drop="${c.id}" data-act="drop"` : ''}>
      <div class="gn-h">
        <span class="gst">${stt === 'ok' ? ic('check') : stt === 'full' ? ic('warn') : ''}</span>
        <span class="gn-t">${esc(c.name)}</span>
        <span class="gn-c"><b>${mem.length}</b>/${cap || '–'}</span>
        ${ed ? `<button type="button" class="ib sm gn-e" data-act="car-edit" data-id="${c.id}" aria-label="Edytuj auto">${ic('edit')}</button>` : ''}
      </div>
      <div class="gn-sub">${ic('car')}<span>${esc(c.plate || '—')} · auto bez domu</span></div>
      ${cap ? `<div class="bar ${stt === 'full' ? 'full' : ''}"><i style="--w:${Math.min(100, mem.length / cap * 100)}%"></i></div>` : ''}
      <div class="gn-ppl">${mem.map(u => personChip(u, 'car', { editable: ed })).join('')}${[...Array(Math.min(free, 8))].map(() => '<span class="slot">wolne miejsce</span>').join('')}</div>
    </div>`;
  };
  const pool = ws.filter(u => o.filter === 'all' || (o.filter === 'car' ? !cIds.has(u.carId) : !hIds.has(u.houseId)));
  const mode = layoutOf('map').mode || '';
  const tab = (f, l, n) => `<button type="button" class="${o.filter === f ? 'on' : ''}" data-act="g-filter" data-kind="map" data-f="${f}">${l}${n !== undefined ? ` <b>${n}</b>` : ''}</button>`;
  return `<div class="gwrap uni ${o.full ? 'gfull' : ''} ${ed ? 'ed' : ''}">
    ${ed ? `<aside class="gpanel dz" data-drop="" data-kind="any" data-act="drop">
      <div class="gp-h"><b>Pracownicy</b><span class="pill">${ws.length} os.</span></div>
      <input class="gp-search" type="search" placeholder="Szukaj pracownika…" data-gsearch>
      <div class="gp-tabs">${tab('house', 'Bez domu', ws.length - inHouse)}${tab('car', 'Bez auta', ws.length - inCar)}${tab('all', 'Wszyscy')}</div>
      <div class="gp-list">${pool.map(u => personChip(u, 'any', { editable: true, where: o.filter === 'all' ? where(u) : '' })).join('') || `<div class="muted small gp-empty">${o.filter === 'car' ? 'Każdy ma auto ✓' : 'Każdy ma dom ✓'}</div>`}</div>
      <div class="gp-hint muted small">Upuść osobę na <b>dom</b>, żeby tam zamieszkała, albo na <b>auto</b>, żeby nim jeździła (na telefonie: przytrzymaj i przeciągnij albo dotknij osobę, a potem dom/auto). Upuść tutaj, aby wypisać.</div>
    </aside>` : ''}
    <div class="gcanvas" data-gkind="map">
      <div class="gworld">
        <svg class="gedges" width="1" height="1" aria-hidden="true"></svg>
        <div class="gn hub" data-node="__hub"><div class="gn-h">${LOGO ? `<img class="hub-logo" src="${LOGO}" alt="${esc(COMPANY)}" draggable="false">` : `<span class="logo sm">S</span><span class="gn-t">${esc(COMPANY)}</span>`}</div>
          <div class="hub-st"><span>${ic('house')}<b>${inHouse}</b>/${beds} łóżek</span><span>${ic('car')}<b>${inCar}</b>/${seats} miejsc</span></div>
          <div class="bar"><i style="--w:${beds ? Math.min(100, inHouse / beds * 100) : 0}%"></i></div>
          <div class="gn-sub"><span>${houses.length} domów · ${cars.length} aut · ${ws.length} pracowników</span></div></div>
        ${houses.map(houseNode).join('')}${freeCars.map(carNode).join('')}
      </div>
      ${!houses.length && !cars.length ? `<div class="g-empty">${ic('house')}<p>Brak domów i aut.${ed ? ' Dodaj pierwszy dom przyciskiem u góry.' : ''}</p></div>` : ''}
      ${ed ? `<div class="gctl-l"><select class="gsel" data-chg="g-layout" data-kind="map" aria-label="Układ">${opt('', 'Układ…', !mode)}${opt('tree', 'Drzewo (GitHub)', false)}${opt('mind', 'Mapa myśli', false)}${opt('list', 'Lista pionowa', false)}</select></div>` : ''}
      <div class="gctl">
        <span class="gzoom">100%</span>
        <button type="button" class="gbtn" data-act="g-fit" data-kind="map" title="Dopasuj do ekranu">${ic('target')}</button>
        <button type="button" class="gbtn" data-act="g-full" data-kind="map" title="${o.full ? 'Zamknij pełny ekran' : 'Pełny ekran'}">${ic(o.full ? 'shrink' : 'expand')}</button>
        <div class="gseg"><button type="button" class="gbtn" data-act="g-zoom" data-kind="map" data-d="-1" aria-label="Pomniejsz">${ic('minus')}</button><button type="button" class="gbtn" data-act="g-zoom" data-kind="map" data-d="1" aria-label="Powiększ">${ic('plus')}</button></div>
      </div>
    </div>
  </div>`;
}
/* gdzie upuszczona osoba trafia: strefa decyduje (dom → houseId, auto → carId, lista → wypisz) */
function dropKindOk(z, dragKind) {
  if (!z || z.dataset.drop === undefined) return false;
  if (z.closest('.gwrap.uni')) return z.dataset.kind !== 'any' || dragKind !== 'any';
  return z.dataset.kind === dragKind;
}
function dropTo(z, dragKind, userId) {
  if (z.closest('.gwrap.uni')) {
    if (z.dataset.kind === 'any') { if (dragKind === 'house' || dragKind === 'car') assign(dragKind, userId, ''); return; }
    return assign(z.dataset.kind, userId, z.dataset.drop);
  }
  assign(dragKind, userId, z.dataset.drop);
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
    const hh0 = hub.querySelector('.gn-h'); const hpy = hh0 ? hh0.offsetTop + hh0.offsetHeight / 2 : 25;
    P.__hub = { x: 0, y: Math.round(25 - hpy) };
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
  const hh0 = hub.querySelector('.gn-h'); const HPY = hh0 ? hh0.offsetTop + hh0.offsetHeight / 2 : PY;
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
      const x1 = right ? hp.x + hw : hp.x, y1 = hp.y + HPY; x2 = right ? p.x : p.x + w;
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
  // automatyczne układy przeliczamy zawsze (kafelki rosną, gdy dochodzą ludzie / auta) – ręczny układ zostaje
  if (!L.pos.__hub || (L.mode && L.mode !== 'custom')) graphAutoLayout(cv, L.mode || (cv.clientWidth < 640 ? 'list' : 'tree'));
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
    if (!e.isPrimary) return; // drugi palec ignorowany – brak zoomu dwoma palcami
    pts.clear(); pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const node = e.target.closest('.gn'); const handle = e.target.closest('.gn-h');
    if (node && (handle || node.classList.contains('hub')) && ed) st = { mode: 'node', node, id: node.dataset.node, x0: e.clientX, y0: e.clientY, orig: { ...L.pos[node.dataset.node] }, moved: false, pid: e.pointerId };
    else st = { mode: 'pan', x0: e.clientX, y0: e.clientY, orig: { ...GV[kind] }, moved: false, pid: e.pointerId };
  });
  cv.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId) || !st) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const v = GV[kind];
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
    st = null;
  };
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  cv.addEventListener('wheel', e => {
    if (e.ctrlKey || e.metaKey) { e.preventDefault(); return; } // gest szczypania na touchpadzie – wyłączony
    if (GOPT[kind].full) { e.preventDefault(); const v = GV[kind]; v.x -= e.deltaX; v.y -= e.deltaY; applyView(cv); }
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
  const ok = dropKindOk(z, CD.kind) ? z : null;
  if (CD.over !== ok) { CD.over?.classList.remove('over'); ok?.classList.add('over'); CD.over = ok; }
}
function chipDragEnd(drop) {
  const d = CD; CD = null; clearTimeout(d.timer);
  if (!d.active) return;
  d.ghost.remove(); d.chip.classList.remove('dragging'); d.over?.classList.remove('over');
  document.body.classList.remove('chipdrag'); delete document.body.dataset.dragKind;
  SUPPRESS_CLICK_UNTIL = Date.now() + 400;
  if (drop && d.over) dropTo(d.over, d.kind, d.id);
}

/* ----- DOMY ----- */
VIEWS.houses = () => {
  const ed = can.manage();
  const ws = crew(); const beds = DB.houses.reduce((s, h) => s + (+h.beds || 0), 0); const occ = ws.filter(u => houseById(u.houseId)).length;
  const seats = DB.cars.reduce((s, c) => s + (+c.seats || 0), 0), inCar = ws.filter(u => carById(u.carId)).length;
  const html = `<div class="stats">${stat('Domy', DB.houses.length, { icon: 'house' })}${stat('Wolne łóżka', Math.max(0, beds - occ), { icon: 'check', tone: 'green', i: 1 })}${stat('Auta', DB.cars.length, { icon: 'car', tone: 'blue', i: 2 })}${stat('Wolne miejsca w autach', Math.max(0, seats - inCar), { icon: 'users', tone: 'blue', i: 3 })}</div>
    ${mapHTML()}`;
  return { title: 'Mapa', sub: ed ? 'Domy, auta i ludzie na jednej mapie – przeciągaj ludzi na dom albo na auto' : 'Kto gdzie mieszka i czym jeździ', html, action: ed ? `<button type="button" class="btn ghost" data-act="car-edit" aria-label="Dodaj auto">${ic('car')}<span class="hide-s"> + Auto</span></button><button type="button" class="btn primary" data-act="house-edit" aria-label="Dodaj dom">${ic('house')}<span class="hide-s"> + Dom</span></button>` : '' };
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
  html += `<div class="card anim maplink"><div class="row gap">${ic('house')}<div class="grow"><b>Przypisywanie ludzi do aut jest teraz na wspólnej mapie</b><div class="muted small">Domy, auta i pracownicy w jednym miejscu.</div></div><button type="button" class="btn sm primary" data-act="go" data-v="houses">Otwórz mapę</button></div></div>`;
  html += `<h2 class="sec-t">Szczegóły aut</h2><div class="cgrid">${DB.cars.map((c, i) => {
    const s = carStats(c); const users = crew().filter(u => u.carId === c.id);
    return `<div class="card car anim ${ME.carId === c.id ? 'mine' : ''}" style="--i:${i}">
      <div class="card-h"><div><h3>${esc(c.name)}</h3><span class="plate">${esc(c.plate || '—')}</span></div>${ed ? `<button type="button" class="ib" data-act="car-edit" data-id="${c.id}">${ic('edit')}</button>` : ''}</div>
      <div class="kv"><div><span>Dom</span><b>${esc(houseById(c.houseId)?.name || '—')}</b></div><div><span>Przebieg</span><b>${(+c.odometer || 0).toLocaleString('pl')} km</b></div><div><span>Spalanie</span><b>${s.cons ? fmtNum(s.cons) + ' l/100' : '—'}</b></div>
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
    const people = crew().filter(u => u.groupId === t.groupId || (t.userIds || []).includes(u.id));
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
  const html = `<div class="msgs">${list.map((m, i) => { const mine = m.fromId === ME.id; const r = `<div class="msg anim ${mine ? 'mine' : ''} ${m._new ? 'new' : ''}" style="--i:${Math.min(i, 8)}">${mine ? '' : avatar(userById(m.fromId))}<div class="bubble"><div class="m-meta"><b>${mine ? 'Ty' : esc(nameOf(m.fromId))}</b> → ${esc(to(m))} · ${relTime(m.createdAt)}</div>${msgTextHTML(m)}${!mine ? `${can.foreman() ? `<button type="button" class="link small" data-act="msg-reply" data-id="${m.fromId}">Odpowiedz</button>` : ''}` : `<span class="muted small">przeczytało: ${(m.readBy || []).length}</span>`}</div></div>`; delete m._new; return r; }).join('') || empty('Brak wiadomości', 'chat')}</div>`;
  return { title: 'Wiadomości', sub: can.foreman() ? 'Do osoby, rotacji lub wszystkich' : 'Wiadomości od kierownictwa', html, action: can.foreman() ? `<button type="button" class="btn primary" data-act="msg-new">${ic('send')}<span class="hide-s"> Napisz</span></button>` : '' };
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
  const pendingU = DB.users.filter(u => u.pending), resets = DB.resetRequests.filter(r => r.status === 'open' && userById(r.userId));
  let top = '';
  if (pendingU.length) top += `<div class="card anim accent-card"><div class="card-h"><h3>Nowe konta – czekają na akceptację</h3><span class="pill warn">${pendingU.length}</span></div>
    ${pendingU.map(u => `<div class="li">${avatar(u)}<div class="grow"><b>${esc(u.name)}</b><div class="muted small">@${esc(u.login)}${u.phone ? ' · ' + esc(u.phone) : ''} · ${relTime(u.createdAt)}</div></div>
      <select class="mini" id="role-${u.id}">${Object.keys(ROLES).filter(r => rank() >= 4 || ROLES[r].rank < 3).map(r => opt(r, ROLES[r].label, r === 'pracownik')).join('')}</select>
      <button type="button" class="btn sm primary" data-act="approve-user" data-id="${u.id}">${ic('check')}<span class="hide-s"> Akceptuj</span></button><button type="button" class="ib sm" data-act="reject-user" data-id="${u.id}" aria-label="Odrzuć">${ic('x')}</button></div>`).join('')}</div>`;
  if (resets.length) top += `<div class="card anim accent-card"><div class="card-h"><h3>Prośby o reset hasła</h3><span class="pill warn">${resets.length}</span></div>
    ${resets.map(r => { const u = userById(r.userId); return `<div class="li">${avatar(u)}<div class="grow"><b>${esc(u.name)}</b><div class="muted small">@${esc(u.login)} · ${relTime(r.at)}</div></div><button type="button" class="btn sm primary" data-act="admin-set-pass" data-id="${u.id}" data-req="${r.id}">${ic('key')} Ustaw hasło</button><button type="button" class="ib sm" data-act="reset-dismiss" data-id="${r.id}" aria-label="Odrzuć">${ic('x')}</button></div>`; }).join('')}</div>`;
  const html = top + `<div class="ugrid">${DB.users.filter(u => !u.pending).sort((a, b) => (ROLES[b.role].rank - ROLES[a.role].rank) || a.name.localeCompare(b.name)).map((u, i) => {
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
/* =========================================================
   JĘZYKI (PL / NO / EN) + automatyczne tłumaczenie wiadomości
   ========================================================= */
const LANGS = { pl: { label: 'Polski', flag: '🇵🇱', api: 'pl-PL' }, no: { label: 'Norsk', flag: '🇳🇴', api: 'nb-NO' }, en: { label: 'English', flag: '🇬🇧', api: 'en-GB' } };
const langOf = (u = ME) => LANGS[u?.lang] ? u.lang : 'pl';
// nawigacja w języku użytkownika (reszta interfejsu na razie po polsku)
const NAV_T = {
  no: { dash: 'Oversikt', hours: 'Arbeidstimer', rota: 'Turnus og plan', rotations: 'Styr turnuser', pay: 'Lønn', houses: 'Kart', cars: 'Biler', cards: 'Drivstoffkort', tickets: 'Billetter og reise', docs: 'Dokumenter', msgs: 'Meldinger', reports: 'Meldinger til ledelsen', projects: 'Prosjekter', people: 'Ansatte', backup: 'Sikkerhetskopi', admin: 'Adminpanel', more: 'Mer' },
  en: { dash: 'Dashboard', hours: 'Work hours', rota: 'Schedule & rotations', rotations: 'Manage rotations', pay: 'Payroll', houses: 'Map', cars: 'Cars', cards: 'Fuel cards', tickets: 'Tickets & travel', docs: 'Documents', msgs: 'Messages', reports: 'Reports', projects: 'Projects', people: 'Employees', backup: 'Backups', admin: 'Admin panel', more: 'More' },
};
const navLabel = n => NAV_T[langOf()]?.[n.id] || n.label;
const TR_UI = {
  pl: { tr: 'przetłumaczono z', orig: 'Pokaż oryginał', back: 'Pokaż tłumaczenie', wait: 'tłumaczę…', fail: 'Tłumaczenie niedostępne (brak internetu lub limit) – pokazuję oryginał' },
  no: { tr: 'oversatt fra', orig: 'Vis original', back: 'Vis oversettelse', wait: 'oversetter…', fail: 'Oversettelse utilgjengelig – viser originalen' },
  en: { tr: 'translated from', orig: 'Show original', back: 'Show translation', wait: 'translating…', fail: 'Translation unavailable – showing original' },
};
const TR_PENDING = new Set();
// darmowe API MyMemory (działa z przeglądarki); tekst dzielony na kawałki ≤ 450 bajtów
async function translateText(text, from, to) {
  const parts = []; let cur = '';
  for (const s of String(text).split(/(?<=[.!?\n])\s*/)) {
    if (new TextEncoder().encode(cur + ' ' + s).length > 450 && cur) { parts.push(cur); cur = s; } else cur = cur ? cur + ' ' + s : s;
  }
  if (cur) parts.push(cur);
  const out = [];
  for (const q of parts) {
    const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${LANGS[from].api}|${LANGS[to].api}`);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json(); const t = j?.responseData?.translatedText;
    if (!t || j.responseStatus >= 400 || /MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(t)) throw new Error(t || 'brak tłumaczenia');
    out.push(t);
  }
  const ta = document.createElement('textarea'); ta.innerHTML = out.join(' '); return ta.value;
}
function msgTextHTML(m) {
  const to = langOf(), from = LANGS[m.lang] ? m.lang : 'pl', T = TR_UI[to];
  if (m.fromId === ME.id || from === to) return `<div class="m-text">${esc(m.text).replace(/\n/g, '<br>')}</div>`;
  const tr = m.tr?.[to], showOrig = SHOW_ORIG.has(m.id);
  if (!tr) {
    if (m.trFail?.[to]) return `<div class="m-text">${esc(m.text).replace(/\n/g, '<br>')}</div><div class="m-tr muted small">${ic('warn')} ${T.fail}</div>`;
    queueTranslate(m, from, to);
    return `<div class="m-text">${esc(m.text).replace(/\n/g, '<br>')}</div><div class="m-tr muted small">${LANGS[from].flag} → ${LANGS[to].flag} ${T.wait}</div>`;
  }
  return `<div class="m-text">${esc(showOrig ? m.text : tr).replace(/\n/g, '<br>')}</div><div class="m-tr muted small">${LANGS[from].flag} ${T.tr} ${LANGS[from].label} · <button type="button" class="link small" data-act="msg-orig" data-id="${m.id}">${showOrig ? T.back : T.orig}</button></div>`;
}
const SHOW_ORIG = new Set();
function queueTranslate(m, from, to) {
  const k = m.id + to; if (TR_PENDING.has(k)) return; TR_PENDING.add(k);
  translateText(m.text, from, to).then(t => { m.tr = m.tr || {}; m.tr[to] = t; }).catch(() => { m.trFail = m.trFail || {}; m.trFail[to] = Date.now(); })
    .finally(() => { TR_PENDING.delete(k); save(); if (VIEW === 'msgs' || VIEW === 'dash') render(); });
}

/* =========================================================
   KOPIE ZAPASOWE – cały program, wybrany użytkownik, wybrane części, własne konto
   ========================================================= */
const BK_PARTS = {
  hours: { label: 'Godziny pracy + projekty', keys: ['hours', 'projects'] },
  housing: { label: 'Domy, auta, tankowania', keys: ['houses', 'cars', 'refuels'] },
  rot: { label: 'Rotacje', keys: ['groups'] },
  tickets: { label: 'Bilety', keys: ['tickets'] },
  docs: { label: 'Dokumenty', keys: ['docs'] },
  msgs: { label: 'Wiadomości', keys: ['messages'] },
  cards: { label: 'Karty paliwowe', keys: ['fuelCards', 'cardTransfers'] },
  reports: { label: 'Zgłoszenia', keys: ['reports'] },
  pay: { label: 'Wypłaty i stawki', keys: [], pay: true },
};
const fileIdsOf = db => [...(db.tickets || []).flatMap(t => t.fileIds || []), ...(db.docs || []).map(d => d.fileId), ...(db.refuels || []).map(r => r.fileId), ...(db.reports || []).flatMap(r => r.fileIds || [])].filter(Boolean);
// kierownik/księgowa/pracownik nie dostaje w kopii autora anonimowych zgłoszeń, haseł ani kodów odzyskiwania innych osób
function sanitize(db, opts = {}) {
  const d = JSON.parse(JSON.stringify(db));
  if (!can.admin()) {
    (d.reports || []).forEach(r => { if (r.anon) r.fromId = ''; });
    (d.users || []).forEach(u => { if (u.id !== ME.id || opts.dropOwnSecrets) { delete u.pass; delete u.recovery; } });
  }
  if (!can.pay() && !opts.keepPay) { delete d.pay; (d.users || []).forEach(u => { if (u.pay) delete u.pay.note; }); }
  return d;
}
async function downloadBackup(scope, db, label) {
  const ids = new Set(fileIdsOf(db));
  const files = (await FS.all().catch(() => [])).filter(f => scope === 'all' || ids.has(f.id));
  const enc = await Promise.all(files.map(f => new Promise(res => { const r = new FileReader(); r.onload = () => res({ id: f.id, name: f.name, type: f.type, at: f.at, data: r.result }); r.readAsDataURL(f.blob); })));
  const blob = new Blob([JSON.stringify({ app: 'CrewControl', version: VERSION, scope, label, by: ME.id, at: new Date().toISOString(), db, files: enc })], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `crewcontrol-${scope}-${label.toLowerCase().replace(/[^a-z0-9ąćęłńóśźż]+/gi, '-')}-${isoLocal()}.json`; document.body.appendChild(a); a.click(); a.remove();
  DB.meta.lastBackup = Date.now(); log(`Kopia zapasowa: ${label}`); save(); toast('Kopia pobrana: ' + label);
}
function userSlice(u, own = false) {
  const mine = x => x.userId === u.id;
  const d = {
    users: [u],
    hours: DB.hours.filter(mine),
    docs: DB.docs.filter(mine),
    tickets: DB.tickets.filter(t => t.groupId === u.groupId || (t.userIds || []).includes(u.id)),
    messages: DB.messages.filter(m => m.fromId === u.id || (m.toType === 'user' && m.toId === u.id) || m.toType === 'all' || (m.toType === 'group' && m.toId === u.groupId)),
    reports: DB.reports.filter(r => r.fromId === u.id && (own || can.admin() || !r.anon)),
    refuels: DB.refuels.filter(r => r.userId === u.id),
    cardTransfers: DB.cardTransfers.filter(t => t.fromId === u.id || t.toId === u.id),
    projects: DB.projects, groups: DB.groups.filter(g => g.id === u.groupId),
    houses: DB.houses.filter(h => h.id === u.houseId), cars: DB.cars.filter(c => c.id === u.carId),
  };
  return sanitize(d, { dropOwnSecrets: true, keepPay: own });
}
VIEWS.backup = () => {
  const ed = can.manage(), parts = Object.entries(BK_PARTS).filter(([k]) => k !== 'pay' || can.pay());
  let html = `<div class="grid2">
    <div class="card anim"><div class="card-h"><h3>${ic('shield')} Cały program</h3></div><p class="muted small">Wszystkie dane i pliki (bilety, umowy, paragony, zrzuty ekranu). Tą kopią można przenieść aplikację na inne urządzenie.${!can.admin() ? ' Autorzy anonimowych zgłoszeń i hasła innych osób nie są zapisywani.' : ''}</p>
      <button type="button" class="btn primary block" data-act="bk-all">${ic('dl')} Pobierz kopię całości</button>
      <div class="muted small" style="margin-top:10px">Ostatnia kopia: ${DB.meta.lastBackup ? fmtTs(DB.meta.lastBackup) : 'nigdy'}</div></div>
    <div class="card anim" style="--i:1"><div class="card-h"><h3>${ic('users')} Wybrany użytkownik</h3></div><p class="muted small">Konto, godziny, dokumenty, bilety, wiadomości i zgłoszenia jednej osoby.</p>
      <label>Użytkownik<select id="bkUser">${activeUsers().map(u => opt(u.id, `${u.name} (${ROLES[u.role].label})`)).join('')}</select></label>
      <button type="button" class="btn primary block" data-act="bk-user">${ic('dl')} Pobierz kopię użytkownika</button></div>
  </div>
  <div class="card anim" style="--i:2"><div class="card-h"><h3>${ic('folder')} Wybrane części</h3></div>
    <div class="bk-parts">${parts.map(([k, p]) => `<label class="check"><input type="checkbox" name="bkpart" value="${k}" ${k === 'hours' ? 'checked' : ''}> ${p.label}</label>`).join('')}</div>
    <button type="button" class="btn primary" data-act="bk-parts">${ic('dl')} Pobierz wybrane</button></div>
  <div class="card anim" style="--i:3"><div class="card-h"><h3>${ic('up')} Przywracanie</h3></div>
    <p class="muted small">Kopia <b>całości</b> zastępuje obecne dane. Kopia <b>użytkownika</b> lub <b>wybranych części</b> jest <b>dołączana</b> – brakujące wpisy wracają, istniejące są aktualizowane, nic nie jest kasowane.</p>
    <label class="btn ghost block filebtn">${ic('up')} Wybierz plik kopii<input type="file" accept=".json,application/json" data-chg="restore" hidden></label>
    ${PREVIEW && can.admin() ? `<button type="button" class="btn danger block" data-act="reset-demo" style="margin-top:8px">${ic('trash')} Zresetuj dane demo</button>` : ''}</div>`;
  return { title: 'Kopie zapasowe', sub: ed ? 'Cały program, wybrany użytkownik albo wybrane części' : '', html };
};
// dołączanie kopii częściowej: upsert po id; istniejących kont nie nadpisujemy (hasła zostają)
async function mergeBackup(j) {
  const d = j.db; let n = 0;
  for (const k of Object.keys(emptyDB())) {
    if (!Array.isArray(d[k]) || !Array.isArray(DB[k])) continue;
    for (const x of d[k]) {
      if (!x || !x.id) continue;
      const i = DB[k].findIndex(y => y.id === x.id);
      if (i < 0) { DB[k].push(x); n++; }
      else if (k !== 'users') { DB[k][i] = { ...DB[k][i], ...x }; n++; }
    }
  }
  if (d.pay && can.pay()) { const P = payCfg(); Object.assign(P.groups, d.pay.groups || {}); Object.assign(P.projects, d.pay.projects || {}); }
  for (const x of j.files || []) { if (await FS.get(x.id).catch(() => null)) continue; const blob = await (await fetch(x.data)).blob(); await FS.put({ id: x.id, name: x.name, type: x.type, at: x.at, blob, size: blob.size }); }
  return n;
}

/* =========================================================
   WYPŁATY – stawki (domyślna → rotacja → projekt → indywidualna) i rozliczenia
   ========================================================= */
function payCfg() {
  const P = DB.pay = DB.pay || {};
  P.cur = P.cur || 'NOK'; P.base = +P.base || 0; P.groups = P.groups || {}; P.projects = P.projects || {};
  if (P.tax === undefined) P.tax = 35; if (P.otPct === undefined) P.otPct = 40; P.otAfter = +P.otAfter || 0; P.paid = P.paid || {};
  return P;
}
const userPay = u => (u.pay = u.pay || {});
const money = n => `${Math.round(n || 0).toLocaleString('pl')} ${payCfg().cur}`;
const SRC = { ind: 'indywidualna', proj: 'projekt', rot: 'rotacja', base: 'domyślna', none: 'brak stawki' };
// kolejność: indywidualna stawka pracownika wygrywa zawsze; potem stawka projektu; potem rotacji; na końcu domyślna
function rateFor(u, projectId) {
  const P = payCfg(), up = userPay(u);
  if (+up.rate > 0) return { rate: +up.rate, src: 'ind' };
  if (projectId && +P.projects[projectId] > 0) return { rate: +P.projects[projectId], src: 'proj' };
  if (u.groupId && +P.groups[u.groupId] > 0) return { rate: +P.groups[u.groupId], src: 'rot' };
  if (P.base > 0) return { rate: P.base, src: 'base' };
  return { rate: 0, src: 'none' };
}
function payFor(u, M, extra = null) {
  const P = payCfg(), up = userPay(u);
  const list = DB.hours.filter(h => h.userId === u.id && h.date.startsWith(M));
  const lines = {}; let hours = 0, ot = 0, otAmt = 0;
  const add = (pid, h) => { if (h <= 0) return; const r = rateFor(u, pid); const k = pid || '_'; const L = lines[k] = lines[k] || { projectId: pid, hours: 0, rate: r.rate, src: r.src, amount: 0 }; L.hours += h; L.amount += h * r.rate; };
  list.forEach(x => {
    const net = entryH(x); hours += net;
    const sp = (x.splits || []).filter(s => s.hours > 0); let used = 0;
    sp.forEach(s => { add(s.projectId, s.hours); used += s.hours; });
    if (net - used > 0.01) add('', net - used);
    if (P.otAfter > 0 && net > P.otAfter) { const o = net - P.otAfter; ot += o; const avg = sp.length ? sp.reduce((a, s) => a + s.hours * rateFor(u, s.projectId).rate, 0) / Math.max(used, 0.01) : rateFor(u, '').rate; otAmt += o * avg * (P.otPct / 100); }
  });
  if (extra && extra.hours > 0) { add(extra.projectId || '', extra.hours); hours += extra.hours; }
  const base = Object.values(lines).reduce((a, l) => a + l.amount, 0);
  const bonus = +up.bonus || 0, deduct = +up.deduct || 0;
  const gross = base + otAmt + bonus;
  const taxPct = up.tax !== undefined && up.tax !== '' ? +up.tax : +P.tax;
  const tax = gross * taxPct / 100;
  return { lines: Object.values(lines).sort((a, b) => b.amount - a.amount), hours, days: new Set(list.map(x => x.date)).size, ot, otAmt, bonus, deduct, gross, taxPct, tax, net: gross - tax - deduct, entries: list };
}
function payBreakdownHTML(u, p, own = false) {
  return `<div class="paytab">
    ${p.lines.map(l => `<div class="pl"><span class="grow">${esc(l.projectId ? projById(l.projectId)?.name || '?' : 'Bez projektu')}<span class="muted small"> · ${fmtH(l.hours)} × ${fmtNum(l.rate)} (${SRC[l.src]})</span></span><b>${money(l.amount)}</b></div>`).join('') || '<div class="muted small">Brak godzin w tym miesiącu</div>'}
    ${p.otAmt ? `<div class="pl"><span class="grow">Nadgodziny<span class="muted small"> · ${fmtH(p.ot)} · +${payCfg().otPct}%</span></span><b>${money(p.otAmt)}</b></div>` : ''}
    ${p.bonus ? `<div class="pl"><span class="grow">Dodatek</span><b>${money(p.bonus)}</b></div>` : ''}
    <div class="pl sum"><span class="grow">Brutto</span><b>${money(p.gross)}</b></div>
    <div class="pl neg"><span class="grow">Podatek (ok. ${fmtNum(p.taxPct)}%)</span><b>− ${money(p.tax)}</b></div>
    ${p.deduct ? `<div class="pl neg"><span class="grow">Potrącenia${userPay(u).deductNote ? `<span class="muted small"> · ${esc(userPay(u).deductNote)}</span>` : ''}</span><b>− ${money(p.deduct)}</b></div>` : ''}
    <div class="pl net"><span class="grow">${own ? 'Na rękę (szacunkowo)' : 'Netto (szacunkowo)'}</span><b>${money(p.net)}</b></div>
  </div>`;
}
// karta „Moja wypłata” w zakładce Godziny → Moje
function myPayCard(M) {
  const p = payFor(ME, M), r = rateFor(ME, '');
  const projs = DB.projects.filter(x => x.active !== false);
  return `<div class="card anim mypay" style="--i:2"><div class="card-h"><h3>${ic('coin')} Moja wypłata – ${fmtMonth(M)}</h3><span class="pill">szacunkowo</span></div>
    ${r.src === 'none' && !p.lines.some(l => l.rate) ? '<p class="muted small">Księgowa nie ustawiła jeszcze Twojej stawki – kwoty pojawią się, gdy ją ustawi.</p>' : ''}
    <div class="paybig"><span class="muted small">Na rękę ok.</span><b data-paynet>${money(p.net)}</b><span class="muted small" data-paygross>brutto ${money(p.gross)} · ${fmtH(p.hours)}</span></div>
    <div data-paybd>${payBreakdownHTML(ME, p, true)}</div>
    <div class="paycalc"><div class="lbl">Policz z planowanymi godzinami</div>
      <div class="g2"><label>Jeszcze godzin w tym miesiącu<input type="number" min="0" step="0.5" inputmode="decimal" data-paycalc="h" placeholder="np. 40"></label>
      <label>Projekt<select data-paycalc="p"><option value="">— bez projektu —</option>${projs.map(x => opt(x.id, x.name)).join('')}</select></label></div></div>
    <p class="muted small">To przybliżenie: godziny × stawki ustawione przez księgową, minus szacowany podatek i potrącenia. Ostateczna kwota jest na pasku wypłaty.</p>
  </div>`;
}
function payCalcUpdate(el) {
  const c = el.closest('.mypay'); if (!c) return;
  const h = parseFloat(String(c.querySelector('[data-paycalc=h]').value).replace(',', '.')) || 0, pid = c.querySelector('[data-paycalc=p]').value;
  const p = payFor(ME, ST.month, { hours: h, projectId: pid });
  c.querySelector('[data-paynet]').textContent = money(p.net);
  c.querySelector('[data-paygross]').textContent = `brutto ${money(p.gross)} · ${fmtH(p.hours)}${h ? ' (z planowanymi)' : ''}`;
  c.querySelector('[data-paybd]').innerHTML = payBreakdownHTML(ME, p, true);
}
VIEWS.pay = () => {
  const P = payCfg(), M = ST.month, tab = ST.payTab || 'run';
  let html = `<div class="tabs"><button type="button" class="${tab === 'run' ? 'on' : ''}" data-act="pay-tab" data-k="run">Rozliczenie</button><button type="button" class="${tab === 'rates' ? 'on' : ''}" data-act="pay-tab" data-k="rates">Stawki</button><span class="grow"></span>${tab === 'run' ? monthPicker() : ''}</div>`;
  if (tab === 'run') {
    const paid = P.paid[M] || {};
    const rows = crew().map(u => ({ u, p: payFor(u, M) })).sort((a, b) => b.p.gross - a.p.gross);
    const T = rows.reduce((a, r) => ({ h: a.h + r.p.hours, g: a.g + r.p.gross, n: a.n + r.p.net }), { h: 0, g: 0, n: 0 });
    const noRate = rows.filter(r => r.p.hours && r.p.lines.some(l => !l.rate)).length;
    html += `<div class="stats">${stat('Godziny – ' + fmtMonth(M), fmtH(T.h), { icon: 'clock' })}${stat('Brutto razem', money(T.g), { icon: 'coin', tone: 'blue', i: 1 })}${stat('Netto (szac.)', money(T.n), { icon: 'check', tone: 'green', i: 2 })}${stat('Wypłacone', `${rows.filter(r => paid[r.u.id]).length}/${rows.filter(r => r.p.hours).length}`, { icon: 'card', i: 3 })}</div>`;
    if (noRate) html += `<div class="alert anim">${ic('warn')}<div class="grow"><b>${noRate}</b> ${noRate === 1 ? 'osoba ma' : 'osób ma'} godziny bez stawki – ustaw stawkę domyślną, rotacji, projektu albo indywidualną.</div><button type="button" class="btn primary sm" data-act="pay-tab" data-k="rates">Stawki</button></div>`;
    html += `<div class="row wrap gap"><button type="button" class="btn ghost" data-act="pay-export">${ic('dl')} Eksport CSV (${fmtMonth(M)})</button></div>
    <div class="card anim"><div class="tl-wrap"><table class="paytbl"><thead><tr><th>Pracownik</th><th>Rotacja</th><th>Godziny</th><th>Stawka</th><th>Brutto</th><th>Netto (szac.)</th><th>Wypłacone</th><th></th></tr></thead><tbody>
    ${rows.map(({ u, p }) => { const rs = [...new Set(p.lines.map(l => `${fmtNum(l.rate)} (${SRC[l.src]})`))]; return `<tr class="${paid[u.id] ? 'paid' : ''}">
      <td><button type="button" class="linkrow" data-act="pay-detail" data-id="${u.id}">${avatar(u)}<b>${esc(u.name)}</b></button></td>
      <td>${esc(groupById(u.groupId)?.name || '—')}</td><td>${fmtH(p.hours)}${p.ot ? `<div class="muted small">nadg. ${fmtH(p.ot)}</div>` : ''}</td>
      <td class="small">${rs.length ? rs.map(esc).join('<br>') : `<span class="muted">${fmtNum(rateFor(u, '').rate)} (${SRC[rateFor(u, '').src]})</span>`}</td>
      <td><b>${money(p.gross)}</b></td><td>${money(p.net)}</td>
      <td><label class="paidchk"><input type="checkbox" data-chg="pay-paid" data-id="${u.id}" ${paid[u.id] ? 'checked' : ''} ${p.hours ? '' : 'disabled'}><span>${paid[u.id] ? fmtTs(paid[u.id]) : ''}</span></label></td>
      <td><button type="button" class="ib sm" data-act="pay-user" data-id="${u.id}" aria-label="Ustawienia wypłaty">${ic('edit')}</button></td></tr>`; }).join('')}
    </tbody></table></div></div>`;
  } else {
    const inp = (name, val, ph = '') => `<input type="number" min="0" step="0.01" inputmode="decimal" name="${name}" value="${val || ''}" placeholder="${ph}">`;
    html += `<form class="col gap" data-sub="pay-rates">
      <div class="card anim"><div class="card-h"><h3>Ogólne</h3></div>
        <p class="muted small">Kolejność: <b>indywidualna stawka pracownika</b> → stawka <b>projektu</b> → stawka <b>rotacji</b> → stawka <b>domyślna</b>. Puste pole = nie ustawiono (bierze następną z kolejki).</p>
        <div class="g3"><label>Stawka domyślna / h${inp('base', P.base, 'np. 250')}</label><label>Waluta<select name="cur">${['NOK', 'PLN', 'EUR'].map(c => opt(c, c, c === P.cur)).join('')}</select></label><label>Podatek domyślny %${inp('tax', P.tax, '35')}</label></div>
        <div class="g2"><label>Nadgodziny po ilu h dziennie (0 = wyłączone)${inp('otAfter', P.otAfter, '0')}</label><label>Dodatek za nadgodziny %${inp('otPct', P.otPct, '40')}</label></div></div>
      <div class="grid2"><div class="card anim" style="--i:1"><div class="card-h"><h3>Stawki rotacji</h3></div>
        ${DB.groups.map(g => `<label class="rate-row"><span class="grow"><span class="gdot" style="--c:${esc(g.color)}"></span> ${esc(g.name)} <span class="muted small">${g.weeksIn}/${g.weeksOut}</span></span>${inp('g_' + g.id, P.groups[g.id], P.base || '—')}</label>`).join('') || empty('Brak rotacji', 'cal')}</div>
      <div class="card anim" style="--i:2"><div class="card-h"><h3>Stawki projektów</h3></div>
        ${DB.projects.map(p => `<label class="rate-row"><span class="grow">${esc(p.name)} <span class="muted small">${esc(p.code || '')}</span></span>${inp('p_' + p.id, P.projects[p.id], 'jak rotacja')}</label>`).join('') || empty('Brak projektów', 'folder')}</div></div>
      <div class="card anim" style="--i:3"><div class="card-h"><h3>Stawki indywidualne (wygrywają zawsze)</h3></div>
        ${crew().map(u => { const auto = (() => { const up = userPay(u), keep = up.rate; up.rate = ''; const r = rateFor(u, ''); up.rate = keep; return r; })(); return `<label class="rate-row">${avatar(u)}<span class="grow">${esc(u.name)} <span class="muted small">${esc(groupById(u.groupId)?.name || 'bez rotacji')} · bez indywidualnej: ${fmtNum(auto.rate)} (${SRC[auto.src]})</span></span>${inp('u_' + u.id, userPay(u).rate, 'auto')}</label>`; }).join('')}</div>
      <button class="btn primary block" type="submit">${ic('check')} Zapisz stawki</button></form>`;
  }
  return { title: 'Wypłaty', sub: tab === 'run' ? 'Rozliczenie miesiąca – godziny × stawki, potrącenia, status wypłaty' : 'Stawki rotacji, projektów i indywidualne', html };
};
function payDetail(u) {
  const M = ST.month, p = payFor(u, M);
  modal(`${u.name} – ${fmtMonth(M)}`, `${payBreakdownHTML(u, p)}
    <div class="lbl" style="margin-top:14px">Dni pracy (${p.days})</div>
    ${p.entries.sort((a, b) => a.date.localeCompare(b.date)).map(x => `<div class="li sm"><span class="grow">${fmtDate(x.date)} · ${x.from}–${x.to}</span><span class="muted small">${(x.splits || []).map(s => esc(projById(s.projectId)?.name || '?') + ' ' + fmtH(s.hours)).join(', ')}</span><b>${fmtH(entryH(x))}</b></div>`).join('') || empty('Brak wpisów', 'clock')}
    <div class="row end"><button type="button" class="btn ghost" data-act="pay-user" data-id="${u.id}">${ic('edit')} Ustawienia wypłaty</button></div>`, { wide: true });
}

/* ----- ZGŁOSZENIA (błędy → admin, zgłoszenia/informacje/skargi → kierownik) ----- */
const RTYPE = { bug: { label: 'Błąd w aplikacji', icon: 'bug', tone: 'warn' }, info: { label: 'Informacja', icon: 'chat', tone: 'blue' }, request: { label: 'Zgłoszenie', icon: 'flag', tone: 'blue' }, complaint: { label: 'Skarga', icon: 'warn', tone: 'err' } };
// admin widzi wszystko; kierownik nie widzi błędów aplikacji (te idą do admina)
const visibleReports = () => !can.manage() ? [] : DB.reports.filter(r => can.admin() || r.type !== 'bug');
const openReportsCount = () => visibleReports().filter(r => r.status === 'open').length;
function reportFrom(r) {
  if (!r.anon) return `${avatar(userById(r.fromId))}<b>${esc(nameOf(r.fromId))}</b>`;
  // kierownik widzi tylko „Anonimowo”, admin widzi kto wysłał
  return `<span class="av anon">?</span><b>Anonimowo</b>${can.admin() ? `<span class="pill anon-who" title="Widoczne tylko dla admina">${ic('eye')} ${esc(nameOf(r.fromId))}</span>` : ''}`;
}
function reportCard(r, i, mine = false) {
  const T = RTYPE[r.type] || RTYPE.info;
  return `<div class="card rep anim st-${r.status}" style="--i:${i}">
    <div class="rep-h"><span class="pill ${T.tone}">${ic(T.icon)} ${T.label}</span>${r.status === 'done' ? `<span class="pill ok">${ic('check')} Załatwione</span>` : '<span class="pill">Otwarte</span>'}<span class="grow"></span><span class="muted small">${fmtTs(r.createdAt)}</span></div>
    ${mine ? (r.anon ? `<div class="muted small">${ic('shield')} Wysłane anonimowo – kierownik nie widzi, że to Ty</div>` : '') : `<div class="rep-from">${reportFrom(r)}</div>`}
    ${r.title ? `<h3 class="rep-t">${esc(r.title)}</h3>` : ''}
    <div class="rep-txt">${esc(r.text)}</div>
    ${(r.fileIds || []).length ? `<div class="thumbs">${r.fileIds.map(f => `<button type="button" class="thumb" data-thumb="${f}" data-act="view-file" data-id="${f}"></button>`).join('')}</div>` : ''}
    ${r.reply ? `<div class="rep-reply"><div class="muted small">Odpowiedź · ${esc(r.anon && !can.admin() && mine ? nameOf(r.reply.byId) : nameOf(r.reply.byId))} · ${fmtTs(r.reply.at)}</div>${esc(r.reply.text)}</div>` : ''}
    ${!mine ? `<div class="row gap wrap"><button type="button" class="btn sm ghost" data-act="report-reply" data-id="${r.id}">${ic('send')} ${r.reply ? 'Zmień odpowiedź' : 'Odpowiedz'}</button>${r.status === 'open' ? `<button type="button" class="btn sm primary" data-act="report-status" data-id="${r.id}" data-s="done">${ic('check')} Załatwione</button>` : `<button type="button" class="btn sm ghost" data-act="report-status" data-id="${r.id}" data-s="open">Otwórz ponownie</button>`}</div>` : ''}
  </div>`;
}
VIEWS.reports = () => {
  const all = visibleReports().sort((a, b) => b.createdAt - a.createdAt);
  const tab = ST.repTab || 'open', type = ST.repType || '';
  const list = all.filter(r => r.status === tab && (!type || r.type === type));
  const types = Object.keys(RTYPE).filter(k => can.admin() || k !== 'bug');
  let html = `<div class="tabs"><button type="button" class="${tab === 'open' ? 'on' : ''}" data-act="rep-tab" data-k="open">Otwarte <b>${all.filter(r => r.status === 'open').length}</b></button><button type="button" class="${tab === 'done' ? 'on' : ''}" data-act="rep-tab" data-k="done">Załatwione</button><span class="grow"></span>
    <select class="mini" data-chg="rep-type">${opt('', 'Wszystkie rodzaje', !type)}${types.map(k => opt(k, RTYPE[k].label, k === type)).join('')}</select></div>`;
  html += list.length ? `<div class="reps">${list.map((r, i) => reportCard(r, i)).join('')}</div>` : empty(tab === 'open' ? 'Brak otwartych zgłoszeń' : 'Brak załatwionych zgłoszeń', 'flag');
  return { title: 'Zgłoszenia', sub: can.admin() ? 'Błędy aplikacji, zgłoszenia, informacje i skargi – jako admin widzisz też autorów anonimowych' : 'Zgłoszenia, informacje i skargi od pracowników', html };
};
function shotsField() {
  return `<label>Zrzuty ekranu (maks. 3, opcjonalnie)<input type="file" name="shots" multiple accept="image/*" data-chg="shots"></label><div class="shots-prev muted small">Nie wybrano zdjęć</div>`;
}
async function saveShots(fd) {
  const files = fd.getAll('shots').filter(f => f && f.size);
  if (files.length > 3) throw new Error('Możesz dodać maksymalnie 3 zrzuty ekranu');
  if (files.some(f => !f.type.startsWith('image/'))) throw new Error('Dozwolone są tylko zdjęcia / zrzuty ekranu');
  const ids = []; for (const f of files) ids.push(await storeFile(f)); return ids;
}

VIEWS.admin = () => {
  const now = Date.now(); const us = [...DB.users].sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0));
  const online = us.filter(u => u.lastSeen && now - u.lastSeen < 5 * 60000).length;
  const today = us.filter(u => u.lastSeen && now - u.lastSeen < 864e5).length;
  const logs = DB.logs.filter(l => !ST.logUser || l.userId === ST.logUser).slice(0, 150);
  const resetsOpen = DB.resetRequests.filter(r => r.status === 'open' && userById(r.userId));
  let html = `<div class="stats">${stat('Online teraz', online, { icon: 'eye', tone: 'green' })}${stat('Aktywni (24 h)', today, { icon: 'users', tone: 'blue', i: 1 })}${stat('Kont', DB.users.length, { icon: 'shield', i: 2 })}${stat('Wpisów w logu', DB.logs.length, { icon: 'file', i: 3 })}</div>
  <div class="grid2"><div class="card anim" style="--i:4"><div class="card-h"><h3>Kto był online</h3></div>
    ${us.map(u => { const on = u.lastSeen && now - u.lastSeen < 5 * 60000; const hM = sumH(DB.hours.filter(h => h.userId === u.id && h.date.startsWith(monthNow()))); return `<div class="li click" data-act="go-user" data-id="${u.id}">${avatar(u)}<div class="grow"><b>${esc(u.name)}</b> <span class="role r-${u.role}">${ROLES[u.role].label}</span><div class="muted small"><span class="odot ${on ? 'on' : ''}"></span>${on ? 'online' : relTime(u.lastSeen)} · ${fmtH(hM)} w tym mies.</div></div>${ic('eye')}</div>`; }).join('')}</div>
  <div class="card anim" style="--i:5"><div class="card-h"><h3>Kopie i reset hasła</h3></div>
    <div class="col gap"><button type="button" class="btn primary block" data-act="go" data-v="backup">${ic('dl')} Kopie zapasowe (całość / użytkownik / części)</button>
    ${resetsOpen.length ? resetsOpen.map(r => { const u = userById(r.userId); return `<div class="li">${avatar(u)}<div class="grow"><b>${esc(u.name)}</b><div class="muted small">prosi o reset hasła · ${relTime(r.at)}</div></div><button type="button" class="btn sm primary" data-act="admin-set-pass" data-id="${u.id}" data-req="${r.id}">${ic('key')} Ustaw</button></div>`; }).join('') : '<div class="muted small">Brak próśb o reset hasła.</div>'}</div>
    <div class="muted small" style="margin-top:12px">Ostatnia kopia: ${DB.meta.lastBackup ? fmtTs(DB.meta.lastBackup) : 'nigdy'}</div></div></div>
  <div class="card anim" style="--i:6"><div class="card-h"><h3>Wszystkie konta</h3><span class="pill">${DB.users.length}</span></div>
    <div class="tl-wrap"><table class="paytbl acctbl"><thead><tr><th>Osoba</th><th>Login</th><th>E-mail</th><th>Ranga</th><th>Język</th><th>Ostatnio</th><th>Status</th><th></th></tr></thead><tbody>
    ${[...DB.users].sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0)).map(u => { const on = u.lastSeen && now - u.lastSeen < 5 * 60000; return `<tr class="${u.active === false ? 'off' : ''}">
      <td><button type="button" class="linkrow" data-act="go-user" data-id="${u.id}">${avatar(u)}<b>${esc(u.name)}</b></button></td><td>@${esc(u.login)}</td><td>${esc(u.email || '—')}</td><td><span class="role r-${u.role}">${ROLES[u.role].label}</span></td><td>${LANGS[langOf(u)].flag}</td>
      <td><span class="odot ${on ? 'on' : ''}"></span>${on ? 'online' : relTime(u.lastSeen)}</td>
      <td>${u.pending ? '<span class="pill warn">czeka</span>' : u.active === false ? '<span class="pill bad">zablokowane</span>' : '<span class="pill ok">aktywne</span>'}</td>
      <td class="acts"><button type="button" class="ib sm" data-act="user-edit" data-id="${u.id}" title="Edytuj (dane, e-mail, ranga)">${ic('edit')}</button><button type="button" class="ib sm" data-act="admin-set-pass" data-id="${u.id}" title="Ustaw nowe hasło">${ic('key')}</button><button type="button" class="ib sm" data-act="bk-user-id" data-id="${u.id}" title="Kopia zapasowa użytkownika">${ic('dl')}</button>${u.id !== REAL.id ? `<button type="button" class="ib sm" data-act="acc-toggle" data-id="${u.id}" title="${u.active === false ? 'Odblokuj' : 'Zablokuj'} konto">${ic(u.active === false ? 'check' : 'x')}</button>` : ''}</td></tr>`; }).join('')}
    </tbody></table></div></div>
  <div class="card anim" style="--i:6"><div class="card-h"><h3>Logi systemu</h3><select data-chg="log-user" class="mini">${userOpts(ST.logUser, () => true, 'Wszyscy')}</select></div>
    ${logs.map(l => `<div class="log"><span class="muted small">${fmtTs(l.at)}</span><b>${esc(nameOf(l.userId))}</b><span>${esc(l.action)}</span></div>`).join('') || empty('Brak logów', 'shield')}</div>`;
  return { title: 'Panel admina', sub: 'Kto był online, wszystkie konta, e-maile, hasła, kopie zapasowe i logi', html };
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
    const mine = DB.reports.filter(r => r.fromId === ME.id), canPass = ME.id === REAL.id && !PREVIEW;
    const tile = (act, icon, t, d, badge) => `<button type="button" class="acc-t" data-act="${act}"><span class="acc-ic">${ic(icon)}</span><span class="grow"><b>${t}</b><span class="muted small">${d}</span></span>${badge ? `<b class="badge">${badge}</b>` : ''}</button>`;
    modal('Moje konto', `<div class="row gap">${avatar(ME, 1)}<div><b>${esc(ME.name)}</b><div class="muted small">${ROLES[ME.role].label} · @${esc(ME.login)}${ME.email ? ' · ' + esc(ME.email) : ''}</div></div></div>
      <div class="acc-grid">
        ${tile('acc-pass', 'lock', 'Zmień hasło', canPass ? 'Podaj obecne i nowe hasło' : 'Wyłączone w trybie podglądu')}
        ${tile('acc-email', 'mail', 'Zmień e-mail', ME.email ? esc(ME.email) : 'Nie podano adresu')}
        ${tile('acc-boss', 'flag', 'Napisz do kierownika', 'Zgłoszenie, informacja albo skarga – także anonimowo')}
        ${tile('acc-bug', 'bug', 'Zgłoś błąd w aplikacji', 'Opis + maks. 3 zrzuty ekranu')}
        ${tile('acc-lang', 'chat', 'Język / Språk / Language', `${LANGS[langOf()].flag} ${LANGS[langOf()].label} – wiadomości tłumaczą się na ten język`)}
        ${tile('acc-backup', 'dl', 'Kopia mojego konta', 'Pobierz swoje dane: godziny, dokumenty, bilety, wiadomości')}
        ${tile('acc-mine', 'file', 'Moje zgłoszenia', mine.length ? `${mine.length} wysłanych` : 'Jeszcze nic nie wysłano', mine.filter(r => r.reply && !r.replySeen).length)}
      </div>
      <div class="row gap wrap"><button type="button" class="btn ghost" data-act="go-user" data-id="${ME.id}">Mój profil</button><button type="button" class="btn ghost" data-act="install-help">${ic('dl')} Dodaj do ekranu</button>${canPass ? `<button type="button" class="btn ghost" data-act="new-recovery">${ic('key')} Nowy kod odzyskiwania</button>` : ''}${!PREVIEW ? `<button type="button" class="btn danger" data-act="logout">${ic('logout')} Wyloguj</button>` : ''}</div>`);
  },
  'acc-lang': () => {
    modal('Język / Språk / Language', `<div class="langs">${Object.entries(LANGS).map(([k, l]) => `<label class="rchip"><input type="radio" name="lang" value="${k}" ${langOf() === k ? 'checked' : ''}><span class="flag">${l.flag}</span><span>${l.label}</span></label>`).join('')}</div>
      <p class="muted small">Wiadomości od kierownika, foremana i księgowej będą automatycznie tłumaczone na wybrany język (zawsze możesz zobaczyć oryginał). Twoje wiadomości są wysyłane w tym języku i tłumaczone u odbiorcy. Menu też zmieni język.</p>`, {
      submitLabel: 'Zapisz', onSubmit: fd => { const l = fd.get('lang'); if (!LANGS[l]) return; ME.lang = l; log('Język: ' + LANGS[l].label); save(); render(); toast(LANGS[l].flag + ' ' + LANGS[l].label); },
    });
  },
  'acc-backup': () => { closeModal(); downloadBackup('user', userSlice(ME, true), ME.name); },
  'msg-orig': el => { const id = el.dataset.id; SHOW_ORIG.has(id) ? SHOW_ORIG.delete(id) : SHOW_ORIG.add(id); render(); },
  'bk-all': () => { if (!can.manage()) return; downloadBackup('all', sanitize(DB), 'cały program'); },
  'bk-user': () => { if (!can.manage()) return; const u = userById($('#bkUser')?.value); if (u) downloadBackup('user', userSlice(u), u.name); },
  'bk-user-id': el => { if (!can.manage()) return; const u = userById(el.dataset.id); if (u) downloadBackup('user', userSlice(u), u.name); },
  'bk-parts': () => {
    if (!can.manage()) return; const ks = $$('[name=bkpart]:checked').map(x => x.value); if (!ks.length) return toast('Zaznacz co najmniej jedną część', 'err');
    const d = { users: DB.users.map(u => ({ id: u.id, name: u.name, login: u.login, role: u.role })) };
    ks.forEach(k => BK_PARTS[k].keys.forEach(c => { d[c] = DB[c]; }));
    if (ks.includes('pay') && can.pay()) { d.pay = DB.pay; }
    downloadBackup('parts', sanitize(d, { keepPay: ks.includes('pay') }), ks.map(k => BK_PARTS[k].label.split(' ')[0]).join('+'));
  },
  'acc-toggle': el => { const u = userById(el.dataset.id); if (!u || u.id === REAL.id) return; u.active = u.active === false; log(`${u.active ? 'Odblokowano' : 'Zablokowano'} konto ${u.name}`); save(); render(); toast(`${u.name}: konto ${u.active ? 'aktywne' : 'zablokowane'}`); },
  'acc-pass': () => {
    if (!(ME.id === REAL.id && !PREVIEW)) return toast(PREVIEW ? 'W trybie podglądu zmiana hasła jest wyłączona' : 'Hasło zmienisz tylko na swoim koncie', 'info');
    modal('Zmień hasło', `<label>Obecne hasło<input name="old" type="password" required autocomplete="current-password"></label><label>Nowe hasło<input name="pass" type="password" minlength="4" required autocomplete="new-password"></label><label>Powtórz nowe hasło<input name="pass2" type="password" minlength="4" required autocomplete="new-password"></label>`, {
      submitLabel: 'Zmień hasło', onSubmit: async fd => {
        if (await sha(String(fd.get('old'))) !== REAL.pass) throw new Error('Obecne hasło jest nieprawidłowe');
        const p = String(fd.get('pass')); if (p.length < 4) throw new Error('Nowe hasło: min. 4 znaki');
        if (p !== String(fd.get('pass2'))) throw new Error('Nowe hasła nie są takie same');
        REAL.pass = await sha(p); log('Zmieniono hasło'); save(); toast('Hasło zmienione');
      },
    });
  },
  'acc-email': () => {
    modal('Zmień e-mail', `<label>Adres e-mail<input name="email" type="email" required value="${esc(ME.email || '')}" placeholder="np. jan@gmail.com" autocomplete="email"></label>${ME.id === REAL.id && !PREVIEW ? '<label>Hasło (dla potwierdzenia)<input name="pass" type="password" required autocomplete="current-password"></label>' : ''}`, {
      submitLabel: 'Zapisz e-mail', onSubmit: async fd => {
        const em = String(fd.get('email')).trim(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) throw new Error('Nieprawidłowy adres e-mail');
        if (ME.id === REAL.id && !PREVIEW && await sha(String(fd.get('pass'))) !== REAL.pass) throw new Error('Nieprawidłowe hasło');
        if (DB.users.some(u => u.id !== ME.id && (u.email || '').toLowerCase() === em.toLowerCase())) throw new Error('Ten e-mail ma już inne konto');
        ME.email = em; log('Zmieniono e-mail'); save(); render(); toast('E-mail zapisany');
      },
    });
  },
  'acc-boss': () => {
    modal('Napisz do kierownika', `<div class="seg3" role="radiogroup">${['request', 'info', 'complaint'].map((k, i) => `<label class="rchip"><input type="radio" name="type" value="${k}" ${i === 0 ? 'checked' : ''}>${ic(RTYPE[k].icon)}<span>${RTYPE[k].label}</span></label>`).join('')}</div>
      <label>Temat<input name="title" maxlength="80" required placeholder="Krótko, czego dotyczy"></label>
      <label>Treść<textarea name="text" rows="5" required placeholder="Opisz sprawę…"></textarea></label>
      <label class="anon-box"><input type="checkbox" name="anon"><span><b>Wyślij anonimowo</b><span class="muted small">Kierownik zobaczy tylko „Anonimowo”. Twoje imię widzi wyłącznie admin.</span></span></label>
      ${shotsField()}`, {
      submitLabel: 'Wyślij', onSubmit: async fd => {
        const text = String(fd.get('text')).trim(); if (!text) throw new Error('Wpisz treść');
        const anon = fd.get('anon') === 'on', type = fd.get('type') || 'request';
        const fileIds = await saveShots(fd);
        DB.reports.push({ id: uid(), type, title: String(fd.get('title')).trim(), text, fromId: ME.id, anon, fileIds, status: 'open', createdAt: Date.now() });
        log(`Wysłano do kierownika: ${RTYPE[type].label}${anon ? ' (anonimowo)' : ''}`); save(); render(); toast(anon ? 'Wysłano anonimowo' : 'Wysłano do kierownika');
      },
    });
  },
  'acc-bug': () => {
    modal('Zgłoś błąd w aplikacji', `<p class="muted small">Zgłoszenie trafi do admina. Opisz, co robiłeś i co poszło nie tak.</p>
      <label>Gdzie wystąpił błąd<input name="title" maxlength="80" required placeholder="np. Godziny pracy – zapis dnia"></label>
      <label>Opis błędu<textarea name="text" rows="5" required placeholder="Co kliknąłeś, co się stało, co powinno się stać…"></textarea></label>
      ${shotsField()}`, {
      submitLabel: 'Wyślij zgłoszenie', onSubmit: async fd => {
        const text = String(fd.get('text')).trim(); if (!text) throw new Error('Opisz błąd');
        const fileIds = await saveShots(fd);
        DB.reports.push({ id: uid(), type: 'bug', title: String(fd.get('title')).trim(), text, fromId: ME.id, anon: false, fileIds, status: 'open', createdAt: Date.now(), ua: navigator.userAgent.slice(0, 160), ver: VERSION });
        log('Zgłoszono błąd: ' + String(fd.get('title')).trim()); save(); render(); toast('Dziękujemy – błąd zgłoszony');
      },
    });
  },
  'acc-mine': () => {
    const mine = DB.reports.filter(r => r.fromId === ME.id).sort((a, b) => b.createdAt - a.createdAt);
    mine.forEach(r => { if (r.reply) r.replySeen = true; }); save();
    modal('Moje zgłoszenia', mine.length ? `<div class="reps">${mine.map((r, i) => reportCard(r, i, true)).join('')}</div>` : empty('Nic jeszcze nie wysłałeś', 'flag'), { wide: true });
    hydrateThumbs(); render();
  },
  'report-status': el => { const r = DB.reports.find(x => x.id === el.dataset.id); if (!r) return; r.status = el.dataset.s; r.doneBy = ME.id; r.doneAt = Date.now(); log(`Zgłoszenie „${r.title || RTYPE[r.type].label}” → ${r.status === 'done' ? 'załatwione' : 'otwarte'}`); save(); render(); toast(r.status === 'done' ? 'Oznaczono jako załatwione' : 'Otwarto ponownie'); },
  'report-reply': el => {
    const r = DB.reports.find(x => x.id === el.dataset.id); if (!r) return;
    modal('Odpowiedź', `<p class="muted small">Odpowiedź zobaczy autor w „Moje konto → Moje zgłoszenia”${r.anon ? ' (także przy zgłoszeniu anonimowym – bez ujawniania autora)' : ''}.</p><label>Treść<textarea name="text" rows="4" required>${esc(r.reply?.text || '')}</textarea></label>`, {
      submitLabel: 'Wyślij odpowiedź', onSubmit: fd => { r.reply = { text: String(fd.get('text')).trim(), byId: ME.id, at: Date.now() }; r.replySeen = false; log('Odpowiedziano na zgłoszenie'); save(); render(); toast('Odpowiedź zapisana'); },
    });
  },
  'pay-tab': el => { ST.payTab = el.dataset.k; render(); },
  'pay-detail': el => payDetail(userById(el.dataset.id)),
  'pay-user': el => {
    const u = userById(el.dataset.id); if (!u || !can.pay()) return; const up = userPay(u), P = payCfg();
    const auto = (() => { const k = up.rate; up.rate = ''; const r = rateFor(u, ''); up.rate = k; return r; })();
    modal('Wypłata – ' + u.name, `<p class="muted small">${esc(groupById(u.groupId)?.name || 'Bez rotacji')} · bez stawki indywidualnej: <b>${fmtNum(auto.rate)} ${P.cur}/h</b> (${SRC[auto.src]}; projekty mogą mieć własne stawki).</p>
      <div class="g2"><label>Stawka indywidualna / h (puste = auto)<input type="number" name="rate" min="0" step="0.01" value="${up.rate || ''}" placeholder="auto"></label><label>Podatek % (puste = ${fmtNum(P.tax)}%)<input type="number" name="tax" min="0" max="100" step="0.1" value="${up.tax ?? ''}"></label></div>
      <div class="g2"><label>Dodatek stały / mies.<input type="number" name="bonus" min="0" step="1" value="${up.bonus || ''}"></label><label>Potrącenia / mies.<input type="number" name="deduct" min="0" step="1" value="${up.deduct || ''}"></label></div>
      <label>Opis potrąceń<input name="deductNote" value="${esc(up.deductNote || '')}" placeholder="np. mieszkanie, zaliczka"></label>
      <label>Notatka księgowej (widzi tylko księgowa i admin)<textarea name="note" rows="2">${esc(up.note || '')}</textarea></label>`, {
      submitLabel: 'Zapisz', onSubmit: fd => { const num = k => { const v = String(fd.get(k) || '').replace(',', '.').trim(); return v === '' ? '' : +v; }; Object.assign(up, { rate: num('rate'), tax: num('tax'), bonus: num('bonus') || 0, deduct: num('deduct') || 0, deductNote: String(fd.get('deductNote') || ''), note: String(fd.get('note') || '') }); log(`Ustawienia wypłaty: ${u.name}`); save(); render(); toast('Zapisano'); },
    });
  },
  'pay-export': () => {
    const M = ST.month; const rows = [['Pracownik', 'Rotacja', 'Godziny', 'Nadgodziny', 'Brutto', 'Podatek', 'Potrącenia', 'Netto', 'Wypłacone']];
    crew().forEach(u => { const p = payFor(u, M); rows.push([u.name, groupById(u.groupId)?.name || '', fmtNum(p.hours), fmtNum(p.ot), Math.round(p.gross), Math.round(p.tax), Math.round(p.deduct), Math.round(p.net), (payCfg().paid[M] || {})[u.id] ? 'tak' : 'nie']); });
    const csv = '\ufeff' + rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = `wyplaty-${M}.csv`; document.body.appendChild(a); a.click(); a.remove(); log('Eksport wypłat ' + M);
  },
  'rep-tab': el => { ST.repTab = el.dataset.k; render(); },
  'logout': () => { closeModal(); logout(); },
  'auth-tab': el => { AUTH_TAB = el.dataset.k; renderAuth(); },
  'install-help': () => { closeMenu(); installHelp(); },
  'install-tab': el => { $('#installBody').innerHTML = installHTML(el.dataset.k); },
  'install-now': async () => { if (!DEFERRED_INSTALL) return; DEFERRED_INSTALL.prompt(); try { await DEFERRED_INSTALL.userChoice; } catch (_) { } DEFERRED_INSTALL = null; closeModal(); },
  'install-hide': () => { localStorage.setItem('cc_install_hide', '1'); render(); },
  'new-recovery': async () => { const code = genCode(); REAL.recovery = await sha(code); log('Wygenerowano nowy kod odzyskiwania'); save(); showRecoveryCode(code, false); },
  'approve-user': el => { const u = userById(el.dataset.id); if (!u) return; const role = $('#role-' + u.id)?.value || 'pracownik'; u.pending = false; u.role = role; u.approvedBy = ME.id; log(`Zaakceptowano konto ${u.name} (${ROLES[role].label})`); save(); render(); toast(`${u.name} – konto aktywne`); },
  'reject-user': el => { const u = userById(el.dataset.id); if (!u) return; confirmBox(`Odrzucić i usunąć konto ${u.name}?`, () => { DB.users = DB.users.filter(x => x.id !== u.id); log('Odrzucono konto ' + u.name); save(); render(); }, 'Odrzuć'); },
  'admin-set-pass': el => {
    const u = userById(el.dataset.id), reqId = el.dataset.req;
    modal('Nowe hasło – ' + u.name, `<p class="muted small">Ustaw tymczasowe hasło i przekaż je pracownikowi (np. SMS-em). Może je potem zmienić w „Moje konto”.</p><label>Nowe hasło<input name="pass" type="text" minlength="4" required value="${genCode().slice(0, 5).toLowerCase()}"></label>`, {
      submitLabel: 'Ustaw hasło', onSubmit: async fd => { const p = String(fd.get('pass')); if (p.length < 4) throw new Error('Min. 4 znaki'); u.pass = await sha(p); const r = DB.resetRequests.find(x => x.id === reqId); if (r) { r.status = 'done'; r.doneBy = ME.id; r.doneAt = Date.now(); } log('Ustawiono nowe hasło dla ' + u.name); save(); render(); toast('Hasło ustawione'); },
    });
  },
  'reset-dismiss': el => { const r = DB.resetRequests.find(x => x.id === el.dataset.id); if (r) { r.status = 'dismissed'; save(); render(); } },

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
    render(); if (SELECTED) toast(el.closest('.gwrap.uni') ? (kind === 'any' ? 'Teraz dotknij dom albo auto' : 'Teraz dotknij dom albo auto (albo listę, aby wypisać)') : 'Teraz dotknij ' + { house: 'dom', car: 'auto', group: 'rotację' }[kind] + ' (albo „' + { house: 'Bez domu', car: 'Bez auta', group: 'Bez rotacji' }[kind] + '”)', 'info');
  },
  'drop': el => { if (SELECTED && dropKindOk(el, SELECTED.kind)) dropTo(el, SELECTED.kind, SELECTED.id); },
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
  'hours-add-for': () => { modal('Dodaj godziny pracownikowi', hoursFormHTML({ userId: '' }), { onSubmit: fd => addHours(readHours(fd)) }); updHoursTotal($('#mform .hform')); },
  'user-hours': el => { go('user', el.dataset.id); },
  'export-hours': () => {
    const M = ST.month; const rows = [['Data', 'Pracownik', 'Od', 'Do', 'Przerwa min', 'Godziny', 'Projekt', 'Godziny projekt', 'Notatka']];
    DB.hours.filter(h => h.date.startsWith(M)).sort((a, b) => a.date.localeCompare(b.date)).forEach(h => {
      const base = [h.date, nameOf(h.userId), h.from, h.to, autoBreak(h.from, h.to), fmtNum(entryH(h))];
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
  'group-shift': el => { const g = groupById(el.dataset.id); if (!g) return; const d = +el.dataset.d; g.start = addDays(g.start, d); log(`Rotacja ${g.name}: cykl przesunięty o ${d > 0 ? '+' : ''}${d / 7} tydz.`); save(); render(); toast(`${g.name}: przesunięto o ${d > 0 ? '+1' : '−1'} tydzień`); },
  'group-msg': el => msgModal('group', el.dataset.id),
  'preset': el => { $('#mform [name=weeksIn]').value = el.dataset.a; $('#mform [name=weeksOut]').value = el.dataset.b; },
  'group-del': el => { const g = groupById(el.dataset.id); DB.users.forEach(u => { if (u.groupId === g.id) u.groupId = ''; }); DB.groups = DB.groups.filter(x => x.id !== g.id); log('Usunięto rotację ' + g.name); save(); closeModal(); render(); },

  /* domy */
  'house-edit': el => {
    const h = houseById(el.dataset.id) || {};
    modal(h.id ? 'Edytuj dom' : 'Nowy dom', `<label>Nazwa<input name="name" value="${esc(h.name || '')}" required></label><label>Adres (do planowania dojazdu)<input name="address" value="${esc(h.address || '')}" placeholder="np. Herøysund, Kvinnherad"></label><label>Ilość miejsc (łóżek)<input type="number" name="beds" min="1" value="${h.beds || 4}" required></label>
      <div><div class="lbl">Auta przy tym domu</div>${DB.cars.length ? `<div class="checks">${DB.cars.map(c => { const other = c.houseId && c.houseId !== h.id ? houseById(c.houseId) : null; return `<label class="check carcheck"><input type="checkbox" name="cars" value="${c.id}" ${h.id && c.houseId === h.id ? 'checked' : ''}><span class="grow"><b>${esc(c.name)}</b> <span class="plate sm">${esc(c.plate || '—')}</span>${other ? `<span class="muted small"> · teraz: ${esc(other.name)}</span>` : ''}</span></label>`; }).join('')}</div>` : '<div class="muted small">Nie ma jeszcze aut – dodaj je w zakładce Auta.</div>'}</div>`, {
      onSubmit: fd => {
        const d = { name: fd.get('name'), address: fd.get('address'), beds: +fd.get('beds') };
        let hid = h.id;
        if (h.id) { if (h.address !== d.address) { delete h.lat; delete h.lon; } Object.assign(h, d); } else { hid = uid(); DB.houses.push({ id: hid, ...d }); }
        const sel = fd.getAll('cars');
        DB.cars.forEach(c => { if (sel.includes(c.id)) { if (c.houseId !== hid) log(`Auto ${c.name} → dom ${d.name}`); c.houseId = hid; } else if (c.houseId === hid) c.houseId = ''; });
        log('Zapisano dom ' + d.name); save(); render(); toast('Zapisano');
      },
      danger: h.id ? { act: 'house-del', id: h.id } : null,
    });
  },
  'house-del': el => { const h = houseById(el.dataset.id); DB.users.forEach(u => { if (u.houseId === h.id) u.houseId = ''; }); DB.cars.forEach(c => { if (c.houseId === h.id) c.houseId = ''; }); DB.houses = DB.houses.filter(x => x.id !== h.id); log('Usunięto dom ' + h.name); save(); closeModal(); render(); },

  /* auta */
  'car-edit': el => {
    const c = carById(el.dataset.id) || {};
    modal(c.id ? 'Edytuj auto' : 'Nowe auto', `<div class="g2"><label>Nazwa / model<input name="name" value="${esc(c.name || '')}" required></label><label>Rejestracja<input name="plate" value="${esc(c.plate || '')}"></label></div>
      <div class="g3 tight"><label>Miejsca<input type="number" name="seats" min="1" value="${c.seats || 5}"></label><label>Przebieg (km)<input type="number" name="odometer" min="0" value="${c.odometer || 0}"></label><label>Paliwo<select name="fuel">${['diesel', 'benzyna', 'elektryk', 'hybryda'].map(f => opt(f, f, f === (c.fuel || 'diesel'))).join('')}</select></label></div>
      <label>Dom (przy którym domu stoi auto)<select name="houseId"><option value="">— bez domu —</option>${DB.houses.map(h => opt(h.id, h.name, h.id === c.houseId)).join('')}</select></label>
      <div class="g2"><label>EU-kontroll<input type="date" name="euDate" value="${c.euDate || ''}"></label><label>Serwis przy (km)<input type="number" name="serviceKm" min="0" value="${c.serviceKm || ''}"></label></div>`, {
      onSubmit: fd => { const d = { name: fd.get('name'), plate: fd.get('plate'), seats: +fd.get('seats'), odometer: +fd.get('odometer'), fuel: fd.get('fuel'), euDate: fd.get('euDate'), serviceKm: +fd.get('serviceKm') || 0, houseId: fd.get('houseId') || '' }; if (c.id) Object.assign(c, d); else DB.cars.push({ id: uid(), ...d }); log('Zapisano auto ' + d.name); save(); render(); toast('Zapisano'); },
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
      submitLabel: 'Przekaż', onSubmit: fd => { const to = fd.get('toId'); if (!to) throw new Error('Wybierz osobę'); DB.cardTransfers.push({ id: uid(), cardId: c.id, fromId: c.holderId || ME.id, toId: to, byId: ME.id, status: 'pending', createdAt: Date.now() }); DB.messages.push({ id: uid(), lang: langOf(), fromId: ME.id, toType: 'user', toId: to, text: `🔑 Przekazuję Ci kartę paliwową ${c.name} (•••• ${c.last4}). Potwierdź odbiór w zakładce Karty paliwowe.`, createdAt: Date.now(), readBy: [] }); log(`Przekazanie karty ${c.name} → ${nameOf(to)} (czeka)`); save(); render(); toast('Wysłano – czeka na potwierdzenie'); },
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
      <div class="g2"><label>Grupa rotacyjna<select name="groupId">${DB.groups.map(g => opt(g.id, `${g.name} (${crew().filter(u => u.groupId === g.id).length} os.)`, g.id === (t.groupId || el.dataset.group))).join('')}<option value="" ${t.id && !t.groupId ? 'selected' : ''}>— tylko wybrane osoby —</option></select></label>
      <label>Kierunek<select name="direction">${opt('PL', 'Wyjazd do Polski', t.direction !== 'NO')}${opt('NO', 'Przyjazd do Norwegii', t.direction === 'NO')}</select></label></div>
      <label>Dodatkowe osoby (opcjonalnie)<select name="userIds" multiple size="4">${crew().map(u => opt(u.id, u.name, (t.userIds || []).includes(u.id))).join('')}</select></label>
      <div class="g3 tight"><label>Data lotu<input type="date" name="date" value="${t.date || ''}" required></label><label>Wylot<input type="time" name="depTime" value="${t.depTime || ''}" required></label><label>Przylot<input type="time" name="arrTime" value="${t.arrTime || ''}"></label></div>
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
            if (d.groupId) DB.messages.push({ id: uid(), lang: langOf(), fromId: ME.id, toType: 'group', toId: d.groupId, text: txt, createdAt: Date.now(), readBy: [] });
            d.userIds.filter(u => userById(u)?.groupId !== d.groupId).forEach(u => DB.messages.push({ id: uid(), lang: langOf(), fromId: ME.id, toType: 'user', toId: u, text: txt, createdAt: Date.now(), readBy: [] }));
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
  'msg-new': el => { if (can.foreman()) msgModal(); },
  'msg-reply': el => { if (can.foreman()) msgModal('user', el.dataset.id); },

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
  log(`Godziny ${d.userId !== ME.id ? nameOf(d.userId) + ' ' : ''}${d.date} ${d.from}–${d.to}`); save(); render(); toast(`Zapisano ${fmtH(netH(d.from, d.to))}`);
}
function msgModal(type = 'user', toId = '') {
  const isF = can.foreman();
  modal('Nowa wiadomość', `${isF ? `<label>Do<select name="toType" data-chg="msg-type">${opt('user', 'Osoba', type === 'user')}${opt('group', 'Rotacja / grupa', type === 'group')}${opt('all', 'Wszyscy', type === 'all')}</select></label>` : '<input type="hidden" name="toType" value="user">'}
    <label class="mt-user" ${type !== 'user' ? 'hidden' : ''}>Osoba<select name="toUser">${userOpts(type === 'user' ? toId : '', u => u.id !== ME.id && (isF || ROLES[u.role].rank >= 2))}</select></label>
    <label class="mt-group" ${type !== 'group' ? 'hidden' : ''}>Grupa<select name="toGroup">${DB.groups.map(g => opt(g.id, `${g.name} (${crew().filter(u => u.groupId === g.id).length} os.)`, type === 'group' && g.id === toId)).join('')}</select></label>
    <label>Treść<textarea name="text" rows="4" required></textarea></label>`, {
    submitLabel: 'Wyślij',
    onSubmit: fd => { const tt = fd.get('toType'); const to = tt === 'user' ? fd.get('toUser') : tt === 'group' ? fd.get('toGroup') : ''; if (tt !== 'all' && !to) throw new Error('Wybierz odbiorcę'); DB.messages.push({ id: uid(), lang: langOf(), fromId: ME.id, toType: tt, toId: to, text: String(fd.get('text')).trim(), createdAt: Date.now(), readBy: [] }); log(`Wiadomość → ${tt === 'all' ? 'wszyscy' : tt === 'group' ? groupById(to)?.name : nameOf(to)}`); save(); render(); toast('Wysłano'); },
  });
}
const CHG = {
  'pay-paid': el => { const P = payCfg(), M = ST.month; const m = P.paid[M] = P.paid[M] || {}; if (el.checked) m[el.dataset.id] = Date.now(); else delete m[el.dataset.id]; log(`Wypłata ${nameOf(el.dataset.id)} ${M}: ${el.checked ? 'wypłacone' : 'cofnięte'}`); save(); render(); },
  'rep-type': el => { ST.repType = el.value; render(); },
  'shots': el => {
    const box = el.closest('label').nextElementSibling; const fs = [...el.files];
    if (fs.length > 3) { el.value = ''; box.textContent = 'Nie wybrano zdjęć'; return toast('Maksymalnie 3 zrzuty ekranu – wybierz jeszcze raz', 'err'); }
    if (fs.some(f => !f.type.startsWith('image/'))) { el.value = ''; box.textContent = 'Nie wybrano zdjęć'; return toast('Tylko zdjęcia / zrzuty ekranu', 'err'); }
    box.innerHTML = fs.length ? fs.map(f => `<span class="shot" style="background-image:url(${URL.createObjectURL(f)})"></span>`).join('') + `<span>${fs.length}/3</span>` : 'Nie wybrano zdjęć';
  },
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
      if (j.scope && j.scope !== 'all') {
        if (!REAL || !can.manage()) throw new Error('Kopię użytkownika lub części może dołączyć kierownik albo admin (po zalogowaniu)');
        if (!confirm(`Dołączyć kopię „${j.label || j.scope}” z ${j.at}? Brakujące dane wrócą, nic nie zostanie usunięte.`)) return;
        const n = await mergeBackup(j); log(`Dołączono kopię: ${j.label || j.scope}`); save(); render(); el.value = ''; return toast(`Dołączono (${n} wpisów)`);
      }
      if (REAL && !can.manage()) throw new Error('Pełną kopię przywraca kierownik albo admin');
      if (!confirm(`Przywrócić kopię z ${j.at}? Obecne dane zostaną zastąpione.`)) return;
      await FS.clear().catch(() => { });
      for (const x of j.files || []) { const blob = await (await fetch(x.data)).blob(); await FS.put({ id: x.id, name: x.name, type: x.type, at: x.at, blob, size: blob.size }); }
      DB = j.db; const e = emptyDB(); for (const k in e) if (!DB[k]) DB[k] = e[k];
      if (REAL) { REAL = DB.users.find(u => u.id === REAL.id) || DB.users.find(u => u.role === 'admin'); ME = REAL; log('Przywrócono kopię zapasową'); }
      save(); if (!REAL) AUTH_TAB = 'login'; render(); toast(REAL ? 'Przywrócono kopię' : 'Kopia wczytana – zaloguj się swoim loginem i hasłem');
    } catch (err) { toast(err.message, 'err'); }
  },
};
const SUB = {
  'pay-rates': f => {
    if (!can.pay()) return; const P = payCfg(), fd = new FormData(f);
    const num = k => { const v = String(fd.get(k) ?? '').replace(',', '.').trim(); return v === '' ? '' : +v; };
    P.base = +num('base') || 0; P.cur = fd.get('cur') || 'NOK'; P.tax = num('tax') === '' ? 0 : num('tax'); P.otAfter = +num('otAfter') || 0; P.otPct = num('otPct') === '' ? 40 : num('otPct');
    DB.groups.forEach(g => { const v = num('g_' + g.id); if (v === '') delete P.groups[g.id]; else P.groups[g.id] = v; });
    DB.projects.forEach(p => { const v = num('p_' + p.id); if (v === '') delete P.projects[p.id]; else P.projects[p.id] = v; });
    crew().forEach(u => { userPay(u).rate = num('u_' + u.id); });
    log('Zapisano stawki wypłat'); save(); render(); toast('Stawki zapisane');
  },
  'hours-add': f => addHours(readHours(new FormData(f))),
  'auth-login': authLogin,
  'auth-register': authRegister,
  'auth-reset-code': authResetCode,
  'auth-reset-request': authResetRequest,
};

/* ---------- menu mobilne ---------- */
function openMenu() {
  const items = NAV.filter(navOk);
  const d = document.createElement('div'); d.className = 'sheet-ov'; d.dataset.act = 'close-menu';
  d.innerHTML = `<div class="sheet" onclick="event.stopPropagation()"><div class="grab"></div><div class="sheet-grid">${items.map(n => { const b = navBadge(n.id); return `<a href="#${n.id}" class="${VIEW === n.id ? 'on' : ''}" data-act="go" data-v="${n.id}">${ic(n.icon)}<span>${navLabel(n)}</span>${b ? `<b class="badge">${b}</b>` : ''}</a>`; }).join('')}</div>
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
  if (e.target.matches('[data-paycalc]')) payCalcUpdate(e.target);
  if (e.target.matches('[data-gsearch]')) { const q = e.target.value.trim().toLowerCase(); $$('.chip', e.target.closest('.gpanel')).forEach(c => { c.style.display = !q || (c.dataset.name || '').includes(q) ? '' : 'none'; }); }
});
document.addEventListener('submit', e => {
  const f = e.target; if (!f.dataset.sub) return; e.preventDefault();
  const btn = f.querySelector('button[type=submit]'); if (btn) btn.disabled = true;
  Promise.resolve().then(() => SUB[f.dataset.sub](f)).catch(err => toast(err.message || String(err), 'err')).finally(() => { if (btn && btn.isConnected) btn.disabled = false; });
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
/* blokada zoomu dwoma palcami na całej stronie (Android, iOS, touchpad) */
['gesturestart', 'gesturechange', 'gestureend'].forEach(t => document.addEventListener(t, e => e.preventDefault(), { passive: false }));
document.addEventListener('touchmove', e => { if (e.touches && e.touches.length > 1) e.preventDefault(); }, { passive: false });
document.addEventListener('wheel', e => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
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
    const id = localStorage.getItem(SESSION_KEY); REAL = DB.users.find(u => u.id === id && u.active !== false && !u.pending) || null;
  }
  ME = REAL;
  // start zawsze od Pulpitu, na górze strony (bez wracania do ostatniej zakładki)
  VIEW = 'dash'; ARG = null;
  try { history.scrollRestoration = 'manual'; } catch (_) { }
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  render(); window.scrollTo(0, 0);
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => { });
}
boot();
