import { useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "src/web3.config";

export const useWallet = () => {
  const [paidContract, setPayContract] = useState();
  const ethers = require("ethers");

  function getOwnerPayContract() {}
  return { paidContract, getOwnerPayContract };
};
