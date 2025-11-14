// assets/cursorTrail.js
document.addEventListener('DOMContentLoaded', function() {
    const colors = ['#aaa8a8', '#fafafa', '#e4f3f6']; // Same colors as before
    let particles = [];
    let isActive = false;

    // Initialize after loader click
    const loader = document.getElementById('loader');
    const pageContent = document.getElementById('pagecontent');

    if (loader && pageContent) {
        loader.addEventListener('click', function() {
            if (!isActive) {
                startTrail();
                isActive = true;
            }
        });
    } else {
        console.error('Loader or pagecontent element not found');
    }

    function startTrail() {
        document.addEventListener('mousemove', function(e) {
            // Spawn 3 particles per move (adjust this number as desired)
            // for (let i = 0; i < 3; i++) {
                createParticle(e.clientX, e.clientY);
            // }
        });

        document.addEventListener('touchmove', function(e) {
            if (e.touches.length > 0) {
                // for (let i = 0; i < 3; i++) {
                    createParticle(e.touches[0].clientX, e.touches[0].clientY);
                // }
            }
        });

        requestAnimationFrame(update);
    }

    function createParticle(x, y) {
        const particle = document.createElement('span');
        particle.textContent = '★'; // Unicode star (U+2605), or use '✨' for sparkle

        Object.assign(particle.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            color: colors[Math.floor(Math.random() * colors.length)],
            fontSize: '16px',
            pointerEvents: 'none',
            zIndex: '1000',
            transform: `translate(${x}px, ${y}px)`
        });

        pageContent.appendChild(particle);

        const velocity = {
            x: (Math.random() - 0.5) * 2, // Random horizontal spread
            y: 1 // Downward movement
        };
        let life = 60; // Frames of life

        particles.push({ element: particle, x, y, velocity, life });
    }

    function update() {
        particles.forEach((p, index) => {
            p.x += p.velocity.x;
            p.y += p.velocity.y;
            p.life--;

            p.element.style.transform = `translate(${p.x}px, ${p.y}px) scale(${p.life / 60})`;
            p.element.style.opacity = p.life / 60;

            if (p.life <= 0) {
                p.element.remove();
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(update);
    }
});