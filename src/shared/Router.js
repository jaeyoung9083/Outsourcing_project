import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import Home from '../pages/Home';
import Login from '../components/LoginPage/Login.jsx';
import Signup from '../components/LoginPage/Signup';
import Comments from '../pages/Comments';
import Quiz from '../Quiz';

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Router;
