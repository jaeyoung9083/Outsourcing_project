import React from 'react';

export default function BackgroundMusic() {
  return (
    <>
      <audio controls autoPlay loop style={{ display: 'none' }}>
        <source src="https://drive.google.com/uc?id=1_Vtx5pwvyv9GZMrDqSpVcHj55zxV50EK" type="audio/mpeg" />
      </audio>
    </>
  );
}

// "public/background-music.mp3"
