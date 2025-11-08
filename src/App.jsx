import React, { useState } from "react";
import { connectWallet, disconnectWallet } from "../tonconnect";
import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  const handleConnect = async () => {
    try {
      const wallet = await connectWallet();
      if (wallet && wallet.account && wallet.account.address) {
        setWalletAddress(wallet.account.address);
      }
    } catch (error) {
      console.error("Wallet connect error:", error);
      alert("❌ Failed to connect wallet.");
    }
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    setWalletAddress(null);
  };

  return (
    <div className="container">
      <h1>TON Fragment Simulator</h1>

      {!walletAddress ? (
        <button onClick={handleConnect}>🔗 Connect Tonkeeper</button>
      ) : (
        <>
          <p>✅ Connected Wallet:</p>
          <div className="wallet-info">{walletAddress}</div>
          <button onClick={handleDisconnect} style={{ marginTop: "12px", background: "#d73a49" }}>
            🔌 Disconnect
          </button>
        </>
      )}
    </div>
  );
}

export default App;
