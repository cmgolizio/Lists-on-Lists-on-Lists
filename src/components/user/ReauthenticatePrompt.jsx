import React, { useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

import { useAuth } from '../../hooks/useAuth';

const ReauthenticatePrompt = ({ isOpen, onClose }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const passwordRef = useRef();
  const { reauthenticate, currentUser } = useAuth();

  const handleReauthenticate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const password = passwordRef.current.value;
      await reauthenticate(password);
      await onClose();
    } catch (error) {
      console.log(error);
      setError(error);
    }

    setLoading(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='scale'>
      {error && <Alert variant='error'><AlertIcon />{error}</Alert>}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please enter your password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <FormLabel>Email</FormLabel>
          <Text mb={4}>{currentUser.email}</Text> */}
          <form onSubmit={(e) => handleReauthenticate(e)}>
            <FormControl isDisabled>
              <FormLabel>Email</FormLabel>
              <Input my='1rem' value={currentUser.email} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type='password' my='1rem' ref={passwordRef} />
            </FormControl>
            <ModalFooter>
              <Button
                w='100%'
                my='1rem'
                type='submit'
                isDisabled={isLoading}
                isLoading={isLoading}
                loadingText='Please wait...'
              >
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReauthenticatePrompt;