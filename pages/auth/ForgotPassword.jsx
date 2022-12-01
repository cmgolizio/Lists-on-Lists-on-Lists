import React, { useRef, useState } from 'react';
import {
  Center,
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Heading,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import Link from 'next/link';

import { useAuth } from '../../src/hooks/useAuth';

const ForgotPassword = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const emailRef = useRef();

  const { resetPassword, userColor } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your email for further instructions');
    } catch (error) {
      setError('Failed to reset password.');
    }
    setLoading(false);
  }

  return (
    <Center h='100%' py={20} bg={userColor}>
      <VStack>
        {error && <Alert status='error'><AlertIcon/>{error}</Alert>}
        {message && <Alert status='success'>{message}</Alert>}
        <Card justify='space-between'>
          <CardHeader>
            <Heading size='xl'>Password Reset</Heading>
          </CardHeader>
          <CardBody mx='2rem'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type='email' my='1rem' ref={emailRef} />
              </FormControl>
              <VStack>
                <Button
                  w='100%'
                  my='1rem'
                  type='submit'
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  loadingText='Resetting...'
                >
                  Reset Password
                </Button>
                <Link href='/auth/Login'>
                  Log in
                </Link>
              </VStack>
            </form>
          </CardBody>
        </Card>
        <Text w='100%' fontSize='md'>
          Need an account?{' '}
          <Link href='/auth/Signup'>
            Sign up
          </Link>
        </Text>
      </VStack>
    </Center>
  );
};

export default ForgotPassword;