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
import SigninHeader from "../../components/header/SinginHeader";
import { BASE_URL } from "../constants";

const CreatePoll = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [newInput, setNewInput] = useState([{}, {}]);
  const [error, setError] = useState("");

  const createPoll = async () => {
    if (title === "" || description === "" || options === "") {
      setError("Title and Description and Optionss Fields Can't Be Empty!");
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://${BASE_URL}/poll`,
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
      .then((response) => {
        createItems(response.data.insertId);
      })
      .catch((err) => {
        let error = err.response.data;
        let status = err.response.status;
        console.log("err1 :>> ", status, error);
        if (status === 401) {
          navigate(`/PollList`);
        }
      });
  };

  const createItems = async (id) => {
    const token = localStorage.getItem("token");
    const pollId = id;
    axios
      .post(
        `http://${BASE_URL}/item`,
        [
          {
            poll_id: pollId,
            title: options,
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
        console.log('res :>> ', res);
      })
      .catch((err) => {
        let error = err.response.data;
        let status = err.response.status;
        console.log("err :>> ", error, status);
        if (status === 401) {
          navigate(`/SignIn`);
        }
      });
  };

  const getUniqeLink = async (id) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://${BASE_URL}/poll/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        let link = await response.data[0].link;
        console.log("response :>> ", response);
        navigate(`/Link/${link}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const createNewInput = () => {
    setNewInput([
      ...newInput,
      {
        option: "",
      },
    ]);
  };

  const DeletInput = (i) => {
    let newOptions = [...newInput];
    newOptions.splice(i, 1);
    setNewInput(newOptions);
  };

  const handelChenge = (value, index) => {
    const option = options.slice(index, value);
    setOptions(option);
  };

  return (
    <React.Fragment>
      <SigninHeader />
      <Box
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
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
            />
            {newInput.map((i, index) => {
              return (
                <Box
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    onChange={(e) => handelChenge(e.target.value, index)}
                    value={options[index]}
                    style={{ width: "300px" }}
                    id="demo-helper-text-misaligned-no-helper"
                    label="options"
                  />
                  <DeleteForeverIcon
                    onClick={DeletInput}
                    style={{ color: "grey" }}
                  />
                </Box>
              );
            })}
            <AddCircleIcon
              onClick={createNewInput}
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
