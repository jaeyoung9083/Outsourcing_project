import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

function Singup() {
  // hook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state 상태 관리
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setCheck] = useState('');

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      <form
        onSubmit={() => {
          e.preventDefault();
          dispatch({
            type: 'ADD_TODO',
            payload: {}
          });
        }}
      >
        <span>회원가입</span>
        <div>
          <input
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
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={pw}
            name="password"
            onChange={(e) => {
              setPw(e.target.value);
            }}
          />
        </div>

        <button
          onClick={async () => {
            try {
              const userCredential = await createUserWithEmailAndPassword(auth, email, password);

              setCurrentUser(userCredential.user.email);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          회원가입
        </button>

        <p>로그인하러가기</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate('/login');
          }}
        >
          로그인
        </button>
      </form>
    </div>
  );
}
export default Singup;
