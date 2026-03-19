function initSplashScreen() {
  const splashScreen = document.getElementById('splash-screen');
  if (!splashScreen) return;

  // Si es la primera vez en la sesión
  if (!sessionStorage.getItem('splashScreenShown')) {
    sessionStorage.setItem('splashScreenShown', 'true');

    // Mostramos el splash screen
    splashScreen.style.display = 'flex';
    splashScreen.style.opacity = '1';
    splashScreen.style.visibility = 'visible';

    // Lo ocultamos y destruimos después de la animación inicial (ej. 2.5 segundos)
    setTimeout(() => {
      splashScreen.style.opacity = '0';
      splashScreen.style.visibility = 'hidden';

      splashScreen.addEventListener('transitionend', () => {
        splashScreen.remove(); // Lo eliminamos del DOM para que no consuma recursos
      }, { once: true });
    }, 2500);

  } else {
    // Si ya navegó antes en esta sesión, destruimos el splash screen inmediatamente
    splashScreen.remove();
  }
}

// Ejecutar inmediatamente
initSplashScreen();
