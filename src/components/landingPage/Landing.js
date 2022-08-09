import React from "react";
import "./Landing.css";
import Calendar from "../../image/Calendar.png";
import OnlineCalendar from "../../image/OnlineCalendar.png";
import TimeManagement from "../../image/TimeManagement.png";
import Invite from "../../image/Invite.png";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function Landing() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ height: "100%" }} />

        <div className="content">
          <div>
            <h1>Easy and smart coordination</h1>
            <p>
              Polly is the fastest way to schedule your meetings and events.
            </p>
            <div className="add">
              <Link to="/"> Create Poll</Link>
            </div>
          </div>

          <div>
            <img className="img" alt="calendar" src={Calendar}></img>
          </div>
        </div>

        <div className="content">
          <div>
            <h1>Select dates and times</h1>
            <p>
              Select several possible dates for your event or meeting.
              Additionally different times can be specified for each day.
            </p>
          </div>
          <div>
            <img
              className="img"
              alt="onlinecalendar"
              src={OnlineCalendar}
            ></img>
          </div>
        </div>

        <div className="content">
          <div>
            <h1>Invite participants</h1>
            <p>
              Invite the participants to your meeting poll by email or directly
              via Polly. They will obtain a link to your personal poll website.
            </p>
          </div>
          <div>
            <img
              className="img"
              alt="timemanagement"
              src={TimeManagement}
            ></img>
          </div>
        </div>

        <div className="content">
          <div>
            <h1>Get the optimal date</h1>
            <p>
              Each participant indicates which dates and times are suitable. The
              optimal date for your event can now be easily determined.
            </p>
          </div>
          <div>
            <img className="img" alt="invite" src={Invite}></img>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Landing;
