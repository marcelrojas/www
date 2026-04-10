let isKeydownListenerActive = false;
let previousFocus = null;

function initInfoSystem() {
  const body = document.body;
  const footerToggleBtn = document.getElementById('footer-toggle');
  const footer = document.getElementById('footer');

  if (!footerToggleBtn || !footer) return;

  const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function getFocusableElements() {
    const footerElements = Array.from(footer.querySelectorAll(focusableSelectors));
    return [footerToggleBtn, ...footerElements].filter(
      el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
    );
  }

  function handleKeydown(e) {
    if (!body.classList.contains('footer-open')) return;

    if (e.key === 'Escape') {
      toggleFooter(false);
      return;
    }

    if (e.key === 'Tab') {
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }

  function toggleFooter(forceState) {
    const isOpen = typeof forceState === 'boolean' ? forceState : !body.classList.contains('footer-open');

    if (isOpen) {
      previousFocus = document.activeElement;
      body.classList.add('footer-open');
      footerToggleBtn.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';

      const focusable = getFocusableElements();
      if (focusable.length > 1) {
        focusable[1].focus();
      } else {
        footer.focus();
      }

      if (!isKeydownListenerActive) {
        document.addEventListener('keydown', handleKeydown);
        isKeydownListenerActive = true;
      }
    } else {
      body.classList.remove('footer-open');
      footerToggleBtn.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';

      if (isKeydownListenerActive) {
        document.removeEventListener('keydown', handleKeydown);
        isKeydownListenerActive = false;
      }

      if (previousFocus) previousFocus.focus();
    }
  }

  if (footerToggleBtn._toggleHandler) {
    footerToggleBtn.removeEventListener('click', footerToggleBtn._toggleHandler);
  }

  footerToggleBtn._toggleHandler = () => toggleFooter();
  footerToggleBtn.addEventListener('click', footerToggleBtn._toggleHandler);
}

document.addEventListener('astro:page-load', initInfoSystem);
