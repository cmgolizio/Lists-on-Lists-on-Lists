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
import AddSubTask from "./sub-tasks/AddSubTask";

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
        isExpanded: false,
        priority: 'low',
    };

    setDescription("");

    await addTask(newTask);
  };

  const handleError = (e) => {
    e.preventDefault();

    setError('Please enter a title');
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
          isInvalid={error.length ? true : false}
          onChange={(e) => handleInputChange(e)}
          placeholder='Add a Task'
          size='lg'
          outline='none'
          border='1px'
          borderColor={notModeColor}
          variant='filled'
          bg={modeColor}
          color={notModeColor}
          _hover={{bg: notModeColor, _placeholder: modeColor, color: modeColor, borderColor: modeColor}}
          _focus={{color: modeColor, _placeholder: notModeColor}}
          // _focus={{ outline: 'none', _hover: {bg: modeColor, color: notModeColor}}}
          // _active={{ outline: 'none', bg: modeColor}}
        />
        <InputRightElement
          variant='outline'
          h='100%'
          w='3.5rem'
        >
          <Button
            h='100%'
            w='100%'
            bg={modeColor}
            color={notModeColor}
            _hover={{ bg: notModeColor, color: modeColor, borderColor: modeColor }}
            // borderLeft='1px'
            border='1px'
            borderColor={notModeColor}
          >
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
    </VStack>
  );
};

export default AddTask;
