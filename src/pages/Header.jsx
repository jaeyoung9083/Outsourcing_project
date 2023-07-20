import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderWrapper>
      <Nav>
        <Logo>My Website</Logo>
        <div>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;

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

const Logo = styled.h1`
  font-size: 24px;
`;

const NavLink = styled.a`
  color: #fff;
  margin-left: 20px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
