import React, { useState } from "react";
import "./SignUp.css";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, } from "react-toastify";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformpassword, setConformpassword] = useState("");
  const [savePassword, setSavePassword] = useState("");
  const token = localStorage.getItem("token");
  const [error, setError] = useState(false);

  const addUser = async (e) => {
    try {
      if (
        !username.trim() ||
        !email.trim() ||
        !password ||
        password.length < 8 ||
        password !== conformpassword
      ) {
        setError(true);
        return;
      } else {
        setError(false);
      }
      e.preventDefault();
      if (password !== conformpassword) {
        return toast.error("passwords dont match");
      }
      const res = await axios.post("http://localhost:5000/user/add-user", {
        username,
        email,
        password,
      });
      console.log("added user", res.data);
      setConformpassword("");
      setEmail("");
      setUsername("");
      setPassword("");
      setSavePassword("");
    } catch (err) {
      if (err.response) {
        const errors = err.response.data.msg;
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            toast.error(errors[key]);
          }
        }
      } else {
        console.error(err, "error in the sigup page");
        toast.error("sothing went wrong in the adding product");
      }
    }
  };

  return (
    <div className="singUpMain">
      .
      <div className="signup">
        <div className="content1">
          <h1>SignUp</h1>
          <TextField
            className="text"
            label="username"
            color="secondary"
            focused
            error={error && !username.trim()}
            helperText={error && !username.trim() ? "Username is required" : ""}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className="text"
            label="email"
            color="secondary"
            onChange={(e) => setEmail(e.target.value)}
            focused
            error={
              error &&
              (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            }
            helperText={
              error && !email.trim()
                ? "Email is required"
                : error && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                ? "Invalid email format"
                : ""
            }
            required
          />
          <TextField
            className="text"
            label="password"
            color="secondary"
            onChange={(e) => setPassword(e.target.value)}
            focused
            error={error && (!password || password.length < 8)}
            helperText={
              error && !password
                ? "Password is required"
                : error && password.length < 8
                ? "Password must be at least 8 characters"
                : ""
            }
            required
          />
          <TextField
            className="text"
            label="Conform-Password"
            color="secondary"
            onChange={(e) => setConformpassword(e.target.value)}
            focused
            error={error && (!password || password.length < 8)}
            helperText={
              error && !password
                ? "Password is required"
                : error && password.length < 8
                ? "Password must be at least 8 characters"
                : ""
            }
            required
          />
          <Button className="submit" variant="contained" onClick={addUser}>
            submit
          </Button>
          <Typography variant="body2" className="signin-text">
            Already have an account?{" "}
            <button className="back" onClick={()=>navigate('/login')}>  
              login
            </button>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
