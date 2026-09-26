# Product Requirements Document (PRD) - Bodenpark Engelhardt
Tier: TIER 1 - GOLD | Datum: 2026-09-26 | Version: 8.0

## 1. Grammatik & Seiten-Architektur
- **Gewählte Grammatik:** The Master Showcase & Craft Editorial (Werkstoff- & Fugenarchitektur).
- **Charakter:** Fühlbare Haptik, architektonische Dokumentation, millimetergenaue Verbandsgeometrie und würdevolle Meisterbetriebs-Identität.
- **Verbotene Schablonen:** Keine banalen 3-Spalten-Feature-Cards, keine anonymen Stockfotos, keine grellen Neonfarben, kein Discount-Look.

## 2. Generatives Farb- & Typografie-System
### Farbsystem (abgeleitet aus der DNA: Jurakalk, Räuchereiche & Leinöl)
```css
:root {
  --sc-canvas: #F6F3ED;        /* Warmes Altmühltaler Jurakalk-Weiß */
  --sc-surface: #FFFFFF;       /* Reinweiße Werkstoff-Kassette */
  --sc-surface-card: #FFFFFF;
  --sc-surface-warm: #EFECE4;  /* Sanft abgetönter Eichenfond */
  --sc-ink: #1D1917;           /* Tief pigmentierte Räuchereiche (14.8:1 auf Canvas) */
  --sc-ink-muted: #524944;     /* Getöntes Schieferbraun (6.2:1 Kontrast) */
  --sc-accent: #C6813D;        /* Kaltgepresstes Leinöl / Bernstein (WCAG AA konform) */
  --sc-accent-hover: #A8692B;  /* Geölter Bernsteinton abgedunkelt */
  --sc-accent-subtle: rgba(198, 129, 61, 0.12);
  --sc-steel: #383E42;         /* Gehärteter Werkzeugstahl für Maß- & Kantenlinien */
  --sc-border: rgba(29, 25, 23, 0.12); /* 1px-Schattenfuge */
}
```

### Typografie-System (Typ A: Tradition, Manufaktur & Skulptur)
- **Display-Schrift:** `Fraunces` (Google Font), High-Contrast Variable Serif, optisches Tracking `letter-spacing: -0.03em`, Zeilenabstand `line-height: 1.02` auf Desktop.
- **Fließtext & Baudaten:** `Plus Jakarta Sans` (Google Font, Weights 400, 500, 600) – geometrisch präzise, architektonisch klar.
- **Fluid Type Scale (Mobile-First):**
  - Hero Headline: Desktop `clamp(3.4rem, 8vw, 7.8rem)`, < 768px `clamp(2.2rem, 5.5vw, 3.4rem)`, 375px `clamp(1.85rem, 7vw, 2.3rem)`.
  - Section Headings (H2): `clamp(2.0rem, 4.5vw, 3.75rem)`.
  - Subhead / Werkstoff-Header (H3): `clamp(1.25rem, 2.5vw, 1.875rem)`.
  - Body Text: `clamp(0.9375rem, 0.9rem + 0.2vw, 1.0625rem)` (max-width: 65ch).

## 3. Motion- & Interaktions-System (Emil Kowalski Craft)
- **Micro-Interaction Timing:** 180–240ms mit `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`.
- **Aktive Primitiven (7 Stück - weit über 5er-Minimum):**
  1. *Hero Kinetic Typography:* SplitType für Zeilen und Worte mit gestaffeltem 3D-Einschwenken (`stagger: 0.02s`, `power3.out`).
  2. *„Die Schattenfuge“:* 1px-Schattenfugen zeichnen sich horizontal und vertikal synchron per ScrollTrigger (`scaleX: 0 -> 1`, `expo.out`) ein.
  3. *Native CSS-3D Perspective Tilt:* Haptische 3D-Neigung bei Werkstoff-Karten auf Desktop; Badges schweben via `translateZ(35px)`.
  4. *„Restaurierungs-Enthüllung“:* Interaktiver Vorher/Nachher-Inspektor mit stufenlosem Schieber (unbehandelter Altboden vs. meisterhaft geschliffene & geölte Eiche).
  5. *Dynamic Counters:* Universelles Hochzählen (30 Jahre Erfahrung, 4.6 Sterne Google Rating, 100 m² Showroom, 0% Feinstaub HEPA-Filterung).
  6. *Editorial Text-Scrubbing:* Dim-to-Reveal des Meister-Manifests synchron zum Scrollfortschritt.
  7. *Navbar Micro-Interactions:* Dynamischer Scroll-Morph in edle Glasmorphismus-Pille mit flüssigen Hover-Unterstrichen.

## 4. Signature Feature: „Der Ingolstädter Haptik-Tisch & Lichtsimulator“
- **Zweck:** Kein banales Formular, sondern ein architektonisches Werkzeug für anspruchsvolle Bauherren und Architekten.
- **Funktionsweise:**
  1. *Oberflächen-Auswahl:* 3 meisterhafte Werkstoffe (Bayerische Naturland-Eiche handgehobelt, Räuchereiche im französischen Fischgrät 45°, fugenloser Akustik-Designbelag).
  2. *Lichtachsen-Regler:* Interaktiver Slider mit 3 Lichtsituationen:
     - 08:00 Morgenlicht (kühles, flaches Streiflicht bringt Faserstruktur und Bürstung zur Geltung).
     - 12:00 Mittagslicht (helles, neutrales Zenitlicht zeigt die natürliche Pigmentierung).
     - 20:00 2700K Warmes Abendlicht (weicher Bernsteinschimmer betont Behaglichkeit und Tiefenwärme).
  3. *Musterbox-Konfiguration:* Erstellt eine kuratierte Musterbox für die persönliche Bemusterung im Showroom Münchener Straße 37 in Ingolstadt – inklusive 1-Klick-Terminauswahl direkt bei Inhaber Bernd Engelhardt.

## 5. Tageszeit-Personalisierung (Standard Tier 1)
- **Morgen (06:00 – 12:00):** „Guten Morgen aus Ingolstadt. Gerne empfangen wir Sie heute in unserem Showroom an der Münchener Straße 37.“
- **Tag (12:00 – 19:00):** „Guten Tag. Entdecken Sie 30 Jahre handwerkliche Meisterschaft für Parkett und Naturböden.“
- **Abend / Nacht (19:00 – 06:00):** „Guten Abend. Außerhalb unserer Öffnungszeiten? Konfigurieren Sie jetzt Ihre Haptik-Musterbox online.“

## 6. Full-Canvas Raumnutzung & Widescreen-Harmonie
- Container auf `max-width: 1440px` mit fluidem Padding (`clamp(1.25rem, 3.5vw, 3.5rem)`).
- Asymmetrischer 7:5-Hero: 55% Typografie und Qualitätssiegel, 45% Haptik-Visual.
- Werkstoff-Tafeln und Ablaufschritte spannen sich harmonisch über die gesamte Breite.
