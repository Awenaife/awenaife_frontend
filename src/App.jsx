import { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
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
        await getCurrentUser();
        setIsLoggedIn(true);
      } catch {
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