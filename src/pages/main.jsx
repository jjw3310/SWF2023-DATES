import { useState, useEffect } from "react";
import Intro from "../components/Intro";

import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import Nfts from "../components/Nfts";
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

console.log(contract);
const Main = ({ account }) => {
  const [totalNft, setTotalNft] = useState(0);
  const [mintedNft, setMintedNft] = useState(0);
  const [myNft, setMyNft] = useState(0);
  const [page, setPage] = useState(1);
  const getTotalNft = async () => {
    try {
      if (!contract) return;

      const response = await contract.methods.totalNft().call();

      setTotalNft(response);
    } catch (error) {
      console.error(error);
    }
  };
  const getMintedNft = async () => {
    try {
      if (!contract) return;

      const response = await contract.methods.totalSupply().call();

      setMintedNft(response);
      //   console.log(response);
      //   setPage(parseInt((parseInt(response) - 1) / 10) + 1);
      setPage(Math.floor(parseInt(response - 1) / 3) + 1);
      //   console.log(page);
      // 10 - 1 = 9 / 10 = 0 + 1= 1page
    } catch (error) {
      console.error(error);
    }
  };
  const getMyNft = async () => {
    try {
      if (!contract || !account) return;
      const response = await contract.methods.balanceOf(account).call();
      console.log("내꺼 : " + response);
      setMyNft(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTotalNft();
    getMintedNft();
  }, []);
  useEffect(() => {
    getMyNft();
  }, [account]);
  return (
    <>
      <Intro totalNft={totalNft} mintedNft={mintedNft} myNft={myNft} />
      <Nfts page={page} mintedNft={mintedNft} />
    </>
  );
};

export default Main;
