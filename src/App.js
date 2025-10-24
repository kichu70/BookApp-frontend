import {  BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./Components/Registration/SignUp";
import { useAuth } from "./auth/AuthContext";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import AddBook from "./Components/AddBook/AddBook";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/login' element={user ? <Navigate to='/'/> : <Login/>}/>
          <Route path='signup' element={<SignUp />} />
          <Route path='/' element={user ? <Home />: <Navigate to="/login" />} />
          <Route path='/add-book' element={user ? <AddBook/>: <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
