import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [Email, setEmail] = useState('');
  const [Pw, setPw] = useState('');

  const navigate = useNavigate();

  return (
    <div>
      <form>
        <span>로그인</span>
        <div>
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

        <button>로그인</button>

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
