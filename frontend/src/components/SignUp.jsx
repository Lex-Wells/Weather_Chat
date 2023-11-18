import React from 'react'
import { useState,useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { toast } from 'react-toastify' 
import { useRegisterMutation } from '../features/weatherActions/userApiSlice'
import { setCredentials } from '../features/weatherActions/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../pics/logo.png"

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()  

  const {userInfo} = useSelector((state)=>state.auth)

  const [register]  = useRegisterMutation()
  const [email,setEmail] = useState("")
  const [firstname,setFirstName] = useState("")
  const [lastname,setLastName] = useState("")
  const [password,setPassword] = useState("")

  useEffect(()=>{ 
    if(userInfo){
      navigate('/main')} 
  },[navigate,userInfo])

  const submitHandler = async(e)=>{
      e.preventDefault()
      if(!password){
        toast.error("Please add a password")
      }
      if(!email){
        toast.error("Please add your email")
      }
       if(!firstname){
        toast.error("Please add your first name")
      }
      if(!lastname){
        toast.error("Please add your last name")
      }else{
        try {
            const res = await register({firstname,lastname,email,password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate("/main")
          } catch (err) {
           toast.error(err?.data?.message || err.error);
          }
      }
  }
  return (
    <section className="bg-darkest h-screen items-center flex justify-center">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
    <div className='items-center flex justify-center'>
           <img className='h-10 w-10 cursor-pointer 'onClick={()=>{navigate("/")}}  src={logo}></img>
      </div>
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Sign Up
        </a>
        <div className="w-full bg-dark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Register for your new account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="firstName" className="block m-0 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                        <input value={firstname} onChange={(e)=>{setFirstName(e.target.value)}} type="text" name="firstName" id="firstName" placeholder='Jon' className='block w-full bg-dark'/>                    
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block m-0 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                        <input value={lastname} onChange={(e)=>{setLastName(e.target.value)}} type="text" name="lastName" id="lastName" placeholder='Doe' className='block w-full bg-dark'/>                    
                    </div>
                    <div>
                        <label htmlFor="email" className="block m-0 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="email" placeholder='myemail@weather.com' className='block w-full bg-dark'/>                    
                    </div>
                    <div>
                    <label  htmlFor="password" className="block m-0 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  type="password" name="password" id="password" placeholder="••••••••"  className='block w-full bg-dark'/>
                  </div>
                   
                    <button type="submit"  className="w-full text-white bg-darker hover:bg-darkest focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={submitHandler}>Sign Up</button>
                    
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}

export default SignUp