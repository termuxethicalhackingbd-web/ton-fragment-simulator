import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import { useState } from "react";

export default function App() {
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();
  const [connected, setConnected] = useState(false);
  const [amount, setAmount] = useState("");
  const [commission, setCommission] = useState("0.02");
  const [status, setStatus] = useState("");

  const handleConnect = async () => {
    await tonConnectUI.connectWallet();
    setConnected(true);
  };

  const handleSend = async () => {
    if (!amount) return alert("Enter TON amount!");
    const total = parseFloat(amount) + parseFloat(commission);

    setStatus("Processing...");
    setTimeout(() => {
      setStatus(`✅ Transaction Successful! Sent ${total} TON (Including ${commission} TON fee)`);
    }, 2500);
  };

  return (
    <div
      style={{
        background: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
        textAlign: "center",
        paddingTop: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ color: "#00bfff" }}>💎 TON Fragment Simulator</h1>

      {!connected ? (
        <button
          onClick={handleConnect}
          style={{
            background: "#007bff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          Connect Tonkeeper
        </button>
      ) : (
        <div style={{ marginTop: "30px" }}>
          <p>Connected Wallet:</p>
          <p style={{ color: "#00ff88" }}>{userAddress || "Loading..."}</p>

          <div style={{ marginTop: "20px" }}>
            <label>Enter TON Amount:</label>
            <br />
            <input
              type="number"
              placeholder="e.g. 1.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #444",
                marginTop: "5px",
                width: "180px",
                textAlign: "center",
              }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <p>💰 Commission: {commission} TON</p>
            <p>Total: {amount ? parseFloat(amount) + parseFloat(commission) : "0"} TON</p>
          </div>

          <button
            onClick={handleSend}
            style={{
              background: "#00b894",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "16px",
              marginTop: "20px",
            }}
          >
            Start Exchange
          </button>

          <p style={{ marginTop: "20px", color: "#bbb" }}>{status}</p>
        </div>
      )}
    </div>
  );
          }
