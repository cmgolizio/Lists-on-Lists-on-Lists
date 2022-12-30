import React, { useRef } from "react";
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
} from "@chakra-ui/react";
import FocusLock from "react-focus-lock";

import AddList from "../list/AddList";
import AddListButton from "../list/AddListButton";
import { useAuth } from "../../hooks/useAuth";

const CustomPopover = () => {
  const { modeColor, notModeColor } = useAuth();
  const fieldRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={fieldRef}
      onOpen={onOpen}
      onClose={onClose}
      placement='bottom'
      closeOnBlur={true}
      isLazy
      // zIndex={100}
    >
      <PopoverTrigger>
        <AddListButton onOpen={onOpen} />
      </PopoverTrigger>
      <PopoverContent p={15} bg={notModeColor} color={modeColor}>
        <Text fontSize='3xl'>Create a List</Text>
        <FocusLock returnFocus persistentFocus={true}>
          {/* <PopoverArrow /> */}
          <PopoverCloseButton />
          <AddList fieldRef={fieldRef} onCancel={onClose} />
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
