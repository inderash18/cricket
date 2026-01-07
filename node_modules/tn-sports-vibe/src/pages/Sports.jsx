import React, { useState, useEffect } from 'react';

const Sports = () => {
    const [streak, setStreak] = useState(parseInt(localStorage.getItem('streak') || '0'));
    const [progress, setProgress] = useState(JSON.parse(localStorage.getItem('daily_progress')) || [false, false, false]);

    const handleToggle = (index) => {
        const newProgress = [...progress];
        newProgress[index] = !newProgress[index];
        setProgress(newProgress);
        localStorage.setItem('daily_progress', JSON.stringify(newProgress));

        if (newProgress.every(Boolean)) {
            // Just for demo, normally would check if already incremented today
            const newStreak = streak + 1;
            setStreak(newStreak);
            localStorage.setItem('streak', newStreak.toString());
        }
    };

    return (
        <div className="section-padding container">
            <div className="section-head text-center" style={{ marginTop: '40px' }}>
                <h2>Sports Encyclopedia</h2>
                <p className="section-desc">Unlock the mechanics, history, and strategies of the games we love.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                {/* Sport Card 1 */}
                <div className="glass-card sport-pill-card" style={{ display: 'block', padding: '0' }}>
                    <div style={{ height: '200px', background: "url('/assets/pexels-shootsaga-31759373.jpg') center/cover", position: 'relative' }}>
                        <div style={{ position: 'absolute', bottom: '0', left: '0', padding: '20px', background: 'linear-gradient(to top, black, transparent)', width: '100%' }}>
                            <h3 style={{ margin: '0', color: 'white' }}>Kabaddi</h3>
                        </div>
                    </div>
                    <div style={{ padding: '24px' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>The primal game of tag and tackle. Originating from Tamil Nadu, showing strength and breath control.</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span className="badge" style={{ background: 'rgba(255,215,0,0.1)', color: 'var(--color-brand-primary)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>CONTACT SPORT</span>
                            <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>TEAM</span>
                        </div>
                    </div>
                </div>

                {/* Sport Card 2 */}
                <div className="glass-card sport-pill-card" style={{ display: 'block', padding: '0' }}>
                    <div style={{ height: '200px', background: "url('/assets/pexels-pixelcop-2799556.jpg') center/cover", position: 'relative' }}>
                        <div style={{ position: 'absolute', bottom: '0', left: '0', padding: '20px', background: 'linear-gradient(to top, black, transparent)', width: '100%' }}>
                            <h3 style={{ margin: '0', color: 'white' }}>Cricket</h3>
                        </div>
                    </div>
                    <div style={{ padding: '24px' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>More than a game, it's a religion in Chennai. From Gully cricket to the electric atmosphere of Chepauk.</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span className="badge" style={{ background: 'rgba(255,215,0,0.1)', color: 'var(--color-brand-primary)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>STRATEGY</span>
                            <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>TEAM</span>
                        </div>
                    </div>
                </div>

                {/* Sport Card 3 */}
                <div className="glass-card sport-pill-card" style={{ display: 'block', padding: '0' }}>
                    <div style={{ height: '200px', background: "url('/assets/pexels-tyler-hendy-9620-54123.jpg') top/cover", position: 'relative' }}>
                        <div style={{ position: 'absolute', bottom: '0', left: '0', padding: '20px', background: 'linear-gradient(to top, black, transparent)', width: '100%' }}>
                            <h3 style={{ margin: '0', color: 'white' }}>Silambam</h3>
                        </div>
                    </div>
                    <div style={{ padding: '24px' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Ancient martial art using bamboo staff. A display of agility, focus, and traditional warfare skills.</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span className="badge" style={{ background: 'rgba(255,215,0,0.1)', color: 'var(--color-brand-primary)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>MARTIAL ART</span>
                            <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>INDIVIDUAL</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skill Growth Zone */}
            <div className="glass-card" style={{ marginTop: '60px', padding: '40px', borderLeft: '5px solid var(--color-brand-primary)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <h2 className="text-primary" style={{ marginBottom: '20px' }}>🚀 Daily Training Ground</h2>
                        <p className="text-secondary" style={{ marginBottom: '30px' }}>Consistency is what separates the amateur from the pro. Track your daily drills here.</p>

                        <div style={{ display: 'grid', gap: '15px' }}>
                            {[
                                { id: 0, text: '🏃 15 mins Warm-up (Jog/Stretch)' },
                                { id: 1, text: '🎯 30 mins Core Skill Drill' },
                                { id: 2, text: '💧 Hydration Check (1L Water)' }
                            ].map((item) => (
                                <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={progress[item.id]}
                                        onChange={() => handleToggle(item.id)}
                                        style={{ width: '20px', height: '20px', accentColor: 'var(--color-brand-primary)' }}
                                    />
                                    <span style={{ fontSize: '1.1rem' }}>{item.text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}>
                        <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '10px solid var(--color-brand-secondary)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <span style={{ fontSize: '4rem', fontWeight: '800', color: 'white' }}>{streak}</span>
                            <span style={{ textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '2px' }}>Day Streak</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sports;
