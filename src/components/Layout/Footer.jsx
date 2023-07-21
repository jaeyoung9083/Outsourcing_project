import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <p>© {new Date().getFullYear()} My Website. All rights reserved.</p>
      <ContactInfo>Email: contact@example.com</ContactInfo>
      <ContactInfo>Phone: 123-456-7890</ContactInfo>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  background-color: #333;
  padding: 20px;
  color: #fff;
  text-align: center;
`;

const ContactInfo = styled.p`
  margin: 10px 0;
`;
