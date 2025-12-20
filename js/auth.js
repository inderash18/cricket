// auth.js - Handles Login and Registration

const auth = {
    register: (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const district = form.district.value;
        const sport = form.sport.value;
        const password = form.password.value;

        if (!name || !email || !password || !district || !sport) {
            alert("Please fill in all fields.");
            return;
        }

        const users = JSON.parse(localStorage.getItem('tn_users')) || [];

        if (users.find(u => u.email === email)) {
            alert("Email already registered!");
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            district,
            sport,
            password,
            registeredEvents: [] // To track their events
        };

        users.push(newUser);
        localStorage.setItem('tn_users', JSON.stringify(users));

        alert("Registration Successful! Please login.");
        window.location.href = 'login.html';
    },

    login: (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value.trim();
        const password = form.password.value;

        const users = JSON.parse(localStorage.getItem('tn_users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Success
            const sessionUser = { ...user };
            delete sessionUser.password; // Don't store password in session
            sessionStorage.setItem('user', JSON.stringify(sessionUser));

            // Also update app state if main.js is loaded
            if (typeof app !== 'undefined') {
                app.state.currentUser = sessionUser;
            }

            alert("Welcome back, " + user.name + "!");
            window.location.href = 'dashboard.html';
        } else {
            alert("Invalid email or password.");
        }
    }
};

// Bind events if forms exist
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', auth.login);
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', auth.register);
    }
});
