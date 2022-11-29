import React from 'react';
import {
  Box,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const GoToDashboard = ({ setActiveList }) => {
  const router = useRouter();

  const handleToDashboard = (e) => {
    e.preventDefault();
    setActiveList(null)

    router.push('/');
  };

  return (
    <Box minH='max-content' minW='max-content'>
      <Button onClick={(e) => handleToDashboard(e)}>Profile</Button>
    </Box>
  )
}

export default GoToDashboard