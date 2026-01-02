function setupInfo() {
  const infoTrigger = document.getElementById('infotrigger');
  const body = document.body;

  if (!infoTrigger || !body) {
    return;
  }

  infoTrigger.addEventListener('click', () => {
    const isInfoOpen = body.classList.toggle('is-info-open');
    infoTrigger.setAttribute('aria-expanded', String(isInfoOpen));
  });
}
document.addEventListener('astro:page-load', setupInfo);