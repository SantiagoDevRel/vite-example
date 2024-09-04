import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { MissingCustomChainError, Web3 } from "web3";
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";
import ABI from "./abi.mjs";
import { MetamaskPlugin } from "web3-metamask-plugin";

function App() {
  const [count, setCount] = useState(0);
  const web3 = new Web3(window.ethereum); // Any RPC node you wanted to connect with
  web3.registerPlugin(new SwisstronikPlugin());
  web3.registerPlugin(new MetamaskPlugin());

  async function callAngie() {
    const ERC20_CONTRACT_ADDRESS = "0x2e79CC77048e48C85ccc14959A8b6963ADcF5376";
    const contract = new web3.eth.Contract(ABI, ERC20_CONTRACT_ADDRESS);
    const name = await contract.methods.name().call();
    setCount(name);
  }

  async function connectToSwisstronik() {
    await web3.metamask.switchToSepolia();
  }

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={callAngie}>call</button>
        <button onClick={connectToSwisstronik}>connect to</button>
        <p>{count}</p>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
