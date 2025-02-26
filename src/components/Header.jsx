import React, { useState } from "react";
import logoAwenaife from "/assets/awenai_acolhimento_marca.png";
import logoMobile from "/assets/awenai_ae_completo_branco.png";
import "./Header.css";
import { FiBookOpen, FiMoreHorizontal, FiMusic, FiHeart, FiMessageSquare, FiUser } from "react-icons/fi";

function Header({ onMessage, onChat, onMusic, onSetup, onWho }) {
  const [isHoveredC, setIsHoveredC] = useState(false);



  return (
    <div>
      <div className="header-container">
        <div className="container_topo">
          <img className="web" src={logoAwenaife} alt="Logo"/>  
          <img className="mobile" src={logoMobile} alt="Logo"/> 
          <div className="menu-header">
           
           {/* <button onClick={onWho}>
              <span className="web">Quem Somos</span>
              <span className="mobile">
                <FiUser />
              </span>
            </button>
            */}
            <button onClick={onMessage}>
              <span className="web">Mensagem</span>
              <span className="mobile">
                <FiBookOpen />
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
            <button onClick={onSetup}>
              <span className="web">Mais</span>
              <span className="mobile">
                <FiMoreHorizontal />
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
