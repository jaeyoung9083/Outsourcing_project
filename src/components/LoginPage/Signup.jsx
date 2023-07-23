import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
        <InputContainer>
          <h2 style={{ marginBottom: '30px' }}>회원가입</h2>
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

// import React, { useState } from 'react';
// import { auth } from '../../firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// const Signup = () => {
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

//   // 회원가입 버튼
//   const signupButton = async (event) => {
//     event.preventDefault();
//     // 입력값 검사
//     if (!email || !password) {
//       return alert('아이디와 비밀번호를 모두 입력해주세요');
//     }
//     // 회원가입
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       // 회원가입 완료 시 자동 로그인되기 때문에 홈으로 이동
//       navigate('/');
//     } catch (error) {
//       // 에러 처리
//     }
//   };
//   return (
//     <SignupContainer>
//       <h2>회원가입</h2>
//       <SignupForm>
//         <StyledLabel>이메일 :</StyledLabel>
//         <StyledInput type="email" placeholder="이메일을 입력해주세요" value={email} onChange={onChangeEmail} />
//         <StyledLabel>비밀번호 :</StyledLabel>
//         <StyledInput
//           type="password"
//           placeholder="비밀번호를 입력해주세요"
//           value={password}
//           onChange={onChangePassword}
//         />
//         <StyledButton onClick={signupButton}>회원가입</StyledButton>
//       </SignupForm>
//     </SignupContainer>
//   );
// };

// export default Signup;

// const SignupContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   height: 100vh;
// `;

// const SignupForm = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   padding: 20px;
//   max-width: 400px;
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
