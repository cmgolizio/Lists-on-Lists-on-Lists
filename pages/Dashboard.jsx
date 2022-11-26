import React, { useState } from 'react';
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
import Login from './auth/Login';

const Dashboard = () => {
  const [error, setError] = useState('');
  const { currentUser, logout, addList } = useAuth();

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

  if (!currentUser) return <Login />
  return (
    <Center>
      <VStack>
        {error && <Alert status='error'><AlertIcon/>{error}</Alert>}
        <Card w='50rem'>
          <CardHeader>
            <Heading size='xl'>Profile</Heading>
            <Button top={3} onClick={() => router.push('/list/Lists')}>My Lists</Button>
          </CardHeader>
          <CardBody>
            <HStack justify='space-between' px='3rem'>
              <Text>Email: </Text>
              <Text>{currentUser.email}</Text>
            </HStack>
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