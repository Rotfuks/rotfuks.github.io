# Evida — Website (evida-health.de)

Marketing-Website für die **Evida**-App. Sie bewirbt die App, erklärt, was man mit
ihr tun kann, schafft Vertrauen durch den Blick auf die Kurationsarbeit und führt
zur eigentlichen App. **Evida ist ein studentischer Forschungsprototyp** der
FernUniversität in Hagen (siehe `impressum.html`).

> **Marken­prinzip:** Evidenz statt Versprechen. Orientierung statt Überforderung.

Es ist eine **statische Website** — reines HTML/CSS, **kein JavaScript**, kein
Build-Schritt. Sie kann unverändert auf GitHub Pages (oder jeden statischen Host)
gelegt werden.

---

## Schnellstart

```bash
# Im Ordner website/ einen statischen Server starten, z. B.:
python3 -m http.server 8000
# dann http://localhost:8000/ öffnen
```

Ein lokaler Server wird empfohlen (statt die Datei per `file://` zu öffnen), damit
die relativen Pfade zum Design System, zu den Stylesheets und Bildern sauber laden.

---

## Deployment (GitHub Pages)

Den Inhalt dieses Ordners ins Repository legen und GitHub Pages auf den
entsprechenden Branch/Ordner zeigen lassen. Es ist nichts zu kompilieren.

- `.nojekyll` ist enthalten, damit GitHub Pages die Dateien 1:1 ausliefert
  (kein Jekyll-Processing).
- Alle Pfade sind relativ — die Seite funktioniert sowohl unter einer eigenen
  Domain (`evida-health.de`) als auch unter einem Projekt-Unterpfad
  (`username.github.io/repo/`).

---

## Projektstruktur

```
website/
├── index.html          Startseite (Landingpage) — fertiges statisches HTML
├── impressum.html      Impressum-/Hinweis-Seite — fertiges statisches HTML
├── index.css           Resets, Dokument-Verhalten, responsive @media-Regeln,
│                       FAQ-Akkordeon- und CTA-Styles
├── .nojekyll           Schaltet das Jekyll-Processing auf GitHub Pages ab
├── assets/
│   └── evida-lockup-horizontal.svg
├── screenshots/        App- und Konsolen-Screenshots, die auf der Seite gezeigt werden
│   ├── crop-home.png
│   ├── crop-lib.png
│   ├── crop-chat.png
│   ├── crop-plan-view.png
│   └── admin-console.png
└── ds/                 Evida Design System (nur CSS-Tokens)
    ├── styles.css      Einstiegspunkt (importiert die Token-Dateien)
    └── tokens/         colors · typography · spacing · fonts · base
```

---

## Technik

- **Statisch, ohne JavaScript.** Die Seiten sind vollständig ausgeschriebenes HTML.
  Es gibt kein React, kein Babel und keinen Build-Schritt — der Browser lädt nur
  HTML + CSS (und die Webfonts).
- **Styling:** Die Optik kommt aus Inline-Styles auf Basis der Design-Tokens
  (CSS-Variablen `--evida-*`). Globale Resets und alle responsiven Umbrüche stehen
  in `index.css`; die Tokens in `ds/`.
- **Webfonts:** Inter, Source Sans 3 und IBM Plex Mono werden über die Google-Fonts-
  CDN geladen (`ds/tokens/fonts.css`).
- **Interaktion ohne Skript:**
  - Das **FAQ** nutzt native `<details>/<summary>`-Elemente (aufklappbar, ohne JS).
  - Alle **Buttons sind Links** (`<a>`): „App öffnen“ / „Jetzt ausprobieren“ führen
    zur App, „So funktioniert Evida“ ist ein Anker auf der Seite.

### Verlinkungen
- **App öffnen / Evida Health** → `https://app.evida-health.de`
- **Evida Admin** (Kuratoren-Konsole) → `https://admin.evida-health.de`
- **Impressum** → `impressum.html`

---

## Inhalt der Startseite (`index.html`)

| Abschnitt        | Inhalt |
|------------------|--------|
| **Nav**          | Logo, Anker (Funktionen · Methodik · Vertrauen), CTA „App öffnen“ |
| **Hero**         | Kernclaim, App-Screenshot im Phone-Rahmen, schwebende Evidenz-Karten |
| **Prinzip-Leiste** | Unabhängig · Studienbasiert · Transparent · Entscheidungshoheit |
| **So funktioniert's** | Orientierung in drei Schritten |
| **Funktionen**   | Bibliothek, Methodik/Evidenz-Score, Assistent, Mein Plan |
| **Vertrauen**    | 4-Augen-Prinzip (Entwurf → In Prüfung → Verifiziert), Konsolen-Screenshot |
| **Datenschutz/Unabhängigkeit** | Ehrliche Produkt-Werte |
| **FAQ**          | Häufige Fragen (aufklappbar) |
| **Abschluss-CTA**| „App öffnen“ |
| **Footer**       | Produkt · App (Evida Health / Evida Admin) · Rechtliches (Impressum) |

---

## Bearbeiten

Da es sich um statisches HTML handelt, werden Texte und Links direkt in
`index.html` bzw. `impressum.html` geändert. Layout-/Abstands-Anpassungen für
kleine Bildschirme gehören in die `@media`-Regeln in `index.css`.

> Hinweis: Diese Seiten wurden aus einem früheren React-Entwurf in statisches HTML
> überführt. Die Inline-Styles sind daher dicht — fürs Anpassen von Texten und
> Links aber unproblematisch.

---

## Hinweis

Diese Website und alle gezeigten Inhalte sind ein **Prototyp** und Teil einer
Seminararbeit. Es werden keine realen Gesundheits-, Ernährungs- oder
Medizin­empfehlungen gegeben. Details siehe `impressum.html`.

*Stand: Juni 2026 · FernUniversität in Hagen.*
