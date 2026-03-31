<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let timeZone: string = 'America/Caracas';
  export let locale: string = 'en-US';

  let timeString: string = '';
  let clockElement: HTMLElement;
  let isVisible: boolean = false;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
    hourCycle: 'h12'
  };

  function updateTime() {
    const now = new Date();

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',

      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: timeZone,
      timeZoneName: 'short',

      hourCycle: 'h12'
    };

    timeString = now.toLocaleTimeString(locale, options);
  }

  function startInterval() {
    if (intervalId) return;

    updateTime();
    intervalId = setInterval(() => {
      updateTime();
    }, 1000);
  }

  function stopInterval() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;

        if (isVisible) {
          startInterval();
        } else {
          stopInterval();
        }
      },
      {
        threshold: 0.1
      }
    );

    if (clockElement) {
      observer.observe(clockElement);
    }

    onDestroy(() => {
      observer.disconnect();
      stopInterval();
    });
  });
</script>

<time id="clock" aria-live="polite" aria-atomic="true" bind:this={clockElement}>{timeString}</time>

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
