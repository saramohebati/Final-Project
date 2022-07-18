import React from "react";
import Header from "./component/Header";
import LandingPage from "./component/LandingPage";
import SignIn from "./component/SignIn";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <header>
        <Header />
      </header>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>

      <footer>Have Good Day.</footer>

    </Router>
  );
}

export default App;
