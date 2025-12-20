const app = {
    state: {
        currentUser: JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user')) || null,
        theme: 'light' // Nivia style is inherently light
    },

    init: () => {
        app.handleSplash();
        app.applyTheme(); // Defaults to dark now from CSS, checking logic
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
        // Enforce dark mode as per new Premium Design
        document.documentElement.setAttribute('data-theme', 'dark');
        // Optional: Toggle icon logic can remain if we strictly want only dark, 
        // but for now let's just ensure defaults are correct.
    },

    toggleTheme: () => {
        // Locked to Dark Mode for Premium Feel
        console.log("Theme is locked to Premium Dark Mode");
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
        const btnStyle = 'padding: 8px 20px; font-size: 0.85rem;'; // Inline override for nav specific sizes

        if (isAuth) {
            authHTML = `
                <div class="nav-auth-container">
                     <a href="dashboard.html" class="btn btn-primary" style="${btnStyle}">Dashboard</a>
                     <a href="#" id="logout-btn" class="btn btn-secondary" style="${btnStyle}; border-color: #ff4444; color: #ff4444;">Logout</a>
                </div>
            `;
        } else {
            authHTML = `
                <div class="nav-auth-container">
                    <a href="login.html" class="btn btn-secondary" style="${btnStyle}">Login</a>
                    <a href="register.html" class="btn btn-primary" style="${btnStyle}">Join Now</a>
                </div>
            `;
        }

        const navHTML = `
            <div class="navbar-inner container">
                <a href="index.html" class="logo">
                     TN <span>SPORTS</span>
                </a>
                
                <button class="nav-toggle" id="nav-toggle" style="color: white;">☰</button>
                
                <div class="nav-links" id="nav-links">
                    ${links.map(link => `<a href="${link.href}" class="${location.pathname.includes(link.href) ? 'active' : ''}">${link.name}</a>`).join('')}
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
