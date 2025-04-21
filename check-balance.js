const hre = require("hardhat");

async function main() {
  const ethers = hre.ethers; // Get ethers from Hardhat Runtime Environment

  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);

  console.log("Deployer address:", deployer.address);
  console.log("Sepolia ETH Balance:", ethers.utils.formatEther(balance), "ETH");
}

main().catch((error) => {
  console.error("Something went wrong:", error);
  process.exit(1);
});