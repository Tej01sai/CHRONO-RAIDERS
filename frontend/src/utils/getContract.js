import { BrowserProvider, Contract } from 'ethers';
import RelicNFT from '../contracts/RelicNFT.json';

export const getContract = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new Contract(
    RelicNFT.address,
    RelicNFT.abi,
    signer
  );
  return contract;
};
