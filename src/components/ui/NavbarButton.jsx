import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const NavbarButton = (props) => {
  return (
    <Box minH='max-content' minW='max-content'>
      <Button onClick={(e) => props.handler(e)}>{props.label}</Button>
    </Box>
  );
};

export default NavbarButton;