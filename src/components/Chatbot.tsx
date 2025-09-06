
import { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

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

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: "system", content: SYSTEM_PROMPT },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [
      ...messages,
      { role: "user", content: input }
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
  const res = await axios.post("http://localhost:5001/api/chat", { message: input });
  const reply = res.data.reply || "Sorry, I couldn't get a response.";
  setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, there was an error." }]);
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <h2>Finance Guide Chatbot</h2>
      <div className="chatbot-messages">
        {messages.filter(m => m.role !== "system").map((m, i) => (
          <div
            key={i}
            className={`chatbot-message ${m.role === "user" ? "user" : "assistant"}`}
          >
            <b>{m.role === "user" ? "You" : "Finance Guide"}:</b> {m.content}
          </div>
        ))}
        {loading && <div><i>Finance Guide is typing...</i></div>}
      </div>
      <div className="chatbot-input-row">
        <input
          className="chatbot-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask a finance question..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
