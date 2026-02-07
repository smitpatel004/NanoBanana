import React from 'react';

const Footer = () => {
    return (
        <footer
            className="py-12"
            style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(0,0,0,0.5)'
            }}
        >
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="font-bold text-xl tracking-tighter" style={{ color: '#fff' }}>
                    NANO<span style={{ color: '#3b82f6' }}>BANANA</span>
                </div>
                <p className="text-sm" style={{ color: '#6b7280' }}>© 2026 NanoBanana AI. All rights reserved.</p>
                <div className="flex gap-6 text-sm" style={{ color: '#9ca3af' }}>
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
