import { useState } from 'react'
import Navbar from "./Components/Navbar"
import Carousel  from './Components/Carousel'
import Banner from './Components/Banner'
import FlashSell from './Components/FlashSell'
import Product from './Components/utility/Product'
import './App.css'

function App() {


  return (
    <>
      <div>
       <Navbar/>
       <Carousel/>
       <Banner/>
       <FlashSell/>
       <Product/>
      </div>
      
    </>
  )
}

export default App
