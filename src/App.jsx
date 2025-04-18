import { useState } from 'react'
import Navbar from "./Components/Navbar"
import Carousel  from './Components/Carousel'
import Banner from './Components/Banner'
import FlashSell from './Components/FlashSell'
import './App.css'

function App() {


  return (
    <>
      <div>
       <Navbar/>
       <Carousel/>
       <Banner/>
       <FlashSell/>
      </div>
      
    </>
  )
}

export default App
