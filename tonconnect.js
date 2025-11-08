import { TonConnectUI } from "@tonconnect/ui";

// Initialize TON Connect
export const tonConnectUI = new TonConnectUI({
  manifestUrl: "https://ton-fragment-simulator.vercel.app/tonconnect-manifest.json"
});

// Function to connect wallet
export async function connectWallet() {
  try {
    const wallet = await tonConnectUI.connectWallet();
    if (wallet) {
      alert(`✅ Connected: ${wallet.account.address}`);
      console.log("Wallet connected:", wallet);
    }
  } catch (error) {
    alert("❌ Connection failed or cancelled!");
    console.error("TON Connect error:", error);
  }
}

// Function to disconnect wallet
export async function disconnectWallet() {
  await tonConnectUI.disconnect();
  alert("🔌 Wallet disconnected");
}
