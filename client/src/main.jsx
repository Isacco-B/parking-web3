import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";
import { Sepolia } from "@thirdweb-dev/chains";
import App from "./App";
import "./index.css";

console.log();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThirdwebProvider
    activeChain={Sepolia}
    sdkOptions={{
      readonlySettings: {
        rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${
          import.meta.env.VITE_ALCHEMY_APY_KEY
        }`, // force read calls to go through your own RPC url
        chainId: 11155111, // reduce RPC calls by specifying your chain ID
      },
      gasSettings: {
        maxPriceInGwei: 123, // Maximum gas price for transactions (default 300 gwei)
        speed: "fastest", // the tx speed setting: 'standard'|'fast|'fastest' (default: 'fastest')
      },
      infuraApiKey: "<infura-api-key>", // your Infura API key
      alchemyApiKey: `${import.meta.env.VITE_ALCHEMY_APY_KEY}`, // your Alchemy API key
      thirdwebApiKey: import.meta.env.VITE_THIRDWEB_APY_KEY, // your thirdweb API key
    }}
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
