import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import LoginDiv from './Loginpage.styled';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Input } from '../Common.styled';

function Login() {
  const [Email, setEmail] = useState('');
  const [PW, setPW] = useState('');

  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  const signInFunc = async (e) => {
    e.preventDefault();
    if (!(Email || PW)) {
      return alert('모든 값을 채워주세요.');
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, Email, PW);

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

  useEffect(() => {
    if (user?.userid) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <LoginDiv>
      <form>
        <span>Login</span>
        <label></label>
        <Input
          type="email"
          placeholder="이메일 입력해주세요."
          value={Email}
          name="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        ></Input>
        <br></br>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={PW}
          name="password"
          onChange={(e) => setPW(e.currentTarget.value)}
        ></Input>
        <br></br>
        <button onClick={signInFunc}>로그인</button>
        <br></br>
        <p>가입을 안하셨나요?🤔</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate('/signup');
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Login;
