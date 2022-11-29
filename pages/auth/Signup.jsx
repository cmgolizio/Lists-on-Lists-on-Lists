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
  Text,
  VStack,
  Heading,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '../../src/hooks/useAuth';

const Signup = () => {
  const [isError, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  // const firstNameRef = useRef();
  // const lastNameRef = useRef();
  // const avatarRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef !== passwordConfirmRef) {
      setError('Passwords do not match.');
    }

    try {
      setError('');
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
      );
      router.push('/')
    } catch (error) {
      setError('Failed to create account.');
      console.log('SIGNUP ERROR: ', error)
    }
    setLoading(false);
  }

  return (
    <Center h='100%' py={20}>
      <VStack>
        {isError && <Alert status='error'><AlertIcon/>{isError}</Alert>}
        <Card justify='space-between'>
          <CardHeader>
            <Heading size='xl'>Sign up</Heading>
          </CardHeader>
          <CardBody mx='2rem'>
            <form onSubmit={(e) => handleSubmit(e)}>
              {/* <FormControl>
                <FormLabel>First name</FormLabel>
                <Input type='text' my='1rem' ref={firstNameRef} />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input type='text' my='1rem' ref={lastNameRef} />
              </FormControl> */}
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type='email' my='1rem' ref={emailRef} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type='password' my='1rem' ref={passwordRef} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password confirmation</FormLabel>
                <Input type='password' my='1rem' ref={passwordConfirmRef} />
              </FormControl>
              <Button
                my='1rem'
                type='submit'
                isDisabled={isLoading}
                isLoading={isLoading}
                loadingText='Signing up...'
              >
                Sign Up
              </Button>
            </form>
          </CardBody>
        </Card>
        <Text w='100%' fontSize='md'>
          Already have an account?{' '}
          <Link href='/auth/Login'>
            Log in
          </Link>
        </Text>
      </VStack>
    </Center>
  );
};

export default Signup;