import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

    const handleRegister = (e) => {
        e.preventDefault();
        const { name, email, district, sport, password } = formData;

        if (!name || !email || !password || !district || !sport) {
            alert("Please fill in all fields.");
            return;
        }

        const users = JSON.parse(localStorage.getItem('tn_users')) || [];

        if (users.find(u => u.email === email)) {
            alert("Email already registered!");
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            district,
            sport,
            password,
            registeredEvents: []
        };

        users.push(newUser);
        localStorage.setItem('tn_users', JSON.stringify(users));

        alert("Registration Successful! Please login.");
        navigate('/login');
    };

    return (
        <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
            <div className="glass-card fade-in" style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
                <h2 className="text-primary" style={{ textAlign: 'center', marginBottom: '20px' }}>Join the Clan</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            required
                            placeholder="Kabali R"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            required
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label htmlFor="district">District</label>
                            <select
                                id="district"
                                name="district"
                                className="form-control"
                                required
                                value={formData.district}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {["Chennai", "Coimbatore", "Madurai", "Salem", "Tirunelveli", "Trichy", "Thanjavur", "Kanyakumari", "Vellore", "Erode"].map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label htmlFor="sport">Favorite Sport</label>
                            <select
                                id="sport"
                                name="sport"
                                className="form-control"
                                required
                                value={formData.sport}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {["Kabaddi", "Silambam", "Cricket", "Football", "Badminton", "Athletics"].map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '25px' }}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            required
                            placeholder="********"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Register</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" className="text-accent">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
