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
  const [option, setOption] = useState([]);
  const [firstOption, setFirstOption] = useState([]);
  const [secendOption, setSecendOption] = useState([]);
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

  const newInput = () => {
    setOption([
      ...option,
      {
        option: "",
      },
    ]);
  };

  const DeletInput = (i) => {
    let newOption = [...option];
    newOption.splice(i, 1);
    setOption(newOption);
  };

  return (
    <div className="main">
      <div>
        <h1 style={{ marginTop: "30px" }}>Create poll !</h1>
        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            style={{ width: "350px" }}
            id="demo-helper-text-misaligned-no-helper"
            label="Title"
          />
        </Box>
        <Box
          style={{
            marginTop: "10px",
          }}
        >
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            style={{ width: "350px" }}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
          />
        </Box>

        <Box
          style={{ width: "350px", marginTop: "10px" }}
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            onChange={(e) => setFirstOption(e.target.value)}
            value={firstOption}
            id="demo-helper-text-misaligned-no-helper"
            label="option"
          />
          <DeleteForeverIcon style={{ color: "grey" }} onClick={DeletInput} />
          <TextField
            onChange={(e) => setSecendOption(e.target.value)}
            value={secendOption}
            id="demo-helper-text-misaligned-no-helper"
            label="option"
          />
          <DeleteForeverIcon style={{ color: "grey" }} onClick={DeletInput} />
          <AddCircleIcon
            onClick={newInput}
            style={{ color: "grey", marginLeft: "50px" }}
          />
        </Box>
        <p className="error">{error}</p>
        <div>
          <Button
            style={{ color: "grey", marginLeft: "50px", marginTop: "25px" }}
            onClick={createPoll}
            variant="outlined"
          >
            Create
          </Button>
        </div>
      </div>
      <div>
        <img className="img" alt="create" src={Create}></img>
      </div>
    </div>
  );
};

export default CreatePoll;
