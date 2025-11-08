import React from "react";
import { connectWallet, disconnectWallet } from "../tonconnect";

function App() {
  return (
    <div className="app">
      <h1>TON Fragment Simulator</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={disconnectWallet}>Disconnect</button>
    </div>
  );
}

export default App;
