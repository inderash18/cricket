import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, History, Users } from 'lucide-react';

const Home = () => {
    return (
        <main>
            <header className="hero">
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/assets/pexels-pixelcop-2799556.jpg"
                >
                    <source src="/assets/web asset.mp4" type="video/mp4" />
                </video>
                <div className="hero-content fade-in">
                    <h1 className="indhu">Celebrate <span className="text-primary">Street</span> Heroes</h1>
                    <div className="hero-actions">
                        <Link to="/events" className="btn btn-primary">Find Events</Link>
                        <Link to="/talent" className="btn btn-secondary">Watch Talent</Link>
                    </div>
                </div>
            </header>

            <section className="section-padding text-center">
                <div className="container">
                    <div className="section-head">
                        <h2 className="text-primary">Why TN Sports Vibe?</h2>
                        <p className="section-desc">We bring the energetic sports culture
                            of Tamil Nadu to a digital platform. Connect, Compete, and Conquer.</p>
                    </div>

                    <div className="dashboard-grid">
                        <div className="glass-card icon-card">
                            <div className="card-icon"><Calendar size={48} /></div>
                            <h3>Local Events</h3>
                            <p>Discover tournaments in your district with live updates.</p>
                        </div>
                        <div className="glass-card icon-card">
                            <div className="card-icon"><Star size={48} /></div>
                            <h3>Talent Showcase</h3>
                            <p>Upload your skills and get recognized by the community.</p>
                        </div>
                        <div className="glass-card icon-card">
                            <div className="card-icon"><History size={48} /></div>
                            <h3>Rich Heritage</h3>
                            <p>Explore the history of traditional Tamil games and sports.</p>
                        </div>
                        <div className="glass-card icon-card">
                            <div className="card-icon"><Users size={48} /></div>
                            <h3>Connect</h3>
                            <p>Discover young players in your home and showcase their talent</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="section-head">
                        <h2>Upcoming Matches</h2>
                    </div>
                    <div className="dashboard-grid">
                        <div className="glass-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img src="/assets/pexels-shootsaga-31759373.jpg" className="sport-img" alt="Cricket Match" />
                            </div>
                            <div className="card-content">
                                <span style={{ color: 'var(--color-brand-primary)', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>CRICKET</span>
                                <h3>Chennai Super League</h3>
                                <p style={{ marginBottom: '20px' }}>Join us for the finals at Chepauk Stadium. Witness the best local talent.</p>
                                <Link to="/events" className="btn btn-secondary" style={{ width: '100%' }}>View Details</Link>
                            </div>
                        </div>
                        <div className="glass-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img src="/assets/pexels-tyler-hendy-9620-54123.jpg" className="sport-img" alt="Football Match" />
                            </div>
                            <div className="card-content">
                                <span style={{ color: 'var(--color-brand-primary)', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>FOOTBALL</span>
                                <h3>Madurai FC vs Trichy Utd</h3>
                                <p style={{ marginBottom: '20px' }}>A heated derby match happening this weekend. Don't miss the action.</p>
                                <Link to="/events" className="btn btn-secondary" style={{ width: '100%' }}>View Details</Link>
                            </div>
                        </div>
                        <div className="glass-card">
                            <div style={{ height: '280px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>
                                🤼
                            </div>
                            <div className="card-content">
                                <span style={{ color: 'var(--color-brand-primary)', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>KABADDI</span>
                                <h3>Pro District Kabaddi</h3>
                                <p style={{ marginBottom: '20px' }}>The ultimate test of strength and strategy. Register your team now.</p>
                                <Link to="/events" className="btn btn-secondary" style={{ width: '100%' }}>View Details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-padding" style={{ background: 'var(--bg-surface)' }}>
                <div className="container">
                    <div className="stats-grid">
                        <div>
                            <h2>50+</h2>
                            <p>Active Tournaments</p>
                        </div>
                        <div>
                            <h2>1200+</h2>
                            <p>Registered Athletes</p>
                        </div>
                        <div>
                            <h2>15</h2>
                            <p>Districts Covered</p>
                        </div>
                        <div>
                            <h2>10k+</h2>
                            <p>Monthly Views</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Talents */}
            <section className="section-padding">
                <div className="container">
                    <div className="section-head">
                        <h2>Trending Talents</h2>
                    </div>
                    <div className="dashboard-grid">
                        <div className="glass-card icon-card">
                            <div className="avatar">
                                <img src="https://via.placeholder.com/100" alt="Player" />
                            </div>
                            <h3>Ravi Kumar</h3>
                            <p className="text-primary">Fast Bowler | Chennai</p>
                            <p style={{ marginTop: '10px' }}>"Consistently hitting 140kmph in local leagues."</p>
                        </div>
                        <div className="glass-card icon-card">
                            <div className="avatar">
                                <img src="https://via.placeholder.com/100" alt="Player" />
                            </div>
                            <h3>Anita Raj</h3>
                            <p className="text-primary">Sprinter | Coimbatore</p>
                            <p style={{ marginTop: '10px' }}>"Gold medalist in state-level 100m dash."</p>
                        </div>
                        <div className="glass-card icon-card">
                            <div className="avatar">
                                <img src="https://via.placeholder.com/100" alt="Player" />
                            </div>
                            <h3>Karthik S</h3>
                            <p className="text-primary">Raider | Madurai</p>
                            <p style={{ marginTop: '10px' }}>"Known for his multi-point raids in crucial moments."</p>
                        </div>
                    </div>
                    <div className="text-center" style={{ marginTop: '40px' }}>
                        <Link to="/talent" className="btn btn-secondary">View All Talents</Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
