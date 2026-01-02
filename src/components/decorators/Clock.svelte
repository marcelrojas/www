<script>
  import { onMount } from 'svelte';

  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'America/Caracas',
    timeZoneName: 'short',
    hourCycle: 'h12'
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  
  // 1. Variable reactiva
  let time = 'Loading time...';

  // 2. onMount, equivalent to useEffect[] on React
  onMount(() => {
    const updateClock = () => {
      const now = new Date();
      time = formatter.format(now).toUpperCase();
    };

    updateClock(); // Ejecutar al inicio
    const timerId = setInterval(updateClock, 1000);

    // 3. Limpieza: se ejecuta cuando el componente se destruye
    return () => clearInterval(timerId);
  });
</script>

<span id="clock">{time}</span>

<style is:global>
  @layer components {
    span#clock {
      position: relative;
      font-family: var(--font-family-mono);
      font-feature-settings: "zero", "tnum";
      font-size: var(--font-size-12);
      font-weight: var(--font-weight-regular);
      letter-spacing: var(--font-tracking-normal);
      line-height: var(--font-leading-normal);
      color: oklch(0.56 0 0)
    }
  }
</style>