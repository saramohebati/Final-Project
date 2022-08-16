import React, { useState } from "react";
// import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import SigninHeader from "../../components/header/SinginHeader";
import Button from "@mui/material/Button";

const PollPage = () => {
  // const token = localStorage.getItem("Token");

  // const [options, setOptions] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  // const [participants, setParticipans] = useState([]);
  // const [participantChoice, setParticipantChoice] = useState([]);

  return (
    <React.Fragment>
      <SigninHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "30px",
        }}
      >
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Poll Page !
        </h1>

        <div style={{ marginTop: "80px" }} className="big-box">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <p>Enter Your Name</p>
                  </TableCell>

                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <input
                      style={{
                        width: "100px",
                        height: "20px",
                      }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </TableCell>

                  <TableCell>
                    <Checkbox />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Button
          style={{
            color: "grey",
            marginTop: "50px",
            width: "200px",
          }}
          variant="outlined"
          type="submit"
        >
          Save
        </Button>
      </div>
    </React.Fragment>
  );
};

export default PollPage;
