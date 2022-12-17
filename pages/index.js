import React from "react";
import { Flex } from "@chakra-ui/react";

import Dashboard from "./Dashboard";

export default function Home() {
  return (
    <Flex
      textAlign='center'
      fontSize='xl'
      minH='100vh'
      minW='100vw'
      maxW='100vw'
      // w='100%'
      align='center'
      justify='center'
    >
      <Dashboard />
    </Flex>
  );
}
