import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 이메일과 비밀번호 입력 받기
  const onChangeEmail = event => {
    setEmail(event.target.value);
  };
  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  // 회원가입 버튼
  const signupButton = async event => {
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
    <>
      <div>
        <h2>회원가입</h2>
        <label>이메일 : </label>
        <input type="email" placeholder="이메일을 입력해주세요" value={email} onChange={onChangeEmail} />
        <label>비밀번호 : </label>
        <input type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={onChangePassword} />
        <button onClick={signupButton}>회원가입</button>
      </div>
    </>
  );
};

export default Signup;
