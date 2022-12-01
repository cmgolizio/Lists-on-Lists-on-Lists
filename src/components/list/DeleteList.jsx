import React from 'react';
import {
  Box,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { GrClose, GrTrash } from 'react-icons/gr';

import { useAuth } from '../../hooks/useAuth';

const DeleteList = () => {
  // const {} = useAuth();
  return (
    // <Box
    //   h='100%'
    //   pos='absolute'
    //   top={2}
    //   right={2}
    // >
      <IconButton icon={<GrTrash />} isRound size='lg'/>
    // </Box>
  );
};

export default DeleteList;