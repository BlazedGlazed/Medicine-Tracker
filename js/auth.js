// Ultra Modern Authentication System

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the entire system
    initUltraAuthSystem();
});

function initUltraAuthSystem() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') || 'login';
    
    // Initialize all systems
    initQuantumParticles();
    initNeuralNetwork();
    initTypingEffect();
    initStatsCounter();
    initWaveform();
    initModeToggle(mode);
    initFormInteractions();
    initNotificationSystem();
    initPageTransitions();
    initPasswordStrength();
    initSocialButtons();
    
    // Start animations
    startAmbientAnimations();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to MediTrack', 'Your health journey begins now');
    }, 1000);
}

/* ===== QUANTUM PARTICLES ===== */
function initQuantumParticles() {
    const quantumField = document.getElementById('quantumField');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createQuantumParticle(quantumField);
    }
}

function createQuantumParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'quantum-particle';
    
    // Random properties
    const size = Math.random() * 15 + 5;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 30 + 20;
    const delay = Math.random() * 20;
    
    // Random color
    const colors = [
        'rgba(74, 111, 255, 0.2)',
        'rgba(0, 212, 198, 0.2)',
        'rgba(255, 107, 139, 0.2)',
        'rgba(16, 185, 129, 0.2)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${posX}%;
        top: ${posY}%;
        background: ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        particle.remove();
        createQuantumParticle(container);
    }, duration * 1000);
}

/* ===== NEURAL NETWORK VISUALIZATION ===== */
function initNeuralNetwork() {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    
    const nodes = [];
    const connections = [];
    
    // Create nodes
    const nodeCount = 15;
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 6 + 4,
            color: `rgba(${74 + Math.random() * 50}, ${111 + Math.random() * 50}, 255, ${0.3 + Math.random() * 0.3})`
        });
    }
    
    // Create connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.7) {
                connections.push({
                    node1: nodes[i],
                    node2: nodes[j],
                    strength: Math.random()
                });
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();
            
            // Glow effect
            const gradient = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius * 3
            );
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        });
        
        // Draw connections
        connections.forEach(conn => {
            const dx = conn.node2.x - conn.node1.x;
            const dy = conn.node2.y - conn.node1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(conn.node1.x, conn.node1.y);
                ctx.lineTo(conn.node2.x, conn.node2.y);
                ctx.strokeStyle = `rgba(74, 111, 255, ${0.1 + conn.strength * 0.2})`;
                ctx.lineWidth = 1;
                ctx.stroke();
                
                // Pulsing effect
                const pulse = (Math.sin(Date.now() * 0.001 + conn.strength * Math.PI) + 1) * 0.5;
                ctx.beginPath();
                ctx.moveTo(conn.node1.x, conn.node1.y);
                ctx.lineTo(conn.node2.x, conn.node2.y);
                ctx.strokeStyle = `rgba(74, 111, 255, ${pulse * 0.3})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    });
}

/* ===== TYPING EFFECT ===== */
function initTypingEffect() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const messages = [
        "Never miss a dose again...",
        "Intelligent health tracking...",
        "Your health, simplified...",
        "Welcome to the future of healthcare..."
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentMessage = messages[messageIndex];
        
        if (!isDeleting && charIndex <= currentMessage.length) {
            typingText.textContent = currentMessage.substring(0, charIndex);
            charIndex++;
            setTimeout(type, 50);
        } else if (isDeleting && charIndex >= 0) {
            typingText.textContent = currentMessage.substring(0, charIndex);
            charIndex--;
            setTimeout(type, 30);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                messageIndex = (messageIndex + 1) % messages.length;
            }
            setTimeout(type, 1000);
        }
    }
    
    type();
}

/* ===== ANIMATED STATS COUNTER ===== */
function initStatsCounter() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target % 1 === 0 ? target : target.toFixed(1);
                if (target === 99.2) stat.textContent += '%';
            }
        };
        
        setTimeout(updateCounter, 1000);
    });
}

/* ===== WAVEFORM VISUALIZATION ===== */
function initWaveform() {
    const waveform = document.getElementById('waveform');
    if (!waveform) return;
    
    const barCount = 40;
    const bars = [];
    
    // Create bars
    for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'wave-bar';
        bar.style.cssText = `
            position: absolute;
            bottom: 0;
            width: 3px;
            height: ${Math.random() * 100}%;
            background: linear-gradient(to top, var(--primary), var(--secondary));
            left: ${(i / barCount) * 100}%;
            transform: translateX(-50%);
            border-radius: 2px;
            opacity: 0.6;
        `;
        waveform.appendChild(bar);
        bars.push(bar);
    }
    
    // Animate bars
    function animateBars() {
        bars.forEach((bar, i) => {
            const time = Date.now() * 0.001;
            const height = 30 + Math.sin(time * 2 + i * 0.3) * 30;
            bar.style.height = `${height}%`;
            bar.style.opacity = 0.4 + Math.sin(time * 3 + i) * 0.3;
        });
        requestAnimationFrame(animateBars);
    }
    
    animateBars();
}

/* ===== MODE TOGGLE (Login/Signup) ===== */
function initModeToggle(initialMode) {
    const modeToggle = document.getElementById('modeToggle');
    const toggleBg = modeToggle.querySelector('.toggle-bg');
    const toggleOptions = modeToggle.querySelectorAll('.toggle-option');
    const toggleIndicator = modeToggle.querySelector('.toggle-indicator');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authPanel = document.querySelector('.auth-panel');
    
    // Set initial mode
    if (initialMode === 'signup') {
        toggleOptions[0].classList.remove('active');
        toggleOptions[1].classList.add('active');
        toggleBg.style.transform = 'translateX(calc(100% + 6px))';
        toggleIndicator.style.left = 'calc(75% - 10px)';
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    } else {
        toggleOptions[0].classList.add('active');
        toggleOptions[1].classList.remove('active');
        toggleBg.style.transform = 'translateX(0)';
        toggleIndicator.style.left = 'calc(25% - 10px)';
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    }
    
    // Add click handlers
    toggleOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            // Update active class
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Animate toggle background
            if (index === 0) {
                toggleBg.style.transform = 'translateX(0)';
                toggleIndicator.style.left = 'calc(25% - 10px)';
                
                // Switch to login form
                signupForm.classList.remove('active');
                setTimeout(() => {
                    loginForm.classList.add('active');
                }, 50);
            } else {
                toggleBg.style.transform = 'translateX(calc(100% + 6px))';
                toggleIndicator.style.left = 'calc(75% - 10px)';
                
                // Switch to signup form
                loginForm.classList.remove('active');
                setTimeout(() => {
                    signupForm.classList.add('active');
                }, 50);
            }
            
            // Show notification
            const modeText = index === 0 ? 'Login' : 'Sign Up';
            showNotification(`Switched to ${modeText}`, 'Continue your health journey');
        });
    });
}

/* ===== FORM INTERACTIONS ===== */
function initFormInteractions() {
    const inputs = document.querySelectorAll('.form-input');
    const passwordToggles = document.querySelectorAll('.password-toggle');
    const forms = document.querySelectorAll('.auth-form');
    
    // Input focus effects
    inputs.forEach(input => {
        const inputGroup = input.closest('.input-group');
        
        input.addEventListener('focus', () => {
            inputGroup.classList.add('focused');
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'btn-ripple';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                height: 100%;
                transform: translate(-50%, -50%) scale(0);
            `;
            inputGroup.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.animation = 'ripple 0.6s linear';
                setTimeout(() => ripple.remove(), 600);
            }, 10);
        });
        
        input.addEventListener('blur', () => {
            inputGroup.classList.remove('focused');
        });
    });
    
    // Password toggle
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.parentElement.querySelector('.form-input');
            const icon = toggle.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
                
                // Add checkmark animation
                toggle.style.transform = 'translateY(-50%) scale(1.2)';
                setTimeout(() => {
                    toggle.style.transform = 'translateY(-50%) scale(1)';
                }, 300);
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    });
    
    // Form submission
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show progress indicator
            showProgressIndicator();
            
            // Simulate API call
            setTimeout(() => {
                hideProgressIndicator();
                
                const isLogin = form.id === 'loginForm';
                const message = isLogin 
                    ? 'Welcome back! Redirecting to dashboard...' 
                    : 'Account created successfully!';
                
                showNotification('Success!', message, 'success');
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }, 1500);
        });
    });
}

/* ===== PASSWORD STRENGTH ===== */
function initPasswordStrength() {
    const passwordInput = document.querySelector('#signupForm input[type="password"]');
    if (!passwordInput) return;
    
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text span');
    
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const strength = calculatePasswordStrength(password);
        
        // Update strength bar
        strengthFill.style.width = `${strength.percentage}%`;
        strengthFill.style.background = strength.color;
        
        // Update text
        strengthText.textContent = strength.text;
        strengthText.style.color = strength.color;
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    
    if (score >= 75) {
        return {
            percentage: score,
            color: '#10B981',
            text: 'Strong'
        };
    } else if (score >= 50) {
        return {
            percentage: score,
            color: '#F59E0B',
            text: 'Medium'
        };
    } else if (score >= 25) {
        return {
            percentage: score,
            color: '#EF4444',
            text: 'Weak'
        };
    } else {
        return {
            percentage: score,
            color: '#8C93B3',
            text: 'None'
        };
    }
}

/* ===== SOCIAL BUTTONS ===== */
function initSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.classList.contains('google') ? 'Google' :
                           button.classList.contains('apple') ? 'Apple' : 'GitHub';
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'btn-ripple';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.animation = 'ripple 0.6s linear';
                setTimeout(() => ripple.remove(), 600);
            }, 10);
            
            // Show notification
            showNotification(`${provider} Authentication`, 'Redirecting to authentication service...');
        });
    });
}

/* ===== NOTIFICATION SYSTEM ===== */
function initNotificationSystem() {
    const toast = document.getElementById('notificationToast');
    const closeBtn = toast.querySelector('.toast-close');
    
    closeBtn.addEventListener('click', () => {
        hideNotification();
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

function showNotification(title, message, type = 'info') {
    const toast = document.getElementById('notificationToast');
    const icon = toast.querySelector('.toast-icon i');
    const titleEl = toast.querySelector('.toast-content h4');
    const messageEl = toast.querySelector('.toast-content p');
    const progress = toast.querySelector('.toast-progress');
    
    // Set content
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Set icon based on type
    switch (type) {
        case 'success':
            icon.className = 'fas fa-check-circle';
            icon.style.color = '#10B981';
            break;
        case 'error':
            icon.className = 'fas fa-exclamation-circle';
            icon.style.color = '#EF4444';
            break;
        case 'warning':
            icon.className = 'fas fa-exclamation-triangle';
            icon.style.color = '#F59E0B';
            break;
        default:
            icon.className = 'fas fa-info-circle';
            icon.style.color = '#4A6FFF';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Reset and restart progress bar
    progress.style.animation = 'none';
    setTimeout(() => {
        progress.style.animation = 'toast-progress 5s linear forwards';
    }, 10);
    
    // Auto-hide
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

function hideNotification() {
    const toast = document.getElementById('notificationToast');
    toast.classList.remove('show');
}

/* ===== PROGRESS INDICATOR ===== */
function showProgressIndicator() {
    const indicator = document.getElementById('progressIndicator');
    const text = indicator.querySelector('.progress-text');
    
    indicator.classList.add('show');
    
    // Animate text
    const dots = ['.', '..', '...'];
    let dotIndex = 0;
    
    const dotInterval = setInterval(() => {
        text.textContent = `Loading${dots[dotIndex]}`;
        dotIndex = (dotIndex + 1) % dots.length;
    }, 300);
    
    // Store interval for cleanup
    indicator.dataset.interval = dotInterval;
}

function hideProgressIndicator() {
    const indicator = document.getElementById('progressIndicator');
    const interval = indicator.dataset.interval;
    
    clearInterval(interval);
    indicator.classList.remove('show');
}

/* ===== PAGE TRANSITIONS ===== */
function initPageTransitions() {
    // Add page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Handle internal link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && link.href.includes('.html')) {
            e.preventDefault();
            
            // Add exit animation
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.4s ease';
            
            setTimeout(() => {
                window.location.href = link.href;
            }, 400);
        }
    });
}

/* ===== AMBIENT ANIMATIONS ===== */
function startAmbientAnimations() {
    // Animate floating orbs
    const orbs = document.querySelectorAll('.orb');
    
    orbs.forEach(orb => {
        const speed = parseFloat(orb.dataset.speed) || 0.5;
        
        function floatOrb() {
            const time = Date.now() * 0.001 * speed;
            const x = Math.sin(time) * 20;
            const y = Math.cos(time * 0.7) * 15;
            
            orb.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.sin(time * 0.5) * 0.1})`;
            requestAnimationFrame(floatOrb);
        }
        
        floatOrb();
    });
}

/* ===== ERROR HANDLING ===== */
window.addEventListener('error', (e) => {
    console.error('System error:', e.error);
    
    // Graceful degradation
    if (e.message.includes('canvas')) {
        const neuralNetwork = document.querySelector('.neural-network');
        if (neuralNetwork) {
            neuralNetwork.innerHTML = '<p class="error-message">Visualization unavailable</p>';
        }
    }
    
    // Show error notification
    showNotification('System Error', 'Some features may be unavailable', 'error');
});

// Performance optimization
let lastFrameTime = 0;
const frameInterval = 1000 / 60; // 60 FPS

function optimizeAnimations(currentTime) {
    if (currentTime - lastFrameTime >= frameInterval) {
        // Update intensive animations here if needed
        lastFrameTime = currentTime;
    }
    requestAnimationFrame(optimizeAnimations);
}

// Start optimization
requestAnimationFrame(optimizeAnimations);

