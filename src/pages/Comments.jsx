// db.json
import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import background from '../assets/background.png';
import { nanoid } from '@reduxjs/toolkit';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getComments, addComment, deleteComment, editComment } from '../api/comments';

const Comments = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [editId, setEditId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [currentUserName, setCurrentUserName] = useState(null);

  // 유저 로그인 상태 확인
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUserName(user?.displayName);
    });
  }, []);

  // 입력값 받기
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeContent = (event) => {
    setContent(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
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
    if (currentUserName && !content) {
      alert('댓글을 입력해주세요');
    } else if ((!currentUserName && !name) || !content) {
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
      password,
      name: currentUserName ? currentUserName : name,
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
  const deleteButton = (comment) => {
    if (!currentUserName) {
      const checkpassword = prompt('비밀번호를 입력하세요');
      if (checkpassword === null) return;

      // 비밀번호가 비어있거나 일치하지 않는 경우
      if (checkpassword === '' || checkpassword !== comment.password) {
        alert('비밀번호가 일치하지 않습니다.');
      }
      // 비밀번호가 일치하는 경우
      if (checkpassword === comment.password) {
        deleteMutation.mutate(comment.id);
      }
    } else {
      // 로그인한 경우 사용자가 확인을 누른 경우에만 삭제 로직 실행
      const shouldDelete = window.confirm('댓글을 삭제하시겠습니까?');
      if (shouldDelete) {
        deleteMutation.mutate(comment.id);
      }
    }
  };

  // 댓글 수정
  const editMutation = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    }
  });
  const editButton = (comment) => {
    if (!currentUserName) {
      if (editId === comment.id) {
        setEditId(null);
      } else {
        const checkpassword = prompt('비밀번호를 입력하세요');
        if (checkpassword === null) return;
        if (checkpassword === '' || checkpassword !== comment.password) {
          alert('비밀번호가 일치하지 않습니다.');
          return;
        }
        setEditId(comment.id);
        setPassword(checkpassword);
      }
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
    } else {
      // 유저가 있는 경우 수정 버튼을 누르면 수정 가능하도록 구현
      setEditId(comment.id);
      setEditedContent(comment.content);
    }
  };

  // 저장 버튼
  const saveButton = (comment) => {
    const editedComment = {
      ...comment,
      content: editedContent
    };
    editMutation.mutate(editedComment);
    setEditId(null);
  };

  return (
    <>
      <CommentContainer>
        <MainTitle>🧙🏼‍♂️ 당신은 어떤 기숙사를 배정 받으셨나요?</MainTitle>
        <InputBox>
          {currentUserName ? (
            <Input>작성자 : {currentUserName}</Input>
          ) : (
            <Input>
              작성자 :{' '}
              <input
                placeholder="작성자를 입력해주세요"
                value={name}
                onChange={onChangeName}
                style={{ height: '20px', width: '150px' }}
              />
            </Input>
          )}
          {currentUserName ? (
            <></>
          ) : (
            <Input>
              비밀번호 :{' '}
              <input
                type="password"
                placeholder="숫자 4자리"
                value={password}
                onChange={onChangePassword}
                style={{ height: '20px', width: '100px' }}
              />
            </Input>
          )}
        </InputBox>
        <InputBox style={{ marginBottom: '40px' }}>
          <Input>
            댓글 :{' '}
            <input
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={onChangeContent}
              style={{ height: '20px', width: '400px' }}
            />
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
                  <input
                    value={editedContent}
                    onChange={onChangeEditedContent}
                    style={{ height: '20px', width: '400px' }}
                  />
                </Content>
              ) : (
                <Content>내용: {comment.content}</Content>
              )}
              {currentUserName === comment.name && (
                <ButtonBox>
                  <StButton onClick={() => deleteButton(comment)}>삭제</StButton>
                  {comment.id === editId ? (
                    <StButton onClick={() => saveButton(comment)}>저장</StButton>
                  ) : (
                    <StButton onClick={() => editButton(comment)}>수정</StButton>
                  )}
                </ButtonBox>
              )}
              {!currentUserName && (
                <ButtonBox>
                  <StButton onClick={() => deleteButton(comment)}>삭제</StButton>
                  {comment.id === editId ? (
                    <StButton onClick={() => saveButton(comment)}>저장</StButton>
                  ) : (
                    <StButton onClick={() => editButton(comment)}>수정</StButton>
                  )}
                </ButtonBox>
              )}
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
  padding: 40px;
  font-size: 30px;
  font-weight: bolder;
  color: #fff;
`;

const CommentBox = styled.div`
  overflow-y: auto;
  max-width: 700px;
  max-height: 700px;
  margin: auto;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 20px 0;
  padding: 0px;
`;

const Input = styled.div`
  margin: 0 15px 0 15px;
  font-size: 18px;
  color: #fff;
`;

const Comment = styled.div`
  margin: 10px;
  padding: 15px 20px 15px 20px;
  border-radius: 10px;
  background-color: #141b3f8b;
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
