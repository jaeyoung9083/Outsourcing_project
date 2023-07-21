import React from 'react';

export default function BackgroundMusic() {
  return (
    <>
      <audio controls autoPlay loop style={{ display: 'none' }}>
        <source src="/background-music.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
