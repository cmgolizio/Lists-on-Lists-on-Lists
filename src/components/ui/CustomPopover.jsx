import React, { useRef } from 'react';
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import FocusLock from 'react-focus-lock';

import AddList from '../list/AddList';
import AddListButton from '../list/AddListButton';

const CustomPopover = () => {
  const fieldRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={fieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='auto'
        closeOnBlur={true}
        isLazy
      >
        <PopoverTrigger>
          <AddListButton onOpen={onOpen}/>
        </PopoverTrigger>
        <PopoverContent p={15}>
          <Text fontSize='3xl'>Create a List</Text>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <AddList fieldRef={fieldRef} onCancel={onClose} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CustomPopover;