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

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes("hello") || input.includes("hi")) return "Hello there 😊";
    if (input.includes("how are you") || input.includes("kaise ho")) return "I am great 😊, how are you?";
    if (input.includes("your name")) return "I am a simple chat bot.";
    if (input.includes("bye")) return "Goodbye 😊, have a great day!";
    return "Sorry! I did not understand that T_T";
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
    }, 800); // 0.8 second delay for bot
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
