import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { FiSend, FiUser, FiHeart, FiArrowLeft } from "react-icons/fi";
import './Chat.css';
import topHeader from './Header';

function Chat({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
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


        const botMessage = { text: answer, sender: "bot", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        
      } catch (error) {
        console.error("Erro ao chamar a API:", error.message);
        const botMessage = { text: "Erro ao processar sua mensagem. Tente novamente.", sender: "bot" };
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
     {/* <div className="container_topo">
        <img src="src\assets\awenai_acolhimento_marca.png" />
      </div>
      <div className="header_banner">
        <h2 className="texto_azul">Aconselhamento</h2>
        <h2 className="texto_laranja">Espiritual</h2>
      </div>
      <h2>Chat</h2>*/}
      <Header />
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-bubble ${message.sender === "user" ? "user" : "bot"}`}
          >
            <div className="icon">
              {message.sender === "user" ? <FiUser /> : <FiHeart />}
            </div>
            <div className="message-content">
              <p className="message-text">{message.text}</p>
              <span className="timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} />
        <span className="send-icon" onClick={handleSend}>
          <FiSend size={24} />
        </span>
      </div>
      <span onClick={onBack}>
        <FiArrowLeft size={24} />
      </span>
    </div>
  );
};

Chat.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default Chat;