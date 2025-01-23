import PropTypes from "prop-types";
import { signOut } from "aws-amplify/auth";
import './Home.css';

function Home({ onLogout }) {
  const handleSignOut = async () => {
    try {
      await signOut();
      onLogout();
    } catch {
      console.log("Erro ao sair.");
    }
  };

  return (
    <div className="main-container">
      <h2>Bem-vindo a AWENAIFE!!!</h2>
      <button onClick={handleSignOut}>Sair</button>
    </div>
  );
}

Home.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Home;