const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.get("/api/GiveHand", (req, res) => {
    res.status(200).send("Welcome to GiveHand 🫲🏻🫱🏻");
});

// היסטוריית שיחה
let chatHistory = [];

// ניקוי היסטוריה אוטומטי כל 24 שעות
setInterval(() => {
    console.log("🗑️ מחיקת היסטוריית השיחה...");
    chatHistory = [];
}, 24 * 60 * 60 * 1000); 

//שאלות ותשובות מוכנות מראש
const predefinedAnswers = {
    "מי בנה את GiveHand?": " נבנה על ידי המפתחת פייגי שמעיה GiveHand שהשקיעה שעות רבות לפיתוחו והכל למען עם ישראל  ",
    "איך אני יכול להתנדב?": " כדי להתנדב, היכנס לאתר הרשמי שלנו או פנה אלינו דרך הטופס .",
    "מה המטרה של המערכת?": "  המערכת שלנו נועדה לתאם בין מתנדבים לבין אנשים הזקוקים לעזרה. ",
    "איך אפשר לבקש עזרה?": "ניתן להגיש בקשה דרך האתר שלנו או ליצור איתנו קשר בטלפון.",
    "האם המערכת חינמית?": "כן! המערכת שלנו היא מערכת חינמית שנועדה לעזור לכל מי שזקוק לכך."
};

// API להחזרת השאלות הנפוצות
app.get("/api/GiveHand/faq", (req, res) => {
    res.json(Object.keys(predefinedAnswers)); 
});

//  API לצ'אט-בוט עם Gemini
app.post("/api/GiveHand/gemini", async (req, res) => {
    try {
        const userMessage = req.body.message.trim();

        // בדיקה אם יש תשובה מוכנה מראש
        if (predefinedAnswers[userMessage]) {
            return res.json({ reply: predefinedAnswers[userMessage] });
        }

        // חיבור למודל Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // שליחת הבקשה עם היסטוריה
        const result = await model.generateContent({
            contents: [...chatHistory, { role: "user", parts: [{ text: userMessage }] }]
        });

        // תשובת הבוט
        const botReply = result.response.candidates[0]?.content?.parts[0]?.text || "❌ לא הצלחתי להבין.";

        chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
        chatHistory.push({ role: "model", parts: [{ text: botReply }] });

        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ reply: "❌ שגיאה בעיבוד הבקשה" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}/api/GiveHand`));
