import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleclickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleclickOutside);
    return () => {
      document.removeEventListener("mousedown", handleclickOutside);
    };
  }, []);


  const handleClick =(sectionId)=>{
    const section =document.getElementById(sectionId)
    if(section){
      section.scrollIntoView({behavior:"smooth"})
    }else{
      navigate("/")

    }
    
  }
  return (
    <div className="nav-main">
      &nbsp;
      <div className="navbar">
        <div className="navbar-div1">
          <h1 id="heading ">Books-App</h1>
        </div>
        <div className="navbar-div2">
          <div className="navbar-div3">
            <button onClick={()=>handleClick("home")}>home</button>
            <button onClick={()=>navigate("/all-books")}>Books</button>
            <button onClick={() => navigate("/add-book")}>Add Book</button>
            <button onClick={()=>handleClick("footer")}>Contact Us</button>
            <button onClick={logout}>Logout</button>
            <button onClick={() => navigate("/add-cart")}>
              <ShoppingCartIcon />
            </button>
          </div>
          <h1 className="mbllogo">happy shopping</h1>
          <div id="mblMenuBtn" >
            <button onClick={() => navigate("/add-cart")}>
              <ShoppingCartIcon />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
          </div>{" "}
          {menuOpen && (
            <div ref={menuRef} className="mblMenu" id="mblMenu">
            <button onClick={()=>handleClick("home")}>home</button>
            <button onClick={() => navigate("/add-book")}>Books</button>
            <button onClick={()=>handleClick("footer")}>ContactUs</button>
            <button onClick={() => navigate("/add-book")}>Add Book</button>
            <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
