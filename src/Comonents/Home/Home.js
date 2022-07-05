import React,{useState, useEffect, useContext} from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import {EthersContext} from '../../Context/EthersContext'
import Loader from '../Loading/Loading'
import axios from 'axios'
function Home() {
  const [GamerID, setGamerID] = useState()
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate()
  const {getUserData} = useContext(EthersContext)
  const handleSubmit= async()=>{
    setisLoading(true)
    const x = await getUserData(GamerID)
    setisLoading(false)
    if(x){navigate('/claim')}
    else alert("Sorry something went wrong , please fill in your correct gaming Id")
  }
  return (
    <div>
      {
        isLoading?  <Loader/>:
         
        <div>

         <div className='h_head'>Enter your Gaming Id </div>
         
        <div className='h_box'>
          <input className='h_btn bg-transparent px-1'
           placeholder='Gaming ID' 
           onChange={(e)=>{
             setGamerID(e.target.value)
           }}></input>
          <div className='h_btn text-lg' onClick={handleSubmit}>Get Kills</div>
        </div>
      </div>
        
      }
     
</div>
  )
}

export default Home