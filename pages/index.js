import React from "react";
import { Flex } from "@chakra-ui/react";

import Dashboard from "./Dashboard";
import { useAuth } from "../src/hooks/useAuth";

export default function Home() {
  const { userColor } = useAuth();
  return (
    <Flex
      textAlign='center'
      fontSize='xl'
      h='100vh'
      w='100vw'
      align='center'
      justify='center'
      py='6rem'
      bg={userColor}
    >
      <Dashboard />
    </Flex>
  );
}
