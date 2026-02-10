import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FastForward, Sliders, Layers } from 'lucide-react';

const features = [
    {
        icon: <FastForward className="w-6 h-6" />,
        title: "Lightning Fast",
        description: "Results processed in under 2 seconds."
    },
    {
        icon: <Sliders className="w-6 h-6" />,
        title: "Perfect Blending",
        description: "Smart lighting and shadow adjustment."
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Secure & Private",
        description: "Your photos are processed locally in isolation."
    },
    {
        icon: <Layers className="w-6 h-6" />,
        title: "High Resolution",
        description: "Output up to 4K quality for professional use."
    }
];

const Features = () => {
    return (
        <section id="features" className="py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl transition-colors group"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                                style={{
                                    background: '#121212',
                                    color: '#9ca3af'
                                }}
                            >
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2" style={{ color: '#fff' }}>{feature.title}</h3>
                            <p className="text-sm" style={{ color: '#9ca3af' }}>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
