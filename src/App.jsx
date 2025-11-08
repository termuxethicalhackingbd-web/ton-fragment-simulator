import React, { useEffect, useState } from "react";
import tonConnectUI from "./tonconnect";

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState(5000); // default deal price
  const [commissionPct, setCommissionPct] = useState(1); // commission %
  const [deposit, setDeposit] = useState(300); // security deposit TON
  const [statusMsg, setStatusMsg] = useState("");
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    // seed demo txs
    setTxs([
      { id: 1, username: "@dangerous", amount: 120, status: "Completed", time: "2h ago" },
      { id: 2, username: "@aiwo", amount: 50, status: "Pending", time: "5m ago" },
      { id: 3, username: "@tiff", amount: 230, status: "Completed", time: "1d ago" }
    ]);
  }, []);

  async function handleConnect() {
    try {
      await tonConnectUI.connectWallet();
      const w = tonConnectUI.wallet;
      setWallet(w?.account ?? null);
    } catch (e) {
      console.error(e);
      alert("Connection cancelled or failed.");
    }
  }

  async function handleDisconnect() {
    try {
      await tonConnectUI.disconnect();
      setWallet(null);
    } catch (e) {
      console.error(e);
    }
  }

  function startExchangeSimulation() {
    if (!wallet) return alert("Please connect wallet first.");
    // simulate preparing
    setStatusMsg("Preparing transaction...");
    // add demo pending tx
    const newTx = {
      id: Date.now(),
      username: wallet?.address ? `@${wallet.address.slice(2,9)}` : "@buyer",
      amount,
      status: "Pending",
      time: "just now"
    };
    setTxs(prev => [newTx, ...prev].slice(0, 20));
    // simulate confirmed after 6s
    setTimeout(() => {
      setTxs(prev => prev.map(t => t.id === newTx.id ? {...t, status: "Completed", time: "just now"} : t));
      setStatusMsg("Transaction completed ✅");
      setTimeout(()=>setStatusMsg(""),2000);
    }, 6000);
  }

  return (
    <div className="page">
      <header className="topbar">
        <a href="https://fragment.com" target="_blank" rel="noreferrer" className="brand">Fragment</a>
        <div className="right">
          {wallet ? (
            <>
              <span className="addr">{wallet.address?.slice(0,8)}...{wallet.address?.slice(-6)}</span>
              <button className="btn disconnect" onClick={handleDisconnect}>Disconnect</button>
            </>
          ) : (
            <button className="btn connect" onClick={handleConnect}>Connect Tonkeeper</button>
          )}
        </div>
      </header>

      <main className="main">
        <section className="card">
          <div className="card-row">
            <div>
              <div className="muted">Top name</div>
              <input className="field" value={"rakib90100.t.me"} readOnly />
            </div>
            <div>
              <div className="muted">Deal Price (TON)</div>
              <input className="field" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} />
            </div>
          </div>

          <div className="card-row">
            <div>
              <div className="muted">Commission (%)</div>
              <input className="field" value={commissionPct} onChange={(e)=>setCommissionPct(Number(e.target.value))} />
            </div>
            <div>
              <div className="muted">Security Deposit (TON)</div>
              <input className="field" value={deposit} onChange={(e)=>setDeposit(Number(e.target.value))} />
            </div>
          </div>

          <div className="actions">
            <button className="btn primary" onClick={startExchangeSimulation}>Start Exchange</button>
          </div>

          <div className="status">{statusMsg}</div>
        </section>

        <aside className="txs">
          <h3>Latest Transactions</h3>
          <ul>
            {txs.map(tx => (
              <li key={tx.id} className={`tx ${tx.status.toLowerCase()}`}>
                <div className="tx-left">
                  <div className="username">{tx.username}</div>
                  <div className="time">{tx.time}</div>
                </div>
                <div className="tx-right">
                  <div className="amount">{tx.amount} TON</div>
                  <div className="status-label">{tx.status}</div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}
