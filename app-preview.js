// Interactive App Preview System
// Using THREE.js from CDN for 3D effects
const THREE = window.THREE;

class AppPreview {
    constructor() {
        this.scenes = new Map();
        console.log('Initializing AppPreview system');
        // Make productDetails from preview-popup.js available to this class
        this.productDetails = window.productDetails || {};
        this.init3DEffects();
        this.initDetailPopup();
    }

    init3DEffects() {
        // Debug log to track initialization
        console.log('Initializing 3D effects for projects');
        
        document.querySelectorAll('.project').forEach((project, index) => {
            const container = project.querySelector('.icon-3d-container');
            if (!container) {
                console.warn(`Project ${index} missing icon-3d-container:`, project.querySelector('h3')?.textContent);
                return;
            }

            // Get project title for debugging
            const projectTitle = project.querySelector('h3')?.textContent.trim() || `Project ${index}`;
            console.log(`Setting up 3D for: ${projectTitle}`);

            try {
                // Create scene
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

                renderer.setSize(container.clientWidth, container.clientHeight);
                container.appendChild(renderer.domElement);

                // Create icon mesh
                const geometry = new THREE.BoxGeometry(2, 2, 0.1);
                const textureLoader = new THREE.TextureLoader();
                let material;
                
                // Handle missing images gracefully
                try {
                    // Fix image path to ensure it loads correctly
                    let imagePath = project.dataset.iconUrl;
                    
                    if (!imagePath) {
                        console.warn(`No icon URL for ${projectTitle}, using fallback`);
                        // Use title to create a fallback image name
                        const fallbackName = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '') + '.jpg';
                        imagePath = `./${fallbackName}`;
                        // Set the data attribute for future reference
                        project.dataset.iconUrl = fallbackName;
                    }
                    
                    // If the path doesn't start with http or /, add ./ to make it relative to root
                    if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
                        imagePath = './' + imagePath;
                    }
                    
                    console.log(`Loading texture for ${projectTitle}: ${imagePath}`);
                    
                    const texture = textureLoader.load(imagePath, 
                        // Success callback
                        () => console.log(`Texture loaded for ${projectTitle}`),
                        // Progress callback
                        undefined, 
                        // Error callback
                        (err) => {
                            console.warn(`Error loading texture for ${projectTitle}:`, err);
                            // On error, use a gradient material instead
                            if (material && material.dispose) material.dispose();
                            if (icon) {
                                icon.material = new THREE.MeshBasicMaterial({
                                    color: 0x00f7ff,
                                    transparent: true,
                                    opacity: 0.9
                                });
                            }
                        }
                    );
                    material = new THREE.MeshBasicMaterial({ map: texture });
                } catch (e) {
                    console.error(`Error setting up texture for ${projectTitle}:`, e);
                    // Fallback material
                    material = new THREE.MeshBasicMaterial({
                        color: 0x00f7ff,
                        transparent: true,
                        opacity: 0.9
                    });
                }
                
                const icon = new THREE.Mesh(geometry, material);

                scene.add(icon);
                camera.position.z = 3;

                // Add glow effect
                const glowMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        glowColor: { value: new THREE.Color(0x00f7ff) },
                        viewVector: { value: camera.position }
                    },
                    vertexShader: `
                        varying vec3 vNormal;
                        void main() {
                            vNormal = normalize(normalMatrix * normal);
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        uniform vec3 glowColor;
                        uniform vec3 viewVector;
                        varying vec3 vNormal;
                        void main() {
                            float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
                            gl_FragColor = vec4(glowColor, 1.0) * intensity;
                        }
                    `,
                    side: THREE.BackSide,
                    blending: THREE.AdditiveBlending,
                    transparent: true
                });

                const glowMesh = new THREE.Mesh(
                    new THREE.BoxGeometry(2.2, 2.2, 0.3),
                    glowMaterial
                );
                scene.add(glowMesh);

                // Store scene data
                this.scenes.set(container, {
                    scene,
                    camera,
                    renderer,
                    icon,
                    glowMesh
                });
            } catch (err) {
                console.error(`Failed to initialize 3D for ${projectTitle}:`, err);
            }

            // Animation
            const animate = () => {
                requestAnimationFrame(animate);
                icon.rotation.y += 0.01;
                glowMesh.rotation.y += 0.005;
                renderer.render(scene, camera);
            };
            animate();
            
            // Log successful setup
            console.log(`3D setup complete for: ${projectTitle}`);

            // Hover effects
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
                const y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

                icon.rotation.x = y * 0.5;
                icon.rotation.y = x * 0.5;
                glowMesh.rotation.x = y * 0.5;
                glowMesh.rotation.y = x * 0.5;
            });

            container.addEventListener('mouseleave', () => {
                gsap.to(icon.rotation, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                gsap.to(glowMesh.rotation, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Video player functionality removed

    // Modern Detail Popup functionality
    initDetailPopup() {
        console.log('Initializing detail popup system');
        
        // Create popup container if it doesn't exist
        let popupContainer = document.querySelector('.detail-popup-container');
        if (!popupContainer) {
            popupContainer = document.createElement('div');
            popupContainer.className = 'detail-popup-container';
            document.body.appendChild(popupContainer);
        }

        // Add click event to all project cards
        document.querySelectorAll('.project').forEach(project => {
            try {
                // Get the title and description
                const titleElement = project.querySelector('h3');
                const descElement = project.querySelector('p');
                
                if (!titleElement) {
                    console.warn('Project missing title element:', project);
                    return;
                }
                
                const title = titleElement.textContent.trim();
                const description = descElement ? descElement.textContent.trim() : 'Explore this cosmic application';
                const iconUrl = project.dataset.iconUrl || './cosmoslogo.jpg';
                const actionButton = project.querySelector('.btn');
                const actionUrl = actionButton ? actionButton.getAttribute('href') : '#';
                const actionText = actionButton ? actionButton.textContent.trim() : 'Explore';
                
                console.log(`Setting up popup for: ${title}`);
                
                // Check if we have details in the productDetails database (from preview-popup.js)
                let details;
                if (window.productDetails && window.productDetails[title]) {
                    console.log(`Using predefined details for ${title}`);
                    details = window.productDetails[title];
                    // Ensure the URL and button label are current
                    details.url = actionUrl || details.url;
                    details.buttonLabel = actionText || details.buttonLabel;
                } else {
                    console.log(`Creating default details for ${title}`);
                    // Create default details object
                    details = {
                        title,
                        description: `${description} - Experience the cosmic power of this application.`,
                        image: iconUrl,
                        url: actionUrl,
                        buttonLabel: actionText,
                        features: [
                            'Interactive user interface',
                            'Cosmic design elements',
                            'Responsive layout'
                        ],
                        technologies: ['HTML', 'CSS', 'JavaScript']
                    };
                }
                
                // Add click event to the project card
                project.addEventListener('click', (e) => {
                    // Don't trigger if clicking on the action button
                    if (e.target.tagName === 'A' || e.target.closest('a')) {
                        return;
                    }
                    
                    console.log(`Showing popup for: ${title}`);
                    // Show popup
                    this.showDetailPopup(details, popupContainer);
                });
                
                // Add hover effect
                project.addEventListener('mouseenter', () => {
                    const sceneData = this.getSceneForProject(project);
                    if (sceneData) {
                        sceneData.icon.rotation.y = 0;
                        sceneData.hoverActive = true;
                    }
                });
                
                project.addEventListener('mouseleave', () => {
                    const sceneData = this.getSceneForProject(project);
                    if (sceneData) {
                        sceneData.hoverActive = false;
                    }
                });
                
                // For projects with preview videos
                const previewVideo = project.querySelector('.preview-video');
                if (previewVideo) {
                    const videoUrl = previewVideo.dataset.videoUrl;
                    if (videoUrl) {
                        // Add video button
                        const videoButton = document.createElement('button');
                        videoButton.className = 'preview-video-btn';
                        videoButton.innerHTML = '<i class="fas fa-play"></i>';
                        project.appendChild(videoButton);
                        
                        videoButton.addEventListener('click', (e) => {
                            e.stopPropagation();
                            
                            // Create video popup
                            const videoPopup = document.createElement('div');
                            videoPopup.className = 'video-popup';
                            videoPopup.innerHTML = `
                                <div class="video-popup-content">
                                    <button class="video-popup-close">&times;</button>
                                    <video controls autoplay>
                                        <source src="${videoUrl}" type="video/mp4">
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            `;
                            
                            document.body.appendChild(videoPopup);
                            
                            // Close button
                            videoPopup.querySelector('.video-popup-close').addEventListener('click', () => {
                                videoPopup.remove();
                            });
                            
                            // Close on outside click
                            videoPopup.addEventListener('click', (e) => {
                                if (e.target === videoPopup) {
                                    videoPopup.remove();
                                }
                            });
                        });
                    }
                }
            } catch (err) {
                console.error('Error setting up project popup:', err);
            }
        });

        // Close popup when clicking outside content
        popupContainer.addEventListener('click', (e) => {
            if (e.target === popupContainer) {
                this.closeDetailPopup(popupContainer);
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popupContainer.classList.contains('active')) {
                this.closeDetailPopup(popupContainer);
            }
        });
    }

    showDetailPopup(details, container) {
        console.log('Showing popup for:', details.title); // Debug
        
        // Create popup content
        container.innerHTML = `
            <div class="detail-popup-content">
                <div class="detail-popup-header">
                    <h2 class="detail-popup-title">${details.title}</h2>
                    <button class="detail-popup-close">&times;</button>
                </div>
                <div class="detail-popup-body">
                    <div class="detail-popup-image" style="background-image: url('${details.image}')"></div>
                    <div class="detail-popup-info">
                        <div class="detail-popup-description">${details.description}</div>
                        <div class="detail-popup-features">
                            <h4>Key Features</h4>
                            <ul class="feature-list">
                                ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="detail-popup-tech">
                            <h4>Technologies</h4>
                            <div class="tech-tags">
                                ${details.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-popup-footer">
                    <button class="detail-btn detail-btn-secondary close-detail">Close</button>
                    <a href="${details.url}" target="_blank" class="detail-btn detail-btn-primary">Launch App</a>
                </div>
            </div>
        `;

        // Force a reflow before adding the active class
        container.offsetHeight;
        
        // Add active class immediately
        container.classList.add('active');

        // Add close button event listener
        container.querySelector('.detail-popup-close').addEventListener('click', () => {
            this.closeDetailPopup(container);
        });

        // Add close button in footer event listener
        container.querySelector('.close-detail').addEventListener('click', () => {
            this.closeDetailPopup(container);
        });

        // Add cosmic cursor effect inside popup
        const popupContent = container.querySelector('.detail-popup-content');
        popupContent.addEventListener('mousemove', (e) => {
            const rect = popupContent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create subtle gradient follow effect
            popupContent.style.background = `
                linear-gradient(135deg, 
                    rgba(30, 30, 61, 0.9), 
                    rgba(10, 10, 18, 0.95)),
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(0, 247, 255, 0.15),
                    transparent 25%
                )
            `;
        });
    }

    closeDetailPopup(container) {
        container.classList.remove('active');
    }
    
    // Helper method to get scene data for a project
    getSceneForProject(project) {
        const container = project.querySelector('.icon-3d-container');
        if (!container) return null;
        return this.scenes.get(container);
    }
}

// Initialize after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing AppPreview');
    window.appPreview = new AppPreview();
});

// If DOM is already loaded, initialize now
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('DOM already loaded, initializing AppPreview immediately');
    window.appPreview = new AppPreview();
}
