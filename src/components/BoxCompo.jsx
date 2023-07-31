import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function BoxCompo() {
  return (
    <div>
      <Box
        w="100%"
        h="200px"
        bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
      >
        Tomato
      </Box>
      <Box maxW="960px" mx="auto">
        hello
      </Box>

      <Box m={[2, 3]} />
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Welcome to Chakra UI
      </Text>
    </div>
  );
}
