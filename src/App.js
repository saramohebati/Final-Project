import React from "react";
import Header from "./components/header/Header";
import LandingPage from "./components/landingPage/LandingPage";
import SignIn from "./components/signIn/SignIn";
import PollListPage from "./components/pollListPage/PollListPage";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/PollListPage" element={<PollListPage />} />

      </Routes>

      <footer>Have Good Day.</footer>
    </Router>
  );
}

export default App;
