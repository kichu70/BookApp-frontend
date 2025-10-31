import React, { useState } from "react";
import "./AddBook.css";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const token = localStorage.getItem("token");
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const addBook = async (req, res) => {
    if (
      !bookName ||
      !bookAuthor ||
      !bookDescription ||
      !bookPrice ||
      !bookCategory
    ) {
      setError(true);
      toast.error("Please fill all fields before submitting!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("author", bookAuthor);
      formData.append("bookname", bookName);
      formData.append("description", bookDescription);
      formData.append("price", bookPrice);
      formData.append("category", bookCategory);
      image.forEach((img) => {
        formData.append("image", img);
      });
      const res = await axios.post(
        `https://bookapp-backend-1-2jhn.onrender.com/Books/add-book`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setBookAuthor("");
      setBookName("");
      setBookPrice("");
      setBookDescription("");
      setBookCategory("");
      setImage([]);
      navigate("/");
    } catch (err) {
      if (err.response) {
        const errors = err.response.data;
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            toast.error(errors[key]);
          }
        }
      } else {
        toast.error("something went wrong in the adding product");
        console.log(err, "error is in the adding book frontend");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImage((prev) => [...prev, ...files]);
    const newPreview = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...newPreview]);
  };
  const removeImage = (index) => {
    setImage((prev) => prev.filter((currentElement, i) => i !== index));
    setImagePreview((prev) => prev.filter((currentElement, i) => i !== index));
  };

  return (
    <div className="AddBook">
      &nbsp;
      <div className="add-main">
        <div className="addbook-head">
          <Button id="close" onClick={() => navigate("/")}>
            X
          </Button>
          <h1>add new book</h1>
          <div className="addbook-content">
            <div className="addbook-grid1">
              <TextField
                onChange={(e) => setBookAuthor(e.target.value)}
                value={bookAuthor}
                className="textEditField"
                label="Author"
                variant="filled"
                focused
                error={error && (!bookAuthor || bookAuthor.length < 3)}
                helperText={
                  error && !bookAuthor
                    ? "Author name is required"
                    : error && bookAuthor.length < 3
                    ? "Author must be at least 3 characters"
                    : ""
                }
              />
              <TextField
                onChange={(e) => setBookName(e.target.value)}
                value={bookName}
                className="textEditField"
                label="Book Name"
                variant="filled"
                focused
                error={error && (!bookName || bookName.length < 3)}
                helperText={
                  error && !bookName
                    ? "Book Name  is required"
                    : error && bookName.length < 3
                    ? "Book Name must be at least 3 characters"
                    : ""
                }
              />
              <TextField
                onChange={(e) => setBookPrice(e.target.value)}
                value={bookPrice}
                className="textEditField"
                label="price"
                type="Number"
                variant="filled"
                focused
                error={error && (!bookPrice || bookPrice.length < 3)}
                helperText={
                  error && !bookName
                    ? "price is required"
                    : error && bookPrice <= 0
                    ? "Price  must be  greater than 0"
                    : ""
                }
              />
              <select
                id="category"
                name="category"
                value={bookCategory}
                onChange={(e) => setBookCategory(e.target.value)}
                required
                
              >
                <option value="">
                  <h1>Seclect category</h1>
                </option>
                <option value="New">New Book</option>
                <option value="Used">Old Book</option>
              </select>
            </div>
            <div className="addbook-grid2">
              <TextField
                onChange={(e) => setBookDescription(e.target.value)}
                value={bookDescription}
                className="textEditField"
                label="Description"
                variant="filled"
                focused
                error={error && (!bookDescription || bookDescription.length < 3)}
                helperText={
                  error && !bookDescription
                    ? "price is required"
                    : error && bookDescription.length < 3
                    ? "Book Description must be at least 3 characters"
                    : ""
                }
              />
              <input
                type="file"
                accept="image/*"
                className="textEditField"
                onChange={handleImageChange}
              />

              <div className="imagePreview">
                {imagePreview.map((src, idx) => (
                  <div className="imgPrev2" key={idx}>
                    <img
                      key={idx}
                      src={src}
                      alt={`preview-${idx}`}
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                      }}
                    />
                    <button id="xBtn" onClick={() => removeImage(idx)}>
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button variant="contained" onClick={addBook} disabled={loading}>
            {" "}
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
