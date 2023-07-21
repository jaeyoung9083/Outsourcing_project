import styled from 'styled-components';
import logo from '../assets/logo.png';
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
  width: 150px;
  padding-left: 20px;
`;

const HeaderWrapper = styled.header`
  background-color: #333;
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
  margin-left: 20px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
