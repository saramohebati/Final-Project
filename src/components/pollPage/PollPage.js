import React, { useState, useEffect } from "react";
// import { BASE_URL } from "./constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Cells from "./Cells";
import Checkbox from "@mui/material/Checkbox";

import Button from "@mui/material/Button";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PollPage = () => {
  const token = localStorage.getItem("Token");

  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [participants, setParticipans] = useState([]);
  const [participantChoice, setParticipantChoice] = useState([]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "30px",
      }}
    >
      <h1>Poll Page !</h1>

      <div style={{ marginTop: "80px" }} className="big-box">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <input
                    style={{
                      width: "100px",
                      height: "20px",
                      marginTop: "20px",
                      marginLeft: "17px",
                    }}
                    value=" Enter Name"
                  />
                </TableCell>
                <TableCell
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  align="left"
                ></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow></TableRow>
              <TableRow>
                <TableCell>
                  <input
                    style={{ width: "60px" }}
                    onChange={(e) => setFullname(e.target.value)}
                    value={fullname}
                  />
                </TableCell>

                <TableCell>
                  <Checkbox style={{ marginRight: "70px" }} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Button
        style={{
          color: "grey",
          marginTop: "80px",
          width: "90%",
        }}
        variant="outlined"
        type="submit"
      >
        Submit
      </Button>
    </div>
  );
};

export default PollPage;
