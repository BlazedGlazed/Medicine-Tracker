// Ultra Modern Medicine Tracker Application

class MediTrackApp {
    constructor() {
        this.initializeApp();
    }

    initializeApp() {
        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initNavigation();
            this.initNotifications();
            this.initMedicineCards();
            this.initCalendar();
            this.initSearch();
            this.initTheme();
            this.initTimeFilter();
            this.initCircuitAnimation();
            this.initLoadingAnimations();
            this.initRealTimeUpdates();
            this.initSwipeGestures();
        });
    }

    /* ===== NAVIGATION SYSTEM ===== */
    initNavigation() {
        // Highlight active navigation item
        const currentPage = window.location.pathname.split('/').pop();
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href.includes(currentPage)) {
                item.classList.add('active');
            }
            
            // Add click animation
            item.addEventListener('click', (e) => {
                if (href && !href.startsWith('#')) {
                    e.preventDefault();
                    this.navigateToPage(href);
                }
            });
        });

        // User menu toggle
        const userMenuBtn = document.querySelector('.user-menu-btn');
        if (userMenuBtn) {
            userMenuBtn.addEventListener('click', () => {
                this.toggleUserMenu();
            });
        }

        // Mobile menu toggle
        this.initMobileMenu();
    }

    navigateToPage(url) {
        // Show loading animation
        this.showPageTransition();
        
        // Simulate loading delay
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }

    showPageTransition() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--gradient);
            z-index: 9999;
            opacity: 0;
            animation: pageTransition 0.5s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pageTransition {
                0% {
                    opacity: 0;
                    transform: scale(0.8);
                }
                50% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(1.2);
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => overlay.remove(), 500);
    }

    /* ===== NOTIFICATION SYSTEM ===== */
    initNotifications() {
        const notificationBtn = document.querySelector('.notification-btn');
        const notificationPanel = document.querySelector('.notification-panel');
        
        if (!notificationBtn || !notificationPanel) return;
        
        // Toggle notification panel
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationPanel.classList.toggle('show');
            
            // Mark all as read when opened
            if (notificationPanel.classList.contains('show')) {
                this.markNotificationsAsRead();
            }
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationPanel.contains(e.target) && !notificationBtn.contains(e.target)) {
                notificationPanel.classList.remove('show');
            }
        });
        
        // Load notifications
        this.loadNotifications();
        
        // Simulate real-time notifications
        this.simulateRealTimeNotifications();
    }

    loadNotifications() {
        const notifications = [
            {
                id: 1,
                type: 'reminder',
                title: 'Medicine Reminder',
                message: 'Take Vitamin D3 in 15 minutes',
                time: '10 min ago',
                unread: true
            },
            {
                id: 2,
                type: 'warning',
                title: 'Missed Dose',
                message: 'You missed Metformin at 2:00 PM',
                time: '1 hour ago',
                unread: true
            },
            {
                id: 3,
                type: 'reminder',
                title: 'Refill Alert',
                message: 'Vitamin C is running low',
                time: '3 hours ago',
                unread: false
            }
        ];
        
        const notificationList = document.querySelector('.notification-list');
        if (!notificationList) return;
        
        notificationList.innerHTML = notifications.map(notif => `
            <div class="notification-item ${notif.unread ? 'unread' : ''}" data-id="${notif.id}">
                <div class="notification-icon ${notif.type}">
                    <i class="fas fa-${notif.type === 'reminder' ? 'bell' : 'exclamation-triangle'}"></i>
                </div>
                <div class="notification-content">
                    <h4>${notif.title}</h4>
                    <p>${notif.message}</p>
                    <div class="notification-time">${notif.time}</div>
                </div>
            </div>
        `).join('');
        
        // Update badge count
        const unreadCount = notifications.filter(n => n.unread).length;
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            if (unreadCount > 0) {
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    markNotificationsAsRead() {
        const notifications = document.querySelectorAll('.notification-item.unread');
        notifications.forEach(notif => {
            notif.classList.remove('unread');
        });
        
        // Hide badge
        const badge = document.querySelector('.notification-badge');
        if (badge) badge.style.display = 'none';
    }

    simulateRealTimeNotifications() {
        // Simulate new notifications every 30 seconds
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.showToastNotification(
                    'Upcoming Reminder',
                    'You have a medicine scheduled in 30 minutes',
                    'info'
                );
            }
        }, 30000);
    }

    /* ===== MEDICINE CARDS ===== */
    initMedicineCards() {
        const medicineCards = document.querySelectorAll('.medicine-card');
        
        medicineCards.forEach(card => {
            // Add hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
            
            // Mark as taken button
            const markTakenBtn = card.querySelector('.action-btn.primary');
            if (markTakenBtn) {
                markTakenBtn.addEventListener('click', () => {
                    this.markMedicineAsTaken(card);
                });
            }
            
            // Edit button
            const editBtn = card.querySelector('.action-btn.secondary');
            if (editBtn) {
                editBtn.addEventListener('click', () => {
                    this.editMedicine(card);
                });
            }
        });
    }

    markMedicineAsTaken(card) {
        // Add loading state
        const button = card.querySelector('.action-btn.primary');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Update card status
            card.classList.remove('pending', 'missed');
            card.classList.add('taken');
            card.style.borderLeftColor = 'var(--success)';
            
            // Update status badge
            const statusBadge = card.querySelector('.status-badge');
            if (statusBadge) {
                statusBadge.className = 'status-badge taken';
                statusBadge.innerHTML = '<i class="fas fa-check-circle"></i> Taken';
            }
            
            // Update button
            button.innerHTML = '<i class="fas fa-check"></i> Marked';
            button.style.background = 'var(--success)';
            
            // Show success animation
            this.showSuccessAnimation(card);
            
            // Update stats
            this.updateStats();
            
            // Show notification
            this.showToastNotification(
                'Medicine Taken',
                'Successfully marked as taken',
                'success'
            );
        }, 800);
    }

    editMedicine(card) {
        const medicineId = card.dataset.id;
        // Navigate to edit page with medicine ID
        window.location.href = `edit_medicine.html?id=${medicineId}`;
    }

    /* ===== CALENDAR SYSTEM ===== */
    initCalendar() {
        const calendarGrid = document.querySelector('.calendar-grid');
        if (!calendarGrid) return;
        
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        // Generate calendar
        this.generateCalendar(currentMonth, currentYear);
        
        // Navigation buttons
        const prevBtn = document.querySelector('.calendar-nav-btn.prev');
        const nextBtn = document.querySelector('.calendar-nav-btn.next');
        const monthYear = document.querySelector('.calendar-month');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                // Navigate to previous month
                this.navigateCalendar(-1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                // Navigate to next month
                this.navigateCalendar(1);
            });
        }
    }

    generateCalendar(month, year) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        const calendarGrid = document.querySelector('.calendar-grid');
        if (!calendarGrid) return;
        
        // Clear existing days
        calendarGrid.innerHTML = '';
        
        // Add day names
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day day-name-only';
            dayElement.innerHTML = `<div class="day-name">${day}</div>`;
            calendarGrid.appendChild(dayElement);
        });
        
        // Add empty cells for days before month starts
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // Check if it's today
            if (day === today.getDate() && 
                month === today.getMonth() && 
                year === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Randomly mark some days as having medicines
            if (Math.random() > 0.7) {
                dayElement.classList.add('has-medicine');
            }
            
            dayElement.innerHTML = `
                <div class="day-number">${day}</div>
                <div class="day-name">${new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'short' })}</div>
            `;
            
            // Add click handler
            dayElement.addEventListener('click', () => {
                this.selectDay(day, month, year);
            });
            
            calendarGrid.appendChild(dayElement);
        }
        
        // Update month display
        const monthYear = document.querySelector('.calendar-month');
        if (monthYear) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                               'July', 'August', 'September', 'October', 'November', 'December'];
            monthYear.textContent = `${monthNames[month]} ${year}`;
        }
    }

    navigateCalendar(direction) {
        const monthYear = document.querySelector('.calendar-month');
        if (!monthYear) return;
        
        const currentText = monthYear.textContent;
        const [monthName, year] = currentText.split(' ');
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        let currentMonth = monthNames.indexOf(monthName);
        let currentYear = parseInt(year);
        
        currentMonth += direction;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        
        this.generateCalendar(currentMonth, currentYear);
    }

    selectDay(day, month, year) {
        // Show medicines for selected day
        this.showToastNotification(
            `Medicines for ${day}/${month + 1}/${year}`,
            'Loading scheduled medicines...',
            'info'
        );
    }

    /* ===== SEARCH FUNCTIONALITY ===== */
    initSearch() {
        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;
        
        // Add focus effect
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.transform = 'scale(1.02)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.style.transform = 'scale(1)';
        });
        
        // Search as you type
        searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });
    }

    performSearch(query) {
        const medicineCards = document.querySelectorAll('.medicine-card');
        
        if (!query.trim()) {
            // Show all cards if query is empty
            medicineCards.forEach(card => {
                card.style.display = 'block';
                card.style.animation = 'card-appear 0.3s ease';
            });
            return;
        }
        
        const searchTerm = query.toLowerCase();
        let hasResults = false;
        
        medicineCards.forEach(card => {
            const medicineName = card.querySelector('.medicine-name').textContent.toLowerCase();
            const medicineType = card.querySelector('.medicine-type').textContent.toLowerCase();
            
            if (medicineName.includes(searchTerm) || medicineType.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'card-appear 0.3s ease';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show empty state if no results
        this.showSearchResults(hasResults, searchTerm);
    }

    /* ===== TIME FILTER ===== */
    initTimeFilter() {
        const filterButtons = document.querySelectorAll('.time-filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Filter medicines by time
                const filter = button.dataset.filter;
                this.filterMedicinesByTime(filter);
            });
        });
    }

    filterMedicinesByTime(filter) {
        const medicineCards = document.querySelectorAll('.medicine-card');
        const now = new Date();
        const currentHour = now.getHours();
        
        medicineCards.forEach(card => {
            const timeText = card.querySelector('.medicine-time').textContent;
            const [time, period] = timeText.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            
            // Convert to 24-hour format
            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;
            
            let showCard = true;
            
            switch (filter) {
                case 'morning':
                    showCard = hours >= 6 && hours < 12;
                    break;
                case 'afternoon':
                    showCard = hours >= 12 && hours < 17;
                    break;
                case 'evening':
                    showCard = hours >= 17 && hours < 22;
                    break;
                case 'night':
                    showCard = hours >= 22 || hours < 6;
                    break;
                case 'all':
                default:
                    showCard = true;
            }
            
            card.style.display = showCard ? 'block' : 'none';
            if (showCard) {
                card.style.animation = 'card-appear 0.3s ease';
            }
        });
    }

    /* ===== VISUAL EFFECTS ===== */
    initCircuitAnimation() {
        const container = document.querySelector('.app-bg-effects');
        if (!container) return;
        
        // Create circuit lines
        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.className = 'circuit-line';
            
            // Random position and rotation
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const width = 100 + Math.random() * 200;
            const rotation = Math.random() * 360;
            const delay = Math.random() * 4;
            
            line.style.cssText = `
                top: ${top}%;
                left: ${left}%;
                width: ${width}px;
                transform: rotate(${rotation}deg);
                animation-delay: ${delay}s;
            `;
            
            container.appendChild(line);
        }
    }

    initLoadingAnimations() {
        // Add loading animation for medicine cards
        const medicineCards = document.querySelector('.medicine-cards');
        if (medicineCards && medicineCards.children.length === 0) {
            medicineCards.innerHTML = `
                <div class="loading-wave">
                    <div class="wave-dot"></div>
                    <div class="wave-dot"></div>
                    <div class="wave-dot"></div>
                    <div class="wave-dot"></div>
                </div>
            `;
            
            // Simulate loading delay
            setTimeout(() => {
                this.loadSampleMedicines();
            }, 1500);
        }
    }

    loadSampleMedicines() {
        const sampleMedicines = [
            {
                id: 1,
                name: 'Vitamin D3',
                type: 'Supplement',
                time: '08:00 AM',
                dosage: '1 Tablet',
                frequency: 'Daily',
                status: 'pending'
            },
            {
                id: 2,
                name: 'Metformin',
                type: 'Prescription',
                time: '02:00 PM',
                dosage: '500mg',
                frequency: 'Twice Daily',
                status: 'missed'
            },
            {
                id: 3,
                name: 'Vitamin C',
                type: 'Supplement',
                time: '06:00 PM',
                dosage: '1000mg',
                frequency: 'Daily',
                status: 'taken'
            }
        ];
        
        const medicineCards = document.querySelector('.medicine-cards');
        if (!medicineCards) return;
        
        medicineCards.innerHTML = sampleMedicines.map(med => `
            <div class="medicine-card ${med.status}" data-id="${med.id}">
                <div class="medicine-header">
                    <div>
                        <h3 class="medicine-name">${med.name}</h3>
                        <div class="medicine-type">
                            <i class="fas fa-pills"></i> ${med.type}
                        </div>
                    </div>
                    <div class="medicine-time">${med.time}</div>
                </div>
                
                <div class="medicine-details">
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-capsules"></i>
                        </div>
                        <div>
                            <div class="detail-label">Dosage</div>
                            <div class="detail-value">${med.dosage}</div>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-redo"></i>
                        </div>
                        <div>
                            <div class="detail-label">Frequency</div>
                            <div class="detail-value">${med.frequency}</div>
                        </div>
                    </div>
                </div>
                
                <div class="medicine-status">
                    <span class="status-badge ${med.status}">
                        <i class="fas fa-${med.status === 'taken' ? 'check-circle' : 
                                        med.status === 'missed' ? 'times-circle' : 'clock'}"></i>
                        ${med.status.charAt(0).toUpperCase() + med.status.slice(1)}
                    </span>
                </div>
                
                <div class="medicine-actions">
                    <button class="action-btn primary">
                        <i class="fas fa-check"></i> Mark as Taken
                    </button>
                    <button class="action-btn secondary">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </div>
        `).join('');
        
        // Reinitialize medicine cards
        this.initMedicineCards();
    }

    /* ===== REAL-TIME UPDATES ===== */
    initRealTimeUpdates() {
        // Update time every minute
        setInterval(() => {
            this.updateCurrentTime();
        }, 60000);
        
        // Check for upcoming medicines
        setInterval(() => {
            this.checkUpcomingMedicines();
        }, 30000);
        
        // Update stats periodically
        setInterval(() => {
            this.updateStats();
        }, 300000); // Every 5 minutes
    }

    updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        // Update any time displays
        const timeDisplays = document.querySelectorAll('.current-time');
        timeDisplays.forEach(display => {
            display.textContent = timeString;
        });
    }

    checkUpcomingMedicines() {
        const medicineCards = document.querySelectorAll('.medicine-card.pending');
        
        medicineCards.forEach(card => {
            const timeText = card.querySelector('.medicine-time').textContent;
            const [time, period] = timeText.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            
            // Convert to 24-hour format
            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;
            
            const now = new Date();
            const medicineTime = new Date();
            medicineTime.setHours(hours, minutes, 0, 0);
            
            // Calculate time difference in minutes
            const diffMinutes = (medicineTime - now) / (1000 * 60);
            
            // Show notification if medicine is within 15 minutes
            if (diffMinutes > 0 && diffMinutes <= 15) {
                const medicineName = card.querySelector('.medicine-name').textContent;
                this.showToastNotification(
                    'Upcoming Medicine',
                    `${medicineName} in ${Math.round(diffMinutes)} minutes`,
                    'warning'
                );
            }
        });
    }

    updateStats() {
        // Update adherence rate
        const adherenceElement = document.querySelector('.stat-value');
        if (adherenceElement && adherenceElement.dataset.target) {
            const target = parseFloat(adherenceElement.dataset.target);
            const current = parseFloat(adherenceElement.textContent);
            
            if (current < target) {
                const newValue = Math.min(target, current + Math.random() * 2);
                adherenceElement.textContent = newValue.toFixed(1) + '%';
            }
        }
    }

    /* ===== MOBILE INTERACTIONS ===== */
    initSwipeGestures() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next month
                this.navigateCalendar(1);
            } else {
                // Swipe right - previous month
                this.navigateCalendar(-1);
            }
        }
    }

    initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (!menuToggle) return;
        
        menuToggle.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('mobile-open');
        });
    }

    toggleUserMenu() {
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.classList.toggle('show');
        }
    }

    /* ===== TOAST NOTIFICATIONS ===== */
    showToastNotification(title, message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            toastContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            background: var(--sidebar-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: 15px;
            padding: 20px;
            min-width: 300px;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: var(--glass-shadow);
        `;
        
        // Set icon based on type
        let icon = 'info-circle';
        let iconColor = 'var(--primary)';
        
        switch (type) {
            case 'success':
                icon = 'check-circle';
                iconColor = 'var(--success)';
                break;
            case 'warning':
                icon = 'exclamation-triangle';
                iconColor = 'var(--warning)';
                break;
            case 'error':
                icon = 'times-circle';
                iconColor = 'var(--danger)';
                break;
        }
        
        toast.innerHTML = `
            <div style="display: flex; align-items: start; gap: 15px;">
                <div style="
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: ${iconColor}20;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: ${iconColor};
                    font-size: 1.2rem;
                ">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 5px 0; font-weight: 600;">${title}</h4>
                    <p style="margin: 0; color: var(--gray); font-size: 0.9rem;">${message}</p>
                </div>
                <button class="toast-close" style="
                    background: none;
                    border: none;
                    color: var(--gray);
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 5px;
                    transition: var(--transition);
                ">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);
        
        // Add close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.style.transform = 'translateX(400px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.transform = 'translateX(400px)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }

    /* ===== SUCCESS ANIMATION ===== */
    showSuccessAnimation(element) {
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: var(--success);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
            `;
            
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const duration = 500 + Math.random() * 500;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            // Remove particle after animation
            setTimeout(() => particle.remove(), duration);
        }
    }

    /* ===== THEME SYSTEM ===== */
    initTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('meditrack-theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
        
        // Add theme toggle functionality
        this.initThemeToggle();
    }

    initThemeToggle() {
        // This would be connected to a theme toggle button
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('meditrack-theme', newTheme);
                
                this.showToastNotification(
                    'Theme Changed',
                    `Switched to ${newTheme} theme`,
                    'info'
                );
            });
        }
    }

    /* ===== UTILITY FUNCTIONS ===== */
    showSearchResults(hasResults, query) {
        const medicineCards = document.querySelector('.medicine-cards');
        if (!medicineCards) return;
        
        if (!hasResults && query) {
            // Show empty state
            medicineCards.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3>No medicines found</h3>
                    <p>No results for "${query}"</p>
                </div>
            `;
        }
    }
}

// Initialize the application
const app = new MediTrackApp();