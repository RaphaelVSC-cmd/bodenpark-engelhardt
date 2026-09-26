'use strict';

/**
 * === BAUSTEIN B: BEWERTUNGS-TOOL LOGIK (v8.0) ===
 * Bodenpark Engelhardt · Inh. Bernd Engelhardt
 * Clientseitiger WhatsApp-Link-Generator für Google-Bewertungen
 */

const BEWERTUNG_CONFIG = {
  firma: 'Bodenpark Engelhardt',
  googleLink: 'https://search.google.com/local/writereview?placeid=ChIJPUrXfgP_nkcRhbXVARQDQfI',
  nachrichtVorlage: (kundenname, firma, googleLink) =>
    `Grüß Gott ${kundenname}, vielen Dank für Ihren Auftrag bei ${firma} in Ingolstadt! ` +
    'Als regionaler Meisterbetrieb leben wir von persönlichen Empfehlungen. ' +
    'Wir würden uns daher riesig freuen, wenn Sie sich kurz 1 Minute Zeit nehmen und Ihre Erfahrung auf Google bewerten: ' +
    googleLink +
    ' Herzlichen Dank für Ihr Vertrauen und weiterhin viel Freude mit Ihrem Boden! Ihr Bernd Engelhardt'
};

function normalizeTel(raw) {
  let t = raw.replace(/[\s\-\.\/\(\)]/g, '');
  if (t.startsWith('00')) t = '+' + t.slice(2);
  if (t.startsWith('0')) t = '+49' + t.slice(1);
  if (!t.startsWith('+')) t = '+49' + t;
  return t.replace(/[^0-9+]/g, '');
}

function buildWaMessage(tel, name) {
  const normalized = normalizeTel(tel);
  const waNum = normalized.replace('+', '');
  const text = BEWERTUNG_CONFIG.nachrichtVorlage(name, BEWERTUNG_CONFIG.firma, BEWERTUNG_CONFIG.googleLink);
  return 'https://wa.me/' + waNum + '?text=' + encodeURIComponent(text);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bewertungForm');
  const result = document.getElementById('bewertungResult');
  const waLinkEl = document.getElementById('bewertungWaLink');
  const copyBtn = document.getElementById('bewertungCopyBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('bKundenname')?.value || '').trim();
    const tel = (document.getElementById('bTelefon')?.value || '').trim();
    if (!name || !tel) return;

    const waUrl = buildWaMessage(tel, name);
    if (waLinkEl) {
      waLinkEl.href = waUrl;
    }
    if (result) {
      result.classList.add('is-visible');
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  copyBtn?.addEventListener('click', async () => {
    const link = waLinkEl?.href;
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      copyBtn.textContent = 'Link kopiert!';
      setTimeout(() => {
        copyBtn.textContent = 'Link kopieren';
      }, 2000);
    } catch {
      copyBtn.textContent = 'Manuell kopieren';
    }
  });
});
