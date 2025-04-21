import { BrowserProvider, Contract } from 'ethers';
import deployedInfo from '../contracts/deployedInfo.json';

export const getContract = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new Contract(
    deployedInfo.address,
    deployedInfo.abi,
    signer
  );
  return contract;
};
