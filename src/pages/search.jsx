import React, { useEffect, useState } from "react";
import alarm from "../icon/Alarm.svg";
import profileicon from "../icon/profileicon.svg";
import checkbox from "../icon/searchboxccheck.svg";
import searchBoxLicense from "../icon/searchBoxLicense.svg";
import searchBoxGetInfo from "../icon/searchBoxGetInfo.svg";
import searchIcon from "../icon/searchIcon.svg";
import revenue from "../icon/revenue.svg";
import { useLocation } from "react-router-dom";
import { useCrypto } from "@hooks/useCrypto";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "src/web3.config";
import { ethers } from "ethers";
import { useRequestData } from "@hooks/useRequestData";
import crypto from "crypto-browserify";
import { Button, Spinner } from "@chakra-ui/react";

export default function Search() {
  const [ci, setCi] = useState();
  const location = useLocation();
  useEffect(() => {
    setCi(location.state?.data);
    console.log(location.state?.data);
  }, []);
  // console.log("search : ", location.state?.data || "Default Data");

  const { generateKey, encodeByAES256, decodeByAES256 } = useCrypto();
  const { requestData } = useRequestData();
  const [address, setAddress] = useState();
  const [data, setData] = useState();
  const [decrypted, setDecrypted] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const web3 = new Web3("https://evm-dev-t3.cronos.org");
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  // console.log("contract : ", contract);

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
        console.log("isAddressMapped : ", result);
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
      const decrypted = decodeByAES256(generateKey(ci, address), cryptedData);
      setDecrypted(decrypted);
      console.log("DECRYPTED DATA : ", decrypted);
    }
  }, [data]);

  useEffect(() => {
    if (ci) fetchOnClick(ci);
  }, [ci]);

  function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }

    return age;
  }

  return (
    <div className=" myseoulheader   bg-[#e2e8f0]">
      <div className=" seoulmyfont hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        안심복지
      </div>
      <div className="alarmicon cursor-pointer">
        <img src={alarm} alt="alarm icon "></img>
      </div>
      <div className="searchMyCard">
        <div className="h-1/2 flex searchInfoBox">
          <div>
            <img src={profileicon} alt="profileicon" />
          </div>
          <div>
            <div className="searchInfoName">
              {decrypted ? decrypted.name : ""}님
            </div>
            <div className="searchMyInfo">
              {decrypted
                ? `${decrypted.birth} / 만 ${calculateAge(decrypted.birth)}세`
                : ""}
            </div>
          </div>
        </div>
        <div className="h-1/2">
          <div className="flex searchBoxIcons">
            <div className="commonSearchBoxIcon">
              <img src={checkbox} alt="checkbox" />
              <div className="searchIconTitle">신원 정보</div>
            </div>
            <div className="commonSearchBoxIcon">
              <img src={searchBoxLicense} alt="checkbox" />
              <div className="searchIconTitle">모바일 신분증</div>
            </div>
            <button
              onClick={() => {
                setIsLoading(false);
              }}
            >
              <div className="commonSearchBoxIcon">
                <img src={searchBoxGetInfo} alt="checkbox" />
                <div className="searchIconTitle">신원 갱신</div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="searchbar flex gap-3 items-center text-center pl-5">
        <div>
          <img src={searchIcon} alt="searchbar" />
        </div>
        <div className="categoryOver">
          <div className="category">ss</div>
          <div className="category">hh</div>
          <div className="category">hh</div>
          <div className="category">hh</div>
        </div>
      </div>
      {isLoading ? (
        ""
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          pos={"absolute"}
          bottom={"30vh"}
          left={"46vw"}
        />
      )}
      <div className="policyScroll">
        <div className="policyBox">
          <div className="cashTitle mt-3 ml-3 titleFont">현금</div>
          <div className="flex justify-between justify-around mt-3">
            <div className="subsidyTitle">근로 장려금</div>
            <div></div>
            <div className="ml-12 justify-end agency">국세청</div>
            <div>
              <img src={revenue} alt="revenue" />
            </div>
          </div>
          <hr className="hrcss" />
          <div className="textfield">
            전년도 연간 부부합산 총 급여액 등에 따른 근로장려금 <br />ㆍ
            단독가구 최대 165만 원 <br />ㆍ 홑벌이 가구 최대 285만 원 <br />ㆍ
            맞벌이 가구 최대 330만 원 지급
          </div>
          <div className="flex content-around receiptArea">
            <div className="expectedReceipt">예상수령금액</div>
            <div className="amount">135만원</div>
          </div>
        </div>
        <div className="policyBox">aa</div>
      </div>
    </div>
  );
}
