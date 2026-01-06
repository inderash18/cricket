import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialTalents = [
    { id: 101, title: "Silambam Spin", uploader: "Ravi Kumar", district: "Madurai", sport: "Silambam", desc: "My fastest rotation record!", media: "/assets/pexels-tyler-hendy-9620-54123.jpg", likes: 120, views: 500 },
    { id: 102, title: "Kabaddi Raid", uploader: "Anitha S", district: "Chennai", sport: "Kabaddi", desc: "Winning raid point in finals.", media: "/assets/pexels-shootsaga-31759373.jpg", likes: 340, views: 1200 },
    { id: 103, title: "Fast Bowling Tips", uploader: "Karthik", district: "Salem", sport: "Cricket", desc: "How to hit 140kmph consistently.", media: "/assets/pexels-pixelcop-2799556.jpg", likes: 890, views: 4500 },
];

const Talent = () => {
    const [talents, setTalents] = useState(JSON.parse(localStorage.getItem('tn_talents')) || initialTalents);
    const navigate = useNavigate();

    const handleUploadClick = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert("Please login to upload your talent.");
            navigate('/login');
            return;
        }
        alert('Upload Modal would appear here in a full app!');
    };

    return (
        <div className="main-content">
            <div className="container" style={{ paddingTop: '40px' }}>
                <div className="section-head text-center">
                    <h2>Talent Spotlight</h2>
                    <p className="section-desc">The stage is yours. Witness the raw potential of Tamil Nadu's next generation athletes.</p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginBottom: '50px' }}>
                    <div className="glass-card" style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '30px' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Upload Your Reels</h3>
                            <p className="text-secondary">Get scouted by top academies.</p>
                        </div>
                        <button className="btn btn-primary" onClick={handleUploadClick}>Create +</button>
                    </div>
                    <div className="glass-card" style={{ flex: '1', minWidth: '300px', padding: '30px', display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <div>
                            <span style={{ display: 'block', fontSize: '2rem', fontWeight: 800, color: 'white' }}>320+</span>
                            <span className="text-secondary" style={{ fontSize: '0.9rem' }}>New Videos Today</span>
                        </div>
                        <div>
                            <span style={{ display: 'block', fontSize: '2rem', fontWeight: 800, color: 'white' }}>15</span>
                            <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Scouts Active</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                    {talents.map(t => (
                        <div key={t.id} className="glass-card talent-card fade-in" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative', height: '200px', background: '#000' }}>
                                <img
                                    src={t.media}
                                    alt={t.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Media' }}
                                />
                                <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>{t.sport}</span>
                            </div>

                            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginBottom: '5px', fontSize: '1.25rem' }}>{t.title}</h3>
                                <p className="text-sub" style={{ fontSize: '0.9rem', marginBottom: '10px' }}>by <span className="text-primary">{t.uploader}</span> • {t.district}</p>

                                <p style={{ marginBottom: '20px', flex: 1, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{t.desc}</p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                                    <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        <span>❤️ {t.likes || 0}</span>
                                        <span>👁️ {t.views || 0}</span>
                                    </div>
                                    <button className="btn btn-secondary" style={{ padding: '5px 15px', fontSize: '0.8rem' }}>View Profile</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Talent;
