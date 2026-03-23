function initStandbySystem() {
    const IDLE_TIMEOUT_MS = 45000;
    let idleTimer;

    const body = document.body;
    const footerToggleBtn = document.getElementById('footer-toggle');

    // Function to wake-up the system
    function wakeUp(event) {
        // If the key is F12 (DevTools), do nothing
        if (event && event.type === 'keydown' && event.key === 'F12') return;

        if (body.classList.contains('is-standby')) {
            body.classList.remove('is-standby');
        }

        resetTimer();
    }

    function resetTimer() {
        clearTimeout(idleTimer);

        if (!body.classList.contains('footer-open')) {
            idleTimer = setTimeout(() => {
                body.classList.add('is-standby');
            }, IDLE_TIMEOUT_MS);
        }
    }

    if (footerToggleBtn) {
        const newBtn = footerToggleBtn.cloneNode(true);
        footerToggleBtn.parentNode.replaceChild(newBtn, footerToggleBtn);

        newBtn.addEventListener('click', () => {
            body.classList.toggle('footer-open');
            wakeUp();
        });
    }

    // Event list indicators of human "activity"
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

    activityEvents.forEach(event => {
        document.addEventListener(event, wakeUp, { passive: true });
    });

    resetTimer();
}

document.addEventListener('astro:page-load', initStandbySystem);
