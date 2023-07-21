import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Check if the music should be playing from localStorage on component mount
  useEffect(() => {
    const storedIsPlaying = localStorage.getItem('isPlaying');
    setIsPlaying(storedIsPlaying === 'true');
  }, []);

  // // Save the music playing state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isPlaying', isPlaying);
  }, [isPlaying]);

  const handleMusicToggle = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <>
      {isPlaying && (
        <AudioWrapper>
          <audio id="bg-music" controls autoPlay loop style={{ display: 'none' }}>
            <source src="/background-music.mp3" type="audio/mpeg" />
          </audio>
        </AudioWrapper>
      )}

      {/* 아이콘 상태에 따라 다른 아이콘을 렌더링 */}
      {isPlaying ? <MusicNoteIcon onClick={handleMusicToggle} /> : <MusicOffIcon onClick={handleMusicToggle} />}
    </>
  );
};

export default BackgroundMusic;

const AudioWrapper = styled.div`
  /* Add your custom styles here */
`;
