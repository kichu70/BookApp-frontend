import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin =async (e) => {
    if (!email.trim() || !password || password.length < 8) {
      setError(true);
      return;
    } else {
      setError(false);
      login(email,password)
           const token =localStorage.getItem("token")
           if(token){
               navigate("/")
               console.log("ok**")
           }
    }
    e.preventDefault()


  };
  return (
    <div>
      <div className="singUpMain">
        <ToastContainer/>
        <div className="signup">
          <div className="content1">
            <h1>Login</h1>
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

            <Button className="submit" variant="contained" onClick={handleLogin}>
              submit
            </Button>
            <Typography variant="body2" className="signin-text">
             create Account? <button className="back" onClick={()=>navigate('/signup')}>Sign Up</button>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
