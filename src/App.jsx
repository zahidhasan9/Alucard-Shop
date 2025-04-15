import { useState } from 'react'
import Navbar from "./Components/Navbar"
import Carousel  from './Components/Carousel'
import Banner from './Components/Banner'
import './App.css'

function App() {


  return (
    <>
      <div>
       <Navbar/>
       <Carousel/>
       <Banner/>
      </div>
      
    </>
  )
}

export default App
