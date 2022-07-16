import React from "react";
import Header from "./component/Header";
import LandingPage from "./component/LandingPage";
import SignIn from "./component/SignIn";
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <header>
      <Header/>
      </header>

      <Routes>
       
      </Routes>

      <footer>Have Good Day.</footer>

    </Router>
  );
}

export default App;
