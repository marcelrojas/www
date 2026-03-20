function initSplashScreen() {
  const splashScreen = document.getElementById('splash-screen');
  if (!splashScreen) return;

  if (!sessionStorage.getItem('splashScreenShown')) {
    sessionStorage.setItem('splashScreenShown', 'true');

    splashScreen.style.display = 'flex';
    splashScreen.style.opacity = '1';
    splashScreen.style.visibility = 'visible';

    setTimeout(() => {
      splashScreen.style.opacity = '0';
      splashScreen.style.visibility = 'hidden';

      splashScreen.addEventListener('transitionend', () => {
        splashScreen.remove();
      }, { once: true });
    }, 2500);

  } else {
    splashScreen.remove();
  }
}

initSplashScreen();
