import React from 'react';
import { useColorMode, useColorModeValue, IconButton, Icon } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from '../../hooks/useAuth';
// import { FaMoon, FaSun } from 'react-icons/fa';

export const ThemeSwitcher = props => {
  const { modeColor, notModeColor } = useAuth();
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  // const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <IconButton
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      marginLeft={2}
      onClick={toggleColorMode}
      icon={<Icon as={SwitchIcon} />}
      // _hover={{ bg: notModeColor, color: modeColor, border: '1px', borderColor: modeColor }}
      {...props}
    />
  );
};
