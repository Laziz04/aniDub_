import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./Pages/Menu_layout";
import Animation from "./Pages/animation";
import Filter from "./Pages/filter";
import Cards from "./Pages/cards";
import News from "./Pages/news";
import Footer from "./Pages/footer";

function App() {
  return (
    <div className="App">
      <Layout />
      <Animation />
      <Filter />
      <Cards />
      <News />
      <Footer />
    </div>
  );
}

export default App;
