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
