import React, { useRef, memo } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogFooter,
  Button,
  HStack
} from '@chakra-ui/react';

import { useAuth } from '../../hooks/useAuth';

const DeleteListConfirm = ({ onClose, isOpen, targetedList }) => {
  const { deleteList } = useAuth();

  const cancelRef = useRef();

  const handleDeleteList = async (e, list) => {
    e.preventDefault();

    await deleteList(list);
    onClose();
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogContent>
        <AlertDialogHeader>Delete list?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          {`Are you sure you want to delete ${targetedList.title}?`}
        </AlertDialogBody>
        <AlertDialogFooter>
          <HStack spacing={2}>
            <Button onClick={(e) => handleDeleteList(e, targetedList)}>
              Yes
            </Button>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
          </HStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default memo(DeleteListConfirm);