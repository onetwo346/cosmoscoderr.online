// Holiday Blog System - Automatically updates with all holidays
(function() {
    'use strict';

    class HolidayBlog {
        constructor() {
            this.holidays = this.getAllHolidays();
            this.currentHoliday = null;
            this.init();
        }

        init() {
            this.currentHoliday = this.getTodaysHoliday();
            this.injectHolidayBlog();
        }

        getAllHolidays() {
            const currentYear = new Date().getFullYear();
            return [
                // January
                { 
                    date: `${currentYear}-01-01`, 
                    name: "New Year's Day", 
                    emoji: "🎆", 
                    description: "Celebrate the start of a new year filled with possibilities and fresh beginnings!",
                    traditions: ["Making resolutions", "Watching fireworks", "Attending parties", "First-footing tradition"],
                    activities: ["Set new goals", "Reflect on the past year", "Spend time with loved ones", "Watch the ball drop"],
                    funFact: "The tradition of making New Year's resolutions dates back over 4,000 years to ancient Babylon!",
                    colors: ["Gold", "Silver", "White"]
                },
                { 
                    date: `${currentYear}-01-15`, 
                    name: "Martin Luther King Jr. Day", 
                    emoji: "✊", 
                    description: "Honoring the legacy of Dr. Martin Luther King Jr. and his fight for equality and justice.",
                    traditions: ["Community service", "Educational programs", "Peaceful marches", "Reading MLK speeches"],
                    activities: ["Volunteer in your community", "Learn about civil rights history", "Attend memorial events", "Discuss equality and justice"],
                    funFact: "MLK Day is the only federal holiday designated as a National Day of Service.",
                    colors: ["Red", "Black", "Green"]
                },
                
                // February
                { date: `${currentYear}-02-02`, name: "Groundhog Day", emoji: "🦫", description: "Will the groundhog see its shadow? Six more weeks of winter or early spring?" },
                { date: `${currentYear}-02-14`, name: "Valentine's Day", emoji: "💝", description: "Spread love and appreciation to those who matter most in your life!" },
                { date: `${currentYear}-02-19`, name: "Presidents' Day", emoji: "🇺🇸", description: "Honoring the leaders who shaped our nation's history." },
                
                // March
                { date: `${currentYear}-03-08`, name: "International Women's Day", emoji: "👩", description: "Celebrating women's achievements and advocating for gender equality worldwide!" },
                { date: `${currentYear}-03-17`, name: "St. Patrick's Day", emoji: "🍀", description: "Irish celebration of heritage, culture, and the patron saint of Ireland!" },
                { date: `${currentYear}-03-20`, name: "First Day of Spring", emoji: "🌸", description: "Spring has sprung! Time for renewal, growth, and blooming flowers!" },
                
                // April
                { date: `${currentYear}-04-01`, name: "April Fools' Day", emoji: "🤡", description: "Watch out for pranks and jokes! Keep your sense of humor handy today!" },
                { date: `${currentYear}-04-22`, name: "Earth Day", emoji: "🌍", description: "Celebrate our beautiful planet and commit to protecting it for future generations!" },
                
                // May
                { date: `${currentYear}-05-04`, name: "Star Wars Day", emoji: "⭐", description: "May the Fourth be with you! Celebrating the epic Star Wars saga!" },
                { date: `${currentYear}-05-05`, name: "Cinco de Mayo", emoji: "🎉", description: "Celebrating Mexican heritage, culture, and the Battle of Puebla!" },
                { date: `${currentYear}-05-12`, name: "Mother's Day", emoji: "👩‍👧‍👦", description: "Honoring all the amazing mothers who give us love, strength, and guidance!" },
                { date: `${currentYear}-05-27`, name: "Memorial Day", emoji: "🇺🇸", description: "Remembering and honoring those who made the ultimate sacrifice for freedom." },
                
                // June
                { date: `${currentYear}-06-14`, name: "Flag Day", emoji: "🇺🇸", description: "Celebrating the adoption of the United States flag!" },
                { date: `${currentYear}-06-16`, name: "Father's Day", emoji: "👨‍👧‍👦", description: "Celebrating all the incredible fathers and father figures in our lives!" },
                { date: `${currentYear}-06-21`, name: "First Day of Summer", emoji: "☀️", description: "Summer is here! Time for sunshine, adventures, and making memories!" },
                
                // July
                { date: `${currentYear}-07-04`, name: "Independence Day", emoji: "🎆", description: "Celebrating freedom, liberty, and the birth of our nation with fireworks!" },
                { date: `${currentYear}-07-14`, name: "Bastille Day", emoji: "🇫🇷", description: "French National Day celebrating liberty, equality, and fraternity!" },
                
                // August
                { date: `${currentYear}-08-15`, name: "National Relaxation Day", emoji: "🧘", description: "Take a break, unwind, and focus on self-care today!" },
                
                // September
                { date: `${currentYear}-09-02`, name: "Labor Day", emoji: "⚒️", description: "Honoring the contributions and achievements of workers everywhere!" },
                { date: `${currentYear}-09-16`, name: "Mexican Independence Day", emoji: "🇲🇽", description: "Celebrating Mexico's independence and rich cultural heritage!" },
                { date: `${currentYear}-09-22`, name: "First Day of Fall", emoji: "🍂", description: "Autumn arrives with colorful leaves, cozy sweaters, and pumpkin spice!" },
                
                // October
                { date: `${currentYear}-10-01`, name: "International Coffee Day", emoji: "☕", description: "Celebrating the beloved beverage that fuels our days!" },
                { date: `${currentYear}-10-10`, name: "World Mental Health Day", emoji: "🧠", description: "Raising awareness about mental health and promoting well-being for all!" },
                { date: `${currentYear}-10-31`, name: "Halloween", emoji: "🎃", description: "Get ready for spooky fun, costumes, candy, and trick-or-treating!" },
                
                // November
                { date: `${currentYear}-11-01`, name: "Day of the Dead", emoji: "💀", description: "Mexican tradition honoring and remembering loved ones who have passed." },
                { date: `${currentYear}-11-11`, name: "Veterans Day", emoji: "🎖️", description: "Honoring all who have served in the Armed Forces with courage and dedication." },
                { date: `${currentYear}-11-28`, name: "Thanksgiving", emoji: "🦃", description: "Gathering with loved ones to give thanks and share a feast!" },
                
                // December
                { date: `${currentYear}-12-13`, name: "St. Lucia Day", emoji: "🕯️", description: "Scandinavian festival of lights celebrating the return of brightness!" },
                { date: `${currentYear}-12-21`, name: "First Day of Winter", emoji: "❄️", description: "Winter wonderland begins! Time for snow, hot cocoa, and cozy nights!" },
                { date: `${currentYear}-12-24`, name: "Christmas Eve", emoji: "🎄", description: "The magic is in the air! Celebrating love, joy, and togetherness!" },
                { date: `${currentYear}-12-25`, name: "Christmas Day", emoji: "🎅", description: "Merry Christmas! Celebrating love, joy, and the spirit of giving!" },
                { date: `${currentYear}-12-26`, name: "Boxing Day", emoji: "🎁", description: "British Commonwealth tradition of giving to those in need and spending time with family!" },
                { date: `${currentYear}-12-31`, name: "New Year's Eve", emoji: "🥳", description: "Counting down to midnight! Reflecting on the year and welcoming new beginnings!" },
                
                // Additional Special Days
                { date: `${currentYear}-02-29`, name: "Leap Day", emoji: "📅", description: "A rare extra day that only comes once every four years!" },
                { date: `${currentYear}-03-20`, name: "International Day of Happiness", emoji: "😊", description: "UN-recognized day promoting happiness and well-being for all people!" },
                { date: `${currentYear}-09-21`, name: "International Day of Peace", emoji: "☮️", description: "Global day dedicated to strengthening peace and non-violence!" },
            ];
        }

        getTodaysHoliday() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const todayStr = `${year}-${month}-${day}`;
            
            // Find exact match for today
            let holiday = this.holidays.find(h => h.date === todayStr);
            
            // If no exact match, find the next upcoming holiday
            if (!holiday) {
                const todayDate = new Date(year, today.getMonth(), today.getDate());
                const upcoming = this.holidays
                    .filter(h => {
                        const holidayDate = new Date(h.date);
                        return holidayDate >= todayDate;
                    })
                    .sort((a, b) => new Date(a.date) - new Date(b.date));
                
                if (upcoming.length > 0) {
                    holiday = upcoming[0];
                    const holidayDate = new Date(holiday.date);
                    const daysUntil = Math.ceil((holidayDate - todayDate) / (1000 * 60 * 60 * 24));
                    holiday.daysUntil = daysUntil;
                }
            }
            
            return holiday;
        }

        getUpcomingHolidays(count = 5) {
            const today = new Date();
            return this.holidays
                .filter(h => new Date(h.date) >= today)
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, count);
        }

        formatDate(dateStr) {
            // Parse as local date to avoid timezone issues
            const [year, month, day] = dateStr.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
            });
        }

        injectHolidayBlog() {
            const blogContainer = document.getElementById('blogPostsContainer');
            if (!blogContainer) return;

            // Wait for container to be ready
            const checkContainer = setInterval(() => {
                if (blogContainer && !document.getElementById('holidayBlogPost')) {
                    clearInterval(checkContainer);
                    this.createHolidayBlogPost(blogContainer);
                }
            }, 100);

            // Clear check after 5 seconds
            setTimeout(() => clearInterval(checkContainer), 5000);
        }

        createHolidayBlogPost(container) {
            if (!this.currentHoliday) return;

            const holidayPost = document.createElement('div');
            holidayPost.className = 'blog-post holiday-blog-post';
            holidayPost.id = 'holidayBlogPost';
            holidayPost.setAttribute('data-holiday', 'true');

            const isToday = !this.currentHoliday.daysUntil;
            const title = isToday 
                ? `${this.currentHoliday.emoji} Today: ${this.currentHoliday.name}!`
                : `${this.currentHoliday.emoji} Coming Up: ${this.currentHoliday.name}`;

            const dateText = isToday
                ? 'Today!'
                : `${this.formatDate(this.currentHoliday.date)} (${this.currentHoliday.daysUntil} days)`;

            holidayPost.innerHTML = `
                <h3>${title}</h3>
                <span class="date">${dateText}</span>
                <p>${this.currentHoliday.description}</p>
                <a href="#" class="read-more" onclick="event.preventDefault(); holidayBlogSystem.showHolidayDetails(holidayBlogSystem.currentHoliday);">Learn More →</a>
            `;
            
            // Make the whole card clickable
            holidayPost.style.cursor = 'pointer';
            holidayPost.addEventListener('click', (e) => {
                if (!e.target.classList.contains('read-more')) {
                    this.showHolidayDetails(this.currentHoliday);
                }
            });

            // Insert as first blog post
            const loader = container.querySelector('.loader');
            if (loader) {
                loader.remove();
            }
            container.insertBefore(holidayPost, container.firstChild);

            // Add animation
            setTimeout(() => {
                holidayPost.style.animation = 'slideInUp 0.6s ease-out';
            }, 100);
        }

        showHolidayDetails(holiday) {
            if (!holiday) return;
            
            const date = new Date(holiday.date);
            const today = new Date();
            const daysUntil = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
            const isToday = daysUntil === 0;
            
            let modalContent = `
                <div style="flex: 1; overflow-y: auto; padding: 1.5rem; padding-bottom: 2rem;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <div style="font-size: 4rem; margin-bottom: 0.5rem;">${holiday.emoji}</div>
                        <h2 style="color: var(--primary); margin: 0 0 0.5rem 0; font-size: 2rem;">
                            ${holiday.name}
                        </h2>
                        <p style="color: var(--accent); font-size: 1.2rem; font-weight: 600; margin: 0;">
                            ${this.formatDate(holiday.date)} ${isToday ? '(Today!)' : daysUntil > 0 ? `(in ${daysUntil} days)` : ''}
                        </p>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 247, 0.1)); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(0, 240, 255, 0.3);">
                        <h3 style="color: var(--primary); margin: 0 0 0.5rem 0; font-size: 1.1rem;">📖 About</h3>
                        <p style="color: var(--text); margin: 0; line-height: 1.6;">${holiday.description}</p>
                    </div>
            `;
            
            // Add traditions if available
            if (holiday.traditions && holiday.traditions.length > 0) {
                modalContent += `
                    <div style="background: rgba(255, 0, 247, 0.1); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(255, 0, 247, 0.3);">
                        <h3 style="color: var(--accent); margin: 0 0 1rem 0; font-size: 1.1rem;">🎭 Traditions</h3>
                        <ul style="margin: 0; padding-left: 1.5rem; color: var(--text);">
                            ${holiday.traditions.map(t => `<li style="margin-bottom: 0.5rem;">${t}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            // Add activities if available
            if (holiday.activities && holiday.activities.length > 0) {
                modalContent += `
                    <div style="background: rgba(0, 240, 255, 0.1); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(0, 240, 255, 0.3);">
                        <h3 style="color: var(--primary); margin: 0 0 1rem 0; font-size: 1.1rem;">🎯 Ways to Celebrate</h3>
                        <ul style="margin: 0; padding-left: 1.5rem; color: var(--text);">
                            ${holiday.activities.map(a => `<li style="margin-bottom: 0.5rem;">${a}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            // Add fun fact if available
            if (holiday.funFact) {
                modalContent += `
                    <div style="background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.15)); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(255, 215, 0, 0.3);">
                        <h3 style="color: #FFD700; margin: 0 0 0.5rem 0; font-size: 1.1rem;">💡 Fun Fact</h3>
                        <p style="color: var(--text); margin: 0; line-height: 1.6;">${holiday.funFact}</p>
                    </div>
                `;
            }
            
            // Add colors if available
            if (holiday.colors && holiday.colors.length > 0) {
                modalContent += `
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1rem; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <h3 style="color: var(--primary); margin: 0 0 1rem 0; font-size: 1.1rem;">🎨 Traditional Colors</h3>
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            ${holiday.colors.map(color => `
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <div style="width: 30px; height: 30px; border-radius: 50%; background: ${color}; border: 2px solid rgba(255, 255, 255, 0.3);"></div>
                                    <span style="color: var(--text);">${color}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
            
            // Add button to view all holidays
            modalContent += `
                <div style="text-align: center; margin-top: 2rem;">
                    <button onclick="holidayBlogSystem.showUpcomingHolidays()" style="background: linear-gradient(135deg, var(--primary), var(--accent)); color: white; border: none; padding: 0.8rem 2rem; border-radius: 2rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: transform 0.2s;">
                        View All Upcoming Holidays 🎉
                    </button>
                </div>
            `;
            
            modalContent += `</div>`;
            
            this.showModal(modalContent, holiday.name);
        }

        showUpcomingHolidays() {
            const upcoming = this.getUpcomingHolidays(10);
            
            let modalContent = `
                <div style="flex: 1; overflow-y: auto; padding: 1rem; padding-bottom: 2rem;">
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem; text-align: center;">
                        🎉 Upcoming Holidays 🎉
                    </h2>
                    <div style="display: grid; gap: 1rem;">
            `;

            upcoming.forEach(holiday => {
                const date = new Date(holiday.date);
                const today = new Date();
                const daysUntil = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
                
                modalContent += `
                    <div style="background: rgba(0, 240, 255, 0.1); padding: 1rem; border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.3);">
                        <h3 style="color: var(--accent); margin: 0 0 0.5rem 0;">
                            ${holiday.emoji} ${holiday.name}
                        </h3>
                        <p style="color: var(--primary); margin: 0 0 0.5rem 0; font-weight: 600;">
                            ${this.formatDate(holiday.date)} ${daysUntil > 0 ? `(in ${daysUntil} days)` : '(Today!)'}
                        </p>
                        <p style="color: var(--text); margin: 0;">
                            ${holiday.description}
                        </p>
                    </div>
                `;
            });

            modalContent += `
                    </div>
                </div>
            `;

            this.showModal(modalContent, 'Upcoming Holidays');
        }

        showModal(content, title) {
            // Create or update modal
            let modal = document.getElementById('holidayModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'holidayModal';
                modal.className = 'modal';
                modal.style.cssText = 'display: none; position: fixed; z-index: 10001; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px); animation: fadeIn 0.3s ease; cursor: default;';
                
                const modalBox = document.createElement('div');
                modalBox.className = 'modal-content';
                modalBox.style.cssText = 'position: relative; margin: 2% auto; padding: 2rem; max-width: 700px; max-height: 95vh; overflow: hidden; display: flex; flex-direction: column; background: rgba(15, 15, 40, 0.95); border-radius: 1.5rem; border: 2px solid var(--primary); box-shadow: 0 0 40px rgba(0, 240, 255, 0.4), 0 0 80px rgba(255, 0, 247, 0.2); animation: slideInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: auto;';
                
                const closeBtn = document.createElement('button');
                closeBtn.innerHTML = '×';
                closeBtn.style.cssText = 'position: absolute; right: 1rem; top: 1rem; background: transparent; border: none; color: var(--primary); font-size: 2.5rem; cursor: pointer; z-index: 1; transition: all 0.2s; line-height: 1;';
                closeBtn.onmouseover = () => {
                    closeBtn.style.transform = 'scale(1.2) rotate(90deg)';
                    closeBtn.style.color = 'var(--accent)';
                };
                closeBtn.onmouseout = () => {
                    closeBtn.style.transform = 'scale(1) rotate(0deg)';
                    closeBtn.style.color = 'var(--primary)';
                };
                closeBtn.onclick = () => {
                    modal.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => modal.style.display = 'none', 300);
                };
                
                modalBox.appendChild(closeBtn);
                modal.appendChild(modalBox);
                document.body.appendChild(modal);
                
                // Add CSS animations
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes fadeOut {
                        from { opacity: 1; }
                        to { opacity: 0; }
                    }
                    @keyframes slideInScale {
                        from { 
                            opacity: 0;
                            transform: translateY(-30px) scale(0.9);
                        }
                        to { 
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            const modalBox = modal.querySelector('.modal-content');
            const existingContent = modalBox.querySelector('div[style*="flex"]');
            if (existingContent) {
                existingContent.remove();
            }
            modalBox.insertAdjacentHTML('beforeend', content);
            modal.style.display = 'block';
            modal.style.animation = 'fadeIn 0.3s ease';

            // Close on outside click
            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => modal.style.display = 'none', 300);
                }
            };
            
            // Close on Escape key
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    modal.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => modal.style.display = 'none', 300);
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        }

        // Update daily
        startDailyUpdate() {
            setInterval(() => {
                const newHoliday = this.getTodaysHoliday();
                if (newHoliday && newHoliday.date !== this.currentHoliday?.date) {
                    this.currentHoliday = newHoliday;
                    const existingPost = document.getElementById('holidayBlogPost');
                    if (existingPost) {
                        existingPost.remove();
                    }
                    const container = document.getElementById('blogPostsContainer');
                    if (container) {
                        this.createHolidayBlogPost(container);
                    }
                }
            }, 3600000); // Check every hour
        }
    }

    // Initialize and expose globally
    window.holidayBlogSystem = new HolidayBlog();
    window.holidayBlogSystem.startDailyUpdate();

})();
