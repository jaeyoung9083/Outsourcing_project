import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderWrapper>
      <Nav>
        <Link to="/">
          <Logo src={logo} />
        </Link>

        <div>
          <NavLink href="/login">Login</NavLink>
          <NavLink href="/signup">Signup</NavLink>
        </div>
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
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`;
