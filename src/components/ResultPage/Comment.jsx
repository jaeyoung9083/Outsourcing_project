import React, { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { getComments, addComment, deleteComment, updateComment } from '../../libs/Comments';

const Comment = () => {
  const [googleSheetRows, setGoogleSheetRows] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [edit, setEdit] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  // 입력값 받기
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeContent = (event) => {
    setContent(event.target.value);
  };
  const onChangeEditedContent = (event) => {
    setEditedContent(event.target.value);
  };

  // 댓글 조회
  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      const comments = await getComments();
      setGoogleSheetRows(comments);
    };
    fetchGoogleSheetData();
  }, []);

  // 댓글 추가
  const addButton = async () => {
    // 입력값 확인
    if (!name || !content) {
      alert('작성자와 댓글을 모두 입력해주세요');
      return;
    }
    // 새로운 댓글 객체 생성
    const newComment = {
      id: nanoid(),
      name,
      content
    };
    // 구글 스프레드시트에 새로운 댓글 데이터 추가
    await addComment(newComment);
    // googleSheetRows에 새로운 댓글 셋팅
    setGoogleSheetRows([...googleSheetRows, newComment]);
    // 입력 필드 초기화
    setName('');
    setContent('');
  };

  // 댓글 삭제
  const deleteButton = async (commentId) => {
    alert('진짜 삭제할거얌?');
    // 구글 스프레드시트에서 댓글 데이터 삭제
    await deleteComment(commentId);
    // googleSheetRows에 삭제할 댓글 말고 나머지 셋팅
    const updatedComments = googleSheetRows.filter((comment) => comment.id !== commentId);
    setGoogleSheetRows(updatedComments);
  };

  // 댓글 수정
  const editButton = async (commentId) => {
    // 수정 상태 반대로 만들기
    setEdit(!edit);
    // 수정할 댓글 찾기
    const targetComment = googleSheetRows.find((comment) => comment.id === commentId);
    // 수정된 댓글 객체 생성
    const updatedComment = { ...targetComment, content: editedContent };
    // 구글 스프레드시트에서 데이터 수정
    await updateComment(commentId, updatedComment);
    // googleSheetRows에 수정된 댓글 셋팅
    const updatedComments = googleSheetRows.map((comment) => {
      if (comment.id === commentId) {
        return updatedComment;
      }
      return comment;
    });
    setGoogleSheetRows(updatedComments);
  };

  return (
    <div>
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
        작성자 : <input value={name} onChange={onChangeName} />
        댓글 : <input value={content} onChange={onChangeContent} />
        <button onClick={addButton}>댓글 추가</button>
      </div>
      {googleSheetRows.map((row) => (
        <div key={row['id']} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
          <div>작성자: {row['name']}</div>
          {edit ? (
            <>
              <span>내용: </span>
              <input value={editedContent} onChange={onChangeEditedContent} />{' '}
            </>
          ) : (
            <div>내용: {row['content']}</div>
          )}
          <div>
            <button onClick={() => deleteButton(row.id)}>삭제</button>
            <button onClick={() => editButton(row.id)}>{edit ? '저장' : '수정'}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
