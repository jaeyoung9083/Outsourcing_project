import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../components/LoginPage/Login.jsx';
import Singup from '../components/LoginPage/Singup';
import GlobalStyle from '../GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Layout from '../components/Layout/Layout';
import { theme } from '../theme';

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* <GlobalStyle> */}
        {/* <Layout> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
        </Routes>
        {/* </Layout> */}
        {/* </GlobalStyle> */}
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Router;
