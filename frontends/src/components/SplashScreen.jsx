import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="splash-screen" className={!isVisible ? 'hidden' : ''}>
            <div className="splash-overlay left"></div>
            <div className="splash-overlay right"></div>
            <div className="splash-content">
                <h1 className="splash-logo" data-text="TN SPORTS">
                    TN <span>SPORTS</span>
                </h1>
                <p className="fade-up">Vibe of Tamil Nadu</p>
                <div className="loading-container">
                    <div className="loading-bar"></div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
