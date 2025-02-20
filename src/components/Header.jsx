import React, { useState } from "react";
import logoAwenaife from "/assets/awenai_acolhimento_marca.png";
import logoMobile from "/assets/awenai_ae_completo_branco.png";
import "./Header.css";
import Chat from "./Chat"; // Ensure you have this component
import Message from "./Messages"; // Import your Message component
import Music from "./Music"; // Import your Music component
import { FiMusic, FiHeart, FiMessageSquare } from "react-icons/fi";

function Header() {
  const [activeComponent, setActiveComponent] = useState(null); // Track which component to display

  // Render the active component based on the button clicked
  if (activeComponent === "Chat") {
    return <Chat onBack={() => setActiveComponent(null)} />;
  }
  if (activeComponent === "Messages") {
    return <Message onBack={() => setActiveComponent(null)} />;
  }
  if (activeComponent === "Music") {
    return <Music onBack={() => setActiveComponent(null)} />;
  }
 
  return (
    <div className="header-container">
      <div className="container_topo">
        <img src={logoAwenaife} /> 
        <div className="menu-header">
          <button onClick={() => setActiveComponent("Messages")}>
            <span className="web">Mensagem</span>
            <span className="mobile"><FiHeart/></span>
          </button>
          <button
            onClick={() => setActiveComponent("Chat")}
            onMouseEnter={() => setIsHoveredC(true)}
            onMouseLeave={() => setIsHoveredC(false)}
          >
            <span className="web">Aconselhamento</span>
            <span className="mobile"><FiMessageSquare/></span>
          </button>
          <button onClick={() => setActiveComponent("Music")}>
            <span className="web">Músicas</span>
            <span className="mobile"><FiMusic/></span>
          </button>
        </div>
      </div>
      <div className="header_banner">
        <h2 className="texto_azul">Aconselhamento</h2>
        <h2 className="texto_laranja">Espiritual</h2>
      </div>
    </div>
  );
}

// Optional: Define PropTypes (if props are expected in future)
Header.propTypes = {};

export default Header;