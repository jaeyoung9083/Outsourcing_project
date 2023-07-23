import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';

const Header = () => {
  const [currentUserName, setCurrentUserName] = useState(null);

  // 유저 로그인 상태 확인
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUserName(user?.displayName);
    });
  }, []);

  console.log(currentUserName);

  // 로그아웃
  const logout = async (event) => {
    event.preventDefault();
    await signOut(auth);
  };

  return (
    <HeaderWrapper>
      <Nav>
        <Link to="/">
          <Logo src={logo} />
        </Link>
        {currentUserName ? (
          <div>
            <Profile>'{currentUserName}'님 호그와트에 오신 걸 환영합니다</Profile>
            <LogoutBt onClick={logout}>Logout</LogoutBt>
          </div>
        ) : (
          <div>
            <NavLink href="/login">Login</NavLink>
            <NavLink href="/signup">Signup</NavLink>
          </div>
        )}
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;

const Logo = styled.img`
  width: 150px;
  padding-left: 20px;
`;

const HeaderWrapper = styled.header`
  background-color: #333;
  padding: 20px;
  color: #fff;
`;

const Profile = styled.span`
  color: #fff;
  font-size: 20px;
  font-weight: bolder;
`;

const LogoutBt = styled.button`
  color: #fff;
  font-size: 20px;
  font-weight: bolder;
  margin: 0 20px 0 20px;
  appearance: none;
  outline: none;
  border: none;
  background-color: transparent;

  &:hover {
    text-decoration: underline;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled.a`
  color: #fff;
  font-size: 20px;
  font-weight: bolder;
  margin: 0 20px 0 20px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
