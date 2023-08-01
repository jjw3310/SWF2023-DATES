import React, { useEffect, useState } from "react";
import alarm from "../icon/Alarm.svg";
import profileicon from "../icon/profileicon.svg";
import checkbox from "../icon/searchboxccheck.svg";
import searchBoxLicense from "../icon/searchBoxLicense.svg";
import searchBoxGetInfo from "../icon/searchBoxGetInfo.svg";
import searchIcon from "../icon/searchIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useCrypto } from "@hooks/useCrypto";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "src/web3.config";
import { ethers } from "ethers";
import { useRequestData } from "@hooks/useRequestData";
import crypto from "crypto-browserify";
import Footer from "../components/Footer.jsx";
import PolicyBox from "../components/PolicyBox.jsx";
import { Spinner } from "@chakra-ui/react";
import { useWallet } from "@hooks/useWallet";

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
  const { payContract } = useWallet();

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
        const result = await payContract.isAddressMapped(ci);
        console.log("isAddressMapped : ", result);
        if (result) {
          console.log("true");
          const res = await payContract.mintDataSBT(ci, cryptedData);
          console.log(res);
        } else {
          console.log("false");
          const res = await payContract.setAddressMapping(ci, address);
          console.log(res);
        }
      };
      let chk = isAddressMapped(ci);
      console.log(chk);
      console.log("ENCRYPTED DATA :", cryptedData);

      const dec = async () => {
        const soul = await payContract.getSoul();
        console.log("SOUL : ", soul);
        const decData = decodeByAES256(generateKey(ci, address), soul);
        console.log("decData : ", decData);
      };
      dec();
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

  const navigate = useNavigate();

  return (
    <div className=" myseoulheader bg-[#e2e8f0]">
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
            <button
              onClick={() => {
                navigate("/myinfo", { state: { data: decrypted, ci: ci } });
              }}
            >
              <div className="commonSearchBoxIcon">
                <img src={checkbox} alt="checkbox" />
                <div className="searchIconTitle">신원 정보</div>
              </div>
            </button>
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
          <div className="category_selected">추천</div>
          <div className="category">현금</div>
          <div className="category">주택</div>
          <div className="category">사업자</div>
          <div className="category">자녀</div>
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

      <PolicyBox />
      <Footer />
    </div>
  );
}
