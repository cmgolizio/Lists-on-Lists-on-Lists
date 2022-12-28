import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const ListsScrollBox = ({ children }) => {
  return (
    <Box
      w='100vw'
      h='100vh'
      overflowX='auto'
      overflowY='hidden'
      textAlign='center'
      mt={["22%", null, null, 20]}
    >
      <Flex
        dir='row'
        h={["100%", null, null, "calc(100vh - 2rem)"]}
        wrap='nowrap'
        scrollSnapType={["x mandatory", null, null, null]}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default ListsScrollBox;
