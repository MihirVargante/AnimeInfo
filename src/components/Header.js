import React, { useContext } from 'react'
// import SearchIcon from '@mui/icons-material/Search';
import {useState,useEffect} from 'react'
import Animelist from './Animelist'
import {Appstate} from '../App'
import {Link} from 'react-router-dom'
const Header = () => {
  const [anime,setAnime]=useState([])
  const [search,setSearch]=useState('')
  const useAppstate=useContext(Appstate)
  const getData=async()=>{
    const data=await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`)
    const res=await data.json();
    setAnime(res.data)
  }

  useEffect(()=>{
    getData()
  },[search])
  return (
  <>  
    {
      useAppstate.login?
      <div className='sticky z-10 bg-black top-0 text-3xl text-red-700 font-bold p-3 border-b-2 border-grey-100px flex justify-between'>
      <span>Anime<span className='text-white'>Info</span></span>
        <span ><input onChange={(e)=>{setSearch(e.target.value)}} className='search text-sm text-black font-bold w-40 px-4 mr-20 h-8 py-2 border rounded pr-10' placeholder="search here" type="text"/></span>
    </div>:
    
    <div className='sticky z-10 bg-black top-0 text-3xl text-red-700 font-bold p-3 border-b-2 border-grey-100px flex justify-between'>
    <span>Anime<span className='text-white'>Info</span></span>
    <div>
      <span ><input onChange={(e)=>{setSearch(e.target.value)}} className='search text-sm text-black font-bold w-40 px-4 mr-20 h-8 py-2 border rounded pr-10' placeholder="search here" type="text"/></span>
      <Link to={'/login'}><button className="bg-red-700 text-white font-normal rounded text-sm px-5 py-2 loginBtn">Login</button></Link>
    </div>
  </div>
    
    }


    <div className="cart flex flex-wrap items-center overflow-hidden justify-between p-3 mt-2">
      <Animelist anime={anime}/>
    </div>
  </>
  )
}

export default Header
