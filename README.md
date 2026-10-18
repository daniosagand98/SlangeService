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
- **Księgowa** – wszystkie godziny pracowników (Zespół / Projekty), **Wypłaty**: stawki, rozliczenie miesiąca, potrącenia, status „wypłacone”, eksport CSV. Nie widzi mapy, aut, kart ani projektów.
- **Pracownik** – swoje godziny z szacowaną wypłatą i kalkulatorem, grafik, bilety, dokumenty, potwierdzanie karty paliwowej.

## Mapa (domy + auta + ludzie)

Jedna wspólna mapa: każdy dom to kafelek połączony z centrum (jak joby w GitHub Actions), a w środku domu są auta, które przy nim stoją. Auta bez domu mają własne kafelki. Kierownik przeciąga ludzi z listy: upuszczenie na **dom** = tam mieszka, na **auto** = tym autem jeździ, na listę = wypisanie (na telefonie: przytrzymaj i przeciągnij albo dotknij osobę, potem dom/auto). Lista ma zakładki „Bez domu”, „Bez auta”, „Wszyscy”. Kafelki można przesuwać, mapę przybliżać przyciskami +/−, dopasować i otworzyć na pełnym ekranie. Układy: Drzewo (GitHub), Mapa myśli, Lista pionowa.

## Sterowanie rotacjami

Menu → **Sterowanie rotacjami** (kierownik/admin; skróty także na Pulpicie i w „Grafik i rotacje”). Każda rotacja to karta: status NO/PL, następna zmiana, ludzie, przyciski Edytuj, **−1 / +1 tydzień** (przesuwa cały cykl), Bilety dla grupy, Wiadomość do grupy. Pod spodem przypisywanie ludzi do rotacji i plan „kto gdzie”.

## Wypłaty (księgowa / admin)

Stawka za godzinę jest wybierana w tej kolejności: **indywidualna stawka pracownika** (wygrywa zawsze) → **stawka projektu** → **stawka rotacji** → **stawka domyślna**. Zakładka „Stawki” ustawia wszystkie poziomy, a przycisk ✎ przy pracowniku – stawkę indywidualną, podatek %, dodatek, potrącenia i notatkę. Opcjonalnie nadgodziny (po X h dziennie, +Y%). Zakładka „Rozliczenie”: miesiąc, godziny × stawki, brutto/netto (szac.), znacznik „wypłacone”, szczegóły dni pracy, eksport CSV.
Pracownik w **Godziny pracy → Moje** widzi „Moja wypłata – szacunkowo” i może doliczyć planowane godziny.

## Moje konto i zgłoszenia

Kliknij swoje imię/avatar → **Moje konto**: zmiana hasła (z obecnym hasłem), zmiana e-maila, **Zgłoś błąd w aplikacji** (opis + maks. 3 zrzuty ekranu, trafia do admina), **Napisz do kierownika** (zgłoszenie / informacja / skarga, opcjonalnie **anonimowo**), **Moje zgłoszenia** (status i odpowiedź).
Menu → **Zgłoszenia**: kierownik widzi zgłoszenia, informacje i skargi (anonimowe jako „Anonimowo”), admin widzi wszystko, także błędy aplikacji i to, kto wysłał anonimową skargę.

## Stopka

Na dole każdej strony: „Created and designed by DWSystem” (link), wersja aplikacji i data/godzina aktualizacji – `node build.js` wpisuje ją automatycznie przy każdym budowaniu.

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
