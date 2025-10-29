import React, { use, useEffect, useState } from "react";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./ViewBooks.css";
import Carousel from "react-material-ui-carousel";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Confirm from "../Confirm/Confirm";
import "./ViewResponsiv.css";
import EditBook from "../EditBook/EditBook";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import addToCart from "../AddtoCart/AddtoCart";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const ViewBooks = () => {
  const notify = () => toast.dark("Book Have been deleted");
  const notify2 = () => toast.dark("Book is not deleted");
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [editId, setEditId] = useState(null);
  const [selectBook, setSelectBook] = useState(null);
  const [openEdit, setopenEdit] = useState(false);
  const {addToCart}=useAuth()
  const naviagte =useNavigate()
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
        setBooks((prev) => prev.filter((p) => p.id !== deleteId));
        console.log(res.data, "deleted");
        notify();
      };
      dltdata();
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

  // -----------get user id from token-------------

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

  // ------refresh---------------
  const reloadComponent = () => {
    setRefresh((prev) => !prev);
  };

  // ---------viwe books all book-----------------
  useEffect(() => {
    const FechData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/Books/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const idreplace = res.data.data.map(({ _id, ...rest }) => ({
          id: _id,
          ...rest,
        }));
        console.log(idreplace);
        setBooks(idreplace);
      } catch (err) {
        console.log(err, "error is in the fetching data");
      }
    };
    FechData();
  }, [refresh]);


  // ---------------addToCatr----------------------

  return (
    <div>
      <div className="section1-newbook">
        <div className="grids">
          {books.map((book) => (
            <div id="books" className="content" key={book.id}>
              <Card className="Card">
                <h4 className="bookname"  onClick={()=>naviagte(`/single-book/${book.id}`)}>{book.bookname}</h4>
                <Carousel
                  autoPlay={true}
                  interval={3000}
                  navButtonsAlwaysVisible={false}
                  indicators={false}
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
                         onClick={()=>naviagte(`/single-book/${book.id}`)}
                      />
                    )
                  )}
                </Carousel>

                <CardContent  onClick={()=>naviagte(`/single-book/${book.id}`)}>
                  <h3 className="price">₹ {book.price}</h3>

                  <Typography
                    className="author"
                    sx={{ color: "text.secondary" }}
                  >
                    {book.author}
                  </Typography>
                  <Typography
                    className="discription"
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                  >
                    {book.description}
                  </Typography>
                </CardContent>

                {book.user === userId && (
                  <div className="btns">
                    <Button
                      className="dltbtn"
                      variant="contained"
                      size="small"
                      onClick={() => handleDeleteClick(book.id)}
                    >
                      delete
                    </Button>
                    <Button
                      className="editbtn"
                      variant="contained"
                      size="small"
                      onClick={() => handleUpdate(book.id, book)}
                    >
                      edit
                    </Button>
                  </div>
                )}
                {book.user !== userId && (
                  <div className="buybtn">
                    <Button className="buynow" variant="contained">Buy Now</Button>
                    <Button className="add-to-cart" variant="contained" onClick={()=>addToCart(book)}>Add to Cart</Button>
                  </div>
                )}
              </Card>
            </div>
          ))}
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
                setBooks((prev) =>
                  prev.map((p) =>
                    p.id === updateBook._id
                      ? { id: updateBook._id, ...updateBook }
                      : p
                  )
                );
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ViewBooks;
