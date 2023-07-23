import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkpassword, setCheckPassword] = useState('');
  const [name, setName] = useState('');
  const [caution, setCaution] = useState('');
  const navigate = useNavigate();

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
    if (name === 'checkpassword') {
      setCheckPassword(value);
    }
    if (name === 'name') {
      setName(value);
    }
  };

  // 회원가입 버튼
  const signUpButtonHandler = async (event) => {
    event.preventDefault();
    // 입력값 검사
    if (!email || !password || !checkpassword || !name) {
      return alert('모든 항목을 입력해주세요');
    }
    try {
      // 여기서 비동기 처리
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name
      });
      // 회원가입 완료시 로그인 페이지로 이동
      navigate('/login');
    } catch (error) {
      // 에러 처리
      console.log(error.message);
    }
  };

  // 비밀번호 확인
  useEffect(() => {
    if (checkpassword.length >= 6 && password !== checkpassword) {
      setCaution('비밀번호가 일치하지 않습니다.');
    } else {
      setCaution('');
    }
  }, [password, checkpassword]);

  return (
    <>
      <SignupContainer>
        <LogoContainer>
          <LogoImg src={logo} style={{ marginLeft: '5px' }} />
        </LogoContainer>
        <InputContainer>
          <div>
            <InputLabel>이메일</InputLabel>
            <InputBox
              type="email"
              placeholder="이메일"
              value={email}
              name="email"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div>
            <InputLabel>비밀번호</InputLabel>
            <div style={{ margin: '5px', color: 'gray', fontSize: '15px' }}>비밀번호는 최소 6자리로 입력해주세요.</div>
            <InputBox
              type="password"
              placeholder="비밀번호"
              value={password}
              name="password"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div>
            <InputLabel>비밀번호 확인</InputLabel>
            <div style={{ margin: '5px', color: 'red', fontSize: '15px' }}>{caution}</div>
            <InputBox
              type="password"
              placeholder="비밀번호 확인"
              value={checkpassword}
              name="checkpassword"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div>
            <InputLabel>닉네임</InputLabel>
            <InputBox type="name" placeholder="닉네임" value={name} name="name" onChange={onChangeHandler} required />
          </div>
          <StMainButton onClick={signUpButtonHandler}>회원가입</StMainButton>
        </InputContainer>
      </SignupContainer>
    </>
  );
}

// 스타일 영역
const SignupContainer = styled.div`
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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InputLabel = styled.div`
  margin: 5px 5px 5px 5px;
  font-weight: bold;
`;

const InputBox = styled.input`
  width: 300px;
  height: 30px;
  margin: 5px 5px 10px;
  padding-left: 10px;
  font-size: 15px;
  display: inline-block;
  outline: none;

  &:focus {
    border: 2px solid #333;
    border-radius: 3px;
  }
`;

const StMainButton = styled.button`
  width: 300px;
  height: 50px;
  margin: 30px;
  cursor: pointer;
  font-size: 15px;
  border-radius: 3px;
  background-color: #333;
  border: #333;
  color: white;
`;

export default Signup;
