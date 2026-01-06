import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('tn_users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const sessionUser = { ...user };
            delete sessionUser.password;
            localStorage.setItem('user', JSON.stringify(sessionUser));
            alert(`Welcome back, ${user.name}!`);
            navigate('/dashboard');
            window.location.reload(); // Refresh to update navbar state
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="glass-card fade-in" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
                <h2 className="text-primary" style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            required
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '30px' }}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            required
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
                    New here? <Link to="/register" className="text-accent">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
