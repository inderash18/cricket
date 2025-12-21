document.addEventListener('DOMContentLoaded', () => {
  // Index-specific enhancements placeholder
  // e.g., lazy-load videos or initialize hero interactions
  const vids = document.querySelectorAll('video[autoplay]');
  vids.forEach(v => { v.muted = true; try{ v.play(); }catch(e){} });
});
