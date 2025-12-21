document.addEventListener('DOMContentLoaded', () => {
  // Small helper for sports page (save checklist)
  window.saveProgress = function(){
    const checks = [
      !!document.getElementById('check1')?.checked,
      !!document.getElementById('check2')?.checked,
      !!document.getElementById('check3')?.checked,
      !!document.getElementById('check4')?.checked
    ];
    localStorage.setItem('daily_progress', JSON.stringify(checks));
  }
});
