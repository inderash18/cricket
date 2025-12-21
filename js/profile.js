document.addEventListener('DOMContentLoaded', () => {
  // Basic profile loader (reads demo user from localStorage)
  const raw = localStorage.getItem('tn_current_user');
  if (raw) {
    try{
      const user = JSON.parse(raw);
      document.getElementById('p-name') && (document.getElementById('p-name').textContent = user.name || '');
    }catch(e){}
  }
});
