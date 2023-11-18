import React from 'react'
import { useSelector } from 'react-redux'


const  Weather = () => {
  const weather = useSelector((state)=> state.weather.value)
  return (
   
    <div className='grid-rows-1 w-full'>
      <div className=''>
          <p className='flex justify-center'>{weather.name}</p>
      </div>

      <div className=''>
          <p className='flex justify-center text-6xl'>{weather.temp}</p>
      </div>
    
      <div>
          <p className='flex justify-center  text-s'>Feels like {weather.feels_like}</p>
      </div>
    </div>
  
  )
}

export default Weather