import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import "./SingleBook.css"

const SingleBook = () => {
  return (
    <div>
       <div className="body">
    <div className="content1">
      <div className="Card1">
      <Card className="cardbox">
        <h4 className="title"></h4>
        <CardMedia
          className="CardMedia"
          sx={{ width: "100%", objectFit: "contain" }}
          height="240px"
          image=""
          component="img"
          title="green iguana"
        />
          <h3 className="price">₹</h3>
        <CardContent>
          <Typography
            className="discription"
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
           
          </Typography>
        </CardContent>

        <div className="btns">
          <Button onClick={''} className="mblgtn" variant="contained" size="small">
            go back
          </Button>
        </div>
      </Card>
      </div>
      <div className="card">
        <div className="imageDiv">
          <img src={''} alt="" />
        </div>
        <div className="pera">
          <h1></h1>
          <div>
            <h2>₹</h2>
            <h5></h5>
            <p></p>
            <button onClick={''}>go back </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default SingleBook
