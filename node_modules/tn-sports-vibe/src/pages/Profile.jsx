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

const Profile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [myEvents, setMyEvents] = useState([]);
    const [myTalents, setMyTalents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Lookup my events
        const registered = eventData.filter(e => user.registeredEvents?.includes(e.id));
        setMyEvents(registered);

        // Lookup my talents
        const allTalents = JSON.parse(localStorage.getItem('tn_talents')) || [];
        const userTalents = allTalents.filter(t => t.uploader === user.name);
        setMyTalents(userTalents);
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    if (!user) return null;

    return (
        <div className="main-content">
            <div className="container" style={{ paddingTop: '40px' }}>
                <div className="glass-card fade-in" style={{ padding: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <h1 className="text-primary" style={{ fontSize: '3rem', marginBottom: '10px' }}>{user.name}</h1>
                            <p style={{ fontSize: '1.2rem', marginBottom: '5px' }}>District: <span className="text-accent">{user.district}</span></p>
                            <p style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Sport: {user.sport}</p>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Email: {user.email}</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-brand-secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '4rem', margin: '0 auto', color: '#fff' }}>
                                👤
                            </div>
                            <button className="btn btn-secondary" style={{ marginTop: '20px', fontSize: '0.9rem', borderColor: '#ff4444', color: '#ff4444' }} onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '50px' }}>
                    <h2 className="text-primary" style={{ marginBottom: '20px' }}>Registered Events</h2>
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {myEvents.length > 0 ? (
                            myEvents.map(e => (
                                <div key={e.id} className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 className="text-accent" style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{e.title}</h4>
                                        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{e.date} @ {e.venue}</p>
                                    </div>
                                    <span style={{ background: 'var(--color-brand-primary)', color: 'black', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>{e.status.toUpperCase()}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-secondary">No events registered yet.</p>
                        )}
                    </div>
                </div>

                <div style={{ marginTop: '50px' }}>
                    <h2 className="text-primary" style={{ marginBottom: '20px' }}>My Uploads</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                        {myTalents.length > 0 ? (
                            myTalents.map(t => (
                                <div key={t.id} className="glass-card" style={{ padding: '15px' }}>
                                    <img src={t.media} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} alt={t.title} />
                                    <h4 style={{ marginTop: '15px' }}>{t.title}</h4>
                                </div>
                            ))
                        ) : (
                            <p className="text-secondary">No talents uploaded yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
