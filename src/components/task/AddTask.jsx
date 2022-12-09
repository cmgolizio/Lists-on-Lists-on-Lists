import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  VStack,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";

const AddTask = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { addTask, modeColor, notModeColor } = useAuth();

  const handleAddTask = async (e) => {
    e.preventDefault();
    setError("");

    let newTask = {
        id: uuidv4(),
        isChecked: false,
        created: new Date(),
        description: description,
    };

    setDescription("");

    await addTask(newTask);
  };

  const handleError = (e) => {
    e.preventDefault();

    setError('Write a task first');
  };

  const handleEnter = (e) => {
    const keyPressed = e.key;
    keyPressed === "Enter" && handleSubmit(e);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    setDescription(value);
  };

  const handleSuccess = async (e) => {
    e.preventDefault();

    await handleAddTask(e);
  };

  const handleSubmit = (e) => (description.length ? handleSuccess(e) : handleError(e));

  return (
    <VStack w='20rem'>
      {error && <Alert status="error"><AlertIcon />{error}</Alert>}
      <InputGroup w='100%' onKeyDown={(e) => handleEnter(e)}>
        <Input
          value={description}
          errorBorderColor='crimson'
          bg={notModeColor}
          color={modeColor}
          _hover={{bg: 'gray.200', _placeholder: modeColor, color: modeColor}}
          _focus={{bg: notModeColor, color: modeColor}}
          isInvalid={error.length ? true : false}
          onChange={(e) => handleInputChange(e)}
          placeholder='Add a Task'
          size='lg'
          variant='ghost'
        />
        <InputRightElement
          variant='outline'
          h='100%'
          w='3.5rem'
        >
          <Button h='100%' w='100%' borderLeft='1px' borderColor={modeColor} bg={notModeColor} color={modeColor} onClick={(e) => handleSubmit(e)}>Add</Button>
        </InputRightElement>
      </InputGroup>
    </VStack>
  );
};

export default AddTask;
