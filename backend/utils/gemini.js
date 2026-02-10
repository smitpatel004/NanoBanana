const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-image", // Note: gemini-2.5-flash-image is Vertex specific, 
  // for Google AI SDK we use gemini-1.5-flash which supports multimodal
});

module.exports = model;
