import React, { useState, useEffect } from "react";
import "./ManagePoll.css";
import Editable from "../../image/Editable.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SigninHeader from "../../components/header/SinginHeader";
import { BASE_URL } from "../constants";

const ManagePoll = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getPollData = (id) => {
      const token = localStorage.getItem("token");

      axios
        .get(`http://${BASE_URL}/poll/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(async (response) => {
          console.log(response);
          setTitle(response.data.title);
          setDiscription(response.data.description);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getPollData(id);
  }, []);

  const updateData = () => {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `http://${BASE_URL}/poll/${id}`,

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
        console.log(response);
        navigate(`/PollPage/${id}`);
      })
      .catch((error) => {
        console.log(error);
        let status = error.response.status;
        if (status === 401) {
          navigate(`/SignIn`);
        }
      });
  };

  return (
    <React.Fragment>
      <SigninHeader />
      <Box
        className="box"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "45ch" },
        }}
      >
        <form
          style={{
            marginLeft: "15px",
          }}
        >
          <h1
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Manage Poll
          </h1>
          <div>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              style={{ width: "400px" }}
              id="demo-helper-text-misaligned-no-helper"
              label="Title"
            />
            <p className="error"></p>
            <TextField
              value={description}
              onChange={(e) => setDiscription(e.target.value)}
              style={{ width: "400px" }}
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
            />
            <p className="error"></p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={updateData}
                style={{
                  color: "grey",
                  marginTop: "40px",
                  width: "90%",
                }}
                variant="outlined"
                disableElevation
              >
                Save
              </Button>
            </div>
          </div>
        </form>
        <div>
          <img className="img" alt="Editable" src={Editable}></img>
        </div>
      </Box>
    </React.Fragment>
  );
};
export default ManagePoll;
