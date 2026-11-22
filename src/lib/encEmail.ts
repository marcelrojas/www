function announceToScreenReader(message: string): void {
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

  window.setTimeout(() => {
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }, 100);
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    announceToScreenReader('Email address copied to clipboard successfully.');
    return true;
  } catch {
    announceToScreenReader(
      'Failed to copy automatically. Opening email client instead.'
    );
    window.location.href = `mailto:${text}`;
    return false;
  }
}

export function decodeBase64Email(encoded: string): string | null {
  try {
    const decoded = atob(encoded.trim());
    return decoded.includes('@') ? decoded : null;
  } catch {
    return null;
  }
}

export function initEncryptedEmail(): void {
  const buttons = document.querySelectorAll<HTMLElement>('.enc-email');

  buttons.forEach((btn) => {
    if (btn.dataset.encInitialized === 'true') return;

    const encoded = btn.getAttribute('data-enc');
    if (!encoded) return;

    const email = decodeBase64Email(encoded);
    if (!email) return;

    btn.dataset.encInitialized = 'true';

    btn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();

      const originalText = btn.textContent ?? '';
      const copied = await copyToClipboard(email);

      if (copied) {
        btn.textContent = 'Copied!';
        btn.setAttribute('aria-label', 'Email copied');

        window.setTimeout(() => {
          btn.textContent = originalText;
          btn.setAttribute('aria-label', 'Copy email address');
        }, 2000);
      }
    });

    if (btn.tagName !== 'BUTTON') {
      btn.setAttribute('role', 'button');
      btn.setAttribute('tabindex', '0');
    }
    if (!btn.getAttribute('aria-label')) {
      btn.setAttribute('aria-label', 'Copy email address');
    }
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('astro:page-load', initEncryptedEmail);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEncryptedEmail);
  } else {
    initEncryptedEmail();
  }
}