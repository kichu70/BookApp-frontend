import { Card, CardContent, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./AddtoCart..css";
import axios from "axios";
import { useAuth } from "../../auth/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddtoCart = () => {
  const token = localStorage.getItem("token");
  const navigate =useNavigate()
  const {cartItems,removeFromCart} =useAuth();
  const [cart,setcart]=useState(null)
useEffect(()=>{
    if((!cartItems ||cartItems.length === 0) ){
        // navigate ("/")
        setcart("no iteam in the cart ")
    }
  }, [cartItems, navigate, ]);


  return (
      <div className="cart-main">
      <div className="cart-cnt">
        <h1>{cart}</h1>
        <button onClick={()=>navigate("/")}>go back</button>
        {cartItems.map((book)=>(
            <Card className="cart-slide">
            <button onClick={()=>removeFromCart(book.id)}>delet</button>
            <h1>"aa"</h1>
            <CardMedia
              component="img"
              image={`http://localhost:5000/${book.image[0]}`}
              alt={book.bookname|| "book"}
              className="cart-card-media"
              />
            <CardContent>
              <h3>₹ </h3>
            </CardContent>
          </Card>
            ))}

      </div>
    </div>
  );
};

export default AddtoCart;
