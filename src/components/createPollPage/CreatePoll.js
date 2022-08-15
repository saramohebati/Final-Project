import React, { useState } from "react";
import "./CreatePoll.css";
import Create from "../../image/Create.png";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [firstOption, setFirstOption] = useState("");
  const [secendOption, setSecendOption] = useState("");
  const [error, setError] = useState("");
  const [insertedId, setInsertedId] = useState("");

  const createPoll = async () => {
    if (title === "" || firstOption === "" || secendOption === "") {
      setError("Title And Options Fields Can't Be Empty!");
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:3001/poll`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const id = res.data[0].insertId;
        setInsertedId(id);
        createPollItems(insertedId);
      })
      .catch((res) => {
        let error = res.response.data;
        let status = res.response.status;
        console.log("error :>> ", error);
        if (status === 401) {
          navigate("/signIn");
        }
      });
  };

  const createPollItems = async (id) => {
    const token = localStorage.getItem("token");
    const pollId = id;
    console.log("pollId :>> ", pollId);
    axios
      .post(
        `http://localhost:3001/item`,
        [
          {
            poll_id: pollId,
            item: firstOption,
          },
          {
            poll_id: insertedId,
            item: secendOption,
          },
        ],
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("res :>> ", res);
      })
      .catch((res) => {
        let error = res.response.data;
        let status = res.response.status;
        console.log("error :>> ", error);
        if (status === 401) {
          navigate("/signIn");
        }
      });
  };

  return (
    <Box
      component="form"
      className="box"
      sx={{
        "& .MuiTextField-root": { m: 2, width: "45ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <form className="main">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 style={{ marginTop: "30px" }}>Create poll !</h1>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            id="demo-helper-text-misaligned-no-helper"
            label="Title"
          />
          <p className="error"></p>
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
          />
          <p className="error"></p>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              onChange={(e) => setFirstOption(e.target.value)}
              value={firstOption}
              style={{ width: "300px" }}
              id="demo-helper-text-misaligned-no-helper"
              label="option"
            />
            <DeleteForeverIcon style={{ color: "grey" }} />
          </Box>
          <br></br>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              onChange={(e) => setSecendOption(e.target.value)}
              value={secendOption}
              style={{ width: "300px" }}
              id="demo-helper-text-misaligned-no-helper"
              label="option"
            />
            <DeleteForeverIcon style={{ color: "grey" }} />
          </Box>
          <br></br>
          <AddCircleIcon
            style={{
              color: "grey",
              marginLeft: "50px",
            }}
          />

          <p className="error">{error}</p>
          <Button
            style={{
              color: "grey",
              width: "90%",
            }}
            onClick={createPoll}
            variant="outlined"
          >
            Create
          </Button>
        </div>
      </form>
      <div>
        <img className="img" alt="create" src={Create}></img>
      </div>
    </Box>
  );
};

export default CreatePoll;
