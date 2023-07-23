// db.json
import React, { useState } from 'react';
import { styled } from 'styled-components';
import background from '../assets/CommentsBackground.jpg';
import { nanoid } from '@reduxjs/toolkit';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getComments, addComment, deleteComment, editComment } from '../api/comments';

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
    // 작성일시 가자오기
    const now = new Date();
    const date = now.toLocaleDateString('ko-KR');
    const time = now.toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    // 새로운 댓글 객체 생성
    const newComment = {
      id: nanoid(),
      name,
      content,
      date,
      time
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
    <>
      <CommentContainer>
        <MainTitle>🧙 당신은 어떤 기숙사를 배정 받으셨나요?</MainTitle>
        <InputBox>
          <Input>
            작성자 : <input value={name} onChange={onChangeName} style={{ height: '20px', width: '150px' }} />
          </Input>
          <Input>
            댓글 : <input value={content} onChange={onChangeContent} style={{ height: '20px', width: '280px' }} />
          </Input>
          <StButton style={{ width: '100px' }} onClick={addButton}>
            댓글 추가
          </StButton>
        </InputBox>
        <CommentBox>
          {comments?.map((comment) => (
            <Comment key={comment.id}>
              <Content>작성자: {comment.name}</Content>
              <Content>
                작성일시 : {comment.date} {comment.time}
              </Content>
              {comment.id === editId ? (
                <Content>
                  <span>내용: </span>
                  <input value={editedContent} onChange={onChangeEditedContent} />
                </Content>
              ) : (
                <Content>{comment.content}</Content>
              )}
              <ButtonBox>
                <StButton onClick={() => deleteButton(comment.id)}>삭제</StButton>
                <StButton onClick={() => editButton(comment)}>{comment.id === editId ? '저장' : '수정'}</StButton>
              </ButtonBox>
            </Comment>
          ))}
        </CommentBox>
      </CommentContainer>
    </>
  );
};

export default Comments;

const CommentContainer = styled.div`
  padding: 0;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  height: 100vh;
`;

const MainTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px 40px 40px 40px;
  font-family: 'noto-sans-kr', sans-serif;
  font-size: 25px;
  font-weight: 400;
  color: #fff;
`;

const CommentBox = styled.div`
  overflow-y: auto;
  max-width: 700px;
  max-height: 500px;
  margin: auto;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
`;

const Input = styled.div`
  margin: 15px;
  font-size: 15px;
  color: #fff;
`;

const Comment = styled.div`
  margin: 10px;
  padding: 15px 20px 15px 20px;
  border-radius: 10px;
  background-color: #0000008a;
  color: #fff;
`;

const Content = styled.div`
  margin-top: 8px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StButton = styled.button`
  width: 60px;
  height: 28px;
  font-size: 14px;
  color: white;
  background-color: #cfa33c;
  border: none;
  border-radius: 20px;
  margin: 0 5px 0 5px;
  cursor: pointer;
`;
