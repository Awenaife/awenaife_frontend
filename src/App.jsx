import PropTypes from "prop-types";
import { useState } from 'react';
import './App.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticação fictícia
    if (email === 'user@example.com' && password === 'password') {
      onLogin();
    } else {
      alert('Credenciais inválidas!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

function MainScreen({ onLogout }) {
  return (
    <div className="main-container">
      <h1>Bem-vindo à Tela Principal!</h1>
      <button onClick={onLogout}>Sair</button>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <MainScreen onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

MainScreen.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default App;