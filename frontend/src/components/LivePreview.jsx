import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const LivePreview = () => {
    return (
        <section className="py-24" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3 space-y-6"
                    >
                        <h2 className="text-3xl font-bold" style={{ color: '#fff' }}>
                            Instant <span style={{ color: '#a855f7', filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))' }}>Reality Fusion</span>
                        </h2>
                        <p style={{ color: '#9ca3af' }}>
                            Watch as our AI analyzes lighting, perspective, and shadows to merge objects seamlessly into your photos.
                        </p>
                        <div className="flex items-center gap-4 text-sm font-medium" style={{ color: '#3b82f6' }}>
                            <Zap className="w-5 h-5" />
                            <span>Processed in 0.8s</span>
                        </div>
                    </motion.div>

                    {/* Visualization Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:w-2/3 relative"
                    >
                        <div
                            className="p-4 rounded-2xl"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }}
                        >
                            <div className="flex gap-4 mb-4">
                                <div className="h-3 w-3 rounded-full" style={{ background: 'rgba(239, 68, 68, 0.5)' }} />
                                <div className="h-3 w-3 rounded-full" style={{ background: 'rgba(234, 179, 8, 0.5)' }} />
                                <div className="h-3 w-3 rounded-full" style={{ background: 'rgba(34, 197, 94, 0.5)' }} />
                            </div>

                            <div className="flex gap-4 h-64 md:h-80 w-full">
                                {/* Input 1 */}
                                <div
                                    className="flex-1 rounded-lg flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px dashed rgba(255,255,255,0.1)'
                                    }}
                                >
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), transparent)' }}
                                    />
                                    <span className="text-xs" style={{ color: '#6b7280' }}>Base Image</span>
                                </div>

                                {/* Plus Sign */}
                                <div className="flex items-center justify-center">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-xl"
                                        style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                    >+</div>
                                </div>

                                {/* Input 2 */}
                                <div
                                    className="flex-1 rounded-lg flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px dashed rgba(255,255,255,0.1)'
                                    }}
                                >
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.1), transparent)' }}
                                    />
                                    <span className="text-xs" style={{ color: '#6b7280' }}>Object</span>
                                </div>

                                {/* Arrow */}
                                <div className="flex items-center justify-center">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                                        style={{ background: 'linear-gradient(to right, #3b82f6, #a855f7)' }}
                                    >→</div>
                                </div>

                                {/* Result */}
                                <div
                                    className="flex-1 rounded-lg flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), transparent, rgba(168, 85, 247, 0.2))',
                                        border: '1px solid rgba(59, 130, 246, 0.3)',
                                        boxShadow: '0 0 30px rgba(59, 130, 246, 0.15)'
                                    }}
                                >
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{ background: 'rgba(255,255,255,0.05)' }}
                                        animate={{
                                            opacity: [0, 0.5, 0],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <span className="text-xs font-bold tracking-widest" style={{ color: '#fff' }}>RESULT</span>
                                </div>
                            </div>
                        </div>

                        {/* Background Glow */}
                        <div
                            className="absolute -inset-4 -z-10 rounded-3xl"
                            style={{
                                background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))',
                                filter: 'blur(40px)'
                            }}
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default LivePreview;
