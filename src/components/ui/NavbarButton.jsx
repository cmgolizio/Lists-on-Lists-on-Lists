import React from 'react';
import { Box, Button } from '@chakra-ui/react';

import { useAuth } from '../../hooks/useAuth';

const NavbarButton = (props) => {
  const { modeColor, notModeColor } = useAuth();
  return (
    <Box minH='max-content' minW='max-content'>
      <Button
        bg={modeColor}
        color={notModeColor}
        _hover={{ bg: notModeColor, color: modeColor, border: '1px', borderColor: modeColor }}
        onClick={(e) => props.handler(e)}>{props.label}
      </Button>
    </Box>
  );
};

export default NavbarButton;