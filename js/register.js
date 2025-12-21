document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = {
      name: form.name.value,
      email: form.email.value,
      district: form.district.value,
      sport: form.sport.value
    };
    // Save demo user
    localStorage.setItem('tn_current_user', JSON.stringify(user));
    alert('Registered — redirecting to profile');
    window.location.href = 'profile.html';
  });
});
