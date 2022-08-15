import React, { useState, useEffect } from "react";
import "./ManagePoll.css";
import Editable from "../../image/Editable.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManagePoll = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");

  const ManagePollData = () => {
    console.log("edit :>> ");
  
  };

  return (
    <Box
      className="box"
      sx={{
        "& .MuiTextField-root": { m: 2, width: "45ch" },
      }}
    >
      <form>
        <h1 style={{ marginTop: "30px" }}>Manage Poll !</h1>
        <div>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            style={{ width: "500px" }}
            id="demo-helper-text-misaligned-no-helper"
            label="Title"
          />
          <p className="error"></p>
          <TextField
            value={description}
            onChange={(e) => setDiscription(e.target.value)}
            style={{ width: "500px" }}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
          />
          <p className="error"></p>
          <Button
            onClick={ManagePollData}
            style={{
              color: "grey",
              width: "200px",
              marginTop: "40px",
              width: "100%",
              display: "flex",
            }}
            variant="outlined"
            disableElevation
          >
            Save
          </Button>
        </div>
      </form>

      <div>
        <img className="img" alt="Editable" src={Editable}></img>
      </div>
    </Box>
  );
};
export default ManagePoll;
