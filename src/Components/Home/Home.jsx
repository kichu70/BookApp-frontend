import React, { useEffect } from "react";
import Navbar from "../Navabar/Navbar";
import "./Home.css";
import cntImg1 from "../../Images/bgImg2.jpeg";
import cntImg2 from "../../Images/bgImg3.jpeg";
import ViewBooks from "../viewBook/ViewBooks";
import CategoryOfBooks from "../Used&NewBooks/CategoryOfBooks";

const Home = () => {

const handleClick =(sectionId)=>{
  const section =document.getElementById(sectionId)
  if(section){
    section.scrollIntoView({behavior:"smooth"})
  }
}
  return (
    <div className="main">
      <div className="home-main">
        <Navbar />
        <h1 className="head-content">
          Welcome to our Book Selling App, where you can discover a wide variety
          of books from all genres.
        </h1>
        <div className="home-content">
          <div className="cnt-div1">
            <img src={cntImg1} alt="" onClick={()=>handleClick("new")}/>
            <h1 className="newBook">new Book</h1>
          </div>
          <div className="cnt-div2">
            <img src={cntImg2} alt="" onClick={()=>handleClick("used")} />
            <h1 className="oldBook">old Book</h1>
          </div>
        </div>

        <CategoryOfBooks />
        <ViewBooks />
      </div>
      &nbsp;
    </div>
  );
};

export default Home;
