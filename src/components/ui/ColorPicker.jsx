import React from 'react';
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Center,
  SimpleGrid,
  Input,
  Heading
} from '@chakra-ui/react';

import { useAuth } from '../../hooks/useAuth';

const ColorPicker = () => {
  const { userColor, setUserColor } = useAuth();
  const colors = [
    "gray.500",
    "red.500",
    "gray.700",
    "green.500",
    "blue.500",
    "blue.800",
    "yellow.500",
    "orange.500",
    "purple.500",
    "pink.500",
  ];

  return (
    <Center marginTop={5}>
      <Popover variant="picker">
        <PopoverTrigger>
          <Button
            aria-label={userColor}
            background={userColor}
            height="22px"
            width="22px"
            padding={0}
            minWidth="unset"
            borderRadius={3}
          ></Button>
        </PopoverTrigger>
        <PopoverContent width="170px">
          <PopoverArrow bg={userColor} />
          <PopoverCloseButton color="white" />
          <PopoverHeader
            height="100px"
            backgroundColor={userColor}
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            color="white"
          >
            <Center height="100%">{userColor}</Center>
          </PopoverHeader>
          <PopoverBody height="120px">
            <SimpleGrid columns={5} spacing={2}>
              {colors.map((c) => (
                <Button
                  key={c}
                  aria-label={c}
                  background={c}
                  height="22px"
                  width="22px"
                  padding={0}
                  minWidth="unset"
                  borderRadius={3}
                  _hover={{ background: c }}
                  onClick={() => {
                    setUserColor(c);
                  }}
                ></Button>
              ))}
            </SimpleGrid>
            <Input
              borderRadius={3}
              marginTop={3}
              placeholder="red.100"
              size="sm"
              value={userColor}
              onChange={(e) => {
                setUserColor(e.target.value);
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  );
};

export default ColorPicker;