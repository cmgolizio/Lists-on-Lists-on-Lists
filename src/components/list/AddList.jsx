import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import {
  VStack,
  Input,
  InputGroup,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { useAuth } from '../../hooks/useAuth';

const initialInputData = {
  title: '',
  description: '',
};

const AddListComponent = () => {
  const [inputData, setInputData] = useState(initialInputData);
  const [error, setError] = useState('');
  const { addList, modeColor, notModeColor } = useAuth();

  const handleAddList = async (e) => {
    e.preventDefault();
    setError('');

    let newList = {
      listID: uuidv4(),
      title: inputData.title,
      description: inputData.description,
      created: new Date(),
      isActive: false,
    };

    setInputData(initialInputData);

    await addList(newList);
  };

  const handleEnter = (e) => {
    const keyPressed = e.key;
    keyPressed === "Enter" && handleSubmit(e);
  };

  const handleError = async (e) => {
    e.preventDefault();

    await setError('Please add a list title');
  };

  const handleSuccess = async (e) => {
    e.preventDefault();

    await handleAddList(e);
  };

  const handleSubmit = (e) => (inputData.title.length ? handleSuccess(e) : handleError(e));

  return (
    <VStack w='20rem' minH='100%' justify='center' py={10}>
        {error && <Alert status='error'><AlertIcon/>{error}</Alert>}
        <InputGroup onKeyDown={(e) => handleEnter(e)}>
          <form onSubmit={e => handleSubmit(e)}>
            <Input
              value={inputData.title}
              onChange={(e) => setInputData({...inputData, title: e.target.value})}
              placeholder='Add a title'
              size='lg'
              variant='filled'
              bg={notModeColor}
              color={modeColor}
              _hover={{bg: 'gray.200', _placeholder: modeColor, color: modeColor}}
              _focus={{bg: notModeColor, color: modeColor}}
            />
              <Button
                type='submit'
                my={2}
                minW='max-content'
                bg={notModeColor}
                color={modeColor}
                _hover={{bg: notModeColor, color: modeColor}}
              >
                Create List
              </Button>
          </form>
        </InputGroup>
      </VStack>
  );
};

export default AddListComponent;