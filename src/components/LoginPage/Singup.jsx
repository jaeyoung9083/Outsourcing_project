import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { addCurrentUser, updateCurrentUser } from '../../redux/modules/userSlice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

function Singup() {
  const [Email, setEmail] = useState;
}
