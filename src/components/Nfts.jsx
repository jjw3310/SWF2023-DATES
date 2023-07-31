import React from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";

export default function Nfts() {
  return (
    <div>
      <Flex
        alignItems={"center"}
        justify={"center"}
        flexDir={"column"}
        bgColor={"aquamarine"}
        height={"200px"}
      >
        <Text fontSize="6xl" fontWeight="extrabold">
          This is NFT's Component!
        </Text>
        <Text></Text>
        <Link
          href="https://aslanacademy.oopy.io/"
          isExternal
          fontSize={"xl"}
          color={"orange.600"}
        >
          visit to Aslan Academy
        </Link>
      </Flex>
    </div>
  );
}
