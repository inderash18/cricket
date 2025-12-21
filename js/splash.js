document.addEventListener('DOMContentLoaded', () => {
    const loaderLine = document.querySelector('.loader-line');
    const progressText = document.querySelector('.loader-progress-text');
    const splash = document.getElementById('splash-screen');
    if (!loaderLine || !progressText || !splash) {
        // Fallback: set flag and go to index
        try { localStorage.setItem('tn_splash_shown', '1'); } catch (e) {}
        window.location.href = 'index.html';
        return;
    }

    let width = 0;

    const loadingInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(loadingInterval);
            finishLoading();
        } else {
            width += Math.floor(Math.random() * 15) + 1;
            if (width > 100) width = 100;
            loaderLine.style.width = width + '%';
            progressText.innerText = width + '%';
        }
    }, 150);

    function finishLoading() {
        try { localStorage.setItem('tn_splash_shown', '1'); } catch (e) {}
        // Add exit animation
        setTimeout(() => {
            splash.style.transition = 'all 0.8s cubic-bezier(0.77, 0, 0.175, 1)';
            splash.style.transform = 'translateY(-100%)';
            splash.style.opacity = '0';

            setTimeout(() => {
                try { window.location.href = 'index.html'; } catch (e) {}
            }, 800);
        }, 500);
    }
});
