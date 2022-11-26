import React from "react";
import { Flex } from "@chakra-ui/react";

import Dashboard from "./Dashboard";

export default function Home() {
  return (
    <Flex
      textAlign='center'
      fontSize='xl'
      h='100vh'
      w='100vw'
      align='center'
      justify='center'
      py='6rem'
    >
      <Dashboard />
    </Flex>
  );
}
