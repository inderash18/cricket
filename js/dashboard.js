document.addEventListener('DOMContentLoaded', () => {
  // Simple dashboard initializer
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  // Populate counts demo
  document.getElementById('event-count') && (document.getElementById('event-count').textContent = '8');
  document.getElementById('talent-count') && (document.getElementById('talent-count').textContent = '320');
});
