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
  useColorModeValue,
} from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";

const AddTask = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const inputButtonBg = useColorModeValue('dark', 'light');
  const inputButtonColor = useColorModeValue('light', 'dark');

  const { addTask } = useAuth();

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
    <VStack>
      {error && <Alert status="error"><AlertIcon />{error}</Alert>}
      <InputGroup w='100%' onKeyDown={(e) => handleEnter(e)}>
        <Input
          value={description}
          errorBorderColor='crimson'
          bg={inputButtonBg}
          color={inputButtonColor}
          isInvalid={error.length ? true : false}
          onChange={(e) => handleInputChange(e)}
          placeholder='Add a Task'
          size='lg'
          variant='ghost'
        />
        <InputRightElement
          variant='outline'
          h='100%'
        >
          <Button w='110%' bg={inputButtonBg} color={inputButtonColor} onClick={(e) => handleSubmit(e)}>Add</Button>
        </InputRightElement>
      </InputGroup>
    </VStack>
  );
};

export default AddTask;
