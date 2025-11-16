import { Button, CardMedia, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SingleBook.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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

  const [deleteId, setDeleteId] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [editId, setEditId] = useState(null);
  const [selectBook, setSelectBook] = useState(null);
  const [openEdit, setopenEdit] = useState(false);
  const { addToCart } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const [newValue, setNewValue] = useState(0);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(
          `https://bookapp-backend-wuwu.onrender.com/Books/single-book/?id=${id}`,
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
          `https://bookapp-backend-wuwu.onrender.com/Books/delete-book/?id=${deleteId}`,
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
      navigate("/");
    } catch (err) {
      console.log(err, "error is in the delete function");
    } finally {
      setOpenConfirm(false);
      setDeleteId(null);
    }
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

  // ----------add-rating-------------

  const handleRating = async (event, newValuee) => {
    setNewValue(newValuee);
    try {
      const res = await axios.post(
        `https://bookapp-backend-wuwu.onrender.com/Books/add-rating/?id=${id}`,
        {
          rating: newValuee,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dark("Rating added successfull !!");
      setBook(res.data.data);
    } catch (err) {
      console.log(err, "error is adding rating");
      toast.error("You have already given rating ");
    }
  };

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
                      image={`https://bookapp-backend-wuwu.onrender.com/${img}`}
                      component="img"
                      title={`${book.bookname} - ${index + 1}`}
                    />
                  )
                )}
              </Carousel>
            </div>
            <div className="single-details">
              <h1>{book.bookname}</h1>
              <Rating
                name="read-only-rating"
                value={book.avarageRating || 0}
                precision={0.1}
                readOnly
              />
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
                  <Button
                    className="buynow"
                    variant="contained"
                    onClick={() => handlePayment([book])}
                  >
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
              <div className="add-rating">
                <p>Give Rating</p>
                <Rating
                  name="new-rating"
                  value={newValue}
                  onChange={handleRating}
                  precision={0.5}
                />
              </div>
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
