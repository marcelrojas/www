/* 4. EL SCRIPT EMISOR
  Este script se ejecuta en el cliente y actualiza las 
  variables CSS en tiempo real.
*/

// Usamos 'astro:page-load' para asegurar que el script se ejecute
// en cada navegación del lado del cliente en Astro.
document.addEventListener('astro:page-load', () => {
  // Seleccionamos el área emisora
  const emitter = document.querySelector('.glow-emitter');

  if (emitter) {
    // Creamos la función que maneja el movimiento
    const onPointerMove = (e) => {
      // Obtenemos todos los receptores dentro del emisor
      const receivers = emitter.querySelectorAll('.glow-receiver');

      receivers.forEach(receiver => {
        const rect = receiver.getBoundingClientRect();

        // Calculamos la posición del mouse RELATIVA al receptor
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Actualizamos las variables CSS en ESE receptor específico
        // Esto es muy eficiente para el navegador.
        receiver.style.setProperty('--mouse-x', `${x}px`);
        receiver.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    // Agregamos el listener al emisor
    emitter.addEventListener('pointermove', onPointerMove);
  }
});