function hexToString(hex) {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16);
    if (!isNaN(code)) {
      str += String.fromCharCode(code);
    }
  }
  return str;
}

function announceToScreenReader(message) {
  let liveRegion = document.getElementById('aria-live-region');

  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'aria-live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }

  liveRegion.textContent = '';

  setTimeout(() => {
    liveRegion.textContent = message;
  }, 100);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    announceToScreenReader('Email address copied to clipboard successfully.');
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    announceToScreenReader('Failed to copy automatically. Opening email client instead.');

    window.location.href = `mailto:${text}`;
    return false;
  }
}

function initEncryptedEmail() {
  const buttons = document.querySelectorAll('.enc-email');

  buttons.forEach(btn => {
    const hex = btn.getAttribute('data-hex');
    if (!hex) return;

    const email = hexToString(hex);

    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      btn.setAttribute('aria-label', 'Email copied');

      await copyToClipboard(email);

      setTimeout(() => {
        btn.textContent = originalText;
        btn.setAttribute('aria-label', 'Copy email address');
      }, 2000);
    });

    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('aria-label', 'Copy email address');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEncryptedEmail);
} else {
  initEncryptedEmail();
}
