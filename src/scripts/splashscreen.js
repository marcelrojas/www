function initLogoAnimation() {
  const logo = document.getElementById('logo');
  if (!logo) return;

  if (!sessionStorage.getItem('logoAnimated')) {
    sessionStorage.setItem('logoAnimated', 'true');
    logo.classList.add('animate-logo');
  } else {
    logo.style.opacity = '1';
    logo.style.visibility = 'visible';
    logo.classList.remove('animate-logo');
  }
}

initLogoAnimation();

document.addEventListener('astro:page-load', initLogoAnimation);
