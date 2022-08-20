import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import SigninHeader from "../../components/header/SinginHeader";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../constants";

const PollPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [options, setOptions] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://${BASE_URL}/poll/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setName(response.data.name);
        setOptions(response.data.poll_item);
        console.log("response :>> ", response);
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
        <div style={{ marginTop: "80px" }} className="big-box">
          <div>
            <h2>Title: {title}</h2>
            <h3>Description: {description}</h3>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <h4
                      style={{
                        width: "100px",
                        height: "20px",
                      }}
                    >
                      Participant: {name}
                    </h4>
                  </TableCell>
                  <TableCell>
                    <p
                      style={{
                        width: "100px",
                        height: "20px",
                      }}
                    >
                      {options}
                    </p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <input
                      style={{
                        width: "100px",
                        height: "20px",
                      }}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      value={options}
                      onChange={(e) => setOptions(e.target.value)}
                    />
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
          onClick={() => {
            navigate(`/PollList`);
          }}
        >
          Save
        </Button>
      </div>
    </React.Fragment>
  );
};

export default PollPage;
