import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Heyy! I am your assistant. How can I help you today?",
    },
  ]);
  const messagesEndRef = useRef(null); // for auto scroll

  const getBotResponse = async (userInput) => {
      const question = userInput;
      try {
        const res = await fetch('http://localhost:3000/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
        });

        const data = await res.json();
        return data.result || 'No response received.';
      } catch (err) {
        return 'Error: ' + err.message;
      }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const userInput = input;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botReply = { sender: "bot", text: getBotResponse(userInput) };
      setMessages((prev) => [...prev, botReply]);
    }, 10); // 0.01 second delay for bot
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, id) => (
          <div
            key={id}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          value={input}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
