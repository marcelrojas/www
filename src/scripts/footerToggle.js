function initInfoSystem() {
  const body = document.body;
  const footerToggleBtn = document.getElementById('footer-toggle');
  const footer = document.getElementById('footer');

  if (!footerToggleBtn || !footer) return;

  // Clean up old listeners on ViewTransition navigations
  const newBtn = footerToggleBtn.cloneNode(true);
  footerToggleBtn.parentNode.replaceChild(newBtn, footerToggleBtn);

  const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  let previousFocus = null;

  function getFocusableElements() {
    // Include the toggle button so the user can Tab back to it to close the footer
    const footerElements = Array.from(footer.querySelectorAll(focusableSelectors));
    return [newBtn, ...footerElements].filter(
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
      newBtn.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden'; // Prevent background scrolling

      const focusable = getFocusableElements();
      // Focus the first interactive element inside the footer (index 1, as index 0 is the toggle btn)
      if (focusable.length > 1) {
        focusable[1].focus();
      } else {
        footer.focus();
      }

      document.addEventListener('keydown', handleKeydown);
    } else {
      body.classList.remove('footer-open');
      newBtn.setAttribute('aria-expanded', 'false');
      body.style.overflow = ''; // Restore background scrolling
      document.removeEventListener('keydown', handleKeydown);

      // Return focus to whatever the user was interacting with before opening
      if (previousFocus) previousFocus.focus();
    }
  }

  newBtn.addEventListener('click', () => toggleFooter());
}

document.addEventListener('astro:page-load', initInfoSystem);
