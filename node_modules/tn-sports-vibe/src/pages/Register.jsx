import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, MapPin, Trophy, Lock, ArrowRight, CheckCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        district: '',
        sport: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { name, email, district, sport, password } = formData;

        if (!name || !email || !password || !district || !sport) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                district,
                favouriteSport: sport, // Map frontend 'sport' to backend 'favouriteSport'
                password
            });

            if (response.data) {
                alert("Registration Successful! Please login.");
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-page" style={{
            minHeight: '100vh',
            display: 'flex',
            background: 'var(--bg-body)',
            overflow: 'hidden'
        }}>
            {/* Left Side: Visual Content */}
            <div className="register-visual" style={{
                flex: '1.2',
                position: 'relative',
                display: 'flex', // Keeping it flex but can be hidden on mobile via CSS media queries if defined in index.css
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '60px',
                background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('/assets/register_bg.png') center/cover no-repeat`
            }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div className="logo" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>
                        TN <span style={{ color: 'var(--color-brand-primary)' }}>SPORTS</span>
                    </div>
                    <h1 style={{
                        fontSize: '3.5rem',
                        lineHeight: '1.1',
                        marginBottom: '20px',
                        color: 'white',
                        fontWeight: '800'
                    }}>
                        Unlock Your <br />
                        <span className="text-primary">Athletic Potential</span>
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'rgba(255,255,255,0.8)',
                        maxWidth: '500px',
                        marginBottom: '40px',
                        lineHeight: '1.6'
                    }}>
                        Join the fastest growing sports community in Tamil Nadu. Get scouted, find events, and track your progress.
                    </p>

                    <div style={{ display: 'grid', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ background: 'rgba(255,215,0,0.2)', padding: '10px', borderRadius: '50%' }}>
                                <CheckCircle size={24} className="text-primary" />
                            </div>
                            <span style={{ fontSize: '1.1rem', color: 'white' }}>Personalized Skill Tracking</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ background: 'rgba(255,215,0,0.2)', padding: '10px', borderRadius: '50%' }}>
                                <CheckCircle size={24} className="text-primary" />
                            </div>
                            <span style={{ fontSize: '1.1rem', color: 'white' }}>Exclusive Event Access</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ background: 'rgba(255,215,0,0.2)', padding: '10px', borderRadius: '50%' }}>
                                <CheckCircle size={24} className="text-primary" />
                            </div>
                            <span style={{ fontSize: '1.1rem', color: 'white' }}>Direct Outreach to Scouts</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: '200px',
                    background: 'linear-gradient(transparent, var(--bg-body))',
                    zIndex: 1
                }}></div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="register-form-container" style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                position: 'relative'
            }}>
                <div className="glass-card fade-in" style={{
                    width: '100%',
                    maxWidth: '480px',
                    padding: '50px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h2 className="text-primary" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Join the Clan</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Enter your details to create your account.</p>
                    </div>

                    <form onSubmit={handleRegister}>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: '#888' }}>
                                <User size={16} /> Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                required
                                placeholder="Kabali R"
                                value={formData.name}
                                onChange={handleChange}
                                style={{ borderRadius: '12px', padding: '14px 20px' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: '#888' }}>
                                <Mail size={16} /> Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                required
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ borderRadius: '12px', padding: '14px 20px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: '#888' }}>
                                    <MapPin size={16} /> District
                                </label>
                                <select
                                    name="district"
                                    className="form-control"
                                    required
                                    value={formData.district}
                                    onChange={handleChange}
                                    style={{ borderRadius: '12px', padding: '14px 20px' }}
                                >
                                    <option value="">Select</option>
                                    {["Chennai", "Coimbatore", "Madurai", "Salem", "Tirunelveli", "Trichy", "Thanjavur", "Kanyakumari", "Vellore", "Erode"].map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: '#888' }}>
                                    <Trophy size={16} /> Favorite Sport
                                </label>
                                <select
                                    name="sport"
                                    className="form-control"
                                    required
                                    value={formData.sport}
                                    onChange={handleChange}
                                    style={{ borderRadius: '12px', padding: '14px 20px' }}
                                >
                                    <option value="">Select</option>
                                    {["Kabaddi", "Silambam", "Cricket", "Football", "Badminton", "Athletics"].map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '35px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: '#888' }}>
                                <Lock size={16} /> Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                required
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                style={{ borderRadius: '12px', padding: '14px 20px' }}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '12px',
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}>
                            Create Account <ArrowRight size={20} />
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '30px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        Already part of the tribe? <Link to="/login" className="text-accent" style={{ fontWeight: '600' }}>Log in here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
