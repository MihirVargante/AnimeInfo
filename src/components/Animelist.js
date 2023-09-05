import React from 'react'
import ReactStars from 'react-stars'
import {Link} from 'react-router-dom'
const Animelist = ({anime}) => {
  return (
    <>
    {
        anime ?(
            anime.map((animes,index)=>{
                let rate=(animes.score)/2
                return(
                    <Link to={`/detail/${animes.title}`}><div key={index} className="card  text-sm justify-around overflow-none font-bold shadow-lg p-2 hover:translate-y-2 cursor-pointer mt-4">
                        <img className="h-60 md:h-72" src={animes.images.jpg.image_url} alt="anime image"/>
                        <h1><span className="text-gray-500">Name: </span>{animes.title}</h1>
                        <h1 className="flex items-center"><span className="text-gray-500 mr-1">Rating :</span>
                        
                        <ReactStars
                            size={20}
                            half={true}
                            edit={false}
                            value={rate}/>
                        </h1>
                        <h1><span className="text-gray-500">Episodes </span>:{animes.episodes}</h1>
                    </div></Link>
                )
            })
        ):"Not Found"
    }
    </>
  )
}

export default Animelist
