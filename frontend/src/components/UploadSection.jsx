import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react';

const UploadBox = ({ label }) => (
    <div
        className="flex-1 aspect-square md:aspect-video rounded-2xl flex flex-col items-center justify-center gap-4 group cursor-pointer transition-all"
        style={{
            border: '2px dashed rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.05)'
        }}
    >
        <div
            className="p-4 rounded-full group-hover:scale-110 transition-transform duration-300"
            style={{ background: '#121212' }}
        >
            <UploadCloud className="w-8 h-8 transition-colors" style={{ color: '#9ca3af' }} />
        </div>
        <span className="text-sm font-medium transition-colors" style={{ color: '#9ca3af' }}>{label}</span>
    </div>
);

const UploadSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-12 rounded-3xl max-w-4xl mx-auto text-center"
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: '#fff' }}>Start Creating Now</h2>
                    <div className="flex flex-col md:flex-row gap-6 mb-10">
                        <UploadBox label="Upload Your Photo" />
                        <UploadBox label="Upload Object / Accessory" />
                    </div>
                    <button
                        className="w-full md:w-auto px-12 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                        style={{
                            background: 'linear-gradient(to right, #3b82f6, #a855f7)',
                            color: '#fff',
                            boxShadow: '0 10px 40px rgba(59, 130, 246, 0.25)'
                        }}
                    >
                        Generate Magic
                    </button>
                </motion.div>
            </div>

            {/* Background Effect */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 rounded-full pointer-events-none"
                style={{
                    background: 'rgba(59, 130, 246, 0.2)',
                    filter: 'blur(120px)'
                }}
            />
        </section>
    );
};

export default UploadSection;
