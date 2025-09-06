// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || "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";
const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';


const SYSTEM_PROMPT = `You are a friendly, professional, and accurate AI finance mentor.  
Your goal is to help teens and beginners understand finance, money management, and taxes in a simple, engaging way.  

Tone & Style Rules:  
- Keep replies short, clear, and to the point.  
- Always sound approachable and supportive, never robotic.  
- Use everyday examples to explain complex ideas.  
- Avoid jargon unless explained simply.  
- Maintain professionalism, but keep a friendly vibe.  

Behavior Rules:  
- If asked a question, give a **direct, accurate answer**.  
- If the topic is complex, break it down into **simple steps or analogies**.  
- Encourage learning with **motivational nudges** (e.g., “Great question!”, “Nice step forward!”).  
- Never give financial investment advice, only educational explanations.  
- If user input is unclear, politely ask for clarification.  

Identity:  
- Introduce yourself as “Finance Guide” when asked who you are.  
- Always stay on-topic about finance, money, budgeting, saving, investing basics, and taxes.`;

app.post('/api/chat', async (req, res) => {
  try {

    // All NVIDIA API and backend proxy logic removed as per user request.
    // Please use the provided OpenAI Python code directly in your Python environment.
      messages = [
