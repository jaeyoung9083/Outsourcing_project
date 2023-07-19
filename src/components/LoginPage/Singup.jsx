import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Singup() {
  // hook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state 상태 관리
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setCheck] = useState('');

  return;
  <div>d</div>;
}

export default Singup;
