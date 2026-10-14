(() => {
  'use strict';

  const config = window.MAYORKINS_CONFIG || {};
  const root = document.documentElement;
  const body = document.body;
  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const safeHttpsUrl = (value, allowedHosts) => {
    if (!value || typeof value !== 'string') return '';
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:') return '';
      if (allowedHosts && !allowedHosts.some(host => url.hostname === host || url.hostname.endsWith(`.${host}`))) return '';
      return url.href;
    } catch (_) {
      return '';
    }
  };

  const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
  const email = validEmail(config.email) ? String(config.email).trim() : '';
  const whatsappUrl = value => {
    const digits = String(value || '').replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15 ? `https://wa.me/${digits}` : '';
  };
  const whatsappContacts = [
    { label: 'Mayowa on WhatsApp', url: whatsappUrl(config.whatsapp) },
    { label: 'Akande on WhatsApp', url: whatsappUrl(config.akandeWhatsapp) }
  ].filter(item => item.url);
  const socialLinks = [
    { label: 'Instagram', url: safeHttpsUrl(config.instagram, ['instagram.com']) },
    { label: 'Facebook', url: safeHttpsUrl(config.facebook, ['facebook.com']) },
    { label: 'Mayowa on LinkedIn', url: safeHttpsUrl(config.linkedin, ['linkedin.com']) },
    { label: 'Akande on LinkedIn', url: safeHttpsUrl(config.akandeLinkedin, ['linkedin.com']) },
    { label: 'X', url: safeHttpsUrl(config.x, ['x.com', 'twitter.com']) }
  ].filter(item => item.url);
  const channels = [
    ...(email ? [{ label: 'Email the studio', url: `mailto:${email}`, external: false }] : []),
    ...whatsappContacts.map(item => ({ ...item, external: true })),
    ...socialLinks.map(item => ({ ...item, external: true }))
  ];

  function addLink(container, item, compact = false) {
    const link = document.createElement('a');
    link.href = item.url;
    link.textContent = item.label;
    if (item.external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    if (compact && item.external) link.setAttribute('aria-label', `${item.label} (opens in a new tab)`);
    container.append(link);
  }

  function initContact() {
    const contactContainer = q('[data-contact-links]');
    const footerContainer = q('[data-footer-contacts]');
    const note = q('[data-contact-note]');

    if (contactContainer && channels.length) {
      contactContainer.replaceChildren();
      channels.forEach(item => addLink(contactContainer, item));
      contactContainer.hidden = false;
    }
    if (footerContainer && channels.length) channels.forEach(item => addLink(footerContainer, item, true));

    if (note) {
      if (channels.length) {
        note.textContent = 'Prefer a direct hello? Use one of the verified contact links above, or share a few details below.';
      } else if (getEndpoint()) {
        note.textContent = 'Share the essentials below. Please leave out passwords, payment details, and other sensitive information.';
      }
    }

    const availability = q('[data-availability]');
    if (availability && typeof config.availabilityLabel === 'string' && config.availabilityLabel.trim()) {
      availability.textContent = config.availabilityLabel.trim();
    }

    const year = q('[data-year]');
    if (year) year.textContent = String(new Date().getFullYear());

    const origin = safeHttpsUrl(config.siteOrigin, null);
    if (origin) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      const siteRoot = origin.endsWith('/') ? origin : `${origin}/`;
      canonical.href = siteRoot;
      document.head.append(canonical);
      const socialImage = new URL('assets/img/og-cover.webp', siteRoot).href;
      const ogImage = q('meta[property="og:image"]');
      const twitterImage = q('meta[name="twitter:image"]');
      if (ogImage) ogImage.content = socialImage;
      if (twitterImage) twitterImage.content = socialImage;
      let ogUrl = q('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.append(ogUrl);
      }
      ogUrl.content = canonical.href;
    }
  }

  function getEndpoint() {
    const raw = String(config.formEndpoint || '').trim();
    if (!raw) return '';
    try {
      const url = new URL(raw, location.href);
      if (url.protocol !== 'https:' && url.origin !== location.origin) return '';
      return url.href;
    } catch (_) {
      return '';
    }
  }

  function initTheme() {
    const toggle = q('[data-theme-toggle]');
    const themeMeta = q('[data-theme-color]');
    const preference = window.matchMedia('(prefers-color-scheme: light)');
    const storageKey = 'mayorkins-theme';
    const readSavedTheme = () => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        return saved === 'light' || saved === 'dark' ? saved : null;
      } catch (_) {
        return null;
      }
    };

    let savedTheme = readSavedTheme();
    let hasUserChoice = savedTheme !== null;
    const applyTheme = (theme, persist = false) => {
      const nextTheme = theme === 'light' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      if (toggle) {
        const isDark = nextTheme === 'dark';
        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
      }
      if (themeMeta) themeMeta.content = nextTheme === 'dark' ? '#090A0E' : '#F1F2EC';
      if (persist) {
        hasUserChoice = true;
        savedTheme = nextTheme;
        try {
          window.localStorage.setItem(storageKey, nextTheme);
        } catch (_) {
          // Keep the selected theme for this page even if storage is unavailable.
        }
      }
    };

    applyTheme(savedTheme || root.dataset.theme || (preference.matches ? 'light' : 'dark'));
    if (toggle) toggle.addEventListener('click', () => {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });

    const followSystemPreference = event => {
      if (!hasUserChoice) applyTheme(event.matches ? 'light' : 'dark');
    };
    if (typeof preference.addEventListener === 'function') preference.addEventListener('change', followSystemPreference);
    else if (typeof preference.addListener === 'function') preference.addListener(followSystemPreference);
  }

  function initHeader() {
    const header = q('[data-header]');
    const toggle = q('[data-menu-toggle]');
    const nav = q('[data-nav-links]');
    if (!header) return;

    let ticking = false;
    const updateScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
        const progress = q('[data-progress]');
        if (progress) progress.style.transform = `scaleX(${ratio})`;
        ticking = false;
      });
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });

    if (!toggle || !nav) return;
    const setMenu = (open, returnFocus = false) => {
      const mobile = window.innerWidth <= 700;
      header.classList.toggle('is-menu-open', open);
      body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      nav.inert = mobile && !open;
      nav.setAttribute('aria-hidden', String(mobile && !open));
      if (open) {
        const firstLink = q('a', nav);
        if (firstLink) firstLink.focus();
      } else if (returnFocus) {
        toggle.focus();
      }
    };
    nav.inert = window.innerWidth <= 700;
    nav.setAttribute('aria-hidden', String(window.innerWidth <= 700));

    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    qa('a', nav).forEach(link => link.addEventListener('click', () => {
      const destination = link.getAttribute('href');
      setMenu(false);
      if (window.innerWidth <= 700 && destination && destination.startsWith('#')) {
        const target = q(destination);
        if (target) {
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
          window.requestAnimationFrame(() => target.focus({ preventScroll: true }));
        }
      }
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
    });
    window.addEventListener('resize', () => {
      const mobile = window.innerWidth <= 700;
      if (!mobile && toggle.getAttribute('aria-expanded') === 'true') setMenu(false);
      else {
        nav.inert = mobile && toggle.getAttribute('aria-expanded') !== 'true';
        nav.setAttribute('aria-hidden', String(mobile && toggle.getAttribute('aria-expanded') !== 'true'));
      }
    }, { passive: true });

    const navLinks = qa('.nav-links a[href^="#"]');
    const sections = navLinks.map(link => q(link.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window && sections.length) {
      const navObserver = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${visible.target.id}`;
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, .15, .4] });
      sections.forEach(section => navObserver.observe(section));
    }
  }

  function initReveals() {
    const targets = qa('[data-reveal]');
    if (!targets.length) return;
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      targets.forEach(target => target.classList.add('is-revealed'));
      return;
    }
    root.classList.add('reveal-enabled');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -45px 0px' });
    targets.forEach(target => observer.observe(target));
  }

  function initReviewCarousel() {
    const carousel = q('[data-review-carousel]');
    if (!carousel) return;
    const track = q('[data-review-track]', carousel);
    const cards = track ? qa('.review-card', track) : [];
    const controls = q('[data-review-controls]', carousel);
    const previous = q('[data-review-prev]', carousel);
    const next = q('[data-review-next]', carousel);
    const dots = q('[data-review-dots]', carousel);
    const status = q('[data-review-status]', carousel);
    if (!track || !cards.length || !controls || !previous || !next || !dots || !status) return;

    let currentIndex = 0;
    let visibleCount = 1;
    let maxIndex = 0;
    let itemStep = 1;
    let scrollFrame = 0;
    let resizeFrame = 0;
    let hasMeasured = false;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const updateControls = () => {
      const lastVisible = Math.min(cards.length, currentIndex + visibleCount);
      status.textContent = `Showing reviews ${currentIndex + 1}–${lastVisible} of ${cards.length}.`;
      previous.disabled = currentIndex === 0;
      next.disabled = currentIndex >= maxIndex;
      qa('[data-review-index]', dots).forEach(dot => {
        dot.setAttribute('aria-current', Number(dot.dataset.reviewIndex) === currentIndex ? 'true' : 'false');
      });
    };

    const renderDots = () => {
      const count = maxIndex + 1;
      dots.style.setProperty('--review-dot-count', String(count));
      dots.replaceChildren();
      for (let index = 0; index <= maxIndex; index += 1) {
        const first = index + 1;
        const last = Math.min(cards.length, index + visibleCount);
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'review-dot';
        dot.dataset.reviewIndex = String(index);
        dot.setAttribute('aria-label', `Show reviews ${first} to ${last}`);
        dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        const marker = document.createElement('span');
        marker.setAttribute('aria-hidden', 'true');
        dot.append(marker);
        dots.append(dot);
      }
    };

    const measure = () => {
      const oldIndex = currentIndex;
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap) || 0;
      const cardWidth = cards[0].getBoundingClientRect().width;
      itemStep = Math.max(1, cardWidth + gap);
      visibleCount = clamp(Math.floor((track.clientWidth + gap + 1) / itemStep), 1, cards.length);
      maxIndex = Math.max(0, cards.length - visibleCount);
      currentIndex = clamp(oldIndex, 0, maxIndex);
      renderDots();
      updateControls();
      if (hasMeasured) track.scrollTo({ left: currentIndex * itemStep, behavior: 'auto' });
      hasMeasured = true;
    };

    const goTo = index => {
      currentIndex = clamp(index, 0, maxIndex);
      updateControls();
      track.scrollTo({
        left: currentIndex * itemStep,
        behavior: reducedMotion.matches ? 'auto' : 'smooth'
      });
    };

    previous.addEventListener('click', () => goTo(currentIndex - 1));
    next.addEventListener('click', () => goTo(currentIndex + 1));
    dots.addEventListener('click', event => {
      const button = event.target.closest('[data-review-index]');
      if (button && dots.contains(button)) goTo(Number(button.dataset.reviewIndex));
    });
    track.addEventListener('scroll', () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        const index = clamp(Math.round(track.scrollLeft / itemStep), 0, maxIndex);
        if (index !== currentIndex) {
          currentIndex = index;
          updateControls();
        }
      });
    }, { passive: true });
    track.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(currentIndex + 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(currentIndex - 1);
      }
    });

    controls.hidden = false;
    measure();
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(() => {
        if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(() => {
          resizeFrame = 0;
          measure();
        });
      });
      observer.observe(track);
    } else {
      window.addEventListener('resize', measure, { passive: true });
    }
  }

  function initProcess() {
    const steps = qa('[data-step]');
    const section = q('#process');
    if (!steps.length || !section) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const sectionRect = section.getBoundingClientRect();
      if (sectionRect.bottom < 0 || sectionRect.top > window.innerHeight) return;
      const focusLine = Math.max(sectionRect.top, Math.min(window.innerHeight * .48, sectionRect.bottom));
      const rects = steps.map(step => ({ step, rect: step.getBoundingClientRect() }));
      const containing = rects.find(item => item.rect.top <= focusLine && item.rect.bottom >= focusLine);
      const nearest = containing || rects.reduce((best, item) => {
        const center = item.rect.top + item.rect.height / 2;
        const distance = Math.abs(center - focusLine);
        return !best || distance < best.distance ? { step: item.step, distance } : best;
      }, null);
      if (nearest) {
        const target = containing ? containing.step : nearest.step;
        steps.forEach(step => step.classList.toggle('is-active', step === target));
      }
    };
    const schedule = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();
  }

  function initBudgetOptions() {
    const select = q('#budget');
    if (!select || !Array.isArray(config.budgetRanges) || !config.budgetRanges.length) return;
    const first = document.createElement('option');
    first.value = '';
    first.textContent = 'Select a range or skip';
    select.replaceChildren(first);
    config.budgetRanges.forEach(label => {
      if (typeof label !== 'string' || !label.trim()) return;
      const option = document.createElement('option');
      option.textContent = label.trim();
      option.value = label.trim();
      select.append(option);
    });
  }

  function initForm() {
    const form = q('#project-form');
    if (!form) return;
    const endpoint = getEndpoint();
    const endpointRaw = String(config.formEndpoint || '').trim();
    const submit = q('[data-submit-button]', form);
    const submitLabel = q('[data-submit-label]', form);
    const status = q('[data-form-status]', form);
    const privacy = q('#privacy-note', form);
    const downloadAgain = q('[data-download-again]', form);
    if (submit) submit.disabled = false;
    const fields = {
      name: q('#full-name', form),
      email: q('#email', form),
      projectType: q('#project-type', form),
      brief: q('#project-brief', form)
    };
    const errors = {
      name: q('#name-error', form),
      email: q('#email-error', form),
      projectType: q('#project-type-error', form),
      brief: q('#brief-error', form)
    };
    let submitting = false;
    let prepared = false;
    let delivered = false;
    let lastPayload = null;
    let resetting = false;

    if (submitLabel) submitLabel.textContent = endpoint ? 'Send project enquiry' : 'Prepare my project brief';
    if (privacy) {
      if (endpoint) privacy.textContent = 'Your enquiry will be sent to the studio’s configured form endpoint. Please do not include passwords or payment details.';
      else if (endpointRaw) privacy.textContent = 'The form endpoint setting is not a valid same-origin or HTTPS URL. Nothing will be sent; submitting prepares a local brief file.';
      else privacy.textContent = 'No form endpoint is connected in this static version. Nothing is transmitted; submitting prepares a text brief on your device.';
    }

    function messageFor(key, value) {
      const field = fields[key];
      const text = String(value ?? '').trim();
      if (!field) return '';
      if (key === 'name' && text.length < 2) return 'Please enter your name (at least 2 characters).';
      if (key === 'email' && (!text || !field.validity.valid)) return 'Enter a valid email address so we can reply.';
      if (key === 'projectType' && !text) return 'Choose the project type that fits best.';
      if (key === 'brief' && text.length < 20) return 'Add a little more detail (at least 20 characters).';
      return '';
    }

    function validateField(key, markTouched = true) {
      const field = fields[key];
      const error = errors[key];
      if (!field || !error) return true;
      if (markTouched) field.dataset.touched = 'true';
      const message = messageFor(key, field.value);
      error.textContent = message;
      if (message) field.setAttribute('aria-invalid', 'true');
      else field.removeAttribute('aria-invalid');
      return !message;
    }

    function validateAll() {
      const keys = Object.keys(fields);
      return keys.map(key => validateField(key)).every(Boolean);
    }

    Object.keys(fields).forEach(key => {
      const field = fields[key];
      field.addEventListener('blur', () => validateField(key));
      field.addEventListener('input', () => {
        if (field.dataset.touched === 'true') validateField(key, false);
        if (prepared && !resetting) {
          prepared = false;
          if (submit) submit.disabled = false;
          if (submitLabel) submitLabel.textContent = 'Prepare a new brief';
          if (status) status.textContent = 'Your brief has changed. Prepare a fresh copy when ready.';
          if (downloadAgain) downloadAgain.hidden = false;
        }
      });
      field.addEventListener('change', () => {
        if (field.dataset.touched === 'true') validateField(key, false);
      });
    });

    function payloadFromForm() {
      const formData = new FormData(form);
      return {
        name: String(formData.get('name') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        company: String(formData.get('company') || '').trim(),
        projectType: String(formData.get('projectType') || '').trim(),
        budget: String(formData.get('budget') || '').trim(),
        preferredContact: String(formData.get('preferredContact') || '').trim(),
        brief: String(formData.get('brief') || '').trim(),
        source: 'Mayorkins Studio project inquiry',
        pageUrl: location.href,
        submittedAt: new Date().toISOString()
      };
    }

    function briefText(payload) {
      return [
        'MAYORKINS STUDIO — PROJECT BRIEF',
        'LOCAL DRAFT — THIS FILE HAS NOT BEEN SENT',
        `Prepared: ${new Date().toLocaleString()}`,
        '',
        `Name: ${payload.name}`,
        `Work email: ${payload.email}`,
        `Company / business: ${payload.company || 'Not provided'}`,
        `Project type: ${payload.projectType}`,
        `Indicative budget: ${payload.budget || 'Not provided'}`,
        `Preferred contact: ${payload.preferredContact || 'No preference'}`,
        '',
        'PROJECT DESCRIPTION',
        payload.brief,
        '',
        'Note: This brief was generated locally by the website. It was not submitted to Mayorkins Studio.'
      ].join('\n');
    }

    function downloadBrief(payload) {
      if (!payload) return;
      const blob = new Blob([briefText(payload)], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const safeName = (payload.name || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 32) || 'project';
      link.href = url;
      link.download = `mayorkins-project-brief-${safeName}.txt`;
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    }

    function setStatus(text, isError = false) {
      if (!status) return;
      status.textContent = text;
      status.classList.toggle('is-error', isError);
    }

    function setBusy(busy) {
      submitting = busy;
      if (submit) submit.disabled = busy || delivered;
      if (submitLabel && busy) submitLabel.textContent = 'Preparing…';
      if (submitLabel && !busy && !prepared && !delivered) submitLabel.textContent = endpoint ? 'Send project enquiry' : 'Prepare my project brief';
    }

    function fallbackCopyLink() {
      const followup = q('[data-form-followup]', form);
      if (!followup) return;
      followup.replaceChildren();
      if (email && lastPayload) {
        const mail = document.createElement('a');
        mail.className = 'text-link';
        mail.href = `mailto:${email}?subject=${encodeURIComponent(`Project enquiry — ${lastPayload.name}`)}&body=${encodeURIComponent(briefText(lastPayload))}`;
        mail.textContent = 'Open an email draft';
        const arrow = document.createElement('span');
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '↗';
        mail.append(arrow);
        followup.append(mail);
      }
    }

    async function sendToEndpoint(payload) {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 25000);
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
          credentials: 'omit',
          redirect: 'error',
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`Submission failed (${response.status})`);
        return response;
      } finally {
        window.clearTimeout(timer);
      }
    }

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (submitting || delivered) return;
      if (!validateAll()) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        setStatus('Please review the highlighted fields before continuing.', true);
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      lastPayload = payloadFromForm();
      setBusy(true);
      setStatus('');
      if (downloadAgain) downloadAgain.hidden = true;
      const followup = q('[data-form-followup]', form);
      if (followup) followup.replaceChildren();

      if (!endpoint) {
        await new Promise(resolve => window.setTimeout(resolve, 350));
        downloadBrief(lastPayload);
        prepared = true;
        setBusy(false);
        if (submitLabel) submitLabel.textContent = 'Brief prepared · edit to start again';
        if (submit) submit.disabled = true;
        if (downloadAgain) downloadAgain.hidden = false;
        setStatus('Your project brief has been prepared and downloaded. It has not been sent to Mayorkins Studio.');
        fallbackCopyLink();
        return;
      }

      try {
        await sendToEndpoint(lastPayload);
        delivered = true;
        resetting = true;
        form.reset();
        Object.values(fields).forEach(field => {
          delete field.dataset.touched;
          field.removeAttribute('aria-invalid');
        });
        Object.values(errors).forEach(error => { error.textContent = ''; });
        resetting = false;
        setBusy(false);
        if (submitLabel) submitLabel.textContent = 'Enquiry received';
        if (submit) submit.disabled = true;
        setStatus('Thanks — the form endpoint confirmed receipt of your project enquiry.');
      } catch (error) {
        console.error('Project enquiry could not be confirmed:', error);
        setBusy(false);
        if (submitLabel) submitLabel.textContent = 'Try sending again';
        if (downloadAgain) downloadAgain.hidden = false;
        setStatus('We could not confirm the submission. Your enquiry may not have reached the studio. Try again or download a copy of your brief.', true);
      }
    });

    if (downloadAgain) {
      downloadAgain.addEventListener('click', () => {
        if (lastPayload) downloadBrief(lastPayload);
      });
    }
  }

  function init() {
    initTheme();
    initContact();
    initHeader();
    initReveals();
    initProcess();
    initReviewCarousel();
    initBudgetOptions();
    initForm();
  }

  init();
})();
