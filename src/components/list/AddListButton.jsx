import React from 'react';
import { IconButton, Icon } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import AddList from './AddList';
import { useAuth } from '../../hooks/useAuth';

const AddListButton = ({ onOpen }) => {
  const { modeColor, notModeColor } = useAuth();
  return (
    <IconButton
      bg={modeColor}
      color={notModeColor}
      _hover={{ bg: notModeColor, color: modeColor, border: '1px', borderColor: modeColor }}
      borderRadius='full'
      icon={<Icon as={AddIcon}/>}
      onClick={onOpen}
    />
  );
};

export default AddListButton;