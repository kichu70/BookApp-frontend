import React, { useState } from "react";
import "./SignUp.css";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

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
      e.preventDefault();
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
      if (password !== conformpassword) {
        setError(true);
         toast.error("passwords dont match");
         return
      }
      const res = await axios.post("http://localhost:5000/user/add-user", {
        username,
        email,
        password,
      });
      console.log("added user", res.data);
      toast.success("user Created!!");
      setConformpassword("");
      setEmail("");
      setUsername("");
      setPassword("");
      setSavePassword("");
    } catch (err) {
      if (err.response) {
        if (err.response.data.message) {
          toast.error(err.response.data.message);
        } else if (err.response.data.msg) {
          const errors = err.response.data.msg;
          for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
              toast.error(errors[key]);
            }
          }
        }
      } else {
        console.log(err, "something went wrong in sign in page");
        toast.error(err, "something went wrong in sign in page");
      }
    }
  };

  return (
    <form action="">
      <div className="singUpMain">
        &nbsp;
        <ToastContainer theme="colored"/>
        <div className="signup">
          <div className="content1">
            <h1>SignUp</h1>
            <TextField
              className="text"
              label="username"
              value={username}
              color="secondary"
              focused
              error={error && !username.trim()}
              helperText={
                error && !username.trim() ? "Username is required" : ""
              }
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className="text"
              label="email"
              color="secondary"
              value={email}
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
              value={password}
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
              value={conformpassword}
              onChange={(e) => setConformpassword(e.target.value)}
              focused
              error={Boolean(error && password !== conformpassword
                  ? "Passwords do not match":"")}
              helperText={
                error &&( password !== conformpassword
                  ? "Passwords do not match"
                  : "")   
              }
              required
            />
            <Button
              type="submit"
              className="submit"
              variant="contained"
              onClick={addUser}
            >
              submit
            </Button>
            <Typography variant="body2" className="signin-text">
              Already have an account?{" "}
              <button className="back" onClick={() => navigate("/login")}>
                login
              </button>
            </Typography>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
