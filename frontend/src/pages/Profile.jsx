import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Image as ImageIcon, Calendar, Sparkles } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [generations, setGenerations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchGenerations = async () => {
            if (!user?.user?.id && !user?.id) return;

            try {
                // Determine user ID (supabase auth object structure check)
                const userId = user.user?.id || user.id;
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

                const response = await fetch(`${API_URL}/generations?userId=${userId}`);
                const data = await response.json();

                if (data.data) {
                    setGenerations(data.data);
                }
            } catch (error) {
                console.error('Error fetching generations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenerations();
    }, [user]);

    // if (loading) {
    //     return (
    //         <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
    //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-gray-800">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            Your Studio
                        </h1>
                        <p className="text-gray-400">
                            {user?.email}'s creative history
                        </p>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Total Creations</p>
                            <p className="text-xl font-bold text-white">{generations.length}</p>
                        </div>
                    </div>
                </div>

                {/* Grid Section */}
                {generations.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-gray-700">
                        <div className="inline-block p-4 rounded-full bg-gray-800 mb-4">
                            <ImageIcon size={48} className="text-gray-500" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">No creations yet</h3>
                        <p className="text-gray-400 max-w-sm mx-auto">
                            Start merging images in the studio to build your collection.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {generations.map((gen, index) => (
                            <motion.div
                                key={gen.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-900 cursor-pointer border border-white/5 hover:border-blue-500/50 transition-all duration-300"
                                onClick={() => setSelectedImage(gen)}
                            >
                                <img
                                    src={gen.image_url}
                                    alt={`Generation ${gen.id}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
                                        <Calendar size={12} />
                                        <span>{new Date(gen.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex -space-x-2 overflow-hidden py-1">
                                        {gen.source_images && gen.source_images.map((src, idx) => (
                                            <img
                                                key={idx}
                                                src={src}
                                                alt="Source"
                                                className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover bg-gray-800"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal for Details */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-900 rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl border border-white/10"
                        >
                            {/* Main Image */}
                            <div className="flex-1 bg-black flex items-center justify-center p-6 relative group">
                                <img
                                    src={selectedImage.image_url}
                                    alt="Selected Generation"
                                    className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                                />
                            </div>

                            {/* Sidebar Details */}
                            <div className="w-full md:w-80 bg-gray-900 border-l border-white/10 p-6 overflow-y-auto">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Sparkles className="text-blue-400" size={20} />
                                    Generation Details
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Source Images</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {selectedImage.source_images && selectedImage.source_images.map((src, idx) => (
                                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group-hover:border-blue-500/30 transition-colors">
                                                    <img
                                                        src={src}
                                                        alt={`Source ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">Created</span>
                                            <span className="text-white font-medium">
                                                {new Date(selectedImage.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => window.open(selectedImage.image_url, '_blank')}
                                        className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium text-white transition-colors border border-white/10"
                                    >
                                        Download / Open Original
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
