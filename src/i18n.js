
/* =========================================================
   TŁUMACZENIE CAŁEGO INTERFEJSU (PL → NO / EN)
   Interfejs jest pisany po polsku; po każdej zmianie ekranu tłumaczymy teksty (węzły tekstowe,
   placeholder, title, aria-label) według słownika I18N_DICT (src/i18n-dict.js).
   Liczby, daty i godziny są wyciągane jako {0}, {1}… więc „za 8 dni” pasuje do klucza „za {0} dni”.
   Treści wpisane przez ludzi (wiadomości, zgłoszenia, nazwy) nie są tłumaczone – nie ma ich w słowniku,
   a kontenery z treścią użytkownika mają klasę .notr.
   ========================================================= */
const TR_TOK = /(?:(?:nd|pn|wt|śr|cz|pt|sb|sø|ma|ti|on|to|fr|lø|Sun|Mon|Tue|Wed|Thu|Fri|Sat) )?\d{1,2}\.\d{1,2}(?:\.\d{4})?|\d{1,2}:\d{2}|\d+(?:[  ]\d{3})*(?:[.,]\d+)?/g;
const TR_EDGE = /^([\s·–—,:;()!?„”"'…+•→←✓\-]*)([\s\S]*?)([\s·–—,:;()!?„”"'…•→✓]*)$/;
const TR_SKIP = 'script,style,textarea,code,.notr,[data-notr],.m-text,.rep-txt,.rep-t,.rep-reply,.note,.gscreen,.gintro,.ginst,.gaddr,.pitch-body,.cn,.url,.plate,.acc-langs,.glang';
const TR_MISS = new Set();
let TR_PHRASES = null;
function trLang() { try { return ME ? langOf() : browserLang(); } catch (_) { return 'pl'; } }
function trPhrases(L) {
  if (TR_PHRASES && TR_PHRASES.L === L) return TR_PHRASES.list;
  const D = I18N_DICT[L] || {};
  const list = Object.keys(D).filter(k => !/\{\d\}/.test(k) && k.length >= 8 && /\s/.test(k)).sort((a, b) => b.length - a.length);
  TR_PHRASES = { L, list }; return list;
}
function trText(s, L = trLang()) {
  if (L === 'pl' || s == null) return s;
  const str = String(s); if (!/[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]/.test(str)) return s;
  const D = I18N_DICT[L]; if (!D) return s;
  const m = str.match(TR_EDGE); const core = m[2]; if (!core) return s;
  let t = trCore(core, D, L, 0);
  if (t == null) {
    // dłuższy tekst z wplecionymi danymi – podmień znane frazy
    let out = core, hit = false;
    for (const k of trPhrases(L)) { if (out.includes(k)) { out = out.split(k).join(D[k]); hit = true; } }
    if (hit) t = out; else TR_MISS.add(core.replace(TR_TOK, (() => { let i = 0; return () => '{' + (i++) + '}'; })()));
  }
  return t == null ? s : m[1] + t + m[3];
}
// dokładne dopasowanie → z liczbami jako {0} → podział na części („A · B”, „A – B”, „A: B”, „A (B)”, „A, B 👋”)
function trCore(core, D, L, depth) {
  if (D[core] != null) return D[core];
  const vals = []; const key = core.replace(TR_TOK, x => { vals.push(x); return '{' + (vals.length - 1) + '}'; });
  if (vals.length && D[key] != null) return D[key].replace(/\{(\d)\}/g, (_, i) => vals[+i] ?? '');
  if (depth > 3) return null;
  for (const sep of [' · ', ' – ', ': ', ' → ', ', ']) {
    if (!core.includes(sep)) continue;
    const parts = core.split(sep); let hit = false;
    const out = parts.map(p => { const mm = p.match(TR_EDGE); const r = mm[2] ? trCore(mm[2], D, L, depth + 1) : null; if (r != null) { hit = true; return mm[1] + r + mm[3]; } return p; });
    if (hit) return out.join(sep);
  }
  const pm = core.match(/^(.*?)\s*\((.+?)\)?$/);
  if (pm && pm[2]) { const a = trCore(pm[1], D, L, depth + 1), b = trCore(pm[2], D, L, depth + 1); if (a != null || b != null) return `${a ?? pm[1]} (${b ?? pm[2]}`; }
  return null;
}
function trNode(root) {
  const L = trLang(); if (L === 'pl' || !root) return;
  if (root.nodeType === 3) { const p = root.parentElement; if (p && !p.closest(TR_SKIP)) { const v = trText(root.nodeValue, L); if (v !== root.nodeValue) root.nodeValue = v; } return; }
  if (root.nodeType !== 1 || root.closest?.(TR_SKIP)) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && n.parentElement.closest(TR_SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(n => { const v = trText(n.nodeValue, L); if (v !== n.nodeValue) n.nodeValue = v; });
  const els = [root, ...root.querySelectorAll('[placeholder],[title],[aria-label],[alt]')];
  els.forEach(el => { if (el.closest(TR_SKIP)) return; ['placeholder', 'title', 'aria-label', 'alt'].forEach(a => { const v = el.getAttribute?.(a); if (v) { const t = trText(v, L); if (t !== v) el.setAttribute(a, t); } }); });
}
const TR_OBS = new MutationObserver(muts => {
  if (trLang() === 'pl') return;
  TR_OBS.disconnect();
  for (const m of muts) m.addedNodes.forEach(trNode);
  TR_OBS.observe(document.body, { childList: true, subtree: true });
});
function trStart() {
  document.documentElement.lang = { pl: 'pl', no: 'nb', en: 'en' }[trLang()] || 'pl';
  trNode(document.body);
  TR_OBS.observe(document.body, { childList: true, subtree: true });
}
{ const _c = window.confirm.bind(window); window.confirm = m => _c(trText(m)); const _a = window.alert.bind(window); window.alert = m => _a(trText(m)); }
trStart();
