import React from 'react'
import LandingPage from './components/LandingPage'
import { Routes, Route,BrowserRouter } from 'react-router-dom'
import WorstTitle from './components/TittleCaed'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tittle-card" element={<WorstTitle/>} />
      </Routes>  
      </BrowserRouter>
    </>
  )
}

export default App