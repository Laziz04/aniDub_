import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
import Navbar from "./Pages/Menu_layout/index";
import Profil from "./Pages/profil/index";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/AdminPage" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
      {location.pathname !== "/AdminPage" && location.pathname !== "/profil" && (
        <>
          <Animation />
          <Filter />
          <Cards />
          {/* <Container>
            <News />
            <Footer />
          </Container> */}
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
