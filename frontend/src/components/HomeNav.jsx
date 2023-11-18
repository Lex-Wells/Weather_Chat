import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../pics/logo.png"
import Lottie from 'lottie-react'
import relax from "../lottie/relax.json"
import { useSelector} from "react-redux"

const HomeNav = () => {
  const {userInfo} = useSelector((state)=>state.auth)

  return (
 
  <section className="bg-darkest text-gray-100">
    <header className="p-4 dark:bg-gray-800 dark:text-gray-100 items-center">
	<div className="container flex justify-between h-16 mx-auto">
		<a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
    <img src={logo} alt="logo"  className='m-0 h-10 w-10 cursor-pointer flex items-center' />
		</a>
    
		{!userInfo?<div className="items-center flex-shrink-0  lg:flex items-center flex justify-center ">
			<button className="bg-darker self-center px-8 py-3 mr-2 font-semibold rounded border-black">
      <Link to={"/register"}> Sign Up</Link> 
        </button>
			<button className="bg-darker self-center px-8 py-3  font-semibold rounded border-black">
      <Link to={"/login"}>Login</Link> 
        </button>
		</div>:
    <div className="items-center flex justify-center">
		<Link  to={"/main"}>Start sharing now, {userInfo.firstname}</Link>
</div>}
	</div>
</header>
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
      <div>
        <Lottie animationData={relax}/>
      </div>
    </div>
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			{!userInfo?<h1 className="text-5xl font-bold leadi sm:text-6xl">Join The Weather App
			</h1>:
      <h1 className="text-5xl font-bold leadi sm:text-6xl">Wonder What The Weather Is Like?
			</h1>}
			{!userInfo?<p className="mt-6 mb-8 text-lg sm:mb-12">Check The Weather & Share Your Opinions
			</p>:
      <><br></br></>}
			{!userInfo?<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<Link to={"/login"} rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded">Login</Link>
				<Link rel="noopener noreferrer" to={'/register'}className="px-8 py-3 text-lg font-semibold border rounded">Sign Up</Link>
			</div>:
    
      <Link to={"/main"} rel="noopener noreferrer" className=" text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Check Now & Share</Link>
 
      }
		</div>
	</div>
</section>
  )
}

export default HomeNav