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
  AlertIcon
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '../../src/hooks/useAuth';

const Login = () => {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      router.push('/');
    } catch (error) {
      setError('Failed to log in.');
    }
    setLoading(false);
  }

  return (
    <Center h='100%'>
      <VStack>
        {error && <Alert status='error'><AlertIcon/>{error}</Alert>}
        <Card justify='space-between'>
          <CardHeader>
            <Heading size='xl'>Log in</Heading>
          </CardHeader>
          <CardBody mx='2rem'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type='email' my='1rem' ref={emailRef} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type='password' my='1rem' ref={passwordRef} />
              </FormControl>
              <VStack>
                <Button
                  w='100%'
                  my='1rem'
                  type='submit'
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  loadingText='Logging in...'
                >
                  Log In
                </Button>
                <Link href='/auth/ForgotPassword'>
                  Forgot Password?
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

export default Login;