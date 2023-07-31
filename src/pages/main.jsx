import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import { Button, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import crypto from "crypto-browserify";

const Main = ({ account }) => {
  const toast = useToast();
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  async function verifyOnClick(result) {
    if (result) {
      let address = generateAddress();
      toast({
        title: "본인인증에 성공했습니다.",
        description: address,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "본인인증에 실패했습니다.",
        description: "We've failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function generateAddress() {
    var id = crypto.randomBytes(32).toString("hex");
    var privateKey = "0x" + id;
    var wallet = new ethers.Wallet(privateKey);
    return wallet.address;
  }

  function getDataRequest() {
    const k = "key";
    const rk = k.padEnd(32, " ");
    const b = JSON.stringify({ name: "이정윤", age: 34, wage: 60000000 });
    return encodeByAES56(rk, b);
  }

  return (
    <>
      <Button
        bgColor={"blue.300"}
        onClick={() => {
          verifyOnClick(true);
          verifyOnClick(false);
        }}
      >
        본인 인증
      </Button>
    </>
  );
};

export default Main;
