# Strandmaatje

**Samen vermiste kinderen terugvinden aan de Belgische kust.**

Een ouder meldt een vermist kind, en iedereen in dezelfde kustgemeente ziet de melding en kan laten weten dat hij het kind gezien heeft. Project voor Mobile Applications (UCLL), gebouwd op de UCLL-boilerplate (Expo, React Native, Expo Router, Zustand) met Supabase als backend.

- **Live PWA:** https://strandmaatje.vercel.app/
- **Versie:** 1.0.0 (opdracht 1: PWA)
- **Student:** Rik Vanbrabant

---

## Testaccounts

| Rol | E-mail | Wachtwoord |
| --- | --- | --- |
| Admin | `rik@gmail.com` | `wachtwoord123` |
| Redder | `jef@gmail.com` | `wachtwoord123` |
| Bezoeker | `marina@gmail.com` | `wachtwoord123` |

Een nieuw account via **Account maken** is altijd een bezoeker. Alleen een beheerder kan iemand redder of admin maken. In deze versie zien alle rollen nog hetzelfde.

---

## Wat werkt in deze versie

| Onderdeel | Status |
| --- | --- |
| Inloggen, registreren en afmelden (Supabase Auth) | Werkt |
| Automatisch naar het loginscherm als je niet ingelogd bent; ingelogd blijven na herladen | Werkt |
| Rollen (admin, redder, bezoeker) en kustgemeente per gebruiker | Werkt (database) |
| Startscherm: kustgemeente, actieve meldingen, knop "Kind vermist melden" | Scherm klaar, vaste data |
| Scherm "Wat anderen zien": "Heb je dit meisje gezien?" | Scherm klaar, vaste data |
| Menu onderaan: Start, Meldingen, Afmelden | Werkt |
| Installeerbaar als PWA, opent offline | Werkt |

**Volgt in de native versie:** meldingen uit Supabase in plaats van vaste data, kind vermist melden, melding afsluiten met "Gevonden", kustgemeente kiezen, pushmeldingen, foto van het kind, rechten per rol en E2E-tests met Cypress.

---

## Lokaal starten

**Vereisten:** Node.js (LTS) en Git.

**1. Project ophalen en installeren**

```bash
git clone https://github.com/RikVanbrabant/Mobile-application-project.git
cd Mobile-application-project
npm install
```

**2. `.env` aanmaken**

Maak in de root (naast `package.json`) een bestand `.env` met:

```
EXPO_PUBLIC_SUPABASE_URL=https://aemnatxmzjxbgywtpskj.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=sb_publishable_fYrH1qhnDUW85XA6vKPEwA_H2ex-eIP
```

- `EXPO_PUBLIC_SUPABASE_URL` is de Project URL van Supabase, zonder `/rest/v1` erachter.
- `EXPO_PUBLIC_SUPABASE_KEY` is de **publishable key** (begint met `sb_publishable_`). Die mag in een app staan: de data wordt beschermd door Row Level Security in de database.

`.env` staat in `.gitignore` en komt dus niet op GitHub. Na een wijziging in `.env` moet je Expo herstarten.

**3. Starten**

```bash
npx expo start --web
```

Open `http://localhost:8081`. Op een gsm testen via eduroam: `npx expo start --tunnel`.

---

## Build en deploy (PWA)

**Build**

```bash
npx expo export -p web
npx serve dist
```

De build komt in `dist/`. Op `http://localhost:3000` kan je in Chrome DevTools → **Application** het manifest en de service worker controleren.

**Wat de app installeerbaar maakt**

- `public/manifest.json`: naam, iconen, standalone-weergave en themakleur.
- `public/sw.js`: service worker die de app offline laat openen. Supabase-verzoeken worden nooit gecachet, zodat meldingen altijd live zijn.
- `app/+html.tsx`: koppelt het manifest en registreert de service worker.

**Deploy**

De app staat op Vercel en wordt bij elke push naar `main` opnieuw gebouwd (`vercel.json`: `npx expo export -p web`, map `dist`). In Vercel staan `EXPO_PUBLIC_SUPABASE_URL` en `EXPO_PUBLIC_SUPABASE_KEY` als Environment Variables.

**Installeren op een gsm**

- **iPhone:** open de link in Safari → **Deel** → **Zet op beginscherm**.
- **Android:** open de link in Chrome → menu → **App installeren**.

---

## Backend (Supabase)

| Tabel | Inhoud |
| --- | --- |
| `auth.users` | Ingebouwd in Supabase: e-mail, wachtwoord, sessies |
| `profiles` | Naam, rol (`admin`, `redder`, `bezoeker`) en kustgemeente per gebruiker |
| `reports` | Meldingen: voornaam, leeftijd, beschrijving, gemeente, plaats, laatst gezien, status |

- **Row Level Security** staat aan op alle tabellen. Alleen ingelogde gebruikers zien meldingen, en je kan alleen je eigen profiel wijzigen.
- Een gebruiker kan zijn **rol niet zelf aanpassen**.
- Bij registratie maakt een trigger automatisch een profiel aan met de rol `bezoeker`.
- De gemeente staat in de database, zodat de server later kan bepalen wie een pushmelding krijgt.

> Het Supabase-project draait op het gratis plan en wordt gepauzeerd na een week zonder gebruik. Lukt inloggen niet, dan moet het project in het dashboard opnieuw gestart worden.

---

## Release notes

**1.0.0:** login, registratie en afmelden met Supabase; rollen per gebruiker; startscherm en scherm "Wat anderen zien" volgens de mockups; menu onderaan; installeerbare PWA op Vercel.

---

## Idee van de app

### Het probleem

In juli 2026 registreerden de kustredders 377 verloren gelopen kinderen tussen 0 en 12 jaar aan de Belgische kust ([VRT NWS](https://www.vrt.be/vrtnws/nl/2026/08/03/drukke-julimaand-voor-strandredders-231-interventies-en-466-ver/)). Een ouder die zijn kind kwijt is, kan vandaag alleen zelf rondlopen of naar een redderspost gaan. De mensen die het kind misschien net gezien hebben, weten niet dat iemand het zoekt.

Strandmaatje maakt van iedereen op hetzelfde strand een extra paar ogen. Locatie werkt per kustgemeente (de tien Belgische kustgemeenten, van De Panne tot Knokke-Heist) in plaats van met live GPS: eenvoudiger, zuiniger voor de batterij, en zonder de exacte locatie van gebruikers te delen.

### Doelgroep

| Wie | Wat ze nodig hebben |
| --- | --- |
| **Ouders en begeleiders** van jonge kinderen aan de kust, ook toeristen | Een kind snel en zonder gedoe kunnen melden, en weten of iemand het gezien heeft |
| **Strandgangers** in dezelfde gemeente | Snel herkennen of het kind voor hen staat, en dat met één tik laten weten |
| **Redders** (rol `redder`) | Alle meldingen in hun gemeente zien en mee zoeken |
| **Beheerders** (rol `admin`) | Rollen toekennen en misbruik opvolgen |

### Wat ik ga bouwen: roadmap

- [x] **1.0.0: PWA** (opdracht 1)
  - [x] Login, registratie en afmelden met Supabase
  - [x] Rollen admin, redder en bezoeker
  - [x] Startscherm en scherm "Wat anderen zien" volgens de mockups
  - [x] Menu onderaan
  - [x] Installeerbare PWA op Vercel
- [ ] **1.1: echte meldingen**
  - [ ] Meldingen uit Supabase op het startscherm
  - [ ] Kind vermist melden in twee stappen: wie en waar
  - [ ] "Ik heb dit kind gezien" opslaan als reactie
  - [ ] Melding afsluiten met "Gevonden"
  - [ ] Kustgemeente kiezen
- [ ] **2.0: native app** (opdracht 2, deadline 31/12)
  - [ ] Builds voor Android en iOS met EAS
  - [ ] Pushmelding bij een nieuwe melding in je gemeente
  - [ ] Foto van het kind (galerij of camera) en optionele kaartpin
  - [ ] Rechten per rol (redders en admins)
  - [ ] E2E-tests met Cypress
- [ ] **Pitch en video** (9/01)

### Concurrenten

| Bestaande oplossing | Hoe het werkt | Verschil met Strandmaatje |
| --- | --- | --- |
| Gratis polsbandje van de kustredders (IKWV) | Bandje met naam en gsm-nummer van de ouder ([VRT NWS](https://www.vrt.be/vrtnws/nl/2026/08/03/drukke-julimaand-voor-strandredders-231-interventies-en-466-ver/)) | Helpt pas als iemand het kind al gevonden heeft; niemand weet dat er gezocht wordt |
| Verdwaalpalen (Studio 100 en Child Focus) | Vaste ontmoetingspunten op het strand ([VRT NWS](https://www.vrt.be/vrtnws/nl/2022/07/09/hoe-kan-je-vermijden-dat-je-kind-verdwaalt-en-wat-als-het-toch/)) | Werkt alleen als het kind de afspraak onthoudt en de paal vindt |
| Omroepen via de redders | Redders roepen om en zoeken met alle posten ([VRT NWS](https://www.vrt.be/vrtnws/nl/2022/07/09/hoe-kan-je-vermijden-dat-je-kind-verdwaalt-en-wat-als-het-toch/)) | Bereikt alleen wie in de buurt is en het hoort; Strandmaatje vult dit aan |
| GPS-kinderhorloge (bv. Kigo) | Ouder volgt het kind via een app ([iCulture](https://www.iculture.nl/nieuws/vodafone-kinderbrigade-kigo-horloge/)) | Kost ongeveer €189 plus een abonnement, en het kind moet het horloge dragen |
| FBI Child ID-app (VS) | Bewaart foto's en gegevens van je kind om aan de politie te tonen ([KVIA](https://kvia.com/news/2024/05/28/abc-7-at-4-fbis-new-child-id-app-helpful-tool-for-parents)) | Alleen voor de politie; verwittigt geen mensen in de buurt |

**Wat Strandmaatje anders doet:** het kind hoeft niets te dragen, en de melding bereikt meteen iedereen op hetzelfde strand, niet alleen de redders of de politie.