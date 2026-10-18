# CrewControl – Slangeservice AS

Aplikacja do zarządzania ekipą w Norwegii: domy, auta, karty paliwowe, godziny pracy z podziałem na projekty, rotacje NO/PL, bilety lotnicze z dojazdem Skyss/prom, dokumenty, wiadomości i panel admina.

## Pliki

| Plik | Co to jest |
|---|---|
| `index.html` | Wersja właściwa – z logowaniem. Przy pierwszym otwarciu tworzysz konto admina. |
| `preview.html` | Podgląd **bez logowania** z danymi demo – do testowania. Przełącznik ról u góry. |
| `src/app.js`, `src/style.css`, `src/template.html` | Źródła. Po zmianach uruchom `node build.js`, który składa oba pliki HTML. |
| `icons/`, `manifest.webmanifest`, `sw.js` | Ikona aplikacji (iPhone/Android), opis do instalacji i tryb offline. |

## Role

- **Admin** – wszystko + panel admina (kto był online, logi, profil każdego, kopia zapasowa) + pasek u góry „Podgląd jako: Admin / Kierownik / Foreman / Pracownik”.
- **Kierownik** – domy, auta, karty, pracownicy, rotacje, bilety, dokumenty, wiadomości.
- **Foreman** – projekty, poprawianie godzin pracowników, wiadomości.
- **Pracownik** – swoje godziny, grafik, bilety, dokumenty, potwierdzanie karty paliwowej.

## Mapa domów / aut

Każdy dom (auto) to kafelek połączony z centrum, jak joby w GitHub Actions. Kierownik przeciąga ludzi z listy na kafelek (na telefonie: przytrzymaj i przeciągnij albo dotknij osobę, potem dom). Kafelki można przesuwać, mapę przybliżać przyciskami +/− (zoom dwoma palcami jest wyłączony), dopasować i otworzyć na pełnym ekranie. Układy: Drzewo (GitHub), Mapa myśli, Lista pionowa.

## Logowanie i konta

- **Zaloguj się** / **Załóż konto** – osobne zakładki. Pierwsze konto na urządzeniu zostaje adminem i dostaje **kod odzyskiwania hasła** (zapisz go). Kolejne konta czekają na akceptację kierownika/admina (Pracownicy → „Nowe konta”).
- **Nie pamiętam hasła** – z kodem odzyskiwania ustawiasz nowe hasło od razu; bez kodu wysyłasz prośbę, a kierownik/admin ustawia nowe hasło (Pracownicy → „Prośby o reset hasła”).
- **Wczytaj kopię zapasową** na ekranie logowania – przeniesienie kont i danych z innego urządzenia/przeglądarki.

## Dodanie aplikacji do ekranu telefonu

Adres: `https://daniosagand98.github.io/SlangeService/` (w aplikacji: Moje konto → „Dodaj do ekranu” – instrukcja krok po kroku).

**iPhone (Safari)**
1. Otwórz adres w Safari.
2. Stuknij **Udostępnij** (kwadrat ze strzałką w górę). W iOS 26 najpierw **•••** obok adresu, potem **Udostępnij**.
3. Wybierz **„Do ekranu początkowego”**.
4. Zostaw włączone „Otwórz jako aplikacja internetowa” i stuknij **Dodaj**.

**Android (Chrome)**
1. Otwórz adres w Chrome.
2. Stuknij **⋮** (prawy górny róg).
3. Wybierz **„Zainstaluj aplikację”** lub **„Dodaj do ekranu głównego”** i potwierdź.

Samsung Internet: **≡ → „Dodaj stronę do” → „Ekran startowy”**.

Ikony aplikacji są w `icons/` (zrobione z logo Slangeservice AS), opis aplikacji w `manifest.webmanifest`, a `sw.js` pozwala otworzyć aplikację bez internetu (zawsze pobiera najnowszą wersję, gdy internet jest).

## Ważne – wersja testowa

Dane są zapisywane **lokalnie w przeglądarce** (localStorage + IndexedDB dla plików). Każde urządzenie ma więc osobne dane – na iPhonie także aplikacja z ikony ma osobne dane niż Safari (przenieś je kopią zapasową). Żeby pracownicy logowali się na swoich telefonach i widzieli te same dane, trzeba podpiąć wspólny backend (proponowany: Supabase). To następny krok.

Dojazdy liczone są przez publiczne API Entur (obejmuje Skyss i promy).
