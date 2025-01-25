import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import './Chat.css';

function Chat({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "Você" }]);
      setInput("");
      
      const accessToken = sessionStorage.getItem("accessToken");
      try {
        const response = await fetch("https://6874bnnq6a.execute-api.us-east-1.amazonaws.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            input: input,
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();

        const answer = data.Answer.results[0].outputText;


        const botMessage = { text: answer, sender: "Bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        
      } catch (error) {
        console.error("Erro ao chamar a API:", error.message);
        const botMessage = { text: "Erro ao processar sua mensagem. Tente novamente.", sender: "Bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
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