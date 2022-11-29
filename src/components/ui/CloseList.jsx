import React from 'react';
import {
  Box,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useAuth } from '../../hooks/useAuth';

const CloseList = () => {
  const router = useRouter();
  const { setActiveList, setTasks } = useAuth();

  const handleCloseList = (e) => {
    e.preventDefault();

    setActiveList(null);
    setTasks(null);

    router.push('/list/Lists');
  };

  return (
    <Box minH='max-content' minW='max-content'>
      <Button onClick={(e) => handleCloseList(e)}>Save & Close</Button>
    </Box>
  );
};

export default CloseList;