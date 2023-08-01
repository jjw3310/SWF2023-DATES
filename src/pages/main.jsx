import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import { Button, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import crypto from "crypto-browserify";
import { useCrypto } from "@hooks/useCrypto";
import { useRequestData } from "@hooks/useRequestData";
import { useEffect, useState } from "react";
import { useWallet } from "@hooks/useWallet";

const Main = ({ account }) => {
  const toast = useToast();
  const { generateKey, encodeByAES256, decodeByAES256 } = useCrypto();
  const { verifyByPhone, requestData } = useRequestData();
  const [ci, setCi] = useState();
  const [address, setAddress] = useState();
  const [data, setData] = useState();
  const { paidContract, getOwnerPayContract } = useWallet();

  // const provider = new ethers.getDefaultProvider(
  //   "https://evm-dev-t3.cronos.org",
  //   []
  // );
  const provider = new ethers.JsonRpcProvider(
    "https://goerli.infura.io/v3/43ef50b40f3742aebfbe76b03c09bb68",
    "goerli"
  );

  console.log("provider", provider);
  useEffect(() => {
    getOwnerPayContract();
    console.log("paidContract : ", paidContract);
  }, []);

  const web3 = new Web3("https://evm-dev-t3.cronos.org");
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  // console.log("contract : ", contract);

  async function verifyOnClick(_name, _birth, _phonenumber) {
    const result = await verifyByPhone(_name, _birth, _phonenumber);
    console.log("CI : ", result);
    setCi(result);
    if (result) {
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

  async function fetchOnClick() {
    if (ci) {
      const jsonResult = await requestData(ci);
      setData(jsonResult);
      if (jsonResult) {
        generateAddress();
      }
    }
  }

  function generateAddress() {
    var id = crypto.randomBytes(32).toString("hex");
    var privateKey = "0x" + id;
    var wallet = new ethers.Wallet(privateKey);
    console.log("wallet.address : ", wallet.address);
    setAddress(wallet.address);
  }

  function getDataAndEncrypt() {
    if (ci && address && data) {
      const key = generateKey(ci, address);
      return encodeByAES256(key, JSON.stringify(data));
    } else {
      console.error("ERROR : getDataAndCrypto()");
    }
  }

  useEffect(() => {
    if (ci && address && data) {
      const cryptedData = getDataAndEncrypt();
      const isAddressMapped = async () => {
        const result = await contract.methods.isAddressMapped(ci).call();
        if (result) {
          console.log("true");
          const res = await contract.methods
            .mintDataSBT(ci, cryptedData)
            .send({ from: "0x3391a020fB02bCcCBfa57114fE1f0bA04972CD77" });
          console.log(res);
        } else {
          console.log("false");
          const res = await contract.methods
            .setAddressMapping(ci, address)
            .send({ from: "0x3391a020fB02bCcCBfa57114fE1f0bA04972CD77" });
          console.log(res);
        }
        return result;
      };

      let chk = isAddressMapped(ci);
      // console.log(chk);
      // console.log("ENCRYPTED DATA :", cryptedData);
      // console.log(
      //   "DECRYPTED DATA :",
      //   decodeByAES256(generateKey(ci, address), cryptedData)
      // );
    }
  }, [data]);

  return (
    <>
      <Button
        bgColor={"blue.300"}
        onClick={() => {
          verifyOnClick();
        }}
      >
        본인인증
      </Button>
      <Button
        bgColor={"red.600"}
        onClick={() => {
          if (ci) fetchOnClick();
          else console.error("CI값이 없습니다. 본인인증을 먼저 진행해주세요");
        }}
      >
        조회하기
      </Button>
    </>
  );
};

export default Main;
