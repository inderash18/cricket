document.addEventListener('DOMContentLoaded', () => {
  const sportSelect = document.getElementById('filter-sport');
  const districtSelect = document.getElementById('filter-district');
  const container = document.getElementById('events-container');

  function applyFilters() {
    const sport = sportSelect?.value?.toLowerCase() || '';
    const district = districtSelect?.value?.toLowerCase() || '';
    Array.from(container.querySelectorAll('.event-card')).forEach(card => {
      const text = card.textContent.toLowerCase();
      const matches = (sport === '' || text.includes(sport)) && (district === '' || text.includes(district));
      card.style.display = matches ? '' : 'none';
    });
  }

  sportSelect && sportSelect.addEventListener('change', applyFilters);
  districtSelect && districtSelect.addEventListener('change', applyFilters);
});
const eventsApp = {
    data: [
        { id: 1, title: "Pro Kabaddi League Trials", sport: "Kabaddi", district: "Chennai", date: "2025-12-20", venue: "Jawaharlal Nehru Stadium", status: "Upcoming" },
        { id: 2, title: "State Level Silambam Meet", sport: "Silambam", district: "Madurai", date: "2025-12-18", venue: "Tamukkam Grounds", status: "Upcoming" },
        { id: 3, title: "Junior Athletics Championship", sport: "Athletics", district: "Coimbatore", date: "2025-12-25", venue: "Nehru Stadium", status: "Upcoming" },
        { id: 4, title: "Chennai Open Chess", sport: "Chess", district: "Chennai", date: "2025-12-15", venue: "Chennai Trade Centre", status: "Today" },
        { id: 5, title: "District Badminton Cup", sport: "Badminton", district: "Salem", date: "2025-12-22", venue: "Salem Indoor Stadium", status: "Upcoming" },
        { id: 6, title: "Coastal Football League", sport: "Football", district: "Kanyakumari", date: "2025-12-30", venue: "Nagercoil Ground", status: "Upcoming" },
        { id: 7, title: "Thanjavur Art & Silambam", sport: "Silambam", district: "Thanjavur", date: "2025-12-28", venue: "Palace Grounds", status: "Upcoming" },
        { id: 8, title: "Trichy Marathon 2025", sport: "Athletics", district: "Trichy", date: "2026-01-05", venue: "Srirangam", status: "Upcoming" }
    ],

    init: () => {
        eventsApp.detectLocation();
        eventsApp.renderEvents(eventsApp.data);
        eventsApp.bindFilters();
    },

    detectLocation: () => {
        const locDisplay = document.getElementById('user-location');
        if (!locDisplay) return;

        if (navigator.geolocation) {
            locDisplay.textContent = "Detecting location...";
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Simulate mapping to a TN district
                    const districts = ["Chennai", "Madurai", "Coimbatore", "Salem", "Trichy", "Tirunelveli"];
                    const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
                    locDisplay.textContent = `📍 Detected: ${randomDistrict} (Tamil Nadu)`;

                    // Filter by this district initially? Optional. 
                    // Let's just show a toast or highlight.
                    console.log(`User at ${position.coords.latitude}, ${position.coords.longitude} -> Mapped to ${randomDistrict}`);
                },
                (error) => {
                    locDisplay.textContent = "📍 Location access denied. Showing all events.";
                }
            );
        } else {
            locDisplay.textContent = "Geolocation not supported.";
        }
    },

    renderEvents: (events) => {
        const container = document.getElementById('events-container');
        if (!container) return;

        if (events.length === 0) {
            container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
                <h3>No events found matching your filters.</h3>
            </div>`;
            return;
        }

        container.innerHTML = events.map(event => {
            const isUpcoming = event.status === 'Upcoming';
            const statusColor = isUpcoming ? '#28a745' : '#ffc107'; // Green or Yellow/Orange
            const dateObj = new Date(event.date);
            const dateStr = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

            return `
            <div class="glass-card event-card" style="position: relative; overflow: hidden; border-left: 5px solid ${event.sport === 'Kabaddi' ? '#FFC20E' : '#003399'};">
                <div style="position: absolute; top: 15px; right: 15px; background: ${statusColor}; color: white; padding: 2px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: bold;">
                    ${event.status.toUpperCase()}
                </div>
                
                <h3 class="text-primary" style="margin-right: 80px; margin-bottom: 5px;">${event.title}</h3>
                <p class="text-sub" style="margin-bottom: 15px;"><i style="margin-right:5px">📍</i>${event.venue}, <strong>${event.district}</strong></p>
                
                <div style="display: flex; gap: 20px; margin-bottom: 20px; background: #f9f9f9; padding: 10px; border-radius: 5px;">
                    <div>
                        <span style="display: block; font-size: 0.8rem; color: #888;">DATE</span>
                        <span style="font-weight: 600;">${dateStr}</span>
                    </div>
                    <div>
                        <span style="display: block; font-size: 0.8rem; color: #888;">SPORT</span>
                        <span style="font-weight: 600;">${event.sport}</span>
                    </div>
                    <div>
                         <span style="display: block; font-size: 0.8rem; color: #888;">ENTRY</span>
                         <span style="font-weight: 600; color: #28a745;">Free</span>
                    </div>
                </div>

                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" onclick="eventsApp.registerEvent(${event.id})" style="flex: 1;">Register</button>
                    <button class="btn btn-secondary" style="padding: 10px 15px;" title="Share"><i class="icon">🔗</i></button>
                </div>
            </div>
        `}).join('');
    },

    bindFilters: () => {
        const sportFilter = document.getElementById('filter-sport');
        const districtFilter = document.getElementById('filter-district');

        const applyFilters = () => {
            let filtered = eventsApp.data;
            if (sportFilter && sportFilter.value) {
                filtered = filtered.filter(e => e.sport === sportFilter.value);
            }
            if (districtFilter && districtFilter.value) {
                filtered = filtered.filter(e => e.district === districtFilter.value);
            }
            eventsApp.renderEvents(filtered);
        };

        if (sportFilter) sportFilter.addEventListener('change', applyFilters);
        if (districtFilter) districtFilter.addEventListener('change', applyFilters);
    },

    registerEvent: (eventId) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            alert("Please login to register for events.");
            window.location.href = 'login.html';
            return;
        }

        // Get fresh user data from local storage to update persistent record
        const users = JSON.parse(localStorage.getItem('tn_users')) || [];
        const userIndex = users.findIndex(u => u.email === user.email);

        if (userIndex === -1) {
            console.error("User record not found");
            return;
        }

        const currentUser = users[userIndex];
        if (!currentUser.registeredEvents) currentUser.registeredEvents = [];

        if (currentUser.registeredEvents.includes(eventId)) {
            alert("You are already registered for this event!");
            return;
        }

        const event = eventsApp.data.find(e => e.id === eventId);
        currentUser.registeredEvents.push(eventId);

        // Update LocalStorage
        users[userIndex] = currentUser;
        localStorage.setItem('tn_users', JSON.stringify(users));

        // Update SessionStorage
        sessionStorage.setItem('user', JSON.stringify(currentUser));

        alert(`Successfully registered for ${event.title}!`);
    }
};

document.addEventListener('DOMContentLoaded', eventsApp.init);
