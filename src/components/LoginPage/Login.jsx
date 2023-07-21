import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { addCurrentUser } from '../../redux/modules/loginSlice'; // 리덕스 슬라이스 파일 경로를 수정
import styled from 'styled-components';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInFunc = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert('모든 값을 채워주세요.');
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // 리덕스 스토어에 유저 정보 추가
      dispatch(
        addCurrentUser({
          currentUser: {
            name: '하하'
          },
          isLogin: true
        })
      );
      navigate('/');
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/user-not-found') {
        alert('존재하지 않는 이메일입니다.');
      } else if (error.code === 'auth/wrong-password') {
        alert('비밀번호가 일치하지 않습니다.');
      } else {
        alert('로그인이 실패하였습니다.');
      }
    }
  };
  // useEffect(() => {
  //   if (user?.users) {
  //     navigate('/');
  //   }
  // }, [user, navigate]);
  return (
    <LoginContainer>
      <LoginForm>
        <span>로그인</span>
        <div>
          <StyledLabel>이메일 :</StyledLabel>
          <StyledInput
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <StyledLabel>비밀번호 :</StyledLabel>
          <StyledInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <StyledButton onClick={signInFunc}>로그인</StyledButton>
        <StyledLink
          onClick={(e) => {
            e.preventDefault();
            navigate('/signup');
          }}
        >
          회원가입 하로 가기
        </StyledLink>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;

// Define your styled-components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 250px;
`;

const StyledButton = styled.button`
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

const StyledLink = styled.p`
  margin-top: 10px;
  cursor: pointer;
  color: #007bff;
`;
