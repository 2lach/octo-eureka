<!--
### Bakgrund:

På webbplatsen entreprenor.se ska frontend göras om till en React/NextJS-lösning.

#### Problem:

På webbplatsen finns olika innehållstyper. Ex nyhetsartikel, textsida, tv. Dock går det inte utifrån URL:en att avgöra vilken innehållstyp det är.

#### Exempel:

https://www.entreprenor.se/nyheter/han-ar-sveriges-framsta-entreprenor_729641.html
https://www.entreprenor.se/tips-fran-experten/10-tips-sa-far-du-fart-pa-exporten_725738.html
https://www.entreprenor.se/nyheter/staten-tar-utan-att-betala_698764.html
https://www.entreprenor.se/om_entreprenor/information-om-cookies_578230.html
De första två är nyheter, den tredje är ett tv-klipp och den fjärde en text-artikel.

För att få reda på vilken innehållstyp en viss URL har måste man göra ett anrop till backend. Då får man ett json-svar som innehåller all metadata som behövs.

#### Uppgift:

Resonera kring en lösning på hur två olika URLer som är uppbyggda enligt samma mönster (https://www.entreprenor.se/{sectionPath}/{articleTitle}_{articleID}.html) ska kunna får helt olika utseenden. Om möjligt, ge kodexempel eller pseudokod.
-->

## Lösning för frontend biten:

Steg nummer ett att att som sagt hämta hem json-datan med ett exempelvis med metoden fetch() eller ett paket som axios(), där man kan specificera headers och övrig data som man kan behöva skicka med för att man ska få den datan som man efterfrågar.

när man väl har datan (det är fördelaktigt att hämta den med ett promise ex: async & await, så inte det blir fel och saker börjar renderas innan allt är på plats) är det som regel en bra idé inom react att göra om den datan från ett json objekt till en array vilket man kan göra med exempelvis object metoden `Object.keys` och sen chainar man en map() metod eller en loop for eller foreach fungerar båda bra, men personligen gillar jag map då den är snabb och enkel i sin struktur. På så sätt får man också tillgång till värdena i objektet så de blir indexerade.

Slutligen kommer man till renderingen av data.
Där kan man lösa uppgiften på ett flertal sätt.

Man skulle kunna spara ett värde i json objektet som definerar vilket typ av artikel det handlar om och därefter rendera sidan baserat på det värdet och vilka andra värden just den artikeln kommer att innehålla.

man kan rendera värdena från objektet "conditionally" vilket i princip innebär att man kodar en lösning om beroende på vad artikeln innehåller. Detta skulle kunna innebära att en artikel som innehåller brödtext och en bild renderas i en komponent, en annan som enbart innehåller text renderas genom komponent nummer 2. Och en tredje genom en tredje komponent.


### min lösning

Jag hämtar hem en random sida av de angivna länkarna och med filen server.js (som är en liten express.js server jag slog ihop) sen omvandlar jag vissa viktiga element från sidan till en json fil (vilket är i beteende rätt lik en en json respons).
Jag hämtar sen hem den json filen jag skapade på serven i en 
react app (som jag bootstrappade med create-react-app) och parsar datan från json filen för att till slut rendera den på sidan.

för att köra projekten är det nödvändigt att ha node.js & npm installerat, samt en terminal/kommandotolk

detta är en översikt av projektet:

~/

├── README.md
|
├── frontend
|
│   ├── README.md
|   |
│   ├── package-lock.json
|   |
│   ├── package.json
|   |
│   ├── public
|   |
│   │   ├── favicon.ico
|   |   |
│   │   ├── index.html
|   |   |
│   │   ├── manifest.json
|   |   |
│   │   └── output.json
|   |
│   ├── src
|   |
│   │   ├── App.css
|   |   |
│   │   ├── App.js
|   |   |
│   │   ├── App.test.js
|   |   |
│   │   ├── data
|   |   |
│   │   ├── index.css
|   |   |
│   │   ├── index.js
|   |   |
│   │   └── serviceWorker.js
|   |
│   └── yarn.lock
|
├── move-json.js
|
├── package-lock.json
|
├── package.json
|
└── server.js 


setup:
gå i projektet med en terminal 
I projektets root

kör:
`npm install`

sen:
`npm run install:FE`

sen är det bara att köra:

`npm run backend` för att starta servern och hämta hem data
`npm run frontend` för att se resultatet