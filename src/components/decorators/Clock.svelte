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
  
  let time = 'Loading time...';

  onMount(() => {
    const updateClock = () => {
      const now = new Date();
      time = formatter.format(now).toUpperCase();
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);

    return () => clearInterval(timerId);
  });
</script>

<time id="clock" aria-live="polite" aria-atomic="true">{time}</time>

<style>
  @layer components {

    #clock {
      position: relative;
      font-family: var(--font-family-mono);
      font-feature-settings: "zero", "tnum";
      font-size: var(--font-size-12);
      font-weight: var(--font-weight-regular);
      letter-spacing: var(--font-tracking-normal);
      line-height: var(--font-leading-normal);
      color: var(--background-tertiary);
    }

  }
</style>
