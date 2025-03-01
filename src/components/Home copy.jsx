import PropTypes from "prop-types";
import { signOut, deleteUser } from "aws-amplify/auth";
import { useState } from "react";
import logoAwenaife from "/assets/awenai_acolhimento_completo.png";
import './Home.css';
{/*import Header from "./Header";*/}
import Main from "./Main";
import Who from "./Who";


function Home({ onLogout }) {
  const [showChat, setShowChat] = useState(false);
  const [isHoveredC, setIsHoveredC] = useState(false);
  const [isHoveredE, setIsHoveredE] = useState(false);
  const handleSignOut = async () => {
    try {
      await signOut();
      sessionStorage.clear();
      onLogout();
    } catch (err) {
      console.log("Erro ao sair:", err.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Tem certeza de que deseja excluir sua conta? Essa ação é irreversível!")) {
      try {
        await deleteUser();
        alert("Conta excluída com sucesso.");
        onLogout();
      } catch (err) {
        console.log("Erro ao excluir a conta:", err.message);
        alert("Erro ao excluir a conta. Tente novamente mais tarde.");
      }
    }
  };



  return (
    <div className="window-container">
      <img src={logoAwenaife} />
      <h2>Bem-vindo!</h2>
      <button
        onClick={() => setShowChat(true)}
        style={{
          backgroundColor: isHoveredC ? "#218838" : "#28a745",
          marginTop: "1rem",
        }}
        onMouseEnter={() => setIsHoveredC(true)}
        onMouseLeave={() => setIsHoveredC(false)}
      >
        Quem Somos
      </button>
      <button onClick={handleSignOut}>Sair</button>
      <button
        onClick={handleDeleteAccount}
        style={{
          backgroundColor: isHoveredE ? "#8b0000" : "#e74c3c",
          marginTop: "1rem",
        }}
        onMouseEnter={() => setIsHoveredE(true)}
        onMouseLeave={() => setIsHoveredE(false)}
      >
        Excluir minha conta
      </button>
    </div>
  );
}

/*Home.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
*/

export default Home;