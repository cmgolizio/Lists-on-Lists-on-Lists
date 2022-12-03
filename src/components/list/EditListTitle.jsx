import React, { useState, memo } from 'react'
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { GrCheckmark } from 'react-icons/gr';

import { useAuth } from '../../hooks/useAuth';

const EditListTitle = ({ target, showEditTitle, setShowEditTitle }) => {
  const [titleInput, setTitleInput] = useState('');
  const { updateListTitle } = useAuth();

  const handleNewTitle = async (e) => {
    e.preventDefault();

    await updateListTitle(target, titleInput);
    return setShowEditTitle(false);
  }
  return (
    <AlertDialog
      isOpen={showEditTitle}
      onClose={() => setShowEditTitle(false)}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{`Rename ${target.title}`}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <InputGroup>
            <Input
              placeholder={target.title}
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                icon={<GrCheckmark/>}
                onClick={(e) => handleNewTitle(e)}
              />
            </InputRightElement>
          </InputGroup>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default memo(EditListTitle);