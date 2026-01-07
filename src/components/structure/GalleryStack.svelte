<script lang="ts">
  import { fade } from 'svelte/transition';

  // 1. Receive the data structure from your Astro collection
  export let items: Array<{
    id: string;
    data: {
      title: string;
      description: string;
      heroImage?: any; // Depends on your image schema, often an object or string
    };
  }> = [];

  let currentIndex = 0;

  // 2. Configuration for the "Cosmos" feel
  const OFFSET_Y = 15; // How many pixels the back cards move up
  const SCALE_STEP = 0.05; // How much smaller back cards get
  const VISIBLE_COUNT = 3; // How many cards to render in the background

  // 3. The Logic: Move "Rear to Front"
  const next = () => {
    if (currentIndex < items.length - 1) {
      currentIndex += 1;
    } else {
      // Optional: Reset to start if you want a loop
      currentIndex = 0;
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
    }
  };
</script>

<div class="stage">
  
</div>

<div class="controls">
  <button on:click={prev} disabled={currentIndex === 0}>↑ Previous</button>
  <div class="counter">{currentIndex + 1} / {items.length}</div>
  <button on:click={next} disabled={currentIndex === items.length - 1}>Next ↓</button>
</div>

<style>
  div.stage {
    position: relative;
    width: 100%; /* Adjust to your layout max-width */
    height: 400px;
    display: flex;
    flex-direction: column;
    place-items: center;
    touch-action: none;
    & > div.item {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 24px;

      /* The Animation Logic */
      transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;

      /* Apply Calculated Styles */
      z-index: var(--z-index);
      transform: translateY(var(--y-pos)) scale(var(--scale));
      opacity: var(--opacity);
      transform-origin: bottom center;

      cursor: pointer;
      overflow: hidden;
      
    }
  }

  /* Specific state styling */
  .item.past {
    pointer-events: none;
    /* This ensures it drops "down" out of view */
  }

  .item:not(.active):not(.past) {
    /* Dim the cards in the back */
    filter: brightness(0.6);
  }

  .item.active .overlay {
    opacity: 1; /* Always show text on active card? optional */
  }

  .controls {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    color: var(--on-surface-primary, white);
    & button {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      border: 1px solid currentColor;
      background: transparent;
      color: inherit;
      cursor: pointer;
      &:disabled {
        opacity: 0.3;
        cursor: not-allowed
      }
    }
  }
</style>