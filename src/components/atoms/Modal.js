const {
  useDisclosure,
  Button,
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

export function verifyModal({ isOpen, onOpen, onClose, initialRef, finalRef }) {
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button>

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
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
