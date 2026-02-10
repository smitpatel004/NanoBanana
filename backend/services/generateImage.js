const model = require("../utils/gemini");
const axios = require('axios');

/**
 * Helper to fetch image from URL and convert to base64
 */
const fetchImageAsBase64 = async (url) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary').toString('base64');
};

const generateTryOnImage = async (personURL, clothURL) => {
    try {
        console.log('Fetching images for Gemini...');
        const [personBase64, clothBase64] = await Promise.all([
            fetchImageAsBase64(personURL),
            fetchImageAsBase64(clothURL)
        ]);

        const request = {
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `Generate a photorealistic fashion try-on image. 
                                   Put the clothing from the second image on the person in the first image.
                                   Preserve identity, clothing details, pose, and background.`,
                        },
                        {
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: personBase64,
                            },
                        },
                        {
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: clothBase64,
                            },
                        },
                    ],
                },
            ],
        };

        console.log('Sending request to Gemini model...');
        const result = await model.generateContent(request);

        // ⭐ Extract image from response
        const imagePart = result.response.candidates[0].content.parts.find(
            (p) => p.inlineData
        );

        if (!imagePart || !imagePart.inlineData) {
            // Log full response for debugging if needed
            console.log('Gemini full response candidate content:', JSON.stringify(result.response.candidates[0].content, null, 2));
            throw new Error('Gemini API did not return an image. Check model output and safety settings.');
        }

        return imagePart.inlineData.data; // base64 image
    } catch (error) {
        console.error('Error in generateTryOnImage:', error.message);
        throw error;
    }
};

module.exports = generateTryOnImage;
