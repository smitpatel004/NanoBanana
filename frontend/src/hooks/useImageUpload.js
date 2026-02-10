import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

export const useImageUpload = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { user } = useAuth();

    const uploadImages = async (image1File, image2File) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            // Get token from auth state
            const token = user?.session?.access_token;

            // Create FormData to send files
            const formData = new FormData();
            formData.append('image1', image1File);
            formData.append('image2', image2File);

            console.log('Uploading images to backend...');

            const response = await fetch(`${API_URL}/api/generate`, {
                method: 'POST',
                headers: {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: formData,
                // Don't set Content-Type header - browser will set it with boundary
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || 'Upload failed');
            }

            console.log('Upload successful:', responseData);
            setData(responseData);

            return { success: true, data: responseData };
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return { uploadImages, loading, error, data };
};

export default useImageUpload;
