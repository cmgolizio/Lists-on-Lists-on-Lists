import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import {
  VStack,
  HStack,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  Center,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

import { useAuth } from '../../hooks/useAuth';

const initialInputData = {
  title: '',
  description: '',
};

const AddListComponent = () => {
  const [inputData, setInputData] = useState(initialInputData);
  const [error, setError] = useState('');
  const { addList } = useAuth();

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
    // <Center minH='max-content' w='100%'>
    <VStack w='20rem' minH='100%' justify='center' py={10}>
        {error && <Alert status='error'><AlertIcon/>{error}</Alert>}
        <InputGroup onKeyDown={(e) => handleEnter(e)}>
          <form onSubmit={e => handleSubmit(e)}>
            <Input
              value={inputData.title}
              onChange={(e) => setInputData({...inputData, title: e.target.value})}
              placeholder='Add a title'
              size='lg'
              variant='ghost'
            />
            {/* <Input
              value={inputData.description}
              onChange={(e) => setInputData({...inputData, description: e.target.value})}
              placeholder="Describe the list's purpose"
              size='lg'
              variant='ghost'
            /> */}
            {/* <Button onClick={(e) => handleSubmit(e)}> */}
            {/* <InputRightElement> */}
              <Button type='submit' my={2} minW='max-content'>
                Create List
              </Button>
            {/* </InputRightElement> */}
          </form>
        </InputGroup>
      </VStack>
    // </Center>
  );
};

export default AddListComponent;