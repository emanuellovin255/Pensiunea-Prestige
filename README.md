# Pensiunea Prestige — Roșiori de Vede

Site static de prezentare pentru Pensiunea Prestige, str. Dunării nr. 181,
Roșiori de Vede, județul Teleorman.

## Cum îl pui online

Nu are build step și nu are dependințe. Urci folderul ca atare:

- **Netlify / Vercel / Cloudflare Pages** — drag & drop pe folder, gata.
- **Hosting clasic (cPanel, FTP)** — copiezi tot conținutul în `public_html`.

Pentru test local:

```bash
python3 -m http.server 8000
```

Apoi deschizi <http://localhost:8000>.

## Structură

```
index.html               Acasă
camere.html              Camere & facilități
cazare-muncitori.html    Cazare pentru echipe de muncitori
galerie.html             Galerie foto cu lightbox
contact.html             Contact + formular care compune mesaj WhatsApp
assets/css/style.css     Tot stilul, cu variabile în :root
assets/js/main.js        Meniu mobil, reveal la scroll, galerie, formular
assets/img/              Fotografiile (preluate de pe pagina de Facebook)
robots.txt, sitemap.xml  SEO
```

## Ce mai poate fi îmbunătățit

1. **Conținut neconfirmat.** Textele au fost scrise strict pe baza informațiilor
   publice de pe pagina de Facebook. Nu sunt confirmate și *nu apar* pe site:
   numărul exact de camere, dacă micul dejun e inclus, parcarea, Wi-Fi-ul.
   Când le confirmi, se pot adăuga în `camere.html` și în lista de facilități.
2. **Poze mai bune.** Cinci fotografii sunt la rezoluție mare (1440px), restul
   la 414px — atât era public pe Facebook. Dacă ai originalele, înlocuiește
   fișierele din `assets/img/` păstrând aceleași nume.

## Mod "site în lucru" (pauză)

Site-ul poate fi pus pe pauză fără să ștergi nimic: `maintenance.html` e o
pagină de sine stătătoare ("Revenim în curând" + telefon și WhatsApp), iar
blocul `redirects` din `vercel.json` trimite orice adresă către ea, temporar
(HTTP 307, deci Google nu pierde paginile indexate).

Rămân accesibile normal: `/maintenance.html`, `/assets/*`, `/robots.txt`,
`/sitemap.xml` și `/.well-known/*`.

**Ca să repui site-ul online:** șterge blocul `"redirects": [ ... ]` din
`vercel.json` și dă push. Paginile revin instant, nimic altceva nu se schimbă.

**Ca să-l pui iar pe pauză:** adaugi blocul înapoi.

```json
"redirects": [
  { "source": "/", "destination": "/maintenance.html", "permanent": false },
  {
    "source": "/:path((?!maintenance\\.html$|assets/|\\.well-known/|robots\\.txt$|sitemap\\.xml$|favicon).+)",
    "destination": "/maintenance.html",
    "permanent": false
  }
],
```

Dacă pauza ține mai mult de câteva săptămâni, mai bine schimbăm pe un răspuns
`503` cu `Retry-After` (are nevoie de o funcție pe Vercel) — redirectul temporar
e gândit pentru pauze scurte.

## Găzduire

Site-ul rulează pe **Vercel**, domeniul canonic este
<https://www.pensiuneaprestige1.ro> (apex-ul redirecționează 308 către `www`).

`vercel.json` setează headerele de securitate (CSP, X-Frame-Options,
X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, HSTS,
Permissions-Policy) și cache-ul lung pentru `assets/`. Dacă schimbi domeniul,
caută `www.pensiuneaprestige1.ro` în `.html`, `robots.txt` și `sitemap.xml` —
afectează canonical, Open Graph și datele structurate.

## Contact folosit în site

- Telefon: `0762 685 300` (`tel:+40762685300`)
- WhatsApp: `https://wa.me/40762685300`

Numărul apare în header, în footer, în blocurile CTA și în butonul flotant.
Dacă se schimbă, caută `40762685300` în tot proiectul.
