const { supabase } = require('../db/connectToSupaBase');
const cloudinary = require('../utils/cloudinary');
const generateTryOnImage = require('../services/generateImage');

const generateResult = async (req, res) => {
    try {
        console.log('Generate Result called');
        console.log('Files received:', req.files);

        // Check if both images are uploaded
        if (!req.files || !req.files.image1 || !req.files.image2) {
            return res.status(400).json({
                error: 'Both image1 and image2 are required'
            });
        }

        const image1File = req.files.image1[0];
        const image2File = req.files.image2[0];

        console.log('Step 1: Uploading images to Cloudinary...');

        // Upload image1 to Cloudinary
        const uploadImage1 = () => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'nanobanana/uploads',
                        resource_type: 'image'
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(image1File.buffer);
            });
        };

        // Upload image2 to Cloudinary
        const uploadImage2 = () => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'nanobanana/uploads',
                        resource_type: 'image'
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(image2File.buffer);
            });
        };

        // Upload both images to Cloudinary
        const [image1Result, image2Result] = await Promise.all([
            uploadImage1(),
            uploadImage2()
        ]);

        console.log('✅ Images uploaded to Cloudinary');
        console.log('Image1 URL:', image1Result.secure_url);
        console.log('Image2 URL:', image2Result.secure_url);

        // Step 2: Call Gemini API to generate the merged image
        console.log('Step 2: Calling Gemini API to generate merged image...');

        const generatedImageBase64 = await generateTryOnImage(
            image1Result.secure_url,
            image2Result.secure_url
        );

        console.log('✅ Gemini API generated image');

        // Step 3: Upload the generated image to Cloudinary
        console.log('Step 3: Uploading generated image to Cloudinary...');

        const uploadGeneratedImage = () => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'nanobanana/generated',
                        resource_type: 'image'
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                // Convert base64 to buffer and upload
                const buffer = Buffer.from(generatedImageBase64, 'base64');
                uploadStream.end(buffer);
            });
        };

        const generatedImageResult = await uploadGeneratedImage();

        console.log('✅ Generated image uploaded to Cloudinary');
        console.log('Generated Image URL:', generatedImageResult.secure_url);

        // Step 4: Log to Supabase generations table
        console.log('Step 4: Logging generation to Supabase...');
        const { error: dbError } = await supabase
            .from('generations')
            .insert({
                user_id: req.user.id,
                human_image_url: image1Result.secure_url,
                cloth_image_url: image2Result.secure_url,
                output_image_url: generatedImageResult.secure_url,
                status: 'completed',
                created_at: new Date().toISOString()
            });

        if (dbError) {
            console.error('Supabase DB Logging Error:', dbError);
            // We don't return error here because the image was already generated successfully
        } else {
            console.log('✅ Generation logged to database');
        }

        // Return the result
        return res.status(200).json({
            success: true,
            message: 'Image generated successfully',
            data: {
                id: req.user.id, // Returning user ID as reference
                originalImages: {
                    image1: {
                        url: image1Result.secure_url,
                        publicId: image1Result.public_id
                    },
                    image2: {
                        url: image2Result.secure_url,
                        publicId: image2Result.public_id
                    }
                },
                generatedImage: {
                    url: generatedImageResult.secure_url,
                    publicId: generatedImageResult.public_id
                }
            }
        });
    } catch (err) {
        console.error('generateResult error:', err);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: err.message
        });
    }
};

module.exports = {
    generateResult,
};