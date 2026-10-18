
/* =========================================================
   PREZENTACJA DLA SZEFA FIRMY (NO / EN / PL) – tylko admin
   Widok przewijany + tryb pokazu (pełny ekran, strzałki ← →, Esc).
   ========================================================= */
const PITCH_UI = {
  no: { title: 'Presentasjon', sub: 'Hva CrewControl gir Slangeservice AS', start: 'Start presentasjon', exit: 'Avslutt', of: 'av' },
  en: { title: 'Presentation', sub: 'What CrewControl gives Slangeservice AS', start: 'Start presentation', exit: 'Exit', of: 'of' },
  pl: { title: 'Prezentacja', sub: 'Co CrewControl daje firmie Slangeservice AS', start: 'Rozpocznij prezentację', exit: 'Zakończ', of: 'z' },
};
// slajd: { k: rodzaj, img: id zrzutu, t: { no: {...}, en: {...}, pl: {...} } }
const PITCH = [
  { k: 'cover', t: {
    no: { h: 'CrewControl', s: 'Hele turnusteamet i én app – timer, turnuser, hus, biler, billetter og lønn.', p: ['Laget for Slangeservice AS', 'Norsk · English · Polski', 'Fungerer på mobil og PC – uten App Store'] },
    en: { h: 'CrewControl', s: 'The whole rotation crew in one app – hours, rotations, houses, cars, tickets and payroll.', p: ['Built for Slangeservice AS', 'Norsk · English · Polski', 'Works on phone and PC – no App Store'] },
    pl: { h: 'CrewControl', s: 'Cała ekipa rotacyjna w jednej aplikacji – godziny, rotacje, domy, auta, bilety i wypłaty.', p: ['Zrobione dla Slangeservice AS', 'Norsk · English · Polski', 'Działa na telefonie i komputerze – bez App Store'] } } },
  { k: 'list', t: {
    no: { h: 'Utfordringen i dag', s: 'Et team som bytter mellom Norge og Polen gir mye administrasjon.', p: ['Timer på papir, SMS og i Excel – vanskelig å fordele per prosjekt', 'Hvem bor hvor, hvem kjører hvilken bil – i hodet til lederen', 'Flybilletter og reiseruter sendt i ulike kanaler', 'Drivstoffkort som «forsvinner» mellom folk', 'Språkbarriere mellom ledelse og arbeidere', 'Lønn regnes manuelt med ulike satser'] },
    en: { h: 'The challenge today', s: 'A crew rotating between Norway and Poland creates a lot of admin.', p: ['Hours on paper, SMS and Excel – hard to split per project', 'Who lives where and drives which car – only in the manager’s head', 'Flight tickets and travel routes sent through different channels', 'Fuel cards that “disappear” between people', 'Language barrier between management and workers', 'Pay calculated by hand with different rates'] },
    pl: { h: 'Problem dziś', s: 'Ekipa rotująca między Norwegią a Polską to dużo administracji.', p: ['Godziny na kartkach, SMS-ach i w Excelu – trudno rozbić na projekty', 'Kto gdzie mieszka i czym jeździ – tylko w głowie kierownika', 'Bilety i trasy dojazdu wysyłane różnymi kanałami', 'Karty paliwowe „giną” między ludźmi', 'Bariera językowa między kierownictwem a pracownikami', 'Wypłaty liczone ręcznie przy różnych stawkach'] } } },
  { k: 'img', img: 'k-dash', t: {
    no: { h: 'Én oversikt for ledelsen', s: 'Alt viktig på første skjerm når du logger inn.', p: ['Hvem er i Norge i dag og hvem har registrert timer', 'Neste ankomster og avreiser', 'Varsler: nye kontoer, EU-kontroll, service, drivstoffkort', 'Hurtigvalg for de vanligste oppgavene'] },
    en: { h: 'One overview for management', s: 'Everything important on the first screen after logging in.', p: ['Who is in Norway today and who has logged hours', 'Upcoming arrivals and departures', 'Alerts: new accounts, EU inspection, service, fuel cards', 'Quick actions for the most common tasks'] },
    pl: { h: 'Jeden przegląd dla kierownictwa', s: 'Wszystko ważne na pierwszym ekranie po zalogowaniu.', p: ['Kto jest dziś w Norwegii i kto wpisał godziny', 'Najbliższe przyjazdy i wyjazdy', 'Alerty: nowe konta, EU-kontroll, serwis, karty paliwowe', 'Szybkie akcje do najczęstszych zadań'] } } },
  { k: 'img', img: 'w-hours', mobile: true, t: {
    no: { h: 'Timer per prosjekt – hver dag', s: 'Arbeiderne registrerer selv på mobilen på 20 sekunder.', p: ['Fra–til, pausen trekkes automatisk (1 t ved 10 t+, ellers 0,5 t)', 'Timene fordeles på prosjekter', 'Formann retter og legger inn timer for andre', 'Eksport til CSV / Excel for hver måned'] },
    en: { h: 'Hours per project – every day', s: 'Workers log their own hours on the phone in 20 seconds.', p: ['From–to, the break is deducted automatically (1 h at 10 h+, otherwise 0.5 h)', 'Hours split between projects', 'The foreman corrects and adds hours for others', 'Export to CSV / Excel for every month'] },
    pl: { h: 'Godziny na projekty – codziennie', s: 'Pracownicy sami wpisują godziny w telefonie w 20 sekund.', p: ['Od–do, przerwa liczy się sama (1 h przy 10 h+, inaczej 0,5 h)', 'Godziny rozbite na projekty', 'Foreman poprawia i wpisuje godziny za innych', 'Eksport do CSV / Excela za każdy miesiąc'] } } },
  { k: 'img', img: 'k-rot', t: {
    no: { h: 'Turnuser under kontroll', s: 'Hver turnus (f.eks. 3/3 eller 4/2 uker) med folk, status og neste bytte.', p: ['Plan uke for uke: hvem er i Norge, hvem er i Polen', 'Flytt hele syklusen en uke med ett trykk', 'Send billetter og meldinger til hele turnusen', 'Arbeiderne ser sin egen kalender og nedtelling'] },
    en: { h: 'Rotations under control', s: 'Each rotation (e.g. 3/3 or 4/2 weeks) with people, status and next change.', p: ['Week-by-week plan: who is in Norway, who is in Poland', 'Shift the whole cycle by a week with one tap', 'Send tickets and messages to the whole rotation', 'Workers see their own calendar and countdown'] },
    pl: { h: 'Rotacje pod kontrolą', s: 'Każda rotacja (np. 3/3 albo 4/2 tygodnie) z ludźmi, statusem i następną zmianą.', p: ['Plan tydzień po tygodniu: kto w Norwegii, kto w Polsce', 'Przesunięcie całego cyklu o tydzień jednym kliknięciem', 'Bilety i wiadomości do całej rotacji', 'Pracownicy widzą swój kalendarz i odliczanie'] } } },
  { k: 'img', img: 'k-map', t: {
    no: { h: 'Hus og biler på ett kart', s: 'Dra en person til et hus eller en bil – ferdig.', p: ['Ledige senger og bilplasser vises med en gang', 'Hvem bor sammen og hvem kjører sammen', 'Biler knyttes til husene der de står'] },
    en: { h: 'Houses and cars on one map', s: 'Drag a person onto a house or a car – done.', p: ['Free beds and car seats shown instantly', 'Who lives together and who drives together', 'Cars linked to the houses where they are parked'] },
    pl: { h: 'Domy i auta na jednej mapie', s: 'Przeciągnij osobę na dom albo auto – gotowe.', p: ['Wolne łóżka i miejsca w autach widać od razu', 'Kto mieszka razem i kto jeździ razem', 'Auta przypisane do domów, przy których stoją'] } } },
  { k: 'img', img: 'k-cars', t: {
    no: { h: 'Bilparken: EU-kontroll, km og problemer', s: 'Hver bil med EU-kontroll, kilometerstand, service og tanking.', p: ['Arbeiderne melder feil med bilde – lederen ser et rødt tall ved bilen', 'Varsel før EU-kontroll og service', 'Drivstoffkort med kvittert overlevering mellom personer', 'Forbruk og kostnad per bil per måned'] },
    en: { h: 'The fleet: EU inspection, km and problems', s: 'Each car with EU inspection, mileage, service and refuelling.', p: ['Workers report faults with a photo – the manager sees a red number on the car', 'Reminders before EU inspection and service', 'Fuel cards with a signed-off hand-over between people', 'Consumption and cost per car per month'] },
    pl: { h: 'Flota: EU-kontroll, km i problemy', s: 'Każde auto z EU-kontroll, przebiegiem, serwisem i tankowaniami.', p: ['Pracownicy zgłaszają usterki ze zdjęciem – kierownik widzi czerwoną cyfrę przy aucie', 'Przypomnienia przed EU-kontroll i serwisem', 'Karty paliwowe z potwierdzanym przekazaniem między ludźmi', 'Spalanie i koszt na auto w miesiącu'] } } },
  { k: 'img', img: 'w-tickets', mobile: true, t: {
    no: { h: 'Billetter og reise', s: 'Flybilletter sendes til hele turnusen samtidig.', p: ['Arbeiderne får varsel og har billetten i appen', 'Reiseplan fra huset til flyplassen med Skyss-buss og ferje (Entur)', 'Arkiv over alle reiser'] },
    en: { h: 'Tickets and travel', s: 'Flight tickets are sent to the whole rotation at once.', p: ['Workers are notified and have the ticket in the app', 'Travel plan from the house to the airport with Skyss bus and ferry (Entur)', 'Archive of all trips'] },
    pl: { h: 'Bilety i dojazd', s: 'Bilety lotnicze wysyłane do całej rotacji naraz.', p: ['Pracownicy dostają powiadomienie i mają bilet w aplikacji', 'Plan dojazdu z domu na lotnisko autobusem Skyss i promem (Entur)', 'Archiwum wszystkich podróży'] } } },
  { k: 'img', img: 'q-run', t: {
    no: { h: 'Lønn uten regneark', s: 'Regnskap ser alle timer og gjør opp måneden automatisk.', p: ['Satser: standard → turnus → prosjekt → individuell (individuell gjelder alltid)', 'Skatt, tillegg, trekk og overtid', 'Merk «utbetalt» og eksporter til regnskapsfører', 'Arbeiderne ser et anslag på lønnen – færre spørsmål'] },
    en: { h: 'Payroll without spreadsheets', s: 'The accountant sees all hours and settles the month automatically.', p: ['Rates: default → rotation → project → individual (individual always wins)', 'Tax, bonuses, deductions and overtime', 'Mark “paid” and export for the accounting office', 'Workers see an estimate of their pay – fewer questions'] },
    pl: { h: 'Wypłaty bez arkuszy', s: 'Księgowa widzi wszystkie godziny i rozlicza miesiąc automatycznie.', p: ['Stawki: domyślna → rotacja → projekt → indywidualna (indywidualna wygrywa zawsze)', 'Podatek, dodatki, potrącenia i nadgodziny', 'Znacznik „wypłacone” i eksport dla biura rachunkowego', 'Pracownicy widzą szacunek wypłaty – mniej pytań'] } } },
  { k: 'img', img: 'w-msgs', mobile: true, t: {
    no: { h: 'Alle snakker sitt eget språk', s: 'Norsk, polsk og engelsk – hele appen og alle meldinger.', p: ['Språket velges automatisk etter telefonen', 'Meldinger oversettes automatisk hos mottakeren', '«Vis original» viser alltid avsenderens tekst', 'Bruksanvisninger med skjermbilder for hver rolle på tre språk'] },
    en: { h: 'Everyone speaks their own language', s: 'Norwegian, Polish and English – the whole app and every message.', p: ['The language is picked automatically from the phone', 'Messages are translated automatically for the recipient', '“Show original” always shows the sender’s text', 'Illustrated guides for every role in three languages'] },
    pl: { h: 'Każdy w swoim języku', s: 'Norweski, polski i angielski – cała aplikacja i każda wiadomość.', p: ['Język ustawia się sam według telefonu', 'Wiadomości tłumaczą się automatycznie u odbiorcy', '„Pokaż oryginał” zawsze pokazuje tekst nadawcy', 'Instrukcje ze zrzutami ekranu dla każdej rangi w trzech językach'] } } },
  { k: 'img', img: 'w-anon', mobile: true, t: {
    no: { h: 'Henvendelser og klager – også anonymt', s: 'Arbeiderne kan si fra uten frykt.', p: ['Henvendelse, informasjon eller klage direkte til lederen', 'Anonym klage: lederen ser bare «Anonymt», kun admin ser avsenderen', 'Svar og status «løst» – alt dokumentert', 'Feil i appen meldes med skjermbilder'] },
    en: { h: 'Requests and complaints – also anonymous', s: 'Workers can speak up without fear.', p: ['Request, information or complaint straight to the manager', 'Anonymous complaint: the manager only sees “Anonymous”, only the admin sees the author', 'Reply and “resolved” status – everything documented', 'App bugs reported with screenshots'] },
    pl: { h: 'Zgłoszenia i skargi – także anonimowo', s: 'Pracownicy mogą powiedzieć, co jest nie tak, bez obaw.', p: ['Zgłoszenie, informacja albo skarga prosto do kierownika', 'Skarga anonimowa: kierownik widzi tylko „Anonimowo”, autora widzi tylko admin', 'Odpowiedź i status „załatwione” – wszystko udokumentowane', 'Błędy aplikacji zgłaszane ze zrzutami ekranu'] } } },
  { k: 'roles', t: {
    no: { h: 'Riktig tilgang for hver rolle', s: 'Hver person ser bare det som er relevant.', p: ['Admin – alt, kontoer, logger, sikkerhetskopier', 'Leder – folk, hus, biler, turnuser, billetter, henvendelser', 'Formann – prosjekter og retting av timer', 'Regnskap – timer og lønn', 'Ansatt – egne timer, plan, billetter, dokumenter, lønnsanslag'] },
    en: { h: 'The right access for every role', s: 'Each person sees only what matters to them.', p: ['Admin – everything, accounts, logs, backups', 'Manager – people, houses, cars, rotations, tickets, reports', 'Foreman – projects and correcting hours', 'Accountant – hours and payroll', 'Employee – own hours, schedule, tickets, documents, pay estimate'] },
    pl: { h: 'Właściwy dostęp dla każdej rangi', s: 'Każdy widzi tylko to, co go dotyczy.', p: ['Admin – wszystko, konta, logi, kopie zapasowe', 'Kierownik – ludzie, domy, auta, rotacje, bilety, zgłoszenia', 'Foreman – projekty i poprawianie godzin', 'Księgowa – godziny i wypłaty', 'Pracownik – swoje godziny, grafik, bilety, dokumenty, szacunek wypłaty'] } } },
  { k: 'list', t: {
    no: { h: 'Sikkerhet og kontroll', s: 'Full sporbarhet på hvem som gjorde hva.', p: ['Innlogging med passord, godkjenning av nye kontoer', 'Logg over alle endringer', 'Sikkerhetskopi av alt, én ansatt eller valgte deler', '«Vis som» – admin ser appen slik hver rolle ser den', 'Neste steg: felles server i EU (f.eks. Supabase) slik at alle deler samme data'] },
    en: { h: 'Security and control', s: 'Full traceability of who did what.', p: ['Password login, approval of new accounts', 'Log of every change', 'Backup of everything, one employee or selected parts', '“View as” – the admin sees the app the way each role sees it', 'Next step: a shared server in the EU (e.g. Supabase) so everyone shares the same data'] },
    pl: { h: 'Bezpieczeństwo i kontrola', s: 'Pełny ślad, kto co zrobił.', p: ['Logowanie hasłem, akceptacja nowych kont', 'Log wszystkich zmian', 'Kopia całości, jednego pracownika albo wybranych części', '„Podgląd jako” – admin widzi aplikację oczami każdej rangi', 'Następny krok: wspólny serwer w UE (np. Supabase), żeby wszyscy mieli te same dane'] } } },
  { k: 'list', t: {
    no: { h: 'Hva Slangeservice vinner', s: 'Mindre administrasjon, færre feil, mer oversikt.', p: ['Timer per prosjekt klare til fakturering og lønn', 'Lønnsoppgjør på minutter i stedet for timer', 'Ingen tapte drivstoffkort eller glemte EU-kontroller', 'Færre telefoner og SMS om billetter, adresser og timer', 'Fornøyde arbeidere som forstår alt på sitt språk', 'Installeres på 2 minutter – ingen App Store, ingen opplæring'] },
    en: { h: 'What Slangeservice gains', s: 'Less admin, fewer mistakes, more overview.', p: ['Hours per project ready for invoicing and payroll', 'Payroll in minutes instead of hours', 'No lost fuel cards or forgotten EU inspections', 'Fewer calls and texts about tickets, addresses and hours', 'Happier workers who understand everything in their language', 'Installed in 2 minutes – no App Store, no training'] },
    pl: { h: 'Co zyskuje Slangeservice', s: 'Mniej administracji, mniej błędów, więcej kontroli.', p: ['Godziny na projekty gotowe do faktur i wypłat', 'Rozliczenie wypłat w minuty zamiast godzin', 'Żadnych zgubionych kart paliwowych ani zapomnianych EU-kontroll', 'Mniej telefonów i SMS-ów o biletach, adresach i godzinach', 'Zadowoleni pracownicy, którzy wszystko rozumieją w swoim języku', 'Instalacja w 2 minuty – bez App Store i szkoleń'] } } },
  { k: 'cover', end: true, t: {
    no: { h: 'Takk!', s: 'La oss starte med én turnus og bygge videre derfra.', p: ['Created and designed by DWSystem'] },
    en: { h: 'Thank you!', s: 'Let’s start with one rotation and build from there.', p: ['Created and designed by DWSystem'] },
    pl: { h: 'Dziękuję!', s: 'Zacznijmy od jednej rotacji i rozwijajmy dalej.', p: ['Created and designed by DWSystem'] } } },
];
function pitchSlide(sl, L, i, n) {
  const t = sl.t[L];
  const img = sl.img ? (GUIDE_IMG[sl.img + '.' + L] || GUIDE_IMG[sl.img + '.pl']) : '';
  const head = `<div class="ps-n">${i + 1} / ${n}</div>`;
  if (sl.k === 'cover') return `<section class="pslide cover ${sl.end ? 'end' : ''}">${head}${LOGO ? `<img class="ps-logo" src="${LOGO}" alt="">` : ''}<h2>${esc(t.h)}</h2><p class="ps-s">${esc(t.s)}</p><div class="ps-tags">${t.p.map(x => `<span>${esc(x)}</span>`).join('')}</div></section>`;
  const list = `<ul class="ps-list">${t.p.map(x => `<li>${ic('check')}<span>${esc(x)}</span></li>`).join('')}</ul>`;
  if (sl.k === 'img') return `<section class="pslide withimg ${sl.mobile ? 'mob' : ''}">${head}<div class="ps-txt"><h2>${esc(t.h)}</h2><p class="ps-s">${esc(t.s)}</p>${list}</div><figure class="ps-img">${img ? `<img src="${img}" alt="" loading="lazy">` : ''}</figure></section>`;
  if (sl.k === 'roles') return `<section class="pslide">${head}<h2>${esc(t.h)}</h2><p class="ps-s">${esc(t.s)}</p><div class="ps-roles">${t.p.map(x => { const [a, b] = x.split(' – '); return `<div><b>${esc(a)}</b><span>${esc(b || '')}</span></div>`; }).join('')}</div></section>`;
  return `<section class="pslide">${head}<h2>${esc(t.h)}</h2><p class="ps-s">${esc(t.s)}</p>${list}</section>`;
}
VIEWS.pitch = () => {
  const L = PITCH_UI[ST.pitchLang] ? ST.pitchLang : 'no', U = PITCH_UI[L];
  const html = `<div class="tabs noprint notr"><div class="seg glang">${['no', 'en', 'pl'].map(k => `<button type="button" class="${L === k ? 'on' : ''}" data-act="pitch-lang" data-k="${k}">${LANGS[k].flag} ${k.toUpperCase()}</button>`).join('')}</div><span class="grow"></span>
    <button type="button" class="btn ghost sm" data-act="guide-print">${ic('dl')} PDF</button><button type="button" class="btn primary" data-act="pitch-full">${ic('expand')} ${U.start}</button></div>
    <div class="pitch-body" id="pitchBody">${PITCH.map((s, i) => pitchSlide(s, L, i, PITCH.length)).join('')}</div>`;
  return { title: U.title, sub: U.sub, html };
};
let PITCH_I = 0;
function pitchShow(i) {
  const ov = $('.pitch-ov'); if (!ov) return; const sl = $$('.pslide', ov); PITCH_I = Math.max(0, Math.min(sl.length - 1, i));
  sl.forEach((s, k) => s.classList.toggle('on', k === PITCH_I));
  $('.pov-n', ov).textContent = `${PITCH_I + 1} / ${sl.length}`;
}
Object.assign(ACT, {
  'pitch-lang': el => { ST.pitchLang = el.dataset.k; render(); },
  'pitch-full': () => {
    const L = PITCH_UI[ST.pitchLang] ? ST.pitchLang : 'no';
    const ov = document.createElement('div'); ov.className = 'pitch-ov notr';
    ov.innerHTML = `<div class="pov-stage pitch-body">${PITCH.map((s, i) => pitchSlide(s, L, i, PITCH.length)).join('')}</div>
      <div class="pov-bar"><button type="button" class="gbtn" data-act="pitch-prev" aria-label="←">‹</button><span class="pov-n"></span><button type="button" class="gbtn" data-act="pitch-next" aria-label="→">›</button><button type="button" class="btn ghost sm" data-act="pitch-exit">${PITCH_UI[L].exit}</button></div>`;
    document.body.appendChild(ov); document.body.classList.add('noscroll');
    try { ov.requestFullscreen?.(); } catch (_) { }
    pitchShow(0);
  },
  'pitch-next': () => pitchShow(PITCH_I + 1),
  'pitch-prev': () => pitchShow(PITCH_I - 1),
  'pitch-exit': () => { $('.pitch-ov')?.remove(); document.body.classList.remove('noscroll'); try { document.fullscreenElement && document.exitFullscreen(); } catch (_) { } },
});
document.addEventListener('keydown', e => {
  if (!$('.pitch-ov')) return;
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); pitchShow(PITCH_I + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); pitchShow(PITCH_I - 1); }
  if (e.key === 'Escape') ACT['pitch-exit']();
});
document.addEventListener('click', e => { const ov = e.target.closest('.pitch-ov'); if (!ov || e.target.closest('[data-act]')) return; const x = e.clientX / innerWidth; pitchShow(PITCH_I + (x < 0.3 ? -1 : 1)); });
