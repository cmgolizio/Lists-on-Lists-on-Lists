import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogFooter,
  HStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useAuth } from '../../hooks/useAuth';
import ReauthenticatePrompt from './ReauthenticatePrompt';

const DeleteAccountConfirm = ({ isOpenProp, onCloseProp, setError }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    modeColor,
    notModeColor,
    deleteAccount,
    currentUser
  } = useAuth();
  const cancelRef = useRef();
  const router = useRouter();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await deleteAccount(currentUser);
      router.push('/auth/Signup');
    } catch (error) {
      // setError('Account could not be deleted.');
      await onOpen();
    }
  };

  return (
    <>
      {
        isOpen && <ReauthenticatePrompt isOpen={isOpen} onClose={onClose} />
      }
      <AlertDialog
        leastDestructiveRef={cancelRef}
        onClose={onCloseProp}
        isOpen={isOpenProp}
        isCentered
        bg={notModeColor}
        color={modeColor}
      >
        <AlertDialogContent>
          <AlertDialogHeader color='red.500'>Delete Account?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody color={notModeColor}>
            {`Are you sure you want to delete your account? This cannot be undone!`}
          </AlertDialogBody>
          <AlertDialogFooter>
            <HStack spacing={2}>
              <Button onClick={(e) => handleDeleteAccount(e)} _hover={{ bg: 'red.500', color: 'ghostwhite' }}>
                Yes
              </Button>
              <Button ref={cancelRef} onClick={onCloseProp}>
                No
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteAccountConfirm