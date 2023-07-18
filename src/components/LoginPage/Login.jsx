import { async } from '@firebase/util';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [Email, setEmail] = useState('');
  const [Pw, setPw] = useState('');

  const navigate = useNavigate();

  const signIn = async (event) => {
    event.preventDefault();
    if (!(Email || Pw)) {
      return alert('아이디와 비밀번호 모두 입력해주세요');
    }
    try {
      !(Email || Pw);
      userCredential = await signInWithEmailAndPassword(auth, Email, Pw);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signIn', errorMessage, errorCode);
    }
    if (errorCode === 'auth/user-not-found') {
      alert('존재하지 않는 이메일입니다');
    } else if (errorCode === 'auth/user-not-found');
    {
      alert('비밀번호가 일치하지 않습니다');
    }
  };

  useEffect(() => {
    onAuthStateChanged(auto, (user) => {
      console.log('user', user);
    });
    // auto.currentUser 현재 로그인 중인 유저 정보
  }, []);

  useEffect(() => {
    if (user?.userid) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <form>
        <span>로그인</span>
        <div>
          <label>이메일 : </label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={Email}
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label>비밀번호 : </label>
          <input
            type="password"
            placeholder="비밀전호를 입력해주세요"
            value={Pw}
            name="password"
            onChange={(e) => {
              setPw(e.target.value);
            }}
          />
        </div>

        <button onClick={signIn}>로그인</button>

        <p>회원가입 하로 가기</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate('/signup');
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Login;
