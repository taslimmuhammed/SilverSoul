import './App.css';
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import React, {useState, useContext} from "react"
import { EthersContext } from './Context/EthersContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import LandingPage from './Pages/LandingPage';
import GeneralPage from './Pages/GeneralPage';

function App() {
  const {Lang, setLang} = useContext(EthersContext)
  return (
    <div className="main-screen">
     {/* <div className='l_head'>Global Community Union</div>
     <button class="button-85" role="button" onClick={()=>{setLang(!Lang)}}>{Lang?"中文":"Eng" }</button> */}
      {/* <div className='l_liner'></div> */}
      <Router>
        <Routes>
          <Route path='/' exact element={<HomePage/>}></Route>
          <Route path='/landing' exact element={<LandingPage/>}></Route>
          <Route path='/claim' exact element={<GeneralPage/>}></Route>
          {/* <Route path='/admin' exact element={<Admin/>}></Route>    */}
        </Routes>
      </Router>
      {/* <div className='l_Bottom margin'>&#169;Global Community Union</div> */}
      
    </div>
  );
}

export default App;
