import PropTypes from "prop-types";
import { useState } from "react";
import './Chat.css';

function Chat({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "Você" }]);
      setInput("");
      const botMessage = { text: "Mensagem recebida: " + input, sender: "Bot" };
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Digite sua mensagem..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSend}>Enviar</button>
      <button onClick={onBack} style={{ marginTop: "1rem" }}>
        Voltar
      </button>
    </div>
  );
}

Chat.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default Chat;