import React,{useState} from 'react'
import Nav from '../src/components/Nav'
import ShareBar from '../src/components/ShareBar'
import Posts from '../src/components/Posts'
import SwitchButtons from '../src/components/SwitchButtons'

const MainPage = () => {
  const [showPosts, setShowPosts] = useState("")
  console.log(showPosts);

  return (
    <div className='bg-darkest'>
        <Nav />
        <ShareBar setShowPosts={setShowPosts} />
        <SwitchButtons setShowPosts={setShowPosts} />
        <Posts/>
    </div>
  )
}

export default MainPage