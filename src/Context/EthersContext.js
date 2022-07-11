  import { ethers } from "ethers";
  import { createContext, useState, useEffect } from "react";
  import { abi } from "../Utils/abi";
  import { main } from "../Utils/USDtabi";
  import { English } from "../Comonents/Languages/English";
  import axios from "axios";


  export const EthersContext = createContext(null);
  const {ethereum} = window
  export default function Ethers({children}){
    const [GamerD, setGamerD] = useState()
    
    const contractAddress = "0xB337D0170472b5391c88Fef882381807c986023b"
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress ,abi ,signer)

      const [currentAccount, setCurrentAccount] = useState(null);
      const [GMID, setGMID] = useState()
      const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts.length) {
            setCurrentAccount(accounts[0]); 
            return 1;
          } else {
            alert("No accounts found");
            return 0;
          }
        } catch (error) {
          console.log(error);
          return 0;
        }
      };

      const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
          setCurrentAccount(accounts[0]);
          window.location.reload();
        } catch (error) {
          console.log(error);
          throw new Error("No ethereum object");   
        }
      };



      const mintTokens= async()=>{
          try{
            // let amount = ethers.utils.parseEther(GamerD["kills"])
            // console.log(amount)
            let amount = parseInt(GamerD["kills"])
            console.log(amount,GamerD["meta-data"]["parameters"]["gamertag"])
            // amount *= 1000000000
            // console.log(amount)
            amount = amount+""
            amount = ethers.utils.parseUnits(amount,9)
            console.log(amount)
            const transfer = await contract.getKlRwd(amount,127,GamerD["meta-data"]["parameters"]["gamertag"])
            // await transfer.wait()
            alert("The tokens has bee minted to your wallet")
             return true
          }catch(e){
        //alert(e.data.message)
        console.log(e)
        return false
          }
        }


        const getBalance= async()=>{
          try{
            const balance = await contract.getMyBalance()
            let dec = parseInt(balance._hex, 16)
            return dec
          }catch(e){
            console.log(e)
          }
        }
    const getUserData = async(gamerId)=>{
      try{
        const res = await axios.get(`https://dazzling-death-valley-56302.herokuapp.com/${gamerId}`)
        console.log(res.data)
        setGamerD(res.data)
        return true
      }catch(e){
        return false
      }

    }




        const getN = async()=>{
          const chainId = 137 // Polygon Mainnet

          if (window.ethereum.networkVersion !== chainId) {
                try {
                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: "0x89" }]
                  });
                } catch (err) {
                    // This error code indicates that the chain has not been added to MetaMask
                  if (err.code === 4902) {
                    await window.ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: [
                        {
                          chainName: 'Polygon Mainnet',
                          chainId: "0x89" ,
                          nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                          rpcUrls: ['https://polygon-rpc.com/']
                        }
                      ]
                    });
                  }
                }
              }
          
        }

      useEffect(() => {
        checkIfWalletIsConnect();
        // changeNetwork()
      // getN()
      }, []);

      


      return(
          <EthersContext.Provider value={{connectWallet, currentAccount, checkIfWalletIsConnect,getUserData,getBalance,mintTokens,GamerD}}>
            {children}
          </EthersContext.Provider>
      )
  }


  // chnageOwner(address _newOwner)
  // signIn(address _friend,bool _active) 
  // enterGame(uint256 x)
  // buyUnitToken()
  // getUsdtBalance()
  // withdrawBalanceUsdt()
  // unitBalance(address)
  // usdtBalance(address)
  // active(address)
  // 