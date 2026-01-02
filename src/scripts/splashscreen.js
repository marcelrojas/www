function setupSplashScreen() {
  const splashScreen = document.getElementById('splash-screen');
  if (!splashScreen) return;

  const hideSplashScreen = () => {
    //splashScreen.classList.add('hidden');
    splashScreen.style.opacity = '0';
    splashScreen.style.visibility = 'hidden';
    // Usamos 'transitionend' para ocultarlo del DOM flow después de que la animación termine.
    // 'once: true' asegura que el listener se ejecute una sola vez.
    splashScreen.addEventListener('transitionend', () => {
      splashScreen.style.display = 'none';
    }, { once: true });
  };

  const showSplashScreen = () => {
    splashScreen.style.display = 'flex';
    splashScreen.style.opacity = '1';
    splashScreen.style.visibility = 'visible';
    // Forzar un reflow para asegurar que la transición se aplique
    splashScreen.getBoundingClientRect();
    //splashScreen.classList.remove('hidden');
  };

  // Lógica para la carga inicial de la página
  if (!sessionStorage.getItem('splashScreenShown')) {
    // Es la primera vez en la sesión, marcamos y mostramos el splash.
    sessionStorage.setItem('splashScreenShown', 'true');
    showSplashScreen(); // Asegurarse de que es visible

    // Esperamos un tiempo antes de empezar a ocultarlo.
    setTimeout(hideSplashScreen, 7000);
  } else {
    // Ya se mostró en esta sesión, lo ocultamos inmediatamente.
    splashScreen.style.display = 'none';
    splashScreen.style.opacity = '0';
    splashScreen.style.visibility = 'hidden';
    //splashScreen.classList.add('hidden');
  }

  // Lógica para las transiciones de página de Astro
  //document.addEventListener('astro:before-preparation', showSplashScreen);
  //document.addEventListener('astro:after-swap', hideSplashScreen);
}

// Ejecutar en la carga inicial
setupSplashScreen();

// Volver a ejecutar en cargas de cliente (navegación SPA) para limpiar listeners si es necesario.
// En este caso, la lógica se re-evalúa correctamente en cada carga.
document.addEventListener('astro:page-load', setupSplashScreen);