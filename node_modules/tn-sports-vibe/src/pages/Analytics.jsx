import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MapPin, Trophy, ArrowLeft, BarChart3, PieChart } from 'lucide-react';
import axios from 'axios';

const Analytics = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        byDistrict: {},
        bySport: {}
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [overviewRes, districtRes, sportRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/analytics/overview'),
                    axios.get('http://localhost:5000/api/analytics/users-by-district'),
                    axios.get('http://localhost:5000/api/analytics/users-by-sport')
                ]);

                // Transform district array to object
                const districtObj = {};
                districtRes.data.forEach(item => {
                    districtObj[item._id] = item.count;
                });

                // Transform sport array to object
                const sportObj = {};
                sportRes.data.forEach(item => {
                    sportObj[item._id] = item.count;
                });

                setStats({
                    total: overviewRes.data.totalUsers,
                    byDistrict: districtObj,
                    bySport: sportObj
                });
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const getMax = (obj) => Math.max(...Object.values(obj), 1);

    return (
        <div className="main-content" style={{ minHeight: '100vh', background: 'var(--bg-body)', paddingTop: '120px' }}>
            <div className="container">
                <div className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                    <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-primary" style={{ fontSize: '2.5rem', textTransform: 'uppercase', fontStyle: 'italic' }}>Analytical Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Real-time registration metrics across Tamil Nadu</p>
                    </div>
                </div>

                {/* Top Highlights */}
                <div className="dashboard-grid" style={{ marginBottom: '50px' }}>
                    <div className="glass-card icon-card" style={{ padding: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <div style={{ background: 'rgba(255, 215, 0, 0.1)', padding: '15px', borderRadius: '15px' }}>
                                <Users size={32} className="text-accent" />
                            </div>
                        </div>
                        <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{stats.total}</div>
                        <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginTop: '15px', color: 'var(--text-secondary)' }}>Total Registrations</p>
                    </div>

                    <div className="glass-card icon-card" style={{ padding: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <div style={{ background: 'rgba(0, 122, 255, 0.1)', padding: '15px', borderRadius: '15px' }}>
                                <MapPin size={32} style={{ color: 'var(--color-brand-secondary)' }} />
                            </div>
                        </div>
                        <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{Object.keys(stats.byDistrict).length}</div>
                        <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginTop: '15px', color: 'var(--text-secondary)' }}>Districts Active</p>
                    </div>

                    <div className="glass-card icon-card" style={{ padding: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <div style={{ background: 'rgba(255, 59, 48, 0.1)', padding: '15px', borderRadius: '15px' }}>
                                <Trophy size={32} style={{ color: 'var(--color-brand-accent)' }} />
                            </div>
                        </div>
                        <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{Object.keys(stats.bySport).length}</div>
                        <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginTop: '15px', color: 'var(--text-secondary)' }}>Sports Categories</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px' }}>
                    {/* Registrations by District */}
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
                            <BarChart3 size={24} className="text-primary" />
                            <h3 style={{ fontSize: '1.5rem', textTransform: 'uppercase' }}>Registrations by District</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {Object.entries(stats.byDistrict).sort((a, b) => b[1] - a[1]).map(([name, count]) => (
                                <div key={name}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                        <span style={{ fontWeight: 600 }}>{name}</span>
                                        <span className="text-accent">{count}</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div
                                            style={{
                                                width: `${(count / getMax(stats.byDistrict)) * 100}%`,
                                                height: '100%',
                                                background: 'linear-gradient(90deg, var(--color-brand-secondary), var(--color-brand-primary))',
                                                borderRadius: '4px',
                                                transition: 'width 1s ease-out'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Registrations by Sport */}
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
                            <PieChart size={24} className="text-accent" />
                            <h3 style={{ fontSize: '1.5rem', textTransform: 'uppercase' }}>Interest by Sports</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {Object.entries(stats.bySport).sort((a, b) => b[1] - a[1]).map(([name, count]) => (
                                <div key={name}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                        <span style={{ fontWeight: 600 }}>{name}</span>
                                        <span className="text-primary">{count}</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div
                                            style={{
                                                width: `${(count / getMax(stats.bySport)) * 100}%`,
                                                height: '100%',
                                                background: 'linear-gradient(90deg, var(--color-brand-accent), var(--color-brand-primary))',
                                                borderRadius: '4px',
                                                transition: 'width 1s ease-out'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Insights Section */}
                <div className="glass-card" style={{ marginTop: '30px', padding: '30px', borderLeft: '5px solid var(--color-brand-primary)' }}>
                    <h3 style={{ marginBottom: '15px', color: 'var(--color-brand-primary)' }}>Growth Insight</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        The highest engagement is currently coming from <span style={{ color: 'white', fontWeight: 'bold' }}>{Object.entries(stats.byDistrict).sort((a, b) => b[1] - a[1])[0]?.[0]}</span> in the <span style={{ color: 'white', fontWeight: 'bold' }}>{Object.entries(stats.bySport).sort((a, b) => b[1] - a[1])[0]?.[0]}</span> category.
                        Targeted scout camps in these areas could maximize talent discovery.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
