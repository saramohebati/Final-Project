import React from "react";
import Header from "./components/header/Header";
import LandingPage from "./components/landing page/LandingPage";
import SignIn from "./components/SignIn";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>

      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>

      <footer>Have Good Day.</footer>

    </Router>
  );
}

export default App;
