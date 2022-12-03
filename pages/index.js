import React from "react";
import { Flex } from "@chakra-ui/react";

import Dashboard from "./Dashboard";

export default function Home() {
  return (
    <Flex
      textAlign='center'
      fontSize='xl'
      maxH='100vh'
      maxW='100vw'
      align='center'
      justify='center'
    >
      <Dashboard />
    </Flex>
  );
}
