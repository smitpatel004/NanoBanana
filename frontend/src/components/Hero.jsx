import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute top-20 left-10 w-72 h-72 rounded-full"
                    style={{ background: 'rgba(59, 130, 246, 0.2)', filter: 'blur(128px)' }}
                />
                <div
                    className="absolute bottom-20 right-10 w-96 h-96 rounded-full"
                    style={{ background: 'rgba(168, 85, 247, 0.2)', filter: 'blur(128px)' }}
                />
            </div>

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
                >
                    <Sparkles className="w-4 h-4" style={{ color: '#14b8a6' }} />
                    <span className="text-sm font-medium" style={{ color: '#d1d5db' }}>Next-Gen AI Image Synthesis</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                    style={{
                        background: 'linear-gradient(to right, #fff, #e5e7eb, #9ca3af)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Merge Reality <br />
                    <span
                        style={{
                            color: '#3b82f6',
                            WebkitTextFillColor: '#3b82f6',
                            filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))'
                        }}
                    >
                        with AI Intelligence
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
                    style={{ color: '#9ca3af' }}
                >
                    Upload your photo and any object. Our advanced AI seamlessly blends them into a hyper-realistic masterpiece in seconds.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button
                        className="group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden transition-all hover:scale-105"
                        style={{
                            background: '#3b82f6',
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                        }}
                    >
                        <div
                            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                            style={{ background: 'rgba(255,255,255,0.2)' }}
                        />
                        <span className="relative flex items-center gap-2">
                            Try AI Merge Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <button
                        className="px-8 py-4 rounded-xl font-bold transition-all hover:text-white"
                        style={{
                            color: '#d1d5db',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'transparent'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        View Gallery
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
