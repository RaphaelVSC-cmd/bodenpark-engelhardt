'use strict';

/**
 * BODENPARK ENGELHARDT – APP ENGINE
 * Meisterbetrieb für Parkett & Naturböden · Ingolstadt
 * GSAP 3 + ScrollTrigger + SplitType + Lenis Smooth Scroll
 * Emil Kowalski Motion Craft · 100% Mobile-First Touch Safe
 */

// === 1. LENIS SMOOTH SCROLL INITIALISIERUNG ===
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    smoothTouch: false, // WICHTIG: Natives Touch-Scrollen auf Smartphones
    autoResize: true
  });

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // Interne Anker-Links mit Lenis ansteuern
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id && id !== '#') {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -76, duration: 1.0 });
        }
      }
    });
  });
}

// === 2. GSAP PLUGIN REGISTRIERUNG ===
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// === 3. MOTION-PRIMITIVE 1: HERO KINETIC TYPOGRAPHY ===
function initKineticTypography() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle || typeof SplitType === 'undefined') return;

  try {
    const split = new SplitType(heroTitle, { types: 'lines,words' });
    gsap.from(split.words, {
      opacity: 0,
      y: 40,
      rotateX: -20,
      stagger: 0.03,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.15
    });

    document.querySelectorAll('.section-title').forEach((title) => {
      gsap.from(title, {
        opacity: 0,
        y: 35,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  } catch (err) {
    console.warn('SplitType fallback aktiv:', err);
  }
}

// === 4. MOTION-PRIMITIVE 2: DIE SCHATTENFUGE (1PX-FUGENRISS) ===
function initSchattenfugeLines() {
  document.querySelectorAll('.schattenfuge-divider').forEach((line) => {
    gsap.fromTo(
      line,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 92%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// === 5. MOTION-PRIMITIVE 3: SCROLL FADE-UP ANIMATIONEN ===
function initScrollAnimations() {
  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// === 6. MOTION-PRIMITIVE 4: DYNAMIC COUNTERS (ZEITEN & ZAHLEN) ===
function initCounters() {
  document.querySelectorAll('.stat-counter').forEach((el) => {
    const target = parseFloat(el.dataset.target || '0');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isDecimal = String(el.dataset.target || '').includes('.');
    const duration = parseFloat(el.dataset.duration || '2.0');

    gsap.fromTo(
      { val: 0 },
      { val: target },
      {
        duration: duration,
        ease: 'power2.out',
        onUpdate: function () {
          const current = this.targets()[0].val;
          const formatted = isDecimal
            ? current.toFixed(1).replace('.', ',')
            : Math.round(current).toLocaleString('de-DE');
          el.innerHTML = prefix + formatted + suffix;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// === 7. MOTION-PRIMITIVE 5: NATIVE CSS-3D PERSPECTIVE & TILT ===
function init3DTilt() {
  const isTouch = window.matchMedia('(hover: none)').matches;
  document.querySelectorAll('.card-3d, [data-tilt-3d]').forEach((card) => {
    if (!isTouch) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / (rect.height / 2)) * 6;
        const rotateY = (x / (rect.width / 2)) * 6;
        gsap.to(card, {
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`,
          duration: 0.25,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
          duration: 0.6,
          ease: 'elastic.out(1, 0.6)'
        });
      });
    } else {
      gsap.fromTo(
        card,
        { transform: 'perspective(1000px) rotateX(4deg) translateY(15px)' },
        {
          transform: 'perspective(1000px) rotateX(0deg) translateY(0px)',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });
}

// === 8. MOTION-PRIMITIVE 6: INTERACTIVE BEFORE/AFTER SLIDER ===
function initBeforeAfterSlider() {
  document.querySelectorAll('[data-before-after]').forEach((container) => {
    const handle = container.querySelector('.before-after-handle');
    const afterWrap = container.querySelector('.after-image-wrap');
    if (!handle || !afterWrap) return;

    let isDown = false;

    const setPosition = (clientX) => {
      const rect = container.getBoundingClientRect();
      const pos = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = (pos / rect.width) * 100;
      handle.style.left = `${pct}%`;
      afterWrap.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    };

    handle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDown = true;
    });

    window.addEventListener('mouseup', () => {
      isDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDown) setPosition(e.clientX);
    });

    // Touch Support
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length) setPosition(e.touches[0].clientX);
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (e.touches.length) setPosition(e.touches[0].clientX);
    }, { passive: true });

    // Klick auf eine Stelle im Bild setzt Schieber
    container.addEventListener('click', (e) => {
      setPosition(e.clientX);
    });
  });
}

// === 9. MOTION-PRIMITIVE 7: TEXT-SCRUBBING (DIM-TO-REVEAL) ===
function initTextScrub() {
  document.querySelectorAll('[data-text-scrub]').forEach((container) => {
    const text = container.textContent.trim();
    const words = text.split(/\s+/);
    container.innerHTML = words
      .map((w) => `<span class="text-scrub-word">${w}</span> `)
      .join('');

    const wordEls = container.querySelectorAll('.text-scrub-word');
    if (!wordEls.length) return;

    gsap.to(wordEls, {
      opacity: 1.0,
      stagger: 0.04,
      scrollTrigger: {
        trigger: container,
        start: 'top 82%',
        end: 'bottom 45%',
        scrub: 0.6
      }
    });
  });
}

// === 10. SIGNATURE FEATURE: INGOLSTÄDTER HAPTIK-TISCH & LICHTSIMULATOR ===
function initSignatureFeature() {
  const container = document.querySelector('[data-haptik-simulator]');
  if (!container) return;

  const surfaceBtns = container.querySelectorAll('.surface-btn');
  const lightSlider = document.getElementById('lightSlider');
  const lightTimeLabel = document.getElementById('lightTimeLabel');
  const stageTexture = document.getElementById('stageTexture');
  const stageLightFilter = document.getElementById('stageLightFilter');
  const stageHaptikText = document.getElementById('stageHaptikText');
  const stageKelvinText = document.getElementById('stageKelvinText');
  const musterboxSummary = document.getElementById('musterboxSummary');
  const btnAdoptSample = document.getElementById('btnAdoptSample');
  const formSurfaceInput = document.getElementById('selectedSurfaceInput');

  // Oberflächen-Konfigurationen
  const surfaces = {
    'eiche-natur': {
      name: 'Naturland-Eiche handgehobelt',
      haptik: 'Struktur: Handgehobelt mit seidig mattem Leinölfinish',
      textureBg: 'linear-gradient(135deg, #DE9B53 0%, #C6813D 45%, #9E5B1D 100%)',
      craftRadio: 'Parkettverlegung Neubau'
    },
    'fischgraet-raeucher': {
      name: 'Räuchereiche Fischgrät 45°',
      haptik: 'Struktur: Präziser 45°-Chevron mit tiefem Tannin-Farbton',
      textureBg: 'linear-gradient(135deg, #3D2D24 0%, #241A15 50%, #150F0D 100%)',
      craftRadio: 'Parkettsanierung & Schleifen'
    },
    'akustik-design': {
      name: 'Fugenloser Akustik-Designbelag',
      haptik: 'Struktur: Samtige mineralische Haptik mit Trittschalldämpfung',
      textureBg: 'linear-gradient(135deg, #D6D0C5 0%, #BFB8AB 50%, #A39B8B 100%)',
      craftRadio: 'Designbelag & Naturboden'
    }
  };

  // Licht-Presets
  const lightPresets = {
    1: {
      time: '08:00 Uhr · Flaches Morgen-Streiflicht',
      kelvin: 'Farbtemperatur: 4200 Kelvin',
      filter: 'brightness(0.96) contrast(1.18) saturate(0.95)',
      filterBg: 'linear-gradient(90deg, rgba(220, 235, 255, 0.28) 0%, rgba(255, 255, 255, 0) 100%)'
    },
    2: {
      time: '12:00 Uhr · Helles Mittags-Zenitlicht',
      kelvin: 'Farbtemperatur: 5200 Kelvin',
      filter: 'brightness(1.08) contrast(1.05) saturate(1.02)',
      filterBg: 'radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.3) 0%, rgba(0,0,0,0) 80%)'
    },
    3: {
      time: '20:00 Uhr · 2700K Warmes Abendlicht',
      kelvin: 'Farbtemperatur: 2700 Kelvin (Warmweiß)',
      filter: 'brightness(1.04) contrast(1.1) saturate(1.25) sepia(0.35)',
      filterBg: 'linear-gradient(180deg, rgba(235, 140, 40, 0.32) 0%, rgba(140, 60, 10, 0.4) 100%)'
    }
  };

  let currentSurfaceKey = 'eiche-natur';
  let currentLightKey = 2;

  function updateSimulator() {
    const s = surfaces[currentSurfaceKey];
    const l = lightPresets[currentLightKey];

    // Texture & Haptik
    if (stageTexture) stageTexture.style.background = s.textureBg;
    if (stageHaptikText) stageHaptikText.textContent = s.haptik;
    if (stageKelvinText) stageKelvinText.textContent = l.kelvin;
    if (lightTimeLabel) lightTimeLabel.textContent = l.time;

    // Filter
    if (stageLightFilter) {
      stageLightFilter.style.filter = l.filter;
      stageLightFilter.style.background = l.filterBg;
    }

    // Musterbox Summary Text
    if (musterboxSummary) {
      musterboxSummary.innerHTML = `Konfiguriert: <strong>${s.name}</strong> im Lichteinfall ${l.time.split('·')[0].trim()}.`;
    }

    // Hidden Form Field für Kontaktformular synchronisieren
    if (formSurfaceInput) {
      formSurfaceInput.value = `${s.name} (${l.time.split('·')[0].trim()})`;
    }
  }

  // Event Listener: Oberflächen-Buttons
  surfaceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      surfaceBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      currentSurfaceKey = btn.dataset.surface;
      updateSimulator();
    });
  });

  // Event Listener: Licht-Slider
  if (lightSlider) {
    lightSlider.addEventListener('input', (e) => {
      currentLightKey = parseInt(e.target.value, 10);
      updateSimulator();
    });
  }

  // Preset Klicks
  container.querySelectorAll('.preset-mark').forEach((mark) => {
    mark.addEventListener('click', () => {
      const v = parseInt(mark.dataset.val, 10);
      if (lightSlider) lightSlider.value = v;
      currentLightKey = v;
      updateSimulator();
    });
  });

  // Klick auf "Muster im Showroom ansehen" übernimmt Auswahl ins Formular
  if (btnAdoptSample) {
    btnAdoptSample.addEventListener('click', () => {
      const s = surfaces[currentSurfaceKey];
      // Radio-Button im Kontaktformular anpassen
      const matchingRadio = document.querySelector(`input[name="projektart"][value="${s.craftRadio}"]`);
      if (matchingRadio) {
        matchingRadio.checked = true;
      }
    });
  }

  // Initial ausführen
  updateSimulator();
}

// === 11. TAGESZEIT-PERSONALISIERUNG ===
function initTimeGreeting() {
  const el = document.querySelector('[data-time-greeting]');
  if (!el) return;

  const h = new Date().getHours();
  let msg = '';
  if (h >= 6 && h < 12) {
    msg = 'Guten Morgen aus Ingolstadt. Gerne empfangen wir Sie heute in unserem Showroom an der Münchener Straße 37.';
  } else if (h >= 12 && h < 19) {
    msg = 'Guten Tag. Entdecken Sie 30 Jahre handwerkliche Meisterschaft für Parkett und Naturböden.';
  } else {
    msg = 'Guten Abend. Außerhalb der Öffnungszeiten? Sichern Sie sich Ihren persönlichen Bemusterungstermin online.';
  }
  el.textContent = msg;
}

// === 12. MOBILE NAVIGATION (DEADLOCK-SAFE) ===
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!hamburger || !menu) return;

  const open = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    menu.removeAttribute('hidden');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };

  const close = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('hidden', '');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  });

  // Link-Klick schließt Menü UND scrollt sauber zum Ziel
  menu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      close();
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          setTimeout(() => {
            if (lenis) {
              lenis.scrollTo(target, { offset: -76, immediate: false });
            } else {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 80);
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      close();
    }
  });
}

// === 13. MODALS MANAGEMENT (IMPRESSUM & DATENSCHUTZ) ===
function initModals() {
  document.querySelectorAll('[data-modal-open]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.modalOpen;
      const modal = document.getElementById(modalId);
      if (!modal) return;

      modal.removeAttribute('hidden');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();

      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) closeBtn.focus();
    });
  });

  const closeAll = () => {
    document.querySelectorAll('.modal:not([hidden])').forEach((m) => {
      m.setAttribute('hidden', '');
      m.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  document.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeAll);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}

// === 14. DSGVO TWO-CLICK MAPS & CONSENT MANAGER ===
function initConsent() {
  const KEY = 'consent_bodenpark_v1';
  const banner = document.getElementById('consentBanner');
  const stored = localStorage.getItem(KEY);
  const mapsContainer = document.getElementById('mapsContainer');
  const mapsIframe = document.getElementById('mapsIframe');
  const btnLoadMaps = document.getElementById('btnLoadMaps');

  function enableMaps() {
    if (mapsContainer && mapsIframe) {
      mapsContainer.classList.add('has-consent');
      if (mapsIframe.dataset.src) {
        mapsIframe.src = mapsIframe.dataset.src;
      }
    }
  }

  function applyConsent(accepted) {
    if (accepted) {
      enableMaps();
    }
    if (banner) banner.hidden = true;
  }

  if (stored === 'accepted') {
    applyConsent(true);
  } else if (stored === 'rejected') {
    applyConsent(false);
  } else if (banner) {
    banner.hidden = false;
  }

  document.getElementById('consentAccept')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'accepted');
    applyConsent(true);
  });

  document.getElementById('consentReject')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'rejected');
    applyConsent(false);
  });

  document.getElementById('cookieSettingsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(KEY);
    if (banner) banner.hidden = false;
  });

  // Direkter Klick auf "Karte jetzt aktivieren"
  btnLoadMaps?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'accepted');
    enableMaps();
  });
}

// === 15. ERLEBNIS-KONTAKTPUNKT & MULTI-STEP ENGINE ===
function initExperienceContact() {
  const container = document.querySelector('[data-experience-contact]');
  const form = document.getElementById('contactForm');
  if (!container || !form) return;

  const fallback = document.getElementById('formFallback');
  const status = document.getElementById('formStatus');
  const badges = container.querySelectorAll('.step-badge');
  const panels = container.querySelectorAll('.step-panel');

  function goToStep(stepNum) {
    panels.forEach((p) => {
      const isTarget = p.id === `stepPanel${stepNum}`;
      p.hidden = !isTarget;
      p.classList.toggle('active', isTarget);
    });

    badges.forEach((b) => {
      const isActive = parseInt(b.dataset.step, 10) === stepNum;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const activePanel = container.querySelector(`.step-panel#stepPanel${stepNum}`);
    if (activePanel) {
      const firstInput = activePanel.querySelector('input:not([type="hidden"]), select, textarea, button');
      if (firstInput) firstInput.focus();
    }
  }

  container.querySelectorAll('[data-goto-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.dataset.gotoStep, 10);
      goToStep(targetStep);
    });
  });

  badges.forEach((b) => {
    b.addEventListener('click', () => {
      const step = parseInt(b.dataset.step, 10);
      goToStep(step);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btnSubmitContact');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Meister-Anfrage wird übertragen…';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        if (status) {
          status.textContent = 'Vielen Dank! Ihre Anfrage ist direkt bei Inhaber Bernd Engelhardt eingegangen. Wir melden uns innerhalb von 24 Stunden.';
          status.style.color = 'var(--sc-accent)';
        }
        form.reset();
        goToStep(1);
      } else {
        if (fallback) fallback.style.display = 'block';
        if (status) status.textContent = 'Verbindung verzögert. Bitte rufen Sie uns direkt an: 0841 99329112';
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Meister-Anfrage jetzt absenden';
        }
      }
    } catch {
      if (fallback) fallback.style.display = 'block';
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Jetzt erneut versuchen';
      }
    }
  });
}

// === 16. HEADER SCROLL MORPH ===
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener(
    'scroll',
    () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    },
    { passive: true }
  );
}

// === 17. DEMO LIVE-ALARM TRACKER (v6.2 / v8.0) ===
function initDemoTracker() {
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.search.includes('preview=true')
  ) {
    return;
  }

  const startTime = Date.now();
  const company = 'Bodenpark Engelhardt';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const deviceType = isMobile ? 'Smartphone (Mobil)' : 'Desktop-Computer';
  const referrer = document.referrer
    ? document.referrer.includes('whatsapp')
      ? 'WhatsApp Direktlink'
      : document.referrer
    : 'Direktaufruf';

  let pingSent = false;
  let exitSent = false;
  const clickedActions = new Set();

  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => {
      const type = el.getAttribute('data-track');
      if (type === 'whatsapp') clickedActions.add('WhatsApp-Direktchat');
      else if (type === 'telefon') clickedActions.add('Telefonnummer (0841 99329112)');
      else if (type === 'rechner') clickedActions.add('Haptik-Tisch & Lichtsimulator');
      else if (type === 'angebot') clickedActions.add('Showroom-Bemusterung');
    });
  });

  async function sendAlert(stage) {
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    const durationText =
      elapsedSeconds < 60
        ? `${elapsedSeconds}s`
        : `${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s`;

    let statusText = '⚡ Reingeschaut';
    let empfehlung = 'Wie vereinbart am Donnerstag um 10:00 Uhr anrufen und Bezug auf den WhatsApp-Link nehmen.';

    if (elapsedSeconds >= 45 || clickedActions.size > 0) {
      statusText = '🔥 HEISS! Hohes Interesse & Klicks!';
      empfehlung = 'SOFORTIGE AKTION: In den nächsten 15–30 Minuten via WhatsApp nachhaken („Servus Herr Engelhardt, ich habe gesehen, Sie prüfen den Entwurf gerade...“).';
    } else if (elapsedSeconds >= 20) {
      statusText = '👍 WARM! Hat die Seite aufmerksam betrachtet.';
      empfehlung = 'Follow-Up Call vorbereiten (Donnerstag). Skript Phase 8 bereithalten.';
    }

    const clickedList = clickedActions.size > 0 ? Array.from(clickedActions).join(', ') : 'Nur gescrollt';
    const message =
      `🔔 [NEXBOT LIVE-ALARM] Meister schaut Demo an!\n\n` +
      `🏢 Firma: ${company}\n` +
      `📱 Gerät: ${deviceType}\n` +
      `🔗 Quelle: ${referrer}\n` +
      `⏱️ Verweildauer: ${durationText}\n` +
      `🎯 Klicks: ${clickedList}\n` +
      `📊 Status: ${statusText}\n\n` +
      `💡 Empfehlung für Raphael:\n${empfehlung}`;

    // 1. Telegram Push Alarm an Raphael
    try {
      fetch('https://api.telegram.org/bot8932370815:AAEfF_FRLC12FTFwoa9uRrizlARluM8KYxE/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: '5942652345', text: message }),
        keepalive: true
      }).catch(() => {});
    } catch (_) {}

    // 2. E-Mail Alarm an Formspree
    try {
      fetch('https://formspree.io/f/xbjnqkyv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          subject: `🔥 [LIVE-ALARM] ${company} (${durationText})`,
          message: message
        }),
        keepalive: true
      }).catch(() => {});
    } catch (_) {}
  }

  setTimeout(() => {
    if (!pingSent) {
      pingSent = true;
      sendAlert('initial');
    }
  }, 5000);

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && !exitSent) {
      exitSent = true;
      sendAlert('exit');
    }
  });
}

// === 18. INITIALISIERUNG BEI DOMCONTENTLOADED ===
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  // Grundfunktionen (immer aktiv, kein Overhead)
  initDemoTracker();
  initTimeGreeting();
  initConsent();
  initMobileNav();
  initModals();
  initHeader();
  initExperienceContact();
  initSignatureFeature();
  initBeforeAfterSlider();

  // Motion-Primitiven (wenn nicht reduced-motion)
  if (!prefersReducedMotion) {
    initKineticTypography();
    initSchattenfugeLines();
    initScrollAnimations();
    initCounters();
    init3DTilt();
    initTextScrub();
  }
});
