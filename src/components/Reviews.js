import React, { useContext, useEffect } from 'react'
import ReactStars from 'react-stars'
import {useState} from 'react'
import {reviewsRef} from '../Firebase/Firebase'
import {addDoc,query,where, getDocs} from 'firebase/firestore'
import {TailSpin, ThreeDots} from 'react-loader-spinner'
import swal from 'sweetalert'
import { Appstate } from '../App'
import { useNavigate } from 'react-router'
const Reviews = ({id}) => {
    const navigate=useNavigate()
    const useAppstate=useContext(Appstate)
    const [rate,setRate]=useState(0)
    const[loading,setLoading]=useState(false)
    const [form,setForm]=useState('')
    const [reviewsLoading,setReviewsloading]=useState(false)
    const [data,setData]=useState([])
    const [newAdded,setNewadded]=useState(0)
    const sendReview=async()=>{
        setLoading(true)
        try{
            if(useAppstate.login){

                await addDoc(reviewsRef,{
                    animeid:id,
                    name:useAppstate.username,
                    rating:rate,
                    thought:form,
                    timestamp:new Date().getTime()
                })
                
                setForm('')
                setRate(0)
                setNewadded(newAdded+1)
                swal({
                    title:"Review Sent",
                    icon:"success",
                    buttons:"false",
                    timer:3000
                })
            }
            else{
                navigate('/login')
            }
        }catch(err){
            swal({
                title:err.message,
                icon:"success",
                buttons:"false",
                timer:3000
            })         
        }
        setLoading(false)
    }
    useEffect(()=>{
        async function getData(){
            setReviewsloading(true)
            let quer=query(reviewsRef,where('animeid','==',id))
            const querySnapshot=await getDocs(quer)
            setData([])
            querySnapshot.forEach((doc)=>{
                setData((prev)=>[...prev,doc.data()])
            })
            setReviewsloading(false)
        }
        getData()
    },[newAdded])
  return (
    <div className="mt-4 w-full border-t-2 border-gray-700">
        <ReactStars
          size={30}
          half={true}
          edit={true}
          value={rate}
          onChange={(val)=>setRate(val)}/>
      <input
      value={form}
      onChange={(e)=>setForm(e.target.value)}
      type="text"
      placeholder="Share your view"
      className="w-full review p-2"/>
      <button onClick={sendReview} className="bg-green-600 w-full p-2 flex justify-center mt-1">
          {loading? <TailSpin height={20} color="white"/>:'Share'}
      </button>
      {reviewsLoading?<div className="mt-6 flex justify-center"><ThreeDots height={15}/></div>:
        <div className="mt-4">
            {
                data.map((e,i)=>{
                    return(
                        <div className="bg-gray-900 w-full p-2 mt-2" key={i}>
                            <div className="text-blue-400 flex">
                                <p>{e.name}</p>
                                <p className="text-white ml-2 text-xs">({new Date(e.timestamp).toLocaleString()})</p>
                            </div>
                            <ReactStars
                                size={15}
                                half={true}
                                value={e.rating}
                                />
                            <p>{e.thought}</p>
                        </div>
                    )
                })
            }
        </div>      
      }
    </div>
  )
}

export default Reviews
