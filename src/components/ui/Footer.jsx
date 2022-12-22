import React from 'react';
import {
  Container,
  HStack,
  Text,
  Box
} from '@chakra-ui/react';

import { useAuth } from '../../hooks/useAuth';

const Footer = () => {
  const { modeColor, notModeColor } = useAuth();
  return (
    <HStack
      pos='absolute'
      top='97vh'
      left='0vw'
      w='100vw'
      justify='center'
      bg={modeColor}
      color={notModeColor}
    >
      <Text
        color={notModeColor}
        fontSize='xs'
      >
        Christopher Golizio®
      </Text>
    </HStack>
  );
};

export default Footer;