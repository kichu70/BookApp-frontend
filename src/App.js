import {  BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./Components/Registration/SignUp";
import { useAuth } from "./auth/AuthContext";
import Login from "./Components/Login/Login";
import AddBook from "./Components/AddBook/AddBook";
import HomePage from "./Pages/HomePage/HomePage";
import AddtoCart from "./Components/AddtoCart/AddtoCart";
import SingleBook from "./Components/SingleBook/SingleBook";
import { ToastContainer } from "react-toastify";
import Cancel from "./Components/Payment/Cancel";
import Success from "./Components/Payment/Success";
import AllBooks from "./Components/Books/AllBooks";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/login' element={user ? <Navigate to='/'/> : <Login/>}/>
          <Route path='signup' element={<SignUp />} />
          <Route path='/' element={user ? <HomePage />: <Navigate to="/login" />} />
          <Route path='/add-book' element={user ? <AddBook/>: <Navigate to="/login" />} />
          <Route path='/add-cart' element={user ? <AddtoCart/>: <Navigate to="/login" />} />
          <Route path='/all-books' element={user ? <AllBooks/>: <Navigate to="/login" />} />
          <Route path='/single-book/:id' element={user ? <SingleBook/>: <Navigate to="/login" />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
