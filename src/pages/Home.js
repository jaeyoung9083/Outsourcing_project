import React from 'react';
import styled from 'styled-components';
import background from '../assets/background.jpg';
import mainLogo from '../assets/mainLogo.png';

function Home() {
  return (
    <div>
      <BodyContainer>
        <ContentContainer>
          <Logo src={mainLogo} />
          <Heading>나의 기숙사는 과연 어디일까 🪄</Heading>
          {/* <Paragraph>꿀잼보장 38000%</Paragraph> */}
          <Button href="/quiz">테스트 시작하기</Button>
        </ContentContainer>
      </BodyContainer>
    </div>
  );
}

export default Home;

const BodyContainer = styled.div`
  margin: 0;
  padding: 0;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }

  animation: blink 5s infinite;
`;

const ContentContainer = styled.div`
  padding: 100px 20px;
  color: #fff;
  /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); */
`;

const Heading = styled.div`
  font-family: 'noto-sans-kr', sans-serif;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 50px;
`;

const Button = styled.a`
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  text-decoration: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Logo = styled.img`
  width: 600px;
  margin-top: -60px;
  margin-bottom: 150px;
`;
