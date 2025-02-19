import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./Music.css";

const MUSIC_FOLDER = "../assets/music/";

const Music = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Simulação de leitura de arquivos da pasta (normalmente feito no backend)
    const mockSongs = [
      { title: "Conhecereis a Verdade", file: "conhecereis-a-verdade.mp3", cover: "conhecereis-a-verdade.jpeg" },
      { title: "Consolo do Espírito", file: "consolo-do-espirito.mp3", cover: "consolo-do-espirito.jpeg" },
      { title: "My Shepherd's Comfort", file: "my-shepherd_s-comfort.mp3", cover: "my-shepherd_s-comfort.jpeg" },      
      { title: "Não Temas", file: "nao-temas.mp3", cover: "nao-temas.jpeg" },
      { title: "Proteção Divina", file: "protecao-divina.mp3", cover: "protecao-divina.jpeg" },
      
    ];
    setSongs(mockSongs);
  }, []);

  const playSong = (song) => {
    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(`${MUSIC_FOLDER}${song.file}`);
    newAudio.play();
    setAudio(newAudio);
    setCurrentSong(song);
  };

  return (
    <div className="music-library">
      <Header />
      <h3>Biblioteca de Músicas</h3>
      <div className="songs-grid">
        {songs.map((song, index) => (
          <div key={index} className="song-card" onClick={() => playSong(song)}>
            <img src={`${MUSIC_FOLDER}${song.cover}`} alt={song.title} />
            <p>{song.title}</p>
          </div>
        ))}
      </div>

      {currentSong && (
        <div className="now-playing">
          <p>Tocando agora: <span>{currentSong.title}</span></p>
        </div>
      )}
    </div>
  );
}

export default Music;