import React from "react";
import { Container, HStack, Text, Box } from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";

const Footer = () => {
  return (
    <HStack
      pos='fixed'
      top='97vh'
      left='0vw'
      w='100vw'
      justify='center'
      bg='transparent'
      color='gray.500'
    >
      <Text color='gray.500' fontSize='xs'>
        Christopher Golizio®
      </Text>
    </HStack>
  );
};

export default Footer;
