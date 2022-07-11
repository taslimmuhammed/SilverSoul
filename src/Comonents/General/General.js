import React,{useState, useEffect, useContext} from 'react'
import './General.css'
import {EthersContext} from '../../Context/EthersContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loading/Loading'
function General() {
  const navigate = useNavigate()
  const {getBalance,mintTokens,GamerD, currentAccount} = useContext(EthersContext)
   const [Balance, setBalance] = useState(0)
   const [isLoading, setisLoading] = useState(false)
const initiaor= async()=>{
    if(GamerD===null) navigate('/')
 else {setisLoading(true)
  try{
   const balance = await getBalance()
   setBalance(balance/1000/1000/1000)
  }catch(e){
      console.log(e)
  }
  setisLoading(false)}
}

const handleClick  =async()=>{
  setisLoading(true)
  let x = await mintTokens()
  setisLoading(false)
  if(x) navigate('/')
}
useEffect(() => {
  initiaor()
  if(!GamerD) navigate("/")
}, [])
  return (
  isLoading?<Loader/>:GamerD?<div className='p_main'>
  <div className='Wallet'>
      <div className='wallet_head'>Wallet Address</div>
      <div className='wallet_address'>{currentAccount}</div>
  </div>

  <div className='p_bottom'>

      <div className='sub_head'>Gamer Id</div>
      <div className='sub_sub'>{GamerD["meta-data"]["parameters"]["gamertag"]}</div> 

      <div className='sub_head'>Total Kills</div>
          <div className='sub_sub'>{GamerD["kills"]}</div>
      <div className='sub_head'>Current Balance</div>
      <div className='sub_sub'>{Balance}</div>
      <div className='p_buttons' >
          <button className="button-9" role="button" onClick={handleClick} >Claim Reward</button>
          </div>
     
  </div>

</div>: <div/>
  )
    
}

export default General