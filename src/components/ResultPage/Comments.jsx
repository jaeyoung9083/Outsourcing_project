// db.json
import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getComments, addComment, deleteComment, editComment } from '../../api/comments';

const Comments = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
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
  const { data: comments } = useQuery('comments', getComments);

  // 댓글 추가
  const queryClient = useQueryClient();
  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    }
  });
  const addButton = () => {
    // 입력값 확인
    if (!name || !content) {
      alert('작성자와 댓글을 모두 입력해주세요');
      return;
    }
    const newComment = {
      id: nanoid(),
      name,
      content,
      date: new Date().toLocaleDateString('ko-KR')
    };
    addMutation.mutate(newComment);
    // 입력 필드 초기화
    setName('');
    setContent('');
  };

  // 댓글 삭제
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    }
  });
  const deleteButton = (id) => {
    alert('댓글을 삭제하시겠습니까?');
    deleteMutation.mutate(id);
  };

  // 댓글 수정
  const editMutation = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    }
  });
  const editButton = (comment) => {
    setEditId(comment.id);
    if (!editId) {
      setEditedContent(comment.content);
    } else {
      const editedComment = {
        ...comment,
        content: editedContent
      };
      editMutation.mutate(editedComment);
      setEditId(null);
    }
  };

  return (
    <div>
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
        작성자 : <input value={name} onChange={onChangeName} />
        댓글 : <input value={content} onChange={onChangeContent} />
        <button onClick={addButton}>댓글 추가</button>
      </div>
      {comments?.map((comment) => (
        <div key={comment.id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
          <div>작성자: {comment.name}</div>
          {comment.id === editId ? (
            <>
              <span>내용: </span>
              <input value={editedContent} onChange={onChangeEditedContent} />
            </>
          ) : (
            <div>내용: {comment.content}</div>
          )}
          <div>작성일 : {comment.date}</div>
          <div>
            <button onClick={() => deleteButton(comment.id)}>삭제</button>
            <button onClick={() => editButton(comment)}>{comment.id === editId ? '저장' : '수정'}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
