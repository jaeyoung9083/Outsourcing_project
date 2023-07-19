import React from 'react';
import Video from './Video';

export default function Result() {
  return (
    <div>
      <div>기숙사 배정 결과</div>
      <br />
      <br />
      {/* 해리포터 기숙사 관련 Youtube 영상 */}
      <Video />
      <br />
      <br />
      {/* 댓글창 */}
      <div>댓글창</div>
    </div>
  );
}
