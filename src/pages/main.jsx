import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import crypto from "crypto-browserify";
import { useCrypto } from "@hooks/useCrypto";
import { useRequestData } from "@hooks/useRequestData";
import { useEffect, useRef, useState } from "react";
import { useWallet } from "@hooks/useWallet";

const {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} = require("@chakra-ui/react");

const Main = ({ account }) => {
  const toast = useToast();
  const { generateKey, encodeByAES256, decodeByAES256 } = useCrypto();
  const { verifyByPhone, requestData } = useRequestData();
  const [ci, setCi] = useState();
  const [address, setAddress] = useState();
  const [data, setData] = useState();
  // const { paidContract, getOwnerPayContract } = useWallet();

  // const provider = new ethers.getDefaultProvider(
  //   "https://evm-dev-t3.cronos.org"
  // );

  // console.log("provider", provider);
  // useEffect(() => {
  // getOwnerPayContract();
  // console.log("paidContract : ", paidContract);
  // }, []);

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
      console.log(chk);
      console.log("ENCRYPTED DATA :", cryptedData);
      console.log(
        "DECRYPTED DATA :",
        decodeByAES256(generateKey(ci, address), cryptedData)
      );
    }
  }, [data]);
  // { isOpen, onOpen, onClose, initialRef, finalRef }
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <div className="h-screen md:max-h-screen">
        <div className="gradient h-screen">
          <div className="flex justify-center safefont">Seoul My Soul</div>
          <div className="flex justify-center subtitle">
            원클릭으로 신청하는 나의 맞춤 복지
          </div>
          <div className="flex flex-col loginbutton-flex thin ">
            <button
              onClick={onOpen}
              className="flex  flex-row justify-center loginbutton absol-none"
            >
              휴대폰 본인인증
            </button>

            <button className="flex flex-row justify-center loginbutton absol-none">
              <p className="passcolor">PASS</p>&nbsp; 본인인증
            </button>
            <button className="flex flex-row justify-center loginbutton absol-none">
              <p className="kakaocolor">카카오</p>&nbsp; 본인인증
            </button>
          </div>
        </div>
        {/* <div className="gradient2 h-1/2"></div> */}
      </div>
      {/*  */}
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>이름</FormLabel>
                <Input ref={initialRef} placeholder="이름" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>전화번호</FormLabel>
                <Input placeholder="전화번호" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>인증번호</FormLabel>
                <Input placeholder="인증번호" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => {
                  onClose();
                  verifyOnClick();
                }}
                colorScheme="blue"
                mr={3}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default Main;
