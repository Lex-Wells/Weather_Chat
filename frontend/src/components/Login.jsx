import React from 'react'
import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {useLoginMutation} from "../features/weatherActions/userApiSlice"
import { setCredentials } from '../features/weatherActions/authSlice'
import logo from "../pics/logo.png"
import { toast } from 'react-toastify' 

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
    const navigate = useNavigate()
    const dispatch = useDispatch()     

    const [login,{isLoading, error}] = useLoginMutation() 

    const {userInfo} = useSelector((state)=>state.auth)
    
    useEffect(()=>{ 
      if(userInfo){ 
        navigate('/main')} 
    },[navigate,userInfo])

    const submitHandler = async(e)=>{
        e.preventDefault()
       try {
         const res = await login({email,password}).unwrap()
         dispatch(setCredentials({...res}))
         navigate("/main")
       } catch (err) {
        toast.error(err?.data?.message || err.error);
       }
    
    }
  return (
    <section className="bg-darkest h-screen items-center flex justify-center">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-full">
    <div className='items-center flex justify-center'>
           <img className='h-10 w-10 cursor-pointer 'onClick={()=>{navigate("/")}}  src={logo}></img>
      </div>
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Login
        </a>
        <div className="w-full bg-dark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="email" placeholder='myemail@weather.com' className='bg-dark block w-full '/>                    
                    </div>
                    <div>
                    <label  htmlFor="password" className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  type="password" name="password" id="password" placeholder="••••••••"  className='bg-dark block  w-full'/>
                  </div>
                   
                    <button type="submit"  className="w-full text-white  bg-darker hover:bg-darkest focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Sign in</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>


  )
}

export default Login