'use strict';

/**
 * === BAUSTEIN A: SMART CHAT-ASSISTENT (v8.0) ===
 * Bodenpark Engelhardt · Meisterbetrieb Ingolstadt
 * Vollständig lokal – kein externer API-Call zur Laufzeit.
 * Wissensbasis aus verifizierten Betriebsdaten befüllt.
 */

const CHAT_KB = {
  firma: 'Bodenpark Engelhardt',
  tel: '+49 841 99329112',
  wa: '4984199329112',
  leistungen: [
    'Echtholz-Parkett & Schlossdielen',
    'Staubarme Parkettsanierung & HEPA-Schleifen',
    'Fugenlose Akustik- & Naturböden'
  ],
  preisrahmen: 'Sanierung & Schleifen ab ca. 35–65 €/m², Neuverlegung von Massiv- & Mehrschichtparkett ab ca. 75–185 €/m² je nach Holzart und Verlegegeometrie',
  oeffnungszeiten: 'Montag & Donnerstag: 10:00–12:00 Uhr und 13:00–17:30 Uhr sowie individuelle Wunschtermine vor Ort nach Vereinbarung',
  einsatzgebiet: 'Ingolstadt und die gesamte Region 10 (Pfaffenhofen a.d. Ilm, Neuburg a.d. Donau, Eichstätt, Manching, Geisenfeld bis ca. 45 km Radius)',
  spezialitaet: '30 Jahre Meisterpraxis, ausgezeichnet mit dem Meisterpreis der Bayerischen Staatsregierung, staubfreie Schleiftechnik und 100 m² Haptik-Showroom in der Münchener Str. 37',

  intents: [
    {
      keywords: ['preis', 'kosten', 'kostet', 'angebot', 'anfrage', 'offerte', 'quadratmeter', 'm2', 'qm'],
      antwort: 'Ein konkreter Preis hängt vom Werkstoff, dem Untergrund und dem Verlegemuster ab. Richtwerte: [PREISRAHMEN]. Gerne erstellen wir Ihnen eine kostenfreie Ersteinschätzung – senden Sie uns einfach kurz Fotos Ihrer Räume per WhatsApp.',
      wa_text: 'Hallo Herr Engelhardt, ich interessiere mich für eine Preisanfrage und hätte gerne eine Vorab-Einschätzung.',
      wa_label: 'Preisanfrage via WhatsApp'
    },
    {
      keywords: ['oeffnung', 'offen', 'zeiten', 'erreichbar', 'wann', 'showroom', 'ausstellung', 'besuch'],
      antwort: 'Unser Ausstellungsraum in der Münchener Str. 37 in Ingolstadt ist regulär geöffnet: [OEFFNUNGSZEITEN]. Sie können jederzeit auch einen individuellen Termin vereinbaren.',
      wa_text: 'Hallo Herr Engelhardt, ich möchte gerne einen Bemusterungstermin im Showroom vereinbaren.',
      wa_label: 'Showroom-Termin anfragen'
    },
    {
      keywords: ['einsatzgebiet', 'gebiet', 'kommt ihr', 'fahrt ihr', 'region', 'umgebung', 'neuburg', 'pfaffenhofen', 'eichstaett'],
      antwort: 'Wir sind für Sie in [EINSATZGEBIET] im Einsatz. Gerne kommen wir für ein Aufmaß und eine Untergrundprüfung direkt zu Ihnen auf die Baustelle.',
      wa_text: 'Hallo, ich möchte anfragen, ob Sie auch zu meinem Projektort kommen.',
      wa_label: 'Einsatzgebiet prüfen'
    },
    {
      keywords: ['rückruf', 'rueckruf', 'anrufen', 'telefon', 'nummer', 'telefonisch', 'bernd'],
      antwort: 'Gerne rufen wir Sie persönlich zurück! Sie erreichen uns direkt unter [TEL] oder hinterlassen uns kurz Ihre Nummer per WhatsApp.',
      wa_text: 'Hallo Herr Engelhardt, bitte rufen Sie mich bezüglich meines Bodens kurz zurück. Meine Nummer: ',
      wa_label: 'Rückruf via WhatsApp'
    },
    {
      keywords: ['leistung', 'leistungen', 'macht ihr', 'parkett', 'dielen', 'fischgraet', 'service'],
      antwort: 'Unsere Kernleistungen umfassen: [LEISTUNG_1], [LEISTUNG_2] und [LEISTUNG_3]. Unser handwerkliches Markenzeichen: [SPEZIALITAET].',
      wa_text: null
    },
    {
      keywords: ['schleifen', 'staub', 'sanierung', 'renovieren', 'abschleifen', 'dreck'],
      antwort: 'Dank moderner Profischleiftechnik mit geschlossener HEPA-Absaugung (Filterklasse M) arbeiten wir nahezu staubfrei! In 90 % aller Fälle lässt sich auch stark abgenutzter Altboden meisterhaft retten.',
      wa_text: 'Hallo Herr Engelhardt, ich habe einen alten Parkettboden und möchte wissen, ob sich ein Schliff lohnt.',
      wa_label: 'Sanierungsprüfung anfragen'
    }
  ]
};

// Intent-Finder
function findChatIntent(input) {
  const text = input.toLowerCase().normalize('NFC');
  const normalized = text
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss');

  for (const intent of CHAT_KB.intents) {
    for (const kw of intent.keywords) {
      const kwNorm = kw
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/ü/g, 'u')
        .replace(/ß/g, 'ss');
      if (normalized.includes(kwNorm)) return intent;
    }
  }
  return null;
}

function buildWaUrl(waText) {
  const base = 'https://wa.me/' + CHAT_KB.wa + '?text=';
  return base + encodeURIComponent(waText);
}

function addChatBubble(container, text, sender, waBtn) {
  const div = document.createElement('div');
  div.className = 'chat-bubble ' + sender;
  div.textContent = text;

  if (waBtn) {
    const br = document.createElement('br');
    const a = document.createElement('a');
    a.href = buildWaUrl(waBtn.text);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'chat-wa-btn';
    a.setAttribute('aria-label', waBtn.label + ' via WhatsApp');
    a.textContent = '💬 ' + waBtn.label;
    div.appendChild(br);
    div.appendChild(a);
  }

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

function handleChatMessage(input, messagesEl) {
  const trimmed = input.trim();
  if (!trimmed) return;

  addChatBubble(messagesEl, trimmed, 'user');

  setTimeout(() => {
    const intent = findChatIntent(trimmed);
    if (intent) {
      const waBtn = intent.wa_text
        ? {
            text: intent.wa_text.replace('[FIRMENNAME]', CHAT_KB.firma),
            label: intent.wa_label || 'Via WhatsApp anfragen'
          }
        : null;

      const reply = intent.antwort
        .replace('[FIRMENNAME]', CHAT_KB.firma)
        .replace('[PREISRAHMEN]', CHAT_KB.preisrahmen)
        .replace('[OEFFNUNGSZEITEN]', CHAT_KB.oeffnungszeiten)
        .replace('[EINSATZGEBIET]', CHAT_KB.einsatzgebiet)
        .replace('[LEISTUNG_1]', CHAT_KB.leistungen[0])
        .replace('[LEISTUNG_2]', CHAT_KB.leistungen[1])
        .replace('[LEISTUNG_3]', CHAT_KB.leistungen[2])
        .replace('[SPEZIALITAET]', CHAT_KB.spezialitaet)
        .replace('[TEL]', CHAT_KB.tel);

      addChatBubble(messagesEl, reply, 'bot', waBtn);
    } else {
      addChatBubble(
        messagesEl,
        'Gute Frage! Das besprechen wir am besten kurz persönlich. Schreiben Sie uns direkt per WhatsApp oder rufen Sie uns an – wir antworten zügig.',
        'bot',
        {
          text: `Hallo Herr Engelhardt, ich habe eine Frage zu ${CHAT_KB.firma}: ${trimmed}`,
          label: 'Direkt per WhatsApp fragen'
        }
      );
    }
  }, 220);
}

function handleQuickIntent(intentKey, messagesEl) {
  const map = {
    preis: 'preis',
    oeffnungszeiten: 'oeffnung',
    einsatzgebiet: 'einsatzgebiet',
    kontakt: 'rückruf'
  };
  const kw = map[intentKey] || intentKey;
  const intent = CHAT_KB.intents.find((i) => i.keywords.includes(kw));
  if (intent) {
    const waBtn = intent.wa_text
      ? {
          text: intent.wa_text.replace('[FIRMENNAME]', CHAT_KB.firma),
          label: intent.wa_label || 'Via WhatsApp anfragen'
        }
      : null;

    const reply = intent.antwort
      .replace('[FIRMENNAME]', CHAT_KB.firma)
      .replace('[PREISRAHMEN]', CHAT_KB.preisrahmen)
      .replace('[OEFFNUNGSZEITEN]', CHAT_KB.oeffnungszeiten)
      .replace('[EINSATZGEBIET]', CHAT_KB.einsatzgebiet)
      .replace('[LEISTUNG_1]', CHAT_KB.leistungen[0])
      .replace('[LEISTUNG_2]', CHAT_KB.leistungen[1])
      .replace('[LEISTUNG_3]', CHAT_KB.leistungen[2])
      .replace('[SPEZIALITAET]', CHAT_KB.spezialitaet)
      .replace('[TEL]', CHAT_KB.tel);

    addChatBubble(messagesEl, reply, 'bot', waBtn);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('chatToggle');
  const closeBtn = document.getElementById('chatClose');
  const panel = document.getElementById('chatPanel');
  const messagesEl = document.getElementById('chatMessages');
  const form = document.getElementById('chatInputForm');
  const input = document.getElementById('chatInput');
  const quickBtns = document.querySelectorAll('.chat-quick-btn');

  if (!toggle || !panel || !messagesEl) return;

  // Begrüßung nach kurzem Timeout
  setTimeout(() => {
    addChatBubble(
      messagesEl,
      'Grüß Gott! Willkommen bei Bodenpark Engelhardt. Ich beantworte gerne Ihre Fragen zu Parkett, Dielen und unserem Showroom.',
      'bot'
    );
  }, 500);

  toggle.addEventListener('click', () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
    if (!isOpen) {
      setTimeout(() => input && input.focus(), 80);
    }
  });

  closeBtn?.addEventListener('click', () => {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input) return;
    handleChatMessage(input.value, messagesEl);
    input.value = '';
  });

  quickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      handleQuickIntent(btn.dataset.intent, messagesEl);
    });
  });
});
