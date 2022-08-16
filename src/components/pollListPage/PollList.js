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
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import SigninHeader from "../../components/header/SinginHeader";
import { BASE_URL } from "../constants";

const PollList = () => {
  const navigate = useNavigate();
  const [pollDelete, setPollDelete] = useState([]);
  const [pollData, setPollData] = useState([]);
  // const [title, setTitle] = useState([]);
  // const [description, setDescription] = useState("");
  // const [link, setLink] = useState("");
  // const [participant, setParticipant] = useState("");
  // const [error, setError] = useState("");
  // let participants ={totalParticipant} - 1;

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      try {
        const { pollData: response } = await axios.get(
          "http://${BASE_URL}/poll/",
          {
            header: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
           setPollData(response.data);
        console.log(response.data);
        })
      } catch(error) {
        console.error(error.message);
      }
    };
    getData();
  }, []);

  //   axios
  //     .get("http://${BASE_URL}/poll/${id}", {
  //       header: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       let pollData = response.data;
  //       setPollData(pollData);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError(error.message);
  //     });
  // }, []);
  // console.log("pollData :>> ", pollData);

  const deletePoll = (id, e) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://${BASE_URL}/poll/${id}`, {
        header: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const deletePoll = pollDelete.filter((row) => id !== row.id);
        setPollDelete(deletePoll);
        window.location.reload(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const routeChange = (id) => {
    navigate("/ManagePoll/${id}");
  };

  return (
    <React.Fragment>
      <SigninHeader />
      <div
        style={{
          margin: "10px",
        }}
      >
        <h1
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Poll List
        </h1>

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
              {pollData.map((row, id) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.participant}</TableCell>
                  <TableCell align="right">
                    {""}
                    http://localhost3000/PollPage/{row.id}
                    <Share style={{ color: "grey" }} />
                  </TableCell>
                  <TableCell align="right">
                    <DeleteForeverIcon
                      style={{ color: "grey" }}
                      onClick={(e) => deletePoll(row.id)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Link style={{ color: "grey" }} to="/ManagePoll">
                      <EditIcon onClick={(e) => routeChange(row.id)} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Fab
          style={{
            margin: "10px",
          }}
          aria-label="add"
          onClick={() => {
            navigate("/CreatePoll");
          }}
        >
          <AddIcon />
        </Fab>
      </div>
    </React.Fragment>
  );
};

export default PollList;
