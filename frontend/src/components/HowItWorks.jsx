import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Wand2, Download } from 'lucide-react';

const steps = [
    {
        icon: <Upload className="w-8 h-8" />,
        title: "Upload Photos",
        description: "Select your base photo and the object you want to merge."
    },
    {
        icon: <Wand2 className="w-8 h-8" />,
        title: "AI Processing",
        description: "Our neural engine intelligently analyzes and blends the images."
    },
    {
        icon: <Download className="w-8 h-8" />,
        title: "Get Result",
        description: "Download your high-resolution photorealistic merged image."
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#fff' }}>How It Works</h2>
                    <p style={{ color: '#9ca3af' }}>Three simple steps to create magic</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="glass-panel p-8 rounded-2xl relative group transition-colors"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }}
                        >
                            <div
                                className="absolute -top-6 left-8 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{
                                    background: '#121212',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#3b82f6'
                                }}
                            >
                                {step.icon}
                            </div>
                            <h3
                                className="text-xl font-bold mt-8 mb-3 transition-colors"
                                style={{ color: '#fff' }}
                            >
                                {step.title}
                            </h3>
                            <p className="leading-relaxed" style={{ color: '#9ca3af' }}>{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
