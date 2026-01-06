import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
        window.location.href = '/';
    };

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Sports', path: '/sports' },
        { name: 'Events', path: '/events' },
        { name: 'Talent', path: '/talent' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-inner container">
                <Link to="/" className="logo">
                    TN <span>SPORTS</span>
                </Link>

                <button
                    className="nav-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{ color: 'white' }}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={isActive(link.path) ? 'active' : ''}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="nav-auth-container">
                    {currentUser ? (
                        <>
                            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                                Dashboard
                            </Link>
                            <Link to="/profile" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="btn btn-secondary"
                                style={{ padding: '8px 20px', fontSize: '0.85rem', borderColor: '#ff4444', color: '#ff4444' }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                                Join Now
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
