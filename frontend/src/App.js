import React, { useState } from 'react';
import { getContract } from './utils/getContract';
import MyRelics from './MyRelics';

function App() {
  const [tokenId, setTokenId] = useState(null);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [mintedMessage, setMintedMessage] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      alert("Install MetaMask!");
    }
  };

  const mintRelic = async () => {
    setLoading(true);
    setMintedMessage("");
    try {
      const contract = getContract();
      const tx = await contract.mint();
      const receipt = await tx.wait();

      const event = receipt.events.find(e => e.event === "Transfer");
      const newTokenId = event.args.tokenId.toString();
      setTokenId(newTokenId);
      setMintedMessage(`Relic minted! Token ID: ${newTokenId}`);
    } catch (error) {
      console.error(error);
      setMintedMessage("Minting failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "30px", fontFamily: "sans-serif" }}>
      <h1>ChronoRaiders</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected: {account}</p>
          <button onClick={mintRelic} disabled={loading}>
            {loading ? "Minting..." : "Mint Relic"}
          </button>
          {mintedMessage && <p>{mintedMessage}</p>}
          <MyRelics account={account} />
        </>
      )}
    </div>
  );
}

export default App;
