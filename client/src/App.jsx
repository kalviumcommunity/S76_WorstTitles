import React from 'react'
import LandingPage from './components/LandingPage'
import { Routes, Route,BrowserRouter } from 'react-router-dom'
import WorstTitle from './components/TittleCaed'
import AddMovieTitle from './components/Titleform'
import UpdateMovieTitle from './components/UpdateMovieTitle'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tittle-card" element={<WorstTitle/>} />
        <Route path="/add-title" element={<AddMovieTitle />} />
        <Route path = "/update-title/:id" element = {<UpdateMovieTitle/>}/>
      </Routes>  
      </BrowserRouter>
    </>
  )
}

export default App