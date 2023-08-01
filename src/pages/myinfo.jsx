import React, { useEffect, useState } from "react";
import profileicon from "../icon/profileicon.svg";
import checkmark from "../icon/checkmark.svg";
import { Box, Divider, Flex, Spinner } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

export default function Myinfo() {
  const [ci, setCi] = useState();
  const [decrypted, setDecrypted] = useState();
  const location = useLocation();

  useEffect(() => {
    setCi(location.state?.ci);
    // console.log(location.state?.ci);
    setDecrypted(location.state?.data);
    // console.log(location.state?.data);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
    <Box>
      {decrypted ? "" : ""}
      <div className=" myseoulheader bg-[#e2e8f0]">
        <Flex direction="column">
          <Flex direction="row">
            <Box>
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                <AiOutlineLeft />
              </button>
            </Box>
            <Box alignItems={"center"}>
              <div className=" seoulmyfont hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                신원정보
              </div>
            </Box>
          </Flex>
          <div className="myInfoCard">
            <div className="h-1/2 flex searchInfoBox">
              <Flex>
                <div>
                  <img src={profileicon} alt="profileicon" />
                </div>
                <div>
                  <div className="searchInfoName">
                    {decrypted ? decrypted.name : ""}님
                  </div>
                  <div className="searchMyInfo">
                    {/* {decrypted
                      ? `${decrypted.birth} / 만 ${calculateAge(
                          decrypted.birth
                        )}세`
                      : ""} */}
                  </div>
                </div>
              </Flex>
            </div>
          </div>
        </Flex>
        <div className="myInfoBox">
          <Flex mt={"16px"} mb={"15px"}>
            <Box ml={"15px"} mr={"9px"}>
              <img src={checkmark} alt="" />
            </Box>
            <Box
              fontFamily={"Inter"}
              fontSize={"20px"}
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
            >
              신원 정보
            </Box>
          </Flex>
          <Divider color={"#888888"} opacity={0.4} border={"1px"} />
          <Flex direction="column" mt={"15px"} ml={"15px"}>
            {/* <Box>{JSON.stringify(decrypted)}</Box> */}
            <Box
              color={(0, 0, 0, 0.65)}
              fontFamily={"Inter"}
              fontSize=" 18px"
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
              mb={"1px"}
            >
              주거지
            </Box>
            <Box
              fontFamily={"Inter"}
              fontSize={"12px"}
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
              mb={"9px"}
            >
              {/* {decrypted
                ? JSON.stringify(decrypted.address).replaceAll('"', "")
                : ""} */}
            </Box>
            <Box
              color={(0, 0, 0, 0.65)}
              fontFamily={"Inter"}
              fontSize=" 18px"
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
            >
              가족관계
            </Box>
            <Box
              fontFamily={"Inter"}
              fontSize={"12px"}
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
              mb={"9px"}
            >
              {/* {decrypted
                ? JSON.stringify(decrypted.family)
                    .replaceAll('"', "")
                    .map((v) => {
                      <Box>v</Box>;
                    })
                : ""} */}
            </Box>
            <Box
              color={(0, 0, 0, 0.65)}
              fontFamily={"Inter"}
              fontSize=" 18px"
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
            >
              주거형태
              <Box
                fontFamily={"Inter"}
                fontSize={"12px"}
                fontStyle={"normal"}
                fontWeight={"600"}
                lineHeight={"24px"}
                mb={"9px"}
              >
                {decrypted
                  ? JSON.stringify(decrypted.residence).replaceAll('"', "")
                  : ""}
              </Box>
            </Box>

            <Box
              color={(0, 0, 0, 0.65)}
              fontFamily={"Inter"}
              fontSize=" 18px"
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
            >
              개인재산
            </Box>
            <Box
              fontFamily={"Inter"}
              fontSize={"12px"}
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
              mb={"9px"}
            >
              {decrypted
                ? JSON.stringify(decrypted.assets).replaceAll('"', "")
                : ""}
            </Box>
            <Box
              color={(0, 0, 0, 0.65)}
              fontFamily={"Inter"}
              fontSize=" 18px"
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
            >
              소득
            </Box>
            <Box
              fontFamily={"Inter"}
              fontSize={"12px"}
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
              mb={"9px"}
            >
              {decrypted
                ? `${JSON.stringify(decrypted.wage).replaceAll('"', "")} 원`
                : ""}
            </Box>
            <Box
              color={(0, 0, 0, 0.65)}
              fontFamily={"Inter"}
              fontSize=" 18px"
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
            >
              재직유무
            </Box>
            <Box
              fontFamily={"Inter"}
              fontSize={"12px"}
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
              mb={"9px"}
            >
              {/* {JSON.stringify(decrypted.company).replaceAll('"', "") !== ""
                ? JSON.stringify(decrypted.company).replaceAll('"', "")
                : "해당사항 없음"} */}
            </Box>
            <Box
              color={(0, 0, 0, 0.65)}
              fontFamily={"Inter"}
              fontSize=" 18px"
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
            >
              학력
            </Box>
            <Box
              fontFamily={"Inter"}
              fontSize={"12px"}
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"24px"}
              mb={"9px"}
            >
              {/* {JSON.stringify(decrypted.education).replaceAll('"', "") !== ""
                ? JSON.stringify(decrypted.education).replaceAll('"', "")
                : "해당사항 없음"} */}
            </Box>
          </Flex>
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
      </div>
    </Box>
  );
}
