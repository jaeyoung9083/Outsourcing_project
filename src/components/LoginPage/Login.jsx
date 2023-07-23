import React from 'react';
import { styled } from 'styled-components';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 입력값 받기
  const onChangeHandler = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const navigate = useNavigate();

  // 로그인 버튼
  const loginButtonHandler = async (event) => {
    event.preventDefault();
    // 입력값 검사
    if (!email || !password) {
      return alert('모든 항목을 입력해주세요');
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // 로그인 성공하면 홈으로 이동
      navigate('/');
    } catch (error) {
      // 에러처리
      console.log(error.message);
    }
  };

  return (
    <>
      <LoginContainer>
        <LogoContainer>
          <LogoImg src={logo} style={{ marginLeft: '5px' }} />
        </LogoContainer>
        <MainContainer>
          <InputBox
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            name="email"
            onChange={onChangeHandler}
            required
          />
          <InputBox
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            name="password"
            onChange={onChangeHandler}
            required
          />
          <StButton backgroundcolor="#333" border="#333" color="white" onClick={loginButtonHandler}>
            로그인
          </StButton>
          <StButton
            backgroundcolor="white"
            border="1px solid #333"
            color="#333"
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
          >
            회원가입
          </StButton>
        </MainContainer>
      </LoginContainer>
    </>
  );
}

export default Login;

// 스타일 영역
const LoginContainer = styled.div`
  margin: auto;
  background-color: #fff;
  padding: 20px;
  width: 420px;
  height: 700px;
  border-radius: 10px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 130px;
  height: auto;
  margin: 20px;
`;

const MainContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const InputBox = styled.input`
  width: 282px;
  height: 50px;
  margin: 5px;
  padding-left: 10px;
  font-size: 15px;
  display: inline-block;
  outline: none;

  &:focus {
    border: 2px solid #333;
    border-radius: 3px;
  }
`;

const StButton = styled.button`
  width: 300px;
  height: 50px;
  margin: 5px;
  cursor: pointer;
  font-size: 15px;
  border-radius: 3px;
  border: ${({ border }) => border};
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  color: ${({ color }) => color};
`;
