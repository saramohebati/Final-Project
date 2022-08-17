import React from "react";
import Landing from "./components/landingPage/Landing";
import SignIn from "./components/signIn/SignIn";
import PollList from "./components/pollListPage/PollList";
import CreatePoll from "./components/createPollPage/CreatePoll";
import PollPage from "./components/pollPage/PollPage";
import ManagePoll from "./components/managePoll/ManagePoll";
import Link from "./components/link/Link"

import Footer from "./components/footer/Footer";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/PollList" element={<PollList />} />
        <Route path="/CreatePoll" element={<CreatePoll />} />
        <Route path="/ManagePoll/:id" element={<ManagePoll />}></Route>
        <Route path="/PollPage/:id" element={<PollPage />}></Route>
        <Route path="/link/:id" element={<Link />}></Route>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
