import express from "express";
import OpenAI from "openai";

const router = express.Router();

// Initialize OpenAI client with my secret API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/ai - Handle AI chat
router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or "gpt-4" if available
      messages: [{ role: "user", content: message }],
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    res.status(500).json({ error: "AI request failed" });
  }
});

export default router;
