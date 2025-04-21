const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying with account:", deployer.address);

  // ✅ Only one constructor argument is needed
  const baseURI = "ipfs://QmYourMetadataCID/"; // ← replace with your actual Pinata/IPFS base CID

  const RelicNFT = await hre.ethers.getContractFactory("RelicNFT");
  const relicNFT = await RelicNFT.deploy(baseURI); // ✅ Passing just one argument
  await relicNFT.waitForDeployment();

  const contractAddress = await relicNFT.getAddress();
  console.log("✅ Contract deployed at:", contractAddress);

  // Save for frontend
  const data = {
    address: contractAddress,
    abi: JSON.parse(relicNFT.interface.formatJson())
  };

  fs.writeFileSync(
    "./frontend/src/contracts/deployedInfo.json",
    JSON.stringify(data, null, 2)
  );
  console.log("💾 Contract info saved to deployedInfo.json");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
