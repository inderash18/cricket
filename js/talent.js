document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('talent-search');
  const grid = document.getElementById('talent-grid') || document.querySelector('.talent-grid');
  const cards = grid ? Array.from(grid.querySelectorAll('.talent-card')) : [];
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));

  function applyFilter(query = '', sport = 'all') {
    const q = query.trim().toLowerCase();
    let visible = 0;
    const list = grid || document.querySelector('.talent-grid');
    if (!list) return;
    const items = Array.from(list.querySelectorAll('.talent-card'));
    items.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const city = (card.dataset.city || '').toLowerCase();
      const cardSport = (card.dataset.sport || '').toLowerCase();
      const matchesText = q === '' || name.includes(q) || city.includes(q) || cardSport.includes(q);
      const matchesSport = sport === 'all' || cardSport === sport;
      const shouldShow = matchesText && matchesSport;
      card.style.display = shouldShow ? '' : 'none';
      if (shouldShow) visible++;
    });
    list.setAttribute('data-visible', visible);
  }

  let debounceTimer;
  if (searchInput) searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const activeFilter = document.querySelector('.filter-btn.active')?.dataset.sport || 'all';
      applyFilter(e.target.value, activeFilter);
    }, 160);
  });

  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(searchInput?.value || '', btn.dataset.sport);
  }));

  // Reveal animations
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.talent-card').forEach(c => io.observe(c));

  // Modal handling (if modal exists)
  const modal = document.getElementById('talent-modal');
  if (modal) {
    const modalBackdrop = modal.querySelector('[data-close]');
    const modalImg = modal.querySelector('.modal-media img');
    const modalName = modal.querySelector('.modal-name');
    const modalRole = modal.querySelector('.modal-role');
    const modalStats = modal.querySelector('.modal-stats');
    const modalBio = modal.querySelector('.modal-bio');

    function openModalFromCard(card) {
      const img = card.querySelector('img')?.src || '';
      const name = card.dataset.name || '';
      const sport = card.dataset.sport || '';
      const city = card.dataset.city || '';
      const stats = Array.from(card.querySelectorAll('.stats span')).map(s => s.textContent).join(' • ');
      modalImg.src = img; modalImg.alt = name;
      modalName.textContent = name;
      modalRole.textContent = `${sport} • ${city}`;
      modalStats.innerHTML = `<span>${stats}</span>`;
      modalBio.textContent = `Profile highlights for ${name}.`;
      modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    }

    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-details');
      if (btn) {
        const card = btn.closest('.talent-card');
        if (card) openModalFromCard(card);
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]') || e.target === modal) {
        modal.setAttribute('aria-hidden','true'); document.body.style.overflow='';
      }
    });
    document.addEventListener('keydown', (e) => { if (e.key==='Escape') modal.setAttribute('aria-hidden','true'); });
  }

  // Initial filter
  applyFilter('', 'all');
});
const talentApp = {
    sampleData: [
        { id: 101, title: "Silambam Spin", uploader: "Ravi Kumar", district: "Madurai", sport: "Silambam", desc: "My fastest rotation record!", media: "../assets/pexels-tyler-hendy-9620-54123.jpg" },
        { id: 102, title: "Kabaddi Raid", uploader: "Anitha S", district: "Chennai", sport: "Kabaddi", desc: "Winning raid point in finals.", media: "../assets/pexels-shootsaga-31759373.jpg" },
    ],

    init: () => {
        // Load talents
        const stored = JSON.parse(localStorage.getItem('tn_talents'));
        if (!stored) {
            localStorage.setItem('tn_talents', JSON.stringify(talentApp.sampleData));
        }
        talentApp.renderTalents();

        const form = document.getElementById('talent-form');
        if (form) {
            form.addEventListener('submit', talentApp.uploadTalent);
        }

        talentApp.bindFilters();
    },

    renderTalents: (filterSport = '', filterDistrict = '') => {
        const grid = document.getElementById('talent-grid');
        if (!grid) return;

        let talents = JSON.parse(localStorage.getItem('tn_talents')) || [];

        if (filterSport) talents = talents.filter(t => t.sport === filterSport);
        if (filterDistrict) talents = talents.filter(t => t.district === filterDistrict);

        if (talents.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #777;">No talents found. Be the first to upload!</div>`;
            return;
        }

        grid.innerHTML = talents.map(t => {
            // Simulate random stats for demo
            const likes = t.likes || Math.floor(Math.random() * 500) + 50;
            const views = t.views || Math.floor(Math.random() * 2000) + 200;

            return `
            <div class="glass-card talent-card fade-in" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                <div style="position: relative; height: 200px; background: #000;">
                    <img src="${t.media}" alt="${t.title}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9;" onerror="this.src='https://via.placeholder.com/300?text=No+Media'">
                    <span style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem;">${t.sport}</span>
                </div>
                
                <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
                    <h3 style="margin-bottom: 5px; font-size: 1.25rem;">${t.title}</h3>
                    <p class="text-sub" style="font-size: 0.9rem; margin-bottom: 10px;">by <span class="text-primary">${t.uploader}</span> • ${t.district}</p>
                    
                    <p style="margin-bottom: 20px; flex: 1; font-size: 0.95rem; color: #555;">${t.desc}</p>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 15px;">
                        <div style="display: flex; gap: 15px; font-size: 0.9rem; color: #777;">
                            <span>❤️ ${likes}</span>
                            <span>👁️ ${views}</span>
                        </div>
                        <button class="btn btn-secondary" style="padding: 5px 15px; font-size: 0.8rem;">View Profile</button>
                    </div>
                </div>
            </div>
        `}).join('');
    },

    uploadTalent: (e) => {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            alert("Login required to upload talent.");
            window.location.href = 'login.html';
            return;
        }

        const form = e.target;
        const newTalent = {
            id: Date.now(),
            title: form.title.value,
            media: form.media.value,
            desc: form.desc.value,
            sport: form.sport.value,
            district: user.district, // Auto-tag user district or allow select
            uploader: user.name
        };

        const talents = JSON.parse(localStorage.getItem('tn_talents')) || [];
        talents.unshift(newTalent);
        localStorage.setItem('tn_talents', JSON.stringify(talents));

        alert("Talent uploaded successfully!");
        form.reset();
        talentApp.renderTalents();
    },

    bindFilters: () => {
        const sFilter = document.getElementById('t-filter-sport');
        const dFilter = document.getElementById('t-filter-district');

        const refresh = () => {
            talentApp.renderTalents(sFilter ? sFilter.value : '', dFilter ? dFilter.value : '');
        };

        if (sFilter) sFilter.addEventListener('change', refresh);
        if (dFilter) dFilter.addEventListener('change', refresh);
    }
};

document.addEventListener('DOMContentLoaded', talentApp.init);
