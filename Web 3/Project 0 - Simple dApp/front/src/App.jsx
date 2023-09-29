import { useEffect, useState } from 'react';
import {ethers, BrowserProvider} from 'ethers';
import './App.css';

const ethereum = window.ethereum;
const provider = new ethers.BrowserProvider(window.ethereum);
const abi = `[
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [],
      "name": "contador",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "dec",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "inc",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
]`;

const contractAddress = "0xbb6f0eE7cA2C4868542765edAd7140962e76aa36";

function App() {
  const [address, setAddress] = useState(null);
  const [contador, setContador] = useState(null);
  const [tx, setTx] = useState(null);

  useEffect(() => {
    ethereum.request({
      method: "eth_requestAccounts",
    }).then(addresses => {
          setAddress(addresses[0]);
    });
    ethereum.on("accountsChanged", (addresses) => {
      setAddress(addresses[0])
    });
  }, []);

  useEffect(() => {
    const contract = new ethers.Contract(contractAddress, abi, provider);
    contract.contador().then(res => {
      setContador(res.toString());
    })
  }, []);

  //Mismo useEffect de otra manera:
  // useEffect(() => {
  //   async function f1(){
  //     const contract = new ethers.Contract(contractAddress, abi, provider);
  //     setContador((await contract.contador()).toString());
  //   }
  //   f1();
  // }, []);

  async function operations(value) {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = value == 1 ? await contract.inc() : await contract.dec();
    const receipt = await tx.wait();
    setTx(JSON.stringify({tx, receipt}), null, 4);
    const currentValue = await contract.contador();
    setContador(currentValue.toString());
  }

  return (
    <>
      <h2>Connected account: {address}</h2>
      <p>Counter: {contador}</p>
      {/* <pre>{tx}</pre> */}
      <button onClick={() => operations(1)}>Increase</button>
      <button onClick={() => operations(-1)}>Decrease</button>
    </>
  );
}

export default App;
