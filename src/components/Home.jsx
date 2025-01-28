import PropTypes from "prop-types";
import { signOut, deleteUser } from "aws-amplify/auth";
import { useState } from "react";
import Chat from "./Chat";
import './Home.css';

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

  if (showChat) {
    return <Chat onBack={() => setShowChat(false)} />;
  }

  return (
    <div className="main-container">
      <h2>Bem-vindo à Awenai Aconselhamento Espiritual!</h2>
      <button
        onClick={() => setShowChat(true)}
        style={{
          backgroundColor: isHoveredC ? "#218838" : "#28a745",
          marginTop: "1rem",
        }}
        onMouseEnter={() => setIsHoveredC(true)}
        onMouseLeave={() => setIsHoveredC(false)}
      >
        Chat
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

Home.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Home;