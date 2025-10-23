import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { useAuth } from "../../auth/AuthContext";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useAuth();

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

  return (
    <div className="nav-main">
      &nbsp;
      <div className="navbar">
        <div className="navbar-div1">
          <h1 id="heading ">Books-App</h1>
        </div>
        <div className="navbar-div2">
          <div className="navbar-div3">
          <button>home</button>
          <button>Books</button>
          <button>Aboutus</button>
          <button>contact-us</button>
          <button onClick={logout}>Logout</button>
        </div>
        <h1 className="mbllogo">happy shopping</h1>
        <button id="mblMenuBtn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        {menuOpen && (
          <div ref={menuRef} className="mblMenu" id="mblMenu">
            <button>home</button>
            <button>Books</button>
            <button>Aboutus</button>
            <button>contact-us</button>
            <button onClick={logout}>Logout</button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
