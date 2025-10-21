import {  BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./Components/Registration/SignUp";
import Home from "./Pages/Home/Home";
import { useAuth } from "./auth/AuthContext";
import Login from "./Components/Login/Login";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/login' element={user ? <Navigate to='/'/> : <Login/>}/>
          <Route path='signup' element={<SignUp />} />
          <Route path='/' element={user ? <Home />: <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
