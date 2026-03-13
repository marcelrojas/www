<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let size: number = 500;
  export let gridSpacing: number = 9;
  export let color: string = '#000000';

  let canvas: HTMLCanvasElement;
  let animationId: number;

  // Bandera para determinar el método de entrada
  let isGyroActive: boolean = false;

  let targetX = size * 0.5;
  let targetY = size * 0.5;
  let currentX = size * 0.5;
  let currentY = size * 0.5;

  const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

  // Lógica de dibujo (sin cambios en la matemática de iluminación)
  const draw = () => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    // El factor de interpolación es menor para el giroscopio para suavizar el temblor de las manos
    const easeFactor = isGyroActive ? 0.04 : 0.08;
    currentX = lerp(currentX, targetX, easeFactor);
    currentY = lerp(currentY, targetY, easeFactor);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;

    const radius = size / 2;
    const cx = size / 2;
    const cy = size / 2;

    const lx = (currentX - cx) / radius;
    const ly = (currentY - cy) / radius;
    const lz = 1.2;
    const lightLen = Math.sqrt(lx * lx + ly * ly + lz * lz);
    const nlx = lx / lightLen;
    const nly = ly / lightLen;
    const nlz = lz / lightLen;

    for (let x = 0; x < size; x += gridSpacing) {
      for (let y = 0; y < size; y += gridSpacing) {
        const dx = x - cx;
        const dy = y - cy;
        const distSquared = dx * dx + dy * dy;

        if (distSquared <= radius * radius) {
          const nx = dx / radius;
          const ny = dy / radius;
          const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));

          let intensity = nx * nlx + ny * nly + nz * nlz;
          intensity = Math.max(0, Math.min(1, intensity));

          const maxDotRadius = gridSpacing * 0.75;
          const dotRadius = maxDotRadius * (1 - Math.pow(intensity, 1.5));

          if (dotRadius > 0.3) {
            ctx.beginPath();
            ctx.arc(x * dpr, y * dpr, dotRadius * dpr, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    animationId = requestAnimationFrame(draw);
  };

  // Manejador para Ratón / Táctil
  const handlePointerMove = (e: PointerEvent) => {
    if (isGyroActive) return; // Ignorar si el giroscopio está en uso

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width / (window.devicePixelRatio || 1);
    const scaleY = canvas.height / rect.height / (window.devicePixelRatio || 1);

    targetX = (e.clientX - rect.left) * scaleX;
    targetY = (e.clientY - rect.top) * scaleY;
  };

  // Manejador para el Giroscopio
  const handleOrientation = (e: DeviceOrientationEvent) => {
    // Si beta o gamma son nulos, el dispositivo no tiene el sensor
    if (e.beta === null || e.gamma === null) return;

    // Activamos la bandera en la primera lectura exitosa
    if (!isGyroActive) isGyroActive = true;

    // e.gamma representa la inclinación izquierda/derecha (-90 a 90)
    // e.beta representa la inclinación adelante/atrás (-180 a 180)

    // Limitamos los ángulos para que el usuario no tenga que girar el teléfono por completo
    const tiltX = Math.max(-45, Math.min(45, e.gamma));
    const tiltY = Math.max(-45, Math.min(45, e.beta));

    // Mapeamos el ángulo (-45 a 45 grados) a las coordenadas del canvas (0 a size)
    targetX = ((tiltX + 45) / 90) * size;
    targetY = ((tiltY + 45) / 90) * size;
  };

  const initCanvas = () => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    draw();
  };

  onMount(() => {
    initCanvas();
    window.addEventListener('deviceorientation', handleOrientation);
  });

  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
    if (typeof window !== 'undefined') {
      window.removeEventListener('deviceorientation', handleOrientation);
    }
  });
</script>

<canvas
  bind:this={canvas}
  on:pointermove={handlePointerMove}
  on:pointerdown={handlePointerMove}
  class="halftone-canvas"
  aria-label="Esfera 3D interactiva estilo mediotono"
/>

<style>
  .halftone-canvas {
    display: block;
    max-width: 100%;
    height: auto;
    cursor: crosshair;
    touch-action: none;
  }
</style>
