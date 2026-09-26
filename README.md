# Bodenpark Engelhardt – Staatlich ausgezeichnetes Meisterhandwerk Ingolstadt

> **Bespoke B2B Web-Visitenkarte & Parkett-Erlebnisplattform (v8.0 — Bespoke Unikat-Engine + Smart-Assistenten Edition)**  
> **Kunde:** Bodenpark Engelhardt (Inhaber: Bernd Engelhardt, Parkettlegermeister)  
> **Standort:** Münchener Str. 37, 85051 Ingolstadt  
> **Telefon:** +49 841 99329112 | **Mobil:** +49 171 4752818  
> **Live-URL:** [https://bodenpark-engelhardt.vercel.app](https://bodenpark-engelhardt.vercel.app)  
> **GitHub Repository:** [https://github.com/RaphaelVSC-cmd/bodenpark-engelhardt](https://github.com/RaphaelVSC-cmd/bodenpark-engelhardt)  
> **Tier-Klassifikation:** TIER 1 (Gold-Standard)

---

## 🎯 Über das Projekt
Bernd Engelhardt ist ein mit dem **Meisterpreis der Bayerischen Staatsregierung** ausgezeichneter Parkettlegermeister mit über 30 Jahren handwerklicher Berufserfahrung in Ingolstadt. In seinem 100 m² Showroom in der Münchener Straße 37 berät er Bauherren, Architekten und anspruchsvolle Privatkunden persönlich.

Die bisherige Unternehmens-Website war veraltet, lief über unverschlüsseltes HTTP (was moderne Browser mit roten Sicherheitswarnungen blockierten) und spiegelte in keiner Weise die meisterhafte Haptik, Ästhetik und Werthaltigkeit seiner Arbeit wider.

Diese maßgeschneiderte Plattform schließt diese Vertrauenslücke vollständig und transformiert den digitalen Auftritt in ein architektonisches Werkstoffmagazin mit interaktiven Planungs- und Beratungswerkzeugen.

---

## ✨ Technische & Konzeptionelle Highlights

1. **B2B-Seiten-Grammatik (The Craft Editorial & Bespoke Unikat-DNA):**
   - **Farbwelt:** Warmes Altmühltaler Jurakalk-Weiß (`#F6F3ED`), Tief pigmentierte Räuchereiche (`#1D1917`), Kaltgepresstes Leinöl/Bernsteinton (`#C6813D`) und Werkzeugstahl (`#383E42`).
   - **Typografie:** Skulpturale Display-Serife *Fraunces* (Winkel- und Schnittführung wie handbehauene Holzdielen) & geometrisch präzise *Plus Jakarta Sans* für technische Werkstoffdaten.
   - **1px-Schattenfugengerüst:** Haarlinien strukturieren die Sektionen wie Präzisionsfugen im Massivholzparkett.

2. **Signature Feature: Der Ingolstädter Haptik-Tisch & Lichtsimulator:**
   - Interaktive Oberflächensimulation zwischen Bayerischer Naturland-Eiche handgehobelt, Räuchereiche im französischen 45°-Fischgrät und fugenlosem Akustik-Designbelag.
   - Stufenlose Lichtachsen-Steuerung (8:00 Uhr Morgenlicht, 12:00 Uhr Zenitlicht, 2700K warmes Abend-Kunstlicht) zur Demonstration der Lichtbrechung auf Bürstung und geölten Holzporen.
   - 1-Klick Musterbox-Konfigurator mit direkter Übergabe in das Beratungstermin-Modul.

3. **Interaktive Vorher-/Nachher-Restaurierungs-Enthüllung:**
   - Echte Schieberegler-Gegenüberstellung eines 60 Jahre alten, verkratzten Eichenparketts vs. meisterhaft geschliffenem, naturgeöltem Neuzustand.
   - Touch-optimiert, tastaturbedienbar (`ArrowLeft`/`ArrowRight`) mit ARIA-Accessibility.

4. **Bausteine v8.0:**
   - **Baustein A (Smart Chat-Assistent):** Autonomer, lokaler Chatbot (`assets/js/chat-widget.js`) mit 100% DSGVO-Sicherheit (kein externer API-Aufruf zur Laufzeit, verarbeitet Werkstofffragen, Pflege, Termine und Musterboxen).
   - **Baustein B (Google-Bewertungs-Tool):** Dedizierte Seite [`/bewertung.html`](https://bodenpark-engelhardt.vercel.app/bewertung.html) mit Telefonnummer-Normalisierung und 1-Klick WhatsApp-Linkgenerator direkt zur Google-Place-ID `ChIJPUrXfgP_nkcRhbXVARQDQfI`.
   - **Baustein C (Recruiting):** Entfällt vorschriftsmäßig, da im Lead-Profil keine offenen Stellen gesucht werden (Intake=NEIN).

5. **Motion- & Interaktions-System (7 Emil Kowalski Primitives):**
   - *Lenis Smooth Scroll* mit nativer Smartphone-Entkopplung.
   - *SplitType Text-Reveal* aus maskierten Containern.
   - *Schattenfugen-ScaleX* (horizontale Linien zeichnen sich wie Nut-und-Feder ein).
   - *Rotierendes Meisterpreis-Siegel* (22s kontinuierliche Drehung).
   - *3D Perspective Hover* auf Werkstofftafeln.
   - *Stat-Counter-Tweening* für Google-Rating (4.6★), Jahre Erfahrung (30+) und Quadratmeter Showroom (100 m²).

6. **100% Abmahnsichere Rechtskonformität & Master-Audit:**
   - **§ 5 DDG Impressum** mit HWK München und Oberbayern sowie USt-ID `DE 188292894`.
   - **DSGVO Art. 13/14 Datenschutzerklärung** mit Formspree DPF-Hinweis und lokalem Chatbot-Passus.
   - **TDDDG Two-Click-Maps:** Google Maps lädt erst nach informierter Einwilligung im Consent-Banner oder Direktklick.
   - **Favicon-Integrität:** Physisches SVG-Vektorsignet `favicon.svg` mit Parkett-Fischgrät-Muster.
   - **Mobile-First Responsiveness:** Zero-Collision auf 375px (iPhone SE) und dynamischer Navbar-Sicherheits-Breakpoint bei 1024px.

---

## 📁 Projektstruktur
```
bodenpark-engelhardt/
├── index.html               # Semantische Hauptseite mit Haptik-Tisch, Slider & Schema.org
├── bewertung.html           # Baustein B: Google-Bewertungs-Tool für WhatsApp
├── style.css                # Fluid Type Scale, 3D Engine, Fugen-Grid, Mobile-First
├── app.js                   # Lenis, GSAP, Haptik-Simulator, Slider, Consent, Demo-Radar
├── favicon.svg              # Geometrisches Vektor-Signet (Fischgrät-Parkett)
├── robots.txt               # SEO Crawler-Steuerung
├── sitemap.xml              # XML Sitemap für Suchmaschinen
├── manifest.webmanifest     # Progressive Web App Manifest
├── vercel.json              # HTTP Security Headers (X-Frame-Options, CSP, HSTS)
├── assets/
│   ├── images/
│   │   ├── hero-oak.jpg             # Makroaufnahme handgebürstete Eiche
│   │   ├── restoration-before.jpg   # Verschlissener historischer Parkettboden
│   │   ├── restoration-after.jpg    # Meisterhaft geschliffener & geölter Zustand
│   │   └── showroom-ingolstadt.jpg  # Ausstellungsraum Münchener Str. 37
│   └── js/
│       ├── chat-widget.js           # Baustein A: Lokaler DSGVO-Chatbot
│       └── bewertung.js             # Baustein B: WhatsApp-Bewertungslink-Generator
├── docs/
│   ├── lead-data.md         # Zero-Hallucination Recherche & HWK-Daten
│   ├── dna-seed.md          # 5 unfakebare Meister-DNA Details
│   ├── prd.md               # Product Requirements Document & Motion Budget
│   ├── review.md            # 12-Punkte Selbst-Audit (100% Pass)
│   ├── audit-report.md      # 8-Säulen Master-Audit (100% Grün)
│   └── ANLEITUNG.md         # Übergabe- & Einrichtungsanleitung für Bernd Engelhardt
├── FINGERPRINTS.md          # 6 Anti-Klischee-Dimensionen
├── TODOS.md                 # Aufgaben-Tracking & Kunden-Onboarding
└── README.md
```

---

## 🚀 Deployment & Continuous Delivery
- **GitHub:** Verknüpft mit `RaphaelVSC-cmd/bodenpark-engelhardt`
- **Hosting:** Vercel Edge Network mit automatischem SSL, HTTP/2 und globalem CDN
- **Monitoring:** Live-Alarm Demo-Radar (`initDemoTracker()`) mit Client-Verweildauer-Erkennung
