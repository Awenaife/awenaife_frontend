import React, { useState, useEffect } from "react";
import Header from "./Header";
import Chat from "./Chat";
import Message from "./Messages";
import Music from "./Music";
import Home from "./Home";
import Who from "./Who";
import "./Main.css";

function Main() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleBack = () => {
    setActiveComponent(null); // Reset active component when going back
  };

  useEffect(() => {
    if (activeComponent !== null) {
      console.log("Rendering Main, activeComponent:", activeComponent);
    }
  }, [activeComponent]); // Dependency array: only run when activeComponent changes



  return (
    <div className="main-container">

      <Header
        onMessage={() => setActiveComponent("Messages")}
        onChat={() => setActiveComponent("Chat")}
        onMusic={() => setActiveComponent("Music")}
        onSetup={() => setActiveComponent("Home")}
        onWho={() => setActiveComponent("Who")}
      /> 

      <div className="main-content">
        {activeComponent === "Who" &&
          <Who
            onBack={handleBack} />
        }
        {activeComponent === "Chat" &&
          <Chat
            onBack={handleBack} />
        }
        {activeComponent === "Messages" &&
          <Message
            onBack={handleBack} />
        }
        {activeComponent === "Music" &&
          <Music
            onBack={handleBack} />
        }
        {activeComponent === "Home" &&
          <Home
            onBack={handleBack} />
        }
      </div>
    </div>
  );
}

export default Main;