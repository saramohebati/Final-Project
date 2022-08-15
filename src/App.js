import React from "react";
import Header from "./components/header/Header";
import Landing from "./components/landingPage/Landing";
import SignIn from "./components/signIn/SignIn";
import PollList from "./components/pollListPage/PollList";
import CreatePoll from "./components/createPollPage/CreatePoll";
import ManagePoll from "./components/managePoll/ManagePoll";

import Footer from "./components/footer/Footer";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/PollList" element={<PollList />} />
        <Route path="/CreatePoll" element={<CreatePoll />} />        
        <Route path="/ManagePoll" element={<ManagePoll />}></Route>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
