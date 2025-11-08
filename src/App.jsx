import React, { useState } from "react";
import { TonConnectUI } from "@tonconnect/ui-react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(5); // Default TON amount
  const [commission, setCommission] = useState(10); // Default commission %
  const [receiver, setReceiver] = useState("UQCDFoAkxjfFc8pCVwNY5Lrn2kZAG8fbCK8NhsoR_7VE9DtA");
  const [connected, setConnected] = useState(false);

  const tonConnectUI = new TonConnectUI({
    manifestUrl: "https://ton-fragment-simulator.vercel.app/tonconnect-manifest.json"
  });

  const handleConnect = async () => {
    try {
      await tonConnectUI.connectWallet();
      setConnected(true);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const handleDisconnect = async () => {
    await tonConnectUI.disconnect();
    setConnected(false);
  };

  const handlePay = async () => {
    const finalAmount = amount - (amount * commission) / 100;
    alert(
      `💸 Payment Summary:
Amount: ${amount} TON
Commission: ${commission}%
You will receive: ${finalAmount.toFixed(3)} TON`
    );
  };

  return (
    <div className="app">
      <h1>💎 TON Fragment Simulator</h1>

      <div className="card">
        <p>Receiver Address:</p>
        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />

        <p>Enter Amount (TON):</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />

        <p>Commission (%):</p>
        <input
          type="number"
          value={commission}
          onChange={(e) => setCommission(parseFloat(e.target.value))}
        />

        {!connected ? (
          <button onClick={handleConnect} className="btn connect">
            🔗 Connect Wallet
          </button>
        ) : (
          <button onClick={handleDisconnect} className="btn disconnect">
            ❌ Disconnect Wallet
          </button>
        )}

        <button onClick={handlePay} className="btn pay">
          💰 Simulate Payment
        </button>
      </div>

      <footer>
        <p>Built for TON Fragment Simulation 🔹</p>
      </footer>
    </div>
  );
}

export default App;
