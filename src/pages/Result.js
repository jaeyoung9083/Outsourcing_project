import React from 'react';
import Video from '../components/ResultPage/Video';
import Comment from '../components/ResultPage/Comment';

export default function Result() {
  return (
    <div>
      <h2>기숙사 배정 결과</h2>
      {/* 해리포터 기숙사 관련 Youtube 영상 */}
      <Video />
      {/* 댓글창 */}
      <h2>댓글창</h2>
      <Comment />
    </div>
  );
}
