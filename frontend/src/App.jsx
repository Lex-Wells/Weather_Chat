import Nav from "./components/Nav"
import React, { useState } from "react"
import Weather from "./components/Weather"
import { useLocation } from 'react-router-dom'
import {Route, Routes, } from 'react-router-dom'
import Posts from "./components/Posts"
import ShareBar from "./components/ShareBar"
import Home from "../pages/Home"
import MainPage from "../pages/MainPage"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"




const App = () => {
  const location = useLocation();
  return (
<div> 
  <ToastContainer/>
<Routes location={location} key={location.pathname}>
   
    <Route index={true}path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    
    <Route path="/register" element={<SignUp/>}/>
    <Route path='/main'element={<MainPage/>} />
   
  </Routes>
</div>
  )
}

export default App
