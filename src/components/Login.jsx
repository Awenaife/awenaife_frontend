import PropTypes from "prop-types";
import { useState } from "react";
import { signIn, signUp, confirmSignUp, resetPassword, confirmResetPassword, fetchAuthSession } from "aws-amplify/auth";
import './Login.css';
import logoAwenaife from "/assets/awenai_acolhimento_completo.png";
import logoGoogle from "/assets/logo-google-256.png";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn({ username: email, password });
      onLogin();
      const session = await fetchAuthSession(); 
      const token = session.tokens.accessToken.toString(0);
      const expirationTime = session.tokens.accessToken.payload.exp;
      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("expirationTime", expirationTime);
    } catch (err) {
      console.log('Erro ao entrar:', err.message);
      setError("Credenciais inválidas! Verifique e tente novamente.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp({ username: email, password, attributes: { email } });
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
      await confirmSignUp({ username: email, confirmationCode });
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
      await resetPassword({ username: email });
      setIsResetPassword(true);
      setError('');
    } catch (err) {
      console.log('Erro ao requisitar troca de senha:', err.message);
      setError('Erro ao resetar a senha! Tente novamente.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await confirmResetPassword({ username: email, newPassword, confirmationCode });
      setIsResetPassword(false);
      setError('');
      alert("Senha redefinida com sucesso!");
    } catch (err) {
      console.log('Erro ao trocar a senha:', err.message);
      setError('Código inválido ou senha fraca. Tente novamente.');
    }
  };

  const handleClick = () => {
    alert("Ícone clicado!");
  };

  return (
    <div className="login-container">
      <img src={logoAwenaife} />
      <h2>{isSignUp ? "Cadastro" : isResetPassword ? "Troca de senha" : "Login"}</h2>
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
            {isResetPassword && (
              <input
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            )}
            <input
              type="text"
              placeholder="Código de confirmação"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
            />
            
          </>
        )}
        <button type="submit">
          {isSignUp
            ? isConfirming
              ? "Confirmar"
              : "Cadastrar"
            : isResetPassword
              ? "Trocar Senha"
              : "Entrar"}
        </button>
      </form>
      {!isResetPassword && (
        <button onClick={() => {
            setIsSignUp(!isSignUp)
            setError('');
        }}>
          {isSignUp ? "Já possui uma conta? Entre!" : "Cadastre-se!"}
        </button>
      )}
      {/* 
      {!isResetPassword && (
        <div>
          <a>Ou entre usando sua conta </a>
          <img
            src={logoGoogle}
            alt="Ícone"
            onClick={handleClick}
            style={{ cursor: "pointer", width: "50px", height: "20px", padding: "20px 10px 14px 1px" }}/>
        </div>
      )}
      */}
      {!isSignUp && !isResetPassword && (
       <div className="clean">
        <button
            onClick={(e) => {
              e.preventDefault();
              setError('');
              handleForgotPassword(e);
            }}
          >
            Esqueceu sua senha?
          </button>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;