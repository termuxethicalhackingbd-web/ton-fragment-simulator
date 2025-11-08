<script type="module">
import { TonConnectUI } from "https://unpkg.com/@tonconnect/ui/dist/tonconnect-ui.min.js";

const tonConnectUI = new TonConnectUI({
  manifestUrl: "https://nt-simulator-6s12.vercel.app/tonconnect-manifest.json"
});

const connectButton = document.querySelector("#connectTonkeeper");

if (connectButton) {
  connectButton.addEventListener("click", async () => {
    try {
      await tonConnectUI.connectWallet();
      const wallet = tonConnectUI.wallet;
      if (wallet) {
        alert(`Connected: ${wallet.account.address}`);
      }
    } catch (error) {
      alert("Connection failed or cancelled!");
    }
  });
}
</script>
