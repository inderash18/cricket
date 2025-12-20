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
