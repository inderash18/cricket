document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value;
    const pass = form.password.value;
    if (!email || !pass) return alert('Please enter email and password');
    // Demo: set current user
    localStorage.setItem('tn_current_user', JSON.stringify({name: email.split('@')[0], email}));
    window.location.href = 'profile.html';
  });
});
