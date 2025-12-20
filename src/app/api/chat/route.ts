import { NextResponse } from "next/server";

// ⚠️ TESTING ONLY: Hardcoded API Key
// Kaj shesh hole eti .env file-e niye jabe: GEMINI_API_KEY=...
const apiKey = "AIzaSyBVlQZkoMSVZNqPaOTyOafn_xKg17-rHM4";

// 🧠 AI-er Knowledge Base (Shakil's Brain)
const portfolioContext = `
NAME: Shakil Ahmed
TITLE: Digital Alchemist (Full Stack Developer & UI/UX Designer)
LOCATION: Dhaka, Bangladesh
CONTACT: 01631234160, communicates.shakil@gmail.com

SKILLS: 
- Frontend: Next.js, React, Tailwind CSS, Framer Motion.
- Backend: Node.js, Express, MongoDB, Firebase.
- AI & Tools: Gemini API Integration, Vercel AI SDK, Figma.

PROJECTS:
1. Tazaamart: An e-commerce platform with AI chatbot integration.
2. Portfolio: This website, built with Next.js and Tailwind, themed as "Digital Alchemist".

PERSONALITY:
- You are a helpful, professional, and slightly creative AI assistant.
- Answer primarily in English, but can reply in Bengali if asked.
- Keep answers short and relevant (under 3-4 sentences).
- If asked about hiring/projects, politely suggest using the "WhatsApp" button below to chat directly.
`;

export async function POST(req: Request) {
  try {
    // 1. User-er message receive kora
    const { message, history } = await req.json();

    // 2. Chat history format kora (jate ager kotha mone rakhte pare)
    const formattedHistory = Array.isArray(history) 
      ? history.map((msg: any) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        }))
      : [];

    // 3. System Prompt set kora
    const systemInstruction = {
      role: "user",
      parts: [{ text: `SYSTEM_INSTRUCTION: ${portfolioContext}` }]
    };

    const contents = [
      systemInstruction,
      ...formattedHistory,
      { role: "user", parts: [{ text: message }] }
    ];

    // 4. Google Gemini API call kora (Updated to 2.5 Flash)
    // ⚠️ Note: Jodi 2.5 model officially available na thake, tobe 1.5-flash ba 2.0-flash-exp try koro.
    // Kintu tomar request onujayi ekhane 'gemini-2.5-flash' deya holo.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const apiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          maxOutputTokens: 200, // Uttor chhoto rakhar jonno
          temperature: 0.7,
        },
      }),
    });

    const data = await apiResponse.json();

    // 5. Response handle kora
    const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiReply) {
      console.error("Gemini Error:", JSON.stringify(data));
      return NextResponse.json({ response: "I am having trouble thinking right now. Please try again." });
    }

    return NextResponse.json({ response: aiReply });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ response: "Internal Server Error." }, { status: 500 });
  }
}