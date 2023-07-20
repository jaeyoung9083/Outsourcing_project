import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { unwrapResult } from '@reduxjs/toolkit';
import { addCurrentUser } from '../../redux/modules/loginSlice'; // 리덕스 슬라이스 파일 경로를 수정
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user);
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
      // console.log(userCredential);
      // console.log(userCredential.user);
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
  useEffect(() => {
    if (user?.users) {
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
            value={email}
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
            value={password}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={signInFunc}>로그인</button>
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

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { auth } from '../../firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // 이메일과 비밀번호 입력 받기
//   const onChangeEmail = (event) => {
//     setEmail(event.target.value);
//   };
//   const onChangePassword = (event) => {
//     setPassword(event.target.value);
//   };

//   // 로그인 버튼
//   const LoginButton = async (event) => {
//     event.preventDefault();
//     // 입력값 검사
//     if (!email || !password) {
//       return alert('아이디와 비밀번호를 모두 입력해주세요');
//     }
//     // 로그인
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       console.log(user);
//       // 로그인 성공하면 홈으로 이동
//       navigate('/');
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log('error with signIn', errorMessage, errorCode);
//       if (errorCode === 'auth/user-not-found') {
//         alert('존재하지 않는 이메일입니다');
//       } else if (errorCode === 'auth/user-not-found');
//       {
//         alert('비밀번호가 일치하지 않습니다');
//       }
//     }
//   };

//   // useEffect(() => {
//   //   if (user?.userid) {
//   //     navigate('/');
//   //   }
//   // }, [user, navigate]);

//   return (
//     <div>
//       <div>
//         <h2>로그인</h2>
//         <label>이메일 : </label>
//         <input type="email" placeholder="이메일을 입력해주세요" value={email} onChange={onChangeEmail} />
//         <label>비밀번호 : </label>
//         <input type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={onChangePassword} />
//         <button onClick={LoginButton}>로그인</button>
//       </div>
//       <h2>회원가입 하러 가기</h2>
//       <Link to={'/signup'}>회원가입</Link>
//     </div>
//   );
// }

// export default Login;
