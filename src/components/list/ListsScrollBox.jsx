import React from "react";
import { Box, Flex, Center } from "@chakra-ui/react";

import CustomPopover from "../ui/CustomPopover";
import AddListInputDrawer from "./AddListInputDrawer";

const ListsScrollBox = ({ children }) => {
  return (
    <Box
      w='100vw'
      h='100vh'
      overflowX='auto'
      overflowY='hidden'
      textAlign='center'
      mt={["22%", null, null, 20]}
      scrollSnapType='x mandatory'
      // overflow='visible'
    >
      <Center pos='fixed' top={25} ml={["45%", null, null, "50%"]}>
        {/* <CustomPopover /> */}
        <AddListInputDrawer />
      </Center>
      <Flex
        dir='row'
        h={["100%", null, null, "calc(100vh - 2rem)"]}
        wrap='nowrap'
      >
        {children}
      </Flex>
    </Box>
  );
};

export default ListsScrollBox;
