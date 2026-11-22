/**
 * Compositor-friendly accordion controller.
 * Avoids layout thrashing by toggling native <details> state and relying on
 * GPU-composited opacity/transform transitions defined in CSS.
 */
export function initAccordion(): void {
  const detailsList = document.querySelectorAll<HTMLDetailsElement>(
    'details[data-reveal]'
  );

  detailsList.forEach((targetDetail) => {
    if (targetDetail.dataset.accordionReady === 'true') return;
    targetDetail.dataset.accordionReady = 'true';

    targetDetail.addEventListener('toggle', () => {
      if (!targetDetail.open) return;

      detailsList.forEach((otherDetail) => {
        if (otherDetail !== targetDetail && otherDetail.open) {
          otherDetail.open = false;
        }
      });
    });
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('astro:page-load', initAccordion);
}