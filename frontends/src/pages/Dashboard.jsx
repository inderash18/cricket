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

const Dashboard = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [talentCount, setTalentCount] = useState(0);
    const [nearbyEvents, setNearbyEvents] = useState([]);
    const [dailyTip, setDailyTip] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Count talents
        const talents = JSON.parse(localStorage.getItem('tn_talents')) || [];
        const userTalentsCount = talents.filter(t => t.uploader === user.name).length;
        setTalentCount(userTalentsCount);

        // Nearby events
        const nearby = eventData.filter(e => e.district === user.district);
        setNearbyEvents(nearby);

        // Random Tip
        const tips = [
            { title: "Hydration is Key", content: "Drink at least 3 liters of water. Coconut water is nature's sports drink." },
            { title: "Kabaddi Stance", content: "Keep your center of gravity low. It makes you harder to tackle." },
            { title: "Silambam Wrist Work", content: "Practice figure-8 rotations for flexibility." },
            { title: "Rest & Recover", content: "Muscles grow when you rest, not when you train. Get 8 hours of sleep." }
        ];
        setDailyTip(tips[Math.floor(Math.random() * tips.length)]);
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="main-content">
            <div className="container" style={{ paddingTop: '40px' }}>
                <div className="fade-in">
                    <h1 id="welcome-msg" style={{ marginBottom: '10px' }}>Vanakkam, {user.name}!</h1>
                    <p className="text-accent" style={{ marginBottom: '30px', fontSize: '1.1rem' }}>📍 {user.district}, Tamil Nadu</p>
                </div>

                <div className="dashboard-grid">
                    <div className="glass-card icon-card">
                        <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-brand-primary)' }}>{user.registeredEvents?.length || 0}</div>
                        <p style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', marginTop: '10px' }}>Events Registered</p>
                    </div>
                    <div className="glass-card icon-card">
                        <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-brand-primary)' }}>{talentCount}</div>
                        <p style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', marginTop: '10px' }}>Talents Uploaded</p>
                    </div>
                    <div className="glass-card icon-card">
                        <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-brand-primary)' }}>TN</div>
                        <p style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', marginTop: '10px' }}>{user.district}</p>
                    </div>
                </div>

                <h2 className="text-primary" style={{ marginTop: '50px', marginBottom: '20px' }}>Nearby Events</h2>
                <div className="dashboard-grid">
                    {nearbyEvents.length > 0 ? (
                        nearbyEvents.map(event => (
                            <div key={event.id} className="glass-card" style={{ padding: '25px' }}>
                                <span style={{ background: 'var(--color-brand-secondary)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>{event.status}</span>
                                <h3 className="text-primary" style={{ marginTop: '15px' }}>{event.title}</h3>
                                <p style={{ margin: '10px 0', fontSize: '0.9rem' }}><strong>Venue:</strong> {event.venue}</p>
                                <p style={{ marginBottom: '20px', fontSize: '0.9rem' }}><strong>Date:</strong> {event.date}</p>
                                <button className="btn btn-primary" style={{ width: '100%', padding: '10px' }} onClick={() => navigate('/events')}>Register</button>
                            </div>
                        ))
                    ) : (
                        <div className="glass-card" style={{ gridColumn: '1/-1', padding: '30px', textAlign: 'center' }}>
                            <p>No upcoming events found in your district specifically. Check the Events page for more!</p>
                        </div>
                    )}
                </div>

                <h2 className="text-primary" style={{ marginTop: '50px', marginBottom: '20px' }}>Daily Training Tip</h2>
                <div className="glass-card" style={{ padding: '30px', borderLeft: '5px solid var(--color-brand-primary)' }}>
                    <h3 style={{ marginBottom: '10px' }}>{dailyTip.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>"{dailyTip.content}"</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
