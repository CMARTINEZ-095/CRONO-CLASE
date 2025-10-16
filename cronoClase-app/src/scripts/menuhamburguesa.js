document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('hamburgerBtn');
  const panel = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');
  const desktopLinks = document.querySelector('.nav-buttons');
  const mobileLinksContainer = document.querySelector('.mobile-links');

  if (!btn || !panel || !overlay || !desktopLinks || !mobileLinksContainer) return;

  // clone links once to preserve desktop nav
  mobileLinksContainer.innerHTML = desktopLinks.innerHTML;

  const openMenu = () => {
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Cerrar menú');
    panel.classList.add('open');
    overlay.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    const first = panel.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
    if (first) first.focus();
    trapFocus(panel);
  };

  const closeMenu = () => {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Abrir menú');
    panel.classList.remove('open');
    overlay.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    btn.focus();
    removeFocusTrap();
  };

  btn.addEventListener('click', () => {
    if (btn.classList.contains('open')) closeMenu(); else openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeMenu();
  });

  // Focus trap helpers
  let _focusPrevious = null;
  function trapFocus(container) {
    _focusPrevious = document.activeElement;
    const focusables = Array.from(container.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])'));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    function handleTab(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
    container.__focusHandler = handleTab;
    document.addEventListener('keydown', handleTab);
  }

  function removeFocusTrap() {
    if (panel.__focusHandler) {
      document.removeEventListener('keydown', panel.__focusHandler);
      delete panel.__focusHandler;
    }
    if (_focusPrevious) {
      try { _focusPrevious.focus(); } catch (e) {}
      _focusPrevious = null;
    }
  }

  // Close on resize when going to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 780 && panel.classList.contains('open')) closeMenu();
  });
});
