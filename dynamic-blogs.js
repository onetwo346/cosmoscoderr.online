// Dynamic Blog System - 200+ Rotating Blogs with Auto-Refresh
(function() {
    'use strict';

    class DynamicBlogSystem {
        constructor() {
            this.allBlogs = this.generateBlogDatabase();
            this.displayedBlogs = [];
            this.currentIndex = 0;
            this.refreshInterval = null;
            this.blogsPerPage = 6;
        }

        generateBlogDatabase() {
            const categories = {
                tech: [
                    { title: "AI Revolution in 2026", summary: "Artificial intelligence reaches new heights with breakthrough innovations in neural networks and quantum computing." },
                    { title: "Web 4.0 is Here", summary: "The next generation of the internet brings immersive 3D experiences and decentralized applications." },
                    { title: "Quantum Computing Breakthrough", summary: "Scientists achieve quantum supremacy with 1000-qubit processor, opening new possibilities." },
                    { title: "5G Evolution to 6G", summary: "Next-gen wireless technology promises speeds 100x faster than current 5G networks." },
                    { title: "Blockchain Beyond Crypto", summary: "Blockchain technology revolutionizes supply chains, healthcare, and digital identity." },
                    { title: "Neural Interface Technology", summary: "Brain-computer interfaces become mainstream, enabling direct thought-to-device control." },
                    { title: "Edge Computing Dominance", summary: "Processing power moves to the edge, reducing latency and improving real-time applications." },
                    { title: "Holographic Displays", summary: "True 3D holographic displays without glasses become commercially available." },
                    { title: "DNA Data Storage", summary: "Scientists store entire internet archive in DNA molecules, revolutionizing data storage." },
                    { title: "Fusion Energy Progress", summary: "Commercial fusion reactors move closer to reality with new breakthrough achievements." }
                ],
                space: [
                    { title: "Mars Colony Update", summary: "First permanent Mars settlement reaches 100 inhabitants with successful agriculture systems." },
                    { title: "New Exoplanet Discovery", summary: "Astronomers find Earth-like planet in habitable zone just 20 light-years away." },
                    { title: "Space Tourism Boom", summary: "Commercial space flights become affordable with new reusable rocket technology." },
                    { title: "Lunar Mining Operations", summary: "First lunar mining facility extracts valuable resources from the Moon's surface." },
                    { title: "Asteroid Defense System", summary: "Global asteroid detection and deflection system goes fully operational." },
                    { title: "Space Elevator Concept", summary: "Engineers unveil plans for Earth's first space elevator using carbon nanotubes." },
                    { title: "Jupiter Mission Success", summary: "Probe discovers signs of life in Europa's subsurface ocean." },
                    { title: "Solar Sail Technology", summary: "Light-powered spacecraft achieve record speeds using advanced solar sails." },
                    { title: "Space Station Expansion", summary: "International Space Station gets major upgrade with new modules and capabilities." },
                    { title: "Interstellar Probe Launch", summary: "Humanity's first interstellar probe begins journey to Alpha Centauri." }
                ],
                innovation: [
                    { title: "Sustainable Energy Grid", summary: "Global renewable energy network achieves 80% clean power generation milestone." },
                    { title: "Ocean Cleanup Success", summary: "Revolutionary technology removes 50% of Pacific garbage patch in record time." },
                    { title: "Vertical Farming Revolution", summary: "Urban vertical farms produce 10x more food using 95% less water and land." },
                    { title: "Carbon Capture Breakthrough", summary: "New technology captures CO2 from atmosphere at unprecedented efficiency." },
                    { title: "Smart City Evolution", summary: "AI-powered cities optimize traffic, energy, and resources in real-time." },
                    { title: "Biodegradable Electronics", summary: "Fully compostable electronic devices eliminate e-waste concerns." },
                    { title: "Water Purification Tech", summary: "Portable device converts any water source to drinking water instantly." },
                    { title: "Wireless Power Grid", summary: "Cities implement wireless power transmission, eliminating need for cables." },
                    { title: "Self-Healing Materials", summary: "New materials automatically repair damage, extending product lifespans." },
                    { title: "Atmospheric Processors", summary: "Giant machines begin terraforming efforts to combat climate change." }
                ],
                health: [
                    { title: "Cancer Cure Breakthrough", summary: "New immunotherapy treatment shows 95% success rate across all cancer types." },
                    { title: "Age Reversal Discovery", summary: "Scientists successfully reverse aging in human cells using gene therapy." },
                    { title: "Universal Vaccine", summary: "Single vaccine provides immunity against all flu strains and coronaviruses." },
                    { title: "Organ Printing Success", summary: "3D bioprinting creates fully functional human organs for transplants." },
                    { title: "Nanomedicine Revolution", summary: "Microscopic robots patrol bloodstream, detecting and treating diseases." },
                    { title: "Mental Health Breakthrough", summary: "New treatment eliminates depression and anxiety with 90% success rate." },
                    { title: "Regenerative Medicine", summary: "Stem cell therapy enables regrowth of limbs and organs." },
                    { title: "Smart Contact Lenses", summary: "AR contact lenses monitor health metrics and display information." },
                    { title: "Gene Editing Approval", summary: "CRISPR therapy approved for treating genetic disorders." },
                    { title: "Longevity Research", summary: "Scientists extend healthy human lifespan to 150 years in trials." }
                ],
                environment: [
                    { title: "Coral Reef Restoration", summary: "Massive coral restoration project brings dead reefs back to life." },
                    { title: "Rainforest Recovery", summary: "Amazon rainforest shows signs of recovery with reforestation efforts." },
                    { title: "Wildlife Population Boom", summary: "Endangered species populations double thanks to conservation efforts." },
                    { title: "Plastic-Eating Bacteria", summary: "Engineered bacteria consume plastic waste, cleaning oceans and landfills." },
                    { title: "Green Architecture", summary: "Buildings that produce more energy than they consume become standard." },
                    { title: "Bee Population Recovery", summary: "Global bee populations rebound after decades of decline." },
                    { title: "Zero-Emission Transport", summary: "Electric and hydrogen vehicles dominate global transportation." },
                    { title: "Sustainable Fashion", summary: "Lab-grown materials replace animal products in fashion industry." },
                    { title: "Urban Rewilding", summary: "Cities transform into green spaces with wildlife corridors." },
                    { title: "Ocean Acidification Fix", summary: "New technology reverses ocean acidification, saving marine life." }
                ],
                culture: [
                    { title: "Virtual Reality Art", summary: "Immersive VR art galleries revolutionize how we experience creativity." },
                    { title: "AI-Generated Music", summary: "AI composers create symphonies indistinguishable from human works." },
                    { title: "Holographic Concerts", summary: "Deceased artists perform again through advanced holographic technology." },
                    { title: "Digital Museums", summary: "World's museums unite in massive digital archive accessible to all." },
                    { title: "Language Translation", summary: "Real-time universal translator breaks down language barriers globally." },
                    { title: "Interactive Storytelling", summary: "Choose-your-own-adventure stories become immersive VR experiences." },
                    { title: "Augmented Reality Gaming", summary: "AR games blend seamlessly with real world, creating new entertainment." },
                    { title: "Digital Preservation", summary: "Ancient artifacts digitally preserved in perfect detail for future generations." },
                    { title: "Collaborative Art", summary: "Global art projects unite millions of creators in shared virtual spaces." },
                    { title: "Cultural Exchange", summary: "VR enables people to experience different cultures from their homes." }
                ],
                education: [
                    { title: "AI Tutors for All", summary: "Personalized AI tutors provide free education to every student globally." },
                    { title: "Virtual Classrooms", summary: "Immersive VR classrooms make learning engaging and accessible worldwide." },
                    { title: "Skill Implants", summary: "Neural interfaces enable instant learning of new skills and languages." },
                    { title: "Gamified Learning", summary: "Education transformed into engaging games, improving retention by 300%." },
                    { title: "Global Knowledge Base", summary: "Free access to all human knowledge through unified digital library." },
                    { title: "Adaptive Curriculum", summary: "AI creates personalized learning paths for each student's needs." },
                    { title: "Remote Lab Access", summary: "Students conduct real experiments remotely using robotic lab equipment." },
                    { title: "Collaborative Learning", summary: "Students worldwide collaborate on projects in shared virtual spaces." },
                    { title: "Micro-Credentials", summary: "Blockchain-verified skills replace traditional degrees in job market." },
                    { title: "Lifelong Learning", summary: "Continuous education becomes norm with accessible online platforms." }
                ],
                society: [
                    { title: "Universal Basic Income", summary: "Countries implement UBI, ensuring financial security for all citizens." },
                    { title: "4-Day Work Week", summary: "Global shift to 4-day work week improves productivity and wellbeing." },
                    { title: "Digital Democracy", summary: "Blockchain voting enables secure, transparent democratic participation." },
                    { title: "Community Gardens", summary: "Urban communities unite through shared gardens and food production." },
                    { title: "Remote Work Revolution", summary: "80% of jobs become remote, transforming cities and lifestyles." },
                    { title: "Circular Economy", summary: "Zero-waste economy eliminates concept of garbage through recycling." },
                    { title: "Social Connection", summary: "New platforms foster genuine human connection in digital age." },
                    { title: "Mental Wellness", summary: "Society prioritizes mental health with accessible support systems." },
                    { title: "Inclusive Design", summary: "Universal design makes all spaces accessible to everyone." },
                    { title: "Community Resilience", summary: "Neighborhoods become self-sufficient with local resources and support." }
                ],
                transport: [
                    { title: "Flying Cars Reality", summary: "Personal aerial vehicles become common in major cities worldwide." },
                    { title: "Hyperloop Networks", summary: "High-speed tube transport connects cities at 700mph speeds." },
                    { title: "Autonomous Vehicles", summary: "Self-driving cars eliminate traffic accidents and congestion." },
                    { title: "Electric Aviation", summary: "Electric planes make air travel sustainable and affordable." },
                    { title: "Maglev Trains", summary: "Magnetic levitation trains reach speeds of 400mph between cities." },
                    { title: "Personal Jetpacks", summary: "Compact jetpacks enable personal flight for short distances." },
                    { title: "Underground Tunnels", summary: "Boring Company creates vast underground transport networks." },
                    { title: "Drone Delivery", summary: "Autonomous drones deliver packages within minutes of ordering." },
                    { title: "Smart Traffic Systems", summary: "AI optimizes traffic flow, eliminating congestion in cities." },
                    { title: "Submarine Transport", summary: "Underwater transport pods connect coastal cities." }
                ],
                robotics: [
                    { title: "Household Robots", summary: "Affordable robots handle all household chores and maintenance." },
                    { title: "Medical Robots", summary: "Surgical robots perform complex operations with 100% precision." },
                    { title: "Rescue Robots", summary: "AI-powered robots save lives in disaster zones and emergencies." },
                    { title: "Agricultural Bots", summary: "Farming robots increase crop yields while reducing pesticide use." },
                    { title: "Companion Robots", summary: "Social robots provide companionship and support for elderly." },
                    { title: "Construction Bots", summary: "Robots build houses in days, solving housing crisis." },
                    { title: "Exploration Robots", summary: "Autonomous robots explore deep oceans and distant planets." },
                    { title: "Service Robots", summary: "Robots handle customer service, delivery, and hospitality." },
                    { title: "Educational Robots", summary: "Teaching robots provide personalized instruction to students." },
                    { title: "Entertainment Bots", summary: "Robot performers create spectacular shows and experiences." }
                ]
            };

            const blogs = [];
            let id = 0;

            for (const [category, posts] of Object.entries(categories)) {
                posts.forEach(post => {
                    blogs.push({
                        id: id++,
                        title: post.title,
                        category: category,
                        date: this.generateRandomDate(),
                        summary: post.summary,
                        fullContent: this.generateFullContent(post.title, post.summary)
                    });
                });
            }

            // Shuffle the array
            return this.shuffleArray(blogs);
        }

        generateRandomDate() {
            const start = new Date(2025, 0, 1);
            const end = new Date(2026, 0, 3);
            const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }

        generateFullContent(title, summary) {
            return `<p>${summary}</p>
                <p>This groundbreaking development represents a major milestone in human innovation and progress. Experts from around the world are celebrating this achievement as a turning point that will shape our future for generations to come.</p>
                <p>The implications of this advancement extend far beyond its immediate applications. Researchers believe this could unlock new possibilities we haven't even imagined yet, opening doors to solutions for some of humanity's greatest challenges.</p>
                <p>Stay tuned for more updates as this story develops and we learn more about the incredible potential of this innovation.</p>`;
        }

        shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        getNextBlogs() {
            const blogs = [];
            for (let i = 0; i < this.blogsPerPage; i++) {
                blogs.push(this.allBlogs[this.currentIndex]);
                this.currentIndex = (this.currentIndex + 1) % this.allBlogs.length;
            }
            return blogs;
        }

        displayBlogs(animate = false) {
            const container = document.getElementById('blogPostsContainer');
            if (!container) return;

            // Get holiday blog if it exists
            const holidayBlog = document.getElementById('holidayBlogPost');
            
            // Get next set of blogs
            this.displayedBlogs = this.getNextBlogs();

            // Fade out effect
            if (animate) {
                container.style.opacity = '0';
                container.style.transform = 'translateY(20px)';
                container.style.pointerEvents = 'none';
            }

            setTimeout(() => {
                // Clear container
                container.innerHTML = '';

                // Re-add holiday blog first if it exists
                if (holidayBlog) {
                    container.appendChild(holidayBlog.cloneNode(true));
                }

                // Add new blogs
                const fragment = document.createDocumentFragment();
                
                this.displayedBlogs.forEach((post, index) => {
                    const article = document.createElement('article');
                    article.className = 'blog-post update-card';
                    article.style.opacity = '1';
                    article.style.transform = 'none';
                    article.innerHTML = `
                        <h3>${post.title}</h3>
                        <span class="date">${post.date}</span>
                        <p>${post.summary}</p>
                        <a href="#" class="read-more" data-post-id="${post.id}">Read more →</a>
                    `;
                    fragment.appendChild(article);
                });

                container.appendChild(fragment);

                // Add click handlers
                container.querySelectorAll('.read-more').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const postId = parseInt(btn.getAttribute('data-post-id'));
                        this.showModal(postId);
                    });
                });

                // Fade in effect
                if (animate) {
                    setTimeout(() => {
                        container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        container.style.opacity = '1';
                        container.style.transform = 'translateY(0)';
                        container.style.pointerEvents = 'auto';
                    }, 50);
                } else {
                    container.style.pointerEvents = 'auto';
                }
            }, animate ? 300 : 0);
        }

        showModal(postId) {
            const post = this.allBlogs.find(p => p.id === postId);
            if (!post) return;

            const modal = document.getElementById('blogModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalDate = document.getElementById('modalDate');
            const modalBody = document.getElementById('modalBody');

            if (modal && modalTitle && modalDate && modalBody) {
                modalTitle.textContent = post.title;
                modalDate.textContent = post.date;
                modalBody.innerHTML = post.fullContent;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }

        startAutoRefresh() {
            console.log('🔄 Dynamic Blog System: Auto-refresh every 2 minutes');
            
            // Refresh every 2 minutes
            this.refreshInterval = setInterval(() => {
                console.log('🔄 Loading fresh blogs...');
                this.displayBlogs(true);
            }, 2 * 60 * 1000); // 2 minutes
        }

        stopAutoRefresh() {
            if (this.refreshInterval) {
                clearInterval(this.refreshInterval);
                this.refreshInterval = null;
            }
        }

        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initialize());
            } else {
                this.initialize();
            }
        }

        initialize() {
            // Wait a bit for holiday blog to load first
            setTimeout(() => {
                this.displayBlogs(false);
                this.startAutoRefresh();
            }, 1000);
        }
    }

    // Initialize and expose globally
    window.dynamicBlogSystem = new DynamicBlogSystem();
    window.dynamicBlogSystem.init();

})();
