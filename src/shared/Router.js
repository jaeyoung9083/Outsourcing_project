import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle>
        <Layout>
          <Routes>
            <Route>{/* // */}</Route>
          </Routes>
        </Layout>
      </GlobalStyle>
    </BrowserRouter>
  );
};
