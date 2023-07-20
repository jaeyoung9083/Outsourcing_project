import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Video() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // YouTube API 호출을 위한 함수
    const fetchVideos = async () => {
      try {
        const apiKey = 'AIzaSyDjd-3edO32urCc5UVJ9zyADQ9D9g1fON4';
        const videoIds = '3L2-JAbXIAM,fQNO7YvNCSw,bMYg56tlnao,D6HH_sxSj0M,hFR3uDZnwDY,'; // 여기에 가져오고 싶은 동영상 ID를 입력하세요
        const maxResults = 5;

        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds}&maxResults=${maxResults}&key=${apiKey}`
        );
        // console.log(response.data.items);

        const videoList = response.data.items.map((item) => ({
          videoId: item.id,
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails.default.url
        }));
        setVideos(videoList);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div
      style={{
        width: '800px',
        overflowX: 'auto', // 가로 스크롤바 생성을 위한 설정
        display: 'flex',
        gap: '10px',
        paddingBottom: '20px'
      }}
    >
      {videos.map((video) => (
        <div key={video.videoId}>
          <iframe
            width="300"
            height="165"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            frameBorder="0" // 영상 프레임 경계선 없애기
            allowFullScreen // 전체화면으로 플레이어 보여주기
          ></iframe>
          <span>{video.title}</span>
        </div>
      ))}
    </div>
  );
}

export default Video;