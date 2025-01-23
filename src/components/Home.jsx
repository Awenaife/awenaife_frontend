import PropTypes from "prop-types";
import { signOut, deleteUser } from "aws-amplify/auth";

function Home({ onLogout }) {
  const handleSignOut = async () => {
    try {
      await signOut();
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
    <div className="main-container">
      <h2>Bem-vindo AWENAIFE!</h2>
      <button onClick={handleSignOut}>Sair</button>
      <button
        onClick={handleDeleteAccount}
        style={{
          backgroundColor: "#e74c3c",
          marginTop: "1rem",
        }}
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