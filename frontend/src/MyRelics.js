import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import RelicNFT from "./contracts/RelicNFT.json"; // adjust path
import './MyRelics.css'; // optional: for styling

const contractAddress = process.env.PRIVATE_KEY;

const MyRelics = ({ signer, account }) => {
  const [relics, setRelics] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNFTs = async () => {
    if (!signer || !account) return;
    setLoading(true);

    try {
      const contract = new ethers.Contract(contractAddress, RelicNFT.abi, signer);
      const balance = await contract.balanceOf(account);
      const ownedRelics = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(account, i);
        const tokenURI = await contract.tokenURI(tokenId);
        const response = await fetch(tokenURI);
        const metadata = await response.json();
        ownedRelics.push({
          tokenId: tokenId.toString(),
          ...metadata
        });
      }

      setRelics(ownedRelics);
    } catch (err) {
      console.error("Error loading relics:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadNFTs();
  }, [account]);

  if (!account) return <p>Connect your wallet to view your relics.</p>;
  if (loading) return <p>Loading your relics...</p>;

  return (
    <div className="relics-container">
      {relics.length === 0 ? (
        <p>You don’t own any relics yet. Try minting one!</p>
      ) : (
        relics.map((relic) => (
          <div className="relic-card" key={relic.tokenId}>
            <img src={relic.image} alt={relic.name} className="relic-image" />
            <h3>{relic.name}</h3>
            <p>{relic.description}</p>
            <small># {relic.tokenId}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default MyRelics;
