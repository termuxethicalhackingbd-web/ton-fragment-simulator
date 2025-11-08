import React, { useState } from "react";
import "./App.css";

function App() {
  const [connected, setConnected] = useState(false);
  const [dealInfo, setDealInfo] = useState({
    name: "rakib90100.t.me",
    username: "@rakib90100",
    web: "t.me/rakib90100",
    tonweb: "rakib9010",
    dealPrice: "5000 TON",
    commission: "2%",
    deposit: "25 TON"
  });

  const [transactions] = useState([
    { user: "@dangerous", amount: "50 TON", time: "2m ago" },
    { user: "@aiwo", amount: "10 TON", time: "5m ago" },
    { user: "@tiff", amount: "20 TON", time: "10m ago" },
    { user: "@trial", amount: "75 TON", time: "15m ago" },
  ]);

  const handleConnect = () => setConnected(true);

  return (
    <div className="app-container" onContextMenu={(e) => e.preventDefault()}>
      <header className="header">
        <a href="https://fragment.com" target="_blank" rel="noreferrer">
          Fragment
        </a>
      </header>

      {!connected ? (
        <div className="wallet-section">
          <button className="connect-btn" onClick={handleConnect}>
            Connect Tonkeeper
          </button>
        </div>
      ) : (
        <div className="trade-container">
          <div className="deal-card">
            <input
              className="editable"
              value={dealInfo.name}
              onChange={(e) => setDealInfo({ ...dealInfo, name: e.target.value })}
            />
            <div className="info">
              <p>Username: <input className="editable" value={dealInfo.username}
                onChange={(e) => setDealInfo({ ...dealInfo, username: e.target.value })} /></p>
              <p>Web: <input className="editable" value={dealInfo.web}
                onChange={(e) => setDealInfo({ ...dealInfo, web: e.target.value })} /></p>
              <p>Ton Web 3.0: <input className="editable" value={dealInfo.tonweb}
                onChange={(e) => setDealInfo({ ...dealInfo, tonweb: e.target.value })} /></p>
              <p>Deal Price: <input className="editable" value={dealInfo.dealPrice}
                onChange={(e) => setDealInfo({ ...dealInfo, dealPrice: e.target.value })} /></p>
              <p>Commission: <input className="editable" value={dealInfo.commission}
                onChange={(e) => setDealInfo({ ...dealInfo, commission: e.target.value })} /></p>
              <p>Security Deposit: <input className="editable" value={dealInfo.deposit}
                onChange={(e) => setDealInfo({ ...dealInfo, deposit: e.target.value })} /></p>
            </div>

            <button className="start-btn">Start Exchange</button>
          </div>

          <div className="transactions">
            <h3>Latest Transactions</h3>
            <ul>
              {transactions.map((tx, i) => (
                <li key={i}>
                  <span>{tx.user}</span>
                  <span>{tx.amount}</span>
                  <span>{tx.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
