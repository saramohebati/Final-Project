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
import Cells from "./Cells";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants";

const PollPage = () => {
  const token = localStorage.getItem("token");

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [participants, setParticipans] = useState([]);
  const [participantChoice, setParticipantChoice] = useState([]);
  let { pollId } = useParams();

  useEffect(() => {
    const array = [];
    const token = localStorage.getItem("token");

    const getPoll = async (pollId) => {
      try {
        const { data: response } = await axios.get(
          "http://${BASE_URL}/poll/${pollId}",
          {
            header: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.itemsId);

        const itemsId = response.itemsId;
        for (let i = 0; i < itemsId.length; i++) {
          const item = itemsId[i];

          const { data: response } = await axios.get(
            "http://${BASE_URL}/item/${item}",
            {
              header: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          array.push(response);
        }
        setItems(array);
        console.log(array);
      } catch (error) {
        console.error(error.message);
      }
    };
    getPoll(pollId);
  }, []);

  const createParticipantData = () => {
    axios
      .post(
        "http://${BASE_URL}/participant",
        {
          name: name,
        },
        {
              header: {
                authorization: `Bearer ${token}`,
              },
        }
      )
      .then((response) => {
        console.log(response);
        const id = response.id;

        console.log("create");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createChoice = () => {
    axios
      .post(
        "http://${BASE_URL}/choice",
        {
          pollItemId: participantChoice,
        },
        {
          header: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkbox = (e, id) => {
    const choice = participantChoice.find((c) => c.id === id);
    if (!choice) {
      setParticipantChoice((prev) =>
        prev.concat({ id, value: e.target.checked })
      );
    }
    if (choice) {
      const choiceIndex = participantChoice.findIndex((c) => c.id === id);
      participantChoice[choiceIndex] = { id, value: e.target.checked };
      setParticipantChoice(participantChoice);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://${BASE_URL}/choice",
          {
            header: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setParticipantChoice(response);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://${BASE_URL}/participant",
          {
            header: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setParticipans(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p>Enter Your Name</p>
                  </TableCell>
                  {items.map((column, id) => (
                    <TableCell 
                    key={id}
                    >
                      {column.item}
                      </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {participants.map((participant) => (
                  <TableRow>
                    <Cells id={participant.id} />
                  </TableRow>
                ))}

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
                  {items.map((item) => (
                    <TableCell key={item.id}>
                      <Checkbox onChange={(e) => checkbox(e, item.id)} />
                    </TableCell>
                  ))}
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
            createParticipantData();
            createChoice();
          }}
        >
          Save
        </Button>
      </div>
    </React.Fragment>
  );
};

export default PollPage;
