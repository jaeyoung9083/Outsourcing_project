import React, { useState, useEffect } from 'react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const storedIsPlaying = localStorage.getItem('isPlaying');
    setIsPlaying(storedIsPlaying === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('isPlaying', isPlaying);
  }, [isPlaying]);

  const handleMusicToggle = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <>
      {isPlaying && (
        <audio id="bg-music" controls autoPlay loop style={{ display: 'none' }}>
          <source src="/background-music.mp3" type="audio/mpeg" />
        </audio>
      )}

      {/* 아이콘 상태에 따라 다른 아이콘을 렌더링 */}
      {isPlaying ? <MusicNoteIcon onClick={handleMusicToggle} /> : <MusicOffIcon onClick={handleMusicToggle} />}
    </>
  );
};

export default BackgroundMusic;
