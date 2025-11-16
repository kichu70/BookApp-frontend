import React, { useEffect, useState } from "react";
import "./CategoryOfBooks.css";
import { Card, CardMedia, CardContent } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategoryOfBooks = () => {
  const [books, setBooks] = useState([]);
  const [books2, setBooks2] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get("https://bookapp-backend-wuwu.onrender.com/Books/new-book", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data.data);
    };
    fetchBooks();
  }, []);
  useEffect(() => {
    const fetchBooks2 = async () => {
      const res = await axios.get("https://bookapp-backend-wuwu.onrender.com/Books/used-book", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks2(res.data.data);
    };
    fetchBooks2();
  }, []);
  
  // duplicate 2-3 times for seamless scroll
  const displayBooks2 = [...books2, ...books2, ...books2];
  const displayBooks = [...books, ...books, ...books];
  const navigate =useNavigate()


  
  return (
    <div className="category">
      <h1 id="new">New Book's</h1>
    <div className="slider" >
      <div className="slide-track">
        {displayBooks.map((book, idx) => (
          <Card   onClick={()=>navigate(`/single-book/${book._id}`)}className="slide" key={idx}>
            <h4>{book.bookname}</h4>
            {book.image && book.image[0] && (
              <CardMedia
                component="img"
                image={`https://bookapp-backend-wuwu.onrender.com/${book.image[0]}`}
                alt={book.bookname}
                className="card-media"
              />
            )}
            <CardContent>
              <h3>₹ {book.price}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    <h1 id="used">Used Book's</h1>
     <div className="slider2" >
      <div className="slide-track2">
        {displayBooks2.map((book, idx) => (
          <Card className="slide2" key={idx}  onClick={()=>navigate(`/single-book/${book._id}`)}>
            <h4>{book.bookname}</h4>
            {book.image && book.image[0] && (
              <CardMedia
                component="img"
                image={`https://bookapp-backend-wuwu.onrender.com/${book.image[0]}`}
                alt={book.bookname}
                className="card-media"
              />
            )}
            <CardContent>
              <h3>₹ {book.price}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CategoryOfBooks;
