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

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");

      axios
        .get(`http://${BASE_URL}/poll`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPollData(response.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    };
    getData();
  }, []);

  const deletePoll = (id, e) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://${BASE_URL}/poll/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const deletePoll = pollDelete.filter((data) => id !== data.id);
        setPollDelete(deletePoll);
        window.location.reload(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    navigate(`/PollList`);
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
              {pollData.map((data, index) => (
              
                <TableRow
                  key={data.link}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    align="right"
                    onClick={() => {
                      navigate(`/PollPage/${data.link}`);
                    }}
                  >
                    {data.title}
                  </TableCell>
                  <TableCell align="right">{data.description}</TableCell>
                  <TableCell align="right">{data.participant}</TableCell>
                  <TableCell align="right">
                    {""}
                    <Share
                      style={{ color: "grey" }}
                      onClick={() => {
                        navigate(`/Link/${data.link}`);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <DeleteForeverIcon
                      style={{ color: "grey" }}
                      onClick={(e) => deletePoll(data.link)}
                    />
                  </TableCell>
                  <TableCell align="right">
                      <EditIcon
                        onClick={() => {
                          navigate(`/ManagePoll/${data.link}`);
                        }}
                      />
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
            navigate(`/CreatePoll`);
          }}
        >
          <AddIcon />
        </Fab>
      </div>
    </React.Fragment>
  );
};

export default PollList;
