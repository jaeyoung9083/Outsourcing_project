import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <p>© {new Date().getFullYear()} My Website. All rights reserved.</p>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  background-color: #000000;
  padding: 20px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  /* font-weight: 800; */
`;
