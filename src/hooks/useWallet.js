import { useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "src/web3.config";
import { ethers } from "ethers";
// import {
//   CRONOS_TESTNET_RPC,
//   DEPLOYED_CONTRACT_ADDRESS,
//   PRIVATE_KEY,
// } from "src/constants";

export const useWallet = () => {
  const ethers = require("ethers");
  const provider = new ethers.AlchemyProvider(
    "goerli",
    process.env.REACT_APP_ALCHEMY_KEY
  );
  const signer = new ethers.Wallet(process.env.REACT_APP_PVK, provider);
  const payContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );
  return { payContract };
};
