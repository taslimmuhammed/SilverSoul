import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Home from '../Comonents/Home/Home'
import { EthersContext } from '../Context/EthersContext'

function HomePage() {
  const navigate = useNavigate()
  const {currentAccount, checkIfWalletIsConnect} = useContext(EthersContext)
  const checker = async() => {
     const  s1 = await checkIfWalletIsConnect()
     console.log(s1)
     if(s1===0){
      navigate("/landing")
     }else{
     }
  }

  useEffect(() => {
   checker()
  }, [])
  return (
    <div>
      <Home></Home>
    </div>
  )
}

export default HomePage