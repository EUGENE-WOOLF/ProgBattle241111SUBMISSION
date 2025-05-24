 window.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.fade-in').forEach((el, i) => {
                setTimeout(() => el.classList.add('visible'), i * 150);
            });
        });