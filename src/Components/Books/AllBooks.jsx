import React from 'react'
import "./AllBooks.css"
import Navbar from '../Navabar/Navbar'
import ViewBooks4AllBooks from '../viewBook/ViewBooks4AllBooks'
import Footer from '../Footer/Footer'
const AllBooks = () => {
  return (
    <div className='AllBooks'>
      <Navbar/>
      <ViewBooks4AllBooks/>
      <Footer/>
    </div>
  )
}

export default AllBooks
