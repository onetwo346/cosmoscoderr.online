// Cosmic Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the faster

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            
            const time = value / speed;
            
            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 50);
            } else {
                counter.innerText = value;
            }
        };
        
        animate();
    });

    // Enhance planets with parallax effect
    document.addEventListener('mousemove', (e) => {
        const planets = document.querySelectorAll('.planet');
        const asteroids = document.querySelectorAll('.floating-asteroid');
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        planets.forEach((planet, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            planet.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        asteroids.forEach((asteroid, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            asteroid.style.transform = `translate(${x}px, ${y}px) rotate(${x * 2}deg)`;
        });
    });

});