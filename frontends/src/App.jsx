import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import Sports from './pages/Sports'
import Events from './pages/Events'
import Talent from './pages/Talent'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

function App() {
    return (
        <Router>
            <SplashScreen />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/events" element={<Events />} />
                <Route path="/talent" element={<Talent />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
