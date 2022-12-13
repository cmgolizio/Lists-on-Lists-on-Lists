import React, { useState, useEffect } from 'react';
import {
  Center,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '../src/hooks/useAuth';
// import ColorPicker from '../src/components/ui/ColorPicker';
import Login from './auth/Login';

const Dashboard = () => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();

  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await logout();
      router.push('/auth/Login');
    } catch (error) {
      setError('Failed to log out.')
    }
  };

  const goToLists = (e) => {
    e.preventDefault();
    console.log('Dashboard - goToLists - ROUTER: ', router);
    router.push('/list/Lists', '/mylists');
  };

  useEffect(() => {
    router.prefetch('/list/Lists', '/mylists');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!currentUser) return <Login />
  return (
    <Center pos='absolute' top={20} paddingBottom='15rem'>
      <VStack>
        {error && <Alert status='error'><AlertIcon/>{error}</Alert>}
        <Card w='50rem'>
          <CardHeader>
            <Heading size='xl'>Profile</Heading>
            <Button top={3} onClick={(e) => goToLists(e)}>My Lists</Button>
          </CardHeader>
          <CardBody>
            <HStack justify='space-between' px='3rem'>
              <Text>Email: </Text>
              <Text>{currentUser.email}</Text>
            </HStack>
            {/* <HStack justify='space-between' px='3rem'>
              <Text>Accent Color: </Text>
              <ColorPicker />
            </HStack> */}
          </CardBody>
          <CardFooter flexDir='column'>
            <Link href='/user/UpdateProfile'>
              Update Profile
            </Link>
          </CardFooter>
        </Card>
        <Button fontSize='sm' my='20rem' variant='link' onClick={(e) => handleLogout(e)}>Logout</Button>
      </VStack>
    </Center>
  );
};

export default Dashboard;