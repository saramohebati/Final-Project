import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Share from "@mui/icons-material/Share";

const PollList = () => {
  // const [data, setData] = useState([]);
  const [delet, setDelet] = useState([]);

  const navigate = useNavigate();
  const [pollData, setPollData] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [participant, setParticipant] = useState("");
  const [error, setError] = useState("");

  // let participants ={totalParticipant} - 1;

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3001/poll/", {
        header: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let pollData = response.data;
        setPollData(pollData);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const deletePoll = (pollId, e) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3001/poll/${pollId}`, {
        header: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const deletePoll = delet.filter((row) => pollId !== row.pollId);
        setDelet(deletePoll);
        window.location.reload(false);
      })
      .catch((error) => {
        error("");
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Participant</TableCell>
            <TableCell align="right">Link</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="right">{title}</TableCell>
            <TableCell align="right">{description}</TableCell>
            <TableCell align="right">{participant}</TableCell>
            <TableCell align="right">
              {link}
              <Share style={{ color: "grey" }} />
            </TableCell>
            <TableCell align="right">
              <DeleteForeverIcon style={{ color: "grey" }} onClick={(e) => deletePoll()} />
            </TableCell>
            <TableCell align="right">
              <Link style={{ color: "grey" }} to="/ManagePoll">
                <EditIcon onClick={(e) => deletePoll()} />{" "}
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PollList;
