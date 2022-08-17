import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import SigninHeader from "../../components/header/SinginHeader";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const PollPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://${BASE_URL}/poll/${"65e5410e-474d-49c2-899b-df2e97fa1201"}`,
        {
          header: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTitle(response.data[0].title);
        setDescription(response.data[0].description);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          Poll Page
        </h1>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div style={{ marginTop: "80px" }} className="big-box">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <input
                      style={{
                        width: "100px",
                        height: "20px",
                      }}
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
          // onClick={() => {
          //   createParticipantData();
          //   createChoice();
          // }}
        >
          Save
        </Button>
      </div>
    </React.Fragment>
  );
};

export default PollPage;
