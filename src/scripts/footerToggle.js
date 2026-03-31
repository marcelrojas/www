function initInfoSystem() {
  const body = document.body;
  const footerToggleBtn = document.getElementById('footer-toggle');

  if (footerToggleBtn) {
    const newBtn = footerToggleBtn.cloneNode(true);
    footerToggleBtn.parentNode.replaceChild(newBtn, footerToggleBtn);

    newBtn.addEventListener('click', () => {
        body.classList.toggle('footer-open');
    });
  }
}

document.addEventListener('astro:page-load', initInfoSystem);
