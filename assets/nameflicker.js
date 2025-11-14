// assets/nameAnimation.js
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.card-name-title');
    if (!title) return;

    // Split text into spans
    const text = title.textContent.replace(/\s/g, '');
    title.textContent = '';
    text.split('').forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.transition = 'opacity 0.4s ease-in-out';
        span.style.display = 'inline-block';
        span.style.opacity = 1;
        title.appendChild(span);
    });

    const spans = title.querySelectorAll('span');
    let isFlickering = false;

    // Randomly select 0, 1, or rarely 2 spans, ensuring no adjacency
    function getRandomSpans() {
        const rand = Math.random();
        let count = 0;
        if (rand < 0.5) count = 0; // 50% chance for 0
        else if (rand < 0.9) count = 1; // 40% chance for 1
        else count = 2; // 10% chance for 2

        if (count === 0) return [];

        const indices = Array.from({ length: spans.length }, (_, i) => i);
        const selectedIndices = [];

        // Pick first index
        const firstIndex = indices.splice(Math.floor(Math.random() * indices.length), 1)[0];
        selectedIndices.push(firstIndex);

        if (count === 2) {
            // Filter out adjacent indices
            const availableIndices = indices.filter(i => Math.abs(i - firstIndex) > 1);
            if (availableIndices.length > 0) {
                const secondIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
                selectedIndices.push(secondIndex);
            } else {
                // If no non-adjacent index, stick with 1
                count = 1;
            }
        }

        return selectedIndices.map(i => spans[i]);
    }

    // Fade selected spans to 0.3 and back
    function fadeLetters() {
        if (isFlickering) return;
        const selected = getRandomSpans();
        selected.forEach(span => {
            span.style.transition = 'opacity 0.4s ease-in-out';
            span.style.opacity = 0.3;
            setTimeout(() => {
                span.style.opacity = 1;
            }, 400);
        });
    }

    // Rapid flicker effect on selected spans
    function flickerLetters() {
        isFlickering = true;
        const selected = getRandomSpans();
        if (selected.length === 0) {
            isFlickering = false;
            return;
        }

        let flickerCount = 0;
        const maxFlickers = 4;
        const flickerInterval = setInterval(() => {
            selected.forEach(span => {
                span.style.transition = 'opacity 0.1s linear';
                span.style.opacity = flickerCount % 2 === 0 ? 0.3 : 1;
            });
            flickerCount++;
            if (flickerCount >= maxFlickers * 2) {
                clearInterval(flickerInterval);
                selected.forEach(span => {
                    span.style.opacity = 1;
                });
                isFlickering = false;
            }
        }, 100);
    }

    // Main animation loop
    function animate() {
        if (Math.random() < 0.9) { // 90% chance to do something
            if (Math.random() < 0.2) { // 20% chance of flicker
                flickerLetters();
            } else {
                fadeLetters();
            }
        }
        const delay = Math.random() * 700 + 300; // 0.3s–1s
        setTimeout(animate, delay + (isFlickering ? 800 : 0));
    }

    // Start after loader click
    const loader = document.getElementById('loader');
    if (loader) {
        loader.addEventListener('click', function() {
            animate();
        });
    } else {
        animate();
    }
});