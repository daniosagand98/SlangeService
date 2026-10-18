
/* =========================================================
   INSTRUKCJE – instalacja (iOS / Android), dla pracownika, dla szefa firmy (PL / NO / EN)
   Zrzuty ekranu i pozycje numerków generuje tools/guide_shots.py → guide/*.webp + src/guide-data.js
   ========================================================= */
const GUIDE_UI = {
  pl: { title: 'Instrukcje', sub: 'Instalacja i obsługa aplikacji – do pokazania lub wydrukowania', install: 'Instalacja na telefonie', worker: 'Dla pracownika', boss: 'Dla szefa firmy', print: 'Drukuj / zapisz PDF', lang: 'Język instrukcji', ios: 'iPhone (Safari)', android: 'Android (Chrome)', step: 'Krok', screen: 'Ekran', addr: 'Adres aplikacji' },
  no: { title: 'Bruksanvisning', sub: 'Installasjon og bruk av appen – for visning eller utskrift', install: 'Installer på telefonen', worker: 'For ansatte', boss: 'For daglig leder', print: 'Skriv ut / lagre PDF', lang: 'Språk', ios: 'iPhone (Safari)', android: 'Android (Chrome)', step: 'Steg', screen: 'Skjerm', addr: 'Appens adresse' },
  en: { title: 'User guides', sub: 'Installing and using the app – to show or print', install: 'Install on the phone', worker: 'For employees', boss: 'For the company owner', print: 'Print / save PDF', lang: 'Guide language', ios: 'iPhone (Safari)', android: 'Android (Chrome)', step: 'Step', screen: 'Screen', addr: 'App address' },
};
// kroki instalacji – mini-ekrany telefonu rysowane w HTML (hl = który element podświetlić)
const GUIDE_INSTALL = {
  ios: [
    { phone: 'safari', hl: 'url', t: { pl: ['Otwórz Safari', 'Wpisz adres aplikacji (poniżej) w Safari. Na iPhonie instalacja działa tylko z Safari.'], no: ['Åpne Safari', 'Skriv inn appens adresse (under) i Safari. På iPhone fungerer installasjon kun fra Safari.'], en: ['Open Safari', 'Type the app address (below) into Safari. On iPhone installing only works from Safari.'] } },
    { phone: 'safari', hl: 'share', t: { pl: ['Stuknij „Udostępnij”', 'Kwadrat ze strzałką w górę na dolnym pasku. W iOS 26: najpierw ••• obok adresu, potem „Udostępnij”.'], no: ['Trykk «Del»', 'Firkanten med pil opp nederst. I iOS 26: trykk først ••• ved adressen, deretter «Del».'], en: ['Tap “Share”', 'The square with an arrow pointing up at the bottom. On iOS 26: first tap ••• next to the address, then “Share”.'] } },
    { phone: 'sheet', hl: 'home', t: { pl: ['„Do ekranu początkowego”', 'Przewiń listę w dół i wybierz „Do ekranu początkowego”.'], no: ['«Legg til på Hjem-skjerm»', 'Bla ned i listen og velg «Legg til på Hjem-skjerm».'], en: ['“Add to Home Screen”', 'Scroll down the list and choose “Add to Home Screen”.'] } },
    { phone: 'add', hl: 'add', t: { pl: ['Stuknij „Dodaj”', 'Zostaw nazwę „Slangeservice” i włączone „Otwórz jako aplikacja internetowa”, potem „Dodaj”.'], no: ['Trykk «Legg til»', 'Behold navnet «Slangeservice» og «Åpne som nettapp» slått på, trykk så «Legg til».'], en: ['Tap “Add”', 'Keep the name “Slangeservice” and “Open as Web App” switched on, then tap “Add”.'] } },
    { phone: 'home', hl: 'icon', t: { pl: ['Gotowe – ikona na ekranie', 'Otwieraj aplikację zawsze z ikony. Zaloguj się loginem i hasłem od kierownika.'], no: ['Ferdig – ikon på skjermen', 'Åpne alltid appen fra ikonet. Logg inn med brukernavn og passord fra lederen.'], en: ['Done – icon on the screen', 'Always open the app from the icon. Log in with the username and password from your manager.'] } },
  ],
  android: [
    { phone: 'chrome', hl: 'url', t: { pl: ['Otwórz Chrome', 'Wpisz adres aplikacji (poniżej) w Chrome.'], no: ['Åpne Chrome', 'Skriv inn appens adresse (under) i Chrome.'], en: ['Open Chrome', 'Type the app address (below) into Chrome.'] } },
    { phone: 'chrome', hl: 'dots', t: { pl: ['Stuknij ⋮', 'Trzy kropki w prawym górnym rogu.'], no: ['Trykk ⋮', 'De tre prikkene øverst til høyre.'], en: ['Tap ⋮', 'The three dots in the top right corner.'] } },
    { phone: 'cmenu', hl: 'install', t: { pl: ['„Zainstaluj aplikację”', 'Albo „Dodaj do ekranu głównego” – zależnie od telefonu.'], no: ['«Installer app»', 'Eller «Legg til på startskjermen» – avhengig av telefonen.'], en: ['“Install app”', 'Or “Add to Home screen” – depending on the phone.'] } },
    { phone: 'cconfirm', hl: 'add', t: { pl: ['Potwierdź „Zainstaluj”', 'Ikona trafi na ekran i do listy aplikacji. Samsung Internet: ≡ → „Dodaj stronę do” → „Ekran startowy”.'], no: ['Bekreft «Installer»', 'Ikonet havner på skjermen og i applisten. Samsung Internet: ≡ → «Legg til side på» → «Startskjerm».'], en: ['Confirm “Install”', 'The icon appears on the home screen and in the app list. Samsung Internet: ≡ → “Add page to” → “Home screen”.'] } },
    { phone: 'home', hl: 'icon', t: { pl: ['Gotowe – ikona na ekranie', 'Otwieraj aplikację z ikony i zaloguj się.'], no: ['Ferdig – ikon på skjermen', 'Åpne appen fra ikonet og logg inn.'], en: ['Done – icon on the screen', 'Open the app from the icon and log in.'] } },
  ],
};
function phoneMock(kind, hl, os) {
  const on = k => hl === k ? 'hl' : '';
  const bar = os === 'ios' ? `<div class="pm-safari"><span class="pm-url ${on('url')}">slangeservice…</span><span class="pm-bot"><i>‹</i><i>›</i><i class="${on('share')}">⬆︎</i><i>▢</i><i>•••</i></span></div>` : `<div class="pm-chrome"><span class="pm-url ${on('url')}">slangeservice…</span><b class="${on('dots')}">⋮</b></div>`;
  const page = `<div class="pm-page"><div class="pm-logo"></div><div class="pm-l"></div><div class="pm-l s"></div><div class="pm-l"></div></div>`;
  const body = {
    safari: page + bar, chrome: bar + page,
    sheet: `${page}<div class="pm-sheet"><div class="pm-row">Kopiuj</div><div class="pm-row">Dodaj zakładkę</div><div class="pm-row ${on('home')}">＋ Do ekranu początkowego</div></div>`,
    add: `<div class="pm-add"><span>Anuluj</span><b class="${on('add')}">Dodaj</b></div><div class="pm-app"><div class="pm-ico"></div><span>Slangeservice</span></div><div class="pm-row tgl">Otwórz jako aplikacja <em></em></div>`,
    home: `<div class="pm-home">${[...Array(7)].map((_, i) => i === 5 ? `<div class="pm-hi ${on('icon')}"><div class="pm-ico"></div><span>Slange…</span></div>` : '<div class="pm-hi"><div class="pm-ico g"></div><span></span></div>').join('')}</div>`,
    cmenu: `${bar}${page}<div class="pm-menu"><div class="pm-row">Nowa karta</div><div class="pm-row">Historia</div><div class="pm-row ${on('install')}">⤓ Zainstaluj aplikację</div><div class="pm-row">Ustawienia</div></div>`,
    cconfirm: `${page}<div class="pm-dlg"><div class="pm-app"><div class="pm-ico"></div><span>Slangeservice</span></div><div class="pm-add"><span>Anuluj</span><b class="${on('add')}">Zainstaluj</b></div></div>`,
  }[kind];
  return `<div class="pmock ${os}"><div class="pm-notch"></div>${body}</div>`;
}
// ekrany instrukcji per ranga: id → zrzut guide/<id>.<lang>.webp; t[lang] = [tytuł, „gdzie kliknąć”, opis numerka 1, 2, …]
const GUIDE_ROLES = ['pracownik', 'foreman', 'kierownik', 'ksiegowa', 'admin'];
const GUIDE = {
  pracownik: [
    { id: 'w-dash', t: {
      pl: ['Pulpit', 'Otwiera się po zalogowaniu', 'Twój status: Norwegia / Polska i dni do zmiany.', 'Szybki zapis dzisiejszych godzin.', 'Karta paliwowa dla Ciebie – potwierdź odbiór.', 'Twój dom i auto.', 'Dolne menu: Pulpit, Godziny, Grafik, Bilety, Więcej.'],
      no: ['Oversikt', 'Åpnes etter innlogging', 'Din status: Norge / Polen og dager til bytte.', 'Rask registrering av dagens timer.', 'Drivstoffkort til deg – bekreft mottak.', 'Ditt hus og din bil.', 'Meny nederst: Oversikt, Timer, Plan, Billetter, Mer.'],
      en: ['Dashboard', 'Opens after logging in', 'Your status: Norway / Poland and days to the change.', 'Quickly log today’s hours.', 'Fuel card for you – confirm receipt.', 'Your house and car.', 'Bottom menu: Dashboard, Hours, Schedule, Tickets, More.'] } },
    { id: 'w-menu', t: {
      pl: ['Menu „Więcej”', 'Dolne menu → Więcej', 'Wszystkie zakładki.', 'Twoje konto (dotknij imienia).', 'Język: Polski / Norsk / English.'],
      no: ['Menyen «Mer»', 'Meny nederst → Mer', 'Alle faner.', 'Kontoen din (trykk på navnet).', 'Språk: Polski / Norsk / English.'],
      en: ['“More” menu', 'Bottom menu → More', 'All sections.', 'Your account (tap your name).', 'Language: Polski / Norsk / English.'] } },
    { id: 'w-hours', t: {
      pl: ['Wpisz godziny', 'Dolne menu → Godziny', 'Data, od – do. Przerwa liczy się sama (od 10 h: 1 h, krócej 0,5 h).', 'Ile godzin na którym projekcie.', 'Zapisz dzień.', 'Suma miesiąca i projekty.'],
      no: ['Registrer timer', 'Meny nederst → Timer', 'Dato, fra – til. Pausen trekkes automatisk (fra 10 t: 1 t, ellers 0,5 t).', 'Timer per prosjekt.', 'Lagre dagen.', 'Sum for måneden og prosjekter.'],
      en: ['Log hours', 'Bottom menu → Hours', 'Date, from – to. The break is automatic (10 h or more: 1 h, otherwise 0.5 h).', 'Hours per project.', 'Save the day.', 'Month total and projects.'] } },
    { id: 'w-pay', t: {
      pl: ['Moja wypłata', 'Godziny → przewiń w dół', 'Ile dostaniesz na rękę (szacunkowo).', 'Rozpisanie: projekty × stawki, podatek.', 'Kalkulator: dopisz planowane godziny.'],
      no: ['Min lønn', 'Timer → bla ned', 'Hva du får utbetalt (anslag).', 'Spesifikasjon: prosjekter × satser, skatt.', 'Kalkulator: legg til planlagte timer.'],
      en: ['My pay', 'Hours → scroll down', 'Your take-home pay (estimate).', 'Breakdown: projects × rates, tax.', 'Calculator: add planned hours.'] } },
    { id: 'w-rota', t: {
      pl: ['Grafik', 'Dolne menu → Grafik', 'Status dziś i dni do wyjazdu / przyjazdu.', 'Kalendarz: NO = Norwegia, PL = Polska.'],
      no: ['Turnusplan', 'Meny nederst → Plan', 'Status i dag og dager til reise.', 'Kalender: NO = Norge, PL = Polen.'],
      en: ['Schedule', 'Bottom menu → Schedule', 'Status today and days until travel.', 'Calendar: NO = Norway, PL = Poland.'] } },
    { id: 'w-tickets', t: {
      pl: ['Bilety', 'Dolne menu → Bilety', 'Twój lot: data, godziny, numer.', 'Plik biletu – dotknij, żeby otworzyć.', 'Dojazd na lotnisko (Skyss, prom).'],
      no: ['Billetter', 'Meny nederst → Billetter', 'Flyet ditt: dato, tider, nummer.', 'Billettfil – trykk for å åpne.', 'Reise til flyplassen (Skyss, ferje).'],
      en: ['Tickets', 'Bottom menu → Tickets', 'Your flight: date, times, number.', 'Ticket file – tap to open.', 'Trip to the airport (Skyss, ferry).'] } },
    { id: 'w-cards', t: {
      pl: ['Karta paliwowa', 'Więcej → Karty paliwowe', 'Potwierdź, że masz kartę.', 'Historia przekazań.'],
      no: ['Drivstoffkort', 'Mer → Drivstoffkort', 'Bekreft at du har kortet.', 'Historikk over overføringer.'],
      en: ['Fuel card', 'More → Fuel cards', 'Confirm you have the card.', 'Hand-over history.'] } },
    { id: 'w-msgs', t: {
      pl: ['Wiadomości', 'Więcej → Wiadomości', 'Przetłumaczone na Twój język. „Pokaż oryginał” = tekst nadawcy.'],
      no: ['Meldinger', 'Mer → Meldinger', 'Oversatt til ditt språk. «Vis original» = avsenderens tekst.'],
      en: ['Messages', 'More → Messages', 'Translated into your language. “Show original” = sender’s text.'] } },
    { id: 'w-account', t: {
      pl: ['Moje konto', 'Więcej → Twoje imię', 'Język – jedno dotknięcie.', 'Hasło i e-mail.', 'Napisz do kierownika (także anonimowo).', 'Problem z autem.', 'Błąd w aplikacji.'],
      no: ['Min konto', 'Mer → navnet ditt', 'Språk – ett trykk.', 'Passord og e-post.', 'Skriv til lederen (også anonymt).', 'Problem med bilen.', 'Feil i appen.'],
      en: ['My account', 'More → your name', 'Language – one tap.', 'Password and e-mail.', 'Write to the manager (also anonymously).', 'Car problem.', 'App bug.'] } },
    { id: 'w-anon', t: {
      pl: ['Skarga anonimowa', 'Moje konto → Napisz do kierownika', 'Rodzaj: zgłoszenie, informacja, skarga.', 'Temat i treść.', '„Wyślij anonimowo” – kierownik nie widzi, kto pisze.', 'Do 3 zdjęć.'],
      no: ['Anonym klage', 'Min konto → Skriv til lederen', 'Type: henvendelse, informasjon, klage.', 'Emne og tekst.', '«Send anonymt» – lederen ser ikke hvem som skriver.', 'Inntil 3 bilder.'],
      en: ['Anonymous complaint', 'My account → Write to the manager', 'Type: request, information, complaint.', 'Subject and text.', '“Send anonymously” – the manager does not see who wrote it.', 'Up to 3 photos.'] } },
    { id: 'w-carprob', t: {
      pl: ['Problem z autem', 'Moje konto → Zgłoś problem z autem', 'Które auto.', 'Co się dzieje.', 'Opis (+ zdjęcia).', '„Pilne”, jeśli nie da się jechać.'],
      no: ['Problem med bilen', 'Min konto → Meld problem med bil', 'Hvilken bil.', 'Hva er galt.', 'Beskrivelse (+ bilder).', '«Haster» hvis bilen ikke kan kjøres.'],
      en: ['Car problem', 'My account → Report a car problem', 'Which car.', 'What is wrong.', 'Description (+ photos).', '“Urgent” if the car cannot be driven.'] } },
  ],
  foreman: [
    { id: 'f-team', t: {
      pl: ['Godziny zespołu', 'Menu → Godziny pracy → Zespół', 'Zakładki Zespół / Projekty i miesiąc.', 'Dodaj godziny za pracownika, eksport CSV.', 'Dotknij osoby, żeby poprawić jej wpisy.'],
      no: ['Teamets timer', 'Meny → Arbeidstimer → Team', 'Faner Team / Prosjekter og måned.', 'Legg inn timer for ansatt, CSV-eksport.', 'Trykk på en person for å rette.'],
      en: ['Team hours', 'Menu → Work hours → Team', 'Team / Projects tabs and month.', 'Add hours for an employee, CSV export.', 'Tap a person to correct entries.'] } },
    { id: 'f-add', t: {
      pl: ['Godziny za pracownika', 'Godziny pracy → Dodaj godziny pracownikowi', 'Wybierz pracownika.', 'Data, od – do.', 'Projekty i zapis.'],
      no: ['Timer for ansatt', 'Arbeidstimer → Legg inn timer for ansatt', 'Velg ansatt.', 'Dato, fra – til.', 'Prosjekter og lagre.'],
      en: ['Hours for an employee', 'Work hours → Add hours for an employee', 'Choose the employee.', 'Date, from – to.', 'Projects and save.'] } },
    { id: 'f-proj', t: {
      pl: ['Projekty', 'Menu → Projekty', 'Każdy projekt: godziny w miesiącu i łącznie.', 'Nowy projekt.'],
      no: ['Prosjekter', 'Meny → Prosjekter', 'Hvert prosjekt: timer i måneden og totalt.', 'Nytt prosjekt.'],
      en: ['Projects', 'Menu → Projects', 'Each project: hours this month and in total.', 'New project.'] } },
    { id: 'f-msg', t: {
      pl: ['Wiadomość do ludzi', 'Menu → Wiadomości → Napisz', 'Do osoby, rotacji albo wszystkich.', 'Pisz po swojemu – tłumaczy się u odbiorcy.'],
      no: ['Melding til folk', 'Meny → Meldinger → Skriv', 'Til en person, en turnus eller alle.', 'Skriv på ditt språk – oversettes hos mottakeren.'],
      en: ['Message to people', 'Menu → Messages → Write', 'To a person, a rotation or everyone.', 'Write in your language – translated for the recipient.'] } },
  ],
  kierownik: [
    { id: 'k-dash', t: {
      pl: ['Pulpit kierownika', 'Otwiera się po zalogowaniu', 'Szybkie akcje.', 'Nowe konta i prośby o hasło.', 'Liczby: ludzie, Norwegia, łóżka, godziny.', 'Najbliższe przyjazdy i wyjazdy.', 'Auta: EU-kontroll, serwis.'],
      no: ['Lederens oversikt', 'Åpnes etter innlogging', 'Hurtigvalg.', 'Nye kontoer og passordforespørsler.', 'Tall: folk, Norge, senger, timer.', 'Neste ankomster og avreiser.', 'Biler: EU-kontroll, service.'],
      en: ['Manager dashboard', 'Opens after logging in', 'Quick actions.', 'New accounts and password requests.', 'Figures: people, Norway, beds, hours.', 'Upcoming arrivals and departures.', 'Cars: EU inspection, service.'] } },
    { id: 'k-map', t: {
      pl: ['Mapa: domy i auta', 'Menu → Mapa', 'Lista ludzi (bez domu / bez auta).', 'Upuść osobę na dom = mieszka tam.', 'Upuść na auto = jeździ nim.', 'Dodaj dom / auto.'],
      no: ['Kart: hus og biler', 'Meny → Kart', 'Liste over folk (uten hus / uten bil).', 'Slipp en person på et hus = bor der.', 'Slipp på en bil = kjører den.', 'Legg til hus / bil.'],
      en: ['Map: houses and cars', 'Menu → Map', 'People list (no house / no car).', 'Drop a person on a house = lives there.', 'Drop on a car = drives it.', 'Add house / car.'] } },
    { id: 'k-cars', t: {
      pl: ['Auta', 'Menu → Auta', 'Czerwona cyfra = zgłoszone problemy.', 'EU-kontroll i przebieg.', 'Lista problemów → „Zobacz i załatw”.'],
      no: ['Biler', 'Meny → Biler', 'Rødt tall = meldte problemer.', 'EU-kontroll og kilometerstand.', 'Problemliste → «Se og løs».'],
      en: ['Cars', 'Menu → Cars', 'Red number = reported problems.', 'EU inspection and mileage.', 'Problem list → “View and resolve”.'] } },
    { id: 'k-rot', t: {
      pl: ['Rotacje', 'Menu → Sterowanie rotacjami', 'Karta rotacji: cykl, następna zmiana, ludzie.', 'Edytuj, ±1 tydzień, bilety, wiadomość.', 'Nowa rotacja.'],
      no: ['Turnuser', 'Meny → Styr turnuser', 'Turnuskort: syklus, neste bytte, folk.', 'Rediger, ±1 uke, billetter, melding.', 'Ny turnus.'],
      en: ['Rotations', 'Menu → Manage rotations', 'Rotation card: cycle, next change, people.', 'Edit, ±1 week, tickets, message.', 'New rotation.'] } },
    { id: 'k-plan', t: {
      pl: ['Kto w której rotacji', 'Sterowanie rotacjami → przewiń w dół', 'Przeciągnij osobę do rotacji.', 'Plan tydzień po tygodniu.'],
      no: ['Hvem er i hvilken turnus', 'Styr turnuser → bla ned', 'Dra en person til en turnus.', 'Plan uke for uke.'],
      en: ['Who is in which rotation', 'Manage rotations → scroll down', 'Drag a person into a rotation.', 'Week-by-week plan.'] } },
    { id: 'k-tickets', t: {
      pl: ['Bilety', 'Menu → Bilety i dojazd', 'Wyślij bilety całej rotacji.', 'Bilety ludzi.', 'Dojazd na lotnisko.'],
      no: ['Billetter', 'Meny → Billetter og reise', 'Send billetter til hele turnusen.', 'Folks billetter.', 'Reise til flyplassen.'],
      en: ['Tickets', 'Menu → Tickets & travel', 'Send tickets to a whole rotation.', 'People’s tickets.', 'Trip to the airport.'] } },
    { id: 'k-people', t: {
      pl: ['Pracownicy', 'Menu → Pracownicy', 'Zatwierdź nowe konto (wybierz rangę).', 'Ustaw nowe hasło.', 'Profil pracownika.'],
      no: ['Ansatte', 'Meny → Ansatte', 'Godkjenn ny konto (velg rolle).', 'Sett nytt passord.', 'Ansattprofil.'],
      en: ['Employees', 'Menu → Employees', 'Approve a new account (pick a role).', 'Set a new password.', 'Employee profile.'] } },
    { id: 'k-reports', t: {
      pl: ['Zgłoszenia', 'Menu → Zgłoszenia', 'Otwarte / załatwione.', 'Skarga anonimowa – bez nazwiska.', 'Odpowiedz i „Załatwione”.'],
      no: ['Henvendelser', 'Meny → Henvendelser', 'Åpne / løste.', 'Anonym klage – uten navn.', 'Svar og «Løst».'],
      en: ['Reports', 'Menu → Reports', 'Open / resolved.', 'Anonymous complaint – no name.', 'Reply and “Resolved”.'] } },
    { id: 'k-backup', t: {
      pl: ['Kopie zapasowe', 'Menu → Kopie zapasowe', 'Cały program.', 'Jeden pracownik.', 'Wybrane części.', 'Przywróć z pliku.'],
      no: ['Sikkerhetskopi', 'Meny → Sikkerhetskopi', 'Hele programmet.', 'Én ansatt.', 'Valgte deler.', 'Gjenopprett fra fil.'],
      en: ['Backups', 'Menu → Backups', 'The whole program.', 'One employee.', 'Selected parts.', 'Restore from a file.'] } },
  ],
  ksiegowa: [
    { id: 'q-dash', t: {
      pl: ['Pulpit księgowej', 'Otwiera się po zalogowaniu', 'Rozliczenie wypłat – skrót.', 'Brutto i ile już wypłacono.', 'Menu: Godziny, Wypłaty, Wiadomości.'],
      no: ['Regnskapets oversikt', 'Åpnes etter innlogging', 'Lønnsoppgjør – snarvei.', 'Brutto og hvor mye som er utbetalt.', 'Meny: Timer, Lønn, Meldinger.'],
      en: ['Accountant dashboard', 'Opens after logging in', 'Payroll settlement – shortcut.', 'Gross and how much has been paid.', 'Menu: Hours, Payroll, Messages.'] } },
    { id: 'q-run', t: {
      pl: ['Rozliczenie miesiąca', 'Menu → Wypłaty → Rozliczenie', 'Miesiąc.', 'Suma: godziny, brutto, netto, wypłacone.', 'Pracownik: stawki, brutto, netto, „wypłacone”.', 'Eksport CSV.'],
      no: ['Månedsoppgjør', 'Meny → Lønn → Oppgjør', 'Måned.', 'Sum: timer, brutto, netto, utbetalt.', 'Ansatt: satser, brutto, netto, «utbetalt».', 'CSV-eksport.'],
      en: ['Monthly settlement', 'Menu → Payroll → Settlement', 'Month.', 'Totals: hours, gross, net, paid.', 'Employee: rates, gross, net, “paid”.', 'CSV export.'] } },
    { id: 'q-detail', t: {
      pl: ['Szczegóły wypłaty', 'Wypłaty → kliknij nazwisko', 'Projekty × stawki, podatek, netto.', 'Dni pracy z godzinami.'],
      no: ['Lønnsdetaljer', 'Lønn → klikk på navnet', 'Prosjekter × satser, skatt, netto.', 'Arbeidsdager med timer.'],
      en: ['Pay details', 'Payroll → click the name', 'Projects × rates, tax, net.', 'Working days with hours.'] } },
    { id: 'q-user', t: {
      pl: ['Ustawienia pracownika', 'Wypłaty → ✎ przy pracowniku', 'Stawka indywidualna (wygrywa zawsze).', 'Podatek %.', 'Dodatek i potrącenia.'],
      no: ['Innstillinger for ansatt', 'Lønn → ✎ ved den ansatte', 'Individuell sats (gjelder alltid først).', 'Skatt %.', 'Tillegg og trekk.'],
      en: ['Employee settings', 'Payroll → ✎ next to the employee', 'Individual rate (always wins).', 'Tax %.', 'Bonus and deductions.'] } },
    { id: 'q-rates', t: {
      pl: ['Stawki', 'Menu → Wypłaty → Stawki', 'Domyślna, waluta, podatek, nadgodziny.', 'Stawka rotacji.', 'Stawka projektu.', 'Indywidualne. Kolejność: indywidualna → projekt → rotacja → domyślna.'],
      no: ['Satser', 'Meny → Lønn → Satser', 'Standard, valuta, skatt, overtid.', 'Sats per turnus.', 'Sats per prosjekt.', 'Individuelle. Rekkefølge: individuell → prosjekt → turnus → standard.'],
      en: ['Rates', 'Menu → Payroll → Rates', 'Default, currency, tax, overtime.', 'Rate per rotation.', 'Rate per project.', 'Individual. Order: individual → project → rotation → default.'] } },
    { id: 'q-hours', t: {
      pl: ['Godziny pracowników', 'Menu → Godziny pracy', 'Zespół / Projekty i miesiąc.', 'Godziny każdego pracownika.'],
      no: ['Ansattes timer', 'Meny → Arbeidstimer', 'Team / Prosjekter og måned.', 'Timene til hver ansatt.'],
      en: ['Employee hours', 'Menu → Work hours', 'Team / Projects and month.', 'Every employee’s hours.'] } },
  ],
  admin: [
    { id: 'a-panel', t: {
      pl: ['Panel admina', 'Menu → Panel admina', 'Kto był online.', 'Instrukcje, prezentacja, kopie, resety hasła.', 'Wszystkie konta: edycja, hasło, kopia, blokada.', 'Logi.'],
      no: ['Adminpanel', 'Meny → Adminpanel', 'Hvem har vært pålogget.', 'Bruksanvisninger, presentasjon, kopier, passord.', 'Alle kontoer: rediger, passord, kopi, blokker.', 'Logg.'],
      en: ['Admin panel', 'Menu → Admin panel', 'Who has been online.', 'Guides, presentation, backups, password resets.', 'All accounts: edit, password, backup, block.', 'Logs.'] } },
    { id: 'a-preview', t: {
      pl: ['Podgląd jako', 'Pasek u góry (tylko admin)', 'Zobacz aplikację jako dowolna ranga.', 'Wybierz konkretną osobę.'],
      no: ['Vis som', 'Linjen øverst (kun admin)', 'Se appen som en hvilken som helst rolle.', 'Velg en bestemt person.'],
      en: ['View as', 'Bar at the top (admin only)', 'See the app as any role.', 'Pick a specific person.'] } },
    { id: 'a-reports', t: {
      pl: ['Zgłoszenia (admin)', 'Menu → Zgłoszenia', 'Także błędy aplikacji.', 'Autor skargi anonimowej – widzi tylko admin.', 'Odpowiedz / załatwione.'],
      no: ['Henvendelser (admin)', 'Meny → Henvendelser', 'Også feil i appen.', 'Avsender av anonym klage – kun synlig for admin.', 'Svar / løst.'],
      en: ['Reports (admin)', 'Menu → Reports', 'Including app bugs.', 'Author of an anonymous complaint – visible to the admin only.', 'Reply / resolved.'] } },
  ],
};
const GUIDE_INTRO = {
  pracownik: { pl: 'Codziennie wpisujesz godziny, sprawdzasz grafik, bilety i kartę paliwową. Wiadomości są w Twoim języku.', no: 'Hver dag registrerer du timer og sjekker plan, billetter og drivstoffkort. Meldingene er på ditt språk.', en: 'Every day you log hours and check your schedule, tickets and fuel card. Messages are in your language.' },
  foreman: { pl: 'Masz wszystko, co pracownik, plus: godziny całego zespołu, projekty i wiadomości do ludzi.', no: 'Du har alt en ansatt har, pluss: hele teamets timer, prosjekter og meldinger til folk.', en: 'You have everything an employee has, plus: the whole team’s hours, projects and messages to people.' },
  kierownik: { pl: 'Kontrolujesz pracowników rotacyjnych: domy, auta, rotacje, bilety, konta i zgłoszenia.', no: 'Du har kontroll på turnusarbeiderne: hus, biler, turnuser, billetter, kontoer og henvendelser.', en: 'You control the rotation workers: houses, cars, rotations, tickets, accounts and reports.' },
  ksiegowa: { pl: 'Widzisz godziny wszystkich pracowników i rozliczasz wypłaty według stawek.', no: 'Du ser alle ansattes timer og gjør opp lønn etter satsene.', en: 'You see every employee’s hours and settle pay according to the rates.' },
  admin: { pl: 'Masz wszystko, co kierownik i księgowa, plus kontrolę nad kontami, kopiami i logami.', no: 'Du har alt leder og regnskap har, pluss kontroll over kontoer, kopier og logger.', en: 'You have everything the manager and accountant have, plus control over accounts, backups and logs.' },
};
const GUIDE_ROLE_LABEL = { pracownik: { pl: 'Pracownik', no: 'Ansatt', en: 'Employee' }, foreman: { pl: 'Foreman', no: 'Formann', en: 'Foreman' }, kierownik: { pl: 'Kierownik', no: 'Leder', en: 'Manager' }, ksiegowa: { pl: 'Księgowa', no: 'Regnskap', en: 'Accountant' }, admin: { pl: 'Admin', no: 'Admin', en: 'Admin' } };
// kto widzi które instrukcje
const guideRolesFor = () => ({ admin: GUIDE_ROLES, kierownik: ['pracownik', 'foreman', 'kierownik'], ksiegowa: ['ksiegowa'], foreman: ['pracownik', 'foreman'] })[ME.role] || ['pracownik'];
const appUrl = () => location.protocol.startsWith('http') ? location.origin + location.pathname.replace(/preview\.html$/, '') : 'https://daniosagand98.github.io/SlangeService/';
function guideScreen(s, L, i, total) {
  const t = s.t[L], key = s.id + '.' + L, img = GUIDE_IMG[key] || GUIDE_IMG[s.id + '.pl'], m = GUIDE_MARKS[key] || GUIDE_MARKS[s.id + '.pl'] || {};
  const marks = m.marks || [];
  return `<section class="gscreen anim" style="--i:${Math.min(i, 6)}">
    <div class="gs-h"><span class="gs-n">${i + 1}/${total}</span><div><h3>${esc(t[0])}</h3><div class="gs-path">${ic('target')} ${esc(t[1])}</div></div></div>
    <div class="gs-body ${m.w > m.h ? 'wide' : 'tall'}">
      <figure class="gshot" style="aspect-ratio:${m.w || 390}/${m.h || 844}">${img ? `<img src="${img}" alt="${esc(t[0])}" loading="lazy">` : `<div class="gs-missing">${ic('eye')}</div>`}
        ${marks.map((p, k) => t[k + 2] && p ? `<span class="gmark" style="left:${p[0]}%;top:${p[1]}%">${k + 1}</span>` : '').join('')}</figure>
      <ol class="gs-list">${t.slice(2).map((d, k) => `<li><span class="gmark static">${k + 1}</span><span>${esc(d)}</span></li>`).join('')}</ol>
    </div></section>`;
}
VIEWS.guide = () => {
  const L = LANGS[ST.guideLang] ? ST.guideLang : langOf(), U = GUIDE_UI[L];
  const tabs = [['install', U.install], ...guideRolesFor().map(r => [r, GUIDE_ROLE_LABEL[r][L]])];
  const tab = tabs.find(x => x[0] === ST.guideTab) ? ST.guideTab : (tabs.find(x => x[0] === ME.role) ? ME.role : 'install');
  let html = `<div class="tabs gtabs noprint notr">${tabs.map(([k, l]) => `<button type="button" class="${tab === k ? 'on' : ''}" data-act="guide-tab" data-k="${k}">${l}</button>`).join('')}<span class="grow"></span>
    <div class="seg glang" title="${U.lang}">${Object.entries(LANGS).map(([k, l]) => `<button type="button" class="${L === k ? 'on' : ''}" data-act="guide-lang" data-k="${k}">${l.flag} ${k.toUpperCase()}</button>`).join('')}</div>
    <button type="button" class="btn ghost sm" data-act="guide-print">${ic('dl')} ${U.print}</button></div>
    <div class="gprint-h"><b>CrewControl · ${esc(COMPANY)}</b> – ${esc(tabs.find(x => x[0] === tab)[1])}</div>`;
  if (tab === 'install') {
    const col = os => `<div class="card ginst anim"><div class="card-h"><h3>${os === 'ios' ? '' : ''}${U[os]}</h3></div>
      <div class="gi-steps">${GUIDE_INSTALL[os].map((s, k) => `<div class="gi-step">${phoneMock(s.phone, s.hl, os)}<div><div class="gi-n">${U.step} ${k + 1}</div><b>${esc(s.t[L][0])}</b><p class="muted small">${esc(s.t[L][1])}</p></div></div>`).join('')}</div></div>`;
    html += `<div class="card gaddr anim"><div class="row gap">${ic('pin')}<div class="grow"><div class="muted small">${U.addr}</div><b class="url">${esc(appUrl())}</b></div></div></div>
      <div class="grid2">${col('ios')}${col('android')}</div>`;
  } else {
    const list = GUIDE[tab];
    html += `<div class="card gintro anim"><p>${esc(GUIDE_INTRO[tab][L])}</p></div>` + list.map((s, i) => guideScreen(s, L, i, list.length)).join('');
  }
  return { title: U.title, sub: U.sub, html };
};
