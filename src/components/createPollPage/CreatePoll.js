import React, { useState } from "react";
import "./CreatePoll.css";
import Create from "../../image/Create.png";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import SigninHeader from "../../components/header/SinginHeader";
import PollPage from "../../components/pollPage/PollPage";
import { BASE_URL } from "../constants";

const CreatePoll = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [option, setOption] = useState([]);
  const [createNewOption, setCreateNewOption] = useState([{}, {}]);
  const [error, setError] = useState("");


  const createPoll = async () => {
    if (title === "" || description === "" || option === "") {
      setError("Title and Description and Options Fields Can't Be Empty!");
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://${BASE_URL}/poll`,
        [
          {
            title: title,
            description: description,
          },
        ],
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const id = response.data[0].insertId;
        createPollItems(id);
      })
      .catch((err) => {
        let error = err.response.data;
        let status = err.response.status;
console.log('err :>> ', status,error);
        if (status === 401) {
          navigate("/signIn");
        }
      });
  };

  const createPollItems = async (id) => {
    const token = localStorage.getItem("token");
    const pollId = id;
    axios
      .post(
        `http://${BASE_URL}/item`,
        [
          {
            poll_id: pollId,
            title: option,
          },
        ],
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getUniqeLink(pollId);
      })
      .catch((err) => {
        let error = err.response.data;
        let status = err.response.status;
        console.log("err :>> ", error, status);
        if (status === 401) {
          navigate("/signIn");
        }
      });
  };

  const getUniqeLink = async (id) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://${BASE_URL}/poll/pollId/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        let link = await response.data[0].link;
          navigate(`/link/${link}`);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const newInput = () => {
    setCreateNewOption([
      ...createNewOption,
      {
        option: "",
      },
    ]);
  };

  const DeletInput = (i) => {
    let newOption = [...createNewOption];
    newOption.splice(i, 1);
    setCreateNewOption(newOption);
  };

  return (
    <React.Fragment>
      <SigninHeader />
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
            <h1
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Create poll
            </h1>
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
            {createNewOption.map((i, id) => (
              <Box
                key={id}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  onChange={(e) => setOption(e, id)}
                  value={option}
                  style={{ width: "300px" }}
                  id="demo-helper-text-misaligned-no-helper"
                  label="option"
                />
                <DeleteForeverIcon
                  onClick={DeletInput}
                  style={{ color: "grey" }}
                />
                <p className="error">{error}</p>
              </Box>
            ))}
            <br></br>
            <AddCircleIcon
              onClick={newInput}
              style={{
                color: "grey",
                marginLeft: "50px",
              }}
            />
            <p className="error">{error}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  color: "grey",
                  width: "90%",
                }}
                onClick={createPoll}
                variant="outlined"
              >
                Next
              </Button>
            </div>
          </div>
        </form>
        <div>
          <img className="img" alt="create" src={Create}></img>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default CreatePoll;
