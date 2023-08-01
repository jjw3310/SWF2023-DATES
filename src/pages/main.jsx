import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import { Button, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import crypto from "crypto-browserify";
import { useCrypto } from "@hooks/useCrypto";
import { useRequestData } from "@hooks/useRequestData";
import { useEffect, useState } from "react";

const Main = ({ account }) => {
  const toast = useToast();
  const { generateKey, encodeByAES256, decodeByAES256 } = useCrypto();
  const { verifyByPhone, requestData } = useRequestData();
  const [ci, setCi] = useState();
  const [address, setAddress] = useState();
  const [data, setData] = useState();

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

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
        console.log("address : ", address);
      }
    }
  }

  function generateAddress() {
    var id = crypto.randomBytes(32).toString("hex");
    var privateKey = "0x" + id;
    var wallet = new ethers.Wallet(privateKey);
    setAddress(wallet.address);
  }

  function getDataAndEncrypt() {
    if (ci && address && data) {
      const key = generateKey(ci, address);
      // console.log("KEY : ", key);
      // console.log("DATA : ", JSON.stringify(data));
      // const k = "key";
      // const rk = k.padEnd(32, " "); // AES256은 key 길이가 32자여야 함
      // const b = "암호화는 보안을 위해 매우 중요합니다.";
      // encodeByAES256(rk, b);
      return encodeByAES256(key, JSON.stringify(data));
    } else {
      console.error("ERROR : getDataAndCrypto()");
    }
  }

  useEffect(() => {
    if (ci && address && data) {
      const cryptedData = getDataAndEncrypt();
      console.log("ENCRYPTED DATA :", cryptedData);
      console.log(
        "DECRYPTED DATA :",
        decodeByAES256(generateKey(ci, address), cryptedData)
      );
    }
  }, [data]);

  return (
    <>
      {/* <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex">
          <div class="md:shrink-0">
            <img
              class="h-48 w-full object-cover md:h-full md:w-48"
              src="/img/building.jpg"
              alt="Modern building architecture"
            />
          </div>
          <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Company retreats
            </div>
            <a
              href="#"
              class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              Incredible accommodation for your team
            </a>
            <p class="mt-2 text-slate-500">
              Looking to take your team away on a retreat to enjoy awesome food
              and take in some sunshine? We have a list of places to do just
              that.
            </p>
          </div>
        </div>
      </div> */}
      <div className="h-screen md:max-h-screen">
        <div className="gradient h-screen">
          <div className="flex justify-center safefont">Seoul My Soul</div>
          <div className="flex justify-center subtitle">
            원클릭으로 신청하는 나의 맞춤 복지
          </div>
          <div className="flex flex-col loginbutton-flex thin ">
            <button className="flex  flex-row justify-center loginbutton absol-none">
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
        <div>
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
              else
                console.error("CI값이 없습니다. 본인인증을 먼저 진행해주세요");
            }}
          >
            조회하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default Main;
