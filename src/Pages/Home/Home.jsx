import React from 'react'
import { useAuth } from '../../auth/AuthContext'
import { Button } from '@mui/material'

const Home = () => {
  const {logout} = useAuth()
  return (
    <div>
      <Button variant='outlined'onClick={logout}>LOGOUT</Button>
      helloooo
    </div>
  )
}

export default Home
