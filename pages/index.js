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
      maxH='100vh'
      maxW='100vw'
      align='center'
      justify='center'
      bg={userColor}
    >
      <Dashboard />
    </Flex>
  );
}
