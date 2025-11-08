// thin wrapper to initialize TonConnect UI
import { TonConnectUI } from "@tonconnect/ui";

const manifestUrl = (typeof window !== "undefined")
  ? `${window.location.origin}/tonconnect-manifest.json`
  : "/tonconnect-manifest.json";

const tonConnectUI = new TonConnectUI({ manifestUrl });

export default tonConnectUI;
