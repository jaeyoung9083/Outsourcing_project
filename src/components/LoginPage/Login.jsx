import React from 'react';
import { styled } from 'styled-components';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router';

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

  // const navigate = useNavigate();

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
      // navigate('/');
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
        </MainContainer>
      </LoginContainer>
    </>
  );
}

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
  margin: 20px;
  cursor: pointer;
  font-size: 15px;
  border-radius: 3px;
  border: ${({ border }) => border};
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  color: ${({ color }) => color};
`;

export default Login;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../firebase';
// import { addCurrentUser } from '../../redux/modules/loginSlice'; // 리덕스 슬라이스 파일 경로를 수정
// import styled from 'styled-components';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const signInFunc = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       return alert('모든 값을 채워주세요.');
//     }
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       // 리덕스 스토어에 유저 정보 추가
//       dispatch(
//         addCurrentUser({
//           currentUser: {
//             name: '하하'
//           },
//           isLogin: true
//         })
//       );
//       navigate('/');
//     } catch (error) {
//       console.log(error.code);
//       if (error.code === 'auth/user-not-found') {
//         alert('존재하지 않는 이메일입니다.');
//       } else if (error.code === 'auth/wrong-password') {
//         alert('비밀번호가 일치하지 않습니다.');
//       } else {
//         alert('로그인이 실패하였습니다.');
//       }
//     }
//   };

//   return (
//     <LoginContainer>
//       <LoginForm>
//         <span>로그인</span>
//         <div>
//           <StyledLabel>이메일 :</StyledLabel>
//           <StyledInput
//             type="email"
//             placeholder="이메일을 입력해주세요"
//             value={email}
//             name="email"
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//           />
//         </div>
//         <div>
//           <StyledLabel>비밀번호 :</StyledLabel>
//           <StyledInput
//             type="password"
//             placeholder="비밀번호를 입력해주세요"
//             value={password}
//             name="password"
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//         </div>
//         <StyledButton onClick={signInFunc}>로그인</StyledButton>
//         <StyledLink
//           onClick={(e) => {
//             e.preventDefault();
//             navigate('/signup');
//           }}
//         >
//           회원가입 하로 가기
//         </StyledLink>
//       </LoginForm>
//     </LoginContainer>
//   );
// }

// export default Login;

// // Define your styled-components
// const LoginContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const LoginForm = styled.form`
//   background-color: #f1f1f1;
//   padding: 20px;
//   border-radius: 5px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 15px;
// `;

// const StyledLabel = styled.label`
//   font-weight: bold;
// `;

// const StyledInput = styled.input`
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 3px;
//   width: 250px;
// `;

// const StyledButton = styled.button`
//   padding: 8px 20px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const StyledLink = styled.p`
//   margin-top: 10px;
//   cursor: pointer;
//   color: #007bff;
// `;
