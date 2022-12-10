import React, { useRef, memo } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogFooter,
  Button,
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
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Delete list?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          {`Are you sure you want to delete ${targetedList.title}? This action cannot be undone`}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button onClick={(e) => handleDeleteList(e, targetedList)}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default memo(DeleteListConfirm)