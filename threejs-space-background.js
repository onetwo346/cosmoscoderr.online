// Three.js 3D Space Background
class SpaceBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.stars = [];
        this.nebulas = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        
        this.init();
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 50;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Add to DOM
        const container = document.createElement('div');
        container.id = 'space-background';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        `;
        container.appendChild(this.renderer.domElement);
        document.body.appendChild(container);

        // Create stars
        this.createStars();
        
        // Create nebulas
        this.createNebulas();
        
        // Create cosmic particles
        this.createCosmicParticles();
        
        // Create floating geometric shapes
        this.createGeometricShapes();

        // Event listeners
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    createStars() {
        const starGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const starMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00f7ff,
            transparent: true,
            opacity: 0.8
        });

        for (let i = 0; i < 500; i++) {
            const star = new THREE.Mesh(starGeometry, starMaterial);
            star.position.set(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200
            );
            star.scale.setScalar(Math.random() * 2 + 0.5);
            star.userData = {
                originalY: star.position.y,
                speed: Math.random() * 0.02 + 0.01,
                twinkle: Math.random() * Math.PI * 2
            };
            this.stars.push(star);
            this.scene.add(star);
        }
    }

    createNebulas() {
        // Create nebula clouds using particle systems
        const nebulaGeometry = new THREE.BufferGeometry();
        const nebulaCount = 1000;
        const positions = new Float32Array(nebulaCount * 3);
        const colors = new Float32Array(nebulaCount * 3);
        const sizes = new Float32Array(nebulaCount);

        for (let i = 0; i < nebulaCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 100;
            positions[i3 + 2] = (Math.random() - 0.5) * 100;

            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.5);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            sizes[i] = Math.random() * 3 + 1;
        }

        nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        nebulaGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const nebulaMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });

        const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
        this.nebulas.push(nebula);
        this.scene.add(nebula);
    }

    createCosmicParticles() {
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = (Math.random() - 0.5) * 200;
            positions[i3 + 2] = (Math.random() - 0.5) * 200;

            velocities[i3] = (Math.random() - 0.5) * 0.1;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

        const material = new THREE.PointsMaterial({
            color: 0xff00f7,
            size: 1,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        particles.userData = { velocities };
        this.scene.add(particles);
    }

    createGeometricShapes() {
        // Create floating geometric shapes
        const shapes = [
            { geometry: new THREE.OctahedronGeometry(2), color: 0x00f7ff },
            { geometry: new THREE.TetrahedronGeometry(2), color: 0xff00f7 },
            { geometry: new THREE.IcosahedronGeometry(2), color: 0x8A2BE2 }
        ];

        shapes.forEach((shape, index) => {
            const material = new THREE.MeshBasicMaterial({
                color: shape.color,
                transparent: true,
                opacity: 0.3,
                wireframe: true
            });

            const mesh = new THREE.Mesh(shape.geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                }
            };
            this.scene.add(mesh);
        });
    }

    onMouseMove(event) {
        this.mouseX = (event.clientX - this.windowHalfX) * 0.001;
        this.mouseY = (event.clientY - this.windowHalfY) * 0.001;
    }

    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Smooth camera movement
        this.targetX = this.mouseX * 0.001;
        this.targetY = this.mouseY * 0.001;

        this.camera.position.x += (this.targetX - this.camera.position.x) * 0.05;
        this.camera.position.y += (this.targetY - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        // Animate stars
        this.stars.forEach(star => {
            star.userData.twinkle += star.userData.speed;
            star.material.opacity = 0.5 + Math.sin(star.userData.twinkle) * 0.3;
            star.rotation.y += 0.01;
        });

        // Animate nebulas
        this.nebulas.forEach(nebula => {
            nebula.rotation.y += 0.001;
            nebula.rotation.x += 0.0005;
        });

        // Animate geometric shapes
        this.scene.children.forEach(child => {
            if (child.userData.rotationSpeed) {
                child.rotation.x += child.userData.rotationSpeed.x;
                child.rotation.y += child.userData.rotationSpeed.y;
                child.rotation.z += child.userData.rotationSpeed.z;
            }
        });

        this.renderer.render(this.scene, this.camera);
    }

    reduceComplexity() {
        // Reduce star count for better performance
        this.stars.forEach((star, index) => {
            if (index % 2 === 0) {
                star.visible = false;
            }
        });

        // Reduce nebula opacity
        this.nebulas.forEach(nebula => {
            nebula.material.opacity = 0.1;
        });

        // Reduce animation speed
        this.animationSpeed = 0.5;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        window.spaceBackground = new SpaceBackground();
    }
});

// Make it globally accessible for performance optimizer
window.SpaceBackground = SpaceBackground; 