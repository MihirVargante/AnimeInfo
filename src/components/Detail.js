import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import ReactStars from 'react-stars'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import Reviews from './Reviews'
const Detail = () => {
  const {id}=useParams()
  const[state,setState]=useState([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    const getData=async()=>{
      try{
        const data=await fetch(`https://api.jikan.moe/v4/anime?q=${id}&limit=1`)
        const res=await data.json();
        console.log(res)
        setState(res.data)
        setIsLoading(false);
      }catch(err){
        alert("error has occured:"+err)
      }
    }
    getData()
  },[])
  if (isLoading) {
    return <div>Loading...</div>;
  }
  let rate=(state[0].score)/2
  return (
    <>
    <div className='sticky z-10 bg-black top-0 text-3xl text-red-700 font-bold p-3 border-b-2 border-grey-100px flex justify-between'>
      <Link to={'/'}><span>Anime<span className='text-white'>Info</span></span></Link>
      <span ><input  className='search text-sm text-black font-bold w-40 px-4 mr-20 h-8 py-2 border rounded pr-10' placeholder="search here" type="text"/></span>
    </div>
    <div className="p-4 flex flex-col md:flex-row items-center md:items-start justify-center w-full mt-4">
      <img className="h-96" src={state[0].images.jpg.large_image_url} alt=""/>
      <div className="md:ml-4 ml-0 md:w-1/2 w-full">
        <h1 className="text-2xl font-bold text-gray-400">{state[0].title}: <span className="text-white text-xl">{state[0].year}</span></h1>
        <ReactStars
          size={30}
          half={true}
          edit={false}
          value={rate}/>
        <h1 className="text-2xl font-bold text-gray-400">Status: <span className="text-white text-xl">{state[0].status}</span></h1>
        <h1 className="text-2xl font-bold text-gray-400">Episodes: <span className="text-white text-xl">{state[0].episodes}</span></h1>
        <h1 className="text-2xl font-bold text-gray-400">Synopsis: </h1><p className="text-white text-xl">{state[0].synopsis}</p>
        <Reviews id={id}/>
      </div>
    </div>
    </>
  )
}

export default Detail
