import React from 'react';
import {
  HStack,
  Text,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import {
  CheckIcon,
  DeleteIcon
} from '@chakra-ui/icons';

import { useAuth } from '../../../hooks/useAuth';

const SubTask = ({ subTask }) => {
  const { modeColor, notModeColor } = useAuth();
  return (
    <HStack
      id={subTask.id}
      w='100%'
      // py={2}
      bg={modeColor}
    >
      <IconButton
        icon={<Icon as={CheckIcon}/>}
        variant='ghost'
        _hover={{ color: 'green.200' }}
        size='sm'
      />
      <Text fontSize='sm' color={notModeColor}>{subTask.title}</Text>
      <IconButton
        icon={<Icon as={DeleteIcon}/>}
        variant='ghost'
        _hover={{ bg: 'red.200' }}
        size='sm'
      />
    </HStack>
  );
};

export default SubTask;