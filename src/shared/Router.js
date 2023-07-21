import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import Home from '../pages/Home';
import Login from '../components/LoginPage/Login.jsx';
import Signup from '../components/LoginPage/Signup';
import Result from '../pages/Result';
import BackgroundMusic from '../components/Layout/BackgroundMusic';
import Quiz from '../Quiz';

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <BackgroundMusic />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/result" element={<Result />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Router;
