class CosmicNewsFeed {
    constructor() {
        this.newsData = {
            general: [],
            sports: [],
            crypto: [],
            tech: [],
            entertainment: []
        };
        this.currentCategory = 'general';
        this.isLoading = false;
        this.refreshInterval = null;
        this.init();
    }

    init() {
        this.createFeedSection();
        this.loadNews();
        this.startAutoRefresh();
    }

    createFeedSection() {
        // Find the insertion point (after Latest Updates section)
        const latestSection = document.querySelector('#blog');
        if (!latestSection) return;

        const feedSection = document.createElement('section');
        feedSection.id = 'news-feed';
        feedSection.className = 'cosmic-news-feed-section';
        feedSection.innerHTML = `
            <div class="news-feed-overlay"></div>
            <div class="section-title">
                <span class="sparkle-icon">📰</span>
                <h2 class="cosmic-news-title">NEWS FEED</h2>
                <p class="news-subtitle">Real-time global updates from across the universe</p>
            </div>
            
            <div class="news-categories">
                <button class="news-category-btn active" data-category="general">
                    <i class="fas fa-globe"></i> Global
                </button>
                <button class="news-category-btn" data-category="sports">
                    <i class="fas fa-trophy"></i> Sports
                </button>
                <button class="news-category-btn" data-category="entertainment">
                    <i class="fas fa-film"></i> Entertainment
                </button>
                <button class="news-category-btn" data-category="crypto">
                    <i class="fab fa-bitcoin"></i> Crypto
                </button>
                <button class="news-category-btn" data-category="tech">
                    <i class="fas fa-microchip"></i> Tech
                </button>
            </div>

            <div class="news-feed-container">
                <div class="news-loader" id="newsLoader">
                    <div class="cosmic-spinner"></div>
                    <p>Loading cosmic news...</p>
                </div>
                <div class="news-grid" id="newsGrid"></div>
                <div class="news-error" id="newsError" style="display: none;">
                    <p>Unable to fetch news at this time. Please try again later.</p>
                    <button class="retry-btn" onclick="cosmicNewsFeed.loadNews()">Retry</button>
                </div>
            </div>

            <div class="news-refresh-info">
                <span class="refresh-indicator">
                    <i class="fas fa-sync-alt"></i>
                    <span class="refresh-text">Auto-refreshing every minute • Live from across the universe</span>
                </span>
            </div>
        `;

        // Insert after the Latest Updates section
        latestSection.insertAdjacentElement('afterend', feedSection);

        // Add event listeners for category buttons
        this.setupCategoryButtons();
    }

    setupCategoryButtons() {
        const categoryButtons = document.querySelectorAll('.news-category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                categoryButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Update current category with smooth transition
                this.currentCategory = btn.dataset.category;
                
                // Add fade out effect
                const newsGrid = document.getElementById('newsGrid');
                if (newsGrid) {
                    newsGrid.style.opacity = '0';
                    newsGrid.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        this.displayNews();
                        newsGrid.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        newsGrid.style.opacity = '1';
                        newsGrid.style.transform = 'translateY(0)';
                    }, 300);
                }
            });
        });
    }

    async loadNews() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoader();

        try {
            // Load news from multiple free sources
            await Promise.all([
                this.loadGeneralNews(),
                this.loadSportsNews(),
                this.loadCryptoNews(),
                this.loadTechNews(),
                this.loadEntertainmentNews()
            ]);

            this.displayNews();
            this.hideError();
        } catch (error) {
            console.error('Error loading news:', error);
            this.showError();
        } finally {
            this.isLoading = false;
            this.hideLoader();
        }
    }

    async loadGeneralNews() {
        try {
            // Using NewsData.io free API (no key required for basic usage)
            const response = await fetch('https://newsdata.io/api/1/news?apikey=pub_62556c2d8f8a8b0e8f8a8b0e8f8a8b0e&language=en&category=top');
            
            if (!response.ok) {
                // Fallback to RSS2JSON for BBC News
                const rssResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/news/rss.xml');
                const rssData = await rssResponse.json();
                
                this.newsData.general = rssData.items.slice(0, 9).map(item => ({
                    title: item.title,
                    summary: item.description.replace(/<[^>]*>/g, '').substring(0, 150),
                    source: 'BBC News',
                    time: this.formatTime(item.pubDate),
                    url: item.link,
                    image: item.enclosure?.link || item.thumbnail || 'https://via.placeholder.com/300x200/0f0f28/00f0ff?text=News'
                }));
                return;
            }
            
            const data = await response.json();
            this.newsData.general = data.results.slice(0, 9).map(article => ({
                title: article.title,
                summary: article.description || article.content?.substring(0, 150) || 'Read more for details',
                source: article.source_id || 'News Source',
                time: this.formatTime(article.pubDate),
                url: article.link,
                image: article.image_url || 'https://via.placeholder.com/300x200/0f0f28/00f0ff?text=News'
            }));
        } catch (error) {
            console.error('Error loading general news:', error);
            // Fallback to RSS feed
            await this.loadRSSFeed('general', 'https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/news/rss.xml', 'BBC News');
        }
    }

    async loadSportsNews() {
        try {
            // Combine multiple sports sources for comprehensive coverage
            const sources = [
                { url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.espn.com/espn/rss/news', name: 'ESPN' },
                { url: 'https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/sport/rss.xml', name: 'BBC Sport' },
                { url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.espn.com/espn/rss/nba/news', name: 'ESPN NBA' }
            ];
            
            const allSportsNews = [];
            
            for (const source of sources) {
                try {
                    const response = await fetch(source.url);
                    const data = await response.json();
                    
                    if (data.items && data.items.length > 0) {
                        const items = data.items.slice(0, 3).map(item => ({
                            title: item.title,
                            summary: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) || 'Latest sports update',
                            source: source.name,
                            time: this.formatTime(item.pubDate),
                            url: item.link,
                            image: item.thumbnail || item.enclosure?.link || 'https://via.placeholder.com/300x200/0f0f28/ffd700?text=Sports'
                        }));
                        allSportsNews.push(...items);
                    }
                } catch (err) {
                    console.warn(`Failed to load from ${source.name}:`, err);
                }
            }
            
            this.newsData.sports = allSportsNews.slice(0, 9);
            
            if (this.newsData.sports.length === 0) {
                throw new Error('No sports news loaded from any source');
            }
        } catch (error) {
            console.error('Error loading sports news:', error);
            await this.loadRSSFeed('sports', 'https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/sport/rss.xml', 'BBC Sport');
        }
    }

    async loadCryptoNews() {
        try {
            // Using CryptoPanic free API
            const response = await fetch('https://cryptopanic.com/api/v1/posts/?auth_token=free&public=true&kind=news');
            const data = await response.json();
            
            this.newsData.crypto = data.results.slice(0, 9).map(item => ({
                title: item.title,
                summary: item.title, // CryptoPanic doesn't provide descriptions
                source: item.source?.title || 'Crypto News',
                time: this.formatTime(item.published_at),
                url: item.url,
                image: 'https://via.placeholder.com/300x200/0f0f28/ffd700?text=Crypto'
            }));
        } catch (error) {
            console.error('Error loading crypto news:', error);
            // Fallback to CoinDesk RSS
            await this.loadRSSFeed('crypto', 'https://api.rss2json.com/v1/api.json?rss_url=https://www.coindesk.com/arc/outboundfeeds/rss/', 'CoinDesk');
        }
    }

    async loadTechNews() {
        try {
            // Using Hacker News API (completely free, no key needed)
            const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
            const storyIds = await response.json();
            
            // Fetch first 9 stories
            const storyPromises = storyIds.slice(0, 9).map(async id => {
                const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                return storyResponse.json();
            });
            
            const stories = await Promise.all(storyPromises);
            
            this.newsData.tech = stories.map(story => ({
                title: story.title,
                summary: story.title, // HN doesn't provide descriptions
                source: 'Hacker News',
                time: this.formatTime(new Date(story.time * 1000)),
                url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
                image: 'https://via.placeholder.com/300x200/0f0f28/00f0ff?text=Tech+News'
            }));
        } catch (error) {
            console.error('Error loading tech news:', error);
            // Fallback to TechCrunch RSS
            await this.loadRSSFeed('tech', 'https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/feed/', 'TechCrunch');
        }
    }

    async loadEntertainmentNews() {
        try {
            // Combine entertainment sources (music, movies, TV, celebrities)
            const sources = [
                { url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.billboard.com/feed/', name: 'Billboard Music' },
                { url: 'https://api.rss2json.com/v1/api.json?rss_url=https://variety.com/feed/', name: 'Variety' },
                { url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.hollywoodreporter.com/feed/', name: 'Hollywood Reporter' }
            ];
            
            const allEntertainmentNews = [];
            
            for (const source of sources) {
                try {
                    const response = await fetch(source.url);
                    const data = await response.json();
                    
                    if (data.items && data.items.length > 0) {
                        const items = data.items.slice(0, 3).map(item => ({
                            title: item.title,
                            summary: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) || 'Latest entertainment news',
                            source: source.name,
                            time: this.formatTime(item.pubDate),
                            url: item.link,
                            image: item.thumbnail || item.enclosure?.link || 'https://via.placeholder.com/300x200/0f0f28/ff00f7?text=Entertainment'
                        }));
                        allEntertainmentNews.push(...items);
                    }
                } catch (err) {
                    console.warn(`Failed to load from ${source.name}:`, err);
                }
            }
            
            this.newsData.entertainment = allEntertainmentNews.slice(0, 9);
            
            if (this.newsData.entertainment.length === 0) {
                throw new Error('No entertainment news loaded from any source');
            }
        } catch (error) {
            console.error('Error loading entertainment news:', error);
            await this.loadRSSFeed('entertainment', 'https://api.rss2json.com/v1/api.json?rss_url=https://variety.com/feed/', 'Variety');
        }
    }

    async loadRSSFeed(category, rssUrl, sourceName) {
        try {
            const response = await fetch(rssUrl);
            const data = await response.json();
            
            this.newsData[category] = data.items.slice(0, 9).map(item => ({
                title: item.title,
                summary: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) || 'Read more for details',
                source: sourceName,
                time: this.formatTime(item.pubDate),
                url: item.link,
                image: item.thumbnail || item.enclosure?.link || 'https://via.placeholder.com/300x200/0f0f28/00f0ff?text=News'
            }));
        } catch (error) {
            console.error(`Error loading RSS feed for ${category}:`, error);
            this.newsData[category] = [];
        }
    }

    formatTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return date.toLocaleDateString();
    }

    getMockNews(category) {
        const mockData = {
            general: [
                {
                    title: "Global Climate Summit Reaches Historic Agreement",
                    summary: "World leaders unite on ambitious climate targets for 2030",
                    source: "Global News",
                    time: "2 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=Climate+Summit"
                },
                {
                    title: "Space Station Welcomes New International Crew",
                    summary: "Astronauts from five nations begin six-month mission",
                    source: "Space Today",
                    time: "4 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ff00f7?text=Space+Station"
                },
                {
                    title: "Breakthrough in Renewable Energy Storage",
                    summary: "New battery technology promises 10x longer storage capacity",
                    source: "Energy Weekly",
                    time: "6 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=Energy+Storage"
                },
                {
                    title: "Major Scientific Discovery in Ocean Depths",
                    summary: "Researchers find new species in unexplored marine ecosystem",
                    source: "Science Daily",
                    time: "8 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ffd700?text=Ocean+Discovery"
                },
                {
                    title: "Global Economy Shows Strong Recovery Signs",
                    summary: "Markets rally as economic indicators exceed expectations",
                    source: "Financial Times",
                    time: "10 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=Economy"
                },
                {
                    title: "Revolutionary Medical Treatment Approved",
                    summary: "FDA approves groundbreaking therapy for rare diseases",
                    source: "Health News",
                    time: "12 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ff00f7?text=Medical+News"
                },
                {
                    title: "International Peace Talks Make Progress",
                    summary: "Diplomatic efforts show promising results in conflict resolution",
                    source: "World Report",
                    time: "14 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=Peace+Talks"
                },
                {
                    title: "Innovative Education Program Launches Globally",
                    summary: "New initiative aims to provide free education to millions",
                    source: "Education Today",
                    time: "16 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ffd700?text=Education"
                },
                {
                    title: "Historic Archaeological Find Unveiled",
                    summary: "Ancient civilization artifacts rewrite history books",
                    source: "Archaeology Weekly",
                    time: "18 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ff00f7?text=Archaeology"
                }
            ],
            sports: [
                {
                    title: "Championship Finals Set for This Weekend",
                    summary: "Two powerhouse teams prepare for the ultimate showdown",
                    source: "Sports Central",
                    time: "1 hour ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ffd700?text=Championship"
                },
                {
                    title: "Olympic Records Broken at World Championships",
                    summary: "Three world records fall in swimming competitions",
                    source: "Olympic News",
                    time: "3 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ff00f7?text=Olympics"
                },
                {
                    title: "Rising Star Wins First Major Tournament",
                    summary: "Young athlete makes history with stunning victory",
                    source: "Sports Today",
                    time: "5 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=Rising+Star"
                },
                {
                    title: "Soccer Legend Announces Retirement",
                    summary: "Icon of the sport calls time on illustrious career",
                    source: "Football News",
                    time: "7 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ffd700?text=Soccer+Legend"
                },
                {
                    title: "Basketball Playoffs Reach Intense Semifinals",
                    summary: "Underdogs shock favorites in dramatic overtime win",
                    source: "Hoops Daily",
                    time: "9 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=Basketball"
                },
                {
                    title: "Tennis Star Claims Grand Slam Victory",
                    summary: "Historic win completes career Grand Slam achievement",
                    source: "Tennis World",
                    time: "11 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ff00f7?text=Tennis"
                },
                {
                    title: "Marathon Runner Sets New World Record",
                    summary: "Incredible performance shatters previous best time",
                    source: "Running Times",
                    time: "13 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ffd700?text=Marathon"
                },
                {
                    title: "Formula 1 Driver Wins Championship Title",
                    summary: "Thrilling season finale crowns new champion",
                    source: "Racing News",
                    time: "15 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=F1+Racing"
                },
                {
                    title: "Winter Olympics Host City Announced",
                    summary: "International committee reveals location for 2030 games",
                    source: "Olympic Committee",
                    time: "17 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ff00f7?text=Winter+Olympics"
                }
            ],
            crypto: [
                {
                    title: "Bitcoin Reaches New All-Time High",
                    summary: "Cryptocurrency surges past $100,000 milestone",
                    source: "Crypto Daily",
                    time: "30 minutes ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ffd700?text=Bitcoin+ATH"
                },
                {
                    title: "Major Bank Adopts Blockchain Technology",
                    summary: "Traditional finance embraces decentralized solutions",
                    source: "Blockchain News",
                    time: "2 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=Blockchain+Bank"
                },
                {
                    title: "New DeFi Protocol Launches with $1B TVL",
                    summary: "Revolutionary lending platform attracts massive investment",
                    source: "DeFi Times",
                    time: "4 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ff00f7?text=DeFi+Launch"
                },
                {
                    title: "Ethereum Upgrade Successfully Deployed",
                    summary: "Network scalability improves with latest hard fork",
                    source: "ETH News",
                    time: "6 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=Ethereum"
                },
                {
                    title: "NFT Marketplace Hits Record Trading Volume",
                    summary: "Digital art sales soar as mainstream adoption grows",
                    source: "NFT Insider",
                    time: "8 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ffd700?text=NFT+Market"
                },
                {
                    title: "Stablecoin Regulation Framework Proposed",
                    summary: "Government unveils comprehensive crypto policy guidelines",
                    source: "Crypto Policy",
                    time: "10 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ff00f7?text=Regulation"
                },
                {
                    title: "Layer 2 Solution Achieves 100k TPS",
                    summary: "Scaling breakthrough enables lightning-fast transactions",
                    source: "Tech Crypto",
                    time: "12 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=Layer+2"
                },
                {
                    title: "Crypto Exchange Launches Institutional Services",
                    summary: "Platform expands offerings for professional investors",
                    source: "Exchange News",
                    time: "14 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ffd700?text=Exchange"
                },
                {
                    title: "Web3 Gaming Platform Raises $500M",
                    summary: "Play-to-earn ecosystem attracts major venture funding",
                    source: "Gaming Crypto",
                    time: "16 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ff00f7?text=Web3+Gaming"
                }
            ],
            tech: [
                {
                    title: "AI Breakthrough in Medical Diagnosis",
                    summary: "Machine learning model achieves 99% accuracy in cancer detection",
                    source: "Tech Innovation",
                    time: "1 hour ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=AI+Medical"
                },
                {
                    title: "Quantum Computer Solves Complex Problem",
                    summary: "New quantum system outperforms traditional supercomputers",
                    source: "Quantum Weekly",
                    time: "3 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ff00f7?text=Quantum+Computing"
                },
                {
                    title: "Revolutionary VR Headset Announced",
                    summary: "Next-generation device promises photorealistic experiences",
                    source: "VR Today",
                    time: "5 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ffd700?text=VR+Headset"
                },
                {
                    title: "5G Network Expansion Reaches Rural Areas",
                    summary: "Telecom giants invest billions in infrastructure upgrade",
                    source: "Network News",
                    time: "7 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=5G+Network"
                },
                {
                    title: "Autonomous Vehicle Fleet Launches in Major City",
                    summary: "Self-driving cars begin commercial passenger service",
                    source: "Auto Tech",
                    time: "9 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ff00f7?text=Self+Driving"
                },
                {
                    title: "Breakthrough in Fusion Energy Research",
                    summary: "Scientists achieve net positive energy from fusion reaction",
                    source: "Energy Tech",
                    time: "11 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ffd700?text=Fusion+Energy"
                },
                {
                    title: "New Smartphone Features Revolutionary Display",
                    summary: "Foldable screen technology reaches new milestone",
                    source: "Mobile Tech",
                    time: "13 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/00f0ff?text=Smartphone"
                },
                {
                    title: "Cybersecurity Firm Unveils Quantum Encryption",
                    summary: "Unhackable communication system protects sensitive data",
                    source: "Security Today",
                    time: "15 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ff00f7?text=Cybersecurity"
                },
                {
                    title: "Space Tech Startup Plans Mars Mission",
                    summary: "Private company announces ambitious red planet exploration",
                    source: "Space Tech",
                    time: "17 hours ago",
                    url: "#",
                    image: "https://via.placeholder.com/300x200/0f0f28/ffd700?text=Mars+Mission"
                }
            ]
        };

        return mockData[category] || [];
    }

    displayNews() {
        const newsGrid = document.getElementById('newsGrid');
        if (!newsGrid) return;

        const currentNews = this.newsData[this.currentCategory] || [];
        
        if (currentNews.length === 0) {
            newsGrid.innerHTML = '<p class="no-news">🌌 No news available for this category. Scanning the universe...</p>';
            return;
        }

        const newsHTML = currentNews.map((article, index) => `
            <article class="news-card" style="animation-delay: ${index * 0.08}s">
                <div class="news-image" style="background-image: url('${article.image}');">
                    <div class="news-overlay"></div>
                    <span class="news-source">${article.source}</span>
                    <div class="news-fresh-badge" title="Fresh content">
                        <i class="fas fa-bolt"></i>
                    </div>
                </div>
                <div class="news-content">
                    <h3 class="news-title">${article.title}</h3>
                    <p class="news-summary">${article.summary}</p>
                    <div class="news-meta">
                        <span class="news-time">
                            <i class="fas fa-clock"></i>
                            ${article.time}
                        </span>
                        <a href="${article.url}" class="news-read-more" target="_blank" rel="noopener">
                            Read More <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </article>
        `).join('');

        newsGrid.innerHTML = newsHTML;

        // Add scroll reveal animation to news cards
        const newsCards = newsGrid.querySelectorAll('.news-card');
        newsCards.forEach((card, index) => {
            card.classList.add('fade-in-up');
        });

        // Add click handlers for Read More links
        const readMoreLinks = newsGrid.querySelectorAll('.news-read-more');
        readMoreLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNewsModal(link);
            });
        });
        
        // Pulse the refresh indicator when new content loads
        this.pulseRefreshIndicator();
    }

    showNewsModal(linkElement) {
        // Get the article data from the parent card
        const card = linkElement.closest('.news-card');
        const title = card.querySelector('.news-title').textContent;
        const summary = card.querySelector('.news-summary').textContent;
        const source = card.querySelector('.news-source').textContent;
        const time = card.querySelector('.news-time').textContent.trim();
        const articleUrl = linkElement.getAttribute('href');
        const imageUrl = card.querySelector('.news-image').style.backgroundImage.slice(5, -2);

        // Create a modal with article preview and direct link
        const modal = document.createElement('div');
        modal.className = 'news-article-modal';
        modal.innerHTML = `
            <div class="news-article-modal-content news-article-preview">
                <button class="news-modal-close">&times;</button>
                <div class="news-modal-header-bar">
                    <div class="news-modal-info">
                        <span class="news-modal-source">${source}</span>
                        <span class="news-modal-time">${time}</span>
                    </div>
                </div>
                <div class="news-modal-image" style="background-image: url('${imageUrl}')"></div>
                <div class="news-modal-body">
                    <h2 class="modal-article-title">${title}</h2>
                    <p class="modal-article-summary">${summary}</p>
                    <div class="news-modal-note">
                        <i class="fas fa-info-circle"></i>
                        <span>Click below to read the full article with all content and videos</span>
                    </div>
                    <div class="news-modal-actions">
                        <a href="${articleUrl}" target="_blank" rel="noopener noreferrer" class="news-modal-read-full">
                            <i class="fas fa-external-link-alt"></i>
                            Read Full Article
                        </a>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Show modal with animation
        setTimeout(() => modal.classList.add('show'), 10);

        // Close modal handlers
        const closeBtn = modal.querySelector('.news-modal-close');
        closeBtn.addEventListener('click', () => this.closeNewsModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeNewsModal(modal);
        });

        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeNewsModal(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    closeNewsModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }

    showLoader() {
        const loader = document.getElementById('newsLoader');
        if (loader) loader.style.display = 'flex';
    }

    hideLoader() {
        const loader = document.getElementById('newsLoader');
        if (loader) loader.style.display = 'none';
    }

    showError() {
        const error = document.getElementById('newsError');
        if (error) error.style.display = 'block';
    }

    hideError() {
        const error = document.getElementById('newsError');
        if (error) error.style.display = 'none';
    }

    startAutoRefresh() {
        // Refresh news every 1 minute for fresh content across the universe
        this.refreshInterval = setInterval(() => {
            console.log('🌌 Fetching fresh news from across the universe...');
            this.loadNews();
        }, 60 * 1000); // 1 minute
    }

    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    pulseRefreshIndicator() {
        const refreshIndicator = document.querySelector('.refresh-indicator');
        if (refreshIndicator) {
            refreshIndicator.style.animation = 'none';
            setTimeout(() => {
                refreshIndicator.style.animation = 'refreshPulse 0.6s ease';
            }, 10);
        }
    }

    destroy() {
        this.stopAutoRefresh();
        const feedSection = document.getElementById('news-feed');
        if (feedSection) {
            feedSection.remove();
        }
    }
}

// Initialize the news feed when DOM is loaded
let cosmicNewsFeed;

document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other components to load
    setTimeout(() => {
        cosmicNewsFeed = new CosmicNewsFeed();
    }, 1000);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (cosmicNewsFeed) {
        cosmicNewsFeed.destroy();
    }
});
