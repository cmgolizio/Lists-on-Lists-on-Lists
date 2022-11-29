import React from 'react';
import {
  Box,
  HStack,
  Heading,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { GrTrash, GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

import { useAuth } from '../../hooks/useAuth';

const Task = ({ key, task }) => {
  const { colorMode } = useColorMode();
  const { deleteTask, checkTask } = useAuth();

  const handleDeleteTask = (e) => {
    e.preventDefault();

    deleteTask(task.id);
  };

  const handleCheckTask = (e) => {
    e.preventDefault();

    checkTask(task.id, task.isChecked);
  };

  return (
    <Box key={key} minW='100%' minH='100%'>
      <HStack w='20rem' h='2rem' justify='space-between'>
        <IconButton
          variant='outline'
          colorScheme={!colorMode}
          bg='light'
          onHover={{
            colorScheme: 'cornflowerblue'
          }}
          icon={
            task.isChecked ?
              <GrCheckboxSelected /> :
              <GrCheckbox />
          }
          onClick={(e) => handleCheckTask(e)}
        />
        <Box textAlign='center' bg='cornflowerblue' w='110%' h='130%' minW='max-content' borderRadius={5}>
          <Heading paddingTop={1} size='md' paddingLeft={1.5}>{task.description}</Heading>
        </Box>
        <IconButton variant='outline' colorScheme={!colorMode} bg='light' icon={<GrTrash />} onClick={(e) => handleDeleteTask(e)} />
      </HStack>
    </Box>
  )
}

export default Task