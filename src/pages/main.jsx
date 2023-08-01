import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useRequestData } from "@hooks/useRequestData";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const Main = () => {
  const [ci, setCi] = useState();
  const toast = useToast();
  const { verifyByPhone } = useRequestData();

  async function verifyOnClick(_name, _birth, _phonenumber) {
    const result = await verifyByPhone(_name, _birth, _phonenumber);
    console.log("CI : ", result);
    setCi(result);
    if (result) {
      toast({
        title: "본인인증에 성공했습니다.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "본인인증에 실패했습니다.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    return result;
  }
  // const { paidContract, getOwnerPayContract } = useWallet();

  // const provider = new ethers.getDefaultProvider(
  //   "https://evm-dev-t3.cronos.org"
  // );

  // console.log("provider", provider);
  // useEffect(() => {
  // getOwnerPayContract();
  // console.log("paidContract : ", paidContract);
  // }, []);

  // { isOpen, onOpen, onClose, initialRef, finalRef }
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <Box backgroundColor={"blackAlpha.900"}>
        <div className="h-screen md:max-h-screen">
          <div className="gradient h-screen">
            <div className="flex justify-center safefont">안심복지</div>
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
              <ModalHeader>본인 인증</ModalHeader>
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
                  onClick={async () => {
                    onClose();
                    const res = await verifyOnClick();
                    navigate("/search", { state: { data: res } });
                  }}
                  colorScheme="blue"
                  mr={3}
                >
                  인증
                </Button>
                <Button onClick={onClose}>취소</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </Box>
    </>
  );
};

export default Main;
