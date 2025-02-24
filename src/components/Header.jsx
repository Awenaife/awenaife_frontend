import React, { useState } from "react";
import logoAwenaife from "/assets/awenai_acolhimento_marca.png";
import logoMobile from "/assets/awenai_ae_completo_branco.png";
import "./Header.css";
import { FiMusic, FiHeart, FiMessageSquare } from "react-icons/fi";

function Header({ onMessage, onChat, onMusic }) {
  const [isHoveredC, setIsHoveredC] = useState(false);



  return (
    <div>
      <div className="header-container">
        <div className="container_topo">
          <img src={logoAwenaife} alt="Logo" />
          <div className="menu-header">
            <button onClick={onMessage}>
              <span className="web">Mensagem</span>
              <span className="mobile">
                <FiHeart />
              </span>
            </button>
            <button
              onClick={onChat}
            //onMouseEnter={() => setIsHoveredC(true)}
            //onMouseLeave={() => setIsHoveredC(false)}
            >
              <span className="web">Aconselhamento</span>
              <span className="mobile">
                <FiMessageSquare />
              </span>
            </button>
            <button onClick={onMusic}>
              <span className="web">Músicas</span>
              <span className="mobile">
                <FiMusic />
              </span>
            </button>
          </div>
        </div>
        <div className="header_banner">
          <h2 className="texto_azul">Aconselhamento</h2>
          <h2 className="texto_laranja">Espiritual</h2>
        </div>
      </div>
    </div>
  );
}

// Optional: Define PropTypes (if props are expected in future)
Header.propTypes = {};

export default Header;
