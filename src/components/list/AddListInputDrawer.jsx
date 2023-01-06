import React, { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Center,
  Flex,
} from "@chakra-ui/react";

import AddList from "./AddList";
import AddListButton from "./AddListButton";
import { useAuth } from "../../hooks/useAuth";

const AddListInputDrawer = () => {
  const fieldRef = useRef();
  const { modeColor, notModeColor } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <AddListButton onOpen={onOpen} />
      <Drawer placement='top' onClose={onClose} isOpen={isOpen} autoFocus>
        <DrawerOverlay />
        <DrawerContent bg={notModeColor} color={modeColor}>
          <DrawerHeader>Create a List</DrawerHeader>
          <DrawerBody>
            <Center h='100%' w='100%'>
              <AddList fieldRef={fieldRef} onCancel={onClose} />
            </Center>
          </DrawerBody>
          <DrawerCloseButton />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddListInputDrawer;
