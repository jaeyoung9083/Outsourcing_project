import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import Home from '../pages/Home';
import Login from '../components/LoginPage/Login.jsx';
import Signup from '../components/LoginPage/Signup';
import Comments from '../pages/Comments';
import BackgroundMusic from '../components/Layout/BackgroundMusic';
import Quiz from '../pages/Quiz';
import Layout from '../components/Layout/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* BackgroundMusic 컴포넌트를 Routes 컴포넌트 밖으로 이동 */}
        <BackgroundMusic />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/comments" element={<Comments />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Router;
