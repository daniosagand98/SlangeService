// Słownik tłumaczeń interfejsu: POLSKI ¦ NORSK ¦ ENGLISH (jedna linia = jeden tekst).
// {0}, {1}… = liczby, daty, godziny wstawiane przez aplikację. Brakujące teksty pokazuje: python3 tools/i18n_crawl.py no
const I18N_RAW = `
Pulpit ¦ Oversikt ¦ Dashboard
Godziny pracy ¦ Arbeidstimer ¦ Work hours
Grafik i rotacje ¦ Turnus og plan ¦ Schedule & rotations
Sterowanie rotacjami ¦ Styr turnuser ¦ Manage rotations
Wypłaty ¦ Lønn ¦ Payroll
Mapa ¦ Kart ¦ Map
Auta ¦ Biler ¦ Cars
Karty paliwowe ¦ Drivstoffkort ¦ Fuel cards
Bilety i dojazd ¦ Billetter og reise ¦ Tickets & travel
Dokumenty ¦ Dokumenter ¦ Documents
Wiadomości ¦ Meldinger ¦ Messages
Zgłoszenia ¦ Henvendelser ¦ Reports
Projekty ¦ Prosjekter ¦ Projects
Pracownicy ¦ Ansatte ¦ Employees
Kopie zapasowe ¦ Sikkerhetskopi ¦ Backups
Instrukcje ¦ Bruksanvisning ¦ User guides
Panel admina ¦ Adminpanel ¦ Admin panel
Prezentacja ¦ Presentasjon ¦ Presentation
Więcej ¦ Mer ¦ More
Menu ¦ Meny ¦ Menu
Admin ¦ Admin ¦ Admin
Kierownik ¦ Leder ¦ Manager
Foreman ¦ Formann ¦ Foreman
Księgowa ¦ Regnskap ¦ Accountant
Pracownik ¦ Ansatt ¦ Employee
Norwegia ¦ Norge ¦ Norway
Polska ¦ Polen ¦ Poland
brak rotacji ¦ ingen turnus ¦ no rotation
Zapisz ¦ Lagre ¦ Save
Usuń ¦ Slett ¦ Delete
Anuluj ¦ Avbryt ¦ Cancel
Tak ¦ Ja ¦ Yes
Potwierdź ¦ Bekreft ¦ Confirm
Zamknij ¦ Lukk ¦ Close
Edytuj ¦ Rediger ¦ Edit
Dodaj ¦ Legg til ¦ Add
Otwórz ¦ Åpne ¦ Open
Pobierz ¦ Last ned ¦ Download
Wyślij ¦ Send ¦ Send
Wróć ¦ Tilbake ¦ Back
Przejdź ¦ Gå til ¦ Go
Zarządzaj ¦ Administrer ¦ Manage
Wszyscy ¦ Alle ¦ Everyone
Wszystkie ¦ Alle ¦ All
Moje ¦ Mine ¦ Mine
Zespół ¦ Team ¦ Team
Ty ¦ Du ¦ You
Status ¦ Status ¦ Status
Data ¦ Dato ¦ Date
Od ¦ Fra ¦ From
Do ¦ Til ¦ To
Opis ¦ Beskrivelse ¦ Description
Nazwa ¦ Navn ¦ Name
Notatka ¦ Notat ¦ Note
Temat ¦ Emne ¦ Subject
Treść ¦ Tekst ¦ Message
Telefon ¦ Telefon ¦ Phone
E-mail ¦ E-post ¦ E-mail
Login ¦ Brukernavn ¦ Username
Hasło ¦ Passord ¦ Password
Ranga ¦ Rolle ¦ Role
Rotacja ¦ Turnus ¦ Rotation
Rotacje ¦ Turnuser ¦ Rotations
Dom ¦ Hus ¦ House
Domy ¦ Hus ¦ Houses
Auto ¦ Bil ¦ Car
Projekt ¦ Prosjekt ¦ Project
Plik ¦ Fil ¦ File
Karta ¦ Kort ¦ Card
Grupa ¦ Gruppe ¦ Group
Osoba ¦ Person ¦ Person
Kto ¦ Hvem ¦ Who
Kolor ¦ Farge ¦ Colour
Miejsce ¦ Sted ¦ Place
Miejsca ¦ Seter ¦ Seats
Paliwo ¦ Drivstoff ¦ Fuel
Przebieg ¦ Kilometerstand ¦ Mileage
Spalanie ¦ Forbruk ¦ Consumption
Licznik ¦ Kilometerteller ¦ Odometer
Historia ¦ Historikk ¦ History
Tankowanie ¦ Tanking ¦ Refuelling
Litry ¦ Liter ¦ Litres
Waluta ¦ Valuta ¦ Currency
Stawka ¦ Sats ¦ Rate
Stawki ¦ Satser ¦ Rates
Brutto ¦ Brutto ¦ Gross
Razem ¦ Totalt ¦ Total
Godziny ¦ Timer ¦ Hours
Wpisy ¦ Registreringer ¦ Entries
Kierunek ¦ Retning ¦ Direction
Wylot ¦ Avreise ¦ Departure
Przylot ¦ Ankomst ¦ Arrival
Nr lotu ¦ Flynr. ¦ Flight no.
Data lotu ¦ Flydato ¦ Flight date
Bilety ¦ Billetter ¦ Tickets
Archiwum ¦ Arkiv ¦ Archive
Nadchodzące ¦ Kommende ¦ Upcoming
Problem ¦ Problem ¦ Problem
Inne ¦ Annet ¦ Other
Hamulce ¦ Bremser ¦ Brakes
Światła ¦ Lys ¦ Lights
Opony / koła ¦ Dekk / hjul ¦ Tyres / wheels
Silnik / nie odpala ¦ Motor / starter ikke ¦ Engine / won't start
Uszkodzenie / stłuczka ¦ Skade / kollisjon ¦ Damage / collision
Lampka na desce ¦ Varsellampe i dashbordet ¦ Warning light on the dashboard
Co się dzieje ¦ Hva er galt ¦ What is wrong
Pilne – auto nie nadaje się do jazdy ¦ Haster – bilen kan ikke kjøres ¦ Urgent – the car is not safe to drive
Problem z autem ¦ Problem med bilen ¦ Car problem
Zgłoś ¦ Meld ¦ Report
Zgłoś problem ¦ Meld problem ¦ Report a problem
Zgłoś problem z autem ¦ Meld problem med bil ¦ Report a car problem
Zgłoś problem z tym autem ¦ Meld problem med denne bilen ¦ Report a problem with this car
Usterka, opony, światła, szkoda ¦ Feil, dekk, lys, skade ¦ Fault, tyres, lights, damage
usterka, opony, światła, szkoda ¦ feil, dekk, lys, skade ¦ fault, tyres, lights, damage
Zgłoszono problem z autem ¦ Problem med bilen er meldt ¦ Car problem reported
Wybierz auto i opisz problem ¦ Velg bil og beskriv problemet ¦ Pick the car and describe the problem
Brak zgłoszonych problemów ¦ Ingen meldte problemer ¦ No reported problems
Zgłoszone problemy ¦ Meldte problemer ¦ Reported problems
Problemy ¦ Problemer ¦ Problems
Zobacz i załatw ¦ Se og løs ¦ View and resolve
Brak aut w aplikacji ¦ Ingen biler i appen ¦ No cars in the app
diesel ¦ diesel ¦ diesel
benzyna ¦ bensin ¦ petrol
elektryk ¦ elektrisk ¦ electric
hybryda ¦ hybrid ¦ hybrid
pn ¦ ma ¦ Mon
wt ¦ ti ¦ Tue
śr ¦ on ¦ Wed
cz ¦ to ¦ Thu
pt ¦ fr ¦ Fri
sb ¦ lø ¦ Sat
nd ¦ sø ¦ Sun
h ¦ t ¦ h
dni ¦ dager ¦ days
dzień ¦ dag ¦ day
tydzień ¦ uke ¦ week
dziś ¦ i dag ¦ today
teraz ¦ nå ¦ now
nigdy ¦ aldri ¦ never
online ¦ pålogget ¦ online
{0} min temu ¦ {0} min siden ¦ {0} min ago
{0} h temu ¦ {0} t siden ¦ {0} h ago
{0} dni temu ¦ {0} dager siden ¦ {0} days ago
za {0} dni ¦ om {0} dager ¦ in {0} days
{0} dni ¦ {0} dager ¦ {0} days
{0} h ¦ {0} t ¦ {0} h
{0} tyg. ¦ {0} uker ¦ {0} wk
{0} tydz. ¦ {0} uke ¦ {0} wk
− {0} tydz. ¦ − {0} uke ¦ − {0} wk
{0} os. ¦ {0} pers. ¦ {0} ppl
{0} km ¦ {0} km ¦ {0} km
{0} NOK ¦ {0} NOK ¦ {0} NOK
− {0} NOK ¦ − {0} NOK ¦ − {0} NOK
{0} wpisów ¦ {0} registreringer ¦ {0} entries
wpisów ¦ registreringer ¦ entries
{0} dni pracy ¦ {0} arbeidsdager ¦ {0} working days
dni pracy ¦ arbeidsdager ¦ working days
{0} wolne ¦ {0} ledige ¦ {0} free
{0} wolne miejsce ¦ {0} ledig plass ¦ {0} free seat
wolne miejsce ¦ ledig plass ¦ free seat
wolne łóżko ¦ ledig seng ¦ free bed
{0} l · {1} kr ¦ {0} l · {1} kr ¦ {0} l · {1} kr
{0} l/{1} ¦ {0} l/{1} ¦ {0} l/{1}
l/100 ¦ l/100 ¦ l/100
{0}/{1} tyg. ¦ {0}/{1} uker ¦ {0}/{1} wk
{0}/{1} tyg. · teraz NO ¦ {0}/{1} uker · nå NO ¦ {0}/{1} wk · now NO
{0}/{1} tyg. · teraz PL ¦ {0}/{1} uker · nå PL ¦ {0}/{1} wk · now PL
tyg. · teraz ¦ uker · nå ¦ wk · now
tyg. NO ¦ uker NO ¦ wk NO
tyg. PL ¦ uker PL ¦ wk PL
{0} tyg. NO / {1} tyg. PL ¦ {0} uker NO / {1} uker PL ¦ {0} wk NO / {1} wk PL
{0} – NO ¦ {0} – NO ¦ {0} – NO
{0} – PL ¦ {0} – PL ¦ {0} – PL
t{0} ¦ u{0} ¦ w{0}
z {0} ¦ av {0} ¦ of {0}
przerwa {0} h ¦ pause {0} t ¦ break {0} h
−{0} h przerwy ¦ −{0} t pause ¦ −{0} h break
min. {0} znaki ¦ min. {0} tegn ¦ min. {0} characters
oktober {0} ¦ oktober {0} ¦ October {0}
DEMO – zobacz jako ¦ DEMO – vis som ¦ DEMO – view as
wersja demo (przykładowe dane ¦ demoversjon (eksempeldata ¦ demo version (sample data
Slangeservice AS · wersja demo (przykładowe dane ¦ Slangeservice AS · demoversjon (eksempeldata ¦ Slangeservice AS · demo version (sample data
PODGLĄD (bez logowania ¦ FORHÅNDSVISNING (uten innlogging ¦ PREVIEW (no login
Podgląd jako ¦ Vis som ¦ View as
Wróć do siebie ¦ Tilbake til meg ¦ Back to me
tryb podglądu (dane demo, lokalnie ¦ forhåndsvisning (demodata, lokalt ¦ preview mode (demo data, local
dane zapisywane lokalnie w tej przeglądarce ¦ data lagres lokalt i denne nettleseren ¦ data saved locally in this browser
Slangeservice AS · tryb podglądu (dane demo, lokalnie ¦ Slangeservice AS · forhåndsvisning (demodata, lokalt ¦ Slangeservice AS · preview mode (demo data, local
Created and designed by ¦ Created and designed by ¦ Created and designed by
CrewControl wersja {0}.{1} · zaktualizowano {2}, godz. {3} ¦ CrewControl versjon {0}.{1} · oppdatert {2}, kl. {3} ¦ CrewControl version {0}.{1} · updated {2}, {3}
Błąd zapisu – brak miejsca w przeglądarce ¦ Kunne ikke lagre – ikke nok plass i nettleseren ¦ Save failed – not enough space in the browser
Plik nie istnieje na tym urządzeniu ¦ Filen finnes ikke på denne enheten ¦ The file does not exist on this device
Kod odzyskiwania hasła ¦ Gjenopprettingskode for passord ¦ Password recovery code
Konto administratora gotowe. ¦ Administratorkontoen er klar. ¦ The administrator account is ready.
Zapisz ten kod w bezpiecznym miejscu (np. zrób zrzut ekranu). Pozwoli Ci ustawić nowe hasło, jeśli zapomnisz obecnego. ¦ Lagre denne koden på et trygt sted (f.eks. ta et skjermbilde). Med den kan du sette nytt passord hvis du glemmer det. ¦ Keep this code somewhere safe (e.g. take a screenshot). It lets you set a new password if you forget the current one.
Kod pokazuje się tylko raz. Nowy wygenerujesz w „Moje konto”. ¦ Koden vises bare én gang. En ny lager du i «Min konto». ¦ The code is shown only once. You can generate a new one in “My account”.
Zapisałem kod ¦ Jeg har lagret koden ¦ I have saved the code
Na tym urządzeniu nie ma jeszcze żadnych kont. Jeśli konto masz już gdzie indziej (np. w Safari), wczytaj kopię zapasową poniżej. ¦ Det finnes ingen kontoer på denne enheten ennå. Har du allerede en konto et annet sted (f.eks. i Safari), last inn sikkerhetskopien nedenfor. ¦ There are no accounts on this device yet. If you already have an account elsewhere (e.g. in Safari), load the backup below.
Zaloguj się ¦ Logg inn ¦ Log in
Nie pamiętam hasła ¦ Glemt passord ¦ Forgot password
Pierwsze konto na tym urządzeniu zostanie ¦ Den første kontoen på denne enheten blir ¦ The first account on this device becomes
Po założeniu konto czeka na akceptację kierownika lub admina. ¦ Etter registrering venter kontoen på godkjenning fra leder eller admin. ¦ After sign-up the account waits for approval by a manager or admin.
Imię i nazwisko ¦ Fullt navn ¦ Full name
Powtórz hasło ¦ Gjenta passord ¦ Repeat password
Powtórz ¦ Gjenta ¦ Repeat
Utwórz konto admina ¦ Opprett adminkonto ¦ Create admin account
Załóż konto ¦ Opprett konto ¦ Create account
Rejestracja ¦ Registrering ¦ Sign up
Wróć do logowania ¦ Tilbake til innlogging ¦ Back to login
Reset hasła ¦ Tilbakestill passord ¦ Reset password
Masz kod odzyskiwania? Ustaw nowe hasło od razu. ¦ Har du gjenopprettingskode? Sett nytt passord med en gang. ¦ Have a recovery code? Set a new password right away.
Kod odzyskiwania ¦ Gjenopprettingskode ¦ Recovery code
Nowe hasło ¦ Nytt passord ¦ New password
Ustaw nowe hasło ¦ Sett nytt passord ¦ Set new password
Nie masz kodu? Wyślij prośbę – kierownik albo admin ustawi Ci nowe hasło. ¦ Ingen kode? Send en forespørsel – leder eller admin setter nytt passord for deg. ¦ No code? Send a request – a manager or admin will set a new password for you.
Wyślij prośbę ¦ Send forespørsel ¦ Send request
Wczytaj kopię zapasową ¦ Last inn sikkerhetskopi ¦ Load backup
Jak dodać do ekranu telefonu ¦ Slik legger du appen på telefonens skjerm ¦ How to add to the phone’s home screen
Twój login ¦ Ditt brukernavn ¦ Your username
Błędny login lub hasło ¦ Feil brukernavn eller passord ¦ Wrong username or password
Konto czeka na akceptację kierownika lub admina ¦ Kontoen venter på godkjenning fra leder eller admin ¦ The account is waiting for approval by a manager or admin
Konto jest zablokowane – skontaktuj się z kierownikiem ¦ Kontoen er blokkert – kontakt lederen ¦ The account is blocked – contact your manager
Zalogowano ¦ Logget inn ¦ Logged in
Uzupełnij imię i login ¦ Fyll inn navn og brukernavn ¦ Fill in name and username
Login: same litery bez polskich znaków, cyfry, kropka lub myślnik ¦ Brukernavn: bare bokstaver uten særtegn, tall, punktum eller bindestrek ¦ Username: plain letters without special characters, digits, dot or hyphen
Taki login jest już zajęty ¦ Brukernavnet er allerede i bruk ¦ This username is already taken
Taki login już istnieje ¦ Brukernavnet finnes allerede ¦ This username already exists
Hasło musi mieć min. {0} znaki ¦ Passordet må ha minst {0} tegn ¦ The password must have at least {0} characters
Hasło min. {0} znaki ¦ Passord minst {0} tegn ¦ Password at least {0} characters
Hasła nie są takie same ¦ Passordene er ikke like ¦ The passwords do not match
Utworzono konto administratora ¦ Administratorkonto opprettet ¦ Administrator account created
Założono konto (czeka na akceptację ¦ Konto opprettet (venter på godkjenning ¦ Account created (waiting for approval
Konto założone – poczekaj na akceptację kierownika ¦ Konto opprettet – vent på godkjenning fra lederen ¦ Account created – wait for your manager’s approval
Nieprawidłowy login lub kod odzyskiwania ¦ Feil brukernavn eller gjenopprettingskode ¦ Wrong username or recovery code
Reset hasła kodem odzyskiwania ¦ Passord tilbakestilt med gjenopprettingskode ¦ Password reset with recovery code
Hasło zmienione – zaloguj się ¦ Passordet er endret – logg inn ¦ Password changed – log in
Prośba o reset hasła ¦ Forespørsel om nytt passord ¦ Password reset request
Prośba wysłana – kierownik ustawi Ci nowe hasło ¦ Forespørselen er sendt – lederen setter nytt passord for deg ¦ Request sent – your manager will set a new password
Wylogowano ¦ Logget ut ¦ Logged out
Aplikacja dodana do ekranu ¦ Appen er lagt til på skjermen ¦ App added to the home screen
Otwórz stronę w ¦ Åpne siden i ¦ Open the page in
Stuknij przycisk ¦ Trykk på knappen ¦ Tap the button
Udostępnij ¦ Del ¦ Share
na dolnym pasku. W nowszym Safari (iOS {0}) najpierw stuknij ¦ nederst. I nyere Safari (iOS {0}) trykker du først ¦ in the bottom bar. In newer Safari (iOS {0}) first tap
obok adresu strony, potem ¦ ved siden av adressen, deretter ¦ next to the address, then
Przewiń listę w dół i wybierz ¦ Bla ned i listen og velg ¦ Scroll down the list and choose
Do ekranu początkowego ¦ Legg til på Hjem-skjerm ¦ Add to Home Screen
Zostaw włączone ¦ La være slått på ¦ Leave switched on
Otwórz jako aplikacja internetowa ¦ Åpne som nettapp ¦ Open as Web App
jeśli jest), nazwa „Slangeservice”, i stuknij ¦ hvis det finnes), navnet «Slangeservice», og trykk ¦ if shown), name “Slangeservice”, and tap
Na ekranie pojawi się ikona z logo. Otwieraj aplikację zawsze z niej. ¦ Et ikon med logoen vises på skjermen. Åpne alltid appen derfra. ¦ An icon with the logo appears on the screen. Always open the app from it.
Wersja testowa ¦ Testversjon ¦ Test version
aplikacja z ikony na iPhonie ma osobne dane niż Safari. Jeśli konto masz już w Safari: w Safari wejdź w ¦ appen fra ikonet på iPhone har egne data, atskilt fra Safari. Har du allerede konto i Safari: gå i Safari til ¦ on iPhone the app from the icon has separate data from Safari. If you already have an account in Safari: in Safari go to
Panel admina → Pobierz kopię zapasową ¦ Adminpanel → Last ned sikkerhetskopi ¦ Admin panel → Download backup
a potem w aplikacji z ikony na ekranie logowania stuknij ¦ og deretter i appen fra ikonet, på innloggingsskjermen, trykk ¦ and then in the app from the icon, on the login screen, tap
Po podłączeniu serwera ten krok zniknie. ¦ Når en server kobles til, forsvinner dette steget. ¦ Once a server is connected, this step will disappear.
Zainstaluj teraz ¦ Installer nå ¦ Install now
albo ręcznie ¦ eller manuelt ¦ or manually
Stuknij ¦ Trykk ¦ Tap
trzy kropki w prawym górnym rogu ¦ tre prikker øverst til høyre ¦ three dots in the top right corner
Wybierz ¦ Velg ¦ Choose
Zainstaluj aplikację ¦ Installer app ¦ Install app
Dodaj do ekranu głównego ¦ Legg til på startskjermen ¦ Add to Home screen
Zainstaluj ¦ Installer ¦ Install
Ikona z logo trafi na ekran i do listy aplikacji. ¦ Ikonet med logoen havner på skjermen og i applisten. ¦ The icon with the logo goes to the home screen and the app list.
stuknij ≡ → ¦ trykk ≡ → ¦ tap ≡ →
Dodaj stronę do ¦ Legg til side på ¦ Add page to
Ekran startowy ¦ Startskjerm ¦ Home screen
Ikona aplikacji na ekranie telefonu ¦ Appikon på telefonens skjerm ¦ App icon on the phone screen
Dodaj aplikację do ekranu ¦ Legg appen på skjermen ¦ Add the app to the home screen
Dodaj aplikację do ekranu telefonu ¦ Legg appen på telefonens skjerm ¦ Add the app to your phone’s home screen
Ikona Slangeservice, otwiera się jak zwykła aplikacja. ¦ Slangeservice-ikon, åpnes som en vanlig app. ¦ Slangeservice icon, opens like a normal app.
Pokaż jak ¦ Vis hvordan ¦ Show how
Dobranoc ¦ God natt ¦ Good night
Dzień dobry ¦ God morgen ¦ Good morning
Cześć ¦ Hei ¦ Hi
Dobry wieczór ¦ God kveld ¦ Good evening
W Norwegii dziś ¦ I Norge i dag ¦ In Norway today
os. · godziny wpisane dziś ¦ pers. · timer registrert i dag ¦ ppl · hours logged today
Rozliczenie wypłat ¦ Lønnsoppgjør ¦ Payroll settlement
Dodaj godziny pracownikowi ¦ Legg inn timer for ansatt ¦ Add hours for an employee
Jesteś teraz ¦ Du er nå ¦ You are now
zmiana za ¦ bytte om ¦ change in
Nie masz jeszcze przypisanej rotacji. ¦ Du har ikke fått turnus ennå. ¦ You have not been assigned a rotation yet.
Dziś wpisano ¦ Registrert i dag ¦ Logged today
Wpisz dzisiejsze godziny ¦ Registrer dagens timer ¦ Log today’s hours
Godziny pracownika ¦ Timer for ansatt ¦ Employee hours
Wyślij bilety ¦ Send billetter ¦ Send tickets
Dodaj pracownika ¦ Legg til ansatt ¦ Add employee
Wiadomość ¦ Melding ¦ Message
wypłacone ¦ utbetalt ¦ paid
Brutto {0} NOK · wypłacone {1}/{2} ¦ Brutto {0} NOK · utbetalt {1}/{2} ¦ Gross {0} NOK · paid {1}/{2}
Rozliczenie ¦ Oppgjør ¦ Settlement
nowe konto czeka na akceptację. ¦ ny konto venter på godkjenning. ¦ new account waiting for approval.
nowe konta czekają ¦ nye kontoer venter ¦ new accounts waiting
na akceptację. ¦ på godkjenning. ¦ for approval.
prośba ¦ forespørsel ¦ request
prośby ¦ forespørsler ¦ requests
o reset hasła. ¦ om nytt passord. ¦ for a password reset.
prośba o reset hasła. ¦ forespørsel om nytt passord. ¦ password reset request.
przekazuje Ci kartę paliwową ¦ gir deg drivstoffkortet ¦ is handing you the fuel card
przekazuje Ci ¦ gir deg ¦ is handing you
Potwierdź, że ją dostałeś. ¦ Bekreft at du har fått det. ¦ Confirm you received it.
{0}). Potwierdź, że ją dostałeś. ¦ {0}). Bekreft at du har fått det. ¦ {0}). Confirm you received it.
Odrzuć ¦ Avvis ¦ Reject
Mam kartę ¦ Jeg har kortet ¦ I have the card
Pracowników ¦ Ansatte ¦ Employees
W Norwegii teraz ¦ I Norge nå ¦ In Norway now
W Polsce teraz ¦ I Polen nå ¦ In Poland now
Łóżka zajęte (z {0} ¦ Opptatte senger (av {0} ¦ Beds taken (of {0}
Godziny zespołu ¦ Teamets timer ¦ Team hours
Karty czekają na potw. ¦ Kort venter på bekreftelse ¦ Cards awaiting confirmation
Projekty aktywne ¦ Aktive prosjekter ¦ Active projects
Najbliższe zmiany rotacji ¦ Neste turnusbytter ¦ Upcoming rotation changes
Przyjazd do Norwegii ¦ Ankomst til Norge ¦ Arrival in Norway
Wyjazd do Polski ¦ Avreise til Polen ¦ Departure to Poland
Przyjazd do Norwegii za ¦ Ankomst til Norge om ¦ Arrival in Norway in
Wyjazd do Polski za ¦ Avreise til Polen om ¦ Departure to Poland in
Brak zmian w ciągu {0} tygodni ¦ Ingen bytter de neste {0} ukene ¦ No changes in the next {0} weeks
Auta – przypomnienia ¦ Biler – påminnelser ¦ Cars – reminders
Wszystko w porządku ¦ Alt i orden ¦ All good
EU-kontroll przeterminowana ¦ EU-kontroll er utløpt ¦ EU inspection overdue
EU-kontroll za {0} dni ¦ EU-kontroll om {0} dager ¦ EU inspection in {0} days
Serwis przy {0} km – zostało {1} km ¦ Service ved {0} km – {1} km igjen ¦ Service at {0} km – {1} km left
Moje godziny ¦ Mine timer ¦ My hours
Mój dom ¦ Mitt hus ¦ My house
Moje auto ¦ Min bil ¦ My car
Karta paliwowa ¦ Drivstoffkort ¦ Fuel card
nie mam ¦ har ikke ¦ none
Auta przy domu ¦ Biler ved huset ¦ Cars at the house
Auta przy tym domu ¦ Biler ved dette huset ¦ Cars at this house
jeżdżą ¦ kjører ¦ drivers
Twoje ¦ Din ¦ Yours
Do tego domu nie ma jeszcze przypisanych aut. ¦ Ingen biler er knyttet til dette huset ennå. ¦ No cars assigned to this house yet.
Mieszkasz z ¦ Du bor med ¦ You live with
Najbliższe bilety ¦ Neste billetter ¦ Upcoming tickets
Moje bilety ¦ Mine billetter ¦ My tickets
Brak nadchodzących biletów ¦ Ingen kommende billetter ¦ No upcoming tickets
Ostatnie wiadomości ¦ Siste meldinger ¦ Latest messages
Brak wiadomości ¦ Ingen meldinger ¦ No messages
Czas pracy ¦ Arbeidstid ¦ Working time
Ile godzin nad którym projektem ¦ Hvor mange timer på hvilket prosjekt ¦ How many hours on which project
bez podziału na projekty ¦ uten fordeling på prosjekter ¦ not split by project
za dużo o ¦ for mye med ¦ too much by
wszystko przypisane ¦ alt fordelt ¦ everything assigned
Sprawdź godziny – czas pracy wychodzi {0} ¦ Sjekk tidene – arbeidstiden blir {0} ¦ Check the times – working time comes out as {0}
Suma projektów ¦ Sum prosjekter ¦ Project total
jest większa niż czas pracy ¦ er større enn arbeidstiden ¦ is larger than the working time
Wybierz pracownika ¦ Velg ansatt ¦ Choose employee
wybierz pracownika ¦ velg ansatt ¦ choose employee
wybierz ¦ velg ¦ choose
Dodaj godziny ¦ Legg inn timer ¦ Add hours
Zapisz dzień ¦ Lagre dagen ¦ Save the day
Brak wpisów w tym miesiącu ¦ Ingen registreringer denne måneden ¦ No entries this month
Dodaj godziny dla pracownika ¦ Legg inn timer for ansatt ¦ Add hours for an employee
Zapisz godziny ¦ Lagre timer ¦ Save hours
Eksport CSV ¦ Eksporter CSV ¦ Export CSV
Brak godzin w tym miesiącu ¦ Ingen timer denne måneden ¦ No hours this month
Brak godzin ¦ Ingen timer ¦ No hours
Brak projektów ¦ Ingen prosjekter ¦ No projects
Brak projektów – dodaj pierwszy ¦ Ingen prosjekter – legg til det første ¦ No projects – add the first one
Godziny pracowników ¦ Ansattes timer ¦ Employee hours
Kontrola godzin zespołu i projektów ¦ Kontroll med teamets og prosjektenes timer ¦ Control of team and project hours
Od której do której + podział na projekty ¦ Fra når til når + fordeling på prosjekter ¦ From when to when + split by project
Brak podziału na projekty ¦ Ingen fordeling på prosjekter ¦ Not split by project
Edytuj wpis ¦ Rediger registrering ¦ Edit entry
Usuń wpis ¦ Slett registrering ¦ Delete entry
Usunięto godziny ¦ Timer slettet ¦ Hours deleted
Ten czas nachodzi na wpis ¦ Tiden overlapper med registreringen ¦ This time overlaps the entry
opcjonalnie ¦ valgfritt ¦ optional
opcjonalnie – co robiłeś ¦ valgfritt – hva du gjorde ¦ optional – what you did
bez projektu ¦ uten prosjekt ¦ no project
Cykl NO/PL ¦ Syklus NO/PL ¦ Cycle NO/PL
Osób ¦ Personer ¦ People
Następna zmiana ¦ Neste bytte ¦ Next change
Start cyklu ¦ Syklusstart ¦ Cycle start
Nikt nie przypisany ¦ Ingen tildelt ¦ Nobody assigned
Bilety dla grupy ¦ Billetter til gruppen ¦ Tickets for the group
Bez rotacji ¦ Uten turnus ¦ No rotation
Utwórz pierwszą rotację ¦ Opprett første turnus ¦ Create the first rotation
Kto w której rotacji ¦ Hvem er i hvilken turnus ¦ Who is in which rotation
Przeciągnij pracownika do grupy (albo dotknij osobę, a potem grupę). ¦ Dra en ansatt til en gruppe (eller trykk på personen og deretter gruppen). ¦ Drag an employee to a group (or tap the person, then the group).
Plan rotacji – kto gdzie ¦ Turnusplan – hvem hvor ¦ Rotation plan – who is where
Tworzenie, edycja, przesuwanie cykli i przypisywanie ludzi – w jednym miejscu ¦ Opprett, rediger, flytt sykluser og tildel folk – på ett sted ¦ Create, edit, shift cycles and assign people – in one place
Nowa rotacja ¦ Ny turnus ¦ New rotation
{0} rotacji · tworzenie, przesuwanie cykli, przypisywanie ludzi ¦ {0} turnuser · opprett, flytt sykluser, tildel folk ¦ {0} rotations · create, shift cycles, assign people
Przesuń cały cykl o tydzień wcześniej ¦ Flytt hele syklusen en uke tidligere ¦ Shift the whole cycle a week earlier
Przesuń cały cykl o tydzień później ¦ Flytt hele syklusen en uke senere ¦ Shift the whole cycle a week later
Wiadomość do grupy ¦ Melding til gruppen ¦ Message to the group
Wyślij wiadomość do grupy ¦ Send melding til gruppen ¦ Send a message to the group
Twój status dziś ¦ Din status i dag ¦ Your status today
Jesteś w Norwegii ¦ Du er i Norge ¦ You are in Norway
Jesteś w Polsce ¦ Du er i Polen ¦ You are in Poland
Brak rotacji ¦ Ingen turnus ¦ No rotation
Kierownik jeszcze nie przypisał Cię do rotacji. ¦ Lederen har ikke satt deg på en turnus ennå. ¦ Your manager has not assigned you to a rotation yet.
do wyjazdu do Polski ¦ til avreise til Polen ¦ until departure to Poland
do przyjazdu do Norwegii ¦ til ankomst i Norge ¦ until arrival in Norway
Mój kalendarz ¦ Min kalender ¦ My calendar
Mój kalendarz ({0} tygodni ¦ Min kalender ({0} uker ¦ My calendar ({0} weeks
Kiedy kto jest w Norwegii, a kiedy w Polsce ¦ Når hvem er i Norge og når i Polen ¦ Who is in Norway and who is in Poland, and when
dzień zmiany ¦ byttedag ¦ change day
Pracownik ¦ Ansatt ¦ Employee
Bez domu ¦ Uten hus ¦ No house
Bez auta ¦ Uten bil ¦ No car
Wszyscy przypisani ¦ Alle er tildelt ¦ Everyone assigned
Przeciągnij tu osobę ¦ Dra en person hit ¦ Drag a person here
Pusto ¦ Tomt ¦ Empty
Brak pozycji – dodaj pierwszą ¦ Ingen elementer – legg til det første ¦ Nothing here – add the first one
jest pełny ¦ er fullt ¦ is full
brak wolnych miejsc ¦ ingen ledige plasser ¦ no free seats
brak adresu ¦ ingen adresse ¦ no address
auto przy domu ¦ bil ved huset ¦ car at the house
przypisz auto do domu ¦ knytt bil til huset ¦ assign a car to the house
auto bez domu ¦ bil uten hus ¦ car without a house
Każdy ma auto ¦ Alle har bil ¦ Everyone has a car
Każdy ma dom ¦ Alle har hus ¦ Everyone has a house
Upuść osobę na ¦ Slipp en person på ¦ Drop a person on a
żeby tam zamieszkała, albo na ¦ for at vedkommende skal bo der, eller på ¦ to make them live there, or on a
żeby nim jeździła (na telefonie: przytrzymaj i przeciągnij albo dotknij osobę, a potem dom/auto). Upuść tutaj, aby wypisać. ¦ for at vedkommende skal kjøre den (på telefon: hold og dra, eller trykk på personen og så hus/bil). Slipp her for å fjerne. ¦ to make them drive it (on a phone: press and drag, or tap the person, then the house/car). Drop here to unassign.
dom ¦ hus ¦ house
auto ¦ bil ¦ car
łóżek ¦ senger ¦ beds
domów ¦ hus ¦ houses
pracowników ¦ ansatte ¦ employees
{0} domów · {1} aut · {2} pracowników ¦ {0} hus · {1} biler · {2} ansatte ¦ {0} houses · {1} cars · {2} employees
/{0} łóżek ¦ /{0} senger ¦ /{0} beds
/{0} miejsc ¦ /{0} seter ¦ /{0} seats
Brak domów i aut. ¦ Ingen hus eller biler. ¦ No houses or cars.
Dodaj pierwszy dom przyciskiem u góry. ¦ Legg til det første huset med knappen øverst. ¦ Add the first house with the button at the top.
Układ ¦ Oppsett ¦ Layout
Drzewo (GitHub ¦ Tre (GitHub ¦ Tree (GitHub
Mapa myśli ¦ Tankekart ¦ Mind map
Lista pionowa ¦ Vertikal liste ¦ Vertical list
Zamknij pełny ekran ¦ Lukk fullskjerm ¦ Exit full screen
Pełny ekran ¦ Fullskjerm ¦ Full screen
Dopasuj do ekranu ¦ Tilpass skjermen ¦ Fit to screen
Pomniejsz ¦ Zoom ut ¦ Zoom out
Powiększ ¦ Zoom inn ¦ Zoom in
Szukaj pracownika ¦ Søk etter ansatt ¦ Search employee
Ułożono ¦ Ordnet ¦ Arranged
Wolne łóżka ¦ Ledige senger ¦ Free beds
Wolne miejsca w autach ¦ Ledige plasser i bilene ¦ Free seats in cars
Domy, auta i ludzie na jednej mapie – przeciągaj ludzi na dom albo na auto ¦ Hus, biler og folk på ett kart – dra folk til et hus eller en bil ¦ Houses, cars and people on one map – drag people onto a house or a car
Kto gdzie mieszka i czym jeździ ¦ Hvem bor hvor og kjører hva ¦ Who lives where and drives what
Dodaj auto ¦ Legg til bil ¦ Add car
Dodaj dom ¦ Legg til hus ¦ Add house
Edytuj auto ¦ Rediger bil ¦ Edit car
Edytuj dom ¦ Rediger hus ¦ Edit house
Teraz dotknij dom albo auto ¦ Trykk nå på et hus eller en bil ¦ Now tap a house or a car
Teraz dotknij dom albo auto (albo listę, aby wypisać ¦ Trykk nå på et hus eller en bil (eller listen for å fjerne ¦ Now tap a house or a car (or the list to unassign
EU-kontroll ≤ {0} dni ¦ EU-kontroll ≤ {0} dager ¦ EU inspection ≤ {0} days
Przebieg floty ¦ Flåtens kilometer ¦ Fleet mileage
Kto czym jeździ i przy którym domu stoi auto – ustawiasz na ¦ Hvem som kjører hvilken bil og ved hvilket hus bilen står, setter du på ¦ Who drives which car and at which house it stands – you set this on the
wspólnej mapie ¦ felles kart ¦ shared map
brak daty ¦ ingen dato ¦ no date
przeterminowana {0} dni ¦ utløpt for {0} dager siden ¦ overdue by {0} days
serwis zaległy ¦ service forfalt ¦ service overdue
serwis za {0} km ¦ service om {0} km ¦ service in {0} km
więcej ¦ flere ¦ more
Ten miesiąc ¦ Denne måneden ¦ This month
Brak aut ¦ Ingen biler ¦ No cars
Każde auto: EU-kontroll, przebieg, serwis, tankowania i zgłoszone problemy ¦ Hver bil: EU-kontroll, kilometerstand, service, tanking og meldte problemer ¦ Each car: EU inspection, mileage, service, refuelling and reported problems
Nowe auto ¦ Ny bil ¦ New car
Nazwa / model ¦ Navn / modell ¦ Name / model
Przebieg (km ¦ Kilometerstand (km ¦ Mileage (km
Aktualny przebieg (km ¦ Nåværende kilometerstand (km ¦ Current mileage (km
Serwis przy (km ¦ Service ved (km ¦ Service at (km
Dom (przy którym domu stoi auto ¦ Hus (hvor bilen står ¦ House (where the car stands
bez domu ¦ uten hus ¦ no house
Usunięto auto ¦ Bil slettet ¦ Car deleted
Nie ma jeszcze aut – dodaj je w zakładce Auta. ¦ Ingen biler ennå – legg dem til under Biler. ¦ No cars yet – add them under Cars.
Stan licznika ¦ Kilometerstand ¦ Odometer reading
Licznik (km ¦ Kilometerteller (km ¦ Odometer (km
Kwota (NOK ¦ Beløp (NOK ¦ Amount (NOK
Zdjęcie paragonu (opcjonalnie ¦ Bilde av kvittering (valgfritt ¦ Receipt photo (optional
prywatnie / gotówka ¦ privat / kontant ¦ private / cash
Brak tankowań ¦ Ingen tankinger ¦ No refuellings
Usunięto tankowanie ¦ Tanking slettet ¦ Refuelling deleted
Przebieg nie może być mniejszy niż poprzedni ¦ Kilometerstanden kan ikke være lavere enn forrige ¦ Mileage cannot be lower than the previous one
Licznik mniejszy niż ostatni zapis. Zapisać mimo to? ¦ Telleren er lavere enn siste registrering. Lagre likevel? ¦ The odometer is lower than the last entry. Save anyway?
Nowy dom ¦ Nytt hus ¦ New house
Adres (do planowania dojazdu ¦ Adresse (for reiseplanlegging ¦ Address (for travel planning
Ilość miejsc (łóżek ¦ Antall plasser (senger ¦ Number of places (beds
Usunięto dom ¦ Hus slettet ¦ House deleted
przekazuje Ci ¦ gir deg ¦ is handing you
Potwierdzam odbiór ¦ Jeg bekrefter mottak ¦ I confirm receipt
Ma kartę ¦ Har kortet ¦ Has the card
w biurze ¦ på kontoret ¦ at the office
czeka ¦ venter ¦ waiting
czeka na ¦ venter på ¦ waiting for
Przekaż ¦ Overfør ¦ Hand over
Anuluj przekazanie ¦ Avbryt overføring ¦ Cancel hand-over
Brak kart paliwowych ¦ Ingen drivstoffkort ¦ No fuel cards
Ostatnie przekazania ¦ Siste overføringer ¦ Latest hand-overs
Brak przekazań ¦ Ingen overføringer ¦ No hand-overs
Przekazanie wymaga potwierdzenia przez odbiorcę ¦ Overføringen må bekreftes av mottakeren ¦ The hand-over must be confirmed by the recipient
Nowa karta paliwowa ¦ Nytt drivstoffkort ¦ New fuel card
Ostatnie {0} cyfry ¦ Siste {0} sifre ¦ Last {0} digits
Kto ma kartę teraz ¦ Hvem har kortet nå ¦ Who has the card now
Edytuj kartę ¦ Rediger kort ¦ Edit card
ręcznie przypisana do ¦ manuelt tildelt ¦ manually assigned to
Zapisano kartę ¦ Kortet er lagret ¦ Card saved
Usunięto kartę ¦ Kortet er slettet ¦ Card deleted
Przekaż kartę ¦ Overfør kortet ¦ Hand over the card
Odbiorca musi potwierdzić w aplikacji, że dostał kartę. Do tego czasu karta jest zapisana na ¦ Mottakeren må bekrefte i appen at kortet er mottatt. Inntil da står kortet på ¦ The recipient must confirm in the app that they received the card. Until then the card is registered to
Komu dajesz kartę ¦ Hvem gir du kortet til ¦ Who are you giving the card to
Wybierz osobę ¦ Velg person ¦ Choose a person
Przekazuję Ci kartę paliwową ¦ Jeg gir deg drivstoffkortet ¦ I am handing you the fuel card
Potwierdź odbiór w zakładce Karty paliwowe. ¦ Bekreft mottak under Drivstoffkort. ¦ Confirm receipt under Fuel cards.
Wysłano – czeka na potwierdzenie ¦ Sendt – venter på bekreftelse ¦ Sent – waiting for confirmation
Potwierdzono odbiór karty ¦ Mottak av kortet er bekreftet ¦ Card receipt confirmed
Karta jest teraz u Ciebie ¦ Du har nå kortet ¦ You now have the card
Brak plików ¦ Ingen filer ¦ No files
brak pliku ¦ ingen fil ¦ no file
Pobierz bilety ¦ Last ned billetter ¦ Download tickets
Dojazd Skyss/prom ¦ Reise Skyss/ferje ¦ Travel Skyss/ferry
Brak biletów w archiwum ¦ Ingen billetter i arkivet ¦ No tickets in the archive
Bilety dla grup rotacyjnych + połączenia Skyss / prom ¦ Billetter for turnusgrupper + Skyss / ferje ¦ Tickets for rotation groups + Skyss / ferry connections
Wyślij bilety do grupy ¦ Send billetter til gruppen ¦ Send tickets to the group
Edytuj bilety ¦ Rediger billetter ¦ Edit tickets
Grupa rotacyjna ¦ Turnusgruppe ¦ Rotation group
tylko wybrane osoby ¦ bare valgte personer ¦ selected people only
Dodatkowe osoby (opcjonalnie ¦ Flere personer (valgfritt ¦ Additional people (optional
Lotnisko w Norwegii ¦ Flyplass i Norge ¦ Airport in Norway
Lotnisko w Polsce ¦ Flyplass i Polen ¦ Airport in Poland
Bilety (zdjęcia / PDF – możesz wybrać kilka ¦ Billetter (bilder / PDF – du kan velge flere ¦ Tickets (photos / PDF – you can pick several
Już dodane ¦ Allerede lagt til ¦ Already added
plików (nowe zostaną dopisane ¦ filer (nye legges til ¦ files (new ones will be added
plików ¦ filer ¦ files
Wybierz grupę albo osoby ¦ Velg gruppe eller personer ¦ Choose a group or people
wyjazd do Polski ¦ avreise til Polen ¦ departure to Poland
przyjazd do Norwegii ¦ ankomst til Norge ¦ arrival in Norway
Pobierz w zakładce „Bilety i dojazd”. ¦ Last ned under «Billetter og reise». ¦ Download under “Tickets & travel”.
Wysłano bilety ¦ Billetter sendt ¦ Tickets sent
wybranych osób ¦ valgte personer ¦ selected people
Usunięto bilety ¦ Billetter slettet ¦ Tickets deleted
Powiadom ludzi wiadomością ¦ Varsle folk med melding ¦ Notify people with a message
Dodaj adres domu, żeby planować dojazd ¦ Legg inn husets adresse for å planlegge reisen ¦ Add the house address to plan the trip
Nie znaleziono adresu ¦ Fant ikke adressen ¦ Address not found
prom/łódź ¦ ferje/båt ¦ ferry/boat
pociąg ¦ tog ¦ train
autobus ¦ buss ¦ bus
pieszo ¦ til fots ¦ on foot
tramwaj ¦ trikk ¦ tram
samolot ¦ fly ¦ plane
Dojazd na lotnisko / z lotniska ¦ Reise til / fra flyplassen ¦ Travel to / from the airport
Bądź na lotnisku przed wylotem ¦ Vær på flyplassen før avgang ¦ Be at the airport before departure
Wyjście z lotniska po przylocie ¦ Ut fra flyplassen etter landing ¦ Leaving the airport after landing
Szukaj połączeń ¦ Søk etter reiser ¦ Search connections
Rozkłady: Entur (Skyss, promy, Kystbussen). ¦ Ruter: Entur (Skyss, ferjer, Kystbussen). ¦ Timetables: Entur (Skyss, ferries, Kystbussen).
Przyjazd na ¦ Ankomst til ¦ Arrive at
najpóźniej ¦ senest ¦ at the latest
Wyjazd z ¦ Avreise fra ¦ Departure from
Entur nie znalazł połączeń – sprawdź skyss.no ¦ Entur fant ingen reiser – sjekk skyss.no ¦ Entur found no connections – check skyss.no
Nie udało się pobrać rozkładu ¦ Kunne ikke hente rutetabellen ¦ Could not load the timetable
Sprawdź połączenie na ¦ Sjekk reisen på ¦ Check the connection on
Wszyscy pracownicy ¦ Alle ansatte ¦ All employees
Brak dokumentów ¦ Ingen dokumenter ¦ No documents
Nie masz jeszcze dokumentów – kierownik je doda ¦ Du har ingen dokumenter ennå – lederen legger dem til ¦ You have no documents yet – your manager will add them
Umowy i dokumenty pracowników ¦ Ansattes kontrakter og dokumenter ¦ Employees’ contracts and documents
Twoja umowa i dokumenty do pobrania ¦ Din kontrakt og dokumenter til nedlasting ¦ Your contract and documents to download
Dodaj dokument ¦ Legg til dokument ¦ Add document
Nazwa dokumentu ¦ Dokumentnavn ¦ Document name
Wybierz plik ¦ Velg fil ¦ Choose a file
Usunięto dokument ¦ Dokument slettet ¦ Document deleted
Odpowiedz ¦ Svar ¦ Reply
przeczytało: {0} ¦ lest: {0} ¦ read: {0}
przeczytało ¦ lest ¦ read
Do osoby, rotacji lub wszystkich ¦ Til en person, en turnus eller alle ¦ To a person, a rotation or everyone
Wiadomości od kierownictwa ¦ Meldinger fra ledelsen ¦ Messages from management
Napisz ¦ Skriv ¦ Write
Nowa wiadomość ¦ Ny melding ¦ New message
Rotacja / grupa ¦ Turnus / gruppe ¦ Rotation / group
Wybierz odbiorcę ¦ Velg mottaker ¦ Choose a recipient
Wysłano ¦ Sendt ¦ Sent
przetłumaczono z ¦ oversatt fra ¦ translated from
Pokaż oryginał ¦ Vis original ¦ Show original
Pokaż tłumaczenie ¦ Vis oversettelse ¦ Show translation
tłumaczę ¦ oversetter ¦ translating
Tłumaczenie niedostępne (brak internetu lub limit) – pokazuję oryginał ¦ Oversettelse utilgjengelig (ingen nett eller grense nådd) – viser originalen ¦ Translation unavailable (no internet or limit reached) – showing the original
zamknięty ¦ avsluttet ¦ closed
aktywny ¦ aktiv ¦ active
aktywne ¦ aktiv ¦ active
Ile czasu kto spędził nad projektem ¦ Hvor mye tid hver person har brukt på prosjektet ¦ How much time each person spent on the project
Nowy projekt ¦ Nytt prosjekt ¦ New project
Edytuj projekt ¦ Rediger prosjekt ¦ Edit project
Kod / nr ¦ Kode / nr. ¦ Code / no.
Projekt aktywny (widoczny przy wpisywaniu godzin ¦ Aktivt prosjekt (synlig ved timeregistrering ¦ Active project (shown when logging hours
Nowe konta – czekają na akceptację ¦ Nye kontoer – venter på godkjenning ¦ New accounts – waiting for approval
Akceptuj ¦ Godkjenn ¦ Approve
Prośby o reset hasła ¦ Forespørsler om nytt passord ¦ Password reset requests
Ustaw hasło ¦ Sett passord ¦ Set password
Ustaw ¦ Sett ¦ Set
Hasło startowe ¦ Startpassord ¦ Initial password
Nowe hasło (puste = bez zmian ¦ Nytt passord (tomt = uendret ¦ New password (empty = unchanged
Konto aktywne ¦ Konto aktiv ¦ Account active
Musi zostać co najmniej jeden admin ¦ Det må være minst én admin ¦ There must be at least one admin
Edytowano konto ¦ Konto redigert ¦ Account edited
Dodano pracownika ¦ Ansatt lagt til ¦ Employee added
Zapisano ¦ Lagret ¦ Saved
Usunięto ¦ Slettet ¦ Deleted
Nowy pracownik ¦ Ny ansatt ¦ New employee
Edytuj pracownika ¦ Rediger ansatt ¦ Edit employee
Odrzucić i usunąć konto ¦ Avvise og slette kontoen ¦ Reject and delete the account
Ustawiono nowe hasło dla ¦ Nytt passord satt for ¦ New password set for
Hasło ustawione ¦ Passord satt ¦ Password set
Ustaw tymczasowe hasło i przekaż je pracownikowi (np. SMS-em). Może je potem zmienić w „Moje konto”. ¦ Sett et midlertidig passord og gi det til den ansatte (f.eks. på SMS). Det kan endres senere i «Min konto». ¦ Set a temporary password and give it to the employee (e.g. by SMS). They can change it later in “My account”.
Nowe hasło – ¦ Nytt passord – ¦ New password –
Wpisy godzin ¦ Timeregistreringer ¦ Hour entries
Brak wpisów ¦ Ingen registreringer ¦ No entries
Ostatnie logi ¦ Siste logger ¦ Latest logs
Brak logów ¦ Ingen logger ¦ No logs
Profil pracownika ¦ Ansattprofil ¦ Employee profile
ostatnio ¦ sist sett ¦ last seen
Online teraz ¦ Pålogget nå ¦ Online now
Aktywni ({0} h ¦ Aktive ({0} t ¦ Active ({0} h
Kont ¦ Kontoer ¦ Accounts
Wpisów w logu ¦ Logglinjer ¦ Log entries
Kto był online ¦ Hvem har vært pålogget ¦ Who has been online
Logi systemu ¦ Systemlogg ¦ System logs
Kto był online, wszystkie konta, e-maile, hasła, kopie zapasowe i logi ¦ Hvem har vært pålogget, alle kontoer, e-post, passord, sikkerhetskopier og logger ¦ Who has been online, all accounts, e-mails, passwords, backups and logs
nigdy · {0} h w tym mies. ¦ aldri · {0} t denne mnd. ¦ never · {0} h this month
online · {0} h w tym mies. ¦ pålogget · {0} t denne mnd. ¦ online · {0} h this month
{0} h temu · {1} h w tym mies. ¦ {0} t siden · {1} t denne mnd. ¦ {0} h ago · {1} h this month
{0} min temu · {1} h w tym mies. ¦ {0} min siden · {1} t denne mnd. ¦ {0} min ago · {1} h this month
{0} dni temu · {1} h w tym mies. ¦ {0} dager siden · {1} t denne mnd. ¦ {0} days ago · {1} h this month
Instrukcje, kopie i reset hasła ¦ Bruksanvisninger, sikkerhetskopier og nytt passord ¦ Guides, backups and password resets
Instrukcje: instalacja iOS/Android, dla pracownika, dla szefa (PL/NO/EN ¦ Bruksanvisninger: installasjon iOS/Android, per rolle (PL/NO/EN ¦ Guides: iOS/Android installation, per role (PL/NO/EN
Kopie zapasowe (całość / użytkownik / części ¦ Sikkerhetskopier (alt / bruker / deler ¦ Backups (all / user / parts
Prezentacja aplikacji dla szefa firmy (NO/EN/PL ¦ Presentasjon av appen for daglig leder (NO/EN/PL ¦ App presentation for the company owner (NO/EN/PL
Ostatnia kopia: nigdy ¦ Siste kopi: aldri ¦ Last backup: never
Ostatnia kopia ¦ Siste kopi ¦ Last backup
Brak próśb o reset hasła. ¦ Ingen forespørsler om nytt passord. ¦ No password reset requests.
prosi o reset hasła ¦ ber om nytt passord ¦ asks for a password reset
Wszystkie konta ¦ Alle kontoer ¦ All accounts
Osoba ¦ Person ¦ Person
Język ¦ Språk ¦ Language
Ostatnio ¦ Sist sett ¦ Last seen
czeka na akceptację ¦ venter på godkjenning ¦ awaiting approval
zablokowane ¦ blokkert ¦ blocked
Edytuj (dane, e-mail, ranga ¦ Rediger (data, e-post, rolle ¦ Edit (details, e-mail, role
Ustaw nowe hasło ¦ Sett nytt passord ¦ Set new password
Kopia zapasowa użytkownika ¦ Sikkerhetskopi av bruker ¦ User backup
Zablokuj konto ¦ Blokker kontoen ¦ Block the account
Odblokuj konto ¦ Opphev blokkering ¦ Unblock the account
Kopia ¦ Kopi ¦ Backup
Moje konto ¦ Min konto ¦ My account
Mój profil ¦ Min profil ¦ My profile
Dodaj do ekranu ¦ Legg til på skjermen ¦ Add to home screen
Nowy kod odzyskiwania ¦ Ny gjenopprettingskode ¦ New recovery code
Wyloguj ¦ Logg ut ¦ Log out
Język / Språk / Language ¦ Język / Språk / Language ¦ Język / Språk / Language
z przeglądarki ¦ fra nettleseren ¦ from the browser
Zmień hasło ¦ Endre passord ¦ Change password
Podaj obecne i nowe hasło ¦ Skriv inn nåværende og nytt passord ¦ Enter your current and new password
Wyłączone w trybie podglądu ¦ Slått av i forhåndsvisning ¦ Disabled in preview mode
W trybie podglądu zmiana hasła jest wyłączona ¦ I forhåndsvisning er endring av passord slått av ¦ Changing the password is disabled in preview mode
Hasło zmienisz tylko na swoim koncie ¦ Du kan bare endre passord på din egen konto ¦ You can only change the password on your own account
Zmień e-mail ¦ Endre e-post ¦ Change e-mail
Nie podano adresu ¦ Ingen adresse oppgitt ¦ No address given
Napisz do kierownika ¦ Skriv til lederen ¦ Write to the manager
Zgłoszenie, informacja albo skarga – także anonimowo ¦ Henvendelse, informasjon eller klage – også anonymt ¦ Request, information or complaint – also anonymously
Zgłoś błąd w aplikacji ¦ Meld feil i appen ¦ Report a bug in the app
Opis + maks. {0} zrzuty ekranu ¦ Beskrivelse + inntil {0} skjermbilder ¦ Description + up to {0} screenshots
Kopia mojego konta ¦ Kopi av kontoen min ¦ Backup of my account
Pobierz swoje dane: godziny, dokumenty, bilety, wiadomości ¦ Last ned dine data: timer, dokumenter, billetter, meldinger ¦ Download your data: hours, documents, tickets, messages
Moje zgłoszenia ¦ Mine henvendelser ¦ My reports
Jeszcze nic nie wysłano ¦ Ingenting sendt ennå ¦ Nothing sent yet
{0} wysłanych ¦ {0} sendt ¦ {0} sent
Obecne hasło ¦ Nåværende passord ¦ Current password
Powtórz nowe hasło ¦ Gjenta nytt passord ¦ Repeat new password
Obecne hasło jest nieprawidłowe ¦ Nåværende passord er feil ¦ The current password is wrong
Nowe hasło: min. {0} znaki ¦ Nytt passord: minst {0} tegn ¦ New password: at least {0} characters
Nowe hasła nie są takie same ¦ De nye passordene er ikke like ¦ The new passwords do not match
Hasło zmienione ¦ Passordet er endret ¦ Password changed
Adres e-mail ¦ E-postadresse ¦ E-mail address
Hasło (dla potwierdzenia ¦ Passord (for å bekrefte ¦ Password (to confirm
Zapisz e-mail ¦ Lagre e-post ¦ Save e-mail
Nieprawidłowy adres e-mail ¦ Ugyldig e-postadresse ¦ Invalid e-mail address
Nieprawidłowe hasło ¦ Feil passord ¦ Wrong password
Ten e-mail ma już inne konto ¦ Denne e-posten brukes av en annen konto ¦ This e-mail belongs to another account
E-mail zapisany ¦ E-post lagret ¦ E-mail saved
Zgłoszenie ¦ Henvendelse ¦ Request
Informacja ¦ Informasjon ¦ Information
Skarga ¦ Klage ¦ Complaint
Błąd w aplikacji ¦ Feil i appen ¦ App bug
Krótko, czego dotyczy ¦ Kort hva det gjelder ¦ Briefly, what it is about
Opisz sprawę ¦ Beskriv saken ¦ Describe the matter
Wyślij anonimowo ¦ Send anonymt ¦ Send anonymously
Kierownik zobaczy tylko „Anonimowo”. Twoje imię widzi wyłącznie admin. ¦ Lederen ser bare «Anonymt». Navnet ditt ser kun admin. ¦ The manager only sees “Anonymous”. Only the admin can see your name.
Zrzuty ekranu (maks. {0}, opcjonalnie ¦ Skjermbilder (maks. {0}, valgfritt ¦ Screenshots (max. {0}, optional
Nie wybrano zdjęć ¦ Ingen bilder valgt ¦ No photos selected
Wpisz treść ¦ Skriv en tekst ¦ Write a message
Wysłano anonimowo ¦ Sendt anonymt ¦ Sent anonymously
Wysłano do kierownika ¦ Sendt til lederen ¦ Sent to the manager
Zgłoszenie trafi do admina. Opisz, co robiłeś i co poszło nie tak. ¦ Meldingen går til admin. Beskriv hva du gjorde og hva som gikk galt. ¦ The report goes to the admin. Describe what you did and what went wrong.
Gdzie wystąpił błąd ¦ Hvor oppstod feilen ¦ Where did the bug happen
np. Godziny pracy – zapis dnia ¦ f.eks. Arbeidstimer – lagre dagen ¦ e.g. Work hours – saving the day
Opis błędu ¦ Beskrivelse av feilen ¦ Bug description
Co kliknąłeś, co się stało, co powinno się stać ¦ Hva du trykket på, hva som skjedde, hva som burde skjedd ¦ What you tapped, what happened, what should have happened
Wyślij zgłoszenie ¦ Send melding ¦ Send report
Opisz błąd ¦ Beskriv feilen ¦ Describe the bug
Dziękujemy – błąd zgłoszony ¦ Takk – feilen er meldt ¦ Thank you – bug reported
Możesz dodać maksymalnie {0} zrzuty ekranu ¦ Du kan legge ved inntil {0} skjermbilder ¦ You can attach up to {0} screenshots
Maksymalnie {0} zrzuty ekranu – wybierz jeszcze raz ¦ Maks. {0} skjermbilder – velg på nytt ¦ Max. {0} screenshots – choose again
Dozwolone są tylko zdjęcia / zrzuty ekranu ¦ Bare bilder / skjermbilder er tillatt ¦ Only photos / screenshots are allowed
Tylko zdjęcia / zrzuty ekranu ¦ Bare bilder / skjermbilder ¦ Photos / screenshots only
Nic jeszcze nie wysłałeś ¦ Du har ikke sendt noe ennå ¦ You have not sent anything yet
Wysłane anonimowo – kierownik nie widzi, że to Ty ¦ Sendt anonymt – lederen ser ikke at det er deg ¦ Sent anonymously – the manager cannot see it was you
Odpowiedź ¦ Svar ¦ Reply
Zmień odpowiedź ¦ Endre svar ¦ Change reply
Otwarte ¦ Åpne ¦ Open
Załatwione ¦ Løst ¦ Resolved
Otwórz ponownie ¦ Åpne igjen ¦ Reopen
Wszystkie rodzaje ¦ Alle typer ¦ All types
Brak otwartych zgłoszeń ¦ Ingen åpne henvendelser ¦ No open reports
Brak załatwionych zgłoszeń ¦ Ingen løste henvendelser ¦ No resolved reports
Anonimowo ¦ Anonymt ¦ Anonymous
Widoczne tylko dla admina ¦ Synlig kun for admin ¦ Visible to the admin only
Błędy aplikacji, zgłoszenia, informacje i skargi – jako admin widzisz też autorów anonimowych ¦ Feil i appen, henvendelser, informasjon og klager – som admin ser du også anonyme avsendere ¦ App bugs, requests, information and complaints – as admin you also see anonymous authors
Zgłoszenia, informacje i skargi od pracowników ¦ Henvendelser, informasjon og klager fra ansatte ¦ Requests, information and complaints from employees
Odpowiedź zobaczy autor w „Moje konto → Moje zgłoszenia” ¦ Avsenderen ser svaret i «Min konto → Mine henvendelser» ¦ The author sees the reply in “My account → My reports”
także przy zgłoszeniu anonimowym – bez ujawniania autora ¦ også ved anonyme henvendelser – uten å avsløre avsenderen ¦ also for anonymous reports – without revealing the author
Wyślij odpowiedź ¦ Send svar ¦ Send reply
Odpowiedź zapisana ¦ Svar lagret ¦ Reply saved
Oznaczono jako załatwione ¦ Merket som løst ¦ Marked as resolved
Otwarto ponownie ¦ Åpnet igjen ¦ Reopened
Moja wypłata ¦ Min lønn ¦ My pay
Moja wypłata – oktober {0} ¦ Min lønn – oktober {0} ¦ My pay – October {0}
szacunkowo ¦ anslag ¦ estimate
Na rękę ok. ¦ Utbetalt ca. ¦ Take-home approx.
Na rękę (szacunkowo ¦ Utbetalt (anslag ¦ Take-home (estimate
Netto (szacunkowo ¦ Netto (anslag ¦ Net (estimate
brutto {0} NOK · {1} h ¦ brutto {0} NOK · {1} t ¦ gross {0} NOK · {1} h
brutto {0} NOK · {1} h (z planowanymi ¦ brutto {0} NOK · {1} t (med planlagte ¦ gross {0} NOK · {1} h (incl. planned
Bez projektu ¦ Uten prosjekt ¦ No project
Nadgodziny ¦ Overtid ¦ Overtime
Dodatek ¦ Tillegg ¦ Bonus
Podatek (ok. {0}% ¦ Skatt (ca. {0} % ¦ Tax (approx. {0}%
Potrącenia ¦ Trekk ¦ Deductions
Policz z planowanymi godzinami ¦ Regn med planlagte timer ¦ Calculate with planned hours
Jeszcze godzin w tym miesiącu ¦ Flere timer denne måneden ¦ More hours this month
np. {0} ¦ f.eks. {0} ¦ e.g. {0}
To przybliżenie: godziny × stawki ustawione przez księgową, minus szacowany podatek i potrącenia. Ostateczna kwota jest na pasku wypłaty. ¦ Dette er et anslag: timer × satser satt av regnskap, minus beregnet skatt og trekk. Endelig beløp står på lønnsslippen. ¦ This is an estimate: hours × rates set by the accountant, minus estimated tax and deductions. The final amount is on your payslip.
Księgowa nie ustawiła jeszcze Twojej stawki – kwoty pojawią się, gdy ją ustawi. ¦ Regnskap har ikke satt satsen din ennå – beløpene vises når den er satt. ¦ The accountant has not set your rate yet – amounts will appear once it is set.
indywidualna ¦ individuell ¦ individual
rotacja ¦ turnus ¦ rotation
domyślna ¦ standard ¦ default
brak stawki ¦ ingen sats ¦ no rate
{0} (indywidualna ¦ {0} (individuell ¦ {0} (individual
{0} (projekt ¦ {0} (prosjekt ¦ {0} (project
{0} (rotacja ¦ {0} (turnus ¦ {0} (rotation
{0} (domyślna ¦ {0} (standard ¦ {0} (default
{0} h × {1} (indywidualna ¦ {0} t × {1} (individuell ¦ {0} h × {1} (individual
{0} h × {1} (projekt ¦ {0} t × {1} (prosjekt ¦ {0} h × {1} (project
{0} h × {1} (rotacja ¦ {0} t × {1} (turnus ¦ {0} h × {1} (rotation
{0} h × {1} (domyślna ¦ {0} t × {1} (standard ¦ {0} h × {1} (default
Rozliczenie miesiąca – godziny × stawki, potrącenia, status wypłaty ¦ Månedsoppgjør – timer × satser, trekk, utbetalingsstatus ¦ Monthly settlement – hours × rates, deductions, payment status
Stawki rotacji, projektów i indywidualne ¦ Satser for turnus, prosjekter og individuelle ¦ Rotation, project and individual rates
Brutto razem ¦ Brutto totalt ¦ Gross total
Netto (szac. ¦ Netto (anslag ¦ Net (est.
Wypłacone ¦ Utbetalt ¦ Paid
osób ma ¦ personer har ¦ people have
osoba ma ¦ person har ¦ person has
godziny bez stawki – ustaw stawkę domyślną, rotacji, projektu albo indywidualną. ¦ timer uten sats – sett standardsats, turnussats, prosjektsats eller individuell sats. ¦ hours without a rate – set a default, rotation, project or individual rate.
Eksport CSV (oktober {0} ¦ Eksporter CSV (oktober {0} ¦ Export CSV (October {0}
nadg. {0} h ¦ overtid {0} t ¦ overtime {0} h
Ustawienia wypłaty ¦ Lønnsinnstillinger ¦ Pay settings
Wypłata ¦ Lønn ¦ Pay
Ogólne ¦ Generelt ¦ General
Kolejność ¦ Rekkefølge ¦ Order
indywidualna stawka pracownika ¦ individuell sats for ansatt ¦ the employee’s individual rate
stawka ¦ sats ¦ rate
projektu ¦ prosjekt ¦ project
rotacji ¦ turnus ¦ rotation
Puste pole = nie ustawiono (bierze następną z kolejki). ¦ Tomt felt = ikke satt (neste i rekkefølgen brukes). ¦ Empty field = not set (the next one in order is used).
Stawka domyślna / h ¦ Standardsats / t ¦ Default rate / h
Podatek domyślny % ¦ Standard skatt % ¦ Default tax %
Nadgodziny po ilu h dziennie ({0} = wyłączone ¦ Overtid etter hvor mange t per dag ({0} = av ¦ Overtime after how many h per day ({0} = off
Dodatek za nadgodziny % ¦ Overtidstillegg % ¦ Overtime bonus %
Stawki rotacji ¦ Turnussatser ¦ Rotation rates
Stawki projektów ¦ Prosjektsatser ¦ Project rates
Stawki indywidualne (wygrywają zawsze ¦ Individuelle satser (gjelder alltid først ¦ Individual rates (always win
jak rotacja ¦ som turnus ¦ like rotation
bez indywidualnej ¦ uten individuell ¦ without individual
Zapisz stawki ¦ Lagre satser ¦ Save rates
Stawki zapisane ¦ Satser lagret ¦ Rates saved
Stawka indywidualna / h (puste = auto ¦ Individuell sats / t (tomt = auto ¦ Individual rate / h (empty = auto
Dodatek stały / mies. ¦ Fast tillegg / mnd. ¦ Fixed bonus / month
Potrącenia / mies. ¦ Trekk / mnd. ¦ Deductions / month
Opis potrąceń ¦ Beskrivelse av trekk ¦ Deduction description
np. mieszkanie, zaliczka ¦ f.eks. bolig, forskudd ¦ e.g. housing, advance
Notatka księgowej (widzi tylko księgowa i admin ¦ Notat fra regnskap (kun synlig for regnskap og admin ¦ Accountant’s note (visible to the accountant and admin only
projekty mogą mieć własne stawki). ¦ prosjekter kan ha egne satser). ¦ projects can have their own rates).
Dni pracy ¦ Arbeidsdager ¦ Working days
Wypłaty i stawki ¦ Lønn og satser ¦ Payroll and rates
Godziny pracy + projekty ¦ Arbeidstimer + prosjekter ¦ Work hours + projects
Domy, auta, tankowania ¦ Hus, biler, tanking ¦ Houses, cars, refuelling
Cały program ¦ Hele programmet ¦ The whole program
Cały program, wybrany użytkownik albo wybrane części ¦ Hele programmet, valgt bruker eller valgte deler ¦ The whole program, a selected user or selected parts
Wszystkie dane i pliki (bilety, umowy, paragony, zrzuty ekranu). Tą kopią można przenieść aplikację na inne urządzenie. ¦ Alle data og filer (billetter, kontrakter, kvitteringer, skjermbilder). Med denne kopien kan appen flyttes til en annen enhet. ¦ All data and files (tickets, contracts, receipts, screenshots). With this backup the app can be moved to another device.
Autorzy anonimowych zgłoszeń i hasła innych osób nie są zapisywani. ¦ Avsendere av anonyme henvendelser og andres passord lagres ikke. ¦ Authors of anonymous reports and other people’s passwords are not saved.
Pobierz kopię całości ¦ Last ned kopi av alt ¦ Download full backup
Wybrany użytkownik ¦ Valgt bruker ¦ Selected user
Konto, godziny, dokumenty, bilety, wiadomości i zgłoszenia jednej osoby. ¦ Konto, timer, dokumenter, billetter, meldinger og henvendelser for én person. ¦ Account, hours, documents, tickets, messages and reports of one person.
Użytkownik ¦ Bruker ¦ User
Pobierz kopię użytkownika ¦ Last ned kopi av bruker ¦ Download user backup
Wybrane części ¦ Valgte deler ¦ Selected parts
Pobierz wybrane ¦ Last ned valgte ¦ Download selected
Przywracanie ¦ Gjenoppretting ¦ Restore
Kopia ¦ Kopi ¦ Backup
całości ¦ av alt ¦ of everything
zastępuje obecne dane. Kopia ¦ erstatter nåværende data. Kopi ¦ replaces the current data. A backup of a
użytkownika ¦ bruker ¦ user
lub ¦ eller ¦ or
wybranych części ¦ valgte deler ¦ selected parts
jest ¦ er ¦ is
dołączana ¦ lagt til ¦ merged in
brakujące wpisy wracają, istniejące są aktualizowane, nic nie jest kasowane. ¦ manglende oppføringer kommer tilbake, eksisterende oppdateres, ingenting slettes. ¦ missing entries come back, existing ones are updated, nothing is deleted.
Wybierz plik kopii ¦ Velg kopifil ¦ Choose backup file
Zresetuj dane demo ¦ Tilbakestill demodata ¦ Reset demo data
Zaznacz co najmniej jedną część ¦ Merk minst én del ¦ Tick at least one part
Kopia pobrana ¦ Kopi lastet ned ¦ Backup downloaded
cały program ¦ hele programmet ¦ whole program
To nie jest kopia CrewControl ¦ Dette er ikke en CrewControl-kopi ¦ This is not a CrewControl backup
Kopię użytkownika lub części może dołączyć kierownik albo admin (po zalogowaniu ¦ Kopi av bruker eller deler kan legges til av leder eller admin (etter innlogging ¦ A user or partial backup can be merged by a manager or admin (after logging in
Brakujące dane wrócą, nic nie zostanie usunięte. ¦ Manglende data kommer tilbake, ingenting slettes. ¦ Missing data comes back, nothing is deleted.
Dołączono ¦ Lagt til ¦ Merged
Dołączono ({0} wpisów ¦ Lagt til ({0} oppføringer ¦ Merged ({0} entries
Pełną kopię przywraca kierownik albo admin ¦ Full kopi gjenopprettes av leder eller admin ¦ A full backup is restored by a manager or admin
Obecne dane zostaną zastąpione. ¦ Nåværende data blir erstattet. ¦ The current data will be replaced.
Przywrócono kopię ¦ Kopi gjenopprettet ¦ Backup restored
Kopia wczytana – zaloguj się swoim loginem i hasłem ¦ Kopi lastet inn – logg inn med brukernavn og passord ¦ Backup loaded – log in with your username and password
Usunąć wszystkie dane demo i wczytać od nowa? ¦ Slette alle demodata og laste inn på nytt? ¦ Delete all demo data and load it again?
Nowa grupa rotacyjna ¦ Ny turnusgruppe ¦ New rotation group
Edytuj rotację ¦ Rediger turnus ¦ Edit rotation
np. Rotacja A ¦ f.eks. Turnus A ¦ e.g. Rotation A
Tygodnie w Norwegii ¦ Uker i Norge ¦ Weeks in Norway
Tygodnie w Polsce ¦ Uker i Polen ¦ Weeks in Poland
Pierwszy dzień w Norwegii (start cyklu ¦ Første dag i Norge (syklusstart ¦ First day in Norway (cycle start
Zapisano rotację ¦ Turnus lagret ¦ Rotation saved
Usunięto rotację ¦ Turnus slettet ¦ Rotation deleted
przesunięto o +1 tydzień ¦ flyttet +1 uke ¦ shifted by +1 week
przesunięto o −1 tydzień ¦ flyttet −1 uke ¦ shifted by −1 week
Instalacja na telefonie ¦ Installer på telefonen ¦ Install on the phone
Dla pracownika ¦ For ansatte ¦ For employees
Dla szefa firmy ¦ For daglig leder ¦ For the company owner
Drukuj / zapisz PDF ¦ Skriv ut / lagre PDF ¦ Print / save PDF
Instalacja i obsługa aplikacji – do pokazania lub wydrukowania ¦ Installasjon og bruk av appen – for visning eller utskrift ¦ Installing and using the app – to show or print
Odbiorca musi potwierdzić w aplikacji, że dostał kartę. Do tego czasu karta jest zapisana na Marek Kowalski. ¦ Mottakeren må bekrefte i appen at kortet er mottatt. Inntil da står kortet på Marek Kowalski. ¦ The recipient must confirm in the app that they received the card. Until then the card is registered to Marek Kowalski.
Witajcie w nowej aplikacji 👋 Wpisujcie codziennie godziny i projekty. ¦ Velkommen til den nye appen 👋 Registrer timer og prosjekter hver dag. ¦ Welcome to the new app 👋 Log your hours and projects every day.
albo ¦ eller ¦ or
projekt ¦ prosjekt ¦ project
{0} aktywnych kont ¦ {0} aktive kontoer ¦ {0} active accounts
np. jan@gmail.com ¦ f.eks. jan@gmail.com ¦ e.g. jan@gmail.com
Utworzono dane demonstracyjne ¦ Demodata opprettet ¦ Demo data created
Umowa o pracę {0} (demo – bez pliku ¦ Arbeidskontrakt {0} (demo – uten fil ¦ Employment contract {0} (demo – no file
np. Umowa o pracę {0} ¦ f.eks. Arbeidskontrakt {0} ¦ e.g. Employment contract {0}
`;
const I18N_DICT = { no: {}, en: {} };
I18N_RAW.split('\n').forEach(l => { const p = l.split(' ¦ '); if (p.length === 3) { I18N_DICT.no[p[0].trim()] = p[1].trim(); I18N_DICT.en[p[0].trim()] = p[2].trim(); } });
