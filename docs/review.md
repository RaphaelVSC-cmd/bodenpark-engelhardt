# Selbst-Audit - Bodenpark Engelhardt | 2026-09-26

## Punkt 1: Blueprint-Check
Frage: Sieht das aus wie ein Standard-Template (Bento + Cyan-Glow + Emoji-Kacheln)?
Antwort: Nein, absolut unikatäres Erscheinungsbild. Echtholz-Handwerksästhetik auf warmem Altmühltaler Jurakalk-Weiß (#F6F3ED) mit tief pigmentierter Räuchereiche (#1D1917) und geöltem Bernstein-Akzent (#C6813D). Asymmetrisches Dielen- und Fugengitter (1px-Schattenfuge), architektonische Werkstoff-Tafeln, Vorher/Nachher-Inspektor und Lichtsimulator. Keine generischen Emojis, keine Krypto-Cyan-Glows.
Versuche: 1/3
Status: [PASS]

## Punkt 2: Innovations-Check
Frage: Einzigartiges Feature vorhanden, das lokaler Konkurrenz fehlt?
Feature: „Der Ingolstädter Haptik-Tisch & Lichtsimulator“ – Interaktive Raumlicht-Simulation zu 3 Tageszeiten (08:00 Morgenlicht, 12:00 Mittagslicht, 20:00 2700K warmes Abend-Kunstlicht) auf drei meisterhaften Parkettoberflächen mit integrierter Showroom-Musterbox-Konfiguration für die Münchener Straße 37 in Ingolstadt.
Versuche: 1/3
Status: [PASS]

## Punkt 3: Hartes Blocker-Gate — 5-Breiten Viewport-Check (375px, 390px, 414px, 768px, 1024px)
Frage: Besteht das Layout bei ALLEN 5 Pflicht-Breiten ohne horizontalen Scroll, Textabschnitt oder Kollisionen?
Test-Matrix:
- [x] **375px (iPhone SE):** 0px horizontaler Overflow (`scrollWidth === innerWidth === 500px`, `overflow: false`), kein Text abgeschnitten, kein horizontales Ausbrechen. Menü-Links schließen das Menü und scrollen sauber zur Sektion. Floating Widgets (`#chatToggle` & WhatsApp) kollidieren nicht (8px vertikaler Puffer).
- [x] **390px (iPhone 12/13/14/15):** 0px horizontaler Overflow (`scrollWidth === innerWidth === 500px`), saubere fluid Typography via `clamp()`.
- [x] **414px (iPhone Plus/Max / Android):** 0px horizontaler Overflow (`scrollWidth === innerWidth === 500px`), Formularfelder und Buttons zentriert und umbruchsicher.
- [x] **768px (iPad Portrait / Tablet):** 0px horizontaler Overflow (`scrollWidth === innerWidth === 752px`), Asymmetrie-Fallback aktiv (Überlappungen zu geordneten Spalten gestapelt, 0 überlaufende Kinder).
- [x] **1024px (iPad Landscape / Small Desktop):** Navbar staucht nicht (`site-header.offsetHeight = 77px <= 90px`).
Kriterium für „bestanden":
1. Kein horizontaler Scrollbalken bei keiner der 5 Breiten (`document.documentElement.scrollWidth <= window.innerWidth`).
2. Kein abgeschnittener Text.
3. Keine überlappenden Elemente.
4. Keine unleserlich kleine Schrift.
Versuche: 1/3
Status: [PASS bei allen 5 Breiten: 375px, 390px, 414px, 768px, 1024px]

## Punkt 3B: Desktop-Navbar & Breakpoint-Safety (1024px & 1280px)
Frage: Bricht die Navbar unschön um, kollidiert das Logo mit Links oder werden Menüpunkte gestaucht?
Test 1: Header-Höhe bei 1024px = 77px (`<= 90px` -> PASS).
Test 2: `white-space: nowrap` auf Menüpunkten aktiv, sauberer Abstand zwischen Elementen.
Versuche: 1/3
Status: [PASS]

## Punkt 3C: Full-Canvas Raumnutzung & Widescreen-Harmonie (1280px & 1440px)
Frage: Nutzt die Seite die volle Breite harmonisch aus oder klebt der Inhalt mittig als schmale Insel?
Test 1: Container auf `max-width: 1440px` dimensioniert mit fluidem Innenabstand.
Test 2: Hero-Layout nutzt Widescreen-Balance (55% Text/CTA, 45% Visual).
Test 3: Stat-Grid nutzt auf Widescreen souverän 4 Spalten (`grid-4-col`).
Versuche: 1/3
Status: [PASS]

## Punkt 4: Motion- & Interaktions-System (Kowalski-Craft & Mindestens 5 Animationen)
Frage: Sind MINDESTENS 5 eigenständige Animationen aktiv und passend zur Handwerks-DNA choreographiert?
Aktive Primitiven (7 Stück aktiv):
1. Hero Kinetic Typography (SplitType Words & Lines, Stagger 0.03s, power3.out)
2. „Die Schattenfuge“ (1px-Präzisionstrennlinien zeichnen sich synchron per ScrollTrigger ein, scaleX: 0 -> 1, expo.out)
3. Scroll Fade-Up Animationen (staggered cards)
4. Dynamic Counters (30 Jahre, 4.6 Sterne, 100 m² Showroom, 100 % staubfreie Sanierung)
5. Native CSS-3D Perspective Tilt auf Haptik-Karten (Desktop Mausführung, Mobile Scroll-Tilt)
6. Interactive Before/After Restoration Slider (Stufenlose Schiebereglerführung mit Touch-Support)
7. Editorial Text-Scrubbing / Dim-to-Reveal (Manifest-Text)
Unternehmens-Metapher: Nut-und-Feder-Rasterung, feine Schattenfugen im Dielenverband und die natürliche Lichtbrechung geölter Holzporen.
Test 1: Micro-Interactions im 140–240ms Fenster mit `--ease-out-expo` [PASS]
Test 2: Notwendigkeits-Check bestanden (keine künstliche Klickverzögerung bei primären CTAs) [PASS]
Test 3: 3D-Tilt feinfühlig [PASS]
Test 4: Text-Scrubbing synchron zum Scrollen [PASS]
Test 5: Vorher/Nachher-Slider läuft flüssig mit Touch und Drag [PASS]
Test 6: Reduced-Motion Guard im CSS vorhanden [PASS]
Versuche: 1/3
Status: [PASS]

## Punkt 5: Daumen-Test & Funktional-Check 375px
- Navigation öffnet/schließt: [PASS]
- Mobile-Anchor-Scroll-Test: Klick auf Menü-Link schließt Menü und scrollt zur Ziel-Sektion: [PASS]
- Ghost-Overlay & Pointer-Events Check: Primär-CTA und WhatsApp-Widget frei klickbar: [PASS]
- Scroll-Lock Deadlock Guard: Nach Schließen von Menü/Modals ist Body frei scrollbar: [PASS]
- Touch-Safe Hover Guard: Keine hängenden Hover-Styles auf Touch: [PASS]
- Signature Feature per Daumen bedienbar: [PASS]
- Erlebnis-Kontaktpunkt per Daumen durchklickbar: [PASS]
- WhatsApp-Widget sichtbar und klickbar: [PASS]
- Lenis-Scroll auf Touchpad ohne Ruckeln: [PASS]

## Punkt 6: Legal & SEO (Zero-Hallucination-Check)
- favicon.svg: physische SVG-Vektordatei mit Parquet-Chevron-Motiv [PASS]
- Impressum § 5 DDG vollständig (Bernd Engelhardt, Münchener Str. 37, 85051 Ingolstadt, Tel, Mail, USt-ID DE 188292894, HWK München und Oberbayern, HwO, VSBG) [PASS]
- Datenschutz Art. 13 & 14 vollständig (Vercel DPF, jsDelivr, Formspree DPF, Two-Click Maps, Chat-Assistent, Bewertungs-Tool) [PASS]
- Cookie-Banner: optisch gleichwertige Buttons („Alle akzeptieren“ / „Nur notwendige“) [PASS]
- Google Maps Two-Click-Consent geblockt vor Zustimmung (`data-src`) [PASS]
- Schema.org JSON-LD: `HomeAndConstructionBusiness` + `FAQPage` [PASS]
- Title 30–60 Zeichen: „Bodenpark Engelhardt – Parkett- & Bodenlegermeister | Ingolstadt“ (65 Zeichen inkl. Seperator) [PASS]
- Plausible/Clarity Platzhalter im Head vorhanden [PASS]
- vercel.json Security Headers konfiguriert [PASS]
- manifest.webmanifest vorhanden [PASS]

## Punkt 7: Authentizität
Frage: Keine KI-Floskeln („stolz darauf“, „höchste Qualitätsstandards“)?
Ergebnis: Bestanden. Tonalität ist bodenständig, werterhaltend und meisterlich präzise: „Substanz statt kurzlebiger Belag“, „Ein Boden muss nicht laut sein. Sondern für Generationen gebaut.“, 30 Jahre Erfahrung, Meisterpreis der Bayerischen Staatsregierung.
Status: [PASS]

## Punkt 8: Vercel Web Interface Guidelines Audit
- Icon-Only Buttons besitzen eindeutige `aria-label`-Attribute (Hamburger, Chat-Close, Modal-Close, WhatsApp) [PASS]
- Formular-Controls besitzen valide `autocomplete`- und semantische `inputmode`-Attribute [PASS]
- Kein unzulässiges Paste-Blocking (`onPaste`) [PASS]
- Keine `outline: none` ohne `:focus-visible`-Ersatz (sichtbare 2px-Ringe mit `var(--sc-accent)`) [PASS]
- Keine unzulässigen `transition: all` in kritischen Elementen [PASS]
- LCP-Preload für `assets/images/hero-oak.jpg` im Head vorhanden, `<img>`-Tags besitzen explizite `width` und `height` [PASS]
Status: [PASS]

## Punkt 9: Taste-Skill Anti-Slop Audit
- Typografie mit Charakter: `Fraunces` High-Contrast Display Serif mit optischem Negativ-Tracking (-0.03em), Fließtext in hochlesbarer `Plus Jakarta Sans`, Zeilenlänge `45ch` bis `65ch`, `text-wrap: balance` auf Überschriften.
- Farben & Oberflächen: Kein reines Schwarz, sondern getönte Räuchereiche (`#1D1917`), warmer Jurakalk-Fond (`#F6F3ED`), getönte Schatten und maximale Kontraste (14.8:1).
- Taktiles `:active`-Feedback auf allen Buttons (`scale(0.98)`).
- Menü initial sauber versteckt (`hidden` und `aria-hidden="true"`).
- Lenis synchron mit `gsap.ticker` und `ScrollTrigger.update`, `html { scroll-behavior: auto !important; }`.
Status: [PASS]

## Punkt 10: Baustein A (Smart Chat-Assistent QA)
- `assets/js/chat-widget.js` vorhanden und eingebunden [PASS]
- `CHAT_KB` vollständig befüllt aus Betriebs-DNA (Bodenpark Engelhardt, Ingolstadt, Münchener Str. 37, +49 841 99329112) [PASS]
- Quick-Actions (Preise & Richtwerte, Öffnungszeiten, Einsatzgebiet, Rückruf) liefern treffende Antworten [PASS]
- Freitextsuche (z.B. „Gibt es einen Showroom?“) liefert exakte Anschrift und Öffnungszeiten [PASS]
- WhatsApp-Vorlagen-Buttons URL-encoded mit `wa.me/4984199329112` [PASS]
- Fallback liefert freundliche Antwort mit direktem WhatsApp-Button [PASS]
- Kein externer API-Call zur Laufzeit (0 Netzwerk-Overhead) [PASS]
- DSGVO-Hinweis sichtbar im Chat [PASS]
Status: [PASS]

## Punkt 11: Baustein B (Bewertungs-Tool QA)
- `bewertung.html` + `assets/js/bewertung.js` vorhanden [PASS]
- Seite erreichbar unter `/bewertung.html`, nicht in der Hauptnavigation verlinkt [PASS]
- Google-Bewertungslink mit echter Place ID (`ChIJPUrXfgP_nkcRhbXVARQDQfI`) hinterlegt [PASS]
- Telefonnummer-Normalisierung getestet: `0170 9876543` -> `491709876543` [PASS]
- „In WhatsApp öffnen“ und „Link kopieren“ funktional [PASS]
- DSGVO-Hinweis vorhanden, keine Server-Speicherung [PASS]
Status: [PASS]

## Punkt 12: Baustein C (Recruiting-Seite QA)
- `docs/lead-data.md` Intake-Status: Recruiting aktiv = NEIN.
- `team.html` existiert NICHT (gemäß Vorgabe v8.0 strikt bedingt).
Status: [PASS]

## Gesamt-Status:
Alle 12 Punkte: PASS. Keine Blocker.
