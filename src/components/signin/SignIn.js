import Login from "../../image/Login.png";
import "./SignIn.css";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { Router } from "@mui/icons-material";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios
      .post("http://localhost:3000/login", {
        username: userName,
        password: password,
      })
      .then((response) => {
        const token = response.token;
        localStorage.setItem("token", token);
        Router.push("/poll");
      })
      .catch((error) => {
        error("Your username or password are not correct!");
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
        <div className="box">
          <h1>SignIn</h1>
          <TextField
            required
            id="outlined-required"
            label="Username"
            helperText="Please enter your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            helperText="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={login} variant="outlined">
            Login
          </Button>
        </div>
      </form>

      <div>
        <img className="img" src={Login}></img>
      </div>
    </Box>
  );
}

export default SignIn;
