import React, {  useEffect, useState} from 'react'
import logo from "../pics/logo.png"
import axios from 'axios'
import {useSelector, useDispatch } from 'react-redux'
import {getWeather} from "../features/weatherActions/weatherSlice"
import {AiOutlineArrowDown } from 'react-icons/Ai'; 
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/weatherActions/authSlice'
import {clearPost} from "../features/weatherActions/postSlice"
import { useLogoutMutation } from '../features/weatherActions/userApiSlice'
import { useGetPostByLocationQuery} from "../features/weatherActions/postApiSlice"
import {resetWeather} from "../features/weatherActions/weatherSlice"


import Lottie from "lottie-react";
import sunny from "../lottie/sunny.json"
import clouds from "../lottie/clouds.json"
import rain from "../lottie/rain.json"
import { motion } from "framer-motion"
import daytime from "../lottie/daytime.json"
const Nav = () => {
const dispatch = useDispatch() 
const navigate = useNavigate()


const [city,setCity] = useState("")
const [latitude, setLatitude] = useState("")
const [longitude, setLongitude] = useState("")
const [time,setTime]= useState("")
const [weatherData, setWeatherData] = useState("")
const [currentWeather, setCurrentWeather] = useState("")
const {userInfo} = useSelector((state)=>state.auth)
const [logoutApi]= useLogoutMutation()


const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a09bd1dcd810cd062e46653adebf9b0a&units=imperial`


const handleSearch = (e) => {
  e.preventDefault();
  axios.get(apiUrl).then((res) => {
    let weatherInfo = res.data;
    setWeatherData(weatherInfo);
    setLatitude(weatherInfo.coord.lat);
    setLongitude(weatherInfo.coord.lon);
    setCurrentWeather(weatherInfo.weather[0].main)

    getCurrentTimeByCoordinates(weatherInfo.coord.lat, weatherInfo.coord.lon);

    dispatch(
      getWeather({
        city: weatherInfo.name,
        temp: weatherInfo.main.temp,
        feels_like: weatherInfo.main.feels_like,
        weather: weatherInfo.weather[0].main
      })
    );
  });


  setCity("");
};



async function getCurrentTimeByCoordinates(latitude, longitude) {
  try {
    const response = await axios.get(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=XQ6719LR54HL&format=json&by=position&lat=${latitude}&lng=${longitude}`
    );
   
    let time = response.data.formatted.split(" ")[1]
    const timeParts = time.split(":");
  let hours = parseInt(timeParts[0], 10);
  const minutes = timeParts[1];
  

  let ampm = "AM";
    if (hours >= 12) {
    ampm = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }

  if (hours === 0) {
    hours = 12;
  }

  const formattedTime = `${hours}:${minutes} ${ampm}`;
  setTime(formattedTime);


  } catch (error) {
    console.error('Error fetching current time:', error);
    return null;
  }

}


const logOut = async()=>{
  
  try {
   await logoutApi().unwrap()
    dispatch(logout())
    dispatch(clearPost())
    dispatch(resetWeather())
    navigate("/")

  } catch (error) {
    console.log(error);
  }
}






  return (
<div className='m-0 p-10 '>
  <div className='h-full w-full '>
    <div className='flex justify-center w-max-w-lg p-3 items-center  overflow-hidden rounded-lg shadow-md bg-light justify-between'>
         <img className='h-10 w-10 cursor-pointer bg-light'onClick={()=>{navigate("/")}}  src={logo}></img>
<form className="bg-light"onSubmit={handleSearch}>
        <div className='flex p-4 space-x-4 rounded-lg w-full justify-between items-center bg-light '>
              <input value={city} onChange={(e)=>setCity(e.target.value)} className='bg-light w-4/5 border-none bg-transparent text-lg focus:outline-none'  placeholder='City'/>
              <button type='submit' className='cursor-pointer w-20 bg-light'><b className='bg-light'>Search</b></button>
        </div>
  </form>
          <div className='flex justify-center items-center p-1 gap-1 bg-light'>
            <p className='text-center bg-light'>Hi, <b>{userInfo.firstname}</b>!</p>
            <p onClick={logOut} className='text-center bg-light text-lightgray cursor-pointer hover:text-darktext'>Log Out</p>
          </div>
    </div>
    



    {weatherData?<div className='grid-rows-1 w-full my-5 '>

    <motion.div 
       initial={{ opacity:0 }}
       animate={{ opacity:1 }}
       transition={{ duration: 1, delay: 0.6 }}
    className='w-full flex justify-center items-center  mt-10'>
     {
      
       weatherData.weather[0].main == 'Clear'?<div className=' h-20 w-20 flex justify-between items-center'>
        <Lottie  animationData={sunny}/>
      </div>: <></>}
     {weatherData.weather[0].main  == 'Clouds'?<div className='h-20 w-20 flex justify-between items-center'>
      <Lottie  animationData={clouds}/>
    </div>: <></> }
    {weatherData.weather[0].main  == 'Rain'  ?<div className='h-20 w-20 flex justify-between items-center'>
    <Lottie  animationData={rain}/>
  </div>: <></>}
    {weatherData.weather[0].main  == 'Thunderstorm'  ?<div className='h-20 w-20 flex justify-between items-center'>
    <Lottie  animationData={rain}/>
  </div>: <></>}
      
    </motion.div>
  <motion.div 
   initial={{ opacity:0 }}
   animate={{ opacity:1 }}
   transition={{ duration: 1, delay: 0.6 }}
  className=''>
      <div className=''>
          <p className='flex justify-center  text-2xl'>{weatherData.name}</p>
      </div>

      <div className=''>
          <p className='flex justify-center text-6xl'>{weatherData.main.temp}</p>
       
      </div>
    
      <div>
          <p className='flex justify-center  text-s'>Feels like {weatherData.main.feels_like}</p>
      </div>

      <div>
          <p className='flex justify-center  text-s'> {time}</p>
      </div>
 </motion.div>
    </div> :
    <div className='grid-rows-1 w-full my-5' >
<div className='w-full flex justify-center items-center '>
  <div className='h-1/4 w-1/4 flex justify-between items-center'>
    <Lottie  animationData={daytime}/>
  </div>
   <div className='flex justify-center text-2xl' >
                  <p>Let's Check The Weather</p>
            </div>
</div>            
    </div>
    }
  </div>
</div>  
  )
}

export default Nav 