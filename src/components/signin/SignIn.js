import Login from "../../image/Login.png";
import "./SignIn.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passError, setPassError] = useState("");

  const login = () => {
    if (username === "" || password === "") {
      setUsernameError("");
      setPassError("");
      return;
    }
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUsername("");
        setPassword("");
        navigate("/PollList");
      })
      .catch((res) => {
        const error = res.response.data;
        const status = res.response.status;
        if (status === 404) {
          setUsernameError(error);
          setPassError("");
        } else if (status === 403) {
          setPassError(error);
          setUsernameError("");
        }
      });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 2, width: "45ch" },
      }}
      noValidate
      autoComplete="off"
      className="sign-in"
    >
      <form onSubmit={login}>
        <div 
        className="box"
        >
          <h1>SignIn</h1>
          <TextField
            required
            id="outlined-required"
            label="Username"
            helperText="Please enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p>{usernameError}</p>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            helperText="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>{passError}</p>
          <Button style={{ color:"grey"}} onClick={login} variant="outlined">
            Login
          </Button>
        </div>
      </form>

      <div>
        <img className="img" alt="login" src={Login}></img>
      </div>
    </Box>
  );
}

export default SignIn;
