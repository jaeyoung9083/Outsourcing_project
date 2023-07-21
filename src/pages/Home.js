import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Header />
      <BodyContainer>
        <ContentContainer>
          <Heading>호그와트 기숙사 테스트</Heading>
          <Paragraph>꿀잼보장 38000%</Paragraph>
          <Link to={'/quiz'}>설문시작!</Link>
        </ContentContainer>
      </BodyContainer>
      <Footer />
    </div>
  );
}

export default Home;

const BodyContainer = styled.div`
  margin: 0;
  padding: 0;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Hogwarts_model_studio_tour.jpg/250px-Hogwarts_model_studio_tour.jpg');
  background-size: cover;
  background-position: center;
  font-family: Arial, sans-serif;
  height: 100vh; /* Adjust this as needed to fit your content */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Create a styled component for the container div
const ContentContainer = styled.div`
  text-align: center;
  padding: 100px 20px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

// Create a styled component for the h1 element
const Heading = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;

// Create a styled component for the p element
const Paragraph = styled.p`
  font-size: 24px;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 20px;
  border: none;
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
