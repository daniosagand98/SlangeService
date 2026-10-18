# CrewControl – Slangeservice AS

Aplikacja do zarządzania ekipą w Norwegii: domy, auta, karty paliwowe, godziny pracy z podziałem na projekty, rotacje NO/PL, bilety lotnicze z dojazdem Skyss/prom, dokumenty, wiadomości i panel admina.

## Pliki

| Plik | Co to jest |
|---|---|
| `index.html` | Wersja właściwa – z logowaniem. Przy pierwszym otwarciu tworzysz konto admina. |
| `preview.html` | Podgląd **bez logowania** z danymi demo – do testowania. Przełącznik ról u góry. |
| `src/app.js`, `src/style.css`, `src/template.html` | Źródła. Po zmianach uruchom `node build.js`, który składa oba pliki HTML. |

## Role

- **Admin** – wszystko + panel admina (kto był online, logi, profil każdego, kopia zapasowa) + pasek u góry „Podgląd jako: Admin / Kierownik / Foreman / Pracownik”.
- **Kierownik** – domy, auta, karty, pracownicy, rotacje, bilety, dokumenty, wiadomości.
- **Foreman** – projekty, poprawianie godzin pracowników, wiadomości.
- **Pracownik** – swoje godziny, grafik, bilety, dokumenty, potwierdzanie karty paliwowej.

## Mapa domów / aut

Każdy dom (auto) to kafelek połączony z centrum, jak joby w GitHub Actions. Kierownik przeciąga ludzi z listy na kafelek (na telefonie: przytrzymaj i przeciągnij albo dotknij osobę, potem dom). Kafelki można przesuwać, mapę przybliżać (+/−, pinch, Ctrl+scroll), dopasować i otworzyć na pełnym ekranie. Układy: Drzewo (GitHub), Mapa myśli, Lista pionowa.

## Ważne – wersja testowa

Dane są zapisywane **lokalnie w przeglądarce** (localStorage + IndexedDB dla plików). Każde urządzenie ma więc osobne dane. Żeby pracownicy logowali się na swoich telefonach i widzieli te same dane, trzeba podpiąć wspólny backend (proponowany: Supabase). To następny krok.

Dojazdy liczone są przez publiczne API Entur (obejmuje Skyss i promy).
