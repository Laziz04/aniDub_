import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import MenuLayout from "./Pages/Menu_layout";
import Animation from "./Pages/animation";
import Filter from "./Pages/filter";
import Cards from "./Pages/cards";
import News from "./Pages/news";
import Footer from "./Pages/footer";
import AdminPage from "./Pages/admen_page";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "@mui/material";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route path="/AdminPage" element={<Home />} />
      </Routes>
      {location.pathname !== "/AdminPage" && (
        <>
          <MenuLayout />
          {/* <Animation /> */}
          <Container>
            <Filter />
            <Cards />
            <News />
            <Footer />
          </Container>
        </>
      )}
    </div>
  );
}

const Home = () => {
  return (
    <div>
      <AdminPage />
    </div>
  );
};

export default App;
