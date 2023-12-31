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
            <Profile>
              <ProfileName>{currentUserName}</ProfileName>님 호그와트에 오신 걸 환영합니다
            </Profile>
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
  width: 130px;
  padding-left: 20px;
`;

const HeaderWrapper = styled.header`
  background-color: #000000;
  padding: 20px;
  color: #fff;
`;

const Profile = styled.span`
  color: #fff;
  font-family: 'noto-sans-kr', sans-serif;
  font-size: 15px;
  font-weight: 300;
`;

const ProfileName = styled.span`
  font-family: 'noto-sans-kr', sans-serif;
  font-weight: 500;
`;

const LogoutBt = styled.button`
  color: #fff;
  font-family: 'noto-sans-kr', sans-serif;
  font-size: 15px;
  font-weight: 400;
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
  margin: 0 20px 0 20px;
  text-decoration: none;
  font-family: 'noto-sans-kr', sans-serif;
  font-size: 15px;
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`;
