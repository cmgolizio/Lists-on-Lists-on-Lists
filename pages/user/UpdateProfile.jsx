import React, { useState, useRef } from 'react';
import {
  Center,
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Alert,
  AlertIcon,
  VStack,
  Heading
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '../../src/hooks/useAuth';

const UpdateProfile = () => {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, changeEmail, changePassword, userColor } = useAuth();

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const promises = [];
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(changeEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      if (passwordRef.current.value === passwordConfirmRef.current.value) {
        promises.push(changePassword(passwordRef.current.value));
      }
    }

    Promise.all(promises).then(() => {
      router.push('/');
    }).catch(() => {
      setError('Failed to update account.');
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Center h='100%' py={20} bg={userColor}>
      <VStack>
        {error && <Alert status='error'><AlertIcon />{error}</Alert>}
        <Card justify='space-between'>
          <CardHeader>
            <Heading size='xl'>Update Profile</Heading>
          </CardHeader>
          <CardBody mx='2rem'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <FormControl my='1rem'>
                <FormLabel>Email address</FormLabel>
                <Input type='email' placeholder={currentUser.email} ref={emailRef} />
                <FormHelperText>Leave blank to keep current email</FormHelperText>
              </FormControl>
              <FormControl my='1rem'>
                <FormLabel>Password</FormLabel>
                <Input type='password' placeholder='******' ref={passwordRef} />
                <FormHelperText>Leave blank to keep current password</FormHelperText>
              </FormControl>
              <FormControl my='1rem'>
                <FormLabel>Password confirmation</FormLabel>
                <Input type='password' placeholder='******' ref={passwordConfirmRef} />
              </FormControl>
              <Button
                my='1rem'
                type='submit'
                isDisabled={isLoading}
                isLoading={isLoading}
                loadingText='Updating...'
              >
                Update
              </Button>
            </form>
          </CardBody>
        </Card>
        <Link href='/'>Cancel</Link>
      </VStack>
    </Center>
  );
};

export default UpdateProfile;