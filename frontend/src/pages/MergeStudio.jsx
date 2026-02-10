import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, X, Sparkles, Download, RotateCcw } from 'lucide-react';
import { useImageUpload } from '../hooks/useImageUpload';

const MergeStudio = () => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [preview1, setPreview1] = useState(null);
    const [preview2, setPreview2] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);

    const { uploadImages, loading: uploadLoading, error: uploadError, data: uploadData } = useImageUpload();

    const fileInput1 = useRef(null);
    const fileInput2 = useRef(null);

    const handleImageUpload = (e, setImage, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (setImage, setPreview) => {
        setImage(null);
        setPreview(null);
    };

    const handleGenerate = async () => {
        if (!image1 || !image2) return;

        setIsProcessing(true);

        try {
            // Upload images to backend
            const result = await uploadImages(image1, image2);

            if (result.success) {
                console.log('✅ Images uploaded and processed:');
                console.log('Original 1:', result.data.data.originalImages.image1.url);
                console.log('Original 2:', result.data.data.originalImages.image2.url);
                console.log('Generated:', result.data.data.generatedImage.url);

                // Show the AI generated result!
                setResult(result.data.data.generatedImage.url);
            } else {
                console.error('Upload failed:', result.error);
                alert('Failed to upload images: ' + result.error);
            }
        } catch (error) {
            console.error('Error during upload:', error);
            alert('An error occurred during upload');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setImage1(null);
        setImage2(null);
        setPreview1(null);
        setPreview2(null);
        setResult(null);
    };

    const UploadBox = ({ preview, onUpload, onRemove, inputRef, label, description }) => (
        <div className="flex-1">
            <input
                type="file"
                ref={inputRef}
                onChange={onUpload}
                accept="image/*"
                className="hidden"
            />
            {preview ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-square rounded-2xl overflow-hidden group"
                    style={{ border: '2px solid rgba(59, 130, 246, 0.3)' }}
                >
                    <img
                        src={preview}
                        alt="Upload preview"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.6)' }}
                    >
                        <button
                            onClick={onRemove}
                            className="p-3 rounded-full transition-all hover:scale-110"
                            style={{ background: 'rgba(239, 68, 68, 0.8)' }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 right-0 p-3 text-center text-sm font-medium"
                        style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: '#fff' }}
                    >
                        {label}
                    </div>
                </motion.div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-[1.02] hover:border-blue-500/50"
                    style={{
                        border: '2px dashed rgba(174, 39, 39, 0.2)',
                        background: 'rgba(255,255,255,0.03)'
                    }}
                >
                    <div
                        className="p-4 rounded-full"
                        style={{ background: 'rgba(59, 130, 246, 0.1)' }}
                    >
                        <UploadCloud className="w-10 h-10" style={{ color: '#3b82f6' }} />
                    </div>
                    <div className="text-center px-4">
                        <p className="font-medium mb-1" style={{ color: '#fff' }}>{label}</p>
                        <p className="text-sm" style={{ color: '#6b7280' }}>{description}</p>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div
            className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden"
            style={{ background: '#0a0a0a' }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
                    style={{ background: 'rgba(59, 130, 246, 0.1)', filter: 'blur(150px)' }}
                />
                <div
                    className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
                    style={{ background: 'rgba(168, 85, 247, 0.1)', filter: 'blur(150px)' }}
                />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl p-6 md:p-10"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#fff' }}>
                            AI Image <span style={{ color: '#3b82f6' }}>Merge Studio</span>
                        </h2>
                        <p className="text-lg" style={{ color: '#9ca3af' }}>
                            Upload your photo and an object to create magic
                        </p>
                    </div>

                    {/* Upload Section */}
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        <UploadBox
                            preview={preview1}
                            onUpload={(e) => handleImageUpload(e, setImage1, setPreview1)}
                            onRemove={() => removeImage(setImage1, setPreview1)}
                            inputRef={fileInput1}
                            label="Your Photo"
                            description="Upload your base image"
                        />
                        <UploadBox
                            preview={preview2}
                            onUpload={(e) => handleImageUpload(e, setImage2, setPreview2)}
                            onRemove={() => removeImage(setImage2, setPreview2)}
                            inputRef={fileInput2}
                            label="Object / Accessory"
                            description="Upload item to merge"
                        />
                    </div>

                    {/* Generate Button */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
                        <button
                            onClick={handleGenerate}
                            disabled={!image1 || !image2 || isProcessing}
                            className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            style={{
                                background: 'linear-gradient(to right, #3b82f6, #a855f7)',
                                color: '#fff',
                                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)'
                            }}
                        >
                            {isProcessing ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    >
                                        <Sparkles className="w-6 h-6" />
                                    </motion.div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-6 h-6" />
                                    Generate Magic
                                </>
                            )}
                        </button>

                        {(image1 || image2 || result) && (
                            <button
                                onClick={handleReset}
                                className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-white/10"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#9ca3af'
                                }}
                            >
                                <RotateCcw className="w-5 h-5" />
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Processing Animation */}
                    <AnimatePresence>
                        {isProcessing && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-8"
                            >
                                <div
                                    className="rounded-2xl p-8 text-center"
                                    style={{
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        border: '1px solid rgba(59, 130, 246, 0.2)'
                                    }}
                                >
                                    <div className="flex justify-center gap-2 mb-4">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="w-3 h-3 rounded-full"
                                                style={{ background: '#3b82f6' }}
                                                animate={{
                                                    y: [0, -10, 0],
                                                    opacity: [0.5, 1, 0.5]
                                                }}
                                                transition={{
                                                    duration: 0.6,
                                                    repeat: Infinity,
                                                    delay: i * 0.2
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <p className="font-medium" style={{ color: '#3b82f6' }}>
                                        AI is analyzing your images...
                                    </p>
                                    <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
                                        This may take a few seconds
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Result Section */}
                    <AnimatePresence>
                        {result && !isProcessing && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div
                                    className="h-px w-full mb-8"
                                    style={{ background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.5), transparent)' }}
                                />

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold" style={{ color: '#fff' }}>
                                        ✨ Your Merged Result
                                    </h3>
                                </div>

                                <div className="flex justify-center mb-6">
                                    <div
                                        className="relative rounded-2xl overflow-hidden max-w-lg w-full"
                                        style={{
                                            border: '2px solid rgba(59, 130, 246, 0.3)',
                                            boxShadow: '0 0 60px rgba(59, 130, 246, 0.2)'
                                        }}
                                    >
                                        <img
                                            src={result}
                                            alt="Generated result"
                                            className="w-full h-auto"
                                        />
                                        <div
                                            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                                            style={{ background: 'rgba(59, 130, 246, 0.8)', color: '#fff' }}
                                        >
                                            AI Generated
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = result;
                                            link.download = 'nanobanana-merged.png';
                                            link.click();
                                        }}
                                        className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                                        style={{
                                            background: 'linear-gradient(to right, #10b981, #14b8a6)',
                                            color: '#fff',
                                            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
                                        }}
                                    >
                                        <Download className="w-5 h-5" />
                                        Download Result
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Tips Section */}
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                    {[
                        { title: 'Best Results', desc: 'Use high-quality images with good lighting' },
                        { title: 'Object Placement', desc: 'Center the object in the second image' },
                        { title: 'File Types', desc: 'JPG, PNG, and WebP formats supported' }
                    ].map((tip, i) => (
                        <div
                            key={i}
                            className="p-5 rounded-xl text-center"
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            <p className="font-medium mb-1" style={{ color: '#fff' }}>{tip.title}</p>
                            <p className="text-sm" style={{ color: '#6b7280' }}>{tip.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MergeStudio;
