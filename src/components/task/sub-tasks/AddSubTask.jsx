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

import { useAuth } from "../../../hooks/useAuth";

const AddSubTask = ({ taskID, shouldShowInput }) => {
  const [subTitle, setSubTitle] = useState("");
  const [error, setError] = useState("");

  const { addSubTask, modeColor, notModeColor } = useAuth();

  const handleAddSubTask = async (e) => {
    e.preventDefault();
    setError("");

    let newSubTask = {
        id: uuidv4(),
        isChecked: false,
        created: new Date(),
        title: subTitle,
    };


    await addSubTask(taskID, newSubTask);
    setSubTitle("");
    shouldShowInput(false);
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
    setSubTitle(value);
  };

  const handleSuccess = async (e) => {
    e.preventDefault();

    await handleAddSubTask(e, taskID);
  };

  const handleSubmit = (e) => (subTitle.length ? handleSuccess(e) : handleError(e));

  return (
    <VStack>
      {error && <Alert status="error"><AlertIcon />{error}</Alert>}
      <InputGroup w='100%' onKeyDown={(e) => handleEnter(e)}>
        <Input
          value={subTitle}
          errorBorderColor='crimson'
          bg={modeColor}
          color={notModeColor}
          _hover={{bg: 'gray.300', _placeholder: notModeColor, color: notModeColor}}
          _focus={{bg: modeColor, color: notModeColor}}
          isInvalid={error.length ? true : false}
          onChange={(e) => handleInputChange(e)}
          placeholder='Add a Subtask'
          size='sm'
          variant='ghost'
        />
        <InputRightElement
          variant='outline'
          h='100%'
          w='2rem'
        >
          <Button h='100%' w='100%' borderLeft='1px' borderColor={notModeColor} bg={modeColor} color={notModeColor} onClick={(e) => handleSubmit(e)}>Add</Button>
        </InputRightElement>
      </InputGroup>
    </VStack>
  );
};

export default AddSubTask;
