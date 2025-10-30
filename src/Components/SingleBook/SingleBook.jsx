import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SingleBook.css";
import { useNavigate, useParams } from "react-router-dom";
import axios, { all } from "axios";
import Carousel from "react-material-ui-carousel";
import Navbar from "../Navabar/Navbar";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useAuth } from "../../auth/AuthContext";
import { handlePayment } from "../Payment/PaymentButton";
import EditBook from "../EditBook/EditBook";
import Confirm from "../Confirm/Confirm";

const SingleBook = () => {
  const notify = () => toast.dark("Book Have been deleted");
  const notify2 = () => toast.dark("Book is not deleted");
  const [book, setBook] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [editId, setEditId] = useState(null);
  const [selectBook, setSelectBook] = useState(null);
  const [openEdit, setopenEdit] = useState(false);
  const { addToCart } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/Books/single-book/?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const allbook = res.data.data;
        setBook(allbook[0]);
        console.log("all books ", allbook);
      } catch (err) {
        console.log(err, "error is in the single-bok");
      }
    };
    getdata();
  }, [id, token]);
  // -----------------------------
  // ------delete book----------------
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const onhandledelete = (id) => {
    if (!deleteId) return;
    try {
      const dltdata = async () => {
        const res = await axios.put(
          `http://localhost:5000/Books/delete-book/?id=${deleteId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBook((prev) => prev.filter((p) => p.id !== deleteId));
        console.log(res.data, "deleted");
        notify();
      };
      dltdata();
      navigate("/")
    } catch (err) {
      console.log(err, "error is in the delete function");
    } finally {
      setOpenConfirm(false);
      setDeleteId(null);
    }
  };

  // ---------------------
   const reloadComponent = () => {
    setRefresh((prev) => !prev);
  };
  // -----------update book------------------------

  const handleUpdate = (id, books) => {
    setEditId(id);
    setSelectBook(books);
    setopenEdit(true);
  };

  // ----------getid----------
  useEffect(() => {
    if (token) {
      try {
        const decode = jwtDecode(token);
        setUserId(decode.id);
      } catch (err) {
        console.log(err, "error is in the taiking id from the token");
      }
    }
  }, [token]);
  return (
    <div>
      <Navbar />
      <div className="single-book">
        <div className="single-book2">
          <div className="single-content">
            <div className="imagesdiv">
            <Carousel
              autoPlay={false}
              interval={3000}
              navButtonsAlwaysVisible={false}
              index={0}
              className="carousel"
            >
           
              {(Array.isArray(book.image) ? book.image : [book.image])?.map(
                (img, index) => (
                       <CardMedia
                        key={img}
                        className="CardMedia"
                        sx={{ width: "100%", objectFit: "contain" }}
                        height="240px"
                        image={`http://localhost:5000/${img}`}
                        component="img"
                        title={`${book.bookname} - ${index + 1}`}
                      />
                )
              )}
            </Carousel>
            </div>
            <div className="single-details">
             <h1>{book.bookname}</h1>
            <h2 className="price">₹{book.price}</h2>
            <h4 className="single-decsription">{book.description}</h4>
            {book.user === userId && (
              <div className="btns">
                <Button
                  className="dltbtn"
                  variant="contained"
                  size="small"
                  onClick={() => handleDeleteClick(book._id)}
                >
                  delete
                </Button>
                <Button
                  className="editbtn"
                  variant="contained"
                  size="small"
                  onClick={() => handleUpdate(book._id, book)}
                >
                  edit
                </Button>
              </div>
            )}
            {book.user !== userId && (
              <div className="buybtn">
                <Button className="buynow" variant="contained"onClick={() => handlePayment([book])}>
                  Buy Now
                </Button>
                <Button
                  className="add-to-cart"
                  variant="contained"
                  onClick={() => addToCart(book)}
                >
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
       <Confirm
          open={openConfirm}
          onConfirm={onhandledelete}
          onCancel={() => {
            setOpenConfirm(false);
            notify2();
            setDeleteId(null);
          }}
        />
        {openEdit && (
          <EditBook
            open={openEdit}
            book={selectBook}
            id={editId}
            onClose={(updateBook) => {
              setopenEdit(false);
              if (updateBook) {
                setBook(updateBook);
                
              }
            }}
          />
        )}
    </div>
  );
};

export default SingleBook;
