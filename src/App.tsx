import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Animation from "./Pages/animation";
import Filter from "./Pages/filter";
import Cards from "./Pages/cards";
import News from "./Pages/news";
import Footer from "./Pages/footer";
import Admin from "./Pages/admen_page";
import Ad from "./Pages/admen_page/adminpage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "@mui/material";
import Navbar from "./Pages/Menu_layout/index";
import Profil from "./Pages/profil/index";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/AdminPage" && location.pathname !== "/Ad" && (
        <Navbar />
      )}
      <Routes>
        <Route path="/AdminPage" element={<Admin />} />
        <Route path="/Ad" element={<Ad />} />
        <Route path="/profil" element={<Profil />} />
        <Route
          path="/"
          element={
            location.pathname === "/" &&
            !["/AdminPage", "/Ad", "/profil"].includes(location.pathname) ? (
              <>
                <Animation />
                <Filter />
                <Cards />
                {/* <Container>
                  <News />
                  <Footer />
                </Container> */}
              </>
            ) : null
          }
        />
      </Routes>

      {/* <ContactUs /> */}
    </div>
  );
}

export default App;
