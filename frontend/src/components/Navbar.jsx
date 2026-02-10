import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, User, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, user } = useAuth();
    const { logoutUser } = useLogout();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        navigate('/');
    };

    const handleNavClick = (e, path) => {
        if (path.startsWith('/#')) {
            if (location.pathname === '/') {
                e.preventDefault();
                const id = path.replace('/#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/#features' },
        { name: 'How It Works', path: '/#how-it-works' },
    ];

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                background: isScrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none',
            }}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div
                        onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
                        className="flex items-center gap-3 group cursor-pointer"
                    >
                        {/* Logo Icon */}
                        <div
                            className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
                            }}
                        >
                            {/* AI Brain/Merge Icon */}
                            <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeLinecap="round" />
                                <path d="M8 12h8M12 8v8" strokeLinecap="round" />
                                <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                                <circle cx="16" cy="8" r="1.5" fill="currentColor" />
                                <circle cx="8" cy="16" r="1.5" fill="currentColor" />
                                <circle cx="16" cy="16" r="1.5" fill="currentColor" />
                            </svg>
                            {/* Glow effect */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ background: 'rgba(255,255,255,0.2)' }}
                            />
                        </div>

                        {/* Logo Text */}
                        <div className="flex flex-col">
                            <span
                                className="text-xl font-bold tracking-tight leading-none"
                                style={{ color: '#fff' }}
                            >
                                NANO<span style={{ color: '#3b82f6' }}>BANANA</span>
                            </span>
                            <span
                                className="text-[10px] tracking-widest uppercase"
                                style={{ color: '#6b7280' }}
                            >
                                AI Image Fusion
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Nav Links */}
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={(e) => handleNavClick(e, link.path)}
                                    className="text-sm font-medium transition-colors hover:text-white"
                                    style={{
                                        color: location.pathname === link.path ? '#fff' : '#9ca3af'
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-3">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/studio"
                                        className="px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all hover:scale-105"
                                        style={{
                                            background: 'linear-gradient(to right, #3b82f6, #a855f7)',
                                            color: '#fff',
                                            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                                        }}
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Open Studio
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="p-2 rounded-lg transition-all hover:bg-white/10"
                                        style={{ color: '#9ca3af' }}
                                        title="Profile"
                                    >
                                        <User className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 rounded-lg transition-all hover:bg-white/10"
                                        style={{ color: '#9ca3af' }}
                                        title="Logout"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 rounded-lg font-medium text-sm transition-colors hover:text-white"
                                        style={{ color: '#9ca3af' }}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105"
                                        style={{
                                            background: '#3b82f6',
                                            color: '#fff',
                                            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                                        }}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/10"
                        style={{ color: '#fff' }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden"
                        style={{
                            background: 'rgba(10, 10, 10, 0.98)',
                            borderTop: '1px solid rgba(255,255,255,0.05)'
                        }}
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={(e) => handleNavClick(e, link.path)}
                                    className="block py-2 text-sm font-medium transition-colors"
                                    style={{ color: '#9ca3af' }}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            to="/studio"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block w-full py-3 rounded-lg font-medium text-sm text-center"
                                            style={{
                                                background: 'linear-gradient(to right, #3b82f6, #a855f7)',
                                                color: '#fff'
                                            }}
                                        >
                                            Open Studio
                                        </Link>
                                        <button
                                            onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                            className="block w-full py-3 rounded-lg font-medium text-sm text-center"
                                            style={{
                                                background: 'rgba(255,255,255,0.05)',
                                                color: '#9ca3af'
                                            }}
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block w-full py-3 rounded-lg font-medium text-sm text-center"
                                            style={{
                                                background: 'rgba(255,255,255,0.05)',
                                                color: '#fff'
                                            }}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/signup"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block w-full py-3 rounded-lg font-medium text-sm text-center"
                                            style={{
                                                background: '#3b82f6',
                                                color: '#fff'
                                            }}
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
