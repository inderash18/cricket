import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const eventData = [
    { id: 1, title: "Pro Kabaddi League Trials", sport: "Kabaddi", district: "Chennai", date: "2025-12-20", venue: "Jawaharlal Nehru Stadium", status: "Upcoming" },
    { id: 2, title: "State Level Silambam Meet", sport: "Silambam", district: "Madurai", date: "2025-12-18", venue: "Tamukkam Grounds", status: "Upcoming" },
    { id: 3, title: "Junior Athletics Championship", sport: "Athletics", district: "Coimbatore", date: "2025-12-25", venue: "Nehru Stadium", status: "Upcoming" },
    { id: 4, title: "Chennai Open Chess", sport: "Chess", district: "Chennai", date: "2025-12-15", venue: "Chennai Trade Centre", status: "Today" },
    { id: 5, title: "District Badminton Cup", sport: "Badminton", district: "Salem", date: "2025-12-22", venue: "Salem Indoor Stadium", status: "Upcoming" },
    { id: 6, title: "Coastal Football League", sport: "Football", district: "Kanyakumari", date: "2025-12-30", venue: "Nagercoil Ground", status: "Upcoming" },
    { id: 7, title: "Thanjavur Art & Silambam", sport: "Silambam", district: "Thanjavur", date: "2025-12-28", venue: "Palace Grounds", status: "Upcoming" },
    { id: 8, title: "Trichy Marathon 2025", sport: "Athletics", district: "Trichy", date: "2026-01-05", venue: "Srirangam", status: "Upcoming" }
];

const Events = () => {
    const [filterSport, setFilterSport] = useState('');
    const [filterDistrict, setFilterDistrict] = useState('');
    const [userLocation, setUserLocation] = useState('Locating...');
    const navigate = useNavigate();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    const districts = ["Chennai", "Madurai", "Coimbatore", "Salem", "Trichy", "Tirunelveli"];
                    const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
                    setUserLocation(`📍 Detected: ${randomDistrict} (Tamil Nadu)`);
                },
                () => {
                    setUserLocation("📍 Location access denied. Showing all events.");
                }
            );
        } else {
            setUserLocation("Geolocation not supported.");
        }
    }, []);

    const filteredEvents = eventData.filter(event => {
        const matchesSport = filterSport === '' || event.sport === filterSport;
        const matchesDistrict = filterDistrict === '' || event.district === filterDistrict;
        return matchesSport && matchesDistrict;
    });

    const handleRegister = (eventId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert("Please login to register for events.");
            navigate('/login');
            return;
        }

        const users = JSON.parse(localStorage.getItem('tn_users')) || [];
        const userIndex = users.findIndex(u => u.email === user.email);

        if (userIndex === -1) return;

        const currentUser = users[userIndex];
        if (!currentUser.registeredEvents) currentUser.registeredEvents = [];

        if (currentUser.registeredEvents.includes(eventId)) {
            alert("You are already registered for this event!");
            return;
        }

        const event = eventData.find(e => e.id === eventId);
        currentUser.registeredEvents.push(eventId);

        users[userIndex] = currentUser;
        localStorage.setItem('tn_users', JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify(currentUser));

        alert(`Successfully registered for ${event.title}!`);
    };

    return (
        <div className="main-content">
            <div className="container" style={{ paddingTop: '40px' }}>
                <div className="section-head text-center">
                    <h2>Match Center</h2>
                    <p className="section-desc">Live scores, upcoming fixtures, and tournament schedules across Tamil Nadu.</p>
                    <p className="text-accent" style={{ marginTop: '10px' }}>{userLocation}</p>
                </div>

                <div className="glass-card" style={{ marginBottom: '40px', padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="text-secondary" style={{ fontWeight: '500' }}>FILTER BY:</span>
                    <select
                        className="form-control"
                        style={{ width: 'auto', height: '45px' }}
                        value={filterSport}
                        onChange={(e) => setFilterSport(e.target.value)}
                    >
                        <option value="">All Sports</option>
                        <option value="Kabaddi">Kabaddi</option>
                        <option value="Silambam">Silambam</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Football">Football</option>
                        <option value="Athletics">Athletics</option>
                        <option value="Badminton">Badminton</option>
                        <option value="Chess">Chess</option>
                    </select>
                    <select
                        className="form-control"
                        style={{ width: 'auto', height: '45px' }}
                        value={filterDistrict}
                        onChange={(e) => setFilterDistrict(e.target.value)}
                    >
                        <option value="">All Locations</option>
                        {["Chennai", "Madurai", "Coimbatore", "Salem", "Trichy", "Tirunelveli", "Thanjavur", "Kanyakumari"].map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                <div className="dashboard-grid">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => {
                            const isUpcoming = event.status === 'Upcoming';
                            const statusColor = isUpcoming ? '#28a745' : '#ffc107';
                            const dateObj = new Date(event.date);
                            const dateStr = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

                            return (
                                <div key={event.id} className="glass-card event-card" style={{ position: 'relative', overflow: 'hidden', borderLeft: `5px solid ${event.sport === 'Kabaddi' ? '#FFC20E' : '#007AFF'}` }}>
                                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: statusColor, color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                        {event.status.toUpperCase()}
                                    </div>

                                    <div className="card-content">
                                        <h3 className="text-primary" style={{ marginRight: '80px', marginBottom: '5px' }}>{event.title}</h3>
                                        <p className="text-sub" style={{ marginBottom: '15px' }}>📍 {event.venue}, <strong>{event.district}</strong></p>

                                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '5px' }}>
                                            <div>
                                                <span style={{ display: 'block', fontSize: '0.8rem', color: '#888' }}>DATE</span>
                                                <span style={{ fontWeight: 600 }}>{dateStr}</span>
                                            </div>
                                            <div>
                                                <span style={{ display: 'block', fontSize: '0.8rem', color: '#888' }}>SPORT</span>
                                                <span style={{ fontWeight: 600 }}>{event.sport}</span>
                                            </div>
                                            <div>
                                                <span style={{ display: 'block', fontSize: '0.8rem', color: '#888' }}>ENTRY</span>
                                                <span style={{ fontWeight: 600, color: '#28a745' }}>Free</span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button className="btn btn-primary" onClick={() => handleRegister(event.id)} style={{ flex: 1 }}>Register</button>
                                            <button className="btn btn-secondary" style={{ padding: '10px 15px' }} title="Share">🔗</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#666' }}>
                            <h3>No events found matching your filters.</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;
