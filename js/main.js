const app = {
    state: {
        currentUser: JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user')) || null,
        theme: 'light' // Nivia style is inherently light
    },

    init: () => {
        app.handleSplash();
        app.applyTheme();
        app.renderNavbar();
        app.attachEvents();
    },

    handleSplash: () => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            // Wait for animation to finish approx
            setTimeout(() => {
                splash.classList.add('hidden');
            }, 3500);
        }
    },

    applyTheme: () => {
        document.documentElement.setAttribute('data-theme', app.state.theme);
        const icon = document.getElementById('theme-icon');
        if (icon) icon.textContent = app.state.theme === 'light' ? '🌙' : '☀️';
    },

    toggleTheme: () => {
        app.state.theme = app.state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', app.state.theme);
        app.applyTheme();
    },

    renderNavbar: () => {
        const navContainer = document.getElementById('main-nav');
        if (!navContainer) return;

        // Force clear
        navContainer.innerHTML = '';

        const isAuth = !!app.state.currentUser;
        const links = [
            { name: 'Home', href: 'index.html' },
            { name: 'Sports', href: 'sports.html' },
            { name: 'Events', href: 'events.html' },
            { name: 'Talent', href: 'talent.html' },
        ];

        let authHTML = '';
        if (isAuth) {
            authHTML = `
                <div class="nav-auth-container">
                     <a href="dashboard.html" class="nav-auth-btn btn-login">Dashboard</a>
                     <a href="#" id="logout-btn" class="nav-auth-btn" style="color: #ff4444; border:none;">Logout</a>
                </div>
            `;
        } else {
            authHTML = `
                <div class="nav-auth-container">
                    <a href="login.html" class="nav-auth-btn btn-login">Login</a>
                    <a href="register.html" class="nav-auth-btn btn-join">Join Now</a>
                </div>
            `;
        }

        const navHTML = `
            <div class="navbar-inner">
                <a href="index.html" class="logo">
                     AREA <span>TALENTS</span>
                </a>
                
                <button class="nav-toggle" id="nav-toggle">☰</button>
                
                <div class="nav-links" id="nav-links">
                    ${links.map(link => `<a href="${link.href}" class="${location.pathname.includes(link.href) ? 'active' : ''}">${link.name}</a>`).join('')}
                    <a href="model.html">Shop</a>
                </div>

                ${authHTML}
            </div>
        `;

        navContainer.innerHTML = navHTML;
        navContainer.className = 'navbar'; // Base class

        // Scroll Logic reused
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navContainer.classList.add('scrolled');
            } else {
                navContainer.classList.remove('scrolled');
            }
        });

        // Event listeners for nav
        // Event listeners for nav

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                app.logout();
            });
        }

        document.getElementById('nav-toggle').addEventListener('click', () => {
            document.getElementById('nav-links').classList.toggle('active');
        });
    },

    logout: () => {
        localStorage.removeItem('user'); // For persistent login if implemented
        sessionStorage.removeItem('user');
        alert('Logged out successfully');
        window.location.href = 'index.html';
    },

    attachEvents: () => {
        // Common global events if any
    },

    requireAuth: () => {
        if (!app.state.currentUser) {
            window.location.href = 'login.html';
        }
    }
};

document.addEventListener('DOMContentLoaded', app.init);
