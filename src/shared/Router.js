import { BrowserRouter, Route,  Routes } from 'react-router-dom';

import Home from '../pages/Home';

import Quiz from '../Quiz';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
      </BrowserRouter>
  );
};
export default Router;
