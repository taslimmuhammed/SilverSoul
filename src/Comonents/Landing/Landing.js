import React, { useState, useEffect, useContext } from 'react'
import './Landing.css'
import { useNavigate } from 'react-router-dom'
import { EthersContext } from '../../Context/EthersContext'

// const lib = require('lib')({token: "tok_dev_WvE9jTtk6RcuyMgXTVD3ePYvrNLeArTvgaXc3rnR946oRyLTZZoY1gJhgeg3zwTu"});
function Landing() {
  const navigate = useNavigate()
  const {connectWallet,currentAccount,Language,checkIfWalletIsConnect} = useContext(EthersContext)
  const checker = async() => {
    const  s1 = await checkIfWalletIsConnect()
    console.log(s1)
    if(s1===0){
    }else{
     navigate('/')
    }
 }
  useEffect(() => {
   checker()
  }, [currentAccount])
  return (
    <div className='text-white landing_main'>
      <div className='l_welcome'>Welcome,</div>
      
      <div className='l_bottom'>
        <div className='connect_btn' onClick={async ()=>{
        await connectWallet()
        navigate('/')
        }}>Connect Wallet</div>
      </div>
    </div>
  )
}

export default Landing