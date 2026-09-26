# Übergabe- & Einrichtungsanleitung – Bodenpark Engelhardt

Sehr geehrter Herr Engelhardt,  
herzlich willkommen zu Ihrer neuen, maßgeschneiderten Website! Dieses Dokument erklärt Ihnen in einfachen, verständlichen Schritten, wie Ihr neuer digitaler Showroom aufgebaut ist und wie Sie bei Bedarf Kontaktdaten anpassen oder Werkzeuge aktivieren können.

---

## 1. Was wurde gebaut?
Ihre Web-Präsenz wurde als **architektonisches Werkstoffmagazin** für anspruchsvolle Bauherren, Architekten und Liebhaber von echtem Naturholz entwickelt.

Das Herzstück ist **„Der Ingolstädter Haptik-Tisch & Lichtsimulator“**:
- Bauherren können interaktiv zwischen drei Meister-Oberflächen (Naturland-Eiche handgehobelt, Räuchereiche im französischen Fischgrät und fugenlosem Akustik-Designbelag) wählen und die feine Textur der Holzporen studieren.
- Über einen stufenlosen Lichtachsen-Regler lässt sich der Lichteinfall im Raum verändern (vom kühlen 8:00-Uhr-Morgenlicht über klares Mittagslicht bis zum warmen 2700K-Abendlicht), wodurch die natürliche Lichtbrechung der Bürstung und der geölten Oberfläche lebendig demonstriert wird.
- Interessenten stellen sich mit einem Klick ihre persönliche Musterbox für Ihren Showroom in der Münchener Straße 37 zusammen und senden die Terminanfrage direkt an Sie – inklusive automatischer Übernahme aller Holz- und Raummaße.

---

## 2. Das Kontaktformular aktivieren (Formspree – in 4 Schritten)
Das 3-stufige Erlebnis-Kontaktformular auf Ihrer Website ist für den Dienst **Formspree** vorbereitet, der eingehende Bauherren-Anfragen direkt an Ihre E-Mail (`info@bodenpark-engelhardt.de`) weiterleitet.

1. Gehen Sie auf [https://formspree.io](https://formspree.io) und registrieren Sie sich kostenlos mit Ihrer geschäftlichen E-Mail-Adresse.
2. Klicken Sie auf **„+ New Form“**, vergeben Sie den Namen `Bodenpark Engelhardt Anfragen` und hinterlegen Sie Ihre Ziel-E-Mail.
3. Kopieren Sie die von Formspree generierte Endpoint-ID (z. B. `xpwkvdlo`).
4. Öffnen Sie `index.html` und ersetzen Sie in Zeile 504 `YOUR_FORM_ID` durch Ihren Code:
   ```html
   <form id="experienceContactForm" action="https://formspree.io/f/xpwkvdlo" method="POST" ...>
   ```

---

## 3. Baustein B: Das Google-Bewertungs-Tool nutzen (/bewertung.html)
Unter der Adresse `https://bodenpark-engelhardt.vercel.app/bewertung.html` steht Ihnen ein hocheffektives Werkzeug zur Verfügung, um nach jedem erfolgreich verlegten Parkettboden in unter 5 Sekunden Google-Bewertungen zu sammeln:

1. Öffnen Sie die Seite auf Ihrem Smartphone (Sie können sich diese als Lesezeichen auf den Startbildschirm legen).
2. Geben Sie den Namen des Kunden (z. B. `Herr Müller`) und dessen Mobilnummer ein.
3. Klicken Sie auf **„WhatsApp-Nachricht öffnen“**.
4. WhatsApp öffnet sich sofort mit einer höflichen, fertig formulierten Nachricht inklusive Direktlink zur Bewertungsmaske Ihres Google-Profils. Ihr Kunde muss nur noch auf Absenden tippen und die 5 Sterne vergeben.

---

## 4. Baustein A: Der integrierte Chat-Assistent
Auf Ihrer Website beantwortet ein lokaler Chatbot häufige Kundenfragen (Öffnungszeiten des Showrooms, Parkettpflege, Fußbodenheizung, Musterboxen) rund um die Uhr – **vollkommen datenschutzkonform ohne externe Serveranbindung**.

- Die Antworten und hinterlegten Themen finden Sie in der Datei `assets/js/chat-widget.js` im Bereich `CHAT_KB`.
- Möchten Sie neue Antworten ergänzen oder ändern, können die Stichworte und Texte dort jederzeit angepasst werden.

---

## 5. Besucher-Statistiken aktivieren (Plausible.io oder Microsoft Clarity)
Ihre Website enthält vorbereitete Platzhalter für moderne, DSGVO-konforme Besucherstatistiken.

### Option A: Plausible.io (Empfohlen – 100% datenschutzkonform ohne Cookie-Banner)
1. Account auf [https://plausible.io](https://plausible.io) anlegen und Ihre Domain eintragen (z. B. `bodenpark-engelhardt.de`).
2. In `index.html` im `<head>`-Bereich (Zeile 33) die Kommentarzeichen `<!--` und `-->` um folgende Zeile entfernen:
   ```html
   <script defer data-domain="bodenpark-engelhardt.de" src="https://plausible.io/js/script.js"></script>
   ```

### Option B: Microsoft Clarity (Kostenlos mit visuellen Heatmaps)
1. Projekt auf [https://clarity.microsoft.com](https://clarity.microsoft.com) erstellen.
2. Ihre Clarity-Projekt-ID in `index.html` (Zeile 42) in den vorbereiteten Skriptblock eintragen und den Block aktivieren.

---

## 6. Eigene Wunsch-Domain aufschalten (z. B. www.bodenpark-engelhardt.de)
Sobald die Website unter Ihrer bisherigen Adresse live geschaltet werden soll:

1. Melden Sie sich bei Ihrem Domain-Provider (z. B. Strato, IONOS, 1&1, All-Inkl) an.
2. Öffnen Sie die **DNS-Verwaltung** der Domain `bodenpark-engelhardt.de`.
3. Fügen Sie folgenden CNAME-Eintrag hinzu:
   - **Typ:** `CNAME`
   - **Subdomain / Host:** `www`
   - **Ziel / Wert:** `cname.vercel-dns.com`
4. Für die Hauptdomain (ohne www):
   - **Typ:** `A`
   - **Host:** `@`
   - **Ziel / Wert:** `76.76.21.21`
5. Nach 15 bis 30 Minuten schaltet Vercel automatisch ein kostenloses, offizielles SSL-Zertifikat (HTTPS) frei. Browser-Sicherheitswarnungen gehören damit endgültig der Vergangenheit an.

---

## 7. Was Sie selbst anpassen können
Alle Texte, Telefonnummern und Öffnungszeiten liegen übersichtlich in der Datei `index.html` und können mit jedem Editor bearbeitet werden:
- **Telefon:** Suchen Sie nach `0841 99329112` oder `0171 4752818`.
- **Öffnungszeiten Showroom:** Suchen Sie nach `Öffnungszeiten` oder `Mo. – Fr. 09:00 – 18:00 Uhr`.
- **Adresse:** Suchen Sie nach `Münchener Str. 37`.

---

## 8. Ihr persönlicher Support & Wartungsservice
Haben Sie Fragen, möchten neue Fotos aus Ihrem Showroom einbinden lassen oder Texte ergänzen?

- **Ansprechpartner:** Raphael Neumeier (Webdesign & B2B-Entwicklung, Ingolstadt)
- **Telefon / WhatsApp:** +49 176 23509349
- **E-Mail:** info@nexbot-webdesign.de
- **Reaktionszeit (SLA):** Änderungswünsche werden werktags innerhalb von 24 Stunden zuverlässig umgesetzt.
