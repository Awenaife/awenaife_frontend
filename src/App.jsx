import { useState, useEffect } from 'react';
import { signOut, fetchAuthSession } from 'aws-amplify/auth';
import Login from "./components/Login";
import Home from "./components/Home";
import './App.css';
import './amplifyConfig';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    
    const checkUserSession = async () => {
      try {
        const session = await fetchAuthSession(); 
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = session.tokens.accessToken.payload.exp;

        if (currentTime > expirationTime) {
          console.log("Sessão expirada. Redirecionando para o login.");
          await signOut();
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Sessão não encontrada. Redirecionando para o login.", error.message);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  if (loading) return <div className="loading-screen">Carregando...</div>;

  return (
    <div>
      {isLoggedIn ? (
        <Home onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;