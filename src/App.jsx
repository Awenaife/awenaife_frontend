import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { signIn, signUp, confirmSignUp, signOut, getCurrentUser, resetPassword, confirmResetPassword } from 'aws-amplify/auth';
import './App.css';
import './amplifyConfig';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn({username: email, password: password});
      onLogin();
    } catch (err) {
      console.log('Erro ao entrar:', err.message);
      setError('Credenciais inválidas! Verifique e tente novamente.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp({
        username: email,
        password: password,
        attributes: { email },
      });
      setIsConfirming(true);
      setError('');
    } catch (err) {
      console.log('Erro ao cadastrar:', err.message);
      setError('Erro ao cadastrar. Tente novamente.');
    }
  };

  const handleConfirmation = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp({username: email, confirmationCode: confirmationCode});
      setIsSignUp(false);
      setIsConfirming(false);
      setError('');
    } catch (err) {
      console.log('Erro ao confirmar:', err.message);
      setError('Código de confirmação inválido! Tente novamente.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({username: email});
      setIsResetPassword(true);
      setError('');
    } catch (err) {
      console.log('Error requesting password reset:', err.message);
      setError('Erro ao resetar a senha! Tente novamente.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await confirmResetPassword({username: email,  newPassword: newPassword, confirmationCode: confirmationCode});
      setIsResetPassword(false);
      setIsSignUp(false);
      setIsConfirming(false);
      setError('');
      alert('Password reset successful! Please log in with your new password.');
    } catch (err) {
      console.log('Error resetting password:', err.message);
      setError('Código inválido ou senha fraca. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <h2>
        {isSignUp
          ? 'Cadastro'
          : isResetPassword
          ? 'Troca de senha'
          : 'Login'}
      </h2>
      <form
        onSubmit={
          isSignUp
            ? isConfirming
              ? handleConfirmation
              : handleSignUp
            : isResetPassword
              ? handleResetPassword
              : handleLogin
        }
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {!isResetPassword && (
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}
        {(isConfirming || isResetPassword) && (
          <>
            <input
              type="text"
              placeholder="Código de confirmação"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
            />
            {isResetPassword && (
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            )}
          </>
        )}
        <button type="submit">
          {isSignUp
            ? isConfirming
              ? 'Confirmar'
              : 'Cadastrar'
            : isResetPassword
              ? 'Trocar Senha'
              : 'Entrar'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      {!isResetPassword && (
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? 'Já possui uma conta? Entre!'
            : 'Cadastre-se!'}
        </button>
      )}
      {!isSignUp && !isResetPassword && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsResetPassword(true);
            handleForgotPassword(e);
          }}
        >
        Esqueceu sua senha?
        </button>
      )}
    </div>
  );
}

function MainScreen({ onLogout }) {
  const handleSignOut = async () => {
    try {
      await signOut();
      onLogout();
    } catch (err) {
      console.log('Erro ao sair:', err.message);
    }
  };
  return (
    <div className="main-container">
      <h2>Bem-vindo AWENAIFE!</h2>
      <button onClick={handleSignOut}>Sair</button>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Check if a user is already logged in
        await getCurrentUser();
        setIsLoggedIn(true);
      } catch (err) {
        console.log('No active session:', err.message);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  if (loading) {
    return <div className="loading-screen">Carregando...</div>;
  }

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