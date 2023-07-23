import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 이메일과 비밀번호 입력 받기
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  // 회원가입 버튼
  const signupButton = async (event) => {
    event.preventDefault();
    // 입력값 검사
    if (!email || !password) {
      return alert('아이디와 비밀번호를 모두 입력해주세요');
    }
    // 회원가입
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // 회원가입 완료 시 자동 로그인되기 때문에 홈으로 이동
      navigate('/');
    } catch (error) {
      // 에러 처리
    }
  };
  return (
    <SignupContainer>
      <h2 style={{ marginTop: '50px' }}>회원가입</h2>
      <SignupForm>
        <StyledLabel>이메일 :</StyledLabel>
        <StyledInput type="email" placeholder="이메일을 입력해주세요" value={email} onChange={onChangeEmail} />
        <StyledLabel>비밀번호 :</StyledLabel>
        <StyledInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={onChangePassword}
        />
        <StyledButton onClick={signupButton}>회원가입</StyledButton>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 30px 20px 30px 20px;
  max-width: 400px;
  margin-top: 10px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 250px;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  margin-top: 40px;
  padding: 8px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
