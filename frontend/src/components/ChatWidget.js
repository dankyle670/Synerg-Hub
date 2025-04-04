import { useState } from "react";
import axios from "axios";
import styles from "../css/ChatWidget.module.css";

// Use environment variable for the backend base URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post(`${API_URL}/api/ai`, { message: input });
      const aiMessage = { sender: "ai", text: res.data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = { sender: "ai", text: "Error connecting to AI." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className={styles.chatContainer}>
      <button className={styles.toggleButton} onClick={toggleChat}>
        SynergHub AI
      </button>

      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <span>Ask SynergHub AI</span>
            <button onClick={toggleChat}>✖</button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user" ? styles.userMsg : styles.aiMsg
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
